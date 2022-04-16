import React, { useContext, useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { UserContext } from '../App'
import { Navigate } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [user, dispatch] = useContext(UserContext)

    const login = (event) => {
        event.preventDefault()

        if (username === "admin" && password === "123") {
            dispatch({
                "type": "login",
                "payload": {
                    "username": "admin"
                }
            })
        }
    }

    if (user != null)
        return <Navigate to="/" />

    return (
        <Container>
            <h1 className="text-center text-danger">DANG NHAP</h1>
            <Form onSubmit={login}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="test" value={username} onChange={evt => setUsername(evt.target.value)} placeholder="Nhap username..." />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={evt => setPassword(evt.target.value)} placeholder="Nhap password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Dang nhap
            </Button>
            </Form>
        </Container>
    )
}

export default Login