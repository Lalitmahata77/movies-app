import asyncHandler from "../middleware/asyncHandler.js";
import Genre from "../models/genreModel.js";

export const createGenre = asyncHandler(async(req,res,next)=>{
    try {
        const {name} = req.body;
        if (!name) {
            return res.json({ error: "Name is required" });
          }
      
        const genre = await Genre.findOne({name})
        if (genre) {
            res.status(400)
            throw new Error("Genre already exists")
        }

        const newGenre = new Genre({name})
        await newGenre.save()
        res.json(newGenre)
    } catch (error) {
        console.log(error.message);
        
        res.status(500).json({message : "Internal server error"})
    }
})

export const updateGenre = asyncHandler(async(req,res,next)=>{
    try {
        const {name} = req.body;
    const {id} = req.params;
        const genre = await Genre.findOne({_id : id})
        if (!genre) {
            res.status(400)
            throw new Error("Genre not found")
        }
        genre.name = name
        const updatedGenre = await genre.save()
        res.json(updatedGenre)
    } catch (error) {
console.log(error.message);
res.status(500).json({message : "Internal server error"})

    }
})

export const removeGenre = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const removed = await Genre.findByIdAndDelete(id);
  
      if (!removed) {
        return res.status(404).json({ error: "Genre not found" });
      }
  
      res.json(removed);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Interval server error" });
    }
  });
  
  export const listGenres = asyncHandler(async (req, res) => {
    try {
      const all = await Genre.find({});
      res.json(all);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  });
  
 export  const readGenre = asyncHandler(async (req, res) => {
    try {
      const genre = await Genre.findOne({ _id: req.params.id });
      res.json(genre);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  });
  