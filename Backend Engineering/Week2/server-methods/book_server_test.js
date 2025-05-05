const http = require("http");
const fs = require("fs");
const path = require("path");

const booksDbPath = path.join(__dirname, "db", "books.json" );
console.log(booksDbPath);

const PORT = 3000;
const HOST_NAME = "localhost";

function requestHandler (req, res){
    //note that the request object is an instance of IncomingMessage
    //and the response object is an instance of ServerResponse
    //all routing and crud functionality will be implemented here
    //we will be using the fs module to read and write to the books.json file
    //we will be using the path module to join the path to the books.json file
    //we will be using the http module to create the server
    //we will be using the createServer method to create the server
    //we will be using the listen method to listen for incoming requests
    //we will be using the request object to get the url and the method
    //we will be using the response object to send back the response
    
    if(req.url === "/books" && req.method === "GET"){
        console.log("Getting all books");
        getAllBooks(req, res);
        //LOAD AND RETURN BOOKS
    }
    else if(req.url === "/books" && req.method === "POST"){
        console.log("Adding a book");//adding a new book
        addBook(req, res);
    }
    else if(req.url === "/books" && req.method === "PUT"){
        console.log("PUT request to book route");//updating a book
        updateBook(req, res);
    }
    else if(req.url === "/books" && req.method === "DELETE"){
        console.log("DELETE request to book route");
        deleteBook(req, res);
    }
    else{
        console.log("Method not supported");
    }
}

function getAllBooks (req, res){
    fs.readFile(booksDbPath, "utf-8", (err,data)=> {//data here wil be returned as a STRING BECAUSE OF THE utf-8
        if (err){
            console.log(err);
            res.writeHead(400);
            res.end("An error occured");
        }

        res.end(data);
    })
}

function addBook(req, res){
    const body = [];//the body array will hold the incoming data
    //the request object is an instance of IncomingMessage set by the client
    //the response object is an instance of ServerResponse set by the server
    //the request object is used to get the url and the method
    //the response object is used to send back the response

    req.on("data",(chunk)=>{body.push(chunk);})//the on method is used to listen for events including data and end events
        
    
    req.on("end", ()=>{//the end event is emitted when the entire data has been received    
        const parsedBook = Buffer.concat(body).toString();//the data event is emitted multiple times until the entire data is received
        const newBook = JSON.parse(parsedBook);
        // const lastBookId = body[body.length - 1].id;// gIVIN nan wHY?
        // console.log(lastBookId);
        // newBook.id = lastBookId + 1;
        //console.log(body);// returned as a buffer of binary code
        //console.log(parsedBook);//returned as a JSON string 
        
        //add the new book to the end of the existing books array
        fs.readFile(booksDbPath, "utf-8", (err, data)=>{
            if (err){
                console.log(err);
                res.writeHead(400);
                res.end("An error occured");
            }
            //console.log(data);
            const oldBooks = JSON.parse(data);
            let id = oldBooks.length + 1;
            console.log(id);
            newBook.id = id;
            const allBooks = [...oldBooks, newBook];
            //console.log(allBooks);
            //console.log(oldBooks);

            fs.writeFile(booksDbPath, JSON.stringify(allBooks), (err)=>{//witeFile is used to write data to a file , passing allBooks as a string which includes the new book because the function reads the file and adds the new book to the end of the existing books array
                //the writeFile method takes in the path to the file, the data to be written and a callback function
                if (err){
                    console.log(err);
                    res.writeHead(500);
                    res.end(JSON.stringify({
                        message: "An error occured"
                    }));
                }
                res.end(JSON.stringify(newBook));//what does this line do? it sends the new book as a response to the client. does it send it together with the oldbookS? no it sends the new book only as a confirmation response to the client
            });
        })
    })
    //the on method is used to listen for events including data and end events
}// user needs to send the book details to be added in the request body/object
//note that any data that  is passed in the request body is passed as a stream and an attached event listener is used to listen for the data event
//the data event is emitted when a new chunk of data is received-- ie binary chunk of data
//the data event is emitted multiple times until the entire data is received
//the end event is emitted when the entire data has been received
//the end event is emitted only once
//the data event is emitted multiple times
//the data event is emitted when a new chunk of data is received
// Create server

