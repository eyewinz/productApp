import React, { Component } from 'react';
import axios from 'axios';

export default class CreateProduct extends Component {
   
    constructor(props) {
        super(props);

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            prod_name: '',
            prod_price: 0
        }
    }

    onChangeProductName(e) {
        this.setState({
            prod_name: e.target.value
        });
    }

    onChangeProductPrice(e) {
        this.setState({
            prod_price: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Product Name: ${this.state.prod_name}`);
        console.log(`Product Price: ${this.state.prod_price}`);

        const newProd = {
            name: this.state.prod_name,
            priceUSD: this.state.prod_price
        };

        axios.post('http://localhost:4000/products/add', newProd)
            .then(res => console.log(res.data));
        
        this.setState({
            prod_name: '',
            prod_price: 0
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
            <h3>Create Product</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                    <label>Name: </label>
                    <input  type="text"
                            className="form-control"
                            value={this.state.prod_name}
                            onChange={this.onChangeProductName}
                            />
                </div>
                <div className="form-group">
                    <label>Price: </label>
                    <input 
                            type="text" 
                            className="form-control"
                            value={this.state.prod_price}
                            onChange={this.onChangeProductPrice}
                            />
                </div>

                <div className="form-group">
                    <input type="submit" value="Create Product" className="btn btn-primary" />
                </div>
            </form>
        </div>
        )
    }
}