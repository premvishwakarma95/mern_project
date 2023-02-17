import React from 'react'
import { Link } from "react-router-dom"
import "../styles/error.css"

export default function Errorpage() {
    return (
        <>
            <p className='hi'>404</p>
            <div className='error'>
                <p className='hii'>WE ARE SORRY PAGE NOT FOUND!</p>
                <p>THE PAGE YOU ARE LOOKING FOR MIGHT HAVE BEEN REMOVED HAD ITS NAME CHANGED OR IS</p>
                <p className='hiii'>TEMPORARILY UNAVAILABEL</p>
                <Link to="/" className='link-error'>BACK TO HOME</Link>
            </div>
        </>
    )
}
