import tokenListModel from "../Models/tokenListModel.js";
import logger from "../utils/logger.js";

export default class tokenListFunction {
  constructor() {
    this.tokenListModel = tokenListModel;
  }
  async removeToken(userToken) {
    try {
      return (await tokenListModel.findOneAndDelete({ token: userToken })) ==
        null
        ? false
        : true;
    } catch (error) {
      logger.error("Failed to remove Token\n" + error);
      console.log("Failed to remove Token\n" + error);
      return false;
    }
  }
  async addToken(userToken) {
    try {
      await tokenListModel.create({ token: userToken });
    } catch (error) {
      console.log("Failed to addTOken\n" + error);
    }
  }
}
