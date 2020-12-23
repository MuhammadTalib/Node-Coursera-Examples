const express = require("express");

const dishRouter = express.Router();
const bodyParser = require("body-parser");

dishRouter.use(bodyParser.json())

dishRouter.route('/')
.all((req,res,next)=>{
    res.statusCode= 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res)=>{
    res.end('Will send all dishes here')
})
.post((req,res)=>{
    res.end("Will add the dish: "+req.body.name+" with details "+req.body.description);
})
.put((req,res)=>{
    res.end("put method not supported on /dishes");
})
.delete((req,res)=>{
    res.end("Deleting all the dishes");
})

dishRouter.route('/:dishID')
.all((req,res,next)=>{
    res.statusCode= 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res)=>{
    console.log(req.params)
    res.write("updating the dish: "+req.params.dishID+"\n")
    res.end('Will send sd dishes here: '+req.params.dishID)
})
.post((req,res)=>{
    res.statusCode = 403;
    res.end("Post Method not supported on /dished/"+req.params.dishID);
})
.put((req,res)=>{
    res.end("will update the dish with id"+req.params.dishID);
})
.delete((req,res)=>{
    res.end("will delete the dish with id"+req.params.dishID);
})
module.exports = dishRouter;