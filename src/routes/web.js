let homeController = require("../controllers/homeController")
let express = require("express");

let router = express.Router();
let initWebRoutes = (app) => {
    //rest API
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);

    router.get('/hoidanIT', (req, res) => {
        res.send("Hello World NodeJS with Hoi dan IT!!!")
    })
    return app.use('/', router)
}




module.exports = initWebRoutes;