"use strict";

const appContainer = document.querySelector(".app");
const movementsContainer = document.querySelector(".movements");

const welcomeLabel = document.querySelector(".welcome");
const timerLabel = document.querySelector(".timer");
const balanceDate = document.querySelector(".date");
const balanceValue = document.querySelector(".balance-value");

const summaryIn = document.querySelector(".summary-value-in");
const summaryOut = document.querySelector(".summary-value-out");
const summaryInterest = document.querySelector(".summary-value-interest");

const btnLogin = document.querySelector(".btn-login");
const btnSort = document.querySelector(".btn-sort");
const btnTransfer = document.querySelector(".btn-form-transfer");
const btnLoan = document.querySelector(".btn-form-loan");
const btnClose = document.querySelector(".btn-form-close");

const inputLoginUsername = document.querySelector(".login-input-user");
const inputLoginPassword = document.querySelector(".login-input-password");
const inputTransferTo = document.querySelector(".form-input-to");
const inputTransferAmount = document.querySelector(".form-input-amount");
const inputLoanAmount = document.querySelector(".form-input-loan");
const inputCloseUsername = document.querySelector(".form-input-user");
const inputClosePassword = document.querySelector(".form-input-password");

const account1 = {
  fullName: "Apple Pie",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  username: "ap",
  password: 1111,
};
const account2 = {
  fullName: "Banana Chip",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  username: "bc",
  password: 2222,
};
const account3 = {
  fullName: "Coconut Milk",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  username: "cm",
  password: 3333,
};
const account4 = {
  fullName: "Mango Juice",
  movements: [430, 1000, 700, 50, 90],
  username: "mj",
  password: 4444,
};

const accounts = [account1, account2, account3, account4];

let userMovements = account1.movements;
let currentAccount;
let balance;

function displayMovements(movements) {
  movementsContainer.innerHTML = "";

  movements.map((move) => {
    const type = move > 0 ? "deposit" : "withdrawal";

    const html = `
        <div class="movements-row">
            <div class="movements-type movements-type-${type}">${type}</div>
            <div class="movement-date">11/11/2022</div>
            <div class="movement-value">${move}</div>
        </div>
        `;

    movementsContainer.insertAdjacentHTML("afterbegin", html);
  });
}

function displayTotalBalance(movements) {
  balance = movements.reduce((acc, cur) => acc + cur, 0);
  balanceValue.textContent = `$${balance}`;
}

function displaySummary(movements) {
  const deposits = movements
    .filter((move) => move > 0)
    .reduce((acc, cur) => acc + cur, 0);

  const withdrawals = movements
    .filter((move) => move < 0)
    .reduce((acc, cur) => acc + cur, 0);

  const interest = movements
    .filter((move) => move > 0)
    .map((deposit) => (deposit * 3) / 100)
    .reduce((acc, cur) => acc + cur, 0);

  summaryIn.textContent = `$${deposits}`;
  summaryOut.textContent = `$${Math.abs(withdrawals)}`;
  summaryInterest.textContent = `$${interest.toFixed(2)}`;
}

function updateUI(account) {
  userMovements = account.movements;
  displayMovements(userMovements);
  displayTotalBalance(userMovements);
  displaySummary(userMovements);
}

function login(e) {
  e.preventDefault(); // prevent submitting form

  currentAccount = accounts.find(
    (account) => account.username === inputLoginUsername.value
  );

  // if currentAccount exist, check password
  if (currentAccount?.password === Number(inputLoginPassword.value)) {
    appContainer.style.opacity = 1;
    welcomeLabel.textContent = `Welcome back, ${currentAccount.fullName}`;
    inputLoginPassword.value = "";
    inputLoginUsername.value = "";

    updateUI(currentAccount);
  }
}

function transfer(e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiver = accounts.find(
    (account) => account.fullName === inputTransferTo.value
  );

  if (
    receiver &&
    amount > 0 &&
    balance >= amount &&
    receiver.username != currentAccount.username
  ) {
    receiver.movements.push(amount);
    currentAccount.movements.push(0 - amount);
    updateUI(currentAccount);
  } else {
    console.log("error");
  }
}

btnLogin.addEventListener("click", login);
btnTransfer.addEventListener("click", transfer);
// const max = userMovements.reduce((acc, cur) => {
//   return acc > cur ? acc : cur;
// }, userMovements[0]);

// console.log(currentAccount);
