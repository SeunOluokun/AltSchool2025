const fs = require("fs");
const path = require("path");

const userDbPath = path.join(__dirname, "db", 'users.json');

function authenticate(req, res){
    //Do authentication here
}

module.export = {authenticate};