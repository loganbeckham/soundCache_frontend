import React, {useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext';
import { BsAsterisk } from 'react-icons/bs'

import SearchResultCards from '../components/searchResultCards'

const App = (props) => {
    const { user } = useAuthContext()


    useEffect(() => {
        if (user) {
            axios
                .get('https://soundcache-backend.herokuapp.com/collections', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                .then((response) => {
                    console.log(user.token)
                    props.setCollections(response.data)
                })
        }
    }, [user])

    return (
        <>
            <div className='resultBox'>
                { (props.samples.length > 0) ? 
                    <div className='row' style={{width: '95vw'}}>
                        {props.samples.map((sample) => {
                            return (
                                <SearchResultCards sample={sample} collection={props.collections}/>
                            )
                        })
                        }
                    </div>
                :
                    <div className='home-boiler'>
                        < BsAsterisk id='asterisk' size={'5em'}/>
                        <h4>Use SoundCache to find royalty-free sounds!</h4>
                        
                        <h4>Get started by using the search bar to pull sound effects and samples from across the web.</h4>
                    </div>
                }
            </div>
        </>
    )
}

export default App;