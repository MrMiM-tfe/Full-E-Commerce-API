// Models
const { Order, User } = require('../models')

// payments
const zarinpal = require('../payments/zarinpal')

exports.pay = async (orderId, callback) => {
    // get order
    const order = await Order.findById(orderId)

    // check order
    if(!order) {
        return {
            type: "Error",
            message: "order not found",
            statusCode: 404
        }
    }

    const user = await User.findById(order.user)

    switch (order.paymentMethod) {
        case "zarinpal":
            if (order.totalPrice === 0) {
                console.log("free");
            }

            const data = {
                Amount: order.totalPrice,
                CallbackURL: callback,
                Description: "new payment",
                Email: user.email,
                Mobile: user.phone
            }

            const res = await zarinpal.PaymentRequest(data)

            if (res.status != 100) {
                return {
                    type: "Error",
                    message: "PaymentRequest faild",
                    statusCode: 500
                }
            }

            // add authority to order
            order.authority = res.authority
            await order.save()

            return {
                type: "Success",
                message: "PaymentRequest sent success fully",
                statusCode:200,
                url: res.url
            }
            
            break;
        case "walet":
            return {
                type: "Error",
                message: "walet not suported yet",
                statusCode: 400
            }
            break;
        default:
            return {
                type: "Error",
                message: "paymentMethod not found",
                statusCode: 404
            }
            break;
    }
}

exports.verifyZarinpal = async (req) => {
    const { Authority, Status } = req.query

    if (Status !== "OK") {
        return {
            type: "Error",
            message: "verfy faild",
            statusCode: 400
        }
    }

    // get order
    const order = await Order.findOne({authority: Authority})

    if (!order){
        return {
            type:"Error",
            message:"Authority is wrong",
            statusCode:404
        }
    }

    const res = await zarinpal.PaymentVerification({
        Amount: order.totalPrice,
        Authority: order.authority
    })

    if (res.status == 100 || res.status == 101) {

        // update order
        order.isPaid = true
        order.paidAt = Date.now()
        if (order.status === "NotPaid"){
            order.status = "Processing"
        }
        await order.save()

        console.log(res);

        return {
            type: "Success",
            message: "verfied",
            statusCode: 200,
            RefID: res.RefID
        }
    }

    return {
        type: "Error",
        message: "verfy faild",
        statusCode: 500
    }
}