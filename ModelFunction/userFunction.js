import UserModel from "../Models/userModel.js";
import logger from "../utils/logger.js";

export default class userFunction {
  constructor() {
    this.UserModel = UserModel;
  }
  async signup(name, password, email) {
    const data = { name, password, email };
    const newUser = new UserModel(data);
    await newUser.save();
    logger.info("User signup successful");
    newUser.password = undefined;
    return newUser;
  }
  async findMail(email) {
    try {
      return await UserModel.findOne({ email }).select("+password");
    } catch (err) {
      logger.warn(err);
      console.log(err);
    }
  }
  async getDetailsUser(id) {
    try {
      const result = await UserModel.findOne({ id });
      if (!result) {
        throw Error("No user with that id");
      } else {
        return result;
      }
    } catch (err) {
      logger.warn(err);
      console.error(err);
    }
  }
  async getAll() {
    try {
      const result = await UserModel.find();
      if (!result || result.length == 0) {
        return [];
      }
      return result;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
  async updateUser(name, email, userId) {
    try {
      const findUser = await this.getDetailsUser(userId);
      if (findUser) {
        findUser.name = name;
        findUser.email = email;
        await findUser.save();
      }
      return findUser;
    } catch (err) {
      logger.error("Error in updating the user: ", err);
      console.log("Error in updating the user: ", err);
    }
  }
}
