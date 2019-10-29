import React, { useState } from 'react';
import { Meteor } from 'meteor/mongo';
import { history } from 'history';


const handleSumbit = () => {
    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;
    Meteor.LoginWithPassword(email, password, (err) => {
        if (err) {
            setError = err
        } else {
            history.push("/")
        }
    })
}

const Login = () => {

    const [error, setError] = useState('');

    return (
        <div className="login-wrapper">
            {error.length > 0 ?
                <div className="alert alert-danger fade in">{error}</div>
                : ''}
            <form className="login-form">
                <input id="login-email" className="input-green" type="email" placeholder="email" />
                <input id="login-password" className="input-green" type="password" placeholder="password" />
                <button type="submit" className="btn-hz-green" onClick={() => { handleSumbit() }} >LOGIN</button>
            </form>
        </div>

    )
}

export default Login
