import { Router } from "express";
import {
  userRegisterController,
  getUserController,
  getSingleUserController,
  userEditController,
} from "../controllers/user.controllers.js";
import { upload } from "../multer_config/multer.js";
const router = Router();

router
  .route("/register")
  .post(upload.single("user_profile"), userRegisterController);

router.route("/details").get(getUserController);
router
  .route("/:id")
  .get(getSingleUserController)
  .put(upload.single("user_profile"), userEditController);

export default router;
