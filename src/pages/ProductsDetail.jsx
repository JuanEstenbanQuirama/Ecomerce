import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, Carousel, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addCartThunk } from '../store/slices/cart.slice';
import { getNewsProductsThunk } from '../store/slices/products.slice';

const ProductsDetail = () => {

    const allProducts = useSelector(state => state.products);

    const [productDetail, setProductDetail] = useState({});
    const [suggestedProducts, setSuggestedProducts] = useState([])
    const [shopAdd, setShopAdd] = useState(1)
    console.log(suggestedProducts)

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const increment = () => {
        setShopAdd(shopAdd + 1)
    }

    const decrement = () => {
        setShopAdd(shopAdd - 1)
    }

    useEffect(() => {
        const products = allProducts.find(productsItem => productsItem.id === Number(id))
        // console.log(products)
        setProductDetail(products)
        const filteredproducts = allProducts.filter(productsItem => productsItem.category.id === products.category.id)
        setSuggestedProducts(filteredproducts)

    }, [allProducts, id])

    useEffect(() => {
        dispatch(getNewsProductsThunk())

    }, [])

    const addCart = () => {
        alert("add")
        const cart = {
            id: productDetail.id,
            quantity: shopAdd
        }
        dispatch(addCartThunk(cart))
        console.log(cart)
    }

    return (
        <Container className='mt-5'>
            <Row >
                <h1 style={{ textAlign: 'center' }}>{productDetail?.title}</h1>
                <Col>
                    <div style={{ width: '100%' }}>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={productDetail?.productImgs?.[0]} alt=""
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={productDetail?.productImgs?.[1]} alt=""
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={productDetail?.productImgs?.[2]} alt=""
                                />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </Col>
                <Col>
                    <p>{productDetail?.description}</p>
                    <p><b>Price</b>{productDetail?.price}</p>
                    <div>
                        <h4>Quantity</h4>
                        <ButtonGroup size="sm" className="gap-3">
                            <Button
                                disabled={shopAdd === 1}
                                onClick={decrement}
                            >-</Button>
                            <small className='p-2'>{shopAdd}</small>
                            <Button
                                onClick={increment}
                            > +</Button>
                            <Button onClick={addCart} variant="success" id="button-addon2">
                                <i className="fa-solid fa-cart-shopping p-2"></i>
                            </Button>
                        </ButtonGroup>
                    </div>
                </Col>
                <div className='mt-5'>
                    <h1 style={{ textAlign: 'center' }}> <b>Discover similar items  <i className="fa-brands fa-gripfire"></i></b></h1>
                </div>
                <Row xs={1} md={2} xl={3} className="g-4 m-3" >
                    {
                        suggestedProducts.map(suggestedProduct => (
                            <Col key={suggestedProduct.title}>
                                <Card onClick={() => navigate(`/product/${suggestedProduct.id}`)}>
                                    <Card.Img variant="top" src={suggestedProduct.productImgs} alt="" style={{ alignItems: 'center', }} />
                                    <Card.Body>
                                        <Card.Title style={{ textAlign: 'center' }}>  {suggestedProduct.title}</Card.Title>
                                        <Card.Text><b>Price:</b>{suggestedProduct.price}</Card.Text>
                                    </Card.Body>
                                    <Button onClick={addCart}><i className="fa-solid fa-cart-shopping"></i></Button>
                                </Card>
                            </Col>
                           
                        ))
                    }
                </Row>
            </Row>
        </Container >
    );
};

export default ProductsDetail;