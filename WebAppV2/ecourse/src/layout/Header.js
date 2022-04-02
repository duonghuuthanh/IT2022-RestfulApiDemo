import React, { useState, useEffect } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Header = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const loadCategories = async () => {
            let res = await fetch("/data.json")
            let data = await res.json()
            setCategories(data)
        }

        loadCategories()
    }, [])

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Link to="/" className="nav-link">Trang chu</Link>

                    {categories.map(c => <Link to="/?cateId=1" className="nav-link">{c.name}</Link>)}

                    
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
 
    )
}

export default Header