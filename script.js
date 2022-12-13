"use strict";

const appContainer = document.querySelector(".app");
const movementsContainer = document.querySelector(".movements");

const welcomeLabel = document.querySelector(".welcome");
const timerLabel = document.querySelector(".timer");
const dateLabel = document.querySelector(".date");
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
  movementsDates: [
    "2021-11-18T21:31:17.178Z",
    "2021-12-23T07:42:02.383Z",
    "2022-01-28T09:15:04.904Z",
    "2022-04-01T10:17:24.185Z",
    "2022-12-01T14:11:59.604Z",
    "2022-12-08T17:01:17.194Z",
    "2022-12-10T23:36:17.929Z",
    "2022-12-11T10:51:36.790Z",
  ],
  username: "ap",
  password: 1111,
};
const account2 = {
  fullName: "Banana Chip",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  movementsDates: [
    "2021-11-18T21:31:17.178Z",
    "2021-12-23T07:42:02.383Z",
    "2022-01-28T09:15:04.904Z",
    "2022-04-01T10:17:24.185Z",
    "2022-05-08T14:11:59.604Z",
    "2022-07-26T17:01:17.194Z",
    "2022-07-28T23:36:17.929Z",
    "2022-08-01T10:51:36.790Z",
  ],
  username: "bc",
  password: 2222,
};
const account3 = {
  fullName: "Coconut Milk",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  movementsDates: [
    "2021-11-18T21:31:17.178Z",
    "2021-12-23T07:42:02.383Z",
    "2022-01-28T09:15:04.904Z",
    "2022-04-01T10:17:24.185Z",
    "2022-05-08T14:11:59.604Z",
    "2022-07-26T17:01:17.194Z",
    "2022-07-28T23:36:17.929Z",
    "2022-08-01T10:51:36.790Z",
  ],
  username: "cm",
  password: 3333,
};

let accounts = [account1, account2, account3];
let userMovements;
let currentAccount;
let sorted = false;

const formatDate = function (date) {
  const dayPassed = Math.round(
    Math.abs(new Date() - date) / (1000 * 60 * 60 * 24)
  );

  if (dayPassed == 0) return "Today";
  else if (dayPassed <= 7) return `${dayPassed} days ago`;
  else {
    const day = `${date.getDate()}`.padStart(2, 0); // print format: 02/08/2022
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }
};

function displayMovements(account, sorted = false) {
  movementsContainer.innerHTML = "";

  const allMoves = sorted
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  allMoves.map((move, i) => {
    const type = move > 0 ? "deposit" : "withdrawal";

    const date = new Date(account.movementsDates[i]);
    const displayDate = formatDate(date);

    const html = `
        <div class="movements-row">
            <div class="movements-type movements-type-${type}">${type}</div>
            <div class="movement-date">${displayDate}</div>
            <div class="movement-value">${move.toFixed(2)}</div>
        </div>
        `;

    movementsContainer.insertAdjacentHTML("afterbegin", html);
  });
}

function displayTotalBalance(account) {
  account.balance = account.movements.reduce((acc, cur) => acc + cur, 0);
  balanceValue.textContent = `$${account.balance.toFixed(2)}`;
}

function displaySummary(account) {
  let movements = account.movements;
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

  summaryIn.textContent = `$${deposits.toFixed(2)}`;
  summaryOut.textContent = `$${Math.abs(withdrawals).toFixed(2)}`;
  summaryInterest.textContent = `$${interest.toFixed(2)}`;
}

function updateUI(account) {
  displayMovements(account);
  displayTotalBalance(account);
  displaySummary(account);
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
    inputLoginPassword.value = inputLoginUsername.value = "";
    updateUI(currentAccount);
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    const locale = navigator.language; // based on language in your browser
    dateLabel.textContent =
      new Intl.DateTimeFormat(locale, {
        dateStyle: "long",
      }).format(now) +
      " at " +
      new Intl.DateTimeFormat(locale, {
        timeStyle: "short",
      }).format(now);
  } else {
    // TODO Error message
    console.log("wrong username or password/account does not exist");
  }
}

function transferMoney(e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiver = accounts.find(
    (account) => account.fullName === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    receiver &&
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiver.username != currentAccount.username
  ) {
    receiver.movements.push(amount);
    currentAccount.movements.push(-amount);

    receiver.movementsDates.push(new Date().toISOString());
    currentAccount.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
  } else {
    // TODO Error message
    console.log("error");
  }
}

// TODO Loan tag separate from deposit (curr prob: users can keep requesting loan)
function requestLoan(e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.balance >= amount * 3.5) {
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
  } else {
    // TODO Error message
    console.log("error");
  }
  inputLoanAmount.value = "";
}

function closeAccount(e) {
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.password === Number(inputClosePassword.value)
  ) {
    accounts = accounts.filter(
      (account) => account.username !== currentAccount.username
    );
    console.log(accounts);
    appContainer.style.opacity = 0;
  } else {
    // TODO Error message
    console.log("not match");
  }
  inputCloseUsername.value = inputClosePassword.value = "";
}

function sortMovements(e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
}

btnLogin.addEventListener("click", login);
btnTransfer.addEventListener("click", transferMoney);
btnLoan.addEventListener("click", requestLoan);
btnClose.addEventListener("click", closeAccount);
btnSort.addEventListener("click", sortMovements);
