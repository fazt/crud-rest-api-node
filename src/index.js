const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// importing routes products
const routesProducts = require('./routes/products');

// webpack
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.config');

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// routes
app.use('/products', routesProducts);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
	console.log(`server on port ${app.get('port')}`);
});
