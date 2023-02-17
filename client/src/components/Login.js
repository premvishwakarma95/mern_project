import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import login from "../images/login.png"
import "../styles/login.css"
// Context api
import { UserContext } from '../App'

export default function Login() {

    const { state, dispatch } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch("/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });

        const data = res.json();

        if (res.status === 400 || !data) {
            window.alert("Invalid Credentials");
        } else {
            // dispatch is for context api, type is the name of action and payload is a value of state
            dispatch({ type: "USER", payload: true });
            window.alert("Login Successfully");
            navigate("/");
        }
    }

    return (
        <>
            <div class="section">
                <div className='img-link'>
                    <img src={login} alt="login image" class="login-image" />
                    <Link to="/signup" className='login-link'>Create an account</Link>
                </div>
                <div class="div1">
                    <h1>Log In</h1>
                    <form method="POST">
                        <div class="div">
                            <label htmlFor="email">
                                <i class="zmdi zmdi-email"></i>
                            </label>
                            <input class="inp" type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" autoComplete='off' placeholder="Your Email" />
                        </div>
                        <div class="div">
                            <label htmlFor="password">
                                <i class="zmdi zmdi-lock"></i>
                            </label>
                            <input class="inp" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='off' name="password" placeholder="Your Password" />
                        </div>
                        <div>
                            <input type="submit" name="signup" className='submit-btn' value="Log in" onClick={loginUser} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
