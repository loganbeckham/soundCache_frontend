import React from 'react'

const SearchResultCards = (props) => {
    return (
        <>
            <div className="col-12 col-md-6 col-lg-6 col-xl-4">
                <div className="card border-primary my-4" style={{minWidth: '350px'}}>
                    <div className="card-body text-center" style={{height: '175px'}}>
                        <h5 className="card-title pt-1" style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}> {props.sample.name} </h5>
                        <audio controls src={props.sample.previews["preview-hq-mp3"]}></audio>
                    </div>
                    <div className='dropdown'>
                        <button className='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton1' data-bs-toggle="dropdown" aria-expanded="false">Add To Collection</button>
                        <ul className='dropdown-menu' aria-labelledby="dropdownMenuButton1">
                            <li><a className='dropdown-item' href='/'>Action</a></li>
                        </ul>
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