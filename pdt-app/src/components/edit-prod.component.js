import React, { Component } from 'react';
import axios from 'axios';

export default class EditProduct extends Component {

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

    componentDidMount() {
        axios.get('http://localhost:4000/products/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    prod_name: response.data.name,
                    prod_price: response.data.priceUSD
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
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
        const obj = {
            name: this.state.prod_name,
            priceUSD: this.state.prod_price
        };
        console.log(obj);
        axios.post('http://localhost:4000/products/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3 align="center">Update Product</h3>
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
                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Product" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}