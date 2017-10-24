const express = require('express');
const router = express.Router();

const {
	getProducts,
	addProduct,
	updateProduct,
	deleteProduct
} = require('../controllers/products');

router.route('/')
	.get(getProducts)
	.post(addProduct)

router.route('/:id')
	.put(updateProduct)
	.delete(deleteProduct)

module.exports = router;
