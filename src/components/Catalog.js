import React, { useState, useEffect } from 'react';
import { CATALOG_API_URL } from '../constants';
import { CATALOG_API_KEY } from '../constants';
import { SHOPPINGCART_API_URL } from '../constants';
import { SHOPPINGCART_API_KEY } from '../constants';
import { Col, Container, Row, Table, Button } from 'reactstrap';

function Catalog(props) {
    const [items, setItems] = useState([]);
    const [viewStatus, setViewStatus] = useState('mount')

    let response = '';

    useEffect(() => {
            getItems();
            setViewStatus('update');
    },[viewStatus === 'mount']);

    // Get all products from server productcatalog microservice
    function getItems(){   
        let response = fetch(`${CATALOG_API_URL}/GetAll`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'AcvPgm.React',
            'ApiKey': CATALOG_API_KEY
        }})
        .then(res => res.json())        
        .then(res => setItems(res))
        .catch(err => console.log(err));

        return response;
    }

    console.log(`Items: ${items}`);
    console.log(`Response: ${response}`);

    // Add product to server shoppingcart microservice
    function addToCart(item){

        console.log('function addToCart activated');
        console.log(item.id);

        let response = fetch(`${SHOPPINGCART_API_URL}/AddItemToShoppingCart`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'AcvPgm.React',
                'ApiKey': SHOPPINGCART_API_KEY
            },
            body: JSON.stringify({
                // ShoppingCartId: '90d6da79-e0e2-4ba8-bf61-2d94d90df810',
                catalogItemId: item.id,
                // Amount : 1,
                userId: '9996'
            })
        })
        .then(res => {props.updateView('shoppingCart')})
        .catch(err => console.log(err));   
    }

    return (
        <Container style={{ paddingTop: "100px" }}>
            <Row>
                <Col>
                    Catalog
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped>
                        <thead className="thead-dark">
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th style={{ textAlign: "center" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!items || items.length <= 0 ?
                                <tr>
                                    <td colSpan="6" align="center"><b>No products found</b></td>
                                </tr>
                                : items.map(item => (
                                    <tr key={item.id}>
                                        <td>
                                            {item.imgUrl}
                                        </td>
                                        <td>
                                            {item.title}
                                        </td>
                                        <td>
                                            {item.price}
                                        </td>
                                        <td align="center">
                                            {/* {evaluateButtons(item)} */}
                                            <Button color="success" onClick={() => addToCart(item)}>
                                                Add to cart
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default Catalog;