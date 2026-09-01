(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/chat/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChatSidebar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ChatSidebar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChatWindow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ChatWindow.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function ChatPage() {
    _s();
    const [selectedConversation, setSelectedConversation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // ========================================================
    // CHECK LOGIN
    // ========================================================
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatPage.useEffect": ()=>{
            async function checkAuth() {
                const token = localStorage.getItem("token");
                if (!token) {
                    window.location.href = "/auth/login";
                    return;
                }
                try {
                    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMe"])();
                    setUser(data.user);
                } catch (error) {
                    console.error("Authentication error:", error);
                    localStorage.removeItem("token");
                    window.location.href = "/auth/login";
                } finally{
                    setLoading(false);
                }
            }
            checkAuth();
        }
    }["ChatPage.useEffect"], []);
    // ========================================================
    // LOADING
    // ========================================================
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            },
            children: "Loading chat..."
        }, void 0, false, {
            fileName: "[project]/app/chat/page.js",
            lineNumber: 92,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            background: "#f5f5f5"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                style: {
                    height: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 20px",
                    background: "#111",
                    color: "#fff"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "Chat Application"
                    }, void 0, false, {
                        fileName: "[project]/app/chat/page.js",
                        lineNumber: 136,
                        columnNumber: 17
                    }, this),
                    user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: user.display_name || user.username
                    }, void 0, false, {
                        fileName: "[project]/app/chat/page.js",
                        lineNumber: 143,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/chat/page.js",
                lineNumber: 123,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    display: "flex",
                    minHeight: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChatSidebar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        selectedConversation: selectedConversation,
                        onSelectConversation: setSelectedConversation
                    }, void 0, false, {
                        fileName: "[project]/app/chat/page.js",
                        lineNumber: 165,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChatWindow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        conversationId: selectedConversation
                    }, void 0, false, {
                        fileName: "[project]/app/chat/page.js",
                        lineNumber: 175,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/chat/page.js",
                lineNumber: 157,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/chat/page.js",
        lineNumber: 112,
        columnNumber: 9
    }, this);
}
_s(ChatPage, "PLD7bfiofeIZ3YjUKbTwx8rPYts=");
_c = ChatPage;
var _c;
__turbopack_context__.k.register(_c, "ChatPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ChatSidebar.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function ChatSidebar({ selectedConversation, onSelectConversation }) {
    _s();
    const [conversations, setConversations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [searching, setSearching] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // ========================================================
    // LOAD CONVERSATIONS
    // ========================================================
    async function loadConversations() {
        try {
            setLoading(true);
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getConversations"])();
            setConversations(data.conversations || []);
        } catch (error) {
            console.error("Load conversations error:", error);
        } finally{
            setLoading(false);
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatSidebar.useEffect": ()=>{
            loadConversations();
        }
    }["ChatSidebar.useEffect"], []);
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
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["searchUsers"])(value);
            setUsers(data.users || []);
        } catch (error) {
            console.error("Search error:", error);
        } finally{
            setSearching(false);
        }
    }
    // ========================================================
    // START PRIVATE CHAT
    // ========================================================
    async function startChat(user) {
        try {
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPrivateConversation"])(user.id);
            await loadConversations();
            const conversationId = data.conversation_id || data.conversation?.id;
            if (conversationId) {
                onSelectConversation(conversationId);
            }
            setSearch("");
            setUsers([]);
        } catch (error) {
            console.error("Create conversation error:", error);
            alert(error.message);
        }
    }
    // ========================================================
    // GET DISPLAY NAME
    // ========================================================
    function getConversationName(conversation) {
        // Private chat
        if (conversation.type === "private" && conversation.other_display_name) {
            return conversation.other_display_name;
        }
        // Fallback to username
        if (conversation.type === "private" && conversation.other_username) {
            return conversation.other_username;
        }
        // Group chat
        if (conversation.name) {
            return conversation.name;
        }
        return "Conversation";
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        style: {
            width: "320px",
            borderRight: "1px solid #ddd",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            background: "#fff"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "20px",
                    borderBottom: "1px solid #ddd"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: {
                            margin: 0,
                            marginBottom: "15px"
                        },
                        children: "Chats"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatSidebar.js",
                        lineNumber: 232,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "Search users...",
                        value: search,
                        onChange: (e)=>handleSearch(e.target.value),
                        style: {
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            boxSizing: "border-box"
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/ChatSidebar.js",
                        lineNumber: 244,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatSidebar.js",
                lineNumber: 225,
                columnNumber: 13
            }, this),
            search.trim() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    borderBottom: "1px solid #ddd",
                    maxHeight: "250px",
                    overflowY: "auto"
                },
                children: [
                    searching && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            padding: "15px",
                            margin: 0
                        },
                        children: "Searching..."
                    }, void 0, false, {
                        fileName: "[project]/components/ChatSidebar.js",
                        lineNumber: 277,
                        columnNumber: 25
                    }, this),
                    !searching && users.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            padding: "15px",
                            margin: 0,
                            color: "#777"
                        },
                        children: "No users found"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatSidebar.js",
                        lineNumber: 292,
                        columnNumber: 29
                    }, this),
                    users.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>startChat(user),
                            style: {
                                width: "100%",
                                padding: "12px 15px",
                                border: "none",
                                borderBottom: "1px solid #eee",
                                background: "white",
                                textAlign: "left",
                                cursor: "pointer"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    className: "text-blue-400",
                                    children: user.display_name || user.username
                                }, void 0, false, {
                                    fileName: "[project]/components/ChatSidebar.js",
                                    lineNumber: 324,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        color: "#777",
                                        fontSize: "13px",
                                        marginTop: "3px"
                                    },
                                    children: [
                                        "@",
                                        user.username
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/ChatSidebar.js",
                                    lineNumber: 329,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, user.id, true, {
                            fileName: "[project]/components/ChatSidebar.js",
                            lineNumber: 307,
                            columnNumber: 25
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatSidebar.js",
                lineNumber: 267,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    overflowY: "auto"
                },
                children: [
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            padding: "20px"
                        },
                        children: "Loading chats..."
                    }, void 0, false, {
                        fileName: "[project]/components/ChatSidebar.js",
                        lineNumber: 359,
                        columnNumber: 21
                    }, this),
                    !loading && conversations.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            padding: "20px",
                            color: "#777"
                        },
                        children: "No conversations yet."
                    }, void 0, false, {
                        fileName: "[project]/components/ChatSidebar.js",
                        lineNumber: 373,
                        columnNumber: 25
                    }, this),
                    conversations.map((conversation)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onSelectConversation(conversation.id),
                            style: {
                                width: "100%",
                                padding: "15px",
                                border: "none",
                                borderBottom: "1px solid #eee",
                                background: String(selectedConversation) === String(conversation.id) ? "#f0f0f0" : "white",
                                textAlign: "left",
                                cursor: "pointer"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: "42px",
                                            height: "42px",
                                            borderRadius: "50%",
                                            background: "#ddd",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontWeight: "bold",
                                            flexShrink: 0
                                        },
                                        children: (conversation.other_display_name || conversation.other_username || conversation.name || "?")[0].toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatSidebar.js",
                                        lineNumber: 425,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            minWidth: 0,
                                            flex: 1
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "6px"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: getConversationName(conversation)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ChatSidebar.js",
                                                        lineNumber: 464,
                                                        columnNumber: 41
                                                    }, this),
                                                    conversation.other_user_status === "online" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            width: "8px",
                                                            height: "8px",
                                                            borderRadius: "50%",
                                                            background: "green",
                                                            display: "inline-block"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ChatSidebar.js",
                                                        lineNumber: 476,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/ChatSidebar.js",
                                                lineNumber: 456,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    marginTop: "5px",
                                                    fontSize: "13px",
                                                    color: "#777",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap"
                                                },
                                                children: conversation.last_message || "No messages yet"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ChatSidebar.js",
                                                lineNumber: 491,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ChatSidebar.js",
                                        lineNumber: 449,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ChatSidebar.js",
                                lineNumber: 415,
                                columnNumber: 28
                            }, this)
                        }, conversation.id, false, {
                            fileName: "[project]/components/ChatSidebar.js",
                            lineNumber: 388,
                            columnNumber: 25
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatSidebar.js",
                lineNumber: 350,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ChatSidebar.js",
        lineNumber: 212,
        columnNumber: 9
    }, this);
}
_s(ChatSidebar, "rN2azliuH9lvnOoN0JiJF+yVtjE=");
_c = ChatSidebar;
var _c;
__turbopack_context__.k.register(_c, "ChatSidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ChatWindow.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatWindow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$socket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/socket.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function ChatWindow({ conversationId }) {
    _s();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sending, setSending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // ========================================================
    // LOAD MESSAGES
    // ========================================================
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatWindow.useEffect": ()=>{
            messagesEndRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }
    }["ChatWindow.useEffect"], [
        messages
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatWindow.useEffect": ()=>{
            if (!conversationId) {
                setMessages([]);
                return;
            }
            async function loadMessages() {
                setLoading(true);
                try {
                    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMessages"])(conversationId);
                    if (result.success) {
                        setMessages(result.messages || []);
                    }
                } catch (error) {
                    console.error("Load messages error:", error);
                } finally{
                    setLoading(false);
                }
            }
            loadMessages();
        }
    }["ChatWindow.useEffect"], [
        conversationId
    ]);
    // ========================================================
    // SOCKET.IO
    // ========================================================
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatWindow.useEffect": ()=>{
            if (!conversationId) {
                return;
            }
            // Connect socket
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$socket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socket"].connected) {
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$socket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socket"].connect();
            }
            // Join conversation
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$socket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socket"].emit("join_conversation", conversationId);
            console.log("Joined conversation:", conversationId);
            // ====================================================
            // NEW MESSAGE
            // ====================================================
            const handleNewMessage = {
                "ChatWindow.useEffect.handleNewMessage": (message)=>{
                    console.log("New message received:", message);
                    // Make sure message belongs
                    // to current conversation
                    if (String(message.conversation_id) !== String(conversationId)) {
                        return;
                    }
                    setMessages({
                        "ChatWindow.useEffect.handleNewMessage": (currentMessages)=>{
                            // Prevent duplicates
                            const exists = currentMessages.some({
                                "ChatWindow.useEffect.handleNewMessage.exists": (existingMessage)=>String(existingMessage.id) === String(message.id)
                            }["ChatWindow.useEffect.handleNewMessage.exists"]);
                            if (exists) {
                                return currentMessages;
                            }
                            return [
                                ...currentMessages,
                                message
                            ];
                        }
                    }["ChatWindow.useEffect.handleNewMessage"]);
                }
            }["ChatWindow.useEffect.handleNewMessage"];
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$socket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socket"].on("new_message", handleNewMessage);
            // ====================================================
            // CLEANUP
            // ====================================================
            return ({
                "ChatWindow.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$socket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socket"].emit("leave_conversation", conversationId);
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$socket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socket"].off("new_message", handleNewMessage);
                }
            })["ChatWindow.useEffect"];
        }
    }["ChatWindow.useEffect"], [
        conversationId
    ]);
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
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendMessage"])(conversationId, text);
            if (result.success) {
                setText("");
            // The backend sends the message
            // through Socket.IO.
            //
            // We DO NOT add it here because
            // Socket.IO will add it.
            }
        } catch (error) {
            console.error("Send message error:", error);
        } finally{
            setSending(false);
        }
    }
    // ========================================================
    // NO CHAT SELECTED
    // ========================================================
    if (!conversationId) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#777"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Select a conversation"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.js",
                        lineNumber: 289,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Choose a chat to start messaging."
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.js",
                        lineNumber: 293,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.js",
                lineNumber: 287,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/ChatWindow.js",
            lineNumber: 277,
            columnNumber: 13
        }, this);
    }
    // ========================================================
    // RENDER
    // ========================================================
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            height: "100%"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "15px",
                    borderBottom: "1px solid #ddd"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                    children: "Chat"
                }, void 0, false, {
                    fileName: "[project]/components/ChatWindow.js",
                    lineNumber: 334,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ChatWindow.js",
                lineNumber: 326,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    overflowY: "auto",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                },
                children: [
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Loading messages..."
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.js",
                        lineNumber: 358,
                        columnNumber: 21
                    }, this),
                    !loading && messages.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: "#777"
                        },
                        children: "No messages yet."
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.js",
                        lineNumber: 368,
                        columnNumber: 21
                    }, this),
                    messages.map((message)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: "10px 14px",
                                borderRadius: "10px",
                                background: "#f1f1f1",
                                maxWidth: "70%",
                                alignSelf: String(message.sender_id) === String(getCurrentUserId()) ? "flex-end" : "flex-start"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: "12px",
                                        fontWeight: "bold",
                                        marginBottom: "4px"
                                    },
                                    children: message.display_name || message.username
                                }, void 0, false, {
                                    fileName: "[project]/components/ChatWindow.js",
                                    lineNumber: 401,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: message.content
                                }, void 0, false, {
                                    fileName: "[project]/components/ChatWindow.js",
                                    lineNumber: 415,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: "10px",
                                        color: "#888",
                                        marginTop: "4px"
                                    },
                                    children: new Date(message.created_at).toLocaleTimeString()
                                }, void 0, false, {
                                    fileName: "[project]/components/ChatWindow.js",
                                    lineNumber: 420,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, message.id, true, {
                            fileName: "[project]/components/ChatWindow.js",
                            lineNumber: 382,
                            columnNumber: 21
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: messagesEndRef
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.js",
                        lineNumber: 439,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.js",
                lineNumber: 345,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSendMessage,
                style: {
                    display: "flex",
                    gap: "10px",
                    padding: "15px",
                    borderTop: "1px solid #ddd"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: text,
                        onChange: (e)=>setText(e.target.value),
                        placeholder: "Type a message...",
                        style: {
                            flex: 1,
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "8px"
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.js",
                        lineNumber: 458,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: sending || !text.trim(),
                        children: sending ? "Sending..." : "Send"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.js",
                        lineNumber: 477,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.js",
                lineNumber: 447,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ChatWindow.js",
        lineNumber: 313,
        columnNumber: 9
    }, this);
}
_s(ChatWindow, "6bNUiVqIg89kBP7Q+cqQSTk4iMk=");
_c = ChatWindow;
// ============================================================
// GET CURRENT USER ID
// ============================================================
function getCurrentUserId() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        return user?.id || null;
    } catch  {
        return null;
    }
}
var _c;
__turbopack_context__.k.register(_c, "ChatWindow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createPrivateConversation",
    ()=>createPrivateConversation,
    "getConversationMembers",
    ()=>getConversationMembers,
    "getConversations",
    ()=>getConversations,
    "getMe",
    ()=>getMe,
    "getMessages",
    ()=>getMessages,
    "login",
    ()=>login,
    "logout",
    ()=>logout,
    "searchUsers",
    ()=>searchUsers,
    "sendMessage",
    ()=>sendMessage,
    "signup",
    ()=>signup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API_URL = ("TURBOPACK compile-time value", "http://localhost:5000") || "http://localhost:5000";
// ============================================================
// GENERIC API REQUEST
// ============================================================
async function apiRequest(endpoint, options = {}) {
    const token = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem("token") : "TURBOPACK unreachable";
    const headers = {
        "Content-Type": "application/json",
        ...options.headers || {}
    };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Request failed");
    }
    return data;
}
async function signup(username, email, password, display_name) {
    const data = await apiRequest("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
            username,
            email,
            password,
            display_name
        })
    });
    // Save JWT
    if (data.token) {
        localStorage.setItem("token", data.token);
    }
    return data;
}
async function login(email, password) {
    const data = await apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
            email,
            password
        })
    });
    if (data.token) {
        localStorage.setItem("token", data.token);
    }
    return data;
}
async function getMe() {
    return apiRequest("/api/auth/me");
}
async function logout() {
    try {
        await apiRequest("/api/auth/logout", {
            method: "POST"
        });
    } catch (error) {
        console.error("Logout error:", error);
    }
    localStorage.removeItem("token");
}
async function getConversations() {
    return apiRequest("/api/conversations");
}
async function searchUsers(search) {
    return apiRequest(`/api/conversations/users/search?search=${encodeURIComponent(search)}`);
}
async function createPrivateConversation(userId) {
    return apiRequest("/api/conversations/private", {
        method: "POST",
        body: JSON.stringify({
            user_id: userId
        })
    });
}
async function getConversationMembers(conversationId) {
    return apiRequest(`/api/conversations/${conversationId}/members`);
}
async function getMessages(conversationId) {
    return apiRequest(`/api/messages/${conversationId}`);
}
async function sendMessage(conversationId, content) {
    return apiRequest(`/api/messages/${conversationId}`, {
        method: "POST",
        body: JSON.stringify({
            content
        })
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/socket.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "socket",
    ()=>socket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
;
const SOCKET_URL = ("TURBOPACK compile-time value", "http://localhost:5000") || "http://localhost:5000";
const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])(SOCKET_URL, {
    autoConnect: false
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_09zdob4._.js.map