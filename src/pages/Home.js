import React, {useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SearchResultCards from '../components/searchResultCards'

const App = (props) => {

    return (
        <>
            <div className='resultBox'>
                <div className='row' style={{width: '95vw'}}>
                    {props.samples.map((sample) => {
                        return (
                            <SearchResultCards sample={sample} collection={props.collections}/>
                        )
                    })
                    }
                </div>
            </div>
        </>
    )
}

export default App;