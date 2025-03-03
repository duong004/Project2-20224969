const login = require('./introduce');
const products = require('./products');
const sell=require('./sell')

function routes(app) {
    app.use('/login',login);
    app.use('/products',products);
    app.use('/sell',sell);
}

module.exports = routes;