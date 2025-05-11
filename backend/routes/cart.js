const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const fetchuser = require('../middleware/fetchuser');


// Route 1 : Get all items in cart using : GET /cart/allcartitems : Login required
router.get('/allcartitems', fetchuser, async (req, res) => {

    const userId = req.user.id;
    try {
        let cart = await Cart.findOne({ userId });
        if (cart && cart.items.length > 0) {
            res.send(cart);
        }
        else {
            res.send(null);
        }
    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server Error");
    }
})


// Route 2 : Add a new item in cart using : POST  /cart/additem : Login required
router.post('/additem', fetchuser, async (req, res) => {

    const userId = req.user.id;
    const { productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId });
        let product = await Product.findOne({ _id: productId });
        if (!product) {
            return res.status(404).send('Item not found!')
        }

        else {
            const price = product.price;
            const name = product.name;
            const image = product.image
            let countInStock = product.countInStock;
            countInStock = countInStock - Number(quantity);
            console.log(countInStock);

            if (countInStock >= 0) {

                if (cart) {
                    // if cart exists for the user
                    let itemIndex = cart.items.findIndex(p => p.productId == productId);

                    // Check if product exists or not
                    if (itemIndex > -1) {
                        let productItem = cart.items[itemIndex];
                        productItem.quantity += Number(quantity);

                        product = await Product.findByIdAndUpdate(productId, { $set: { countInStock: countInStock} }, { new: Product });
                        // console.log(product);
                        cart.items[itemIndex] = productItem;
                        // console.log('hurrah1');
                    }
                    else {
                        product = await Product.findByIdAndUpdate(productId, { $set: { countInStock: countInStock } }, { new: Product });
                        cart.items.push({ productId, name, quantity, price, image, countInStock });
                        // console.log(countInStock, 'hurrah2');
                    }

                    cart.bill += quantity * price;
                    cart = await cart.save();
                    // console.log(countInStock, 'hurrah3');
                    return res.status(201).send(cart);
                }
                else {
                    // no cart exists, create one
                    const newCart = await Cart.create({
                        userId,
                        items: [{ productId, name, quantity, price, image, countInStock }],
                        bill: quantity * price
                    });
                    product = await Product.findByIdAndUpdate(productId, { $set: { countInStock: countInStock } }, { new: Product });
                    // console.log(product);
                    return res.status(201).send(newCart);
                }

            }
            else {
                return res.status(200).send('out of stock')
            }

        }
    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server Error");
    }
})


// Route 3 : delete an existing item in cart using : GET /cart/deleteitem : Login required
router.delete('/deleteitem', fetchuser, async (req, res) => {

    const userId = req.user.id;
    const { productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId });
        let itemIndex = cart.items.findIndex(p => p.productId == productId);
        if (itemIndex > -1) {
            let productItem = cart.items[itemIndex];
            cart.bill -= productItem.quantity * productItem.price;
            cart.items.splice(itemIndex, 1);

            let product = await Product.findOne({ _id: productId });
            const qty = product.countInStock;
            let totalQty = qty + Number(quantity);

            const changedProduct = await Product.findByIdAndUpdate(productId, { $set: { countInStock: totalQty } }, { new: Product });
        }
        cart = await cart.save();
        return res.status(201).send(cart);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error");
    }
})

// router.delete('/deleteitem/:prodId' , fetchuser, async(req, res)=>{

//     const userId = req.user.id;
//     const productId = req.params.prodId;
//     try {
//         let cart = await Cart.findOne({userId});
//         let itemIndex = cart.items.findIndex(p => p.productId == productId);
//         if(itemIndex > -1)
//         {
//             let productItem = cart.items[itemIndex];
//             cart.bill -= productItem.quantity*productItem.price;
//             cart.items.splice(itemIndex,1);
//         }
//         cart = await cart.save();
//         return res.status(201).send(cart);
//     } catch (error) {

//         console.error(error.message);
//         res.status(500).send("Internal server Error");
//     }
// })

module.exports = router


// line 115
       // console.log(changedProduct);
        
        // if (cart.items.length > 0) {
        //     cart = await cart.save();
        //     // return res.status(201).send(cart);
        // }
        // else {
        //     deletedCart = await Cart.findByIdAndDelete(cartId);
        //     // console.log(deletedCart)

        // }