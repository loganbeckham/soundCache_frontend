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
                        <form className='d-flex pt-1'>
                            <input className='form-control form-control me-2' type="text" placeholder='Search Free Samples' onChange={handleUserInput}/>
                            <button className='btn btn-outline-primary' onClick={getSamples}>search</button>
                        </form>
                    </div>

                </div>
            </nav>

            <div className='container'>
                
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
