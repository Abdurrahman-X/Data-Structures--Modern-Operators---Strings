'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// ------------------------------------- WORKING WITH ARRAYS -------------------------------------
// Methods are simply functions that we can call on objects. therefore arrays are objects too.

// SLICE METHOD

/*
let arr = ['a', 'b', 'c', 'd', 'e']
console.log(arr.slice(2)); // Slice returns a new array. It does not mutate the original array.
console.log(arr);
console.log(arr.slice(2,4)); // ['c', 'd']
console.log(arr.slice(-1)); // ['e'] - Last element of an array
console.log(arr.slice(1, -2)); // [b, c]
// We can also use the slice method to create a shallow copy of any array.
console.log(arr.slice()); // ['a', 'b', 'c', 'd', 'e']

// SPLICE METHOD
// The splice method is similar to the slice method. The fundamental difference however, is that splice mutates the original array. In addition, the second parameter in the splice method specifies the number of elements to be deleted.

//console.log(arr.splice(2)); // ['c', 'd', 'e']
// To remove last element of an array, we can use the splice method as shown below:
console.log(arr.splice(-1));
arr.splice(1, 2, 'z') 
console.log(arr); // The original array has been changed. [a, z, d]

// REVERSE METHOD
arr = ['a', 'b', 'c', 'd', 'e']
const arr2 = ['j', 'i', 'h', 'g', 'f']

console.log(arr2.reverse()); // reverses the array. This method MUTATES the original array.
console.log(arr2);

// CONCAT METHOD - Does not mutate the original array
const letters = arr.concat(arr2);
// Alternatively
console.log([...arr, ...arr2]);
console.log(letters);

// JOIN METHOD
console.log(letters.join("-"));

// AT METHOD

const myArr = [23, 16, 54, 72];

console.log(myArr[1]); // 16
console.log(myArr.at(1)); // 16

// One particularity of the at method is when we need to get the last element or penultimate element of an array.

// Before the at method
console.log(myArr[myArr.length - 1]); // 72
//console.log(myArr.splice(-1)[0]); // 72
console.log(myArr.slice(-1)[0]); // 72

// With the at method
console.log(myArr.at(-1)); // 72

// The AT method also works on strings
console.log('Abdurrahman'.at(4)); // r
*/

// --------------------------------- LOOPING ARRAYS: forEach Method -----------------------------
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//console.log([...movements.entries()]);
console.log("------FOR OF-----");

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  }
  else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log("-------- FOREACH -------");

movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  }
  else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
})
