import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import ShoppingCart from './ShoppingCart';
import Catalog from './Catalog';

function Home() {

    const [view, setView] = useState('products');

    useEffect(() => {
        
    })

    function updateView(newState){
        setView(newState);
    }

    return (
        <Container style={{ paddingTop: "100px" }}>
            <Row>
                <Col>
                    {view === 'products' ?
                        <Catalog 
                            updateView={updateView}/> :
                        <ShoppingCart 
                            updateView={updateView}/>}
                </Col>
            </Row>
        </Container>
    )
}

export default Home;