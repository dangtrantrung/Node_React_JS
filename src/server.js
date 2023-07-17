import express from "express";
let bodyParser = require('body-parser');
let viewEngine = require('./config/viewEngine');
import initWebRoutes from './routes/web';
require('dotenv').config();

// sử dụng phù hợp, thay đổi cài đặt version của driver, mysql2 với version của sequelize,
// version củanode, npmn npx, express, react, ..
// thì mới test connect phpmyadmin, migrate my sql db dc,...=> nhiều errors,...???
require('./config/mysqlconnection');


/* let dotenv = require('dotenv');
dotenv.config(); */


let app = express();
//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
viewEngine(app);
initWebRoutes(app);

let port = process.env.PORT || 6969;
app.listen(port, () => {
    //callback
    console.log('Backend Node JS is running on PORT: ' + port)
});