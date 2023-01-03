import { useState, useEffect } from "react"
import axios from "axios"
import { useAuthContext } from "../hooks/useAuthContext"

const MyCollections = (props) => {
    const [newName, setNewName] = useState('')
    const [newImage, setNewImage] = useState('')
    const { user } = useAuthContext()

    const handleNewName = (event) => {
        setNewName(event.target.value)
    }

    const handleNewImage = (event) => {
        setNewImage(event.target.value)
    }

    const handleNewCollectionForm = (e) => {
        e.preventDefault()

        if (!user) {
            console.log('You must be logged in')
            return
        }

        axios.post(
            'https://soundcache-backend.herokuapp.com/collections',
            {
                name:newName,
                image:newImage,
                samples:[],
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
                    props.setCollections(response.data)
                })
        })
        e.target.reset()
    }


    return (
        <>
        <h1 className="pt-5">My Collections</h1>
        
        <section id='addNew'>
                <form onSubmit={handleNewCollectionForm}>
                    Name: <input type="text" onChange={handleNewName}/><br/>
                    Image: <input type="text" onChange={handleNewImage}/><br/>
                    <input type="submit" value="Add Collection"/>
                </form>
        </section>
        </>
    )
}

export default MyCollections