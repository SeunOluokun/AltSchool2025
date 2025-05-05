const http = require("http");
const path = require("path");
const fs = require("fs");

//reading from?
const booksDbPath = path.join(__dirname, "db", "books.json");

//define books port and hostname
PORT = 1000;//invalid port because it is already in use
HOST_NAME = "localhost";

//create server 
const server = http.createServer(requestHandler); // same as http.createServer(function(req,res){}) or http.createServer( (req, res) => {...} );

//define request handler as CreateServer reuires a callback function receiving
//request and response objects
function requestHandler(req,res){
    if(req.url === "/books" && req.method === "PUT"){
        console.log("PUT request to book route");
        updateBook(req, res);
    }
    else if(req.url === "/books" && req.method === "DELETE"){
        console.log("DELETE request to book route");
    }
    else if(req.url ==="/books" && req.method === "POST"){
        console.log("Adding a book");
        addBook(req, res);
    }
}

function addBook(req, res){
    const body = [];

    req.on("data",(chunk)=>{body.push(chunk);})
        
    req.on("end", ()=>{ 
        const parsedBook = Buffer.concat(body).toString();//the data event is emitted multiple times until the entire data is received
        const newBook = JSON.parse(parsedBook);
        fs.readFile(booksDbPath, "utf-8", (err, data)=>{
            if (err){
                console.log(err);
                res.writeHead(400);
                res.end("An error occured");
            }
            const oldBooks = JSON.parse(data);
            let id = oldBooks.length + 1;
            console.log(id);
            newBook.id = id;
            const allBooks = [...oldBooks, newBook];

            fs.writeFile(booksDbPath, JSON.stringify(allBooks), (err)=>{
                if (err){
                    console.log(err);
                    res.writeHead(500);
                    res.end(JSON.stringify({
                        message: "An error occured"
                    }));
                }
                res.end(JSON.stringify(newBook));
            });
        })
    })
    //the on method is used to listen for events including data and end events
}

function updateBook(req, res){
    const body = [];

    req.on("data", (chunk) => {
        body.push(chunk);
    })

    req.on("end", () => {
        const parsedBook = Buffer.concat(body).toString();
        const detailsToUpdate = JSON.parse(parsedBook);
        const bookId = detailsToUpdate.id;
        console.log(detailsToUpdate);
        
        // fs.readFile(booksDbPath, "utf-8", (err, data) => {
        //     if (err) {
        //         console.log(err);
        //         res.writeHead(400);
        //         res.end("An error occured");
        //     }
        //     const oldBooks = JSON.parse(data);
        //     const bookIndex = oldBooks.findIndex(book => book.id === detailsToUpdate.id);
        //     if (bookIndex === -1) {
        //         res.writeHead(404);
        //         res.end(JSON.stringify({ message: "Book not found" }));
        //         return;
        //     }
        //     oldBooks[bookIndex] = detailsToUpdate;
        //     fs.writeFile(booksDbPath, JSON.stringify(oldBooks), (err) => {
        //         if (err) {
        //             console.log(err);
        //             res.writeHead(500);
        //             res.end(JSON.stringify({ message: "An error occured" }));
        //         }
        //         res.end(JSON.stringify(detailsToUpdate));
        //     });
        // });
    })
}

//server created, now listen for incoming requests
server.listen(PORT, HOST_NAME , () => {
    console.log(`Server is running on http://${HOST_NAME}:${PORT}`);
})