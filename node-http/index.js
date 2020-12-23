const { resolveSoa } = require("dns");
const http = require("http");
const fs = require("fs");
const path = require("path");
const hostname = 'localhost';
const port = 3000;

const { PDFNet } = require("@pdftron/pdfnet-node")


const server = http.createServer((req,res)=>{
    console.log("Request for "+req.url +" by method "+req.method);
    if(req.method== 'GET'){
        var fileUrl;
        if(req.url =='/') fileUrl = '/index.html';
        else fileUrl = req.url+".html";

        var filePath = path.resolve('./public'+fileUrl);
        console.log("filePath",filePath)
        const fileExt = path.extname(filePath);
        if(fileExt == '.html'){
            fs.exists(filePath,(exists)=>{
                console.log("exists",exists)
                if(!exists){
                    
                    res.statusCode = 404;
                    res.setHeader('Content-Type',"text/html")
                    res.end("<html><body><h1>Error 404: "+fileUrl+" not found</h1></body></html>")
                    return;
                }else{
                    // const filename = "NestJS.docx";
                    // const inputPath = path.resolve(__dirname,`./files/${filename}`)
                    // const outputPath = path.resolve(__dirname,`./files/${filename}.pdf`)

                    // const convertToPDF = async () =>{
                    //     const pdfdoc = await PDFNet.PDFDoc.create();
                    //     await pdfdoc.initSecurityHandler();
                    //     await PDFNet.Convert.toPdf(pdfdoc,inputPath);
                    //     pdfdoc.save(outputPath, PDFNet.SDFDoc.SaveOptions.e_linearized);
                    // }

                    // PDFNet.runWithCleanup(convertToPDF).then(()=>{
                    //     fs.readFile(outputPath, (err,data)=>{
                    //         if(err){
                    //             res.statusCode = 500;
                    //             res.end(err)
                    //         }else{
                    //             res.setHeader('Content-Type',"text/html")
                    //             res.end(data) 
                    //         }
                    //     })
                    // }).catch((err)=>{
                    //     res.statusCode = 404;
                    //     res.setHeader('Content-Type',"text/html")
                    //     res.end("<html><body><h1>Error 404: "+fileUrl+" not found</h1></body></html>")
                    //     return;
                    // })

                    res.statusCode = 200;
                    res.setHeader('Content-Type',"text/html")
                    fs.createReadStream(filePath).pipe(res)
                    return;
                }
            })
        }else{
            res.statusCode = 404;
            res.setHeader('Content-Type',"text/html")
            res.end("<html><body><h1>Error 404: "+fileUrl+" not a HTML file</h1></body></html>")
            return;
        }

    }else{
        res.statusCode = 404;
        res.setHeader('Content-Type',"text/html")
        res.end("<html><body><h1>Error 404: "+req.method+" not supported</h1></body></html>")
        return;
    }
})

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`)
})