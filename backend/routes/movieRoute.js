import express from "express"
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js"
import { createMovie, deleteComment, deleteMovie, getAllMovies, getNewMovies, getRandomMovies, getSpecificMovie, getTopMovies, movieReview, updateMovie } from "../controller/movieController.js"
import checkId from "../middleware/checkId.js"

const router = express.Router()

router.route("/").post(authenticate,authorizeAdmin,createMovie)
router.route("/allMovies").get(getAllMovies)
router.route("/specific-movie/:id").get(getSpecificMovie)
router.route("/new-movies").get(getNewMovies)
router.route("/top-movies").get(getTopMovies)
router.route("/random-movies").get(getRandomMovies)

router.route("/:id/reviews").post(authenticate,checkId,movieReview)


router.route("/update-movie/:id").put(authenticate,authorizeAdmin,updateMovie)
router.route("/delete-movie/:id").delete(authenticate,authorizeAdmin,deleteMovie)
router.route("/delete-comment").delete(authenticate,authorizeAdmin,deleteComment)
export default router