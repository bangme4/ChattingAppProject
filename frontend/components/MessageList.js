"use client";

export default function MessageList({
    conversationId
}) {

    return (
        <div
            style={{
                flex: 1,
                padding: "20px",
                overflowY: "auto",
                background: "#f7f7f7"
            }}
        >

            <div
                style={{
                    textAlign: "center",
                    color: "#888"
                }}
            >
                Messages for conversation{" "}
                {conversationId}
            </div>

        </div>
    );
}