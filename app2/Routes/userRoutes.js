import express from "express";
const router = express.Router();
import userController from "../Controller/userController.js";

const user = new userController();

router.post("/signup", (req, res) => user.signUP(req, res));
router.post("/signin", (req, res) => user.signIn(req, res));
router.post("/logout", (req, res) => user.logout(req, res));

//Users Details Route

router.get("/get-details/:userId",(req,res) => user.getDetails(req,res));
router.get("/get-details", (req,res) => user.getAllDetails(req,res));
router.post("/update-details/:userId", (req,res) => user.updateUser(req,res));


export default router;
