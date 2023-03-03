'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

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
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html)
  })
}


// ------------------- CALCULATE AND PRINT BALANCE -------------------------------------
const calcDisplayBalance = function (account) {
  const balance = account.movements.reduce((acc, mov) => acc + mov, 0)
  labelBalance.textContent = `${balance.toFixed(2)}€`

  account.balance = balance;
  console.log(account);
}

// -------------------- CALCULATE AND DISPLAY SUMMARY --------------------------
const calcDisplaySummary = function (account) {
  // console.log(labelSumIn.textContent);
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`

  const expenses = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(expenses).toFixed(2)}€`

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
  labelSumInterest.textContent = `${interest.toFixed(2)}€`
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

  
  if (currentAccount?.pin === +(inputLoginPin.value)) {
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
  
  const amount = +(inputTransferAmount.value);
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

  const loanAmount = Math.round(inputLoanAmount.value);
  
  // deposit greater than Loan - depGreLoan
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
  if (inputCloseUsername.value === currentAccount.username && +(inputClosePin.value) === currentAccount.pin) {
    
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

// ------------------------- CONVERTING AND CHECKING NUMBERS ----------------------------

/*
console.log(23 === 23.0); // true. 
// There is only one data type for all numbers. All numbers are stored in the 64 base 2 format. Binary -> in the forms of 1s and 0s

// Converting strings to numbers
console.log(Number('23')); // 23
console.log(+'23');   // 23

// Parsing
console.log(Number.parseInt('30px')); // 30. NOTE: The string must start with a number.
console.log(parseInt('e30px')); // NaN

console.log(Number.parseFloat('2.5rem')); // 2.5 - Use for decimals
console.log(Number.parseInt('2.5rem')); // 2

// To check if any value is a number or not
// The isNan function returns boolean value 'true' if the given value is a number with value NaN. Otherwise, false.
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN('today')) // false
console.log(Number.isNaN('20')) // false
console.log(Number.isNaN('20px')) // false
console.log(Number.isNaN(+'20X')) // true

console.log('----------------------------------------------------------');

// The isNaN function can be very confusing, hence to check if a value is a number or not, we make use of the isFinite function as shown below:
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')) // false
console.log(Number.isFinite('today')) // false
console.log(Number.isFinite('20px')) // false
console.log(Number.isFinite(+'20')) // true
console.log(Number.isFinite(23 / 0)) // false

// isInteger()
console.log(Number.isInteger(20)); // true
console.log(Number.isInteger(23.0)); // true
console.log(Number.isInteger(23 / 0)); // false


// ------------------------ MATH AND ROUNDING ------------------------------------------
console.log(Math.sqrt(25)); // 5
console.log(25 ** (1 / 2)); // 5 - An alternative method to calculate square root
console.log(8 ** (1 / 3)); // 2 - Only method to calculate cube root

// Max value - The max value gives the maximum (highest) value from a list of numbers. It does type coercion, but does not parse.
console.log(Math.max(5, 18, 23, 11, 2)); // 23
console.log(Math.max(5, 18, '23', 11, 2)); // 23. Does type coercion
console.log(Math.max(5, 18, '23px', 11, 2)) // NaN. Does not parse

// Min value - The min value gives the minimum (lowest) value from a list of numbers.
console.log(Math.min(5, 18, 23, 11, 2)); // 2

// The Math namespace also has some constants. E.g to calculate the radius of a circle
console.log(Math.PI); // 3.141592653589793
console.log(Math.PI * Number.parseInt('10px') ** 2);

// To generate Random numbers e.g between 0 and 6
console.log(Math.trunc(Math.random() * 6) + 1);


// To generate random integers between two values
const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min;

console.log(randomInt(10, 20));

// ROUNDING INTEGERS
// All the methods below do type coercion
console.log(Math.trunc(23.6757)); // 23 - simply removes any decimal part

console.log(Math.round(23.3)); // 23 - rounds to the nearest integer
console.log(Math.round(23.9)); // 24 - rounds to the nearest integer

// Math.ceil() always rounds up and returns the smaller integer greater than or equal to a given number.
console.log(Math.ceil(23.3)); // 24
console.log(Math.ceil(23.9)); // 24

// Math.floor() method always rounds down and returns the largest integer less than or equal to a given number. 
console.log(Math.floor(23.3)); // 23
console.log(Math.floor(23.9)); // 23

// The floor() method is only similar to the trunc() method in positive numbers only.
console.log(Math.trunc(-23.9)); // -23
console.log(Math.floor(-23.9)); // -24
*/


// ROUNDING FLOATING POINT NUMBERS (DECIMALS)
// The toFixed() method formats a number using fixed-point notation. It returns a STRING, not a NUMBER
console.log((2.7).toFixed(0)); // '3'
console.log((2.7).toFixed(3)); // '2.700'
console.log((2.7345).toFixed(2)); // '2.73'
// Convert to Number
console.log(+(2.7345).toFixed(3)); // 2.735