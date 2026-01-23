
import { Router } from "express";

import { getHome, loginUser, logOut, getUser } from "../Controllers/userController.js";

import { postUser } from "../Controllers/userController.js";


const router = Router()

router.get("/", getHome).get("/logOut", logOut).post("/post-user", postUser).post("/login", loginUser).get("/me", getUser)

export default router;