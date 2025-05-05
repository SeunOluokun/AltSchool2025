const http = require("http");

const HOSTNAME = 'localhost';
const PORT = 8000;

function requestHandler(request, response){

    response.write("Hey There. This is my server")
    response.write("Hey again!")
    response.end("Hello From The Server!")
    console.log(request);
}

const SERVER = http.createServer(requestHandler);

SERVER.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running at http://${HOSTNAME}:${PORT}/`);
});



















// const hostname = 'localhost';
// const port = 8000;

// // Add Request Listener to the server
// const requestListener = function (request, response) {
//     response.writeHead(200); // Status code 200 = OK
//     response.write("Hello World");
//     response.end();
// };



// // Create the server
// const server = http.createServer(requestListener)
// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// })