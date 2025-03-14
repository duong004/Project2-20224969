const login = require('./introduce');
const products = require('./products');
const sell=require('./sell')
const Import=require('./import');

function routes(app) {
    app.use('/login',login);
    app.use('/products',products);
    app.use('/sell',sell);
    app.use("/import", Import);
}

module.exports = routes;