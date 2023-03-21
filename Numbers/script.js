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
    '2023-02-27T17:01:17.194Z',
    '2023-03-14T23:36:17.929Z',
    '2023-03-17T10:51:36.790Z',
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
    '2023-03-17T12:01:20.894Z',
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

const formatMovementDates = function (date) {
    
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 3600 * 24)) ;
    //const soon = daysPassed ===

   

    const daysPassed = calcDaysPassed(date, new Date());
    // const calcDaysPassed1 = function (date1, date2) {
    //   return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
    // }
    //  console.log(calcDaysPassed1(new Date(), new Date(2023, 2, 18)))

    if (daysPassed === 0) return "Today";
    if (daysPassed === 1) return "Yesterday";
    if (daysPassed <= 7) return `${daysPassed} days ago`;
    else {
      const day = `${date.getDate()}`.padStart(2, 0);
      const month = `${date.getMonth() + 1}`.padStart(2, 0);
      const year = date.getFullYear();
      const hour = `${date.getHours()}`.padStart(2, 0);
      const mins = `${date.getMinutes()}`.padStart(2, 0);

      return `${day}/${month}/${year}`;
    }
    

    
     
}
const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = " ";

  // creating a shallow copy of the array.
  const movs = sort ? account.movements.slice().sort((a, b) => a - b) : account.movements
  
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(account.movementsDates[i]);
    const displayDate = formatMovementDates(date)
    
    // const daysPassed = calcDaysPassed(new Date(), displayDate);
    // console.log(daysPassed);
    
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">${displayDate}</div>
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
  displayMovements(currentAccount);

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

    // Creating new dates
    const currentDate = new Date();
    
    // day/month/year
    const day = `${currentDate.getDate()}`.padStart(2, 0);
    const month = `${currentDate.getMonth() + 1}`.padStart(2, 0);
    const year = currentDate.getFullYear();
    const hour = `${currentDate.getHours()}`.padStart(2, 0);
    const mins = `${currentDate.getMinutes()}`.padStart(2, 0);

    labelDate.textContent =`${day}/${month}/${year}, ${hour}:${mins}`;
   
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

    // Adding transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAccount.movementsDates.push(new Date().toISOString());

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
  
    // console.log(loanAmount, depGreLoan);

  if (loanAmount > 0 && depGreLoan) {
    setTimeout(() => {
      currentAccount.movements.push(loanAmount);

    // Adding Loan Date
    currentAccount.movementsDates.push(new Date().toISOString())

    updateUI(currentAccount);
    }, 10000);
    // currentAccount.movements.push(loanAmount);

    // // Adding Loan Date
    // currentAccount.movementsDates.push(new Date().toISOString())
    
  }


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

  displayMovements(currentAccount, !sorted);
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
/*
console.log((2.7).toFixed(0)); // '3'
console.log((2.7).toFixed(3)); // '2.700'
console.log((2.7345).toFixed(2)); // '2.73'
// Convert to Number
console.log(+(2.7345).toFixed(3)); // 2.735


// --------------------------- THE REMAINDER OPERATOR -------------------------------------
// Used to check if a number is even or odd.
console.log(8 % 3); // 2

// const isEven = function (n) {
//   return n % 2 === 0;
// }

const isEven = n => n % 2 === 0
console.log(isEven(8)); // True
console.log(isEven(23)); // False
console.log(isEven(17)); // False
console.log(isEven(10)); // True

labelBalance.addEventListener('click', function (e) {
  e.preventDefault();
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orange';
  })
})

// ------------------------- NUMERIC SEPARATORS -------------------------------------
// 287460000000
const diameter = 287_460_000_000;
console.log(diameter); // 28760000000

const price = 345_99
console.log(price); //34599

console.log(Number('230000')); // 230_000
console.log(Number('230_000')); // NaN - should not be used with strings.
*/

// -------------------- BIGINT -----------------------------------------
// Numbers in JS are represented internally as 64 bits, meaning there are exactly 64 1's or 0's to represent any given number. Out of these 64 bits, only 53 bits are used to store the numbers themselves. The remaining bits are used to store the position of the decimal point and and the sign.

/*
console.log((2 ** 53) - 1); // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991

// Any number greater than 9007199254740991 cannot be accurately represented by JS. And This is where BigInt comes in.
console.log(452318976243461866292185315272290n);
console.log(BigInt(45231897624346)); // Use for small numbers

// Operations
console.log(100000000n + 152773763789973583973664n);
console.log(635472637868277387832638463873n * 56357647254783627476n);

const huge = 8928873526789029876536781900987654323456890n  ;
const num = 20;

// console.log(huge + num); // Error!. Cannot mix BigInt with other types
console.log(huge + BigInt(num)); // Correct

// Exceptions
console.log(20n > 15); // true
console.log(20n === 20); // false because they have different primitive type.
console.log(20n == 20); // true - because of type coercion

console.log(typeof(20)); // number
console.log(typeof(20n)) // bigint

console.log(huge + ' is a really big value');

// Divisions
console.log(10 / 3); // 3.33333333
console.log(13n / 3n); // 3n - returns the nearest bigint
*/


