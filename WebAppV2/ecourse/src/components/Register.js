import React, { useState, useRef } from 'react'
import { Form, Button, Container } from "react-bootstrap"
import Api, { endpoints } from '../configs/Api'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [newUser, setNewUser] = useState({
        "first_name": '',
        "last_name": '',
        "username": "",
        "password": ""
    })
    const avatar = useRef()
    const nav = useNavigate()

    const change = (obj) => {
        setNewUser({
            ...newUser, 
            ...obj
        })
    }

    const register = async (event) => {
        event.preventDefault()

        let data = new FormData()
        data.append('first_name', newUser.first_name)
        data.append('last_name', newUser.last_name)
        data.append('username', newUser.username)
        data.append('password', newUser.password)
        data.append('avatar', avatar.current.files[0])

        try {
            const res = await Api.post(endpoints['users'], data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (res.status === 201)
                nav("/login")
        } catch (error) {
            console.error(error)
        }
        
    }

    return (
        <Container>
            <h1 className="text-center text-danger">DANG KY NGUOI DUNG</h1>
            <Form onSubmit={register}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" value={newUser.first_name} onChange={(evt) => change({'first_name': evt.target.value})} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" value={newUser.last_name} onChange={(evt) => change({'last_name': evt.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={newUser.username} onChange={(evt) => change({'username': evt.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={newUser.password} onChange={(evt) => change({'password': evt.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>avatar</Form.Label>
                <Form.Control type="file" ref={avatar} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Dang ky
            </Button>
            </Form>
        </Container>
    )
}

export default Register