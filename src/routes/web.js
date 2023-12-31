let homeController = require("../controllers/homeController")
let userController = require("../controllers/userController")

let express = require("express");

let router = express.Router();
let initWebRoutes = (app) => {
    //rest API
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUDPage);
    router.post('/post-crud', homeController.postCRUDPage);
    router.get('/hoidanIT', (req, res) => {
        res.send("Hello World NodeJS with Hoi dan IT!!!")
    })
    router.get('/get-crud', homeController.displaygetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUDPage);
    router.get('/delete-crud', homeController.deleteCRUDPage);
    router.post('/api/login', userController.handleLogin);

    //CRUD - API user services
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);





    return app.use('/', router)
}




module.exports = initWebRoutes;