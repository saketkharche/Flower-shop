const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const fetchuser = require('../middleware/fetchuser');

// Route 1 : Get all products using : GET /products/allprodcuts
router.get('/allproducts', async (req, res) => {
    try {
        // let checkAdmin = req.user.isAdmin;
        // if(!checkAdmin){
        //     return res.status(401).send("You are Not Allowed");
        // }
        const products = await Product.find({});
        res.json(products);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error");
    }
})

// Route 2 : creating a new product : POST /products/addproduct : Login Required
// For Admin
router.post("/addproduct", fetchuser, async (req, res) => {
    try {
        let checkAdmin = req.user.isAdmin;
        if (!checkAdmin) {
            return res.status(401).send("You are Not Allowed");
        }

        const { name, image, price, description, category, countInStock, numReviews } = req.body;

        const product = new Product({
            name, image, price, description, category, countInStock, numReviews
        })

        const savedProduct = await product.save();
        res.json(savedProduct);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error");
    }

    // res.send('Product created.')
})

// Route 3 : editing an existing product : PUT /products/editproduct
// For Admin
router.put("/editproduct/:id", fetchuser, async (req, res) => {
    // res.send('Product edited.')

    // const {title, description, tag} = req.body;
    const { name, image, price, description, category, countInStock, numReviews } = req.body;


    //Create a new node
    const newProduct = {};
    if(name){newProduct.name = name};
    if(image){newProduct.image = image};
    if(price){newProduct.price = price};
    if(description){newProduct.description = description};
    if(category){newProduct.category = category};
    if(countInStock){newProduct.countInStock = countInStock};
    if(numReviews){newProduct.numReviews = numReviews};

    try {
        let checkAdmin = req.user.isAdmin;
        if (!checkAdmin) {
            return res.status(401).send("You are Not Allowed");
        }

        //Find the product to be deleted and delete it
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send("Not Found");
        }

        product = await Product.findByIdAndUpdate(req.params.id, {$set:newProduct}, {new:Product});
        res.json({ "success": "product updated", product });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error");
    }
})


// Route 4 : Deleting an existing product : DELETE /products/deleteproduct/:id
// For admin
router.delete("/deleteproduct/:id", fetchuser, async (req, res) => {
    try {

        let checkAdmin = req.user.isAdmin;
        if (!checkAdmin) {
            return res.status(401).send("You are Not Allowed");
        }

        //Find the product to be deleted and delete it
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send("Not Found");
        }

        product = await Product.findByIdAndDelete(req.params.id);
        res.json({ "success": "product deleted", product });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error");
    }
    // res.send('Product deleted.')
})


// Route 5 : Get a product using : GET /products/:id
router.get('/:id', async (req, res) => {
    try {
        // let checkAdmin = req.user.isAdmin;
        // if(!checkAdmin){
        //     return res.status(401).send("You are Not Allowed");
        // }

        // let product = await Product.findById(req.params.id);
        let product = await Product.findOne({_id:req.params.id});
        if (!product) {
            return res.status(404).send("Not Found");
        }
        res.json(product);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error");
    }
})

// Route 6 : Get filtered products using : GET /products/filterprodcuts/
router.get('/filterproducts/:measure', async (req, res) => {
    try {
        let measure = req.params.measure;

        if(measure=='lowPrice'){
            const products = await Product.find({}).sort({price:1});
            res.json(products);
        }
        else if(measure=='highPrice'){
            const products = await Product.find({}).sort({price:-1});
            res.json(products);
        }
        else if(measure=='oldProduct'){
            const products = await Product.find({}).sort({date:1});
            res.json(products);
        }
        else if(measure=='newProduct'){
            const products = await Product.find({}).sort({date:-1});
            res.json(products);
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error");
    }
})

// Route 6 : Get filtered products using : GET /products/filterprodcuts/
router.get('/searchproducts/:measure', async (req, res) => {
    try {
        let measure = (req.params.measure).toLowerCase();
        const products = await Product.find({});

        let rexp = new RegExp(measure, 'g');

        const search = products.filter((p)=>{
        return p.name.toLowerCase().match(rexp);
        });
        
 
        res.json(search);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error");
    }
})

module.exports = router;