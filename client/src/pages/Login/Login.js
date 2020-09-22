import React, { useState } from 'react'
import axios from 'axios'
import './Login.css'

function Login() {

    const [accountState, setAccountState] = useState({
        loginUsername:'',
        loginPassword:'',
        password1:'',
        password2:'',
        userEmail:'',
        username:'',
        realname:'',
        user: []
    })

    accountState.handleInputChange = event => {
        setAccountState({ ...accountState, [event.target.name]: event.target.value })
    }

    accountState.handleLogin = event => {

    }

    accountState.handleSignUp = event => {
        event.preventDefault()

        if (accountState.password1=== accountState.password2) {

        axios.post('/api/users/register', {
            name: accountState.realname,
            email: accountState.userEmail,
            username: accountState.username,
            password: accountState.password1,
        })
            .then((res) => {
                setAccountState({
                    ...accountState, password1: '', password2: '', userEmail: '', username: '', realname: '',})
            })
            .catch(err => console.log(err))
        } else {
            alert('Unmatched Password')
        }
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
                <input type="text" name="userEmail" placeholder="Email" 
                    onChange={accountState.handleInputChange}/>
                <input type="text" name="realname" placeholder="realname" 
                    onChange={accountState.handleInputChange}/>
                <input type="text" name="username" placeholder="username" 
                    onChange={accountState.handleInputChange}/>
                <input type="password" name="password1" placeholder="Password1" 
                    onChange={accountState.handleInputChange}/>
                <input type="password" name="password2" placeholder="Password2" 
                    onChange={accountState.handleInputChange}/>
                <input type="submit" name="submit" value="Submit" 
                    onClick={accountState.handleSignUp}/>
            </form>

        </div>
    )
}

export default Login
