function add( a, b)
{return a + b}

function sub( a, b)
{return a - b}

function mul( a, b)
{return a * b}

function pow( a, b)
{return a ** b}

function div( a, b)
{return a / b}

function mean(arrayNums)
{let sum = arrayNums.reduce((c, a)=> c + a)
let length = arrayNums.length;

return sum/length;
 }

module.exports = {add,sub,mul,pow,div,mean}