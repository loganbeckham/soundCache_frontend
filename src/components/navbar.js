import { BsFileEarmarkMusic } from 'react-icons/bs'
import { Link, redirect, useNavigate} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react';
import axios from 'axios'
import React from 'react'



const Navbar = (props) => {

    const { logout } = useLogout()
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const [userInput, setUserInput] = useState('')

    const handleClick = () => {
        logout()
    }

    const handleUserInput = (event) => {
        event.preventDefault();
        setUserInput(event.target.value)
    }

    const getSamples = (event) => {
        event.preventDefault()
        axios
            .get(`https://freesound.org/apiv2/search/text/?query=${userInput}&fields=name,previews&token=ZDVZ805OUqVQk3TWEQ36CU9jC1eldzKvwPzYzAtZ`)
            .then((response) => {
                props.setSamples(response.data.results)
                window.scrollTo(0, 0)
                navigate('/')
            })
    }

    return(
            <nav className="navbar fixed-top">
                <div className="container-fluid">
                    <div className='brand-box'>
                        <Link to='/'>
                            <BsFileEarmarkMusic className='brand-logo' size='2em'/>
                        </Link>
                        <Link to='/' className="navbar-brand ms-2">
                            <h4 className='brand-name'>SoundCache</h4>
                        </Link>
                    </div>
                    <div className="d-flex nav-search">
                        <form className='d-flex form search-form' onSubmit={getSamples}>
                            <input className='input me-2' type="text" placeholder='Search Free Samples' onChange={handleUserInput}/>
                            <button className='btn' type='submit'>
                                <img style={{width: '2em', opacity: '.65'}} src='searchicon.png'></img>
                            </button>
                        </form>
                    </div>
                    {user ? 
                    (
                        // <div>
                        //     <span>{user.email}</span>
                        //     <button onClick={handleClick}>Log Out</button>
                        // </div>
                        <div className='login-signup'>
                            <div className='dropdown'>
                                <button className='btn dropdown-toggle nav-drop' type='button' id='dropdownMenuButton1' data-bs-toggle="dropdown" aria-expanded="false">{user.email}</button>
                                <ul className='dropdown-menu dropdown-menu-end' aria-labelledby="dropdownMenuButton1">
                                    <Link className='dropdown-item drop-link' to='/mycollections'>My Collections</Link>
                                    <button className='dropdown-item' onClick={handleClick}>Log Out</button>
                                </ul>
                            </div>
                        </div>
                    ):
                    (
                        <div className='login-signup'>
                            <Link to ='/login' className='px-3 nav-link'>Login</Link>
                            <Link to ='/signup' className='px-3 nav-link'>Signup</Link>
                        </div>
                    )}
                </div>
            </nav>
    )

}

export default Navbar