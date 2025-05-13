const fs = require('fs');
const path = require('path');


const BASE_DIR = path.join(__dirname, 'resource', 'inventory.json');

const getAll = function (req, res) {
 fs.readFile(BASE_DIR, "utf8", (err, data) => {
    try{
    if (err) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Error reading file' }));
            return;
        }
        const inventory = JSON.parse(data);

            res.writeHead(200);
            res.end(JSON.stringify(inventory));
    }
    catch(error){
        res.writeHead(404);
        res.end(JSON.stringify({error: error.message}))
    }
})
}

const updateItem = function (req, res) {

     const body = [];
                req.on('data',(chunk) => {body.push(chunk);} );
                
                req.on('end', () => {
                    
                try 
                {
                    if (body.length === 0) {
                        throw new Error(`No data provided in the request body. Please make sure to enter data of JSON Format ' "id":20 & "name": "itemName"/"price": 0.99/"size": "S/M/L" ' for Update within DB.`);
                    }
                    const alteredBook = Buffer.concat(body).toString();
    
                    const alteredBookJSON = JSON.parse(alteredBook);
    
                    const idToUpd = alteredBookJSON.id;
    
    
                    fs.readFile(BASE_DIR, "utf8", (err, data) => {
                    if (err){
                        res.writeHead(500);
                        res.end(JSON.stringify({error: "Error fetching inventory data for update" }) );
                        return;
                    }
                    const inventory = JSON.parse(data);
                    const inventoryIndex = inventory.findIndex((find) => find.id === idToUpd);//0
                    if (inventoryIndex === -1){
                        res.writeHead(400);
                        res.end("Inventory ID Provided does not exist within database")
                    }
    
                    const mergedUpdatedGoodsToDb = {...inventory[inventoryIndex], ...alteredBookJSON};
                     
                    console.log(mergedUpdatedGoodsToDb);
                    inventory[inventoryIndex] = mergedUpdatedGoodsToDb;
      

                    fs.writeFile(BASE_DIR, JSON.stringify(inventory), (err) => {
                            if (err) {
                                res.writeHead(500);
                                res.end(JSON.stringify({ error: 'Error writing to file' }));
                                return;
                            }
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

const addItem = function (req, res){
            const body = [];
            req.on('data', (chunk) => {body.push(chunk);});

            req.on('end', () => {
                try {
                    if (body.length === 0) {
                        throw new Error(`No data provided in the request body. Please make sure to enter data of JSON Format ' "name": "itemName","price": 0.99, "size": "S/M/L" ' for Insert into DB.`);
                    }

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
            })
}

const getItem = function (req, res){
 fs.readFile(BASE_DIR, "utf8", (err, data) => {
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
                const idToFetch = idData.id;

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
 })
}

const deleteItem = function (req, res){
                
            const body = [];
            req.on('data', (chunk) => {body.push(chunk);});

            req.on('end', () => {
                try
                {
                    if (body.length === 0){
                        throw new Error (`No data provided in the request body. Please make sure to enter data of JSON Format ' "id": 0 ' For delete of item fron DB `);
                    }

                    const itemForDelete = JSON.parse(body);
                    const idForDelete = itemForDelete.id;

                    fs.readFile(BASE_DIR, 'utf8', (err,data)=> {
                        if (err) {
                            res.writeHead(500);
                            res.end(JSON.stringify({error: 'Failure to read DB Inventory'}));
                            return;
                        }

                        const inventoryArray = JSON.parse(data);
                        const searchIndex = inventoryArray.findIndex((index) => idForDelete === index.id);
                        
                        if (searchIndex === -1){
                            res.writeHead(500);
                            res.end(JSON.stringify({error : `User provided ID For Delete does not exist within the Inventory db`}));
                            return;
                        }

                        inventoryArray.splice(searchIndex,1);

                        fs.writeFile(BASE_DIR, JSON.stringify(inventoryArray) , (err) => {
                            if(err){
                                res.writeHead(500);
                                res.end(JSON.stringify({error: 'Error occured while writing to write data to file'}))
                            }
                            res.end(JSON.stringify(inventoryArray))
                        } )
                    })
                }
                catch (error){
                    res.writeHead(400);
                    res.end(JSON.stringify({error : error.message}))
                }
            })
}
module.exports = {getAll,updateItem, addItem, getItem, deleteItem};