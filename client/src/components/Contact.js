import React from 'react'
import "../styles/contact.css"
import { useState, useEffect } from "react"

export default function About() {

    const [userData, setuserData] = useState({ name: "", email: "", phone: "", message: "" });

    const callContactPage = async () => {
        try {
            const res = await fetch("/getdata", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();

            setuserData({ ...userData, name: data.name, email: data.email, phone: data.phone });

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        callContactPage();
    }, []);

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setuserData({ ...userData, [name]: value })
    }

    // send data to backend
    const sendData = async (e) => {
        e.preventDefault();

        const { name, email, phone, message } = userData;

        const res = await fetch("/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, message
            })
        });

        const data = await res.json();

        if (!data) {
            window.alert("Message not send");
        } else {
            window.alert("Message send successfully");
            setuserData({ ...userData, message: "" });
        }
    }

    return (
        <>
            <div className='about-container'>
                <div className='icon-no'>
                    <div className='icon'>
                        <i class="zmdi zmdi-smartphone-iphone zmdi-hc-2x mdc-text-light-blue"></i>
                    </div>
                    <div>
                        <p className='phone'>Phone</p>
                        <p className='no'>+919926841408</p>
                    </div>
                </div>
                <div className='icon-no'>
                    <span className='icon'>
                        <i class="zmdi zmdi-email-open zmdi-hc-2x mdc-text-light-blue"></i>
                    </span>
                    <div>
                        <p className='phone'>Email</p>
                        <p className='no'>prem@gmail.com</p>
                    </div>
                </div>
                <div className='icon-no'>
                    <span className='icon'>
                        <i class="zmdi zmdi-home zmdi-hc-2x mdc-text-light-blue"></i>
                    </span>
                    <div>
                        <p className='phone'>Address</p>
                        <p className='no'>Inodre, Madhya Pradesh</p>
                    </div>
                </div>
            </div>


            <form method='POST' className='inputs'>
                <p className='lower-p'>Get in Touch</p>
                <div className='inpu-cont'>
                    <input type="text" name="name" className='a c' required="true" value={userData.name} onChange={handleInputs} placeholder='Your Name' />
                    <input type="email" name="email" className='a c' required="true" value={userData.email} onChange={handleInputs} placeholder='Your Email' />
                    <input type="number" name="phone" className='a b c' required="true" value={userData.phone} onChange={handleInputs} placeholder='Your Phone Number' />
                </div>
                <textarea className='textbox a' name="message" value={userData.message} onChange={handleInputs} placeholder='Message' cols="30" rows="10"></textarea>
                <button type='submit' onClick={sendData} className='btn'>Send Message</button>
            </form>
        </>
    )
}
