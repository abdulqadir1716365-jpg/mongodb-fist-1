import express from "express";

import {
    register,
    login,
    profile
} from "../controler/userCont.js";

import authMiddleware from "../madlewhare/midlewher.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/profile", authMiddleware, profile);

export default router;
