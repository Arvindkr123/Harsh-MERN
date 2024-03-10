import { Router } from "express";
import { userRegisterController, getUserController } from "../controllers/user.controllers.js";
import { upload } from "../multer_config/multer.js";
const router = Router();

router
  .route("/register")
  .post(upload.single("user_profile"), userRegisterController);

router.route("/details").get(getUserController);

export default router;
