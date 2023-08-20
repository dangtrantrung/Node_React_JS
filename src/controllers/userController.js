const userService = require('../services/userService');

let handleLogin = async(req, res) => {
    //return res.render("your message")
    // return result of an API
    //return res.status(200).json({ message: 'hello world API' })

    let email = req.body.email;
    let password = req.body.password;
    //check email exist
    //check password -cmpare password
    //return user
    //access JWT: Json Web Token
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameters!'
        })
    }
    let userData = await userService.handeUserLogin(email, password)

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {
            'a': 'abc'
        }
    })

}
module.exports = {
    handleLogin: handleLogin
}