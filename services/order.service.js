// Models
const { Order, Cart } = require('../models')

/**
 * @desc    Create New Order
 * @param   { Object } body - Body object data
 * @param   { Object } user - An object contains logged in user data
 * @returns { Object<type|message|statusCode|order> }
 */
exports.createOrder = async (body, user) => {

    // check payment Method
    if (!["walet", "zarinpal"].includes(body.paymentMethod) ) {
        return {
            type: "Error",
            message: "paymentMethod is required or is not corect. most be ['walet', 'zarinpal']",
            statusCode: 400
        }
    }

    // get user cart
    const cart = await Cart.findOne({user: user._id})

    // Check if cart doesn't exist
    if (!cart || cart.items.length === 0) {
        return {
            type: 'Error',
            message: 'noCartFound',
            statusCode: 404
        };
    }

    const address = body.addres ?? user.address
    const phone = body.phone ?? user.phone

    // check address
    if (!address || address.length < 1) {
        return {
            type: 'Error',
            message: 'address is required',
            statusCode: 400
        }
    }

    // check phone
    if (!phone || phone.length < 1) {
        return {
            type: 'Error',
            message: 'phone is required',
            statusCode: 400
        }
    }

    try {
        // create order
        const order = await Order.create({
            user: user._id,
            products: cart.items,
            totalPrice: cart.totalPrice,
            address,
            paymentMethod,
            phone,
            shippingPrice: 0 // need edit
        });

        // deactive cart
        cart.active = false
        await cart.save()

        return {
            type: 'Success',
            message: 'successfulOrderCreate',
            statusCode: 201,
            order
        };
    } catch (error) {
        return {
            type: "Error",
            message: error.message,
            statusCode: error.statusCode
        }
    }
}

/**
 * @desc    Update Order Status
 * @param   { String } status - Order status
 * @param   { String } id - Order ID
 * @returns { Object<type|message|statusCode> }
 */
exports.orderStatus = async (status, id) => {

    // check status
    if (!status) {
        return {
          type: 'Error',
          message: 'status Required',
          statusCode: 400
        };
    }

    // check status
    if (!['NotPaid', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].includes(status)) {
        return {
            type: "Error",
            message: "status is not valid",
            statusCode: 400
        }
    }

    const order = await Order.findById(id)

    // Check if order doesn't exist
    if (!order) {
        return {
        type: 'Error',
        message: 'noOrder',
        statusCode: 404
        };
    }

    // update order
    order.status = status
    await order.save()

    // If everything is OK, send data
    return {
        type: 'Success',
        message: 'successfulStatusUpdate',
        statusCode: 200
    };
}

/**
 * @desc    Query Orders
 * @param   { Object } req - Request object
 * @returns { Object<type|message|statusCode|orders> }
 */
exports.getUserOrders = async (req) => {
    // get orders
    const orders = await Order.find({user: req.user._id})

    // check orders
    if (!orders) {
        return {
            type: "Error",
            message: "no order found",
            statusCode: 404
        }
    }

    // if ok
    return {
        type: 'Success',
        message: 'successfulOrdersFound',
        statusCode: 200,
        orders
    };
}

/**
 * @desc    Query Order Using It's ID
 * @param   { String } id - Order ID
 * @returns { Object<type|message|statusCode|order> }
 */
 exports.getUserOrder = async (req) => {
    // get order
    const order = await Order.findOne({id: req.params.id, user: req.user._id})

    // check order
    if (!order) {
        return {
            type: "Error",
            message: "no order found",
            statusCode: 404
        }
    }

    // if ok
    return {
        type: 'Success',
        message: 'successfulOrderFound',
        statusCode: 200,
        order
    };
}


/**
 * @desc    Get all Orders
 * @param   { String } status - Order status
 * @returns { Object<type|message|statusCode|orders> }
 */
exports.getAllOrders = async (status) => {

    // make filter
    let filter = {}
    if (status){
        filter = {status}
    }
    
    // get orders
    const orders = await Order.find(filter)
    
    // check orders
    if (!orders) {
        return {
            type: "Error",
            message: "order not found",
            statusCode: 404
        }
    }

    // if ok
    return {
        type: 'Success',
        message: 'successfulOrdersFound',
        statusCode: 200,
        orders
    };
}