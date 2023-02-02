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
const displayMovements = function (movements) {
  containerMovements.innerHTML = " ";
  movements.forEach(function (mov, i) {
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
const calcDisplayBalance = function (movements) {
  labelBalance.textContent = movements.reduce((acc, mov) => acc + mov, 0) + '€'
}




// -------------------- CALCULATE AND DISPLAY SUMMARY --------------------------
const calcDisplaySummary = function (movements) {
  // console.log(labelSumIn.textContent);
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`

  const expenses = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(expenses)}€`

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * 1.2/100)
    .filter((int, i, arr) => {
      //console.log(arr);
      // filter out interests less than 1
      return int >= 1
    })
    .reduce((acc, deposit) => acc + deposit, 0)
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
   

    // Display Movements
    displayMovements(currentAccount.movements);

    // Display Balance
    calcDisplayBalance(currentAccount.movements)

    // Display Summary
    calcDisplaySummary(currentAccount.movements)
  }

});


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