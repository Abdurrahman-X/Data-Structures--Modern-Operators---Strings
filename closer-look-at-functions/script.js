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

