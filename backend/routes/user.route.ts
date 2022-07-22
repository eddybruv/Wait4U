import { Router } from "express";
import {
  registerUser,
  authUser,
  allUsers,
} from "../controller/user.controller";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.route("/").post(registerUser).get(protect, allUsers);
router.post("/login", authUser);

export default router;
