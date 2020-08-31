const router = require("express").Router();
const mongoose = require("mongoose");

const Post = mongoose.model("Post");
const Comment = mongoose.model("Comment");

router.get("/", (req, res) => {
    res.send({
        "ok": true,
    });
});

//Add data to DB.
router.post("/:title&:content/addPost", async (req, res) => {
        try {
            const post = new Post();
            post.title = req.params.title;
            post.content = req.params.content;
            await post.save();
            res.send(post);
        } catch (error) {
            res.status(500);
        }
});

//Get all data from DB.
router.get("/getAll", async (req, res) => {
    try {
        var sort = { createdAt: -1 };
        const post = await Post.find({}).sort(sort).populate("comments");
        res.send(post);
    } catch (error) {
        res.status(500);
    }
});

//Get specific data from DB.
router.get("/getSpecific/:title", async (req, res) => {
    try {
        const post = await Post.find({
            title: {
                $regex: req.params.title
            }
        }).populate("comments");
        res.send(post);
    } catch (error) {
        res.status(500);
    }
});

//Update specific data from DB.
router.put("/updateSpecific/:title/setTo/:newTitle", async (req, res) => {
    try {
        const post = await Post.findOneAndUpdate({
            title: req.params.title
        }, { $set: {title: req.params.newTitle} }, {
            new: true,
            // runValidators: true, //It will validate post model validators where we write required is true for title and content
        });
        res.send(post);
    } catch (error) {
        res.status(500);
    }
});

//Delete specific data from DB.
router.delete("/deleteSpecific/:title", async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({
            title: req.params.title
        });
        res.send(`Deleted data with title : ${req.params.title}`);
    } catch (error) {
        res.status(500);
    }
});

//Add comments to DB.
router.post("/:postID/addComment", async (req, res) => {
    try {
        //Find th post.
        const post = await Post.findOne({
            title: req.params.postID,
        });
        //Create a comment.
        const comment = new Comment();
        comment.content = req.body.content;
        comment.post = post._id;
        await comment.save();
        //Associate post with comment.
        post.comments.push(comment._id);
        await post.save();
        res.send(comment);
    } catch (error) {
        res.status(500);
    }
});

//Read comments from DB.
router.get("/:postID/getComments", async (req, res) => {
    try {
        const post = await Post.findOne({
            title: req.params.postID,
        }).populate("comments");
        res.send(post);
    } catch (error) {
        res.status(500);
    }
});

//Read all comments from DB.
router.get("/:content/allComments", async (req, res) => {
    try {
        const comment = await Comment.find({
            content: {
                $regex: req.params.content
            }
        });
        res.send(comment);
    } catch (error) {
        res.status(500);
    }
});

//Update comments from DB.
router.put("/:commentID/updateComment", async (req, res) => {
    try {
        const comment = await Comment.findOneAndUpdate({
            _id: req.params.commentID
        }, req.body, {
            new: true
        });
        res.send(comment);
    } catch (error) {
        res.status(500);
    }
});

//Delete comments from DB.
router.delete("/:commentID/deleteComment", async (req, res) => {
    try {
        await Comment.findOneAndDelete({
            _id: req.params.commentID
        });
        res.send(`Deleted Comment with ID : ${req.params.commentID}`);
    } catch (error) {
        res.send(500);
    }
});

module.exports = router;
