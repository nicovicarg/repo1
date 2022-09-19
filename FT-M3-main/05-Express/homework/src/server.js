// const bodyParser = require("body-parser");
const { application } = require("express");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [

];

const server = express();
// to enable parsing of json bodies for post requests
// server.use(express.json());

// TODO: your code to handle requests

server.use(express.json());
var id = 1

server.post('/posts', (req, res) =>
{
    const { author, title, contents } = req.body;

    if (!author || !title || !contents)
    {
        res.status(STATUS_USER_ERROR).json({ error: "No se recibieron los parámetros necesarios para crear el Post" })
    }
    let newPost = {
        id: id,
        author,
        title,
        contents
    }
    posts.push(newPost);
    id++;
    res.json(newPost)

})

server.post('/posts/author/:author', (req, res) =>
{
    const { title, contents } = req.body;
    const { author } = req.params;
    if (!author || !title || !contents)
    {
        res.status(STATUS_USER_ERROR).json({ error: "No se recibieron los parámetros necesarios para crear el Post" })
    }
    let newPost2 = {
        id: id,
        author,
        title,
        contents
    }
    posts.push(newPost2);
    id++;
    res.json(newPost2)
})

server.get('/posts', (req, res) =>
{


    if (req.query.term)
    {
        let termPost = posts.filter(post => post.title.includes(req.query.term) || post.contents.includes(req.query.term));
        res.json(termPost)
    }
    else res.json(posts)

})

server.get('/posts/:author', (req, res) =>
{
    let authorPosts = posts.filter(post => post.author === req.params.author);

    if (authorPosts.length === 0)
        res.status(STATUS_USER_ERROR).json({ error: "No existe ningun post del autor indicado" })
    else
        res.json(authorPosts)
})

server.get('/posts/:author/:title', (req, res) =>
{
    let coincidencias = posts.filter(post => post.author === req.params.author && post.title === req.params.title)

    if (coincidencias.length === 0)
    {
        res.status(STATUS_USER_ERROR).json({ error: "No existe ningun post con dicho titulo y autor indicado" })
    }
    else
    {
        res.json(coincidencias)
    }
})

server.put('/posts', (req, res) =>
{
    const { id, title, contents } = req.body
    if (!id || !title || !contents)
    {
        res.status(STATUS_USER_ERROR).json({ error: "No se recibieron los parámetros necesarios para modificar el Post" })
    }
    else
    {
        const postIndex = posts.findIndex(post => post.id === id);
        if (postIndex === -1)
        {
            res.status(STATUS_USER_ERROR).json({ error: "Esta mal el id" })
        }
        else
        {
            posts[postIndex].title = title;
            posts[postIndex].contents = contents;

            res.json(posts[postIndex]);
        }
    }
})

server.delete('/posts', (req, res) =>
{

    const { id } = req.body
    const postId = posts.findIndex(post => post.id === id);
    if (postId === -1)
    {
        res.status(STATUS_USER_ERROR).json({ error: "id invalido" })
    }
    else
    {
        posts = posts.filter(post => post.id !== id)
        res.json({ success: true })
    }
})

server.delete('/author', (req, res) =>
{

    const { author } = req.body;
    if (!author)
    {
        res.status(STATUS_USER_ERROR).json({ error: "No existe el autor indicado" })
    }
    const postsAuthor = posts.filter(post => post.author === author);
    if (postsAuthor.length === 0)
    {
        res.status(STATUS_USER_ERROR).json({ error: "No existe el autor indicado" })
    }
    else
    {
        posts = posts.filter(post => post.author !== author)
        res.json(postsAuthor)
    }
})




module.exports = { posts, server };
