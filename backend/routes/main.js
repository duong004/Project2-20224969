const products = require('./products');
const login = require('./introduce');

function routes(app) {
    app.use('/products',products)
    app.use('/login',login);
}

module.exports = routes;