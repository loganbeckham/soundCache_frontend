import { useState } from "react"
import { useLogin } from '../hooks/useLogin'
import { BsAsterisk } from 'react-icons/bs'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <>
            <div className="bumper">
            </div>
            <div className="loginBox">
                <BsAsterisk id="login-asterisk" size={'3em'}/>
                <div>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label"> Email: </label>
                            <input
                                className="form-control"
                                type='email'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                        <div className="mb-3">
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
                            <button className="btn btn-outline-light" disabled={isLoading}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login