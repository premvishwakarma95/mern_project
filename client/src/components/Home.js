import React from 'react'
import "../styles/home.css"
import { useEffect, useState } from "react"

export default function Home() {

    const [userData, setuserData] = useState();
    const [work, setwork] = useState();
    const [show, setShow] = useState(false);

    const callContactPage = async () => {
        try {
            const res = await fetch("/getdata", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();

            setuserData(data.name);
            setwork(data.work);
            setShow(true);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        callContactPage();
    }, []);

    return (
        <>
            <div className='div-c'>
                <p className='p-1'>WELCOME TO MERN PROJECT</p>
                <p className='p-2'>{show ? `${userData} is a ${work}` : "I am a Mern Developer"}</p>
            </div>
            <div className='home-ui'>
                <div className='h-div1'></div>
                <div className='h-div2'></div>
            </div>
        </>
    )
}
