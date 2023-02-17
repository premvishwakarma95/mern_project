import React, { useContext } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import { Link } from 'react-router-dom'
import logo from "../images/logo.png"
import "../styles/navbar.css"
import { UserContext } from '../App'

export default function Navbar() {

    const { state, dispatch } = useContext(UserContext)

    const RenderMenu = () => {
        console.log("navbar");
        if (state) {
            return (
                <>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="about">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="contact">Contact</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="logout">Logout</Link>
                    </li>
                </>
            )
        } else {
            return (
                <>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="about">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="contact">Contact</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="login">LogIn</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="signup">Registration</Link>
                    </li>
                </>
            )
        }
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="#">
                    <img src={logo} alt="logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <RenderMenu />
                    </ul>
                </div>
            </nav>
        </div>
    )
}
