import asyncHandler from "../middleware/asyncHandler.js";
import Movie from "../models/moviesModel.js";

export const createMovie = asyncHandler(async(req,res,next)=>{
    try {
        const movie = new Movie(req.body);
        await movie.save()
        res.json(movie)
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message)
        
    }
})

export const getAllMovies = asyncHandler(async(req,res,next)=>{
    try {
 const movies = await Movie.find()
 res.json(movies)
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message)
        
    }
})

export const getSpecificMovie = asyncHandler(async(req,res,next)=>{
    try {
        const movie = await Movie.findById(req.params.id)
        
        if (!movie) {
            return res.status(400).json({message : "Movie not found"})
        }
        res.json(movie)
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message)
        
    }
})

export const updateMovie = asyncHandler(async(req,res,next)=>{
   try {
     const {id} = req.params;
     const movie = await Movie.findByIdAndUpdate(id,req.body,{new : true})
     if (!movie) {
        return res.status(400).json({message : "Movie not found"})
     }
     res.json(movie)
   } catch (error) {
console.log(error);
res.status(500).json(error.message)

   }

})

export const movieReview = asyncHandler(async(req,res,next)=>{
    try {
        const {rating, comment} = req.body;
        const movie = await Movie.findById(req.params.id)
        if (movie) {
            const movieAlreadyReviewed = movie.reviews.find((r)=>r.user.toString() === r.user._id.toString())
            if (movieAlreadyReviewed) {
                res.status(400)
                throw new Error("Movie already reviewed")
            }

            const review = {
                name : req.user.username,
                rating : Number(rating),
                comment,
                user : req.user._id
            }
            movie.reviews.push(review)
            movie.numReviews = movie.reviews.length

            movie.rating = movie.reviews.reduce((acc,item)=>item.rating + acc, 0) / movie.reviews.length
            await movie.save()
            res.status(201).json({message : "Review added"})
        }else{
            res.json({error : "Movie not found"})
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message)
        
    }
})




export const deleteMovie = async (req, res) => {
    try {
      const { id } = req.params;
      const deleteMovie = await Movie.findByIdAndDelete(id);
  
      if (!deleteMovie) {
        return res.status(404).json({ message: "Movie not found" });
      }
  
      res.json({ message: "Movie Deleted Successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
 export const deleteComment = async (req, res) => {
    try {
      const { movieId, reviewId } = req.body;
      const movie = await Movie.findById(movieId);
  
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }
  
      const reviewIndex = movie.reviews.findIndex(
        (r) => r._id.toString() === reviewId
      );
  
      if (reviewIndex === -1) {
        return res.status(404).json({ message: "Comment not found" });
      }
  
      movie.reviews.splice(reviewIndex, 1);
      movie.numReviews = movie.reviews.length;
      movie.rating =
        movie.reviews.length > 0
          ? movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
            movie.reviews.length
          : 0;
  
      await movie.save();
      res.json({ message: "Comment Deleted Successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  
export const getNewMovies = async (req, res) => {
    try {
      const newMovies = await Movie.find().sort({ createdAt: -1 }).limit(10);
      res.json(newMovies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
 export const getTopMovies = async (req, res) => {
    try {
      const topRatedMovies = await Movie.find()
        .sort({ numReviews: -1 })
        .limit(10);
      res.json(topRatedMovies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
export const getRandomMovies = async (req, res) => {
    try {
      const randomMovies = await Movie.aggregate([{ $sample: { size: 10 } }]);
      res.json(randomMovies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  