// --------------------------------- CREATING DATES ---------------------------------------------

// Create a date
/*
const now = new Date();
console.log(now);

console.log(new Date('Mar 13 2023 09:51:48'));
console.log(new Date('May 13, 2003'));
console.log(new Date (account1.movementsDates[0]));

// We can also pass in year, month, date, hour, minute, and seconds. For months, Javascript is zero-based, hence 0 is January etc..
console.log(new Date(2027, 10, 23, 14, 35, 9)); // Tue Nov 23 2027 14:35:09 GMT+0100 (West Africa Standard Time)
console.log(new Date(2027, 10, 31, 14, 35, 9)); // Wed Dec 01 2027 14:35:09 GMT+0100 (West Africa Standard Time)

// Beginning of Unix time - January 1, 1970. We can also pass milliseconds into the new Date function to show how long after the Unix time

// To calculate 3 days after the Unix time
console.log(new Date(3 * 24 * 3600 * 1000)); // Sun Jan 04 1970 01:00:00 GMT+0100 (West Africa Standard Time)


// Dates are a special type of objects, hence they have their own methods.
const futureDate = new Date(2027, 10, 23, 14, 35);
console.log(futureDate);
console.log(futureDate.getFullYear()); // 2027
console.log(futureDate.getMonth()); // 10 - remember this is zero based. So 10 is Novemeber
console.log(futureDate.getDate()); // 23
console.log(futureDate.getDay()); // 2 (Tuesday)- this is the day of the week. This is zero-based too.
console.log(futureDate.getHours()); // 14
console.log(futureDate.getMinutes()); // 35
console.log(futureDate.getSeconds()); // 0
console.log(futureDate.getMilliseconds());

console.log(futureDate.toDateString()); // Tue Nov 23 2027
console.log(futureDate.toISOString()); // 2027-11-23T13:35:00.000Z
console.log(futureDate.getTime()); // 1826976900000 - the timestamp is the no of milliseconds after the UNIX time

console.log(new Date(1826976900000)); // Tue Nov 23 2027 14:35:00 GMT+0100 (West Africa Standard Time)


// To get the current timestamp
console.log(Date.now()); // 1678917408912

futureDate.setFullYear(2040);
console.log(futureDate); // Fri Nov 23 2040 14:35:00 GMT+0100 (West Africa Standard Time)
*/

// ---------------------- OPERATIONS ON DATES -----------------------------------------

const futureDate = new Date(2027, 10, 23, 14, 35);
console.log(Number(futureDate)); // 1826976900000 - timestamp in milliseconds
console.log(+futureDate); // 1826976900000

// We can subtract days from each other to calculate how many days has passed between them.

// Normal function
const calcDaysPassed1 = function (date1, date2) {
  return (date2 - date1) / (1000 * 60 * 60 * 24);
}
const daysPassed1 = calcDaysPassed1(new Date(2022, 11, 20), new Date(2023, 2, 15));
console.log(daysPassed1); // 85.

// Arrow function
const calcDaysPassed2 = (date1, date2) => Math.abs(date2 - date1) / (1000 * 3600 * 24)
const daysPassed2 = calcDaysPassed2(new Date(2023, 2, 15), new Date(2022, 11, 20));
console.log(daysPassed2); // 85


// ------------------ TIMERS: SETTIMEOUT & SETINTERVAL --------------------------------------

// setTimeOut - runs just once after a defined time
// setInterval - keeeps running until we stop it.

/*
setTimeout((ingr1, ingr2) => {
  console.log(`Here is your pizza 🍕 with ${ingr1} and ${ingr2}`);
}, 3000, 'olives', 'spinach'); // Here is your pizza with olives and spinach.
console.log('waiting.......');
*/

// You can also clear the timer or cancel the timer so that the function doesn't execute anymore
const ingredients = ['onions', 'salt', 'crayfish', 'pepper']
const spaghTimer = setTimeout((ing1, ing2, ing3, ing4) => {
  console.log(`Here is your spaghetti 🍝 with ${ing1}, ${ing2}, ${ing3} and ${ing4}`);
}, 3000, ...ingredients);

console.log("Waiting...");
// To clear timer
if (ingredients.includes('crayfish')) {
  clearTimeout(spaghTimer);
}



