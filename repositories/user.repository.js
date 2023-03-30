const { User } = require("../models");
const { Op } = require("sequelize");

async function Register(query) {
  try {
    const users = await User.create({
      username: query.username,
      email: query.email,
      password: query.password,
      fullname: query.fullname,
    });
  } catch (error) {
    console.log("Terjadi error di repository : " + error);
    throw error;
  }
}

async function FindByUserEmail(itemField) {
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: itemField }, { email: itemField }],
      },
    });
    if (!user) {
      throw "User tidak ditemukan";
    }
    return user;
  } catch (error) {
    console.log("Terjadi error di repository : " + error);
    throw error;
  }
}

async function Login(query) {
  try {
  } catch (error) {}
}

module.exports = {
  Register,
  FindByUserEmail,
};
