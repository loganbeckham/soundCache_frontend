import React from 'react'
import axios from 'axios'


const SearchResultCards = (props) => {

    const addToCollection = (result) => {
        axios.put(
            'http://localhost:3000/collections/addTo/' + result,
            {
                name: props.sample.name,
                preview: props.sample.previews["preview-hq-mp3"]
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

    return (
        <>
            <div className="col-12 col-md-6 col-lg-6 col-xl-4">
                <div className="card border-primary my-4" style={{minWidth: '350px'}}>
                    <div className="card-body text-center" style={{height: '175px'}}>
                        <h5 className="card-title pt-1" style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}> {props.sample.name} </h5>
                        <audio controls src={props.sample.previews["preview-hq-mp3"]}></audio>
                        <div className='d-flex justify-content-center pt-2'>
                            <div className='dropdown'>
                                <button className='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton1' data-bs-toggle="dropdown" aria-expanded="false">Add To Collection</button>
                                <ul className='dropdown-menu' aria-labelledby="dropdownMenuButton1">
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