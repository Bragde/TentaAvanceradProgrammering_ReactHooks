import React, { useState, useEffect } from 'react';
import { CATALOG_API_URL } from '../constants';
import { CATALOG_API_KEY } from '../constants';
import { SHOPPINGCART_API_URL } from '../constants';
import { SHOPPINGCART_API_KEY } from '../constants';
import { Col, Container, Row, Table, Button } from 'reactstrap';

function ShoppingCart(){
    const [items, setItems] = useState([]);
    const [shoppingCartItems, setshoppingCartItems] = useState([]);
    const [viewStatus, setViewStatus] = useState('mount');

    useEffect(() => {
        let itemsTmp = [];
        getShoppingCart();

        setViewStatus('update');
    },[viewStatus === 'mount'])

    // Get shoppingcart for user from server shoppingcart microservice
    function getShoppingCart(userId = 9999) {
        let res = [];
        let itemList = [];
        fetch(`${SHOPPINGCART_API_URL}/GetShoppingCartItemsByUserId/${userId}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'AcvPgm.React',
                'ApiKey': SHOPPINGCART_API_KEY
            }
        })
            .then(res => res.json())
            .then(res => {setshoppingCartItems(res)})
            .catch(err => console.log(err));
    }

    console.log(`shoppingCartItems: ${shoppingCartItems}`)

    let itemsTemp = '';
    shoppingCartItems.map(item => {
        let itemInfo = getCatalogItem(item.id);
        let vm = {
            itemInfo,
            item
        }
        itemsTemp.concat(vm);
    })
    setItems(itemsTemp);

    console.log(`Items: ${items}`);

    // Get catalog item by id from server
    function getCatalogItem(id) {
        let res = '';
        fetch(`${CATALOG_API_URL}/GetById/${id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'AcvPgm.React',
                'ApiKey': CATALOG_API_KEY
            }
        })
            .then(res => res.json())
            .catch(err => console.log(err));

        return res;
    }



    return (
        <Container style={{ paddingTop: "100px" }}>
            <Row>
                <Col>
                    Shoppingcart
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
                                <th>Amount</th>
                                <th>Subtotal</th>
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
                                        <td>
                                            {item.amount}
                                        </td>
                                        <td align="center">
                                            {/* {evaluateButtons(item)} */}
                                            <Button color="warning">
                                                Remove
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

export default ShoppingCart;