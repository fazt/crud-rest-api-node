let { products, currentId } = require('../db.json');

module.exports = {
  getProducts: (req, res) => {
  	res.json({products});
  },

  addProduct: (req, res) => {
  	var { name } = req.body;

  	products.push({
  		id: products.length,
  		name
  	});

  	res.json({
  		success: true,
  		msg: 'successfully added'
  	});
  },

  updateProduct: (req, res) => {
  	const { id } = req.params;
  	const { newName }  = req.body;
  	var found = false;

  	products.forEach((product, i) => {
  		if(!found && product.id === Number(id)) {
  			product.name = newName;
  		}
  	});

  	res.send('Successfully updated product');
  },

  deleteProduct: (req, res) => {
  	var id = req.params.id;

  	var found = false;

  	products.forEach(function(product, index) {
  		if(!found && product.id === Number(id)) {
  			products.splice(index, 1);
  		}
  	});

  	res.send('successfully deleted product');
  }

}
