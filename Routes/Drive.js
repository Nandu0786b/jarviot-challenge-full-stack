import express from "express";
import { driveconnect } from "../Controller/Drive.js";
import { redirectToken } from "../Controller/Drive.js";
import { Revoke_drive_access } from "../Controller/Drive.js";
import { content } from "../Controller/Drive.js";



const router=express.Router();

router.get("/connect",driveconnect);
router.get("/redirect",redirectToken);
router.get("/Revoke",Revoke_drive_access);
router.get("/Content",content);



export default router;