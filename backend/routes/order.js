const express = require('express');
const router = express.Router();

const Order = require('../models/Order');
const User = require('../models/User');
const fetchuser = require('../middleware/fetchuser');

// Route 1 : Get all orders in cart using : GET /order/allorder : Login required
//For user
router.post('/orders', fetchuser, async (req, res) => {

    const userId = req.user.id;
    try {
        Order.find({ userId }).sort({ date: -1 }).then(orders => res.json({orders}));
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error");
    }
})

// Route 2 : Get all orders in cart using : GET /order/allorder : Login required
//For Admin
router.get('/allorders', fetchuser, async (req, res) => {

    const userId = req.user.id;
    try {
        Order.find({}).sort({ date: -1 }).then(orders => res.json(orders));
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error");
    }
})

// Route 3 : checkout cart using : POST  /order/addorder : Login required
router.post('/checkout', fetchuser, async (req, res) => {

    const userId = req.user.id;
    try {

        // const { source } = req.body;
        let cart = await Cart.findOne({ userId });
        let user = await User.findOne({ _id: userId });
        const email = user.email;
        if (cart) {
            const order = await Order.create({
                userId,
                items: cart.items,
                bill: cart.bill
            });
            const data = await Cart.findByIdAndDelete({ _id: cart.id });
            return res.status(201).send(order);
        }

        else {
            res.status(500).send("You do not have items in cart");
        }
    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server Error");
    }
})


// Route 3 : delete an existing item in cart using : GET /cart/deleteitem : Login required
router.delete('/deleteitem', fetchuser, async (req, res) => {
    const userId = req.user.id;
    try {

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server Error");
    }
})

module.exports = router


// if(cart){
//     const charge = await stripe.charges.create({
//         amount: cart.bill,
//         currency: 'inr',
//         source: source,
//         receipt_email: email
//     })
//     if(!charge) throw Error('Payment failed');
//     if(charge){
//         const order = await Order.create({
//             userId,
//             items: cart.items,
//             bill: cart.bill
//         });
//         const data = await Cart.findByIdAndDelete({_id:cart.id});
//         return res.status(201).send(order);
//     }
// }
// else{
//     res.status(500).send("You do not have items in cart");
// }