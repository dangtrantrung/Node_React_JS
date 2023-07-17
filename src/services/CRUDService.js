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
            resolve('Ok! Create a New User Successfull');

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
let getAllUser = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let users = db.User.findAll({ raw: true })
            resolve(users);
        } catch (error) {
            reject(error)
        }
    })
}
let getUserInfoById = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true
            })
            if (user) {
                resolve(user);
            } else {
                resolve({})
            }

        } catch (error) {
            reject(error)
        }
    })
}
let updateUserData = (data) => {
    console.log(data);
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },

            })
            if (user) {
                user.firstName = data.FirstName;
                user.lastName = data.LastName;
                user.address = data.Address;
                await user.save();
                let allUsers = db.User.findAll();

                resolve(allUsers);
            } else {
                resolve({})
            }

        } catch (error) {
            reject(error)
        }
    })

}


module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData
}