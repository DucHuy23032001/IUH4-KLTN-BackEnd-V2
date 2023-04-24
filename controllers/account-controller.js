const ACCOUNT = require('../models/account')
const accountService = require('../services/account-service')
const BCRYPT = require('bcrypt')


//done
exports.getAllAccount = async (req, res) => {
    try {
        let accounts = await ACCOUNT.find()
        let list = []
        for (let i of accounts) {
            list.push(i.id)
        }
        return res.status(200).json(list)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}

//done
exports.getAccountByEmail = async (req, res) => {
    try {
        let email = req.params.email
        let account = await ACCOUNT.findOne({
            email: email
        })
        if (account) {
            let data = { id: account.id, email: account.email, password: account.password }
            return res.status(200).json(data);
        }
    } catch (error) {
        return res.status(500).json({ msg: error });
    }
};

//done
exports.getAccountById = async (req, res) => {
    try {
        let id = req.params.id
        let account = await ACCOUNT.findById(id)
        if (account) {
            let _data = { id: account.id, email: account.email, password: account.password }
            return res.status(200).json(_data);
        }
    } catch (error) {
        return res.status(500).json({ msg: error });
    }
};

//done
exports.createAccount = async (req, res) => {
    try {
        let { email, password } = req.body
        let checkAccount = await ACCOUNT.findOne({
            email: email
        })
        if (!checkAccount) {
            let hash = await BCRYPT.hash(password, 10);
            let newAccount = new ACCOUNT()
            newAccount.email = email
            newAccount.password = hash
            return newAccount
        }
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}

//done
exports.changePassword = async (req, res) => {
    try {
        let { password, newPassword, confirm } = req.body
        let id = req.params.id
        let check = await accountService.checkPasswordOfChangePassword(id, password)
        let confirmPassword = accountService.confirmNewPassword(newPassword, confirm)
        if (!check) {
            return res.status(404).json({
                msg: "Check password"
            })
        } else if (!confirmPassword) {
            return res.status(404).json({
                msg: "Check new password"
            })
        }
        let hash = await BCRYPT.hash(newPassword, 10);
        await ACCOUNT.findByIdAndUpdate(id, { password: hash })
        return res.status(200).json({
            id: id,
            status: "Success"
        })
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}

//done
exports.forgetPassword = async (req, res) => {
    try {
        let {email, newPassword, confirm} = req.body
        let confirmPassword = accountService.confirmNewPassword(newPassword, confirm)
        if (!confirmPassword) {
            return res.status(404).json({
                msg: "Check new password"
            })
        }
        let hash = await BCRYPT.hash(newPassword, 10);
        let account = await ACCOUNT.findOne({
            email:email
        })
        account.password = hash
        account.save()
        return res.status(200).json({
            id: account.id,
            status: "Success"
        })
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}