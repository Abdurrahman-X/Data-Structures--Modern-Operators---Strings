'use strict';

// ------------------- DEFAULT PARAMETERS ------------------------------

/*
const bookings = []
const createBooking = function (flightNum, numPass = 1, price = 190 * numPass) {
    
    // Default parameters in ES5
    // numPass = numPass || 1;
    // price = price || 190;

    const booking = {
        flightNum,
        numPass,
        price
    }

    bookings.push(booking);
    console.log(bookings);
}

createBooking('LU247'); // {LU247, 1, 190}
createBooking('LU247', 7); // {LU247, 7, 1330}
createBooking('LU247', 7, 1200); // {LU247, 7, 1200}
// It is impossible to skip arguments.
createBooking('LU247', 1200); // {LU247, 1200, 228000}. To skip default parameters, we put undefined in place of the argument to skip as shown below:
createBooking('LU2451', undefined, 1000) // {LU2451, 1, 1000}
*/


// ------------------------ PASSING ARGUMENTS: VALUE VS REFERENCE ----------------------------------
const flight = 'LH231';
const me = {
    name: 'Abolaji Abdurrahman',
    passport: 2135686298
}

const checkIn = function (flightNum, passenger) {
    flightNum = 'LH989';
    passenger.name = 'Mr. ' + passenger.name;

    // if (passenger.passport === 2135686298) {
    //     alert('Checked in!');
    // } else {
    //     alert('Wrong passport!')
    // }
}

//checkIn(flight, me);

//console.log(flight); // LH231
//console.log(me); // {name: 'Mr. Abolaji Abdurrahman', passport: 2135686298}

// Passing a primitive or object inside a function is just the same as creating a copy outside the function as shown below:
//const flightNum = flight;
//const passenger = me;

const newPassport = function (person) {
    person.passport = Math.trunc(Math.random() * 1000);
}

newPassport(me);
checkIn(flight, me)

console.log(flight, me);

// FIRST-CLASS FUNCTIONS AND HIGHER ORDER FUNCTIONS.
/*
    First-class functions is a concept to show that functions are simply values, and they can be stored in variables or properties. Higher-order functions are functions that receive another function as an argument, or return a new function, or even both.
*/

/*
const oneWord = function (str) {
    return str.replace(/\s/g, '').toLowerCase()
}

const upperFirstWord = function (str) {
    const [first, ...others] =  str.toLowerCase().split(' ')
    return [first.toUpperCase(), ...others].join(' ')
}

// Higher-Order Function
const transformer = function (str, fn) {
    console.log(`Original String: ${str}`);
    console.log(`Transformed string: ${fn(str)}`);

    console.log(`Transformed by: ${fn.name}`);
}

transformer('JavaScript is the Best Language', upperFirstWord);

transformer('JavaScript is the Best Language', oneWord);

// transformer is an Higher-order function. upperFirstWord and oneWord are both callback functions. We do not call them ourselves, rather we tell javascript to call them later. Higher order functions help us create a level of abstraction.

const highFive = function () {
    console.log('👋');
}

document.body.addEventListener('click', highFive);

// Functions Returning Functions

const greet = function (greeting) {
    return function (name) {
        console.log(`${greeting} ${name}`);
    }
}

const heyGreeter = greet('Hey!');
heyGreeter('John');
heyGreeter('Amaka');

// Using Arrow Functions
const greetArrow = greeting => name => console.log(`${greeting} ${name}`);

// Alternatively
greetArrow('Hello')('Abdurrahman');

*/

// ------------------------ CALL & APPLY METHODS ----------------------------------
const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    //book: function () {}
    book(flightNum, name){
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
        this.bookings.push({
            flight: `${this.iataCode}${flightNum}`,
            name
        })
    }
}


const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
}

lufthansa.book(231, 'Abdurrahman Abolaji');
lufthansa.book(610, 'Arifdeen Balogun');
console.log(lufthansa);

