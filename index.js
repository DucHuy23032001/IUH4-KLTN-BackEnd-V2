const MONGOOSE = require("mongoose");
const DOTENV = require("dotenv");
const MOMENT = require('moment')
const BCRYPT = require("bcrypt");

const user = require("./models/user")
const account = require("./models/account")
const team = require("./models/team")
const project = require('./models/project')
const work = require("./models/work")
const task = require("./models/task")
const member = require("./models/member")
const partitionTable = require('./models/partitionTable')
const memberWork = require('./models/memberWork')
const note = require('./models/note')

DOTENV.config({
    path: "./config.env",
});

process.on("uncaughtException", (err) => {
    process.exit(1);
});

const PORT = process.env.PORT;
const DATABASE = process.env.DATABASE
const APP = require("./app");

MONGOOSE.set("strictQuery", false);
MONGOOSE.connect(
    DATABASE,
    () => {
        console.log("Success");
    },
    (e) => console.error(e)
);

APP.listen(PORT, () => {
    console.log(`Application is running on PORT ${PORT}`);
});

process.on("unhandledRejection", (err) => {
    server.close(() => {
        process.exit(1);
    });
});

// addData()
async function addData() {
    let hash = await BCRYPT.hash("123456", 10);

    // User Main
    let aMainProject = await account.create({
        email: "nghia@gmail.com",
        password: hash,
    })
    let uMainProject = await user.create({
        fullName: "Nguyễn Văn Nghĩa",
        birthday: "03/20/1984",
        address: "12 Lê Văn Thọ, Gò Gấp, TP HCM",
        phoneNumber: "0879276281",
        gender: 0,
        status: true,
        avatar: "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/4.jpg",
        accountId: aMainProject.id
    })

    // Team Âm nhạc
    let aLeaderTeamAN = await account.create({
        email: "phuong@gmail.com",
        password: hash,
    })
    let uLeaderTeamAN = await user.create({
        fullName: "Võ Minh Phương",
        birthday: "02/02/2001",
        address: "12 Lê Văn Thọ, Gò Gấp, TP HCM",
        phoneNumber: "0879276260",
        gender: 0,
        status: true,
        avatar: "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/3.jpg",
        accountId: aLeaderTeamAN.id
    })

    let aAN1 = await account.create({
        email: "huy@gmail.com",
        password: hash,
    })
    let uAN1 = await user.create({
        fullName: "Nguyễn Đức Huy",
        birthday: "03/23/1990",
        address: "247 Lê Đức Thọ, Gò Gấp, TP HCM",
        phoneNumber: "0879276261",
        gender: 0,
        status: true,
        avatar: "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/Huy.jpg",
        accountId: aAN1.id
    })

    let aAN2 = await account.create({
        email: "hung@gmail.com",
        password: hash,
    })
    let uAN2 = await user.create({
        fullName: "Nguyễn Đức Hùng",
        birthday: "09/13/1989",
        address: "247 Lê Đức Thọ, Gò Gấp, TP HCM",
        phoneNumber: "0879276262",
        gender: 0,
        status: true,
        avatar: "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/5.jpg",
        accountId: aAN2.id
    })

    let aAN3 = await account.create({
        email: "hoang@gmail.com",
        password: hash,
    })
    let uAN3 = await user.create({
        fullName: "Nguyễn Việt Hoàng",
        birthday: "02/09/1987",
        address: "Nghĩa trang liệt sỹ Thủ Đức, TP HCM",
        phoneNumber: "0879276263",
        gender: 0,
        status: true,
        avatar: "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/2.jpg",
        accountId: aAN3.id
    })

    let aAN4 = await account.create({
        email: "nam@gmail.com",
        password: hash,
    })
    let uAN4 = await user.create({
        fullName: "Nguyễn Việt Nam",
        birthday: "02/12/1988",
        address: "Nghĩa trang liệt sỹ Thủ Đức, TP HCM",
        phoneNumber: "0879276264",
        gender: 0,
        status: true,
        avatar: "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/avatar-nam.png",
        accountId: aAN4.id
    })

    let aAN5 = await account.create({
        email: "lanphuong@gmail.com",
        password: hash,
    })
    let uAN5 = await user.create({
        fullName: "Nguyễn Lan Phương",
        birthday: "02/12/1998",
        address: "Diễn Yên, Diễn Châu, Nghệ An",
        phoneNumber: "0879278888",
        gender: 1,
        status: true,
        avatar: "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/phuong.jpg",
        accountId: aAN5.id
    })

    let aAN6 = await account.create({
        email: "thao@gmail.com",
        password: hash,
    })
    let uAN6 = await user.create({
        fullName: "Nguyễn Phương Thảo",
        birthday: "04/25/1999",
        address: "Diễn Phong, Diễn Châu, Nghệ An",
        phoneNumber: "0348858989",
        gender: 1,
        status: true,
        avatar: "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/phuong2.jpg",
        accountId: aAN6.id
    })

    let aAN7 = await account.create({
        email: "chau@gmail.com",
        password: hash,
    })
    let uAN7 = await user.create({
        fullName: "Đàm Bảo Hàng Châu",
        birthday: "10/12/1997",
        address: "Chung cư Eco Green, Quận 7, Tp Hồ Chí Minh",
        phoneNumber: "0342758342",
        gender: 1,
        status: true,
        avatar: "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/tam.jpg",
        accountId: aAN7.id
    })

    let start = MOMENT("06/05/2023", "MM-DD-YYYY")
    let end = MOMENT("09/05/2023", "MM-DD-YYYY")

    let p = await project.create({
        name: "Khai giảng năm học",
        startTime: start,
        endTime: end,
        status: false,
        background: "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/project.png",
        mainProject: uMainProject.id
    })

    let teamAmNhac = await team.create({
       teamName: "Âm nhạc",
       projectId: p.id,
       createId: uMainProject.id
    })

    let memberLeader1 = await member.create({
        number: 0,
        userId: uLeaderTeamAN.id,
        teamId : teamAmNhac.id
    })

    let memberAN1 = await member.create({
        number: 1,
        userId: uAN1.id,
        teamId : teamAmNhac.id
    })

    let memberAN2 = await member.create({
        number: 1,
        userId: uAN2.id,
        teamId : teamAmNhac.id
    })

    let memberAN3 = await member.create({
        number: 1,
        userId: uAN3.id,
        teamId : teamAmNhac.id
    })

    let memberAN4 = await member.create({
        number: 1,
        userId: uAN4.id,
        teamId : teamAmNhac.id
    })

//, teamAmThanhAnhSang.id , teamAnNinh.id, teamCTSV.id, teamHCQT.id, teamKeToan.id, teamSanKhau.id, teamTruyenThong.id, teamVanPhongDoan.id
    let startTimeW1 = MOMENT("06/05/2023", "MM-DD-YYYY")
    let endTimeW1 = MOMENT("06/15/2023", "MM-DD-YYYY")

    let startTimeW2 = MOMENT("06/16/2023", "MM-DD-YYYY")
    let endTimeW2 = MOMENT("08/31/2023", "MM-DD-YYYY")

    let startTimeW3 = MOMENT("09/01/2023", "MM-DD-YYYY")
    let endTimeW3 = MOMENT("09/05/2023", "MM-DD-YYYY")

    let work1AmNhac = await work.create({
        name: "Chuẩn bị",
        status: false,
        startTime: startTimeW1,
        endTime: endTimeW1,
        createId: uMainProject.id,
        projectId: p.id
    })

    let work2AmNhac = await work.create({
        name: "Tập luyện",
        status: false,
        startTime: startTimeW1,
        endTime: endTimeW1,
        createId: uMainProject.id,
        projectId: p.id
    })

    let work3AmNhac = await work.create({
        name: "Trình diễn",
        status: false,
        startTime: startTimeW1,
        endTime: endTimeW1,
        createId: uMainProject.id,
        leaderId: uLeaderTeamAN.id,
        projectId: p.id
    })

    let memberWork1 = await memberWork.create({
        number : 1 ,
        teamId : teamAmNhac.id,
        workId : work1AmNhac.id
    })

    let memberWork2 = await memberWork.create({
        number : 1 ,
        teamId : teamAmNhac.id,
        workId : work2AmNhac.id
    })

    let memberWork3 = await memberWork.create({
        number : 1 ,
        teamId : teamAmNhac.id,
        workId : work3AmNhac.id
    })

    let task1Work1AmNhac = await task.create({
        name: "Lựa chọn tiết mục để tập luyện",
        description: "description",
        startDay: startTimeW1,
        endDay: endTimeW1,
        startHour: "9:00" ,
        endHour: "10:00",
        workId: work1AmNhac.id,
        status: false,
        level: 1
    })

    let task2Work1AmNhac = await task.create({
        name: "Lựa chọn địa điểm tập luyện",
        description: "description",
        startDay: startTimeW1,
        endDay: endTimeW1,
        startHour: "9:00" ,
        endHour: "10:00",
        workId: work1AmNhac.id,
        status: false,
        level: 1
    })

    let task3Work1AmNhac = await task.create({
        name: "Lựa chọn Thành viên",
        description: "description",
        startDay: startTimeW1,
        endDay: endTimeW1,
        startHour: "9:00" ,
        endHour: "10:00",
        workId: work1AmNhac.id,
        status: false,
        level: 1
    })

    let task4Work1AmNhac = await task.create({
        name: "Lên kế hoạch thời gian tập luyện",
        description: "description",
        startDay: startTimeW1,
        endDay: endTimeW1,
        startHour: "9:00" ,
        endHour: "10:00",
        workId: work1AmNhac.id,
        status: false,
        level: 1
    })

    let partitionTable1 = await partitionTable.create({
        userId: uAN1.id,
        number:1,
        taskId:task1Work1AmNhac.id,
    })

    let partitionTable2 = await partitionTable.create({
        userId: uAN2.id,
        number:1,
        taskId:task2Work1AmNhac.id,
    })

    let partitionTable3 = await partitionTable.create({
        userId: uAN3.id,
        number:1,
        taskId:task3Work1AmNhac.id,
    })

    let partitionTable4 = await partitionTable.create({
        userId: uAN4.id,
        number:1,
        taskId:task4Work1AmNhac.id,
    })

    let note1 = await note.create({
        text: "note 1",
        taskId: task1Work1AmNhac.id,
        createId: uAN1.id
    })

    let note2 = await note.create({
        text: "note 2",
        taskId: task1Work1AmNhac.id,
        createId: uAN1.id
    })

    let note3 = await note.create({
        text: "note 3",
        workId: work1AmNhac,
        createId: uAN1.id
    })

    let note4 = await note.create({
        text: "note 4",
        workId: work2AmNhac,
        createId: uAN1.id
    })




    // let task1Work2AmNhac = await task.create({
    //     name: "Phân chia các thành viên thành những nhóm nhỏ hơn",
    //     startDay: startTimeW2,
    //     endDay: endTimeW2,
    //     startHour: "9:00" ,
    //     endHour: "10:00",
    //     workId: work2AmNhac.id,
    //     members: [uAN1.id, uAN2.id],
    //     status: false,
    //     level: 1
    // })

    // let task2Work2AmNhac = await task.create({
    //     name: "Phân chia tiết mục tập luyện cho các nhóm",
    //     startDay: startTimeW2,
    //     endDay: endTimeW2,
    //     startHour: "9:00" ,
    //     endHour: "10:00",
    //     workId: work2AmNhac.id,
    //     members: [uAN3.id, uAN4.id],
    //     status: false,
    //     level: 1
    // })

    // let task3Work2AmNhac = await task.create({
    //     name: "Lựa chọn lịch tập phù hợp cho các nhóm",
    //     startDay: startTimeW2,
    //     endDay: endTimeW2,
    //     startHour: "9:00" ,
    //     endHour: "10:00",
    //     workId: work2AmNhac.id,
    //     members: [uAN3.id, uAN4.id],
    //     status: false,
    //     level: 1
    // })

    // let task4Work2AmNhac = await task.create({
    //     name: "Phân chia lịch tập cho các nhóm",
    //     startDay: startTimeW2,
    //     endDay: endTimeW2,
    //     startHour: "9:00" ,
    //     endHour: "10:00",
    //     workId: work2AmNhac.id,
    //     members: [uAN1.id, uAN2.id],
    //     status: false,
    //     level: 1
    // })

    // let task5Work2AmNhac = await task.create({
    //     name: "Đảm bảo tiến trình tập luyện, báo cáo liên tục qua từng buổi tập",
    //     startDay: startTimeW2,
    //     endDay: endTimeW2,
    //     startHour: "9:00" ,
    //     endHour: "10:00",
    //     workId: work2AmNhac.id,
    //     members: [uAN1.id, uAN2.id, uAN3.id, uAN4.id],
    //     status: false,
    //     level: 1
    // })

    // let task1Work3AmNhac = await task.create({
    //     name: "Triển khai kế hoạch tập trung và duyệt thử",
    //     startDay: startTimeW3,
    //     endDay: endTimeW3,
    //     startHour: "9:00" ,
    //     endHour: "10:00",
    //     workId: work3AmNhac.id,
    //     members: [uAN1.id, uAN2.id],
    //     status: false,
    //     level: 1
    // })

    // let task2Work3AmNhac = await task.create({
    //     name: "Tiến thành thuê đồ diễn, tính toán chi phí và báo cáo lại",
    //     startDay: startTimeW3,
    //     endDay: endTimeW3,
    //     startHour: "9:00" ,
    //     endHour: "10:00",
    //     workId: work3AmNhac.id,
    //     members: [uAN3.id, uAN4.id],
    //     status: false,
    //     level: 1
    // })

    // let task3Work3AmNhac = await task.create({
    //     name: "Tiến thành thuê đồ diễn, tính toán chi phí và báo cáo lại",
    //     startDay: startTimeW3,
    //     endDay: endTimeW3,
    //     startHour: "9:00" ,
    //     endHour: "10:00",
    //     workId: work3AmNhac.id,
    //     members: [uAN1.id, uAN2.id],
    //     status: false,
    //     level: 1
    // })
}