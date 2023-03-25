const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const hpp = require('hpp');
const xss = require('xss-clean');
const fileUpload = require('express-fileupload')
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const multer = require("multer")

const app = express()

const accountRouter = require("./routes/account-router")
const userRouter = require("./routes/user-router")
const teamRouter = require("./routes/team-router")
const authRouter = require("./routes/auth-router")
const projectRouter = require("./routes/project-router")
const workRouter = require("./routes/work-router")
const taskRouter = require("./routes/task-router")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileUpload())
app.use(cors())
app.use(helmet());
app.use(express.static('public'));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use('/api/v1/accounts',accountRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/teams',teamRouter)
app.use('/api/v1/projects',projectRouter)
app.use('/api/v1/works',workRouter)
app.use('/api/v1/tasks',taskRouter)
app.use('/api/v1/auths',authRouter)

// app.use('*', (req, res, next) => {
//     const err = new AppError(404, 'fail', 'undefined route');
//     next(err, req, res, next);
// });

module.exports = app;