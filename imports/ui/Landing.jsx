import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="landing-wrapper">
            <div className="landing-header">
                <img className="landing-logo" src="../../images/shire.png" alt="shire-logo" />
                <h1 className="landing-title" >Shire</h1>
                <span className="landing-span">Awareness In Your Hands</span>
            </div>
            <div className="landing-body">
                <Link to="/emissions">
                    <button className="btn-hz-green">
                        Looking Ahead
                    </button>
                </Link>
            </div>
        </div>
    )
}
export default Landing;