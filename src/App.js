import './App.css';
import React, {useState} from 'react'
import axios from 'axios'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

import SearchResultCards from './components/searchResultCards'

const App = () => {

    const [userInput, setUserInput] = useState('')
    const [samples, setSamples] = useState([])

    const handleUserInput = (event) => {
        event.preventDefault();
        setUserInput(event.target.value)
    }

    const getSamples = () => {
        axios.get(`https://freesound.org/apiv2/search/text/?query=${userInput}&fields=name,previews&token=ZDVZ805OUqVQk3TWEQ36CU9jC1eldzKvwPzYzAtZ`).then((response) => {    
            console.log(response.data.results)
            setSamples(response.data.results)
            // console.log(samples)
        })
    }

    return (
        <>
            <nav className="navbar navrbar-expand-la navbar-light" style={{backgroundColor: 'white'}}>
                <div className="container-fluid">
                    <a className="navbar-brand ms-3" href="/">SoundCache</a>
                    <div className="d-flex">
                        <a className="me-4" href="/" style={{textDecoration: 'none', color: 'black'}}>Search</a>
                        <a className="me-4" href="/sessions/new" style={{textDecoration: 'none', color: "black"}}>Log In</a>
                    </div>
                </div>
            </nav>

            <div className='container'>
                <div className='d-flex flex-row pt-3 justify-content-center'>
                    <form className='d-inline-flex' style={{maxWidth: '100vw'}}>
                        <input className='form-control me-2 my-3' style={{minWidth: '40vw'}} type="text" placeholder='Search Free Samples' onChange={handleUserInput}/>
                    </form>
                    <button className='btn btn-outline-primary my-3' style={{minWidth: '125px'}} onClick={getSamples}>search</button>
                </div>
                <div className='row'>
                    {samples.map((sample) => {
                        return (
                            <SearchResultCards sample={sample}/>
                        )
                    })
                    }
                </div>
            </div>
        </>
    )
}

export default App;
