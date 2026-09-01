"use client";

import { useEffect, useState } from "react";

import ChatSidebar from "../../components/ChatSidebar";
import ChatWindow from "../../components/ChatWindow";

import { getMe } from "../../lib/api";


export default function ChatPage() {

    const [selectedConversation, setSelectedConversation] =
        useState(null);

    const [user, setUser] =
        useState(null);

    const [loading, setLoading] =
        useState(true);


    // ========================================================
    // CHECK LOGIN
    // ========================================================

    useEffect(() => {

        async function checkAuth() {

            const token =
                localStorage.getItem(
                    "token"
                );


            if (!token) {

                window.location.href =
                    "/auth/login";

                return;

            }


            try {

                const data =
                    await getMe();

                setUser(
                    data.user
                );

            } catch (error) {

                console.error(
                    "Authentication error:",
                    error
                );

                localStorage.removeItem(
                    "token"
                );

                window.location.href =
                    "/auth/login";

            } finally {

                setLoading(false);

            }

        }


        checkAuth();

    }, []);


    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {

        return (

            <div
                style={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >

                Loading chat...

            </div>

        );

    }


    return (

        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                background: "#f5f5f5"
            }}
        >

            {/* TOP BAR */}

            <header
                style={{
                    height: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                        "space-between",
                    padding: "0 20px",
                    background: "#111",
                    color: "#fff"
                }}
            >

                <strong>
                    Chat Application
                </strong>


                {user && (

                    <div>

                        {user.display_name ||
                            user.username}

                    </div>

                )}

            </header>


            {/* CHAT */}

            <div
                style={{
                    flex: 1,
                    display: "flex",
                    minHeight: 0
                }}
            >

                <ChatSidebar
                    selectedConversation={
                        selectedConversation
                    }
                    onSelectConversation={
                        setSelectedConversation
                    }
                />


                <ChatWindow
                    conversationId={
                        selectedConversation
                    }
                />

            </div>

        </div>

    );

}