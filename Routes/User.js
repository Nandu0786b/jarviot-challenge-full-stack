import express from "express";
import {login} from "../Controller/UserProfile.js"
import {register} from "../Controller/UserProfile.js"

const router=express.Router();

router.post("/register",register);
router.post("/login",login);


export default router;