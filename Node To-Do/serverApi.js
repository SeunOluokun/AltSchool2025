const fs = require('fs');
const path = require('path');
const http = require('http');

const server = http.createServer(requestHandler);
const PORT = 3000;
const HOSTNAME = 'localhost';
const BASE_DIR = path.join(__dirname, 'resource', 'inventory.json');

function requestHandler(req, res) {
    res.setHeader('Content-Type', 'application/json');
    fs.readFile(BASE_DIR, "utf8", (err, data) => {//GET ALL GOODS MODULE START
        if (err) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Error reading file' }));
            return;
        }

        const inventory = JSON.parse(data);
        if (req.method === 'GET' && req.url === '/list') {//GET ALL GOODS MODULE
            res.writeHead(200);
            res.end(JSON.stringify(inventory));//END
        }
        else if (req.method === 'PUT' && req.url === '/update') {//UPDATE GOODS MODULE START
            const body = [];
            req.on('data',(chunk) => {body.push(chunk);} );

            //steps to update existing inventory id
            //1.get all data from request
            //2.client will send request in json format with id for update and value that needs updated eg size
            //3. new json key/value will be stored in var and overwrite current inventory based on id match
            //4. Updated inventory is then saved/pushed and printed
            
                req.on('end', () => {
                
            try 
            {
                if (body.length === 0) {
                    throw new Error(`No data provided in the request body. Please make sure to enter data of JSON Format ' "id":20 & "name": "itemName"/"price": 0.99/"size": "S/M/L" ' for Update within DB.`);
                }
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

                const inventoryIndex = inventory.findIndex((find) => find.id === idToUpd);//0
                if (inventoryIndex === -1){//if not found
                    res.writeHead(400);
                    res.end("Inventory ID Provided does not exist within database")
                }

                const mergedUpdatedGoodsToDb = {...inventory[inventoryIndex], ...alteredBookJSON};//if same key value, new array noww having key value of last presenting json key value pair
                
                console.log(mergedUpdatedGoodsToDb);//this is the new object that will be pushed to db. now assign to inventory index tha was changed
                inventory[inventoryIndex] = mergedUpdatedGoodsToDb;//overwrite the inventory index with the new object
                //console.log(inventory);//this is the new inventory with updated object

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
            }
            catch(error)
            {
                res.writeHead(400);
                res.end(JSON.stringify({error : error.message}));
            }
        })
        }
        else if (req.method === 'GET' && req.url === '/find') {//GET SPECIFIC GOODS MODULE
            /*
            1.FETCH USER INPUTED ID TO FIND SPECIFIC ITEM
            2.READ INVENTORY DB
            3.IF USER PROVIDED ID IS FOUND , DISPLAY ENTIRE ITEM TO USER
             */
            const body =[];

            req.on('data', (chunk) => {body.push(chunk);});
            
            req.on('end', ()=> //on end is where the logic goes
            {
            try
            {
                if (body.length === 0)
                {
                    throw new Error (`No data provided in the request body. Please provide data in JSON FORMAT ' "id" : 1 ' Of Inventory Item ID You wish to View`);
                }
                
                const idData = JSON.parse(body);
                const idToFetch = idData.id;//4
                //console.log(idToFetch);

                fs.readFile(BASE_DIR, "utf8", (err,data)  => {
                    if (err){
                        res.writeHead(500);
                        res.end(JSON.stringify({error:"Error encountered while reading Inventory database."}));
                        return;
                    }
                    const itemsList = JSON.parse(data);
                    const itemFoundIndex = itemsList.findIndex((item) => item.id === idToFetch )

                    if (itemFoundIndex === -1){
                        res.writeHead(500);
                        res.end(JSON.stringify({error:"Id provided by User does not exist witin inventory Database. "}));
                        return;
                    }

                    res.writeHead(200);
                    res.end(JSON.stringify(itemsList[itemFoundIndex]));
                })
            }
            catch (error)
            {
                res.writeHead(400);
                res.end(JSON.stringify({ error: error.message}));
            }
        })
        }
        else if (req.method === 'POST' && req.url === '/add') {//POST New entries to DB
            /*
            1. Get user values to insert into DB, Save to variable
            2. Read Inventory Database, And get the length of array 
            3. Array length means the max Index, So Add +1 To max Index to get ID For new additions
            4. append new entry using spread operator to new var
            5. write to file, the updated inventory data
            */
            const body = [];
            req.on('data', (chunk) => {body.push(chunk);});

            req.on('end', () => {
                try {
                    if (body.length === 0) {
                        throw new Error(`No data provided in the request body. Please make sure to enter data of JSON Format ' "name": "itemName","price": 0.99, "size": "S/M/L" ' for Insert into DB.`);
                    }

                    //     const newItem = JSON.parse(body);
                    //     console.log(newItem);

                    const newItem = JSON.parse(Buffer.concat(body).toString());
                    console.log(newItem);

                    fs.readFile(BASE_DIR, "utf8", (err, data) => {
                        if (err) {
                            res.writeHead(500);
                            res.end(JSON.stringify({ error: "Error occurred while reading inventory database" }));
                            return;
                        }
                        const allItems = JSON.parse(data);
                        const itemCount = allItems.length;
                        const lastIndex = itemCount - 1;
                        const appendId = { "id": lastIndex + 1 };

                        //console.log(typeof appendId);

                        const addNewItem = { ...appendId, ...newItem };
                        console.log(addNewItem);

                        allItems.push(addNewItem);

                        fs.writeFile(BASE_DIR, JSON.stringify(allItems), (err) => {
                            if (err) {
                                res.writeHead(500);
                                res.end(JSON.stringify({ error: "Failed to add new inventory data to database" }));
                                return;
                            }
                            res.writeHead(200);
                            res.end(JSON.stringify(addNewItem));
                        });
                    });
                } catch (error) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: error.message }));
                }
            });
        }
    })

}

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}`);
} )
