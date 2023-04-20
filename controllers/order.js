const Order = require('../models/order');

// getOrders

module.exports.getOrders = async (req, res, next) => {
    try{
        const orders = await Order.findAll();
        res.json(orders);
    } catch(err) {
        console.log(err);
    }
}

// postAddOrder

module.exports.postAddOrder = async (req, res, next) => {
    try {
        const result = await Order.create({
            price: req.body.price,
            dish: req.body.dish,
            table: req.body.table
        });
        console.log('result');
        res.json({ created: true });
    } catch(err) {
        console.log(err);
    }
}

// postDeleteOrder

module.exports.postDeleteOrder = async (req, res, next) => {
    try {
        const order = await Order.findByPk(req.params.orderId);
        const result = await order.destroy();
        res.json({ deleted: true });
    } catch(err) {
        console.log(err);
    }
}