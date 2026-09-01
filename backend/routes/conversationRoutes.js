const express = require("express");

const {
    getConversations,
    searchUsers,
    createPrivateConversation,
    getConversationMembers
} = require("../controllers/conversationController");

const authenticateToken =
    require("../middleware/authMiddleware");

const router =
    express.Router();


// Get my conversations
router.get(
    "/",
    authenticateToken,
    getConversations
);


// Search users
router.get(
    "/users/search",
    authenticateToken,
    searchUsers
);


// Create private conversation
router.post(
    "/private",
    authenticateToken,
    createPrivateConversation
);


// Get members
router.get(
    "/:id/members",
    authenticateToken,
    getConversationMembers
);


module.exports = router;