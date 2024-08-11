const http = require('http');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors());

const server = http.createServer();

const optionsSquareColor = ['blue', 'green', 'orange'];
const optionsSquareSize = ['small', 'large'];
const optionsDot = [true, false];

const getSquaresKakeData = () => {
    let squaresFakeData = [];
    for (let i = 1; i <= 21; i++) {
        squaresFakeData.push({
            id: i,
            color: optionsSquareColor[Math.floor(Math.random() * optionsSquareColor.length)],
            size: optionsSquareSize[Math.floor(Math.random() * optionsSquareSize.length)],
            dot: Math.random() < 0.5,
        })
    }
    return squaresFakeData;
}

/* MIDDLEWARE */
server.prependListener('request', (req, res) => {
    //executed before any other listener
    console.log(`Incoming ${req.method} request for ${req.url}`);

    res.setHeader('Access-Control-Allow-Credentials', 'true');
    if (req.headers.origin && ['http://localhost:3000'].includes(req.headers.origin)) {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    }
})

/* REQUESTS */
server.on('request', (req, res) => {
    console.log(req.message, "\n", req.error);

    if (req.url === '/squares') {
        if (req.method === 'GET') {
            res.statusCode = 200;
            const returnObj = getSquaresKakeData();
            res.end(JSON.stringify(returnObj));
        } else {
            res.statusCode = 405;
            res.end("Method Not Allowed");
        }
    } else {
        res.statusCode = 404;
        res.end("Page Not Found!");
    }
});

server.listen(8080, () => {
    console.log("Server is up and running on port 8080");
});
