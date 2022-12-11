import './App.css';
import React, {useState} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'

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
            <nav className="navbar navrbar-expand-la navbar-light" style={{backgroundColor: '#e3f2fd'}}>
                <div
            <form>
                <input type="text" onChange={handleUserInput}/>
            </form>
            <button onClick={getSamples}>search</button>
            <div className='row'>
                {samples.map((sample) => {
                    return (
                        <SearchResultCards sample={sample}/>
                    )
                })
                }
            </div>
        </>
    )
}

export default App;
