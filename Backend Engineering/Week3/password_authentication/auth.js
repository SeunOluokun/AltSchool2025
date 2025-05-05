const fs = require('fs');
const path = require('path');

const userDbPath = path.join(__dirname, "db", 'users.json');


function getAllUsers(){
    return new Promise((resolve, reject) => {
        fs.readFile(userDbPath, "utf8", (err, users) => {
            if(err) {
                console.log(err)
                reject("An error occured");
            }
            if(users) {
                const usersList = JSON.parse(users);
                resolve(usersList);
                // resolve(JSON.parse(users));
            }
        });
    });
}
function authenticate(req, res) {

    return new Promise ((resolve, reject) => {
        //Do Authentcation Here

        const body =[];

        req.on("data", (chunk) => {
            body.push(chunk);
        }
        )
        req.on("end", async ()=> {
            const parsedBody = Buffer.concat(body).toString();
            //console.log(parsedBody);

            if(!parsedBody) {
                reject("No Username or Password Provided");
            }else{

                const loginDetails = JSON.parse(parsedBody);
                //console.log(loginDetails);

                const users = await getAllUsers();
                //console.log(users);

                const userFound =  users.find((user) => {
                    return user.username === loginDetails.username;
                }
                );

                if(!userFound) {
                reject("User Not Found.Please sign Up!");}

                if(userFound.password !== loginDetails.password) {
                    reject("Invalid Username or Password");}

                resolve();
            }

        })
    })
}


module.exports = {
    authenticate
}