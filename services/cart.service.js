// Models
const { Cart, User, Product } = require('../models')

const getUserId = async (username) => {
    const user = await User.findOne({username})

    // check user
    if (!user){
        return null
    }

    return user.id
}

/**
 * @desc    Get Cart
 * @param   { String } username - username
 * @returns { Object<type|message|statusCode|cart> }
 */
exports.getCart = async (username) => {

    const userId = await getUserId(username)

    // check userId
    if (!userId){
        return {
            type: "Error",
            message: "user not found",
            statusCode: 404
        }
    }

    const cart = await Cart.findOne({user: userId, active: true})

    // check cart
    if (!cart) {
        return {
            type: 'Error',
            message: 'noCartForUser',
            statusCode: 404
        };
    }

    // if OK
    return {
        type: 'Success',
        message: 'successfulCartFound',
        statusCode: 200,
        cart
    };
}

/**
 * @desc    Get user Carts
 * @param   { String } username - username
 * @returns { Object<type|message|statusCode|carts> }
 */
 exports.getCarts = async (username ,req) => {

    const userId = await getUserId(username)

    // check userId
    if (!userId){
        return {
            type: "Error",
            message: "user not found",
            statusCode: 404
        }
    }

    const role = req.user.role

    if (role !== "admin"){
        return {
            type: 'Error',
            message: 'no permission',
            statusCode: 401
        };
    }

    const carts = await Cart.find({user: userId})

    // check cart
    if (!carts) {
        return {
            type: 'Error',
            message: 'noCartForUser',
            statusCode: 404
        };
    }

    // if OK
    return {
        type: 'Success',
        message: 'successfulCartFound',
        statusCode: 200,
        carts
    };
}

/**
 * @description Edit cart
 * @param   { String }  productId productId
 * @param   { Number }  quantity quantity
 * @param   { String }  username username
 * @returns { Object<type|message|cart> }
 */
exports.editCart = async (productId, quantity, username) => {

    const userId = await getUserId(username)

    // check userId
    if (!userId){
        return {
            type: "Error",
            message: "user not found",
            statusCode: 404
        }
    }

    // check inputs
    if (
        !productId ||
        !quantity
    ) {
        return {
            type: "Error",
            message: "fild required",
            statusCode: 400
        }
    }

    
    // check user
    const user = await User.findById(userId)
    if (!user) {
        return {
            type: "Error",
            message: "user not found",
            statusCode: 404
        }
    }
    
    const product = await Product.findById(productId)
    const price = product.sellPrice

    
    const totalPrice = price * quantity
    
    
    try {
        let cart = await Cart.findOne({user: userId, active:true})
        
        

        // check if user have cart or not
        if (!cart) {

            // check if quantity
            if (quantity < 0) {
                return {
                    type: "Error",
                    message: "user dont have eny cart",
                    statusCode: 400
                }
            }

            // create new cart
            const newCart = await Cart.create({
                user: userId,
                items:[{
                    product: productId,
                    price,
                    quantity,
                    totalPrice,
                }],
                totalPrice
            })

            return {
                type: "Success",
                message: "cart created and items added",
                statusCode: 201,
                cart: newCart
            }
        }

        
        // find indes of product in cart items list
        let itemIndex = cart.items.findIndex(item => item.product == productId)
        
        
        // check if product exist in items
        if (itemIndex > -1) {
            // if yes get last product and update it
            let cartItem = cart.items[itemIndex]
            
            if (cartItem.quantity + quantity > 0) {

                cartItem.quantity += quantity
                cartItem.price = price
                cartItem.totalPrice += totalPrice
                cart.totalPrice += totalPrice
                cart.items[itemIndex] = cartItem
            }else {
                cart.items.splice(itemIndex, 1)
            }

        } else {
            // if not push new product to items list
            if (quantity > 0) {
                cart.items.push({
                    product: productId,
                    quantity,
                    price,
                    totalPrice
                })
                cart.totalPrice += totalPrice
            }
        }

        const newCart = await cart.save()

        return {
            type: "Succes",
            message: "product updated",
            statusCode: 201,
            cart: newCart
        }
    } catch (error) {
        console.log("Something went wrong");
    }
}

/**
 * @description Increase Product Quantity By One
 * @param   { String }  productId productId
 * @param   { String }  username username
 * @returns { Object<type|message|cart> }
 */
exports.increaseByOne = async (productId, username) => {
    return await this.editCart(productId, 1, username)
}

/**
 * @description Reduce Product Quantity By One
 * @param   { String }  productId productId
 * @param   { String }  username username
 * @returns { Object<type|message|cart> }
 */
 exports.reduceByOne = async (productId, username) => {
    return await this.editCart(productId, -1, username)
}

/**
 * @desc    Delete Cart
 * @param   { String } username - username
 * @return  { Object<type|message|statusCode> }
 */
exports.deleteCart = async (username) => {

    const userId = await getUserId(username)

    // check userId
    if (!userId){
        return {
            type: "Error",
            message: "user not found",
            statusCode: 404
        }
    }

    const cart = await Cart.findOne({ user: userId, active: true});
  
    // 1) Check if cart doesn't exist
    if (!cart) {
      return {
        type: 'Error',
        message: 'noCartForUser',
        statusCode: 404
      };
    }
  
    // 2) Delete cart
    await Cart.findByIdAndDelete(cart.id)
  
    // 3) If everything is OK, send data
    return {
      type: 'Success',
      message: 'successfulCartDelete',
      statusCode: 201
    }
  }