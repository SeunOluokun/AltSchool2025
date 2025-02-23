// checkSpeed(80);
// //speed limit 70 km. If speed less than limit , console . log Ok.
// //if past limit by 5km, console.log Point: 1.
// //For every 5km past Limit,  1 Point added
// //If points is Greater than or equal to 12, Licence Suspended
// function checkSpeed(speed){
// let limit = 70;
// let kmPerPoint=5;

// if (speed < limit + kmPerPoint){
//     console.log('Ok');
// return;
// }
// const points = Math.floor((speed - limit)/kmPerPoint)
// if(points >= 12)
//     console.log('License Suspended');
// else
//     console.log('Points', points);
// }


// showNumbers(10);

// function showNumbers(limit){
//    for (let i=0; i <= limit; i++){
//     //    if (i%2 === 0){
//     //        console.log(i,"EVEN");
//     //    }else console.log(i,"ODD");

//     const message = (i%2 === 0) ? "EVEN" : "ODD";
//     console.log(i, message);

//    }
// }

//Function to take in array and returns number of truthy elements in the array

// const arr = ['', 0, 1, 2, 3, 4,20];

// console.log(arr[4]);
// console.log(countTruthy(arr));

// function countTruthy(array) {
//     let cnt = 0;
//     for (let i = 0; i < array.length; i++) {
//         if (array[i]) {
//             cnt ++;
//         }
//     }
//     return cnt;
// }


// function countTruthy(array) {
//     let cnt = 0;
//     for (let value of array) {
//         if (value) {
//             cnt += 1;
//         }
//     }
//     return cnt;
// }

//function to show/ return property when object is of string type

// const movie = {
//     title : 'a',
//     releaseYear: 2018,
//     rating : 4.5,
//     director : 'b'
// };
// showProperties(movie);

// function showProperties(obj){
//     for (let key in obj)
//     {
//         if (typeof obj[key] === 'string')
//             console.log(key, obj[key]);
//     }
// }

//function to display the sum of all multiples of 3 and 5 from 0 to given value 
console.log(sum(10));
function sum(limit){
    let value = 0;

    for (let i=0; i <= limit; i++){        
        // console.log('i',i);
        if ((i%3===0)||(i%5===0)) 
            value +=i;
        // console.log(value, 'value');
        //return value;
    }return value;
}