import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import express from "express"
import path from "path"
import dbConnect from "./config/dbConnect.js"
dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

import userRoute from "./routes/userRoute.js"
import genreRoute from "./routes/genreRoute.js"
import movieRoute from "./routes/movieRoute.js"
import uploadRoutes from "./routes/uploadRoutes.js"
app.use("/api/v2", userRoute)
app.use("/api/v2/genre",genreRoute)
app.use("/api/v2/movies",movieRoute)
app.use("/api/v1/upload", uploadRoutes);


const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));
app.listen(PORT, ()=>{
    dbConnect()
    console.log(`server is listening on PORT : ${PORT}`);
    
})