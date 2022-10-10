'use strict';

const restaurant = {
    name: "Classico Italiano",
    location: "Via Angelo Tavanti 23, Firenze, Italy",
    categories: ['Italian', 'Pizerria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
    openingHours:{
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
        },
    },

    order: function (starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },

    orderDelivery: function ({ starterIndex = 0, mainIndex = 1, address, time = "20:00" }) {
        //console.log(address, mainIndex, starterIndex, time);
        console.log(`Order Received!, ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
    },
}

restaurant.orderDelivery({
    time: "23:30",
    address: "4449 Bingamon Branch Road",
    starterIndex: 2,
    mainIndex: 2,
});

console.log(restaurant.order(1,2));

console.log(restaurant.openingHours.thu);

// OBJECT DESTRUCTURING
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

 const { menu = [], starterMenu: starters = []} = restaurant;
 console.log(menu, starters);

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

 





////////////////////////////////////////////////////////////////////////////////
// ARRAY DESTRUCTURING

/* 
Destructuring is to break down a complex into a smaller data structure like a variable. For arrays, we use destructuring to retrieve elements from the array and store them to variables in a very easy way.
*/

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

/*
    const temp = main;
    console.log(temp); // Italian
    main = secondary;
    console.log(main, secondary); // Vegetarian, Vegetarian
    secondary = temp;
    console.log(main, secondary); // Vegetarian, Italian
*/

// To switch values of the variables using destructuring
[main, secondary] = [secondary, main]
//console.log(main, secondary);

// Receive two return values from a function.
const [starter, mainCourse] = restaurant.order(1, 0);
//console.log(starter, mainCourse);

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