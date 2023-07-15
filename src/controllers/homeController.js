const { render } = require("express/lib/response")
const db = require('../models/index')
const CRUDService = require('../services/CRUDService')

let getHomePage = async(req, res) => {
    /*  res.send(`Hello World NodeJS with Hoi dan IT!!!
     \n ${Date()}
     <br/> Hello world from Home Controller`); */

    try {
        //console.log('------------');
        let data = await db.User.findAll();
        /* console.log('------------');
        console.log(data);
        console.log('------------'); */
        return res.render("HomePage.ejs", {
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.log(error)
    }
}
let getAboutPage = (req, res) => {

    return res.render("test/about.ejs");

}
let getCRUDPage = (req, res) => {

    //return res.send("Page CRUD");
    return res.render("crud.ejs");

}
let postCRUDPage = async(req, res) => {

    //return res.send("Page CRUD");
    //console.log(req.body)
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send("Form POST - CRUD from servers");
    //return res.render("crud.ejs");

}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUDPage: getCRUDPage,
    postCRUDPage: postCRUDPage
}