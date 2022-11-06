import express from 'express'
import mongoose from 'mongoose'
import Post from "./Post.js";
import router from "./router.js";
import fileUpload from "express-fileupload"

const PORT = 5000;
const DB_URL = "mongodb+srv://user:user@cluster0.yaxjjog.mongodb.net/?retryWrites=true&w=majority";


const app = express();

app.use(express.json())
app.use(express.static("static"))
app.use(fileUpload({}))
app.use('/api', router)


app.post('/',  async (req, res) => {
    try {
        const {author, title, content, picture} = req.body
        const post = await Post.create({author, title, content, picture})
        res.json(post)
    } catch (e) {
        res.status(500).json(e)
    }
})

async function startApp() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log('Server started'))
    } catch (e) {
        console.log(e)
    }
}

startApp()