import React, { useEffect, useState } from 'react';
import { filterCategoryThunk, filterTitleThunk, getNewsProductsThunk } from '../store/slices/products.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row, Card, Col, InputGroup, Form, Button, ListGroup, ListGroupItem, Container } from 'react-bootstrap'
import axios from 'axios';
import { addCartThunk } from '../store/slices/cart.slice';


const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [categories, setCategories] = useState([])
    const [shopAdd, setShopAdd] = useState(1)

    const products = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getNewsProductsThunk())
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories))
    }, [])
    
    const addCart = (id) => {
        alert('add')
        const cart = {
            id: id,
            quantity: shopAdd
        }
        dispatch(addCartThunk(cart))
        console.log(cart)
    }

    return (
        <Container>
            <Row>
                <Col lg={3}>
                    <ListGroup style={{ textAlign: 'center' }}>
                        <h1 className='m-4' style={{ textAlign: 'center' }}>Home</h1>
                        <ListGroupItem ><b>Categories <i className="fa-solid fa-caret-down"></i></b> </ListGroupItem>
                        {
                            categories.map((category) => (
                                <ListGroupItem  style={{ cursor: 'pointer' }}
                                    key={category.id}
                                    onClick={() => dispatch(filterCategoryThunk(category.id))}
                                >
                                    {category.name}
                                </ListGroupItem>
                            ))
                        }
                    </ListGroup>
                </Col>
                <Col>
                    <InputGroup className="mb-3 mt-5 card-home">
                        <Form.Control
                            placeholder="Recipient's date"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={e => setSearchValue(e.target.value)}
                            value={searchValue}
                        />
                        <Button variant="outline-secondary" onClick={() => dispatch(filterTitleThunk(searchValue))}>
                            <i className="fa-solid fa-magnifying-glass-dollar"></i>
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
            <Row xs={1} md={2} xl={3} className="g-4 m-3" >

                {
                    products.map(productItem => (
                      
                            <Col  key={productItem.id}   >
                                <Card className='card-home p-5' style={{ cursor: 'pointer' }}>
                                    <Card.Img variant="top" src={productItem.productImgs[0]} onClick={() => navigate(`/product/${productItem.id}`)} />
                                    <Card.Body  onClick={() => navigate(`/product/${productItem.id}`)}>
                                        <Card.Title>{productItem.title}</Card.Title>
                                        <Card.Text> <b>Price:</b> {productItem.price}</Card.Text>
                                    </Card.Body>
                                    <Button onClick={() => addCart(productItem.id)}><i className="fa-solid fa-cart-shopping"></i></Button>
                                </Card>
                            </Col>
                        

                    ))
                }
            </Row>
        </Container>
    );
};

export default Home;