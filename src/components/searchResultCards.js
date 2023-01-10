import {useEffect, useRef, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import Waveform from './waveform'
import { HiDownload } from 'react-icons/hi'
import { useAuthContext } from "../hooks/useAuthContext"
import { BsAsterisk } from 'react-icons/bs'
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Download from '@mui/icons-material/FileDownload';
import AddIcon from '@mui/icons-material/Add';

import NewCollectionWithSample from './newCollectionWithSample'

// import { Tooltip } from 'bootstrap/dist/js/bootstrap.bundle.min'

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
            axios   
                .get('https://soundcache-backend.herokuapp.com/collections',
                {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                .then((response) => {
                    // console.log(response.data)
                    props.setCollections(response.data)
                })
        })
    }

    const loginToCollect = () => {
        navigate('/login')
    }

    const storeSample = () => {
        props.setStoredSample(
            {
                name: props.sample.name,
                preview: props.sample.previews["preview-hq-mp3"]
            }
        )
        props.setShowNewCollectionForm(true)
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
                            <div id='download-box'>
                                <Tooltip title="Instant Download" placement='right'>
                                    <IconButton className='download-btn-bg'>
                                        <a href='#' className='download-btn-a' id='download-link liveToastBtn' download={props.sample.previews["preview-hq-mp3"]}><Download id='download-btn'/></a>
                                    </IconButton>
                                </Tooltip>
                            </div>
                            { user ? 
                                <div className='dropdown' id='add-to-collection-box'>
                                    <Tooltip title="Add to Collection" placement="left">
                                        <IconButton className='add-to-collection-bg'>
                                            <AddIcon className='dropdown-toggle add-to-collection' type="button" id='dropdownMenuButton1' data-bs-toggle="dropdown" aria-expanded="false"/>
                                                    <ul className='dropdown-menu dropdown-menu-end' aria-labelledby="dropdownMenuButton1">
                                                        {props.collection.map((collection) => {
                                                            if (collection.user_email == user.email) {
                                                                return ( 
                                                                    <>
                                                                        <li>
                                                                            <button className='dropdown-item' onClick={(event) => {addToCollection(collection._id)}}>{collection.name}</button>
                                                                        </li>
                                                                    </>
                                                                )
                                                            }
                                                        })
                                                        }
                                                        <li><hr class="dropdown-divider"/></li>
                                                        <li>
                                                                <button className='dropdown-item' onClick={storeSample}>New Collection</button>
                                                        </li>
                                                    </ul>
                                        </IconButton>
                                    </Tooltip>

                                </div>
                            :
                                <div id='login-to-collect-box'>
                                    <Tooltip title="Log In to Collect!" placement="left">
                                        <IconButton className='login-to-collect-bg'>
                                            <AddIcon id='login-to-collect' onClick={loginToCollect}/>
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            </>
    )
}


export default SearchResultCards