import { useState } from "react"
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios"
import { BsAsterisk } from 'react-icons/bs'
import { useAuthContext } from "../hooks/useAuthContext"

const NewCollection = (props) => {
    const { user } = useAuthContext()

    const [collectionName, setCollectionName] = useState('')
    const [collectionImage, setCollectionImage] = useState('')

    const handleNewForm = (e) => {
        e.preventDefault()

        if (!user) {
            console.log('You must be logged in')
            return
        }

        axios.post(
            'https://soundcache-backend.herokuapp.com/collections',
            {
                name:collectionName,
                image:collectionImage,
                samples:[],
                user_email:user.email,
            },
            {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }
        ).then(() => {
            axios   
                .get('https://soundcache-backend.herokuapp.com/collections', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                .then((response) => {
                    console.log(user.email)
                    props.setCollections(response.data)
                    props.setShowNewForm(false)

                })
        })
        e.target.reset()
    }

    const backToCollectionsBtn = () => {
        props.setShowNewForm(false)
    }

    return (
        <>
            <div className="bumper">
            </div>
            <div className="new-collection-box">
                <h1>New Collection</h1>
                <BsAsterisk id="collection-asterisk" size={'3em'}/>
                <div>
                    <form className="new-collection-form" onSubmit={handleNewForm}>
                        <div className="mb-3">
                            <label className="form-label"> Collection Name: </label>
                            <input
                                className="form-control"
                                type='text'
                                onChange={(e) => setCollectionName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label"> Image: </label>
                            <input
                                className="form-control"
                                type='text'
                                onChange={(e) => setCollectionImage(e.target.value)}
                            />
                            <div className="error">*find an image you like online and drop the link here!</div>
                        </div>
                        <div>
                            <button className="btn btn-outline-light" type="submit">Create Collection</button>
                            <button className="btn btn-outline-light ms-3" onClick={backToCollectionsBtn}>Back</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default NewCollection