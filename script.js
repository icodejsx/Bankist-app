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

const displayMovements = function (movements) {
  containerMovements.innerHTML = ' ';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
       <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance}€`;
};

calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outGoing = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outGoing)}€`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * 1.2) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};
calcDisplaySummary(account1.movements);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

// event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  // console.log(currentAccount);
  if (
    currentAccount.pin === Number(inputLoginPin.value) &&
    currentAccount.username === inputLoginUsername.value
  ) {
    labelWelcome.textContent = `welcome Back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
  } else {
    console.log('incorrect login');
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

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr =  ['a', 'b', 'c', 'd', 'e'];

// console.log(arr.slice(2))
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(2, -1));
// console.log([...arr]);

// // Splice
// arr.splice(1,4);
// console.log(arr);
// console.log(arr)

// Reverse

arr = ['a', 'b', 'c', 'd', 'e'];

// for (const movement of movements){
//   if (movement > 0 ) {
//     console.log(`you depossited ${movement}`);
//   } else{
//     console.log(`you withdrew ${Math.abs(movement)}`);
//   }
// }s

//  console.log('--------forEach--------')
// movements.forEach(function (movement) {
//    if (movement > 0) {
//      console.log(`you depossited ${movement}`);
//    } else {
//      console.log(`you withdrew ${Math.abs(movement)}`);
//    }
// })

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map){
//   console.log(`${key} ${value}`);
// })

// // set
// const currencyUnique = new Set(['USD', 'EUR', 'EURB', 'EUR'])
// console.log(currencyUnique);

// currencyUnique.forEach(function (value, key, map){
//   console.log(`${key} ${value}`);
// })

// const checkDogs = function(dogsJulia, dogsKate){
//   const dogsJuliaCorrected = dogsJulia.slice();
//   dogsJuliaCorrected.splice(0, 1);
//   dogsJuliaCorrected.splice(-2);

//   const dogs = [ ...dogsJuliaCorrected, ...dogsKate ]

//   dogs.forEach(function (dog, i) {
//     if (dog >= 3){
//       console.log(`dog number ${i + 1} is an adult and is ${dog} years old`)
//     }else{
//       console.log(`dog number ${i + 1} is still a puppy`)
//     }
//   })
// }
// checkDogs([2,3,4,5,6,7] , [1,2,3,4,5,6,7])

// const eurToUsd = 1.1;

// //  const movementsUsd = movements.map(function (move ){
// //   return move * eurToUsd;
// // });
//  const movementsUsd = movements.map(move => move * eurToUsd);

// console.log(movements);
// console.log(movementsUsd);

// const movementsUsdFor =[]
// for(const mov of movements) movementsUsdFor.push( mov * eurToUsd);
// console.log(movementsUsdFor);

// movements.map((mov, i, arr) => {

// })

// const deposits = movements.filter(function(mov){
//   return mov > 0
// })

// console.log(movements);
// console.log(deposits);

// const depositsFor = [];
// for (const mov of movements) if (mov > 0)  depositsFor.push(mov);
// console.log(depositsFor)

// const withdrawals = [];
// for (const mov of movements) if (mov < 0) withdrawals.push(mov);
// console.log(withdrawals)

// console.log(movements)

// // accumulator is like a snowball
// const balance = movements.reduce((acc, cur,) => acc + cur
// , 0 )

// console.log(balance)

// let blance2 = 0 ;
// for(const mov of movements) blance2 += mov;
// console.log(blance2);

// // maxiom value
// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) return acc;
//   else return mov;
// },movements[0])
// console.log(max);

// const eurToUsd = 1.1;

// // PIPLINE
//  const totalDepositUsd = movements
//    .filter(mov => mov > 0)
//    .map(mov => mov * eurToUsd)
//    .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositUsd)

const firstWithdraw = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdraw);

console.log(accounts);

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

for (const account of accounts) {
  if (account.owner === 'Jessica Davis') {
    console.log(account);
  }
}
