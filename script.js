"use strict";

const resetBtn = document.getElementById("resetBtn");
const billInput = document.getElementById("billInput");
const numOfPeople = document.getElementById("numOfPeople");
const customTipAmount = document.getElementById("cutsomInput");
const perPerson = document.getElementById("perPerson");
const perPersonTotal = document.getElementById("perPersonTotal");
const btn = document.querySelectorAll(".btn");
const hidden = document.querySelector(".visible");

// Button values 5% 10% ect
const tipObj = {
  A: 0.05,
  B: 0.1,
  C: 0.15,
  D: 0.25,
  F: 0.5,
};

const calculateBill = () => {
  if (billInput.value || numOfPeople.value || customTipAmount.value) {
    resetBtn.classList.remove("btn__reset--disabled");
    resetBtn.classList.add("btn__reset--active");
  }
  // If We entter the custom tip %
  if (customTipAmount.value) {
    // Get values from the input
    // Numberr() converts the String to a Num
    const bill = Number(billInput.value);
    const people = Number(numOfPeople.value);
    const customTip = Number(customTipAmount.value) / 100;

    // Calculate the TipAmount per Person
    if (people === 0 || people < 0) {
      // Shows the error message
      hidden.style.visibility = "visible";
      numOfPeople.style.border = "2px solid red";
    }
    // If we didn't enter the custom tip %
    else {
      // Hide the error message
      hidden.style.visibility = "hidden";
      numOfPeople.style.border = "0px";

      const tipAmount = (bill * customTip) / people;

      perPerson.innerText = `$${tipAmount.toFixed(2).toLocaleString("en-US")}`;

      // Calculate the Total Amount
      const total = tipAmount + bill / people;

      // I am using the toLocaleString("en-US") cuz it gives you the 1,000 $ seperation
      perPersonTotal.innerText = `$${total.toFixed(2).toLocaleString("en-US")}`;
    }
  } else {
    btn.forEach((btn) =>
      btn.addEventListener("click", function () {
        if (numOfPeople.value <= 0) {
          // Shows the error message
          hidden.style.visibility = "visible";
          numOfPeople.style.border = "2px solid red";
        } else {
          // Hides the error message
          hidden.style.visibility = "hidden";
          numOfPeople.style.border = "0px";
          // Basic logic starts
          let val = btn.value;
          // tipObj[val] takes the Button values
          // value A = 0.05 ect
          let tipVal = parseFloat(Number(billInput.value) * tipObj[val]);
          let billFinal = Number(billInput.value) + tipVal;
          let tipAmount = tipVal / Number(numOfPeople.value);
          let total = billFinal / Number(numOfPeople.value);
          perPerson.innerText = `$${tipAmount
            .toFixed(2)
            .toLocaleString("en-US")}`;
          perPersonTotal.innerText = `$${total
            .toFixed(2)
            .toLocaleString("en-US")}`;
        }
      })
    );
  }
};

// Typical reset button
// nothing special
resetBtn.addEventListener("click", function (event) {
  event.preventDefault();
  billInput.value = "";
  numOfPeople.value = "";
  customTipAmount.value = "";
  perPerson.textContent = "$0.00";
  perPersonTotal.textContent = "$0.00";
  hidden.style.visibility = "hidden";
  numOfPeople.style.border = "none";

  //  Setting the reset button to default class
  resetBtn.classList.remove("btn__reset--active");
  resetBtn.classList.add("btn__reset--disabled");
});
