import React, { useState } from 'react';
import { Navbar, Container, Nav, Button, Offcanvas } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CartSidebar from './CartSidebar';

const NavBar = () => {

    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const token = localStorage.getItem("token");
    const handleClose = () => setShow(false);
    
    const handleShow = () => {
        if(token){
            setShow(true);
        }else {
            navigate("/login")
        }
    }
    
    const logout = () => {
        localStorage.setItem("token", "")
        navigate("/login")
    }

    

    
    return (
        <>
            <Navbar bg="light" expand="lg" className='mt-2'>
                <Container>
                    <Navbar.Brand href="/#/">  <b>E-comerce</b> <i className="fa-solid fa-cash-register"></i></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className='justify-content-end' id="basic-navbar-nav" >
                        <Nav >
                            <Nav.Link style={{marginLeft: '5px', marginRight: '10px'}} as={Button} href="/#/"><i className="fa-solid fa-house-user p-2"></i></Nav.Link>
                            {/* <Nav.Link href="/#/product">product</Nav.Link> */}
                            <Nav.Link  style={{marginLeft: '5px', marginRight: '10px'}} as={Button} href="/#/purchases"><i className="fa-solid fa-file-invoice-dollar p-2"></i></Nav.Link>
                            {
                                token ? (<Nav.Link as={Button} onClick={logout} style={{marginLeft: '5px', marginRight: '10px'}} ><i className="fa-solid fa-arrow-right-from-bracket p-2" ></i></Nav.Link>
                                ) : (
                                    <Nav.Link href="/#/login"><i className="fa-solid fa-user p-2"></i></Nav.Link>
                                )
                            }
                            <Nav.Link style={{marginLeft: '5px', marginRight: '5px'}} as={Button} onClick={handleShow}><i className="fa-solid fa-bag-shopping p-2"></i></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <CartSidebar show={show} handleClose={handleClose}/>
        </>
    );
};

export default NavBar

