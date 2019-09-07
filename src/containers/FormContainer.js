import React from 'react';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm'
import { Navbar, Nav, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';

const FormContainer = ({ user, signUp, logIn, logOut }) => {
    return (
        <div>
            <Navbar bg="light" variant="info">
            <div>
                <Navbar.Brand>Anatomica</Navbar.Brand>
            </div>
            </Navbar>

            <div className="split left">
                <SignupForm submit={signUp} header={'Sign up'} />
            </div>
            <div className="split right">
                <LoginForm submit={logIn} header={'Log in'} />
            </div>
        </div>
    )
}

export default FormContainer