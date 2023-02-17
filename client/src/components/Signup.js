import React from 'react'
import { useState } from "react"
import photo from "../images/photo.png"
import "../styles/sign.css"
import { Link, useNavigate } from "react-router-dom"

export default function Signup() {
    const [user, setuser] = useState({ name: "", email: "", phone: "", work: "", work: "", password: "", cpassword: "" });
    const navigate = useNavigate();

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setuser({ ...user, [name]: value })
    }


    // to connect fontend to backend
    const postData = async (e) => {
        e.preventDefault();

        const { name, email, phone, work, password, cpassword } = user;
        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        });

        const data = await res.json();

        if (data.status === 422 || !data) {
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        } else {
            window.alert("Registration Successfully");
            console.log("Registration Successfully");
            navigate("/login");
        }
    }

    return (
        <>
            <div class="section">
                <div class="div1">
                    <h1>Sign Up</h1>
                    <form method="POST">
                        <div class="div">
                            <label htmlFor="name">
                                <i class="zmdi zmdi-account-calendar"></i>
                            </label>
                            <input class="inp" type="text" name="name" autoComplete='off' placeholder="Your Name" value={user.name} onChange={handleInputs} />
                        </div>
                        <div class="div">
                            <label htmlFor="email">
                                <i class="zmdi zmdi-email"></i>
                            </label>
                            <input class="inp" type="email" name="email" autoComplete='off' placeholder="Your Email" value={user.email} onChange={handleInputs} />
                        </div>
                        <div class="div">
                            <label htmlFor="phone">
                                <i class="zmdi zmdi-phone-in-talk"></i>
                            </label>
                            <input class="inp ap" type="number" name="phone" autoComplete='off' placeholder="Your Number" value={user.phone} onChange={handleInputs} />
                        </div>
                        <div class="div">
                            <label htmlFor="work">
                                <i class="zmdi zmdi-slideshow"></i>
                            </label>
                            <input class="inp" type="text" name="work" autoComplete='off' placeholder="Your Profession" value={user.work} onChange={handleInputs} />
                        </div>
                        <div class="div">
                            <label htmlFor="password">
                                <i class="zmdi zmdi-lock"></i>
                            </label>
                            <input class="inp" type="password" autoComplete='off' name="password" placeholder="Your Password" value={user.password} onChange={handleInputs} />
                        </div>
                        <div class="div">
                            <label htmlFor="cpassword">
                                <i class="zmdi zmdi-account-calendar"></i>
                            </label>
                            <input class="inp" type="password" name='cpassword' autoComplete='off' placeholder="Confirm Your Password" value={user.cpassword} onChange={handleInputs} />
                        </div>
                        <div>
                            <input type="submit" name="signup" className='submit-btn' value="Register" onClick={postData} />
                        </div>
                    </form>
                </div>
                <img src={photo} alt="animated image" class="img" />
                <Link to="/login" className='link'>I am already registered</Link>
            </div>
        </>
    )
}
