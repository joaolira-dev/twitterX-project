import { Router } from "express";
import * as authController from "../controllers/authController";
import * as auth from "../middlewares/auth";
import * as tweetController from "../controllers/tweetController"
import * as userController from "../controllers/userController"
import * as feedController from "../controllers/feedController"
import * as searchController from "../controllers/searchController"
import * as trendController from "../controllers/trendController";

export const router = Router();

router.post("/auth/signup", authController.signup);
router.post("/auth/signin", authController.signin)


router.post("/tweet", auth.privateRoute, tweetController.postTweet)
router.get("/tweet/:id", auth.privateRoute, tweetController.getTweet)
router.get("/tweet/:id/answers", auth.privateRoute, tweetController.getAnswers)
router.post("/tweet/:id/like", auth.privateRoute, tweetController.likeToggle)

router.get("/user/:slug", auth.privateRoute, userController.getUser)
router.get("/user/:slug/tweets", auth.privateRoute, userController.getUserTweets)
router.post("/user/:slug/follow", auth.privateRoute, userController.followToggle)
router.put("/user", auth.privateRoute, userController.editUser)
// router.put("/user/avatar")
// router.put("/user/cover")

router.get("/feed", auth.privateRoute, feedController.getFeed)
router.get("/search", auth.privateRoute, searchController.searchTweets)
router.get("/trending", auth.privateRoute, trendController.getTrending)
// router.get("/suggestion")
