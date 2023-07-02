const { render } = require("express/lib/response")

let getHomePage = (req, res) => {
    /*  res.send(`Hello World NodeJS with Hoi dan IT!!!
     \n ${Date()}
     <br/> Hello world from Home Controller`); */
    return res.render("HomePage.ejs");

}
let getAboutPage = (req, res) => {

    return res.render("test/about.ejs");

}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage
}