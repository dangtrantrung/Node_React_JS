const { reject } = require("bcrypt/promises");
const db = require('../models/index')
var bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);


let createNewUser = async(data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let hasPasswordFromBcrypt = await hashUserPassword(data.password);

            /*  console.log('data from service hashed... ' + hasPasswordFromBcrypt);
             console.log(data) */

            await db.User.create({
                email: data.email,
                password: hasPasswordFromBcrypt,
                firstName: data.FirstName,
                lastName: data.LastName,
                address: data.Address,
                gender: data.Gender === '1' ? true : false,
                roleId: data.RoleId,
                phonenumber: data.PhoneNumber
            })
            console.log(data)
            resolve('Ok! Create a New User Success');

        } catch (error) {
            reject(error)
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async(resolve, reject) => {
        try {
            var hash = await bcrypt.hashSync(password, salt);
            resolve(hash);
        } catch (error) {
            reject(error)
        }



    })
}

module.exports = {
    createNewUser: createNewUser
}