import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import bookRoute from "./route/book.route.js"
import userRoute from "./route/user.route.js"
import path from "path"
import cors from "cors"

const app = express()

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI= process.env.mongoDBURI

//connect to mongoDB
try {
    mongoose.connect(URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("Connected to MongoDB")
} catch (error) {
    console.log("Error :",error)
}
//Defining Routes
app.use("/book",bookRoute)
app.use("/user",userRoute)

//Deployment

if(process.env.NODE_ENV==="production"){
    const dirpath = path.resolve();
    console.log(dirpath)
    app.use(express.static("Frontend/dist"));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(dirpath,"Frontend","dist","index.html"));
    })
}

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})