function updateBook(req, res){
    const body =[];
    req.on("data",(chunk)=>{body.push(chunk);})

    req.on("end", ()=>{
        const parsedBook = Buffer.concat(body).toString();
        const updatedBook = JSON.parse(parsedBook);//this is the book that the user wants to update
        console.log(updatedBook);
        const idToUpdate = updatedBook.id;


        fs.readFile(booksDbPath, "utf-8", (err, data)=>{//data here is the stringified version of the books array
            if (err){
                console.log(err);
                res.writeHead(400);
                res.end("An error occured");
            }

            console.log(data);//returns books in database , or in this case the books array

            const oldBooks = JSON.parse(data);// books array in json string format JSON.parse converts it to a js object

            const bookIndex = oldBooks.findIndex((book)=> book.id === idToUpdate);
            if (bookIndex === -1){
                res.writeHead(404);
                res.end(JSON.stringify({
                    message: "Book not found"
                }));
            }
            else{
                const updatedDetails = {...oldBooks[bookIndex], ...updatedBook};//this is the book that the user wants to update- any properties with the same key in oldBooks INDEX 0 will be overwritten by the properties in updatedBook as we see they have same index
                //ABOVE object contains all the original properties of the book INDEX, with any updated values from updatedBook
                oldBooks[bookIndex] = updatedDetails;
                fs.writeFile(booksDbPath, JSON.stringify(oldBooks), (err)=>{
                    if (err){
                        console.log(err);
                        res.writeHead(500);
                        res.end(JSON.stringify({
                            message: "An error occured"
                        }));
                    }
                    res.end(JSON.stringify(updatedBook));
                });
            }

        });
    })


}

function deleteBook(req, res){
    const body =[];
    req.on("data",(chunk)=>{body.push(chunk);})

    req.on("end", ()=>{
        const parsedBook = Buffer.concat(body).toString();
        const updatedBook = JSON.parse(parsedBook);//this is the book that the user wants to update
        console.log(updatedBook);
        const idToUpdate = updatedBook.id;


        fs.readFile(booksDbPath, "utf-8", (err, data)=>{//data here is the stringified version of the books array
            if (err){
                console.log(err);
                res.writeHead(400);
                res.end("An error occured");
            }

            console.log(data);//returns books in database , or in this case the books array

            const oldBooks = JSON.parse(data);// books array in json string format JSON.parse converts it to a js object

            const bookIndex = oldBooks.findIndex((book)=> book.id === idToUpdate);
            if (bookIndex === -1){
                res.writeHead(404);
                res.end(JSON.stringify({
                    message: "Book not found"
                }));
            }
            else{
                //DELETE FUNCTION MAIN 
                oldBooks.splice(bookIndex, 1);//this removes the book from the array. at position bookIndex, removes 1 book
                //this is the book that the user wants to update- any properties with the same key in oldBooks INDEX 0 will be overwritten by the properties in updatedBook as we see they have same index
                //ABOVE object contains all the original properties of the book INDEX, with any updated values from updatedBook
               
                fs.writeFile(booksDbPath, JSON.stringify(oldBooks), (err)=>{
                    if (err){
                        console.log(err);
                        res.writeHead(500);
                        res.end(JSON.stringify({
                            message: "An error occured"
                        }));
                    }
                    res.writeHead(200);
                    res.end(JSON.stringify(updatedBook));
                    res.end("Deletion successfull!");
                });
            }

        });
    })
}
const server = http.createServer(requestHandler)

server.listen(PORT, HOST_NAME, () => {
    booksDB = JSON.parse(fs.readFileSync(booksDbPath, 'utf8'));
    console.log(`Server is listening on ${HOST_NAME}:${PORT}`)
})

