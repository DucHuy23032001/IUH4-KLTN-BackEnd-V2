const NOTE = require('../models/note')

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
        let note = await NOTE.find({
            taskId:id
        })
        if (note) {
            return res.status(200).json(note);
        }
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
exports.createNote = async (req, res) => {
    try {
        let { createId, taskId, text, links} = req.body
        let note = await NOTE.create({
            text:text ,
            links: links,
            taskId:taskId ,
            createId: createId
        })
        return res.status(200).json(note);
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
            _id : id
        });
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}
//done
exports.updateNote = async (req, res) => {
    try {
        let id = req.params.id
        let { createId, text, links} = req.body
        let note = await NOTE.findByIdAndUpdate(id, {
            text:text ,
            links: links,
            createId: createId
        })
        return res.status(200).json(note);
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}