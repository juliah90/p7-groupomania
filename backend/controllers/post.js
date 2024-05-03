const Post = require('../models/post');

/**
 * 
 * @param {*} allPosts - returns a database of all posts
 */
exports.getAllPosts = (req, res, next) => {
    Post.findAll()
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
        return res.status(401).json({ error: 'Unauthorized access' });//user must be logged in to post
    }

    const { userId, name } = req.body.post;

    const post = new Post({
        userId: userId,
        title: name,
        message: message,
        multimedia: multimedia,
        multimediaUrl: multimediaUrl,
    });

    post.save()
        .then(() => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(400).json({
                error: 'Failed to add Post'
            });
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
            res.status(200).json(post); // Return the found post
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
exports.readPost = (req, res, next) => {
    const postId = req.params.id;

    Post.findOne({ where: { id: postId } })
        .then(post => {
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }

            post.read = true;//update read status

            post.save()//save the post
                .then(() => {
                    res.status(200).json({ message: 'Post marked as read' });
                })
                .catch(error => {
                    res.status(500).json({ error: 'Failed to mark post as read' });
                });
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to find post' });
        });
};
