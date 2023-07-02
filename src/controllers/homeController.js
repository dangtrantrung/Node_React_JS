const { render } = require("express/lib/response")
const db = require('../models/index')

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
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage
}