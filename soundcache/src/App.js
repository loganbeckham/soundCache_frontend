import './App.css';
import React, {useState} from 'react'
import axios from 'axios'

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
        })
    }

    return (
        <>
            <h1>H1</h1>
            <form>
                <input type="text" onChange={handleUserInput}/>
            </form>
            <button onClick={getSamples}>search</button>
        </>
    )
}

export default App;
