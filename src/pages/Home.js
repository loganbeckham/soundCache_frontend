import React, {useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext';
import { BsAsterisk } from 'react-icons/bs'

import SearchResultCards from '../components/searchResultCards'
import NewCollectionWithSample from '../components/newCollectionWithSample'

const App = (props) => {
    const { user } = useAuthContext()

    const [storedSample, setStoredSample] = useState('')
    const [showNewCollectionForm, setShowNewCollectionForm] = useState(false)


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
                    console.log(response.data)
                    props.setCollections(response.data)
                })
        }
    }, [user])

    return (
        <>
            <div className="bumper">
            </div>
            {!showNewCollectionForm ?
                <div className='resultBox'>
                    { (props.samples.length > 0) ? 
                        <div className='row' style={{width: '95vw'}}>
                            {props.samples.map((sample) => {
                                return (
                                    <SearchResultCards sample={sample} collection={props.collections} setCollections={props.setCollections} setShowNewCollectionForm={setShowNewCollectionForm} setStoredSample={setStoredSample}/>
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
            :
                <div className='resultBox'>
                    <NewCollectionWithSample storedSample={storedSample} setStoredSample={setStoredSample} setShowNewCollectionForm={setShowNewCollectionForm} setCollections={props.setCollections}/>
                </div>
            }
        </>
    )
}

export default App;