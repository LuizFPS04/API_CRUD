const userController = require('../controllers/userController');

const userRoute = (app) => {
    app.route('/users/:id?')
        .get(userController.showAllUsers)
        .post(userController.createUser)
        .put(userController.updateUser)
        .delete(userController.deleteUser)
};

module.exports = userRoute;