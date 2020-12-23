const express = require("express");

const leaderRouter = express.Router();
const bodyParser = require("body-parser");

leaderRouter.use(bodyParser.json())

leaderRouter.route('/')
.all((req,res,next)=>{
    res.statusCode= 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res)=>{
    res.end('Will send all leaders here')
})
.post((req,res)=>{
    res.end("Will add the leader: "+req.body.name+" with details "+req.body.description);
})
.put((req,res)=>{
    res.end("put method not supported on /leaders");
})
.delete((req,res)=>{
    res.end("Deleting all the leaders");
})

leaderRouter.route('/:leaderID')
.all((req,res,next)=>{
    res.statusCode= 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res)=>{
    console.log(req.params)
    res.write("updating the leader: "+req.params.leaderID+"\n")
    res.end('Will send sd leaders here: '+req.params.leaderID)
})
.post((req,res)=>{
    res.statusCode = 403;
    res.end("Post Method not supported on /leadered/"+req.params.leaderID);
})
.put((req,res)=>{
    res.end("will update the leader with id"+req.params.leaderID);
})
.delete((req,res)=>{
    res.end("will delete the leader with id"+req.params.leaderID);
})
module.exports = leaderRouter;