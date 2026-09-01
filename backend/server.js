require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const messageRoutes =
    require("./routes/messageRoutes");

const app = express();


// ============================================================
// MIDDLEWARE
// ============================================================

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
);

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);




// ============================================================
// ROUTES
// ============================================================

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Chat application API is running"
    });

});


app.use(
    "/api/auth",
    authRoutes
);


app.use(
    "/api/conversations",
    conversationRoutes
);

app.use(
    "/api/messages",
    messageRoutes
);




// ============================================================
// ERROR HANDLER
// ============================================================

app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).json({
        success: false,
        message: "Internal server error"
    });

});


// ============================================================
// SERVER
// ============================================================

const PORT = process.env.PORT || 5000;



const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});

app.set("io", io);

// ============================================================
// SOCKET CONNECTION
// ============================================================

io.on("connection", (socket) => {

    console.log(
        "User connected:",
        socket.id
    );


    socket.on("join_conversation", (conversationId) => {

        socket.join(
            `conversation_${conversationId}`
        );

        console.log(
            `Socket ${socket.id} joined conversation ${conversationId}`
        );

    });


    socket.on("leave_conversation", (conversationId) => {

        socket.leave(
            `conversation_${conversationId}`
        );

    });


    socket.on("disconnect", () => {

        console.log(
            "User disconnected:",
            socket.id
        );

    });

});


// ============================================================
// START SERVER
// ============================================================

server.listen(PORT, () => {

    console.log(`
========================================
 Chat Application API
========================================
Server: http://localhost:${PORT}

Auth:
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout

Conversations:
GET /api/conversations

Messages:
GET  /api/messages/:conversationId
POST /api/messages/:conversationId

Socket.IO:
Running
========================================
    `);

});