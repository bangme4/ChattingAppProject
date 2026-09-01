"use client";

import { useState } from "react";
import { signup } from "@/lib/api";

export default function SignupPage() {

    const [username, setUsername] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    async function handleSignup(e) {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const result = await signup({
                username,
                email,
                password,
                display_name: displayName,
            });


            if (!result.success) {
                setError(result.message);
                return;
            }


            localStorage.setItem(
                "token",
                result.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(result.user)
            );


            window.location.href = "/chat";


        } catch (error) {

            console.error(error);

            setError(
                "Could not connect to the server."
            );

        } finally {

            setLoading(false);
        }
    }


    return (
        <main
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f5f5f5",
            }}
        >

            <div
                style={{
                    width: "400px",
                    background: "white",
                    padding: "40px",
                    borderRadius: "12px",
                }}
            >

                <h1>Create Account</h1>

                <p>
                    Create your chat account
                </p>


                <form onSubmit={handleSignup}>

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                        required
                    />


                    <input
                        type="text"
                        placeholder="Display name"
                        value={displayName}
                        onChange={(e) =>
                            setDisplayName(e.target.value)
                        }
                        required
                    />


                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />


                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />


                    {error && (
                        <p style={{ color: "red" }}>
                            {error}
                        </p>
                    )}


                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating account..."
                            : "Sign Up"}
                    </button>

                </form>


                <p>
                    Already have an account?{" "}

                    <a href="/auth/login">
                        Login
                    </a>
                </p>

            </div>

        </main>
    );
}