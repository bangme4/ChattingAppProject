"use client";

import { useEffect, useState } from "react";

import {
    getConversations,
    searchUsers,
    createPrivateConversation
} from "../lib/api";


export default function ChatSidebar({
    selectedConversation,
    onSelectConversation
}) {

    const [conversations, setConversations] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [users, setUsers] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [searching, setSearching] =
        useState(false);


    // ========================================================
    // LOAD CONVERSATIONS
    // ========================================================

    async function loadConversations() {

        try {

            setLoading(true);

            const data =
                await getConversations();

            setConversations(
                data.conversations || []
            );

        } catch (error) {

            console.error(
                "Load conversations error:",
                error
            );

        } finally {

            setLoading(false);

        }

    }


    useEffect(() => {

        loadConversations();

    }, []);


    // ========================================================
    // SEARCH USERS
    // ========================================================

    async function handleSearch(value) {

        setSearch(value);


        if (!value.trim()) {

            setUsers([]);

            return;

        }


        try {

            setSearching(true);

            const data =
                await searchUsers(value);

            setUsers(
                data.users || []
            );

        } catch (error) {

            console.error(
                "Search error:",
                error
            );

        } finally {

            setSearching(false);

        }

    }


    // ========================================================
    // START PRIVATE CHAT
    // ========================================================

    async function startChat(user) {

        try {

            const data =
                await createPrivateConversation(
                    user.id
                );


            await loadConversations();


            const conversationId =
                data.conversation_id ||
                data.conversation?.id;


            if (conversationId) {

                onSelectConversation(
                    conversationId
                );

            }


            setSearch("");

            setUsers([]);


        } catch (error) {

            console.error(
                "Create conversation error:",
                error
            );

            alert(
                error.message
            );

        }

    }


    // ========================================================
    // GET DISPLAY NAME
    // ========================================================

    function getConversationName(conversation) {

    // Private chat
    if (
        conversation.type === "private" &&
        conversation.other_display_name
    ) {

        return conversation.other_display_name;

    }


    // Fallback to username
    if (
        conversation.type === "private" &&
        conversation.other_username
    ) {

        return conversation.other_username;

    }


    // Group chat
    if (conversation.name) {

        return conversation.name;

    }


        return "Conversation";
    }


    return (

        <aside
            style={{
                width: "320px",
                borderRight: "1px solid #ddd",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                background: "#fff"
            }}
        >

            {/* HEADER */}

            <div
                style={{
                    padding: "20px",
                    borderBottom: "1px solid #ddd"
                }}
            >

                <h2
                    style={{
                        margin: 0,
                        marginBottom: "15px"
                    }}
                >
                    Chats
                </h2>


                {/* SEARCH */}

                <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) =>
                        handleSearch(e.target.value)
                    }
                    style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        boxSizing: "border-box"
                    }}
                />

            </div>


            {/* SEARCH RESULTS */}

            {search.trim() && (

                <div
                    style={{
                        borderBottom: "1px solid #ddd",
                        maxHeight: "250px",
                        overflowY: "auto"
                    }}
                >

                    {searching && (

                        <p
                            style={{
                                padding: "15px",
                                margin: 0
                            }}
                        >
                            Searching...
                        </p>

                    )}


                    {!searching &&
                        users.length === 0 && (

                            <p
                                style={{
                                    padding: "15px",
                                    margin: 0,
                                    color: "#777"
                                }}
                            >
                                No users found
                            </p>

                        )}


                    {users.map((user) => (

                        <button
                            key={user.id}
                            onClick={() =>
                                startChat(user)
                            }
                            style={{
                                width: "100%",
                                padding: "12px 15px",
                                border: "none",
                                borderBottom:
                                    "1px solid #eee",
                                background: "white",
                                textAlign: "left",
                                cursor: "pointer"
                            }}
                        >

                            <strong className="text-blue-400"> 
                                {user.display_name ||
                                    user.username}
                            </strong>

                            <div
                                style={{
                                    color: "#777",
                                    fontSize: "13px",
                                    marginTop: "3px"
                                }}
                            >
                                @{user.username}
                            </div>

                        </button>

                    ))}

                </div>

            )}


            {/* CONVERSATIONS */}

            <div
                style={{
                    flex: 1,
                    overflowY: "auto"
                }}
            >

                {loading && (

                    <p
                        style={{
                            padding: "20px"
                        }}
                    >
                        Loading chats...
                    </p>

                )}


                {!loading &&
                    conversations.length === 0 && (

                        <p
                            style={{
                                padding: "20px",
                                color: "#777"
                            }}
                        >
                            No conversations yet.
                        </p>

                    )}


                {conversations.map(
                    (conversation) => (

                        <button
                            key={conversation.id}
                            onClick={() =>
                                onSelectConversation(
                                    conversation.id
                                )
                            }
                            style={{
                                width: "100%",
                                padding: "15px",
                                border: "none",
                                borderBottom:
                                    "1px solid #eee",
                                background:
                                    String(
                                        selectedConversation
                                    ) ===
                                    String(
                                        conversation.id
                                    )
                                        ? "#f0f0f0"
                                        : "white",
                                textAlign: "left",
                                cursor: "pointer"
                            }}
                        >

                           <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px"
                                }}
                            >

                                {/* Avatar */}

                                <div
                                    style={{
                                        width: "42px",
                                        height: "42px",
                                        borderRadius: "50%",
                                        background: "#ddd",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: "bold",
                                        flexShrink: 0
                                    }}
                                >
                                    {(
                                        conversation.other_display_name ||
                                        conversation.other_username ||
                                        conversation.name ||
                                        "?"
                                    )[0].toUpperCase()}
                                </div>


                                {/* Name + last message */}

                                <div
                                    style={{
                                        minWidth: 0,
                                        flex: 1
                                    }}
                                >

                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "6px"
                                        }}
                                    >

                                        <strong>
                                            {getConversationName(
                                                conversation
                                            )}
                                        </strong>


                                        {/* Online indicator */}

                                        {conversation.other_user_status ===
                                            "online" && (

                                            <span
                                                style={{
                                                    width: "8px",
                                                    height: "8px",
                                                    borderRadius: "50%",
                                                    background: "green",
                                                    display: "inline-block"
                                                }}
                                            />

                                        )}

                                    </div>


                                    <div
                                        style={{
                                            marginTop: "5px",
                                            fontSize: "13px",
                                            color: "#777",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap"
                                        }}
                                    >

                                        {conversation.last_message ||
                                            "No messages yet"}

                                    </div>

                                </div>

                            </div>

                        </button>

                    )
                )}

            </div>

        </aside>

    );

}