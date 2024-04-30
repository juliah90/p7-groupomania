const Post = require('../models/post');

/**
 * 
 * @param {*} allPosts - returns a database of all posts
 */
exports.getAllPosts = (req, res, next) => {
    Post.findAll().then(
        (posts) => {
            res.status(200).json(posts);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: 'Failed to get all posts'
            });
        }
    );
};

/**
* 
* @param {*} createPost - allows user to create a post
*/
exports.createPost = (req, res, next) => {
    req.body.post = JSON.parse(req.body.post);
    try {
        validateUser(req.auth.userId, req.body.post.userId);
    } catch (error) {
        return res.status(400).json({ error: 'Failed to create post' });
    }
    const url = req.protocol + '://' + req.get('host');
    const post = new Post({
        userId: req.body.post.userId,
        name: req.body.post.name,


    });
    post.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }
    ).catch(
        (error) => {
            console.log(error);
            res.status(400).json({
                error: 'Failed to add Post'
            });
        }
    );
};
//TODO DONT FORGET WHERE!!!!!
/**
* 
* @param {*} onePost - returns a single post
*/
exports.getOnePost = (req, res, next) => {
    Post.findOne({
        id: req.params.id
    }).then(
        (post) => {
            res.status(200).json(post);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: 'Failed to get post'
            });
        }
    );
};

/**
 * 
 * @param {*} mark post as read
 */
exports.readPost = (req, res, next) => {
 post.findOne({
    id: req.params.id
 }).catch(
    (error) => {
        res.status(404).json({
            error: 'Failed to find post'
        });
    }
);
};
//TODO exports.read -4