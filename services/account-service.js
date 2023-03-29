const ACCOUNT = require('../models/account')
const BCRYPT = require('bcrypt')
const JWT = require("jsonwebtoken");
const USER = require('../models/user');

exports.createToken = (user) => {
    try {
        // let data = req.body
        console.log("123");
        return JWT.sign(
            {
                user,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN,
            }
        );
    } catch (error) {
        return res.status(500).json(error)
    }
};

exports.checkEmail = async (email) => {
    try {
        let account = await ACCOUNT.findOne({
            email: email
        })
        // console.log(account);
        if(account){
            return false
        }
        return true
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.checkPasswordOfChangePassword = async (id, password) => {
    try {
        let account = await ACCOUNT.findById(id)
        let check = await BCRYPT.compare(password, account.password);
        return check
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.confirmNewPassword = (password, confirm) => {
    try {
        if (password == confirm) {
            return true;
        }
        return false;
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.checkPassword = async (email,paswordSignIn) =>{
    try {
        let account = await ACCOUNT.findOne({
            email: email
        })
        let user = await USER.findOne({
            account_id:account.id
        })
        let check = await BCRYPT.compare(paswordSignIn, account.password);
        if(check) {
            return user
        }
        else {
            return !check
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}