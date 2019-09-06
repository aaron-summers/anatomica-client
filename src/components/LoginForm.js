import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import {Link} from 'react-router-dom';

const LoginForm = ({ submit, header }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <Form className="split login-form" onSubmit={e => {
            e.preventDefault();
            submit({ username, password })
            setUsername('')
            setPassword('')
        }}>
            <span>{header}</span>
            <Form.Group className="username-group">
                <Form.Control placeholder="username" type="username" name="username" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group className="password-group">
                <Form.Control placeholder="Password" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>


            <Button type="submit">Login</Button>

        </Form>
    )
}

export default LoginForm