const pool = require("../config/database");


// ============================================================
// CHECK CONVERSATION ACCESS
// ============================================================

async function checkConversationAccess(userId, conversationId) {

    const result = await pool.query(
        `
        SELECT user_id
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

    return result.rows.length > 0;
}


// ============================================================
// GET MESSAGES
// ============================================================

const getMessages = async (req, res) => {

    try {

        const userId = req.user.userId;
        const conversationId = req.params.id;


        // Check if user belongs to conversation
        const hasAccess = await checkConversationAccess(
            userId,
            conversationId
        );


        if (!hasAccess) {

            return res.status(403).json({
                success: false,
                message: "Access denied"
            });

        }


        // Get messages
        const result = await pool.query(
            `
            SELECT
                m.id,
                m.conversation_id,
                m.sender_id,
                m.reply_to_message_id,
                m.message_type,
                m.content,
                m.is_edited,
                m.edited_at,
                m.is_deleted,
                m.deleted_at,
                m.created_at,
                m.updated_at,

                u.username,
                u.display_name,
                u.avatar_url

            FROM messages m

            INNER JOIN users u
                ON u.id = m.sender_id

            WHERE m.conversation_id = $1

            ORDER BY m.created_at ASC

            LIMIT 100
            `,
            [conversationId]
        );


        res.json({
            success: true,
            messages: result.rows
        });


    } catch (error) {

        console.error(
            "Get messages error:",
            error
        );


        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};


// ============================================================
// SEND MESSAGE
// ============================================================

const sendMessage = async (req, res) => {

    try {

        const userId = req.user.userId;
        const conversationId = req.params.id;
        const { content } = req.body;


        if (!content || !content.trim()) {

            return res.status(400).json({
                success: false,
                message: "Message cannot be empty"
            });

        }


        // Insert message into PostgreSQL

        const result = await pool.query(
            `
            INSERT INTO messages
                (
                    conversation_id,
                    sender_id,
                    message_type,
                    content
                )
            VALUES
                ($1, $2, 'text', $3)
            RETURNING *
            `,
            [
                conversationId,
                userId,
                content.trim()
            ]
        );

        const message = result.rows[0];


        // Get sender information

        const userResult = await pool.query(
            `
            SELECT
                id,
                username,
                display_name,
                avatar_url
            FROM users
            WHERE id = $1
            `,
            [userId]
        );


        const user = userResult.rows[0];


        const completeMessage = {
            ...message,
            username: user.username,
            display_name: user.display_name,
            avatar_url: user.avatar_url
        };


        // ================================================
        // REAL-TIME SOCKET.IO
        // ================================================

        const io = req.app.get("io");

        io.to(
            `conversation_${conversationId}`
        ).emit(
            "new_message",
            completeMessage
        );


        // ================================================
        // RESPONSE
        // ================================================

        res.status(201).json({
            success: true,
            message: completeMessage
        });


    } catch (error) {

        console.error(
            "Send message error:",
            error
        );


        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};


// ============================================================
// EXPORT
// ============================================================

module.exports = {
    getMessages,
    sendMessage
};