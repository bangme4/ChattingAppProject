const pool = require("../config/database");


// ============================================================
// GET MY CONVERSATIONS
// ============================================================

const getConversations = async (req, res) => {

    try {

        const userId = req.user.userId;


        const result = await pool.query(
            `
            SELECT
                c.id,
                c.type,
                c.name,
                c.description,
                c.avatar_url,
                c.created_by,
                c.created_at,
                c.updated_at,

                cm.role,
                cm.is_muted,
                cm.last_read_message_id,

                -- Other user in private conversation
                other_user.id AS other_user_id,
                other_user.username AS other_username,
                other_user.display_name AS other_display_name,
                other_user.avatar_url AS other_avatar_url,
                other_user.status AS other_user_status,

                -- Last message
                last_message.content AS last_message,
                last_message.created_at AS last_message_at

            FROM conversations c

            INNER JOIN conversation_members cm
                ON cm.conversation_id = c.id

            -- Find the other member
            LEFT JOIN conversation_members other_cm
                ON other_cm.conversation_id = c.id
                AND other_cm.user_id != $1
                AND other_cm.left_at IS NULL

            LEFT JOIN users other_user
                ON other_user.id = other_cm.user_id

            -- Find latest message
            LEFT JOIN LATERAL (
                SELECT
                    m.content,
                    m.created_at
                FROM messages m
                WHERE m.conversation_id = c.id
                AND m.is_deleted = false
                ORDER BY m.created_at DESC
                LIMIT 1
            ) last_message
                ON true

            WHERE cm.user_id = $1
            AND cm.left_at IS NULL

            ORDER BY
                COALESCE(
                    last_message.created_at,
                    c.updated_at
                ) DESC
            `,
            [userId]
        );


        res.json({
            success: true,
            conversations: result.rows
        });


    } catch (error) {

        console.error(
            "Get conversations error:",
            error
        );


        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};


// ============================================================
// SEARCH USERS
// ============================================================

const searchUsers = async (req, res) => {

    try {

        const currentUserId =
            req.user.userId;

        const search =
            (req.query.search || "").trim();


        if (!search) {

            return res.json({
                success: true,
                users: []
            });

        }


        const result = await pool.query(
            `
            SELECT
                id,
                username,
                email,
                display_name,
                avatar_url,
                bio,
                status,
                last_seen_at

            FROM users

            WHERE is_active = TRUE

            AND id != $1

            AND (
                username ILIKE $2
                OR display_name ILIKE $2
                OR email ILIKE $2
            )

            ORDER BY
                CASE
                    WHEN username ILIKE $3 THEN 0
                    WHEN display_name ILIKE $3 THEN 1
                    ELSE 2
                END,
                username

            LIMIT 20
            `,
            [
                currentUserId,
                `%${search}%`,
                `${search}%`
            ]
        );


        res.json({
            success: true,
            users: result.rows
        });


    } catch (error) {

        console.error(
            "Search users error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};


// ============================================================
// CREATE PRIVATE CONVERSATION
// ============================================================

const createPrivateConversation = async (req, res) => {

    const client = await pool.connect();


    try {

        const currentUserId =
            req.user.userId;

        const otherUserId =
            req.body.user_id;


        if (!otherUserId) {

            return res.status(400).json({
                success: false,
                message: "user_id is required"
            });

        }


        if (
            String(currentUserId) ===
            String(otherUserId)
        ) {

            return res.status(400).json({
                success: false,
                message: "You cannot chat with yourself"
            });

        }


        await client.query("BEGIN");


        // ----------------------------------------------------
        // Check other user exists
        // ----------------------------------------------------

        const userResult =
            await client.query(
                `
                SELECT
                    id,
                    username,
                    display_name,
                    avatar_url,
                    status

                FROM users

                WHERE id = $1
                AND is_active = TRUE
                `,
                [otherUserId]
            );


        if (userResult.rows.length === 0) {

            await client.query("ROLLBACK");

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }


        // ----------------------------------------------------
        // Check whether private conversation already exists
        // ----------------------------------------------------

        const existingResult =
            await client.query(
                `
                SELECT c.id

                FROM conversations c

                INNER JOIN conversation_members cm1
                    ON cm1.conversation_id = c.id

                INNER JOIN conversation_members cm2
                    ON cm2.conversation_id = c.id

                WHERE c.type = 'private'

                AND cm1.user_id = $1
                AND cm1.left_at IS NULL

                AND cm2.user_id = $2
                AND cm2.left_at IS NULL

                LIMIT 1
                `,
                [
                    currentUserId,
                    otherUserId
                ]
            );


        if (existingResult.rows.length > 0) {

            await client.query("COMMIT");

            return res.json({
                success: true,
                existing: true,
                conversation_id:
                    existingResult.rows[0].id
            });

        }


        // ----------------------------------------------------
        // Create conversation
        // ----------------------------------------------------

        const conversationResult =
            await client.query(
                `
                INSERT INTO conversations
                (
                    type,
                    created_by
                )

                VALUES
                (
                    'private',
                    $1
                )

                RETURNING
                    id,
                    type,
                    name,
                    description,
                    avatar_url,
                    created_by,
                    created_at,
                    updated_at
                `,
                [currentUserId]
            );


        const conversation =
            conversationResult.rows[0];


        // ----------------------------------------------------
        // Add current user
        // ----------------------------------------------------

        await client.query(
            `
            INSERT INTO conversation_members
            (
                conversation_id,
                user_id,
                role
            )

            VALUES
            (
                $1,
                $2,
                'member'
            )
            `,
            [
                conversation.id,
                currentUserId
            ]
        );


        // ----------------------------------------------------
        // Add other user
        // ----------------------------------------------------

        await client.query(
            `
            INSERT INTO conversation_members
            (
                conversation_id,
                user_id,
                role
            )

            VALUES
            (
                $1,
                $2,
                'member'
            )
            `,
            [
                conversation.id,
                otherUserId
            ]
        );


        await client.query("COMMIT");


        res.status(201).json({
            success: true,
            existing: false,
            conversation
        });


    } catch (error) {

        await client.query("ROLLBACK");


        console.error(
            "Create private conversation error:",
            error
        );


        res.status(500).json({
            success: false,
            message: "Server error"
        });


    } finally {

        client.release();

    }

};


// ============================================================
// GET CONVERSATION MEMBERS
// ============================================================

const getConversationMembers = async (req, res) => {

    try {

        const userId =
            req.user.userId;

        const conversationId =
            req.params.id;


        const access =
            await pool.query(
                `
                SELECT id

                FROM conversation_members

                WHERE conversation_id = $1
                AND user_id = $2
                AND left_at IS NULL
                `,
                [
                    conversationId,
                    userId
                ]
            );


        if (access.rows.length === 0) {

            return res.status(403).json({
                success: false,
                message: "Access denied"
            });

        }


        const result =
            await pool.query(
                `
                SELECT
                    u.id,
                    u.username,
                    u.display_name,
                    u.avatar_url,
                    u.bio,
                    u.status,
                    u.last_seen_at,
                    cm.role,
                    cm.joined_at

                FROM conversation_members cm

                INNER JOIN users u
                    ON u.id = cm.user_id

                WHERE cm.conversation_id = $1
                AND cm.left_at IS NULL

                ORDER BY cm.joined_at ASC
                `,
                [conversationId]
            );


        res.json({
            success: true,
            members: result.rows
        });


    } catch (error) {

        console.error(
            "Get members error:",
            error
        );


        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};


module.exports = {
    getConversations,
    searchUsers,
    createPrivateConversation,
    getConversationMembers
};