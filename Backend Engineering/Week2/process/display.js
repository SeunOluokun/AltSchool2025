const process = require('process');

function display({name , age}) {
    console.log(`Hello ${name} you are ${age} years old ${name} cause i wanted to type myself`);
}

function parseCmdArgs(args){
    // console.log(args);
    const argSlice = args.slice(2)
    const name = argSlice[0].split('=')[1];
    const age = argSlice[1].split('=')[1];
    return {name, age};
}

const args = process.argv
const processsedArgs = parseCmdArgs(args);

console.log(processsedArgs);
display(processsedArgs);