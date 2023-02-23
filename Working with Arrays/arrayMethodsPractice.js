'use strict';

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

//1. Calculate total amount that has been deposited in the bank from all accounts.
const bankDepositSum = accounts
    // .map(account => account.movements)
    // .flat()
    .flatMap(account => account.movements)
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
    
console.log(bankDepositSum);

// 2. How many deposits with at least $1,000

// const numDeposits1000 = accounts
//     .flatMap(account => account.movements)
//     .filter(mov =>  mov >= 1000)
//     .length;

// Using the Reduce Method
const numDeposits1000 = accounts
    .flatMap(account => account.movements)
    .reduce((acc, mov) => mov >= 1000 ? ++acc : acc, 0);

console.log(numDeposits1000);

// 3. Create an object which contains the sum of the deposits and of the withdrawals using the reduce method

const sums = accounts
    .flatMap(account => account.movements)
    .reduce((acc, mov) => {
        mov > 0 ? acc.deposit += mov : acc.withdrawal += mov;
        return acc;
    }, {deposit: 0, withdrawal: 0})

console.log(sums);