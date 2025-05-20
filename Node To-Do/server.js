//Assignmnet numner 1 (a and b)const http = require("http");
const http = require("http"); 
const fs = require("fs");
const path = require("path");

const server = http.createServer(requestHandler);
const PORT = 2000;
const HOSTNAME = "localhost";
const indexPath = path.join(__dirname, "resource" ,"Assignment1.html");

console.log(`indexPath: ${indexPath}`);

//render the index.html file
function requestHandler(req, res) {
    res.setHeader("Content-Type", "text/html");
    fs.readFile(indexPath, (err, data) => {
    
    try{
        if (err) {
        res.writeHead(500);
        } else {
            if (req.url === "/index.html" && req.method === "GET") {
                res.writeHead(200);
                res.end(data);
            }
            else if (req.url === "/") {
                res.writeHead(302, { Location: "/index.html" });
                res.end(data);
                //if the url is unknown or unspecified empty, show 404
            } else {
                res.writeHead(404);
                res.end("404 Not Found");
            }
        }
    }
    catch (error)
    {
        res.writeHead(400)
        res.end(JSON.stringify({error : error.message}))
    }

    });
}
//create a server that listens on port 2000
server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});