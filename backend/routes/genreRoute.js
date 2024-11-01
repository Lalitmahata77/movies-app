import express from "express"
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js"
import { createGenre, listGenres, readGenre, removeGenre, updateGenre } from "../controller/genreController.js"
const router = express.Router()

router.route("/").post(authenticate,authorizeAdmin,createGenre)
router.route("/:id").put(authenticate,authorizeAdmin,updateGenre)
router.route("/:id").delete(authenticate, authorizeAdmin, removeGenre);
router.route("/genres").get(listGenres);
router.route("/:id").get(readGenre);



export default router