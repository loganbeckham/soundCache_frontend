import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

import SearchResultCards from './components/searchResultCards'

const App = () => {

    const [userInput, setUserInput] = useState('')
    const [samples, setSamples] = useState([])
    const [collections, setCollections] = useState([])

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

    const testButton = () => {
        console.log(samples[0])
    }

    return (
        <>
            <nav className="navbar">
                <div className="container-fluid justify-content-between">
                    <a className="navbar-brand ms-3 mt-2" href="/">SoundCache</a>
                    <div className="d-flex">
                        <form className='d-flex form mt-2' onSubmit={getSamples}>
                            <input className='input me-2' type="text" placeholder='Search Free Samples' onChange={handleUserInput}/>
                            <button className='btn' type='submit'>
                                <img style={{width: '2em', opacity: '.65'}} src='searchicon.png'></img>
                        </button>
                        </form>
                        
                        
                    </div>
                    <div>
                        <p>hi asdfasdfas</p>
                    </div>

                </div>
            </nav>
            <button onClick={testButton}>
                test
            </button>
                
                <div className='row'>
                    {samples.map((sample) => {
                        return (
                            <SearchResultCards sample={sample} collection={collections}/>
                        )
                    })
                    }
                </div>

        </>
    )
}

export default App;
