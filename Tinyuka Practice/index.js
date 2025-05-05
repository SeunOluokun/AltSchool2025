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
// console.log(sum(10));
// function sum(limit){
//     let value = 0;

//     for (let i=0; i <= limit; i++){        
//         // console.log('i',i);
//         if ((i%3===0)||(i%5===0)) 
//             value +=i;
//         // console.log(value, 'value');
//         //return value;
//     }return value;
// }

//function to calculate the average grade of a student. 
// if average grade is 1-59: F grade
//60-69: D
//70-79: C
//80-89: B
//90-100: A

// const marks =[80, 80, 50];
// console.log(calculateGrade(marks));
// solution1
// function calculateGrade(marks){
//    let avg=0;
//    let sum=0;

//    for (key in marks){//mostly, for value of array is for array loops, for key in obj is for object key values
//     // console.log(marks[key])
//     sum +=marks[key];
//    }
//    avg = sum/marks.length;
//     // console.log(avg);
    
//     // if (avg >=0 && avg <= 59) return 'F';
//     // if (avg >=60 && avg <= 69) return 'D';
//     // if (avg >=70 && avg <= 79) return 'C';
//     // if (avg >=80 && avg <= 89) return 'B';
//     // if (avg >=90 && avg <= 100) return 'A';

//     if (avg <60) return 'F';
//     if (avg < 70) return 'D';
//     if (avg < 80) return 'C';
//     if (avg < 90) return 'B';
//     return 'A';
// }
// solution2
// function calculateGrade(marks){
//     const average = calculateAvg(marks);
//         if (average <60) return 'F';
//         if (average < 70) return 'D';
//         if (average < 80) return 'C';
//         if (average < 90) return 'B';
//         return 'A';
// }
// function calculateAvg(array){
//     let sum = 0;
//     for (value of array)
//         sum +=value;
//        return sum/array.length;
//     }

//function to show number of stars per corresponding row based on given number
//eg 3 as number- one start on row 1, 2 on row 2, 3 on row 3.

// showStars(10);

// function showStars(rows){
//     for(let row = 1; row <= rows; row++){
//         let pattern = '';
//         for(let i = 0; i < row; i++)
//             pattern += '*';
//             console.log(pattern);
//     }
// }

//function to show prime numbers from 1 to max number provided as limit

// showPrimes(20);

// function showPrimes(limit){

//     for(let number =2; number <= limit; number++){

//         let isPrime = true;
//         for(let factor=2; factor < number; factor ++){
//             if(number % factor === 0)
//                 isPrime = false;
//             break;
//         }
//         if (isPrime) console.log(number);
//     } 
   
// }

// function showPrimes(limit){

//     for(let number =2; number <= limit; number++){

//         let value = isPrime(number);        
//         if (value) console.log(number);
//     }
// } 
   


// function isPrime(number){
//         for(let factor=2; factor < number; factor ++){
//             if(number % factor === 0)
//                 return false;
            
// } 
// return true;
// }

//objects
const circle ={
    radius: 1,
    location: {
        x: 1,
        y: 1
    },
    isVisible: true,
    draw: function(){
        console.log('draw');
    }
}

const person ={
    name: 'Seun',
    age:20,
    school: {
        location: 1,
        count: 600,
    },
    isActive: true,
    result : function(){
        console.log('Seun went to Reedeemers');
    }

person.result;
}