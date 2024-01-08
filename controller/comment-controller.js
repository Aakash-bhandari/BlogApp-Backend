import Comment from '../model/Comment.js';


export const newComment = async (request, response) => {
    try {
        const comment = await new Comment(request.body);
        comment.save();
        return response.status(200).json('Comment saved successfully');
    } catch (error) {
        return response.status(500).json(error);
    }
}


export const getComments = async (request, response) => {
    try {
        const comments = await Comment.find({ postId: request.params.id });
        return response.status(200).json(comments);
    } catch (error) {
        return response.status(500).json(error)
    }
}

export const deleteComment = async (request, response) => {
    try {
        await Comment.findByIdAndUpdate( request.params.id, { $set: {comments:"𝘛𝘩𝘪𝘴 𝘤𝘰𝘮𝘮𝘦𝘯𝘵 𝘸𝘢𝘴 𝘥𝘦𝘭𝘦𝘵𝘦𝘥"} })
        return response.status(200).json('comment deleted successfully');
    } catch (error) {
        return response.status(500).json(error)
    }
}