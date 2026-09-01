"use client";

export default function Sidebar({
    user,
    conversations,
    selectedConversation,
    onSelectConversation,
    onLogout
}) {

    return (
        <aside
            style={{
                width: "300px",
                height: "100vh",
                borderRight: "1px solid #ddd",
                display: "flex",
                flexDirection: "column",
                background: "#fff"
            }}
        >

            {/* USER */}

            <div
                style={{
                    padding: "20px",
                    borderBottom: "1px solid #ddd"
                }}
            >

                <strong>
                    {user?.display_name}
                </strong>

                <div
                    style={{
                        fontSize: "13px",
                        color: "#777"
                    }}
                >
                    @{user?.username}
                </div>

            </div>


            {/* SEARCH */}

            <div style={{ padding: "15px" }}>

                <input
                    placeholder="Search..."
                    style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "8px"
                    }}
                />

            </div>


            {/* CONVERSATIONS */}

            <div
                style={{
                    flex: 1,
                    overflowY: "auto"
                }}
            >

                {conversations.map((conversation) => {

                    const selected =
                        selectedConversation?.id ===
                        conversation.id;


                    return (
                        <button
                            key={conversation.id}
                            onClick={() =>
                                onSelectConversation(
                                    conversation
                                )
                            }
                            style={{
                                width: "100%",
                                padding: "15px",
                                border: "none",
                                borderBottom:
                                    "1px solid #eee",
                                background:
                                    selected
                                        ? "#eee"
                                        : "white",
                                textAlign: "left",
                                cursor: "pointer"
                            }}
                        >

                            <strong>
                                {conversation.name ||
                                    "Private Chat"}
                            </strong>

                            <div
                                style={{
                                    fontSize: "13px",
                                    color: "#777",
                                    marginTop: "5px"
                                }}
                            >
                                {conversation.last_message ||
                                    "No messages yet"}
                            </div>

                        </button>
                    );

                })}

            </div>


            {/* LOGOUT */}

            <div
                style={{
                    padding: "15px",
                    borderTop: "1px solid #ddd"
                }}
            >

                <button
                    onClick={onLogout}
                    style={{
                        width: "100%",
                        padding: "10px",
                        cursor: "pointer"
                    }}
                >
                    Logout
                </button>

            </div>

        </aside>
    );
}