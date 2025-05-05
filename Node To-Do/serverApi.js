const fs = require('fs');
const path = require('path');
const http = require('http');

const server = http.createServer(requestHandler);
const PORT = 3000;
const HOSTNAME = 'localhost';
const BASE_DIR = path.join(__dirname, 'resource', 'inventory.json');

function requestHandler(req, res) {
    res.setHeader('Content-Type', 'application/json');
    fs.readFile(BASE_DIR, "utf8", (err, data) => {//GET ALL BOOKS MODULE START
        if (err) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Error reading file' }));
            return;
        }

        const inventory = JSON.parse(data);
        if (req.method === 'GET' && req.url === '/list') {
            res.writeHead(200);
            res.end(JSON.stringify(inventory));//END
        }
        else if (req.method === 'PUT' && req.url === '/update') {//UPDATE BOOK MODULE START
            const body = [];
            req.on('data',(chunk) => {body.push(chunk);} );

            //steps to update existing inventory id
            //1.get all data from request
            //2.client will send request in json format with id for update and value that needs updated eg size
            //3. new json key/value will be stored in var and overwrite current inventory based on id match
            //4. Updated inventory is then saved/pushed and printed
            
            req.on('end', () => {
                const alteredBook = Buffer.concat(body).toString();
                console.log(typeof(alteredBook));// STRING , SO I NEED TO CONVERT TO JSON TO ACCESS ARRAY VALUE

                const alteredBookJSON = JSON.parse(alteredBook);
                console.log(typeof(alteredBookJSON));// OBJECT , Now lets use array Functions on this data

                console.log(alteredBookJSON.id);// visible now
                const idToUpd = alteredBookJSON.id;


               fs.readFile(BASE_DIR, "utf8", (err, data) => {
                if (err){
                    res.writeHead(500);
                    res.end(JSON.stringify({error: "Error fetching inventory data for update" }) );
                    return;
                }
                const inventory = JSON.parse(data);
                console.log(typeof(inventory));//already an array so can check if usser provided id exists in inventory db
                //const currInventory = JSON.stringify(inventory);

                const inventoryIndex = inventory.findIndex(find => find.id === idToUpd);//0
                if (inventoryIndex === -1){//if not found
                    res.writeHead(400);
                    res.end("Inventory ID Provided does not exist within database")
                }

                const mergedUpdatedGoodsToDb = {...inventory[inventoryIndex], ...alteredBookJSON};//if same key value, new array noww having key value of last presenting json key value pair
                console.log(mergedUpdatedGoodsToDb);//this is the new object that will be pushed to db. now assign to inventory index tha was changed
                inventory[inventoryIndex] = mergedUpdatedGoodsToDb;//overwrite the inventory index with the new object
                console.log(inventory);//this is the new inventory with updated object

                //now we need to write the new inventory to the file to save the changes
                    fs.writeFile(BASE_DIR, JSON.stringify(inventory), (err) => {
                        if (err) {
                            res.writeHead(500);
                            res.end(JSON.stringify({ error: 'Error writing to file' }));
                            return;
                        }
                        res.writeHead(200);
                        res.end(JSON.stringify(inventory));
                    })
               })


            })
        }
    })

}

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}`);
} )
