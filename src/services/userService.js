import db from '../models/index';

const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);


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

let handeUserLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exist
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password'],
                    raw: true

                });
                if (user) {
                    //compare password'
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "Ok";

                        //hide user pasword
                        delete user.password;

                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong password";
                    }

                } else {
                    // if this time this user was removed in DB
                    userData.errCode = 2;
                    userData.errMessage = "User's not found~";
                }

            } else {
                // return error
                userData.errCode = 1;
                userData.errMessage = `Your Email isn't exist in our system.Plz try other email`
            }

            resolve(userData)

        } catch (error) {

        }
    })
}
let checkUserEmail = (userEmail) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: userEmail
                }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}
let compareUserPassword = () => {
    return new Promise((resolve, reject) => {
        try {
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}
let getAllUsers = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = db.User.findAll();
            }
            if (userId && userId !== "ALL") {
                users = await db.User.findOne({
                    where: { id: userId },
                    raw: true
                })
            }
            console.log(users);
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}
let CreateNewUser = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            //check email exist first
            let check = await checkUserEmail(data.email)
            if (check === true) {
                resolve({
                    errCode: 1,
                    message: 'Your email is already exist. Plz try another email!!'
                })
            }

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
            resolve({
                errCode: 0,
                message: 'Ok! Create a New User Successfull'
            });

        } catch (error) {
            reject(error)
        }
    })
}
let deleteUser = (userId) => {
    console.log('delete user with: ' + userId);
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })

            if (!user) {
                resolve({
                    errCode: 2,
                    message: 'This user isnt exist!'
                });
            } else {
                //await user.destroy();
                // let allUsers = db.User.findAll();
                await db.User.destroy({
                    where: { id: userId }
                })
                resolve({
                    errCode: 0,
                    message: 'Ok! User is Deleted Successfull'
                });
            }
            //resolve();

        } catch (error) {
            reject(error)
        }
    })

}
let editUser = (data) => {
    console.log(data);
    return new Promise(async(resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameters!!!'
                });
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false

            })
            if (user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address
                await user.save()

                resolve({
                    errCode: 0,
                    message: 'This user info updated successfully!'
                });
            } else {
                resolve({
                    errCode: 3,
                    message: 'User not found!!!'
                });
            }

        } catch (error) {
            reject(error)
        }
    })

}

module.exports = {
    handeUserLogin: handeUserLogin,
    getAllUsers: getAllUsers,
    CreateNewUser: CreateNewUser,
    deleteUser: deleteUser,
    editUser: editUser
}