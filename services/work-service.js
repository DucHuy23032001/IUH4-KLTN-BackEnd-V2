const WORK = require('../models/work')
const PROJECT = require('../models/project')

exports.conformTime = async (id) => {
    try {
        let work = await WORK.findById(id)
        let project = await PROJECT.findById(work.projectId)
        if (start > end) {
            return res.status(409).json({
                msg: "Thời gian bắt đầu phải trước thời gian kết thúc"
            })
        }
        if (start < project.startTime) {
            return res.status(409).json({
                msg: "Thời gian bắt đầu work phải phù hợp với thời gian bắt đầu của project"
            })
        }
        if (end > project.endTime) {
            return res.status(409).json({
                msg: "Thời gian kết thúc work phải phù hợp với thời gian kết thúc của project"
            })
        }

        if (work.createId != createId) {
            return res.status(400).json({
                message: "Only the project owner can edit"
            })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
};