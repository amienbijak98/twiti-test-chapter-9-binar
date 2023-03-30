const userRepo = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
//const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config/.env" });

async function Register(req, res) {
  try {
    const userPass = await req.body.password;
    const encryptedpass = bcrypt.hashSync(userPass, 10);
    console.log(encryptedpass);

    const payload = {
      username: req.body.username,
      email: req.body.email,
      password: encryptedpass,
      fullname: req.body.fullname,
    };

    const user = await userRepo.Register(payload);
    return res.status(200).json({
      status: 200,
      message: "Berhasil daftar user!",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
}

async function LoginPage(req, res) {
  let messages = "";
  if (req.session) {
    if (req.session.messages) {
      messages = req.session.messages[0];

      req.session.messages = [];
    }
  }

  return res.render("login", { messages: messages });
}

async function Login(req, res) {
  let userInput;
  if (req.body.username == null && req.body.email != null) {
    userInput = req.body.email;
  } else if (req.body.username != null && req.body.email == null) {
    userInput = req.body.username;
  }

  try {
    const checkUser = await userRepo.FindByUserEmail(userInput);

    if (!checkUser) {
      throw "User not found";
    }

    const respToken = await jwt.sign(
      {
        id: checkUser.id,
        username: checkUser.username,
        email: checkUser.email,
        fullname: checkUser.fullname,
      },
      process.env.SECRET_KEY
    );

    return res.status(200).json({
      status: 200,
      message: "Berhasil login!",
      token: respToken,
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
}

async function whoami(req, res) {
  try {
    const currentUser = req.user;
    return res.json({
      id: currentUser.id,
      username: currentUser.username,
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
}

module.exports = {
  Register,
  Login,
  LoginPage,
  whoami,
};
