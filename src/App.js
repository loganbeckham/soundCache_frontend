import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'


import Home from './pages/Home'
import Navbar from './components/navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Collections from './pages/myCollections'



const App = () => {

    const [samples, setSamples] = useState([])
    const [collections, setCollections] = useState([])

    const { user } = useAuthContext()



    return (
        <div className='App'>
            <BrowserRouter>
                <Navbar setSamples={setSamples}/>
                <Routes>
                    <Route
                        path='/'
                        element={<Home setCollections={setCollections} samples={samples} collections={collections}/>}
                    />
                    <Route
                        path='/login'
                        element={!user ? <Login/> : <Navigate to='/'/>}
                    />
                    <Route
                        path='/signup'
                        element={!user ? <Signup/> : <Navigate to='/' />}
                    />
                    <Route
                        path='/mycollections'
                        element={user ? <Collections setCollections={setCollections}/> : <Navigate to='/signup' />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;
