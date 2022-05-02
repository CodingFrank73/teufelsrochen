import { useState } from "react";
import { useNavigate } from "react-router-dom";

import apiBaseUrl from "../../api";
import "./login.scss"

// components
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";


const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const doLogin = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch(apiBaseUrl + "/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })

            const result = await response.json();

            if (result.err) {
                setError(result.err)

            } else {
                setError("")
                const token = result.token
                props.setToken(token)
                navigate("/dashboard")
            }
        }

        catch (error) {
            console.log("error...........");
        }

        finally {
            setEmail("");
            setPassword("");
        }
    }

    return (
        <div className="login">
            <Sidebar />
            <div className="loginContainer">
                <Navbar />
                <div className="top">
                    <div className="title">Login</div>
                    <form>
                        <div className="formInput">
                            <input
                                type="text"
                                name=""
                                id="email"
                                value={email}
                                placeholder="E-Mail-Adresse"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="formInput">
                            <input
                                type="password"
                                name=""
                                id="password"
                                value={password}
                                placeholder="Passwort"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="formButtons">
                            <button onClick={doLogin}>Einloggen</button>
                        </div>

                        {error && <p className="errorMessage">{error}</p>}
                    </form>
                </div >
            </div >
        </div >
    );
}

export default Login;