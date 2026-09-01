"use client";

import { useState } from "react";

import {
    sendMessage
} from "../lib/api";


export default function MessageInput({
    conversationId,
    onMessageSent
}) {

    const [content, setContent] =
        useState("");

    const [sending, setSending] =
        useState(false);


    async function handleSubmit(e) {

        e.preventDefault();


        if (
            !content.trim() ||
            sending
        ) {

            return;

        }


        try {

            setSending(true);


            const data =
                await sendMessage(
                    conversationId,
                    content
                );


            onMessageSent(
                data.message
            );


            setContent("");


        } catch (error) {

            console.error(
                "Send message error:",
                error
            );

            alert(
                error.message
            );

        } finally {

            setSending(false);

        }

    }


    return (

        <form
            onSubmit={handleSubmit}
            style={{
                display: "flex",
                gap: "10px",
                padding: "15px",
                borderTop:
                    "1px solid #ddd",
                background: "#fff"
            }}
        >

            <input
                type="text"
                value={content}
                onChange={(e) =>
                    setContent(
                        e.target.value
                    )
                }
                placeholder="Type a message..."
                disabled={sending}
                style={{
                    flex: 1,
                    padding: "12px",
                    border:
                        "1px solid #ccc",
                    borderRadius: "8px",
                    outline: "none"
                }}
            />


            <button
                type="submit"
                disabled={
                    sending ||
                    !content.trim()
                }
                style={{
                    padding:
                        "0 20px",
                    border: "none",
                    borderRadius:
                        "8px",
                    background:
                        "#0070f3",
                    color: "white",
                    cursor:
                        sending
                            ? "default"
                            : "pointer"
                }}
            >

                {sending
                    ? "Sending..."
                    : "Send"}

            </button>

        </form>

    );

}