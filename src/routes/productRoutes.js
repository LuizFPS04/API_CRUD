const productController = require('../controllers/productController');

const productRoute = (app) => {
    app.route('/products/:id?')
        .get(productController.showAllProducts)
        .post(productController.createProduct)
        .put(productController.updateProduct)
        .delete(productController.deleteProduct)
};

module.exports = productRoute;