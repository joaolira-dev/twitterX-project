import { Router } from "express";
import * as authController from "../controllers/authController";
import * as auth from "../middlewares/auth";
import { privatePing } from "../controllers/privatePing";

export const router = Router();

router.post("/auth/signup", authController.signup);
router.post("/auth/signin", authController.signin)
router.post("/auth/private", auth.privateRoute, privatePing)

// router.post("/tweet")
// router.get("/tweet/:id")
// router.get("/tweet/:id/answers")
// router.post("/tweet/:id/like")

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
