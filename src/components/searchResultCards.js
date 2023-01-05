import {useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Waveform from './waveform'
import { HiDownload } from 'react-icons/hi'
import { useAuthContext } from "../hooks/useAuthContext"
import { BsAsterisk } from 'react-icons/bs'

const SearchResultCards = (props) => {
    const { user } = useAuthContext()
    const navigate = useNavigate()
    
    const addToCollection = (result) => {
        axios.put(
            'https://soundcache-backend.herokuapp.com/collections/addTo/' + result,
            {
                name: props.sample.name,
                preview: props.sample.previews["preview-hq-mp3"]
            },
            {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }
        ).then(() => {
            console.log('done')
            // axios   
            //     .get('http://localhost:3000/collections/')
            //     .then((response) => {
            //         console.log(result)
            //     })
        })
    }

    const loginToCollect = () => {
        navigate('/login')
    }

    return (
        <>
            
            <div className="col-12 col-md-6 col-lg-6 col-xl-4 d-flex justify-content-center">
                <div className="card mt-5" style={{minWidth: '350px'}}>
                    <div className="card-body text-center" >
                        <h5 className="card-title pt-1" style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}> {props.sample.name} </h5>
                        <div className='wavebox'>
                            <Waveform audio={props.sample.previews["preview-hq-mp3"]}/>  
                        </div> 
                        <div className='card-bottom-row'> 
                            <a href="" download={props.sample.previews["preview-hq-mp3"]}>
                                <HiDownload className='download-btn' size='1.5em'/>     
                            </a>
                            { user ? 
                                <div className='dropdown'>
                                    <button className='btn dropdown-toggle add-to-collection' type='button' id='dropdownMenuButton1' data-bs-toggle="dropdown" aria-expanded="false">Add To Collection</button>
                                    <ul className='dropdown-menu dropdown-menu-end' aria-labelledby="dropdownMenuButton1">
                                        {props.collection.map((collection) => {
                                            return ( 
                                                <>
                                                    <li>
                                                        <button className='dropdown-item' onClick={(event) => {addToCollection(collection._id)}}>{collection.name}</button>
                                                    </li>
                                                </>
                                            )
                                        })
                                        }
                                    </ul>
                                </div>
                            :
                                <div>
                                    <button onClick={loginToCollect} className='btn add-to-collection'><BsAsterisk id='card-asterisk' size={'.7em'}/>Login to Collect</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// Stop Audio When New One Plays [credit to HoRn on stackOverflow]
document.addEventListener('play', function(e) {
    let audios = document.getElementsByTagName('audio');

    for (let i = 0; i < audios.length; i++) {
        if (audios[i] !== e.target) {
            audios[i].pause();
        }
    }
}, true);

export default SearchResultCards