import React, { useState } from 'react'
import './Login.css'

function Login() {
    // _______.handleInputChange = event => {
    //     set___State({...___State, [event.target.name]: event.target.value})
    //   }
    return (
        <div className="login-page">
            <form className="box">
                <h1>Login</h1>
                <input type="text" name="userName" placeholder="User Name" />
                <input type="password" name="password" placeholder="Password" />
                <input type="submit" name="submit" value="Login" />
            </form>
            <form className="box">
                <h1>Login</h1>
                <input type="text" name="userName" placeholder="User Name" />
                <input type="password" name="password" placeholder="Password" />
                <input type="submit" name="submit" value="Login" />
            </form>
        </div>
    )
}

export default Login
