import { Router } from "express";
import * as authController from "../controllers/authController";
import * as auth from "../middlewares/auth";
import * as tweetController from "../controllers/tweetController"
import * as userController from "../controllers/userController"

export const router = Router();

router.post("/auth/signup", authController.signup);
router.post("/auth/signin", authController.signin)


router.post("/tweet", auth.privateRoute, tweetController.postTweet)
router.get("/tweet/:id", auth.privateRoute, tweetController.getTweet)
router.get("/tweet/:id/answers", auth.privateRoute, tweetController.getAnswers)
router.post("/tweet/:id/like", auth.privateRoute, tweetController.likeToggle)

router.get("/user/:username", auth.privateRoute, userController.getUser)
router.get("/user/:username/tweets", auth.privateRoute, userController.getUserTweets)
// router.post("/user/:username/follow")
// router.put("/user")
// router.put("/user/avatar")
// router.put("/user/cover")

// router.get("/feed")
// router.get("/search")
// router.get("/trending")
// router.get("/suggestion")
