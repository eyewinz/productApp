const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const prodRoutes = express.Router();
const PORT = 4000;

let Product = require('./product.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/productDB', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

prodRoutes.route('/').get(function(req, res) {
    Product.find(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

prodRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Product.findById(id, function(err, product) {
        res.json(product);
    });
});

prodRoutes.route('/add').post(function(req, res) {
    console.log(req.body);
    let product = new Product(req.body);

    product.save()
        .then(product => {
            res.status(200).json(product);
        })
        .catch(err => {
            res.status(400).send('adding new product failed');
        });
});

prodRoutes.route('/update/:id').post(function(req, res) {
    Product.findById(req.params.id, function(err, product) {
        if (!product)
            res.status(404).send("data is not found");
        else
            product.name = req.body.name;
            product.priceUSD = req.body.priceUSD;

            product.save().then(product => {
                res.json('Product updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

prodRoutes.route('/delete/:id').get(function (req, res) {
    Product.findByIdAndRemove({_id: req.params.id}, function(err, product){
        if(err) res.json(err);
        else res.json('Product successfully removed');
    });
});

app.use('/products', prodRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});