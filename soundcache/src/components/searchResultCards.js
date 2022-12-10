import React from 'react'

const SearchResultCards = (props) => {
    return (
        <>
            <div className="col-12 col-md-6 col-lg-6 col-xl-4">
                <div className="card border-primary my-4" style={{minWidth: '350px'}}>
                    <div className="card-body text-center" style={{height: '175px'}}>
                        <h5 className="card-title pt-1"> {props.sample.name} </h5>
                        <audio controls src={props.sample.previews["preview-hq-mp3"]}></audio>
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