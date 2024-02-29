import { StatusCodes } from "http-status-codes";
import modelfunction from "../ModelFunction/userFunction.js";
import sendToken from "../utils/SendToken.js";
import tokenListFunction from "../ModelFunction/tokenListFunction.js";
import logger from "../utils/logger.js";

const userFunction = new modelfunction();
const tokenList = new tokenListFunction();

export class userController {
  async signUP(req, res) {
    try {
      console.log(req.body);
      const { name, email, password } = req.body;
      const result = await userFunction.signup(name, password, email);
      const token = result.getJWT();
      await tokenList.addToken(token);
      logger.info("User created.");
      return res.status(200).json({
        message: "User Created",
        UserID: result._id,
        token: token,
      });
    } catch (err) {
      console.log(err);
      return res.status(404).json({ message: "Invalid Format" });
    }
  }
  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const result = await userFunction.findMail(email);
      if (!result) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "Not Registered" });
      } else {
        const isValidPassword = await result.isValidPassword(password);
        if (!isValidPassword) {
          return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: "Incorrect Password" });
        }
        result.password = undefined;
        sendToken(result, StatusCodes.ACCEPTED, res);
      }
    } catch (err) {
      console.error(err);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Server Error" });
    }
  }
  async logout(req, res) {
    try {
      const token = req.headers.authorization;

      const result = await tokenList.removeToken(token);
      console.log(result);
      if (!result) {
        throw new Error("Invalid Token, not removed.");
      }
      res.status(StatusCodes.ACCEPTED).json({
        success: true,
        message: "Token successfully removed from list.",
      });
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
  async getDetails(req, res) {
    const userID = req.params.id;
    const result = await userFunction.getDetailsUser(userID);
    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).send("No User Found");
    } else {
      return res.status(StatusCodes.ACCEPTED).send(result);
    }
  }
  async getAllDetails(req, res) {
    const result = await userFunction.getAll();
    return res.status(StatusCodes.ACCEPTED).send(result);
  }
  async updateUser(req, res) {
    const { name, email } = req.body;
    const userId = req.params.id;
    const result = await userFunction.updateUser(name, email, userId);
    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).send("No user Found");
    } else {
      return res
        .status(StatusCodes.ACCEPTED)
        .send(result)
        .json({ message: "User Updated" });
    }
  }
}
export default userController;
