const express = require("express");

const {
    signup,
    login,
    getMe,
    logout
} = require("../controllers/authController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();


// SIGN UP
router.post(
    "/signup",
    signup
);


// LOGIN
router.post(
    "/login",
    login
);


// CURRENT USER
router.get(
    "/me",
    authenticateToken,
    getMe
);


// LOGOUT
router.post(
    "/logout",
    authenticateToken,
    logout
);


module.exports = router;