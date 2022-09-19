var fs = require("fs")
var http = require("http")

// Escribí acá tu servidor
http.createServer(function (req, res)
{

    switch (req.url)
    {

        case '/':
            res.writeHead(404, { 'Content-type': 'text/plain' })
            res.end('BUSCA UNA IMAGEN');
            break;


        case '/arcoiris_doge.jpg':
            res.writeHead(200, { 'Content-type': 'image/jpg' })
            var image = fs.readFileSync(__dirname + '/images/arcoiris_doge.jpg');
            res.end(image);
            break;

        case '/badboy_doge.jpg':
            res.writeHead(200, { 'Content-type': 'image/jpg' })
            var image = fs.readFileSync(__dirname + '/images/badboy_doge.jpg');
            res.end(image);
            break;

        case '/code_doge.jpg':
            res.writeHead(200, { 'Content-type': 'image/jpg' })
            var image = fs.readFileSync(__dirname + '/images/code_doge.jpg');
            res.end(image);
            break;

        case '/resaca_doge.jpg':
            res.writeHead(200, { 'Content-type': 'image/jpg' })
            var image = fs.readFileSync(__dirname + '/images/resaca_doge.jpg');
            res.end(image);
            break;

        case '/retrato_doge.jpg':
            res.writeHead(200, { 'Content-type': 'image/jpg' })
            var image = fs.readFileSync(__dirname + '/images/retrato_doge.jpg');
            res.end(image);
            break;

        case '/sexy_doge.jpg':
            res.writeHead(200, { 'Content-type': 'image/jpg' })
            var image = fs.readFileSync(__dirname + '/images/sexy_doge.jpg');
            res.end(image);
            break;


        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' })
            res.end('Esta imagen no existe\n');
            break;
    }




}).listen(1337, '127.0.0.1');