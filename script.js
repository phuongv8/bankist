"use strict";

import users from "./users.json" assert { type: "json" };

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

function displayMovements(movements) {
  movementsContainer.innerHTML = "";

  movements.forEach((move) => {
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

displayMovements(users.account1.movements);
