const NOTE = require('../models/note')
const USER = require('../models/user')
const PARTITIONTABLE = require('../models/partitionTable')
const TEAM = require('../models/team')
const MEMBER = require('../models/member')

//done
exports.getAllNote = async (req, res) => {
    try {
        let notes = await NOTE.find()
        return res.status(200).json(notes)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
//done
exports.getNoteByIdTask = async (req, res) => {
    try {
        let id = req.params.id
        let datas = []
        let notes = await NOTE.find({
            taskId: id
        })

        if (notes.length > 0) {
            for (n of notes) {
                let user = await USER.findById(n.createId)
                let info = {
                    _id: user.id,
                    name: user.fullName,
                    avatar: user.avatar
                }
                let data = {
                    _id: n.id,
                    text: n.text,
                    taskId: n.taskId,
                    workId: n.workId,
                    members: info
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
exports.getNoteByIdWork = async (req, res) => {
    try {
        let id = req.params.id
        let datas = []
        let notes = await NOTE.find({
            workId: id
        })
        if (notes.length > 0) {
            for (m of notes) {
                let user = await USER.findById(m.createId)
                let info = {
                    _id: user.id,
                    name: user.fullName,
                    avatar: user.avatar
                }
                let data = {
                    _id: m.id,
                    text: m.text,
                    taskId: m.taskId,
                    workId: m.workId,
                    members: info
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
exports.getNoteById = async (req, res) => {
    try {
        let id = req.params.id
        let note = await NOTE.findById(id)
        if (note) {
            return res.status(200).json(note);
        }
    } catch (error) {
        return res.status(500).json({ msg: error });
    }
};
//done
exports.createNoteTask = async (req, res) => {
    try {
        let { createId, taskId, text } = req.body
        let note = await NOTE.create({
            text: text,
            taskId: taskId,
            createId: createId,
        })

        let user = await USER.findById(createId)
        let info = {
            _id: user.id,
            name: user.fullName,
            avatar: user.avatar
        }
        let data = {
            _id: note.id,
            text: note.text,
            taskId: note.taskId,
            workId: note.workId,
            members: info
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
//done
exports.createNoteWork = async (req, res) => {
    try {
        let { workId, createId, text } = req.body
        let note = await NOTE.create({
            text: text,
            workId: workId,
            createId: createId,
        })

        let user = await USER.findById(createId)
        let info = {
            _id: user.id,
            name: user.fullName,
            avatar: user.avatar
        }
        let data = {
            _id: note.id,
            text: note.text,
            taskId: note.taskId,
            workId: note.workId,
            members: info
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
//done
exports.removeNote = async (req, res) => {
    try {
        let id = req.params.id
        await NOTE.deleteOne({ _id: id });
        return res.status(200).json({
            _id: id
        });
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
//done
exports.updateNote = async (req, res) => {
    try {
        let id = req.params.id
        let { createId, text } = req.body
        let note = await NOTE.findByIdAndUpdate(id, {
            text: text,
            createId: createId
        })
        return res.status(200).json(note);
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}