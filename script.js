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

let accounts = [account1, account2, account3, account4];
let userMovements;
let currentAccount;

function displayMovements(movements, sorted = false) {
  movementsContainer.innerHTML = "";

  const allMoves = sorted ? movements.slice().sort((a, b) => a - b) : movements;

  allMoves.map((move) => {
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

function displayTotalBalance(account) {
  account.balance = account.movements.reduce((acc, cur) => acc + cur, 0);
  balanceValue.textContent = `$${account.balance}`;
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
  displayTotalBalance(account);
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
    inputLoginPassword.value = inputLoginUsername.value = "";
    updateUI(currentAccount);
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

function sortMovements() {
  displayMovements(currentAccount.movements, true);
}

btnLogin.addEventListener("click", login);
btnTransfer.addEventListener("click", transferMoney);
btnLoan.addEventListener("click", requestLoan);
btnClose.addEventListener("click", closeAccount);
btnSort.addEventListener("click", sortMovements);
