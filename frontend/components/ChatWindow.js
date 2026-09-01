"use client";

import { useEffect, useRef, useState } from "react";
import {
    getMessages,
    sendMessage
}
 
from "@/lib/api";

import { socket } from "@/lib/socket";


export default function ChatWindow({
    conversationId
}) {

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef(null);


    // ========================================================
    // LOAD MESSAGES
    // ========================================================

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages]);

    useEffect(() => {

        if (!conversationId) {
            setMessages([]);
            return;
        }


        async function loadMessages() {

            setLoading(true);

            try {

                const result =
                    await getMessages(
                        conversationId
                    );


                if (result.success) {

                    setMessages(
                        result.messages || []
                    );

                }

            } catch (error) {

                console.error(
                    "Load messages error:",
                    error
                );

            } finally {

                setLoading(false);

            }

        }


        loadMessages();

    }, [conversationId]);


    // ========================================================
    // SOCKET.IO
    // ========================================================

    useEffect(() => {

        if (!conversationId) {
            return;
        }


        // Connect socket

        if (!socket.connected) {
            socket.connect();
        }


        // Join conversation

        socket.emit(
            "join_conversation",
            conversationId
        );


        console.log(
            "Joined conversation:",
            conversationId
        );


        // ====================================================
        // NEW MESSAGE
        // ====================================================

        const handleNewMessage = (
            message
        ) => {

            console.log(
                "New message received:",
                message
            );


            // Make sure message belongs
            // to current conversation

            if (
                String(
                    message.conversation_id
                ) !==
                String(
                    conversationId
                )
            ) {

                return;

            }


            setMessages(
                (currentMessages) => {

                    // Prevent duplicates

                    const exists =
                        currentMessages.some(
                            (existingMessage) =>
                                String(
                                    existingMessage.id
                                ) ===
                                String(
                                    message.id
                                )
                        );


                    if (exists) {

                        return currentMessages;

                    }


                    return [
                        ...currentMessages,
                        message
                    ];

                }
            );

        };


        socket.on(
            "new_message",
            handleNewMessage
        );


        // ====================================================
        // CLEANUP
        // ====================================================

        return () => {

            socket.emit(
                "leave_conversation",
                conversationId
            );


            socket.off(
                "new_message",
                handleNewMessage
            );

        };

    }, [conversationId]);


    // ========================================================
    // SEND MESSAGE
    // ========================================================

    async function handleSendMessage(e) {

        e.preventDefault();


        if (!text.trim()) {
            return;
        }


        if (!conversationId) {
            return;
        }


        setSending(true);


        try {

            const result =
                await sendMessage(
                    conversationId,
                    text
                );


            if (result.success) {

                setText("");

                // The backend sends the message
                // through Socket.IO.
                //
                // We DO NOT add it here because
                // Socket.IO will add it.
            }


        } catch (error) {

            console.error(
                "Send message error:",
                error
            );

        } finally {

            setSending(false);

        }

    }


    // ========================================================
    // NO CHAT SELECTED
    // ========================================================

    if (!conversationId) {

        return (

            <div
                style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#777"
                }}
            >

                <div>

                    <h2>
                        Select a conversation
                    </h2>

                    <p>
                        Choose a chat to start
                        messaging.
                    </p>

                </div>

            </div>

        );

    }


    // ========================================================
    // RENDER
    // ========================================================

    return (

        <div
            style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                height: "100%"
            }}
        >

            {/* ================================================
                HEADER
            ================================================= */}

            <div
                style={{
                    padding: "15px",
                    borderBottom:
                        "1px solid #ddd"
                }}
            >

                <strong>
                    Chat
                </strong>

            </div>


            {/* ================================================
                MESSAGES
            ================================================= */}

            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                }}
            >

                {loading && (

                    <p>
                        Loading messages...
                    </p>

                )}


                {!loading &&
                    messages.length === 0 && (

                    <p
                        style={{
                            color: "#777"
                        }}
                    >
                        No messages yet.
                    </p>

                )}


                {messages.map(
                    (message) => (

                    <div
                        key={message.id}
                        style={{
                            padding: "10px 14px",
                            borderRadius: "10px",
                            background: "#f1f1f1",
                            maxWidth: "70%",
                            alignSelf:
                                String(
                                    message.sender_id
                                ) ===
                                String(
                                    getCurrentUserId()
                                )
                                    ? "flex-end"
                                    : "flex-start"
                        }}
                    >

                        <div
                            style={{
                                fontSize: "12px",
                                fontWeight: "bold",
                                marginBottom: "4px"
                            }}
                        >

                            {message.display_name ||
                                message.username}

                        </div>


                        <div>
                            {message.content}
                        </div>


                        <div
                            style={{
                                fontSize: "10px",
                                color: "#888",
                                marginTop: "4px"
                            }}
                        >

                            {new Date(
                                message.created_at
                            ).toLocaleTimeString()}

                        </div>

                    </div>

                    
                ))}
                
                <div ref={messagesEndRef} />
            </div>


            {/* ================================================
                INPUT
            ================================================= */}

            <form
                onSubmit={handleSendMessage}
                style={{
                    display: "flex",
                    gap: "10px",
                    padding: "15px",
                    borderTop:
                        "1px solid #ddd"
                }}
            >

                <input
                    type="text"
                    value={text}
                    onChange={(e) =>
                        setText(
                            e.target.value
                        )
                    }
                    placeholder="Type a message..."
                    style={{
                        flex: 1,
                        padding: "10px",
                        border:
                            "1px solid #ccc",
                        borderRadius: "8px"
                    }}
                />


                <button
                    type="submit"
                    disabled={
                        sending ||
                        !text.trim()
                    }
                >

                    {sending
                        ? "Sending..."
                        : "Send"}

                </button>

            </form>

        </div>

    );

}


// ============================================================
// GET CURRENT USER ID
// ============================================================

function getCurrentUserId() {

    if (
        typeof window ===
        "undefined"
    ) {

        return null;

    }


    try {

        const user =
            JSON.parse(
                localStorage.getItem(
                    "user"
                ) || "null"
            );


        return user?.id || null;

    } catch {

        return null;

    }

}

