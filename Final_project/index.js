const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const { Sequelize, DataTypes } = require('sequelize'); // ORM
const _ = require('underscore');
const PORT = process.env.PORT || 3000;

// setup sequelize
// make sure your database 'fullstackapp' is already created and mysql is running
const sequelize = new Sequelize('drk33r5e7qrpf', 'rabmmcvdszccrh', '2f775bb921035d31725042144513d0a69a13770eafc52046cb7a59c66f98d848', {
    host: 'ec2-54-165-184-219.compute-1.amazonaws.com',
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});
// h
// define a sequelize object which maps to a SQL table
const Post = sequelize.define('movies', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    movie_name: DataTypes.STRING,
    movie_year: DataTypes.INTEGER,
    movie_rating: DataTypes.FLOAT,
    movie_review: DataTypes.TEXT,
    movie_director: DataTypes.STRING
}, { initialAutoIncrement: 1 ,timestamps: false});

// creates the table if it doesn't exist
(async () => {
    await sequelize.sync();
})();

// this express api is set up the same way as our express class but instead
// of updating an array we're using sequelize to update database records
const app = express();
// request parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// handlebars middleware
// config added to fix a handlebars issue with sequelize objects
app.engine('handlebars', engine({ runtimeOptions: { allowProtoPropertiesByDefault: true }}));
app.set('view engine', 'handlebars');
app.set('views', './views');
// host static files, exposes our css
app.use(express.static(path.join(__dirname, 'public')));

// home page
app.get('/', async (req, res) => {
    const posts = await Post.findAll();
    res.render('index', {
        data: posts
    });
});

// post create endpoint that redirects to home page
app.post('/post', async (req, res) => {
    if (!req.body.movie_name || !req.body.movie_year || !req.body.movie_rating || !req.body.movie_review || !req.body.movie_director) {
        if (!req.body.movie_name) {
            return res.status(400).json( { message: "movie_name is bad" });
        } else if (!req.body.movie_year) {
            return res.status(400).json( { message: "movie_year is bad" });
        } else if (!req.body.movie_rating) {
            return res.status(400).json( { message: "movie_rating is bad" });
        } else if (!req.body.movie_review) {
            return res.status(400).json( { message: "movie_review is bad" });
        } else if (!req.body.movie_director) {
            return res.status(400).json( { message: "movie_director is bad" });
        } else {
            return res.status(400).json( { message: "bad request" });
        }
    }
    await Post.create({
        movie_name:   req.body.movie_name,
        movie_year: req.body.movie_year,
        movie_rating:   req.body.movie_rating,
        movie_review:    req.body.movie_review,
        movie_director:    req.body.movie_director
    });
    res.redirect('/');
});

// individual post page
app.get('/post/:id', async (req, res) => {
    const postId = parseInt(req.params.id);
    const post = await Post.findByPk(postId);
    if (post != null) {
        res.render('post', {
            post: post
        });
    } else {
        res.render('404');
    }
});





// API get all posts
app.get('/api/posts', async (req, res) => {
    const posts = await Post.findAll();
    res.json(posts);
});

// API search endpoint
app.get('/api/posts/search/:movie_name', async (req, res) => {
    const postmovie_name = req.params.movie_name;
    const posts = await Post.findAll();
    const filteredPosts = posts.filter(post => {
        return post.movie_name.toLowerCase().includes(postmovie_name.toLowerCase());
    });
    res.json(filteredPosts);
});

// API create post
app.post('/api/posts', async (req, res) => {
    if (!req.body.movie_name || !req.body.movie_year || !req.body.movie_rating || !req.body.movie_review || !req.body.movie_director) {
        if (!req.body.movie_name) {
            return res.status(400).json( { message: "movie_name is bad" });
        } else if (!req.body.movie_year) {
            return res.status(400).json( { message: "movie_year is bad" });
        } else if (!req.body.movie_rating) {
            return res.status(400).json( { message: "movie_rating is bad" });
        } else if (!req.body.movie_review) {
            return res.status(400).json( { message: "movie_review is bad" });
        } else if (!req.body.movie_director) {
            return res.status(400).json( { message: "movie_director is bad" });
        } else {
            return res.status(400).json( { message: "bad request" });
        }
    }
    const newPost = await Post.create({
        movie_name:   req.body.movie_name,
        movie_year: req.body.movie_year,
        movie_rating:   req.body.movie_rating,
        movie_review:    req.body.movie_review,
        movie_director:    req.body.movie_director
    });
    res.json(newPost);
});

// API update post by id
app.put('/api/posts/:id', async (req, res) => {
    const postId = parseInt(req.params.id);
    // const post = await Post.findOne({ where: { id: postId } });
    const post = await Post.findByPk(postId);
    if (post != null) {
        if (req.body.movie_name) {
            post.movie_name = req.body.movie_name;
        }
        if (req.body.body) {
            post.body = req.body.body;
        }
        await post.save();

        res.json(post);
    } else {
        res.status(404).json({ message: "not found" });
    }
});

// API delete post by id
app.delete('/api/posts/:id', async (req, res) => {
    const postId = parseInt(req.params.id);
    const post = await Post.findByPk(postId);
    if (post != null) {
        await post.destroy();

        res.json({ message: "post deleted" });
    } else {
        res.status(404).json({ message: "not found" });
    }
});

app.get('/page1', async (req, res) => {
    const posts = await Post.findAll();
    const bestRating = []
    _.each(posts, entry => {
        if (entry.movie_rating >= 9) {
            console.log(entry.movie_name);
            bestRating.push(entry);
        }
    });
    res.render('page_1', {
        data: bestRating
    });
});
app.get('/page2', async (req, res) => {
    const posts = await Post.findAll();
    const worstRating = []
    _.each(posts, entry => {
        if (entry.movie_rating <= 8.6) {
            console.log(entry.movie_name);
            worstRating.push(entry);
        }
    });
    res.render('page_2', {
        data: worstRating
    });
});

app.get('/page3', async (req, res) => {
    const posts = await Post.findAll();
    res.render('page_3', {
        data: posts
    });
});

app.get('/page4', async (req, res) => {
    const posts = await Post.findAll();
    res.render('page_4', {
        data: posts
    });
});

app.get('/page5', async (req, res) => {
    const posts = await Post.findAll();
    res.render('page_5', {
        data: posts
    });;
});


app.listen(PORT, () => console.log('server listening on port ' + PORT));
