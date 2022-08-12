import React, { useEffect, useState } from 'react';
import { Offcanvas, Col, Card, Button, ButtonGroup, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCartThunk, getCartThunk, buyCartThunk, deleteCartThunk } from '../store/slices/cart.slice';

const CartSidebar = ({ show, handleClose }) => {

    const dispatch = useDispatch();
    const carts = useSelector(state => state.cart)
    const navigate = useNavigate();
    // console.log(carts)

    const [shopAdd, setShopAdd] = useState(1)

    const increment = () => {
        setShopAdd(shopAdd + 1)
    }

    const decrement = () => {
        setShopAdd(shopAdd - 1)
    }

    const addCart = (id) => {
        const cart = {
            id: id,
            quantity: shopAdd
        }
        dispatch(addCartThunk(cart))
        console.log(cart)
    }

    useEffect(() => {
        dispatch(getCartThunk())
    }, []);

    const getTotal = () => {
        let total = 0;

        carts?.forEach(product => {
            total += Number(product.price)
        });
        return total
    }

    return (
        <Container>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Your Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul className='container'>
                        {carts.map(cart => (
                            <Col key={cart.id} >
                                <Card className='mt-3'>
                                    <Card.Body onClick={() => navigate(`/product/${cart.id}`)}>
                                        <Card.Title> <small>{cart.brand}</small> </Card.Title>
                                        <Card.Title>   <b>{cart.title}</b> </Card.Title>
                                        <Card.Title>  <small> Quantity :</small>  {shopAdd} </Card.Title>
                                        <Card.Text>    <b>Price:</b> {cart.price}</Card.Text>
                                        <ButtonGroup size="sm" className="  gap-3">
                                            <Button
                                                disabled={shopAdd === 1}
                                                onClick={decrement}
                                            >-</Button>
                                            <small className='p-2'>{shopAdd}</small>
                                            <Button
                                                onClick={increment}
                                            > +</Button>
                                            <Button onClick={() =>addCart(cart.id)} variant="success" id="button-addon2">
                                                <i className="fa-solid fa-cart-shopping p-2"></i>
                                            </Button>
                                        </ButtonGroup>
                                        <Card.Text>    </Card.Text>
                                        <Button variant="danger" onClick={() => dispatch(deleteCartThunk(cart.id))}><i className="fa-solid fa-delete-left" p-2></i></Button>


                                    </Card.Body>

                                </Card>
                            </Col>
                        ))}
                        <div> Total $: {getTotal()} </div>
                        <Button onClick={() => dispatch(buyCartThunk())} className='m-3'>Checkout</Button>

                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </Container>
    );
};

export default CartSidebar;