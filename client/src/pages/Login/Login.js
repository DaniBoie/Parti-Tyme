import React, { useState } from 'react'
import './Login.css'

function Login() {

    const [accountState, setAccountState] = useState({
        loginUsername: '',
        loginPassword: '',
        password1: '',
        password2:'',
        userEmail:'',
        username:'',
        user: []
    })

    accountState.handleInputChange = event => {
        setAccountState({ ...accountState, [event.target.name]: event.target.value })
    }

    accountState.handleLogin = event => {
        
    }


    return (
        <div className="login-page">
            <form className="login-form">
                <h1>Login</h1>
                <input type="text" name="loginUsername" placeholder="User Name" />
                <input type="password" name="loginPassword" placeholder="Password" />
                <input type="submit" name="submit" value="Login" />
            </form>

            <form className="signup-form">
                <h1>Sign Up</h1>
                <input type="text" name="userEmail" placeholder="Email" />
                <input type="text" name="username" placeholder="Full Name" />
                <input type="password" name="password1" placeholder="Password1" />
                <input type="password" name="password2" placeholder="Password2" />
                <input type="submit" name="submit" value="Submit" />
            </form>

        </div>
    )
}

export default Login
