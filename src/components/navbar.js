import { BsFileEarmarkMusic } from 'react-icons/bs'
import { Link } from 'react-router-dom'


const Navbar = (props) => {

    return(
            <nav className="navbar fixed-top">
                <div className="container-fluid justify-content-between">
                    <div className='brand'>
                        <Link to='/'>
                            <BsFileEarmarkMusic className='brand-logo' color='white' size='2em'/>
                        </Link>
                        <Link to='/' className="navbar-brand ms-1">
                            <h4>SoundCache</h4>
                        </Link>
                    </div>
                    <div className="d-flex">
                        <form className='d-flex form' onSubmit={props.getSamples}>
                            <input className='input me-2' type="text" placeholder='Search Free Samples' onChange={props.handleUserInput}/>
                            <button className='btn' type='submit'>
                                <img style={{width: '2em', opacity: '.65'}} src='searchicon.png'></img>
                            </button>
                        </form>
                    </div>
                    <div >
                        <Link to ='/login'>Login</Link>
                        <Link to ='/signup'>Signup</Link>
                    </div>

                </div>
            </nav>
    )

}

export default Navbar