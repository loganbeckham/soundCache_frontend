import React from 'react'
import axios from 'axios'
import AudioPlayer from 'react-modern-audio-player'




const SearchResultCards = (props) => {

    const playList = [
        {
            name: props.sample.name,
            src: props.sample.previews["preview-hq-mp3"],
            id: props.sample,
        }
    ]

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
            <div className='audio-box'>
                <div className='player-container'>
                    <AudioPlayer
                        playList={playList}
                        audioInitialState={{
                        muted: true,
                        volume: 0.2,
                        curPlayId: props.sample,
                        }}
                        placement={{
                        interface: {
                            templateArea: {
                                trackTimeDuration: "row1-5",
                                progress: "row1-4",
                                playButton: "row1-6",
                                repeatType: "row1-7",
                                volume: "row1-8",
                            },
                        },
                        player: "static",
                        }}
                        activeUI={{
                        all: true,
                        progress: "waveform",
                        playList: false,
                        }}
                        rootContainerProps={{
                            colorScheme: "dark",
                        }}
                    />
                </div>
            </div>
            {/* <div className="col-12 col-md-6 col-lg-6 col-xl-4">
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
            </div> */}
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