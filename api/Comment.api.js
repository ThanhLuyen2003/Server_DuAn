var md = require('../models/model');

exports.getComment = async (req, res, next) => {
    try {
        const idPosts = req.params.idPosts;

        if (!idPosts) {
            return res.status(400).json({ message: 'Invalid post ID' });
        }

        const comments = await md.CommentModel.find({ idPosts }).sort({ _id: -1 });

        if (comments) {
            res.status(200).json(comments);
        } else {
            res.status(204).json({
                msg: 'khong co du lieu',

            });
        }
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
};



exports.addComment =async(req,res,next)=>{
    try {
        const { idUser, idPosts } = req.params;
        const { Comment,avatarUser,nameUser } = req.body;

        const newComment = new md.CommentModel({
            Comment,
            avatarUser,
            idUser,
            idPosts, // Assuming idPosts refers to idProductSalon
            nameUser
        });

        // Save the new comment   
await newComment.save();

        res.status(200).json({ message: 'Comment added successfully' });
    } catch (err) {
        
       
return res.status(500).json({ message: err.message });
    }
};


