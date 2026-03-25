import app from "./src/index.js";
import db from "./src/db/db.js";
import postModel from "./src/models/post.model.js";
import multer from 'multer'
import uploadFile from "./src/services/storage.service.js";
import cors from 'cors';

app.use(cors());

db();

const upload = multer({ storage : multer.memoryStorage() })

app.post('/create-post', upload.single("image"), async (req, res) => {

    const result = await uploadFile(req.file.buffer)

    const post = await postModel.create({
        image: result.url,
        caption: req.body.caption
    })

    return res.status(201).json({
        message: "Post created successfully",
        post
    })

})

app.get('/posts', async (req, res) => {
    const posts = await postModel.find();

    return res.status(200).json({
        message: "Posts fetched successfully",
        posts
    })
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});