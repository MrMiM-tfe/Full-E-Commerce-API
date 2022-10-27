const dotenv = require('dotenv')
const env = process.env
//set .env file path and name
dotenv.config({path: '.env'})

const config = {
    server:{
        port: env['PORT'] ?? 3000,
    },
    jwt:{
        secret: env["SECRET"] ?? "test",
        accessExpirationDays: env["JWT_ACCESS_EXPIRATION_DAYS"] ? parseInt(env["JWT_ACCESS_EXPIRATION_DAYS"]): 7
    },
    db:{
        url: env["DATABASE_CONNECTION"] ?? 'mongodb://localhost:27017/eapi'
    },
    payment:{
        zarinpal:{
            merchantId: env["ZARINPAL_MERCHANT"] ?? "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
            sandbox: env["ZARINPAL_SANDBOX"] ?? true
        }
    }
}

console.log(config);

module.exports = config