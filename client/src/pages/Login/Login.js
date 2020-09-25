import React, { useState } from 'react'
// import axios from 'axios'
import API from '../../utils/API'
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


    const user = { 
        realname: accountState.realname, 
        email: accountState.userEmail, 
        username: accountState.username, 
        password: accountState.password1, 
        account_type: 1 }

    const userLogin = {
        username: accountState.loginUsername,
        password: accountState.loginPassword
    }

    accountState.handleInputChange = event => {
        setAccountState({ ...accountState, [event.target.name]: event.target.value })
    }


    accountState.handleCheck = event => {
        event.preventDefault()
        API.loginUser(userLogin)
            .then(({data: token}) => {
                if (token) {
                    localStorage.setItem('user', token)
                    window.location = '/index.html'
                } else {
                    console.log('invalid credentials')
                }
            })
            .catch(err => console.log(err))
    }


    accountState.handleSignUp = event => {
        event.preventDefault()
        console.log(accountState.password1)
        if (accountState.password1 === accountState.password2) {
            console.log('passmatch')
            console.log(accountState.password1)
        API.registerUser(user)
            .then((res) => {
                setAccountState({ ...accountState, realname: '', userEmail: '', username: '', password1: '', password2: '' })
                console.log(res)
            })
            .catch(err => console.log(err))
        } else{
            alert('Unmatched Password')
        }
    }

    return (
        <div className="login-page">
            <form className="login-form">
                <h1>Login</h1>
                <input type="text" name="loginUsername" placeholder="User Name" onChange={accountState.handleInputChange}/>
                <input type="password" name="loginPassword" placeholder="Password" onChange={accountState.handleInputChange}/>
                <input type="submit" name="submit" value="Login"  onClick={accountState.handleCheck}/>
            </form>

            <form className="signup-form">
                <h1>Sign Up</h1>
                <input type="text" name="userEmail" placeholder="Email" onChange={accountState.handleInputChange} />
                <input type="text" name="username" placeholder="Login Name" onChange={accountState.handleInputChange}/>
                <input type="text" name="realname" placeholder="Full Name" onChange={accountState.handleInputChange}/>
                <input type="password" name="password1" placeholder="Password1" onChange={accountState.handleInputChange}/>
                <input type="password" name="password2" placeholder="Password2" onChange={accountState.handleInputChange}/>
                <input type="submit" name="submit" value="Submit" onClick={accountState.handleSignUp} />
            </form>

        </div>
    )
}

export default Login
