require("dotenv").config()

const TOKEN = process.env.API_KEY

function authenticateUser(req, res){

    return new Promise((resolve, reject) => {
        let token = req.headers.authorization;
        token = token.split(' ')[1];
        
        if (!token){
            reject('token cannot be empty');
        }

        if (token !== TOKEN){
            reject("Invalid token provided! ");
        }
        resolve();
    })

}

module.exports={authenticateUser};