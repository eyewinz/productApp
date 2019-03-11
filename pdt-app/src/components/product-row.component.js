import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ProductRow extends Component {

  constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
        axios.get('http://localhost:4000/products/delete/'+this.props.product._id)
            .then(console.log('Product Deleted'))
            .catch(err => console.log(err))
    }
  render() {
    return (
        <tr>
          <td>
            {this.props.product._id}
          </td>
          <td>
            {this.props.product.name}
          </td>
          <td>
            {this.props.product.priceUSD}
          </td>
          <td>
            <Link to={"/edit/"+this.props.product._id} className="btn btn-primary">Update</Link>
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td>
        </tr>
    );
  }
}

export default ProductRow;