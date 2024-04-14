document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("taxForm");
  const modal = document.getElementById("resultModal");
  const closeModal = document.getElementById("closeModal");
  const taxResult = document.getElementById("taxResult");

  
  

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    hideErrorIcons();
    const age = document.getElementById("age").value;
    const income = parseFloat(document.getElementById("income").value);
    const extraIncome =parseFloat(document.getElementById("extraIncome").value) ; 
    const deductions =parseFloat(document.getElementById("deductions").value) ;


    if (isNaN(income) || income <= 0) {
      showError("income", "Enter a valid income amount");
      return;
    }
    if (isNaN(extraIncome) || extraIncome < 0) {
      showError("extraIncome", "Enter a valid extra income amount");
      return;
    }
    

    if (!age) {
      showError("age", "Age is required");
      return;
    }

    // Tax Calculation
    let tax = 0;
    const taxableIncome = income + extraIncome - deductions - 800000;

    if (age === "below-40" && taxableIncome > 0) {
      tax = taxableIncome * 0.3;
    } else if (age === "40-to-59" && taxableIncome > 0) {
      tax = taxableIncome * 0.4;
    } else if (age === "60-plus" && taxableIncome > 0) {
      tax = taxableIncome * 0.1;
    }

    tax = Math.max(0, tax); // Ensure tax is not negative
    const overallIncome =  (income + extraIncome - deductions) - tax;
    taxResult.textContent = `Your Overall Income will be ₹${overallIncome.toFixed(2)}`;
  showModal();
  });

  closeModal.addEventListener("click", function () {
    closeModalFunc();
  });

  function showModal() {
    modal.style.display = "block";
  }

  function closeModalFunc() {
    modal.style.display = "none";
  }

  function showError(field, message) {
    const errorIcon = document.getElementById(`${field}ErrorIcon`);
    errorIcon.style.display = "inline";
    errorIcon.setAttribute("title", message);
  }

  function hideErrorIcons() {
    const errorIcons = document.querySelectorAll(".error-icon");
    errorIcons.forEach((icon) => {
      icon.style.display = "none";
    });
  }
});
