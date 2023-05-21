const USER = require('../models/user')
const ACCOUNT = require('../models/account')
const TASK = require('../models/task')
const MOMENT = require('moment')
const crypto = require('crypto')
const awsService = require('../services/aws-service')
const PROJECT = require('../models/project')
const TEAM = require('../models/user')
const PARTITIONTABLE = require('../models/partitionTable')

// done
exports.getAllUser = async (req, res) => {
    try {
        let users = await USER.find()
        let list = []
        for (let i of users) {
            list.push(i.id)
        }
        return res.status(200).json({
            status: "Success",
            data: list
        })
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
//done
exports.getUserById = async (req, res) => {
    try {
        let id = req.params.id
        let user = await USER.findById(id)
        if (user) {
            let data = {
                "_id": user.id, "fullName": user.fullName, "birthday": user.birthday,
                "address": user.address, "phoneNumber": user.phoneNumber, "gender": user.gender,
                "avatar": user.avatar, "status": user.status, "accountId": user.accountId
            }
            return res.status(200).json(data);
        }
    } catch (error) {
        return res.status(500).json({ msg: error });
    }
};
//done
exports.getUserByEmail = async (req, res) => {
    try {
        let email = req.params.email
        let account = await ACCOUNT.findOne({ email: email })
        let user = await USER.findOne({ accountId: account.id })
        if (user) {
            let data = {
                "_id": user.id, "fullName": user.fullName, "birthday": user.birthday,
                "address": user.address, "phoneNumber": user.phoneNumber, "gender": user.gender,
                "avatar": user.avatar, "status": user.status, "accountId": user.accountId
            }
            return res.status(200).json(data);
        }
    } catch (error) {
        return res.status(500).json({ msg: error });
    }
};
//done
exports.getUserByName = async (req, res) => {
    try {
        let datas = []
        let name = req.params.name.toLowerCase()
        let user = await USER.find()
        for ( u of user) {
            if(u.fullName.toLowerCase().inclues(name)) {
                datas.push(u)
            }
        }
        if (user) {
            return res.status(200).json(datas);
        }
    } catch (error) {
        return res.status(500).json({ msg: error });
    }
};
//done
exports.getUserByPhone = async (req, res) => {
    try {
        let phone = req.params.phone
        let user = await USER.findOne({ phone_number: phone })
        if (user) {
            let data = {
                "_id": user.id, "fullName": user.fullName, "birthday": user.birthday,
                "address": user.address, "phoneNumber": user.phoneNumber, "gender": user.gender,
                "avatar": user.avatar, "status": user.status, "accountId": user.accountId
            }
            return res.status(200).json(data);
        }
    } catch (error) {
        return res.status(500).json({ msg: error });
    }
};
exports.getAllUserByTaskId = async (req, res) => {
    try {
        let id = req.params.id
        let members = []
        let task = await TASK.findById(id)
        let partitions = await PARTITIONTABLE.find({
            taskId: id
        })
        console.log(partitions);
        for (p of partitions) {
            members.push(p.userId)
        }
        let datas = []
        for ( i of members ) {
            let user = await USER.findById(i)
            if (user) {
                let data = {
                    "_id": user.id, "fullName": user.fullName, "birthday": user.birthday,
                    "address": user.address, "phoneNumber": user.phoneNumber, "gender": user.gender,
                    "avatar": user.avatar, "status": user.status, "accountId": user.accountId
                }
                datas.push(data)
            }
        }
        return res.status(200).json(datas);
    } catch (error) {
        return res.status(500).json({ msg: error });
    }
};
//done
exports.createUser = async (req, res, accountId) => {
    try {
        let { fullName, birthday, address, phoneNumber, gender } = req.body
        let path
        if(!req.files) {
            if (gender) {
                path = "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/avatar-nam.png"
            } else {
                path = "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/avatar-nu.png"
            }
        } else {
            const file = req.files.avatar;
            path = await awsService.uploadFileToS3(req,res,file)
        }
        let date = MOMENT(birthday, "MM-DD-YYYY")
        let user = await USER.create({
            fullName: fullName,
            birthday: date,
            address: address,
            phoneNumber: phoneNumber,
            gender: gender,
            avatar: path,
            status: true,
            accountId: accountId
        })
        return user
    } catch (error) {
        return res.status(500).json({ msg: error });
    }
}
//Chưa có readme ( chưa test)
exports.updateAvatar = async (req, res) => {
    try {
        let id = req.params.id
        let path = await awsService.uploadFileToS3(req,res,req.files.avatarImage)
        await USER.findByIdAndUpdate(id, {
            avatar:path
        })
        let user = await USER.findById(id)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ msg: error });
    }
}
//done
exports.updateUser = async (req, res) => {
    try {
        let id = req.params.id
        let { fullName, birthday, address, phoneNumber, gender, avatarImage } = req.body
        let path = await awsService.uploadFileToS3(req,res,avatarImage)
        let date = MOMENT(birthday, "MM-DD-YYYY")
        await USER.findByIdAndUpdate(id, {
            fullName: fullName,
            birthday: date,
            address: address,
            phoneNumber: phoneNumber,
            gender: gender,
            avatar: path,
            status: true
        })
        let user = await USER.findById(id)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ msg: error });
    }
}
//done
exports.lockUser = async (req, res) => {
    try {
        let id = req.params.id
        await USER.findByIdAndUpdate(id, {
            status: false,
        })
        let user = await USER.findById(id)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ msg: error });
    }
}

