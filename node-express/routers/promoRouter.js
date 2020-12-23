const express = require("express");

const promoRouter = express.Router();
const bodyParser = require("body-parser");

promoRouter.use(bodyParser.json())

promoRouter.route('/')
.all((req,res,next)=>{
    res.statusCode= 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res)=>{
    res.end('Will send all promos here')
})
.post((req,res)=>{
    res.end("Will add the promo: "+req.body.name+" with details "+req.body.description);
})
.put((req,res)=>{
    res.end("put method not supported on /promos");
})
.delete((req,res)=>{
    res.end("Deleting all the promos");
})

promoRouter.route('/:promoID')
.all((req,res,next)=>{
    res.statusCode= 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res)=>{
    console.log(req.params)
    res.write("updating the promo: "+req.params.promoID+"\n")
    res.end('Will send sd promos here: '+req.params.promoID)
})
.post((req,res)=>{
    res.statusCode = 403;
    res.end("Post Method not supported on /promoed/"+req.params.promoID);
})
.put((req,res)=>{
    res.end("will update the promo with id"+req.params.promoID);
})
.delete((req,res)=>{
    res.end("will delete the promo with id"+req.params.promoID);
})
module.exports = promoRouter;