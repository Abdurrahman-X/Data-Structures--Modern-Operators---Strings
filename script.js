'use strict';

// ------------------------------- WORKING WITH STRINGS -------------------------------------------
const airline = 'TAP Air Portugal';
const plane = 'A320';

// ----------- PART 1----------------------
/*
console.log(airline[2]); // P
console.log(plane.length); // 4
console.log('83B1'[1]); // 3

console.log(airline.indexOf('g')); // 13 - takes the first instance of occurrence
console.log(airline.indexOf('P')); // 2
console.log(airline.lastIndexOf('P')); // last index of P
// We can also search for entire words. NB - Strings are Case-sensitive
console.log(airline.indexOf('Air')); // 4
console.log(airline.indexOf('air')); // -1 i.e cannot be found.

// Extract part of a string using the slice method. The slice method takes two arguments (can also take ust an argument). The beginning and end index.

console.log(airline.slice(4)); // Air Portugal (known as a substring). Extraction starts from index 4.
console.log(airline.slice(4, 7)); // Air. The end vale is NOT included in the string. The length of the extracted string (substring) will always be equal to the end - beginning parameters.

// To extract the first and last words from airline without hardcoding the index.
console.log(airline.slice(0, airline.indexOf(' '))); // TAP
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // Portugal 

console.log(airline.slice(-2)); // al. Starts extracting from the end.
console.log(airline.slice(1, -1)); // AP Air Portuga. 

const checkMiddleSeat = function (seat) {
    // middle seat is either B or E
    const s = seat.slice(-1);
    s === 'B' || s === 'E' ? console.log('Middle seat 😎') : console.log('Try again 😒');;
}

checkMiddleSeat('21B');
checkMiddleSeat('21C');
checkMiddleSeat('21E');
*/

// -------------------- PART 2 -------------------------------
console.log(airline.toUpperCase()); // TAP AIR PORTUGAL
console.log(airline.toLowerCase()); // tap air portugal

// Fix capitalization in name
/*
const passenger = 'jOnAtHaN'; // Jonathan
const passengerLower = passenger.toLowerCase(); // jonathan

const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect); // Jonathan
*/

const capitalizeName = function (name) {
    const passengerLower = name.toLowerCase();
    const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
    console.log(passengerCorrect);
}

capitalizeName('aBDUrraHman');
capitalizeName('abolaji');

// Comparing emails
/*
const email = 'hello@abolaji.io';
const userEmail = '   Hello@Abolaji.io \n';

const correctMail = userEmail.toLowerCase().trim();
console.log(correctMail === email);
*/

const correctMail = function (userEmail) {
    const LoginMail = 'hello@abolaji.io'
    const correctMail = userEmail.toLowerCase().trim();
    console.log(correctMail === LoginMail);
}

correctMail('   Hello@Abolaji.io \n');


// Replacing parts of strings
const priceNG = '₦350.20';
const priceUS = priceNG.replace('₦','£').replace('.', ',');
console.log(priceNG); 
console.log(priceUS); 

const announcement = 'All passengers come to boarding door 23. Boarding door 23!'
console.log(announcement.replace('door', 'gate')); // Only replaces the first occurence.
console.log(announcement.replaceAll('door', 'gate')); // replaces all occurences.

// Booleans
const newPlane = 'A320neo';
console.log(newPlane.includes('A320')); // true
console.log(newPlane.startsWith('A3')); // true
console.log(newPlane.endsWith('A320')); // false
console.log(newPlane.endsWith('neo')); // true

// Practice Exercise
const checkBaggage = function (items) {
    const baggage = items.toLowerCase();

    if (baggage.includes('knife') || baggage.includes('gun')) {
        console.log('You are NOT ALLOWED on board');
    } else {
        console.log('Welcome aboard!');
    }
}

checkBaggage('I have a Laptop, some Food, and a Pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');

// -------------------------------- PART 3 -------------------------------------------------
// Split and Join

console.log("a+very+nice+string".split('+')); // ['a', 'very', 'nice', 'string']
console.log('Abolaji Abdulrahman'.split(' ')); // Abolaji Abdulrahman

const [firstName, lastName] = 'Abolaji Abdulrahman'.split(' ');
//console.log(firstName, lastName);

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);


