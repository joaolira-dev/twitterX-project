import { Router } from "express";
import * as authController from "../controllers/authController";
import * as auth from "../middlewares/auth";
import * as tweetController from "../controllers/tweetController"

export const router = Router();

router.post("/auth/signup", authController.signup);
router.post("/auth/signin", authController.signin)


router.post("/tweet", auth.privateRoute, tweetController.postTweet)
router.get("/tweet/:id", auth.privateRoute, tweetController.getTweet)
router.get("/tweet/:id/answers", auth.privateRoute, tweetController.getAnswers)
router.post("/tweet/:id/like", auth.privateRoute, tweetController.likeToggle)

// router.get("/user/:nickname")
// router.get("/user/:nickname/tweets")
// router.post("/user/:nickname/follow")
// router.put("/user")
// router.put("/user/avatar")
// router.put("/user/cover")

// router.get("/feed")
// router.get("/search")
// router.get("/trending")
// router.get("/suggestion")
