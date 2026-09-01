const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/database");


// ============================================================
// SIGN UP
// ============================================================

const signup = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            display_name
        } = req.body;

        // Check required fields
        if (!username || !email || !password || !display_name) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Validate username
        if (username.length < 3) {
            return res.status(400).json({
                success: false,
                message: "Username must be at least 3 characters"
            });
        }

        // Validate password
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }

        // Check if username already exists
        const usernameCheck = await pool.query(
            "SELECT id FROM users WHERE username = $1",
            [username]
        );

        if (usernameCheck.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Username already exists"
            });
        }

        // Check if email already exists
        const emailCheck = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [email.toLowerCase()]
        );

        if (emailCheck.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 12);

        // Insert user
        const result = await pool.query(
            `
            INSERT INTO users
            (
                username,
                email,
                password_hash,
                display_name
            )
            VALUES
            (
                $1,
                $2,
                $3,
                $4
            )
            RETURNING
                id,
                username,
                email,
                display_name,
                avatar_url,
                bio,
                status,
                created_at
            `,
            [
                username,
                email.toLowerCase(),
                passwordHash,
                display_name
            ]
        );

        const user = result.rows[0];

        // Create JWT
        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(201).json({
            success: true,
            message: "Account created successfully",
            token,
            user
        });

    } catch (error) {

        console.error("Signup error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ============================================================
// LOGIN
// ============================================================

const login = async (req, res) => {
    try {

        const {
            email,
            password
        } = req.body;

        // Validate
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Find user
        const result = await pool.query(
            `
            SELECT
                id,
                username,
                email,
                password_hash,
                display_name,
                avatar_url,
                bio,
                status,
                created_at
            FROM users
            WHERE email = $1
            AND is_active = TRUE
            `,
            [
                email.toLowerCase()
            ]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const user = result.rows[0];

        // Check password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Update online status
        await pool.query(
            `
            UPDATE users
            SET
                status = 'online',
                last_seen_at = CURRENT_TIMESTAMP
            WHERE id = $1
            `,
            [user.id]
        );

        // Create token
        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        // Remove password hash
        delete user.password_hash;

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user
        });

    } catch (error) {

        console.error("Login error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ============================================================
// GET CURRENT USER
// ============================================================

const getMe = async (req, res) => {
    try {

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
                last_seen_at,
                created_at
            FROM users
            WHERE id = $1
            AND is_active = TRUE
            `,
            [req.user.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            user: result.rows[0]
        });

    } catch (error) {

        console.error("Get user error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ============================================================
// LOGOUT
// ============================================================

const logout = async (req, res) => {
    try {

        await pool.query(
            `
            UPDATE users
            SET
                status = 'offline',
                last_seen_at = CURRENT_TIMESTAMP
            WHERE id = $1
            `,
            [req.user.userId]
        );

        res.json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {

        console.error("Logout error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


module.exports = {
    signup,
    login,
    getMe,
    logout
};