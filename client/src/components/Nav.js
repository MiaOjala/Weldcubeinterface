import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <Navbar bg="dark" variant="dark" className='mb-2' sticky="top">
            <Container>
                <Navbar.Brand><NavLink className="navlink" to="/">WeldCube</NavLink></Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Nav