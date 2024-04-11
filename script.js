let formCont = document.querySelector(".form-container form");
let body = document.querySelector("body");

let outWind = document.querySelector(".resultDec");
let res = document.querySelector(".resultDec p");

let err1 = document.querySelector("#e1");
let err2 = document.querySelector("#e2");
let err3 = document.querySelector("#e3");

function produceOutput(grossIncome, extraIncome, deductions) {
  let ageGroup = document.querySelector("#age").value;
  let overallIncome = grossIncome + extraIncome - deductions;
  let tax = 0;
  if (overallIncome <= 800000) {
    tax = 0;
  } else {
    if (ageGroup === "less40") {
      tax = 0.3 * overallIncome;
    } else if (ageGroup === "40to60") {
      tax = 0.4 * overallIncome;
    } else if (ageGroup === "greater60") {
      tax = 0.1 * overallIncome;
    }
  }
  overallIncome -= tax;

  err1.style.visibility = "hidden";
  err2.style.visibility = "hidden";
  err3.style.visibility = "hidden";
  outWind.style.visibility = "visible";
  body.style.visibility = "collapse";
  res.innerHTML = `Your Overall Income will be <br> Rs. ${overallIncome}`;
}

function checkInput() {
  if (!Number.isInteger(parseInt(grossIncome.value))) {
    err1.style.visibility = "visible";
  } else {
    err1.style.visibility = "hidden";
  }
  if (!Number.isInteger(parseInt(extraIncome.value))) {
    err2.style.visibility = "visible";
  } else {
    err2.style.visibility = "hidden";
  }
  if (!Number.isInteger(parseInt(deductions.value))) {
    err3.style.visibility = "visible";
  } else {
    err3.style.visibility = "hidden";
  }

  if (
    Number.isInteger(grossIncome) &&
    Number.isInteger(extraIncome) &&
    Number.isInteger(deductions)
  ) {
    produceOutput(grossIncome, extraIncome, deductions);
  } else {
    checkInput();
  }
}

formCont.addEventListener("submit", function (event) {
  event.preventDefault();

  // Getting user input
  let grossIncome = parseInt(document.querySelector("#grossIncome").value);
  let extraIncome = parseInt(document.querySelector("#extraIncome").value);
  let deductions = parseInt(document.querySelector("#deductions").value);

  // check if input is integer or not

  if (
    Number.isInteger(grossIncome) &&
    Number.isInteger(extraIncome) &&
    Number.isInteger(deductions)
  ) {
    produceOutput(grossIncome, extraIncome, deductions);
  } else {
    console.log("sorry wrong input");
    checkInput();
  }
});
function format() {
  document.querySelector("#grossIncome").value = "";
  document.querySelector("#extraIncome").value = "";
  document.querySelector("#age").value = "";
  document.querySelector("#deductions").value = "";
}

let closeBtn = document.querySelector(".closeBtn");

closeBtn.addEventListener("click", function () {
  outWind.style.visibility = "collapse";
  body.style.visibility = "visible";
  body.classList.remove("output");
  format();
});
