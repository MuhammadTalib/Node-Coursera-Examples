const express = require('express');
const http = require('http');
const bodyParser = require("body-parser")
const dishRouter = require('./routers/dishRouter');
const leaderRouter = require('./routers/leaderRouter')
const promoRouter = require('./routers/promoRouter')

const hostname="localhost";
const port = "3000"

const app = express()
app.use(bodyParser.json());
app.use('/dishes',dishRouter);
app.use('/leaders',leaderRouter);
app.use('/promotions',promoRouter);

app.use(express.static(__dirname+"/public"));

// app.use((req,res,next)=>{
//     res.statusCode = 200;
//     res.setHeader('Content-Type',"text/html");
//     res.end("<html><body><h1>This is an express server</h1></body></html>")
// })
const server = http.createServer(app)
server.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
})