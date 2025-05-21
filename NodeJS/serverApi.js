const fs = require('fs');
const path = require('path');
const http = require('http');
const serverFunctions = require ('./apiModules');

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

        if (req.method === 'GET' && req.url === '/items') {

            serverFunctions.getAll(req,res);
        }
        else if (req.method === 'PUT' && req.url === '/items') {
          
            serverFunctions.updateItem(req,res);  
        }
        
        else if (req.method === 'GET' && req.url === '/items') {
            
            serverFunctions.getItem(req,res);  
        }
        else if (req.method === 'POST' && req.url === '/items') {
            
            serverFunctions.addItem(req,res);  

        }
        else if (req.method === 'DELETE' && req.url === '/items'){

            serverFunctions.deleteItem(req,res);  
        }
    })

}

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}`);
} )