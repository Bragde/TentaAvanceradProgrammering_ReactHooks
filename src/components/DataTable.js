import React, { Component } from 'react';
import { Table,Button } from 'reactstrap';
import { SHOPPINGCART_API_URL } from '../constants';
import { SHOPPINGCART_API_KEY } from '../constants';

function DataTable(props){

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
                userId: '9997'
            })
        });
        // .then(res => res.json())
        // .then(console.log(res))
        // .then(() => props.getShoppingCart())
        // .catch(err => console.log(err));
        response = (response) => response.json();
        props.getShoppingCart();
        
    }

    // Evaluate datatable action buttons
    function evaluateButtons(item){
        let buttons = '';
        if (props.view === 'products'){
            buttons = 
                <Button color="success" onClick={() => addToCart(item)}>
                    Add to cart
                </Button>                
        }else if (props.view === 'shoppingcart'){
            buttons = 
                <Button color="warning">
                    Delete from cart
                </Button>
        }

        return buttons;
    }

    return(
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
                {!props.items || props.items.length <= 0 ?
                    <tr>
                        <td colSpan="6" align="center"><b>No products found</b></td>
                    </tr>
                : props.items.map(item => (
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
    )
}

export default DataTable;