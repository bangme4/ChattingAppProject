const express = require("express");

const {
    getMessages,
    sendMessage
} = require("../controllers/messageController");

const authenticateToken =
    require("../middleware/authMiddleware");

const router = express.Router();


// Get messages
router.get(
    "/:id",
    authenticateToken,
    getMessages
);


// Send message
router.post(
    "/:id",
    authenticateToken,
    sendMessage
);


module.exports = router;