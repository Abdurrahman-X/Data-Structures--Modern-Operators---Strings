'use strict';

const restaurant = {
    name: "Classico Italiano",
    location: "Via Angelo Tavanti 23, Firenze, Italy",
    categories: ['Italian', 'Pizerria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
}

// ARRAY DESTRUCTURING

/* 
Destructuring is to break down a complex into a smaller data structure like a variable. For arrays, we use destructuring to retrieve elements from the array and store them to variables in a very easy way.
*/

const arr = [3, 4, 5]
const a = arr[0]
const b = arr[1]
const c = arr[2]

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
console.log(main, secondary);