//handle simple html file without links to css styling and images
/*const http = require('http');
const fs = require('fs');

function onRequest(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('./index.html', null, function(error, data) {
        if(error){
            response.writeHead(404);
            response.write('File not found!');
        }else{
            response.write(data);
        }
        response.end()
    });
}

http.createServer(onRequest).listen(3000);*/

//handle htlm file with links to css styling and images 
const http = require('http');
const fs = require('fs');
const path = require('path');

//console.log('Server running on port 3000...');

http.createServer(function(req, res){
    //load html file
    if(req.url === "/"){
        fs.readFile("./index.html", "UTF-8", function(err, html){
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(html);
        });
    //load css files
    }else if(req.url.match("\.css$")){
        let cssPath = path.join(__dirname, req.url);
        let fileStream = fs.createReadStream(cssPath, "UTF-8");
        res.writeHead(200, {"Content-Type": "text/css"});
        fileStream.pipe(res);
    //load images in .png format
    }else if(req.url.match("\.png$")){
        let imagePath = path.join(__dirname, req.url);
        let fileStream = fs.createReadStream(imagePath);
        res.writeHead(200, {"Content-Type": "image/png"});
        fileStream.pipe(res);
    //load images in .jpg format
    }else if(req.url.match("\.jpg$")){
        let imagePath = path.join(__dirname, req.url);
        let fileStream = fs.createReadStream(imagePath);
        res.writeHead(200, {"Content-Type": "image/jpg"});
        fileStream.pipe(res);
    //load images in .jpeg format
    }else if(req.url.match("\.jpeg$")){
        let imagePath = path.join(__dirname, req.url);
        let fileStream = fs.createReadStream(imagePath);
        res.writeHead(200, {"Content-Type": "image/jpeg"});
        fileStream.pipe(res);
    //show error if the page is not found
    }else{
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end("Page Not Found!");
    }

}).listen(3000); 

/* type 'node server.js' (or 'nodemon sever.js') in terminal to start the node server
   and on the broswer, visit the link 'localhost:3000' to access the page/site */
