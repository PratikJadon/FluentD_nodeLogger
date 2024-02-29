import express from "express";
import postController from "../Controller/postsController.js";
const postRouter = express.Router();

// postRouter.get("/:postsID",postController.getPostByID(req,res));
postRouter.get("/",(req,res)=> postController.getAllPost(req,res));
postRouter.post("/",(req,res) => postController.addPost(req,res));

export default postRouter;