const MONGOOSE = require("mongoose");
const DOTENV = require("dotenv");
const MOMENT = require('moment')
const BCRYPT = require("bcrypt");

const user = require("./models/user")
const account = require("./models/account")
const team = require("./models/team")
const project = require("./models/project")
const work = require("./models/work")
const task = require("./models/task")
const note = require("./models/note")

// check
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
    let a1 = await account.create({
        email: "phuong@gmail.com",
        password: hash,
    })

    let u1 = await user.create({
        fullName: "Võ Minh Phương",
        birthday: "02/02/2001",
        address: "12 Lê Văn Thọ, Gò Gấp, TP HCM",
        phoneNumber: "0987654321",
        gender: 0,
        status: true,
        avatar: "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/avatar-nam.png",
        accountId: a1.id
    })

    let a2 = await account.create({
        email: "huy@gmail.com",
        password: hash,
    })

    let u2 = await user.create({
        fullName: "Nguyễn Đức Huy",
        birthday: "03/23/2001",
        address: "247 Lê Đức Thọ, Gò Gấp, TP HCM",
        phoneNumber: "0879276284",
        gender: 0,
        status: true,
        avatar: "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/avatar-nam.png",
        accountId: a2.id
    })

    let a3 = await account.create({
        email: "hung@gmail.com",
        password: hash,
    })

    let u3 = await user.create({
        fullName: "Nguyễn Đức Hùng",
        birthday: "09/13/2004",
        address: "247 Lê Đức Thọ, Gò Gấp, TP HCM",
        phoneNumber: "0879276333",
        gender: 0,
        status: true,
        avatar: "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/avatar-nam.png",
        accountId: a3.id
    })

    let a4 = await account.create({
        email: "hoang@gmail.com",
        password: hash,
    })

    let u4 = await user.create({
        fullName: "Nguyễn Việt Hoàng",
        birthday: "02/12/2001",
        address: "Nghĩa trang liệt sỹ Thủ Đức, TP HCM",
        phoneNumber: "0879276285",
        gender: 0,
        status: true,
        avatar: "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/avatar-nam.png",
        accountId: a4.id
    })


    let a5 = await account.create({
        email: "nam@gmail.com",
        password: hash,
    })

    let u5 = await user.create({
        fullName: "Nguyễn Việt Nam",
        birthday: "02/12/2003",
        address: "Nghĩa trang liệt sỹ Thủ Đức, TP HCM",
        phoneNumber: "0879276222",
        gender: 0,
        status: true,
        avatar: "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/avatar-nam.png",
        accountId: a5.id
    })

    let team1 = await team.create({
        teamName: "Team 1",
        createId: u1.id,
        leaderId: u2.id,
        status: true,
        members: [u2.id, u3.id]
    })

    let team2 = await team.create({
        teamName: "Team 2",
        createId: u1.id,
        leaderId: u4.id,
        status: true,
        members: [u4.id, u5.id]
    })

    
    let team3 = await team.create({
        teamName: "Project Owner",
        createId: u1.id,
        leaderId: u1.id,
        status: true,
        members: [u1.id]
    })

    let start = MOMENT("03/23/2010", "MM-DD-YYYY")
    let end = MOMENT("03/23/2012", "MM-DD-YYYY")

    let p1 = await project.create({
        name: "Project 1",
        startTime: start,
        endTime: end,
        status: false,
        background: "https://iuh4kltn.s3.ap-southeast-1.amazonaws.com/project.png",
        teamIds: [team1.id, team2.id, team3.id]
    })

    let startTimeW1 = MOMENT("03/23/2010", "MM-DD-YYYY")
    let endTimeW1 = MOMENT("03/23/2011", "MM-DD-YYYY")

    let work1 = await work.create({
        name: "Work 1",
        status: false,
        startTime: startTimeW1,
        endTime: endTimeW1,
        teamId: team1.id,
        createId: u2.id,
        projectId: project.id
    })

    let startTimeW2 = MOMENT("03/23/2011", "MM-DD-YYYY")
    let endTimeW2 = MOMENT("03/23/2012", "MM-DD-YYYY")

    let work2 = await work.create({
        name: "Work 2",
        status: false,
        startTime: startTimeW2,
        endTime: endTimeW2,
        teamId: team2.id,
        createId: u4.id,
        projectId: project.id
    })

    // let startTask1 = MOMENT("03-23-2010", "MM-DD-YYYY")
    // let endTask1 = MOMENT("03-23-2011", "MM-DD-YYYY")
    // let task1 = await task.create({
    //     name: "Task 1",
    //     startDay: startTask1,
    //     endDay: endTask1,
    //     startHour: "9:00",
    //     endHour: "16:00",
    //     linkSupport: "ABC",
    //     imageLink: "ABC",
    //     workId: work1.id,
    //     members: [u2.id]
    // })

    // let startTask2 = MOMENT("03-23-2010", "MM-DD-YYYY")
    // let endTask2 = MOMENT("03-23-2011", "MM-DD-YYYY")
    // let task2 = await task.create({
    //     name: "Task 2",
    //     startDay: startTask2,
    //     endDay: endTask2,
    //     startHour: "9:00",
    //     endHour: "16:00",
    //     linkSupport: "ABC",
    //     imageLink: "ABC",
    //     workId: work1.id,
    //     members: [u3.id]
    // })

    // let startTask3 = MOMENT("03-23-2011", "MM-DD-YYYY")
    // let endTask3 = MOMENT("03-23-2012", "MM-DD-YYYY")
    // let task3 = await task.create({
    //     name: "Task 3",
    //     startDay: startTask3,
    //     endDay: endTask3,
    //     startHour: "9:00",
    //     endHour: "16:00",
    //     linkSupport: "ABC",
    //     imageLink: "ABC",
    //     workId: work2.id,
    //     members: [u4.id]
    // })

    // let task4 = await task.create({
    //     name: "Task 4",
    //     startDay: startTask3,
    //     endDay: endTask3,
    //     startHour: "9:00",
    //     endHour: "16:00",
    //     linkSupport: "ABC",
    //     imageLink: "ABC",
    //     workId: work2.id,
    //     members: [u5.id]
    // })

    // let n1 = await note.create({
    //     text: "Không biết làm",
    //     links: null,
    //     taskId: task2.id,
    //     createId: u3.id
    // })
}