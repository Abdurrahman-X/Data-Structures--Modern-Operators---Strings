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


// ---------------- CREATING DOM ELEMENTS --------------------------------
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = " ";

  // creating a shallow copy of the array.
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    //console.log(type);
    
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html)
  })
}


// ------------------- CALCULATE AND PRINT BALANCE -------------------------------------
const calcDisplayBalance = function (account) {
  const balance = account.movements.reduce((acc, mov) => acc + mov, 0)
  labelBalance.textContent = `${balance}€`

  account.balance = balance;
  console.log(account);
}

// -------------------- CALCULATE AND DISPLAY SUMMARY --------------------------
const calcDisplaySummary = function (account) {
  // console.log(labelSumIn.textContent);
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`

  const expenses = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(expenses)}€`

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter((int, i, arr) => {
      //console.log(arr);
      // filter out interests less than 1
      return int >= 1
    })
    .reduce((acc, deposit) => acc + deposit, 0)

  //const interest = account.interestRate.
  labelSumInterest.textContent = `${interest}€`
}



// ------------- COMPUTING USERNAMES ---------------------------------------
const createUsernames = function (accs) {
  accs.forEach(function(acc) {
    acc.username = acc.owner
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');

    //console.log(acc);
  })
}
createUsernames(accounts);

// Update UI
const updateUI = function (currentAccount) {
  // Display Movements
  displayMovements(currentAccount.movements);

  // Display Balance
  calcDisplayBalance(currentAccount)

  // Display Summary
  calcDisplaySummary(currentAccount)
}


// ------------------------- IMPLEMENTING LOGIN --------------------------------------

