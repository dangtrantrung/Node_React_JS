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
let displaygetCRUD = async(req, res) => {
    let data = await CRUDService.getAllUser();
    console.log('----------------');
    console.log(data);
    console.log('----------------');
    // return res.send("GET - CRUD from server - controller");
    return res.render("displayCRUD.ejs", {
        dataTable: data
    });
}

let getEditCRUD = async(req, res) => {
    // let data = await CRUDService.getAllUser();
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        console.log('----------------');
        console.log(userData);
        console.log('----------------');
        //return res.send("found a userId= " + userId + " with data=" + JSON.stringify(userData))
        return res.render('editCRUD.ejs', { user: userData })
    } else {
        return res.send("hello from edit CRUD but not found userId")
    }

}

let putCRUDPage = async(req, res) => {
    // let data = await CRUDService.getAllUser();
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    //return res.send("Updated user Info")
    return res.render("displayCRUD.ejs", {
        dataTable: allUsers
    });

}
let deleteCRUDPage = async(req, res) => {
    // let data = await CRUDService.getAllUser();
    let id = req.query.id;
    console.log("deleting user with id: " + id)
    if (id) {
        await CRUDService.deleteUserById(id);
        //return res.send("Updated user Info")
        return res.send("delete user with id: " + id + " successful");
    } else {
        return res.send("user with id: " + id + " not found");
    }


}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUDPage: getCRUDPage,
    postCRUDPage: postCRUDPage,
    displaygetCRUD: displaygetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUDPage: putCRUDPage,
    deleteCRUDPage: deleteCRUDPage
}