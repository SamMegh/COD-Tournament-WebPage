import express from "express"
import {creat} from "../controller/manager.controller.js"
import { protect,isManager } from "../middleware/middleware.js";


const manager_router =express.Router();


manager_router.post("/create",protect,isManager,creat)

export default manager_router;