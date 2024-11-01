import express from "express"
import { createUser, getAllUsers, getCurrentUserProfile, loginUser, logoutUser, updateCurrentUserProfile } from "../controller/userController.js"
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route("/").post(createUser)
.get(authenticate,authorizeAdmin,getAllUsers)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

export default router