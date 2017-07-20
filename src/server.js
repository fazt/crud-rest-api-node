const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// webpack
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.config');

const PORT = process.env.PORT || 3000;

let { products, currentId } = require('./db.json');

app.set('port', PORT);

app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public'));

app.get('/products', (req, res) => {
	res.send({products});
});

app.post('/products', (req, res) => {

	var { name } = req.body;
	currentId++;

	products.push({
		id: currentId,
		name
	});

	res.send('Successfully created product');
});

app.put('/products/:id', (req, res) => {
	const { id } = req.params;
	const newName  = req.body.newName;
	var found = false;

	console.log(newName);
	
	products.forEach((product, i) => {
		if(!found && product.id === Number(id)) {
			product.name = newName;
		}
	});
	
	res.send('Successfully updated product');
});

app.delete('/products/:id', (req, res) => {
	var id = req.params.id;
	
	var found = false;

	products.forEach(function(product, index) {
		if(!found && product.id === Number(id)) {
			products.splice(index, 1);
		}
	});

	res.send('successfully deleted product');
});

app.listen(app.get('port'), () => {
	console.log(`server on port ${app.get('port')}`);	
});

