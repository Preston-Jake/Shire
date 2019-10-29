import React from 'react';
import Login from './Login';
import RegisterBtn from './RegisterBtn';

const Landing = () => {
    return (
        <div className="landing-wrapper">
            <div className="landing-header">
                <div className="landing-logo"></div>
                <h1 className="landing-title" >Shire</h1>
                <span className="landing-span">Awareness In Your Hands</span>
            </div>
            <div className="landing-body">
                <Login />
                <RegisterBtn />
            </div>
        </div>
    )
}
export default Landing;