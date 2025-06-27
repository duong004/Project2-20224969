const login = require('./introduce');
const temperary_public = require('./temperary_public')
const products = require('./products');
const roles = require('./roles.route')
const accounts = require('./accounts.route') 
const sell = require('./sell')
const home = require('./home')
const chat = require('./chat')
const profile = require('./profile')
const calendar = require('./calendar')
const Import = require('./import');
const Bank = require("./bank.js");

function routes(app) {
    app.use('/',temperary_public);
    app.use('/login',login);
    app.use('/products',products);
    app.use('/roles', roles);
    app.use('/accounts', accounts);
    app.use('/sell',sell);
    app.use('/home',home);
    app.use('/chat',chat);
    app.use('/profile',profile);
    app.use('/calendar',calendar);
    app.use("/import", Import);
    app.use("/bank", Bank);
}

module.exports = routes;