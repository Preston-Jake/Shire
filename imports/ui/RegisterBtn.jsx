import React from 'react';
import { Link } from 'react-router';

const RegisterBtn = () => {
    return (
        <Link to="/register">
            <button className="btn-hz-orange">
                REGISTER
            </button>
        </Link>
    )
}

export default RegisterBtn;