import { Router } from "express";
import { registerUser, authUser } from "../controller/user.controller";

const router = Router();

router.post("/", registerUser);
router.post("/login", authUser);

export default router;
