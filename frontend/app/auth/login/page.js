"use client";

import { useState } from "react";
import { login } from "@/lib/api";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    async function handleLogin(e) {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const result = await login(email, password);


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
        <main>

            <div>

                <h1>Welcome Back</h1>

                <p>
                    Login to your account
                </p>


                <form onSubmit={handleLogin}>

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
                            ? "Logging in..."
                            : "Login"}
                    </button>

                </form>


                <p>
                    Don't have an account?{" "}

                    <a href="/auth/signup">
                        Sign Up
                    </a>
                </p>

            </div>

        </main>
    );
}