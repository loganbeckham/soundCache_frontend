import { useState } from "react"
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios"
import { BsAsterisk } from 'react-icons/bs'
import { useAuthContext } from "../hooks/useAuthContext"
import Waveform from '../components/waveform'
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Download from '@mui/icons-material/FileDownload';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const CollectionShowPage = (props) => {
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const [editCollection, setEditCollection] = useState({})
    const [renameSample, setRenameSample] = useState({})
    const [selectSample, setSelectSample] = useState()

    const runSelectSample = (sample) => {
        setSelectSample(sample)
        console.log(selectSample)
    }

    const handleNameChange = (event) => {
        setRenameSample({ ...renameSample, [event.target.name]: event.target.value})
    }

    const updateSampleName = (event) => {
        // event.preventDefault()
        console.log(renameSample)
        // axios
        //     .put(`https://soundcache-backend.herokuapp.com/collections/rename/${props.showCollection._id}/${selectedSample}`, renameSample, {
        //         headers: {
        //             'Authorization': `Bearer ${user.token}`
        //         }
        //     })
        //     .then((response) => {
        //         axios
        //             .get('https://soundcache-backend.herokuapp.com/collections/' + props.showCollection._id, {
        //                 headers: {
        //                     'Authorization': `Bearer ${user.token}`
        //                 }
        //             })
        //             .then((response) => {
        //                 props.setShowCollection(response.data)
        //             })
        //     })
    }

    const handleChange = (event) => {
        setEditCollection({ ...editCollection, [event.target.name]: event.target.value})
    }

    const handleUpdateCollection = (event) => {
        event.preventDefault();
        axios
            .put("https://soundcache-backend.herokuapp.com/collections/" + props.showCollection._id, editCollection, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            .then((response) => {
                axios
                    .get('https://soundcache-backend.herokuapp.com/collections/' + props.showCollection._id, {
                        headers: {
                            'Authorization': `Bearer ${user.token}`
                        }
                    })
                    .then((response) => {
                        props.setShowCollection(response.data)
                    })
            })
      }

    const handleDelete = (event) => {
        axios
          .delete("https://soundcache-backend.herokuapp.com/collections/" + event.target.value, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
          })
          .then((response) => {
            axios
                .get('https://soundcache-backend.herokuapp.com/collections', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                .then((response) => {
                    props.setCollections(response.data)
                })
            navigate('/mycollections')
          });
      };

    const test = () => {
        console.log(props.showCollection)
        console.log(editCollection)
    }

    return(
        <>
        <div className="bumper">
        </div>
        <div className="this-collection-container">

            <div className="this-collection-header">
                <img className="this-collection-image" src={props.showCollection.image}/>
                <div className="this-collection-right-box">

                        <h1 className="ms-5">{props.showCollection.name}</h1>
                        {props.showCollection.samples.length == 1 ? 
                            <p className="ms-5 collection-number"> {props.showCollection.samples.length} sound </p>
                            :
                            <p className="ms-5 collection-number"> {props.showCollection.samples.length} sounds </p>
                        }
                    <div className="this-collection-btn-box">
                        <Link to={`/mycollections/`} style={{ textDecoration: 'none' }}>
                            <button className="ms-2 btn btn-outline-light">Back</button>
                        </Link>
                        <div className="dropdown">
                            <button className="ms-2 btn btn-outline-light dropdown-toggle" type="button" onClick={test}data-bs-toggle="dropdown" aria-expanded="false">
                                Edit
                            </button>
                            <ul class="dropdown-menu">
                                <form onSubmit={handleUpdateCollection}>
                                    <li><input class="dropdown-item form-control" name="name" defaultValue={props.showCollection.name} onChange={handleChange} type="text"/></li>
                                    <li><input class="dropdown-item form-control" name="image" defaultValue={props.showCollection.image} onChange={handleChange} type="text"/></li>
                                    <li><hr class="dropdown-divider"/></li>
                                    <li><button class="dropdown-item" type="submit">Submit</button></li>
                                </form>
                            </ul>
                        </div>
                        <button className="ms-2 btn btn-outline-light" onClick={handleDelete} value={props.showCollection._id}>Delete</button>
                    </div>
                </div>
            </div>

            <div className='resultBox'>
                <div className='row' style={{width: '95vw'}}>
                    {props.showCollection.samples.map((sample) => {
                        return(
                        <div className="col-12 col-md-6 col-lg-6 col-xl-4 d-flex justify-content-center">
                            <div className="card mt-5" style={{minWidth: '350px'}}>
                                <div className="card-body text-center" >
                                    <h5 className="card-title pt-1" style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}> {sample.name} </h5>
                                    <div className='wavebox'>
                                        <Waveform audio={sample.preview}/>  
                                    </div> 
                                    <div className='card-bottom-row'> 
                                        <div id='download-box'>
                                            <Tooltip title="Instant Download" placement='right'>
                                                <IconButton className='download-btn-bg'>
                                                    <a href='#' className='download-btn-a' id='download-link liveToastBtn' download={sample.preview}><Download id='download-btn'/></a>
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                            <div className='dropdown' id='add-to-collection-box'>
                                                <Tooltip title="Rename Sample" placement="left">
                                                    <IconButton className='add-to-collection-bg'>
                                                        <EditIcon className='dropdown-toggle sample-edit-icon' type="button" id='dropdownMenuButton1' data-bs-toggle="dropdown" aria-expanded="false"/>
                                                                <ul className='dropdown-menu dropdown-menu-end' aria-labelledby="dropdownMenuButton1">
                                                                        <li>
                                                                            <form onSubmit={updateSampleName}>
                                                                                <input class="dropdown-item form-control" name="name" defaultValue={sample.name} onChange={handleNameChange} type="text"/>
                                                                                <button class="dropdown-item" type="submit">Rename</button>
                                                                            </form>
                                                                        </li>
                                                                </ul>
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>
        </div>
       
        </>
    )

}

export default CollectionShowPage