const book = lufthansa.book;
// Using the CALL METHOD. The this keyword now manually points to Euroswings using the call method.
book.call(eurowings, 398, 'AbdulMalik Adebayo')
book.call(lufthansa, 474, 'Sodiq Idowu')

console.log(eurowings);
console.log(lufthansa);

const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'LX',
    bookings: []
}

// The this keyword now points to the swiss object
book.call(swiss, 106, 'Ahmed Shitta');
console.log(swiss);

// APPLY METHOD
// Almost the same as the CALL method, except that it doesn't accept receive a list of arguments after the 'this' keyword. Rather it takes an array of arguments. It is rarely used in Modern JS now.

const flightData = [210, 'Rahmah Arogundade']
book.apply(eurowings, flightData);
console.log(eurowings);

// Alternatively
book.call(swiss, ...flightData);
console.log(swiss);


// ----------------------- THE BIND METHOD ----------------------------------
// book.call(eurowings, 398, 'AbdulMalik Adebayo')

// The bind method below does not call the book function, rather it returns a new function where the "this" keyword will always be set to euroswings, lufthansa, and swiss. 
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(772, 'Raheemah Adigun');

// specifying parts of the arguments before hand - known as PARTIAL APPLICATION
const bookLX29 = book.bind(swiss, 29)
bookLX29('Mukhtar Adigun');

// Bind with Event Listeners
lufthansa.planes = 400;
lufthansa.buyPlane = function () {
    console.log(this); // DOM element attached to eventListener

    this.planes++;
    console.log(this.planes);
}


document
    .querySelector('.buy')
    .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial Application

const addTax = (rate, value) => value + value * rate;

// Since we do not have a "this" keyword to attach it to, we use null
const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23;

console.log(addVAT(100));


// -------------------- IMMEDIATELY INVOKED FUNCTION EXPRESSIONS (IIFE) ------------------------------
const runOnce = function () {
    console.log('This will run again');
}
runOnce();

// IIFE
(function () {
    console.log('This will never run again');
})();

(() => console.log('This will ALSO never run again'))();


// ---------------------------- CLOSURES --------------------------------------
// Closures occur automatically. After the execution of a function, it is popped off the call stack, and all the variables existing in the function are all gone. However, closure makes a function remember all the variables that existed at the function's birthplace essentially.
// Any Function always has access to the variable environment of the execution context in which the function was created. Thanks to closures, a function does not lose connection to the variables that existed at the function's birthplace. Closure has priority over the scope chain.

// � A closure is the closed-over variable environment of the execution context in which a function was created, even after that execution context is gone;
// � A closure gives a function access to all the variables of its parent function, even after that parent function has returned. The function keeps a reference to its outer scope, which preserves the scope chain throughout time.
// � A closure makes sure that a function doesn’t loose connection to variables that existed at the function’s birth place;
// � A closure is like a backpack that a function carries around wherever it goes. This backpack has all the variables that were present in the environment where the function was created.

// Example 1
// const secureBooking = function () {
//     let passengerCount = 0;

//     return function () {
//         passengerCount++;
//         console.log(`${passengerCount} passenger`);
//     }
// }

// const booker = secureBooking();

// booker(); // 1 passenger
// booker(); // 2 passenger
// booker(); // 3 passenger

// console.dir(booker);

// Example 2
let f;

const g = function () {
    const a = 23;
    f = function () {
        console.log(a * 2);
    }
}

const h = function () {
    const b = 77;
    f = function () {
        console.log(b * 2);
    }
}

g();
f();

// Re-assigning f function
h();
f();

//console.dir(f);

// Example 3
const boardPassengers = function (no, waitTime) {
    const perGroup = no / 3;

    setTimeout(() => {
        console.log(`We are now boarding all ${no} passengers`);
        console.log(`There are 3 groups, each with ${perGroup} passengers`);
    }, waitTime * 1000);

    console.log(`Will start boarding in ${waitTime}`);
}

// Remember closure has priority of the scope chain.
const perGroup = 1000;
boardPassengers(210, 3)

