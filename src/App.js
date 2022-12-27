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

    const getSamples = () => {
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
        <>
            <nav className="navbar navrbar-expand-la navbar-light" style={{backgroundColor: 'white'}}>
                <div className="container-fluid">
                    <a className="navbar-brand ms-3" href="/">SoundCache</a>
                    <div className="d-flex">
                        <form className='d-flex pt-1'>
                            <input className='form-control form-control me-2' type="text" placeholder='Search Free Samples' onChange={handleUserInput}/>
                        </form>
                        <button className='btn btn-outline-primary mt-1' type='submit' onClick={getSamples}>search</button>
                    </div>

                </div>
            </nav>

            <div className='container'>
                
                <div className='row'>
                    {samples.map((sample) => {
                        return (
                            <SearchResultCards sample={sample} collection={collections} setCollections={setCollections}/>
                        )
                    })
                    }
                </div>
            </div>
        </>
    )
}

export default App;
