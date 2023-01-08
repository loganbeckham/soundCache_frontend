import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { BsAsterisk } from 'react-icons/bs'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)
    }

    return (
        <>
        <div className="bumper">
        </div>
        <div className="d-flex justify-content-center">
            <div className="signupBox">
                <div className="w-100 h-25">
                    <BsAsterisk id="signup-asterisk" size={'3em'}/>
                </div>
                <div className="signup-top">
                    <h3>Create an Account </h3>
                    <p className="signup-text">With a SoundCache account, you can save samples, create collections, and more!</p>
                </div>
                
                <div className="signup-bottom">
                    <form className="signup-form" onSubmit={handleSubmit}>
                        <div className="px-4">
                            <label className="form-label"> Email: </label>
                            <input
                                className="form-control"
                                type='email'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                        <div className="p-4">
                        <label className="form-label"> Password: </label>
                        <input
                            className="form-control"
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        </div>
                        {error && <div className="error">{error}</div>}
                        <div>
                            <button className="btn btn-outline-light mt-2 mb-5 mx-4" disabled={isLoading}>Sign Up!</button>
                        </div>
                    </form>
                </div>
              
            </div>
        </div>
        </>
    )
}

export default Signup