const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";


// ============================================================
// GENERIC API REQUEST
// ============================================================

async function apiRequest(endpoint, options = {}) {

    const token =
        typeof window !== "undefined"
            ? localStorage.getItem("token")
            : null;

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {})
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,
            headers
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Request failed"
        );
    }

    return data;
}


// ============================================================
// AUTH - SIGNUP
// ============================================================

export async function signup(
    username,
    email,
    password,
    display_name
) {

    const data = await apiRequest(
        "/api/auth/signup",
        {
            method: "POST",

            body: JSON.stringify({
                username,
                email,
                password,
                display_name
            })
        }
    );


    // Save JWT
    if (data.token) {

        localStorage.setItem(
            "token",
            data.token
        );

    }


    return data;
}


// ============================================================
// AUTH - LOGIN
// ============================================================

export async function login(email, password) {
    const data = await apiRequest(
        "/api/auth/login",
        {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            })
        }
    );

    if (data.token) {
        localStorage.setItem("token", data.token);
    }

    return data;
}


// ============================================================
// AUTH - GET CURRENT USER
// ============================================================

export async function getMe() {

    return apiRequest(
        "/api/auth/me"
    );

}


// ============================================================
// AUTH - LOGOUT
// ============================================================

export async function logout() {

    try {

        await apiRequest(
            "/api/auth/logout",
            {
                method: "POST"
            }
        );

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );

    }


    localStorage.removeItem(
        "token"
    );

}


// ============================================================
// CONVERSATIONS
// ============================================================

export async function getConversations() {

    return apiRequest(
        "/api/conversations"
    );

}


export async function searchUsers(search) {

    return apiRequest(
        `/api/conversations/users/search?search=${encodeURIComponent(search)}`
    );

}


export async function createPrivateConversation(
    userId
) {

    return apiRequest(
        "/api/conversations/private",
        {
            method: "POST",

            body: JSON.stringify({
                user_id: userId
            })
        }
    );

}


export async function getConversationMembers(
    conversationId
) {

    return apiRequest(
        `/api/conversations/${conversationId}/members`
    );

}


// ============================================================
// MESSAGES
// ============================================================

export async function getMessages(
    conversationId
) {

    return apiRequest(
        `/api/messages/${conversationId}`
    );

}


export async function sendMessage(
    conversationId,
    content
) {

    return apiRequest(
        `/api/messages/${conversationId}`,
        {
            method: "POST",

            body: JSON.stringify({
                content
            })
        }
    );

}