const capitalizePass = function (name) {
    const passLower = name.toLowerCase().split(' ');
    const namesUpper = [];

    for (const names of passLower) {
        // namesUpper.push(names[0].toUpperCase() + names.slice(1))
        namesUpper.push(names.replace(names[0], names[0].toUpperCase()))
    }
    console.log(namesUpper.join(' '));   
}
capitalizePass('jessIca anN smitH');
capitalizePass('abDUrraHman aboLaji');

// String Padding
const message = 'Go to gate 23!';
console.log(message.padStart(25, '+').padEnd(30, '+'));

// masking credit card
const maskCreditCard = function (number) {
    // convert the number to a string
    const numStr = String(number);
    // take the last 4 digits
    const last4 = numStr.slice(-4);
    console.log(last4.padStart(numStr.length, '*'));
}

maskCreditCard(4183893723714893);

// Repeat
const message2 = 'Bad Weather......... All Departures Delayed ';
console.log(message2.repeat(5));


// Enhanced Object Literal
const openingHours = {
    thu: {
        open: 12,
        close: 22,
    },
    fri: {
        open: 11,
        close: 23,
    },
    sat: {
        open: 0, // open 24 hours
        close: 24,
    }
};

const restaurant = {
    name: "Classico Italiano",
    location: "Via Angelo Tavanti 23, Firenze, Italy",
    categories: ['Italian', 'Pizerria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
    openingHours,
    order: function (starterIndex = 0, mainIndex = 1) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },

    orderDelivery: function ({ starterIndex = 0, mainIndex = 1, address, time = "20:00" }) {
        //console.log(address, mainIndex, starterIndex, time);
        console.log(`Order Received!, ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
    },
    // Enhanced Object Literal
    orderPasta(ingr1, ingr2, ingr3) {
        console.log(`Here is your delicious pasta with ${ingr1}, ${ingr2}, ${ingr3}`);
    },
    // Enhanced Object Literal
    orderPizza(mainIngredient, ...otherIngredients) {
        console.log(mainIngredient);
        console.log(otherIngredients);
    }
}

restaurant.orderDelivery({
    time: "23:30",
    address: "4449 Bingamon Branch Road",
    starterIndex: 2,
    mainIndex: 2,
});

//console.log(restaurant.order(3,0));

//console.log(restaurant.openingHours.thu);

// -------------------------------- MAPS ITERATION -------------------------------------------------
/*
const question = new Map([
    ['question', 'What is the best programming language in the World?'],
    [1, 'C'],
    [2, 'Java'],
    [3, 'Javascript'],
    [4, 'C#'],
    ['correct', 3],
    [true, 'Correct 🥳'],
    [false, 'Try again! 😥']
]);

// We can convert Objects into Maps as follows:
const hourMaps = new Map(Object.entries(openingHours));
console.log(hourMaps);

console.log(hourMaps.get('fri'));
//console.log(question);

// QUIZ APP
console.log(question.get('question'));
for (const [key, value] of question) {
    if (typeof key === 'number') {
        console.log(`Answer ${key}: ${value}`);
    }
}

// const answer = Number(prompt('Your answer?'));
const answer = 3;
console.log(answer);

// Ternary Solution
// question.get('correct') === answer ? console.log(question.get(true)) : console.log(question.get(false));

console.log(question.get(question.get('correct') === answer));

// Convert Maps to Arrays
console.log([...question]);
// console.log(question.entries());
console.log([...question.keys()]);
console.log([...question.values()]);
*/

// -------------------------------- MAPS FUNDAMENTALS-----------------------------------------------
// A data structure that we can use to map values to keys just like Objects. A huge difference between objects and maps is:
//1. The keys in maps can be of any type.

/*
const newRestaurant = new Map();
newRestaurant.set('name', 'La Viola');
newRestaurant.set(1, 'Nairobi, Kenya');
newRestaurant.set(2, 'Lagos, Nigeria'); // This 'set' updates and returns the updated map. Hence we can chain multiple set methods and get the updated map everytime.

newRestaurant
    .set('categories', ['Italian', 'Pizerria', 'Vegetarian', 'Organic'])
    .set('open', 11)
    .set('close', 23)
    .set(true, 'We are open :D')
    .set(false, 'We are closed :(')

// To read data from a map, we use the GET method, and pass in the name of the key

// console.log(newRestaurant.get('categories'));
// console.log(newRestaurant.get(2));
// console.log(newRestaurant.get(false));

// console.log(newRestaurant);
console.log(document.querySelector('h1'));

const time = 21;
console.log(newRestaurant.get(time > newRestaurant.get('open') && time < newRestaurant.get('close')));

// To check if a map contains a certain key
// console.log(newRestaurant.has('name'));
// newRestaurant.delete(2)
//console.log(newRestaurant.size);
// console.log(newRestaurant);
// newRestaurant.clear();

// We can also use arrays and Objects as map keys:
const arr = [1, 2];
newRestaurant.set(arr, 'Test');
newRestaurant.set(document.querySelector('h1'), 'Heading')
console.log(newRestaurant);
*/


// -------------------------------- SETS -----------------------------------------------
/*
A set is a collection of unique values. No duplicates. Sets can hold mixed data types as well. Sets are iterables just like arrays and can be looped over, and strings. A set is however, different from an array because:

 1. It's elements are unique
 2. The order of elements in the set is irrelevant
const ordersSet = new Set([
    'Pasta',
    'Pizza',
    'Pizza',
    'Risotto',
    'Pasta',
    'Pizza',
]);
console.log(ordersSet); // [Pasta, Pizza, Risotto]
console.log(new Set('Jonas')); // J, o, n, a, s

// Working with Sets
console.log(ordersSet.size); // 3
console.log(ordersSet.has('Bread')); // false
console.log(ordersSet.has('Pizza')); // true
ordersSet.add('Garlic Bread'); // [Pasta, Pizza, Risotto, Garlic Bread]
ordersSet.add('Garlic Bread'); // [Pasta, Pizza, Risotto, Garlic Bread]
ordersSet.delete('Pasta'); // [Pizza, Risotto, Garlic Bread]
//ordersSet.clear(); // clears the whole set

for (const order of ordersSet) {
    console.log(order);
}

// Example
const staff = ["Waiter", "Chef", "Waiter", "Manager", "Waiter", "Chef" ];
const staffUnique = [...new Set(staff)]; // unpack set into an array
console.log(staffUnique, staffUnique.length);

// It's impossible to retrieve data from sets.



// ------------------------------ LOOPING OBJECTS ----------------------------------------------
// Property NAMES
/*
const properties = Object.keys(openingHours);
//console.log(properties); [thu, fri, sat]

let openStr = `We are open on ${properties.length} days: `

for (const prop of properties) {
    openStr += `${prop}, `;
    
}
console.log(openStr);

// Property VALUES
const values = Object.values(openingHours);
console.log(values);

// Entire OBJECT
const entries = Object.entries(openingHours);
console.log(entries);

for (const [day, { open, close }] of entries) {
    console.log(`On ${day}, we open at ${open}, and close at ${close}.`);
}
*/


// ---------------------------------- OPTIONAL CHAINING-------------------------------------------
// With optional chaining, if a certain property does not exist, then undefined is returned immediately.

//console.log(restaurant.openingHours.mon.close); // cannot read property of close, because "mon" is undefined.
/*
if (restaurant.openingHours && restaurant.openingHours.mon) {
    console.log(restaurant.openingHours.mon.close);
}

// WITH OPTIONAL CHAINING
//console.log(restaurant.openingHours?.mon?.close) // undefined.

// Example
const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]

for (const day of days) {
    //console.log(day);
    const open = restaurant.openingHours[day]?.open ?? 'closed';
    console.log(`On ${day}, we open at ${open}`);
}

// OPTIONAL CHAINING ON METHODS
const myOrder = restaurant.order?.(0, 1) ?? 'Method does not exist';
console.log(myOrder);
console.log(restaurant.orderFocaccia?.(0, 1) ?? 'Method does not exist');

// OPTIONAL CHAINING ON ARRAYS

const users = [
    {
        name: 'Abdurrahman',
        email: 'abolajiabdurrahman@gmail.com'
    }
]

console.log(users[0] ?.name || 'User does not exist');  // Abdurrahman
*/

/*
//----------------------------------- FOR - OF LOOP ----------------------------------------------
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

//for (const item of menu) console.log(item);
// However, in order to get the index of all the items, we use the entries() method
for (const [index, meal] of menu.entries()) {
    
    //const [index, meal] = item;
    console.log(`${index + 1}: ${meal}`);
    //console.log(`${item[0] + 1}: ${item[1]}`);
}
// console.log([...menu.entries()]);




///////////////////////////////////////////////////////////////////////////////////////

//OBJECT DESTRUCTURING
// const { name, openingHours, categories } = restaurant; // Object destructuring does not care about the order like in array destructuring.
// console.log(name, openingHours, categories);

// To give new variables names
const { 
    name: restaurantName, 
    openingHours: hours, 
    categories: tags,
 } = restaurant;

 console.log(restaurantName, hours, tags);
 
 // Setting Default Values -  Especialyy when we do not have data hardcoded as above.

 //const { menu = [], starterMenu: starters = []} = restaurant;
 //console.log(menu, starters);

 // MUTATING VARIABLES
 let a = 111;
 let b = 999;
 const obj = { a: 23, b: 7, c: 14};

 ({ a, b } = obj);
 console.log(a, b);

 console.log(hours);

 // Nested Objects

 const { fri: {open, close}} = hours;
 console.log(open, close);

*/

////////////////////////////////////////////////////////////////////////////////
// ARRAY DESTRUCTURING

/* 
Destructuring is to break down a complex into a smaller data structure like a variable. For arrays, we use destructuring to retrieve elements from the array and store them to variables in a very easy way.
*/

/*
const arr = [3, 4, 5]
// const a = arr[0]
// const b = arr[1]
// const c = arr[2]

// Destructuring example
const [x, y, z] = arr;
// console.log(x, y, z);
// console.log(arr);

let [main, , secondary] = restaurant.categories;
//console.log(main, secondary);

// SWITCHING VARIABLES
*/

/*
    const temp = main;
    console.log(temp); // Italian
    main = secondary;
    console.log(main, secondary); // Vegetarian, Vegetarian
    secondary = temp;
    console.log(main, secondary); // Vegetarian, Italian
*/

/*
// To switch values of the variables using destructuring
[main, secondary] = [secondary, main]
//console.log(main, secondary);

// Receive two return values from a function.
const [starter, mainCourse] = restaurant.order(1, 0);
// console.log(starter, mainCourse);


// NESTED ARRAYS
const nested = [2, 4, [5, 6]];
//const [i, , k] = nested;
//console.log(i, k); // 2, [5, 6]

const [i, , [j, k]] = nested;
//console.log(i,j,k); // 2,5,6

// DEFAULT VALUES
// const [p, q, r] = [8, 9]
// console.log(p, q, r); // 8, 9, undefined.

//The above error can be fixed by setting default values as shown below:
const [p = 1, q = 1, r = 1] = [8, 9]
//console.log(p, q, r); // 8, 9, 1 

*/


////////////////////////////////////////////////////////////////////////////////////////////
// SPREAD OPERATOR - expects multiple values separated by a comma. Used to build new arrays, pass multiple values into a function, and in both cases to expand an array into its individual elements. Used where we would write values, separated by a comma.
/*
const Arr = [7, 8, 9];
//const newArr = [1, 2, Arr[0], Arr[1], Arr[2]];
const newArr = [1, 2, ...Arr];

console.log(newArr); // [1, 2, 7, 8, 9]
console.log(...newArr); // 1, 2, 7, 8, 9

const newMenu = [...restaurant.mainMenu, "Jollof Rice"];
console.log(newMenu); // ['Pizza', 'Pasta', Risotto', 'Jollof Rice']
console.log(...newMenu); // Pizza Pasta Risotto Jollof Rice

// USE CASES OF SPREAD OPERATOR

// Create shallow copies of an array
const mainMenuCopy = [...restaurant.mainMenu];

// Join or merge two or more arrays together
const allMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(allMenu);
console.log(...allMenu);

// Iterables: are arrays, strings, maps, and sets. NOT Objects.
const str = 'Jonas';
const letters = [...str, ' ', 'T'];
console.log(letters); 
console.log(...str); // J o n a s

const ingredients = [
    // prompt("Lets's make pasta! Ingredient 1?"), 
    // prompt("Ingredient 2?"), 
    // prompt("Ingredient 3?")
]

//restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2])
restaurant.orderPasta(...ingredients);

// OBJECTS
const newRestaurant = { foundedIn: 2001, ...restaurant, founder: "Abdurrahman-X"};
console.log(newRestaurant);

// we can also create shallow copies of objects.
const restaurantCopy = {...restaurant};
console.log(restaurantCopy);


//////////////////////////////////////////////////////////////////////////////////////////////////////// REST OPERATOR - used to collect multiple elements and condense them into an array. Unlike the spread operator which is used to unpack an array, the rest operator is to pack elements into an array. Used where we would write variable names, separated by a comma.

// 1) Destructuring.

// SPREAD, because on the right hand side of the "="
const arrr = [1, 2, ...[3, 4, 5]];
console.log(arrr);

// REST, because on the left hand side of the "="
const [A, B, ...others ] = [1, 2, 3, 4, 5];
console.log(A, B, others);

// In destructuring assignments, the rest operator must always be the last element
const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, restaurant.starterMenu];
console.log(pizza, risotto, otherFood);


// Objects
const { sat: weekend, ...weekdays} = restaurant.openingHours;
console.log(weekend, weekdays);

// 2) Functions

function add (...numbers) {
    let sum = 0;
    // Using While Loop

    // let i = 0;
    // while (i < numbers.length) {
    //     sum = sum + numbers[i];
    //     i++;
    // }
    
    // For Loop

    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    console.log(sum);
}

add(2,3);
add(2,3,5,6,7);
add(1,2,5,3,4,8,9,3);

const xArr = [23, 5, 17];
add(...xArr); // spread operator

restaurant.orderPizza('mushrooms', 'Olive oil', 'onions', 'spinach');

//////////////////////////////////////////////////////////////////////////////////////////////////////
// SHORT-CIRCUITING (&& and ||)
// Logical operators can:
// 1. use ANY data type
// 2. return ANY data type
// 3. short-circuiting

console.log("--- OR ---");

console.log(3 || 'Jonas'); // if the first operand in the OR(||) operation is a "truthy value", the operand is returned without evaluating the second operand. This is known as Short-circuiting.
console.log('' || 'Jonas'); // Jonas. "" is a "falsy value"
console.log(true || 0); // true
console.log(undefined || null); // null. 
console.log(null || undefined); // undefined.
// there are 6 falsy values - 0, NaN, "", Undefined, Null, false

console.log(undefined || 0 || "" || 'Hello' || 23 || null); // Hello. This is because Hello is the first truthy value encountered.

restaurant.numOfGuests = 0;
const guests1 = restaurant.numOfGuests ? restaurant.numOfGuests : 23;
console.log(guests1); 

// By short-circuiting
const guests2 = restaurant.numOfGuests || 10;
console.log(guests2);

console.log("--- AND ---");
// This is the exact opposite of the OR operation.
console.log(0 && 'Jonas'); // 0. The AND operator short-circuits if the first operand is a falsy value without evaluating the second operand.
console.log('' && 'Jonas'); // ""
console.log(7 && 0); // 0.
console.log('Hello' && 23 && null && 'desire'); // null.

//Practical Example
if (restaurant.orderPasta) {
    restaurant.orderPasta('onion', 'garlic', 'spianach');
}
// By short-circuiting
restaurant.orderPasta && restaurant.orderPasta('onion', 'garlic', 'spianach');

//---------------------------------------------------------------------------------------------

restaurant.numOfGuests = 0;

const guests = restaurant.numOfGuests || 10;
console.log(guests); // 10

// nullish - null and undefined (does NOT include '' and 0). The nullish coalescing operator considers 0 and "" and truthy values. Just like the name implies its only worried about null and undefined.
const guestCorrect = restaurant.numOfGuests ?? 10;
console.log(guestCorrect); // 0

//--------- LOGICAL ASSIGNMENT OPERATORS ------------------------------------------------
const rest1 = {
    name: 'Capri',
    // numGuests: 20
    numGuests: 0
}

const rest2 = {
    name: 'La Veranda',
    owner: 'Gianluigi Carrera'
}

// By OR Logical Assignment Operator

// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// NULLISH LOGICAL ASSIGNMENT OPERATOR
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// AND Logical assignment operator

// rest1.owner = rest1.owner  && 'Sicuro Vallone';
// rest2.owner = rest2.owner  && 'Sicuro Vallone';
rest1.owner &&= 'Sicuro Vallone';
rest2.owner &&= 'Sicuro Vallone';


console.log(rest1); //owner: undefined, numGuests: 0
console.log(rest2); //owner: Sicuro Vallone, numGuests: 0
*/