import { useState, useEffect } from "react"
import axios from "axios"
import { useAuthContext } from "../hooks/useAuthContext"

import NewCollection from '../components/newCollection';

const MyCollections = (props) => {
    const { user } = useAuthContext()

    const [showNewForm, setShowNewForm] = useState(false)

    const showNewCollectionForm = () => {
        setShowNewForm(true)
    }

    return (
        <>
        <div className="bumper">
        </div>
        {!showNewForm ?
            <>
            <h1 className="pt-5">My Collections</h1>
            <button onClick={showNewCollectionForm}>New Collection</button>
            <div className='resultBox'>
                <div className="row" style={{width: '95vw'}}>
                    {props.collections.map((collection) => {
                                if (collection.user_email == user.email) {
                                    return ( 
                                        <>
                                        <div className="col-12 col-md-6 col-lg-6 col-xl-4 d-flex justify-content-center">
                                            <div className="card mt-5" style={{minWidth: '350px'}}>
                                                <div className="card-body text-center" >
                                                    <h1 className="card-title pt-1" style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}> {collection.name} </h1>
                                                    <div>
                                                        <img src={collection.image}></img>
                                                    </div>
                                                    {collection.samples.length == 1 ? 
                                                    <h2> {collection.samples.length} sound </h2>
                                                    :
                                                    <h2> {collection.samples.length} sounds </h2>
                                                    }
                                                    <img></img>
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