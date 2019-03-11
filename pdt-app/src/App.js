import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateProduct from "./components/create-prod.component";
import EditProduct from "./components/edit-prod.component";
import ProductList from "./components/list-prod.component";


class App extends Component {
  render() {
    return (
      <Router>
         <div className="container">
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Products</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Product</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={ProductList} />
          <Route path="/edit/:id" component={EditProduct} />
          <Route path="/create" component={CreateProduct} />
        </div>
      </Router>
    
    );
  }
}

export default App;
