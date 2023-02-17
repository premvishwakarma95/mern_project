import React, { useEffect, useState, } from 'react'
import { useNavigate } from 'react-router-dom'
import myImage from "../images/my.jpeg"
import "../styles/about.css"

export default function About() {

    const [userData, setuserData] = useState({});

    const navigate = useNavigate();

    const callAboutPage = async () => {
        try {
            const res = await fetch("/about", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            console.log(data);

            setuserData(data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            navigate("/login");
        }
    }

    useEffect(() => {
        callAboutPage();
    }, []);

    return (
        <>
            <form method='GET' className='a-f'>
                <div className='i-p'>
                    <img src={myImage} className="img-a" alt="author image" />
                    <div className='abc'>
                        <p className='prem'>Prem Vishwakarma Developer</p>
                        <p className='web'>Web Developer</p>
                    </div>
                </div>
                <div className='div-1'>
                    <div className='ab-me'>
                        <p className='p-u'>ID</p>
                        <p className='p-u'>Name</p>
                        <p className='p-u'>Email</p>
                        <p className='p-u'>Phone</p>
                        <p className='p-u'>Profession</p>
                    </div>
                    <div>
                        <p className='p-n'>{userData._id}</p>
                        <p className='p-n'>{userData.name}</p>
                        <p className='p-n'>{userData.email}</p>
                        <p className='p-n'>{userData.phone}</p>
                        <p className='p-n'>{userData.work}</p>
                    </div>
                </div>
            </form>
        </>
    )
}
