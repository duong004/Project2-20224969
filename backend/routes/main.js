const productsRouter = require('./products');

function routes(app) {
    app.use('/products', productsRouter);
}

module.exports = routes;