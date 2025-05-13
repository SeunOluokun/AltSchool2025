/* clothing for inventory , /cloth for get specific ID */

const fs = require('fs');
const path = require('path');
const http = require('http');
const serverFunctions = require ('./getAll');

const server = http.createServer(requestHandler);
const PORT = 3000;
const HOSTNAME = 'localhost';
const BASE_DIR = path.join(__dirname, 'resource', 'inventory.json');

function requestHandler(req, res) {
    res.setHeader('Content-Type', 'application/json');

    fs.readFile(BASE_DIR, "utf8", (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Error reading file' }));
            return;
        }

        if (req.method === 'GET' && req.url === '/clothing') {

            serverFunctions.getAll(req,res);
        }
        else if (req.method === 'PUT' && req.url === '/clothing') {
          
            serverFunctions.updateItem(req,res);  
        }
        
        else if (req.method === 'GET' && req.url === '/cloth') {
            
            serverFunctions.getItem(req,res);  
        }
        else if (req.method === 'POST' && req.url === '/clothing') {
            
            serverFunctions.addItem(req,res);  

        }
        else if (req.method === 'DELETE' && req.url === '/clothing'){

            serverFunctions.deleteItem(req,res);  
        }
    })

}

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}`);
} )
