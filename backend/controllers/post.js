const Post = require('../models/post');

// Messages array to store messages in-memory
let messages = [];

/**
 * 
 * @param {*} allPosts - returns a database of all posts
 */
exports.getAllPosts = (req, res, next) => {
    Post.findAll({
        order: [
            ['read', 'ASC'],
            ['createdAt', 'DESC']]
    })
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to get all posts' });
        });
};

/**
* 
* @param {*} createPost - allows user to create a post
*/
exports.createPost = (req, res, next) => {
    if (!req.auth || !req.auth.userId) {
        return res.status(401).json({ error: 'Unauthorized access' });
    }

    const { userId, title, message } = JSON.parse(req.body.post);
    const post = new Post({
        userId: userId,
        title: title,
        message: message,
        multimediaUrl: req.file ? `${req.protocol}://${req.get('host')}/multimedia/${req.file.filename}` : null,
    });

    post.save()
        .then(savedPost => {
            res.status(201).json({ message: 'Post saved successfully!', post: savedPost });
        })
        .catch((error) => {
            console.error(error);
            res.status(400).json({ error: 'Failed to add Post' });
        });
};


/**
* 
* @param {*} onePost - returns a single post
*/
exports.getOnePost = (req, res, next) => {
    const postId = req.params.id;
    Post.findOne({ where: { id: postId } })
        .then(post => {
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }
            res.status(200).json(post);
        })
        .catch(error => {
            console.error('Error retrieving post:', error);
            res.status(500).json({ error: 'Failed to retrieve post' });
        });
};

/**
 * 
 * @param {*} mark post as read
 */
exports.readPost = async (req, res, next) => {
    const postId = req.params.id;

    try {
        const result = await Post.update({ read: true }, { where: { id: postId } });

        if (result[0] === 0) {
            // No rows were updated, meaning the post ID might be incorrect
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json({ message: 'Post marked as read' });
    } catch (error) {
        console.error('Failed to mark post as read:', error);
        res.status(500).json({ error: 'Failed to mark post as read' });
    }
};

/**
 * Get all messages
 */
exports.getAllMessages = (req, res) => {
    res.json(messages);
};

/**
 * Create a new message
 */
exports.createMessage = (req, res) => {
    const message = req.body;
    messages.push(message);
    res.status(201).json(message);
};
