import React, { Component } from 'react';
import axios from 'axios';
import ProductRow from './product-row.component';

export default class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {products: [],
                      currency: 'USD'};
        this.onChangeCurrency = this.onChangeCurrency.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/products/')
            .then(response => {
                this.setState({ products: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    componentDidUpdate(){
        axios.get('http://localhost:4000/products/')
            .then(productResponse => {
                if(this.state.currency === 'AUD'){
                    axios.get('https://api.exchangeratesapi.io/latest?symbols=AUD&base=USD')
                    .then(exchangeResponse => {
                        let fxRate = exchangeResponse.data.rates['AUD'];
                        let updatedProducts = productResponse.data;
                        updatedProducts.map(x=>x.priceUSD=x.priceUSD*fxRate);
                        this.setState({products: updatedProducts})
                    })
                    .catch(function (error){
                        console.log(error);
                    })
                }else{
                    this.setState({ products: productResponse.data });
                }
            })
            .catch(function (error){
                console.log(error);
            })
    }

    onChangeCurrency(e) {

        this.setState({
            currency: e.target.value
        });
        
    }

    productList() {
        return this.state.products.map(function(currentProd, i){
            return <ProductRow product={currentProd} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    <div className="form-check form-check-inline"><b>Choose currency for the price:</b> </div>
                    <div className="form-check form-check-inline">
                        <input  className="form-check-input" 
                                type="radio" 
                                name="currency" 
                                id="aud" 
                                value="AUD"
                                checked={this.state.currency==='AUD'} 
                                onChange={this.onChangeCurrency}
                                />
                        <label className="form-check-label">AUD</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input  className="form-check-input" 
                                type="radio" 
                                name="currency" 
                                id="usd" 
                                value="USD" 
                                checked={this.state.currency==='USD'} 
                                onChange={this.onChangeCurrency}
                                />
                        <label className="form-check-label">USD</label>
                    </div>
                </div>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th colspan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.productList() }
                    </tbody>
                </table>
            </div>
        )
    }
}