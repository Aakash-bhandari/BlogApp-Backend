import post from "../model/post.js"

export const createPost = async (req, res) => {
    try {
        const Post = await new post(req.body);
        Post.save();

        return res.status(200).json('Post saved successfully');
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const getAllPosts = async (req, res) => {
    let username = req.query.username;
    let category = req.query.category;
    let posts;
    try {
        if (username)
            posts = await post.find({ username: username });
        if (category)
            posts = await post.find({ categories: category });
        else
            posts = await post.find({});
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ msg: error.msg })
    }
}

export const getpost = async (req, res) => {
    try {
        const postt = await post.findById(req.params.id);
       return res.status(200).json(postt);
    } catch (error) {
       return res.status(500).json(error);
    }
}

export const updatepost = async (request, response) => {
    try {
        const postt = await post.findById(request.params.id);

        if (!postt) {
            return response.status(404).json({ msg: 'Post not found' })
        }

        await post.findByIdAndUpdate(request.params.id, { $set: request.body })

        return response.status(200).json('post updated successfully');
    } catch (error) {
        return response.status(500).json(error);
    }
}

export const deletePost = async (request, response) => {
    try {
        const postt = await post.findById(request.params.id);
        await postt.delete()

        return response.status(200).json('post deleted successfully');
    } catch (error) {
        return response.status(500).json(error)
    }
}

export const getmyposts = async (request, response) => {
    // console.log(request.body.username);
    const {username} = request.body
    try {
        const posts = await post.find({ username: username });
        // await postt.delete()
        //console.log(posts);
        return response.status(200).json(posts);
    } catch (error) {
        return response.status(500).json({ msg: "Failed to Load the blogs" })
    }
}


