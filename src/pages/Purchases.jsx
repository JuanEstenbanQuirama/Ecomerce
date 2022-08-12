import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';



const Purchases = () => {

    const dispatch = useDispatch();

    const purchases = useSelector(state => state.purchases.data?.purchases)
    console.log(purchases)



    useEffect(() => {
        dispatch(getPurchasesThunk());
    }, [])

    // console.log(purchases)

    const getTotal = () => {
        let total = 0;

        purchases?.forEach(product => {
            product.cart.products?.forEach(data => {
                total += Number(data.price)
            })
        });
        return total
    }


    return (
        <Container className='mt-5 p-5 ' >

            <Row className="g-4 m-3">
            <Button >  <h1><b>PURCHASES</b></h1>  </Button>
                {
                    purchases?.map(purchase => (
                        <ul key={purchase.id}>

                            {purchase?.cart?.products?.map(product => (

                                <Col key={product.id} className="mt-3">
                                    <Card >
                                        <Card.Body >
                                            <Card.Title> <small>{product.brand}</small> </Card.Title>
                                            <Card.Title> <small>Status :</small> {product.status} </Card.Title>
                                            <Card.Title> <b>{product.title}</b> </Card.Title>
                                            <Card.Text> <b>Price:</b> {product.price}</Card.Text>

                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}


                        </ul>
                    ))
                }
                <h2> Total $: {getTotal()}  </h2>
            </Row>
        </Container>
    );
};

export default Purchases;