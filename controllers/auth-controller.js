const accountService = require("../services/account-service")
const accountController = require("./account-controller")
const userController = require("./user-controller")

//done
exports.signUp = async (req, res) => {
  try {
    let { email, password, confirmPassword } = req.body
    let checkEmail = await accountService.checkEmail(email)
    let checkPassword = accountService.confirmNewPassword(password, confirmPassword)
    if (!checkEmail) {
      return res.status(403).json({
        msg: "Check mail"
      })
    } else {
      if (!checkPassword) {
        return res.status(404).json({
          msg: "Check password"
        })
      }
    }
    let account = await accountController.createAccount(req, res)
    let user = await userController.createUser(req, res, account.id)
    account.save()
    let token = accountService.createToken(user)
    return res.status(200).json({
      // user: user,
      token: token
    })
  } catch (error) {
    return res.status(500).json(error)
  }
}

//done
exports.signIn = async (req, res) => {
  try {
    let { email, password } = req.body
    let checkEmail = await accountService.checkEmail(email)
    if (!checkEmail) {
      let checkPassword = await accountService.checkPassword(email, password)
      if (checkPassword.check) {
        let token = accountService.createToken(checkPassword.user)
        return res.status(200).json({
          msg: "Success",
          token: token
        })
      } else {
        return res.status(404).json({
          msg: "Vui lòng kiểm tra lại mật khẩu!"
        })
      }
    } else {
      return res.status(403).json({
        msg: "Tài khoản không tồn tại!"
      })
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}