let currentAccount;
// Event Handler
btnLogin.addEventListener('click', function (e) {
  // By default, buttons in a form gets submitted on click. We can prevent that as shown below:
  e.preventDefault(); 
  // console.log('LOGIN');

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  // console.log(currentAccount);

  
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}!`
    containerApp.style.opacity = 100;
   
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";

    // blur focus on input field
    inputLoginPin.blur()

    // Update UI
    updateUI(currentAccount)

  } else {
    labelWelcome.textContent = 'Wrong Pin or Username!'
    containerApp.style.opacity = 0;
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";

    // blur focus on input field
    inputLoginPin.blur()
  }

  
});


// ------------------ IMPLEMENTING TRANSFERS -----------------------------------

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(acc => acc.username === inputTransferTo.value);

  // check if the amount to be transferred is not negative, is bigger than the balance and the current user is not transferring to himself
  if (
    amount > 0 && 
    receiverAccount && 
    currentAccount.balance >= amount && 
    (receiverAccount?.username !== currentAccount.username)
    ) {
    // console.log(receiverAccount.movements);

    // transfer
    receiverAccount.movements.push(amount);
    currentAccount.movements.push(-amount);

    console.log(currentAccount, receiverAccount);

    // Update UI
    updateUI(currentAccount);
  }

  // Clear input fields
  inputTransferAmount.value = inputTransferTo.value = "";

  // Blur focus on input field
  inputTransferTo.blur();
})

// ------------------------ REQUESTING FOR LOAN ------------------------------------------
btnLoan.addEventListener('click', function(e) {
  e.preventDefault();

  const loanAmount = Number(inputLoanAmount.value);
  const depGreLoan = currentAccount.movements
    .filter(mov => mov > 0)
    .some(mov => mov >= 0.1 * loanAmount);
  
    console.log(loanAmount, depGreLoan);

  if (loanAmount > 0 && depGreLoan) {
    currentAccount.movements.push(loanAmount);
  }

  updateUI(currentAccount);

  // Clear input fields
  inputLoanAmount.value = "";

  // Blur focus on input field
  inputLoanAmount.blur();
})

// -------------------------------- CLOSING THE ACCOUNT ----------------------------------------

// The FindIndex() Method

/* The findIndex() method returns the index of the first element in an array that satisfies the provided testing function. If no elements satisfy the testing function, -1 is returned. */

btnClose.addEventListener('click', function(e) {
  e.preventDefault();

  
  // check if correct credentials
  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
    
    console.log('valid close');
    const deleteIndex = accounts.findIndex(acc => acc.username === currentAccount.username);

    console.log(deleteIndex);

    accounts.splice(deleteIndex, 1);
    console.log(accounts);

    labelWelcome.textContent = "Log in to get started"
    // Hide UI
    containerApp.style.opacity = 0;
  }

  // Clear input fields
  inputCloseUsername.value = inputClosePin.value = "";

  // Blur focus on input field
  inputClosePin.blur();
  
})

// --------------- SORTING THE MOVEMENTS -------------------------------

let sorted = false;
btnSort.addEventListener('click', function(e) {
  e.preventDefault();

  console.log(currentAccount.movements);

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
})

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

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
/*
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
  // mov - current element
  // i - index
  // arr - the array being looped over
  console.log(mov, i, arr);
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  }
  else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
})
*/

// ------------------------------ forEach With Maps and Sets --------------------------------------
/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// Maps
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
})

// Sets
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

currenciesUnique.forEach(function (value, _value, set) {
  // _value - unnecessary or throwaway variable in js
  console.log(`${value}: ${value}`);
})
*/



// ---------------------------- DATA TRANSFORMATION: map, filter and reduce --------------------------
// MAPS
// Map loops over an array and returns a new array containing the results of applying an operation on all original array elements.

// FILTER
// Filter returns a new array containing the array elements that passed a specified test condition.

// REDUCE
// Reduce boils ("reduces") all array elements down to one single value. (e.g adding all elements together)



// ---------------------------------- THE MAP METHOD ---------------------------------------

/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurtoUSD = 1.09;

// const movementsUSD = movements.map(function (mov) {
//   return Math.round(mov * eurtoUSD);
// })

const movementsUSD = movements.map(mov => Math.round(mov * eurtoUSD))
const movementsDescription = movements.map(
  (mov, i) => `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`
);

console.log(movementsUSD);
console.log(movementsDescription);

// ------------------------------- THE FILTER METHOD ------------------------------------------
// To filter only the deposits.
const deposits = movements.filter(function(mov) {
  return mov > 0;  
});


// Using Arrow function
/*
const depositArr = movements.filter(mov => mov > 0);

// Using for-of loop
const depositsFor = [];
for (const mov of movements) {
  if (mov > 0) {
    depositsFor.push(mov);
  }
}
*/

// To filter only withdrawals
/*
const withdrawals = movements.filter(mov => mov < 0);
console.log(movements, deposits, withdrawals);

// --------------------------------- THE REDUCE METHOD -----------------------------------
// The reduce method has 2 parameters - the callback function and the initial value of the accumulator

const balance = movements.reduce(function (acc, curr, i, arr) {
  console.log(`Iteration ${i + 1}: ${acc}`);
  return acc + curr;
}, 0)

const balanceArrow = movements.reduce((acc, curr) => acc + curr, 0)

console.log(balance, balanceArrow);

// Maximum value of movements array
const maxValue = movements.reduce(function(acc, mov) {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
 }, movements[0]);

// const maxValue = movements.reduce(function(acc, mov) {
//   const max = mov > acc ? mov : acc
//   return max;
// }, movements[0]);

console.log(maxValue);
*/

// --------------------------- CHAINING METHODS ----------------------------------

/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurtoUSD = 1.1;

const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  //.map(mov => mov * eurtoUSD)
  // To keeep track of the array in case of an error
  .map((mov, i, arr) => {
    // console.log(arr);
       return mov * eurtoUSD
  })
  .reduce((acc, mov) => acc + mov, 0)

console.log(totalDepositsUSD);

// Optimize chaining, do not overuse.
// It is bad practise to chain methods that mutate the underlying original array
// Do not chain methods like the splice and reverse
*/


// --------------------------- THE FIND METHOD ----------------------------------
// The find method is used to retrieve an element from an array based on a condition. The find method does not return a new array like the filter method. Rather, it returns only the first element in the array that satisfies the given condition.

/*
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements, firstWithdrawal);

const account = accounts.find(acc => acc.owner === "Jessica Davis");
console.log(account);
*/

// ----------------------- SOME & EVERY METHOD ---------------------------------
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/*

// Includes checks for EQUALITY
console.log(movements.includes(-130));

// SOME: CONDITION
const anyDeposits = movements.some(mov => mov > 0)
console.log(anyDeposits); // true


// EVERY: CONDITION
// Returns true iff all the elements in the array satisfy the condition that's passed in

// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));
const everyDeposits = movements.filter(mov => mov > 0).every(mov => mov > 50)
console.log(everyDeposits);

*/

// SEPARATING CALLBACKS
const deposit = mov => mov > 0;

console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));



// ----------------------- FLAT & FLATMAP METHODS -------------------------------------------

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); // [1, 2, 3, 4, 5, 6, 7, 8]

// The flat method only goes one level deep when flattening an array

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));  // 2 - refers to the depth of the flattening.

// To calculate the overall balance of all movements in all accounts.

// flat
const totalMovementsBalance = accounts
  .map(account => account.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalMovementsBalance);


// flatMap
const totalMovementsBalance2 = accounts
  .flatMap(account => account.movements) // flatMap only goes one level deep, and cannot be changed.
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalMovementsBalance2);


// -------------------------- SORT METHOD --------------------------------------

// Sort mutates the Original Array.
// Strings

/*
const owners = ['Zach', 'Adam', 'Mario', 'Yigit'];
console.log(owners.sort()); // Sorts the owners array in alphabetical order.
console.log(owners); // Sort mutates the original array.

// Numbers
console.log(movements);
//console.log(movements.sort()); // converts the number to strings and then sort alphabetically. Not correct. Should not be used directly on numbers.

// return < 0, sort a before b
// return > 0, sort b before a

// Ascending order
// movements.sort((a, b) => {
//   // a - current value
//   // b - next value
//   if (a > b) return 1;
//   if (a < b) return -1;
// });

movements.sort((a, b) => a - b);

console.log(movements);

// Descending order
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });

movements.sort((a, b) => b - a)

console.log(movements);

// NOTE: The sort method cannot be used with mixed arrays.
*/


// ----------------------- CREATING & FILLING ARRAYS ----------------------------------------
const barr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));

// Empty arrays x fill method
const x = new Array(7).fill(1) // creates an empty array with 7 elements - [empty x 7]
console.log(x);

// x.fill(1); // [1, 1, 1, 1, 1, 1, 1]. Mutates the original array.
//x.fill(1, 3) // specify the begin parameter which is position 3. [empty × 3, 1, 1, 1, 1]
//x.fill(1, 3, 5) // specify the end parameter just like the splice(). [empty × 3, 1, 1, empty × 2]
console.log(x);

console.log(barr.fill(23, 4, 6));

// Array.from

const y = Array.from({length: 7}, () => 1);
console.log(y); // [1, 1, 1, 1, 1, 1, 1].

const z = Array.from({length: 7}, (_, i) => i + 1)
console.log(z); // [1, 2, 3, 4, 5, 6, 7]

const randomRoll = Array.from({length: 100}, () => Math.floor(Math.random() * 6) + 1);
console.log(randomRoll);

// Iterables in JS such as strings, maps, sets can be converted to arrays using Array.from(). We can also convert a NodeList from querySelectorAll() to an array using Array.from().

labelBalance.addEventListener('click', function(e) {
  e.preventDefault();

  const movementsUI = Array.from(document.querySelectorAll('.movements__value'), mov => Number(mov.innerText.replace('€', '')))
  
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')].map(mov => Number(mov.innerText.replace('€', '')));
  
  console.log(movementsUI2);
})
