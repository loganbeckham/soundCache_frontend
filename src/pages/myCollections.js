import { useState, useEffect } from "react"
import axios from "axios"
import { useAuthContext } from "../hooks/useAuthContext"

import NewCollection from '../components/newCollection';
import CollectionShowPage from "./collectionShowPage";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

const MyCollections = (props) => {
    const { user } = useAuthContext()

    const [showNewForm, setShowNewForm] = useState(false)

    const showNewCollectionForm = () => {
        setShowNewForm(true)
    }

    useEffect(() => {
            axios
                .get('https://soundcache-backend.herokuapp.com/collections', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                .then((response) => {
                    console.log(user.token)
                    console.log(response.data)
                    props.setCollections(response.data)
                })
        }, [props.setCollections])

    return (
        <>
        <div className="bumper">
        </div>
        {!showNewForm ?
            <>
                <div className="collections-container">
                <div className="collections-header">
                    <h1 className="pt-5 w-100">My Collections</h1>
                    <button className="btn btn-outline-light my-collections-btn" onClick={showNewCollectionForm}> <AddIcon className="new-collection-icon"/>New Collection</button>
                </div>
                <div className='my-collections-box'>
                    <div className="row" style={{width: '95vw'}}>
                        {props.collections.map((collection) => {
                                    if (collection.user_email == user.email) {
                                        return ( 
                                            <>
                                                <div className="col-12 col-md-4 col-lg-4 col-xl-3 d-flex justify-content-center">
                                                    <div className="card collection-card mt-5" onClick={(e) => props.setShowCollection(collection)}style={{minWidth: '350px'}}>
                                                        <div className="card-body text-center" >
                                                            <Link to={`/showCollection`} style={{ textDecoration: 'none' }}>
                                                                    <div>
                                                                        <img className="collection-image mt-3 mb-3" src={collection.image}></img>
                                                                    </div>
                                                                    <div className="collection-info">
                                                                        <h5 className="card-title pt-1 w-100" style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}> {collection.name} </h5>

                                                                        {collection.samples.length == 1 ? 
                                                                        <p className="mt-2 collection-number"> {collection.samples.length} sound </p>
                                                                        :
                                                                        <p className="mt-2 collection-number"> {collection.samples.length} sounds </p>
                                                                        }
                                                                    </div>
                                                                </Link> 
                                                        </div>
                                                    </div>
                                                </div>
                                                       
                                            </>
                                        )
                                    }
                                })
                            }
                    </div>
                </div>
                </div>
            </>            
        :
            <div className='resultBox'>
                <NewCollection setCollections={props.setCollections} setShowNewForm={setShowNewForm}/>
            </div>
        }
        </>
    )
}

export default MyCollections