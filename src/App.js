import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';
import axios from 'axios'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'


import Home from './pages/Home'
import Navbar from './components/navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'



const App = () => {

    const [userInput, setUserInput] = useState('')
    const [samples, setSamples] = useState([])
    const [collections, setCollections] = useState([])
    const { user } = useAuthContext()

    const handleUserInput = (event) => {
        event.preventDefault();
        setUserInput(event.target.value)
    }

    const getSamples = (event) => {
        event.preventDefault()
        axios
            .get(`https://freesound.org/apiv2/search/text/?query=${userInput}&fields=name,previews&token=ZDVZ805OUqVQk3TWEQ36CU9jC1eldzKvwPzYzAtZ`)
            .then((response) => {
                setSamples(response.data.results)
            })
    }

    useEffect(() => {
        axios
            .get('http://localhost:3000/collections/')
            .then((response) => {
                setCollections(response.data)
            })
    })

    return (
        <div className='App'>
            <BrowserRouter>
                <Navbar getSamples={getSamples} setSampeles={setSamples} handleUserInput={handleUserInput}/>
                <Routes>
                    <Route
                        path='/'
                        element={<Home samples={samples} collections={collections}/>}
                    />
                    <Route
                        path='/login'
                        element={!user ? <Login/> : <Navigate to='/'/>}
                    />
                    <Route
                        path='/signup'
                        element={!user ? <Signup/> : <Navigate to='/' />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;
