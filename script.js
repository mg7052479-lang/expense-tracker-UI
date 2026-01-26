const Discription = document.getElementById("Discription");
const amount = document.getElementById("amount");
const addbtn = document.getElementById("addbtn");
const type = document.getElementById("type");
const expenseList = document.getElementById("expense-list");
const incomeList = document.getElementById("income-list");
const expenseClear = document.getElementById("btn-clear");
const incomeClear = document.getElementById("btn-clear-income");
const total = document.getElementById("total");

let expenses = [];
let incomes = [];
let totalExpense = 0;
let totalIncome = 0;


function saveToLocalStorage() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  localStorage.setItem("incomes", JSON.stringify(incomes));
  localStorage.setItem("totalExpense", totalExpense);
  localStorage.setItem("totalIncome", totalIncome);
}


function loadFromLocalStorage() {
  expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  incomes = JSON.parse(localStorage.getItem("incomes")) || [];
  totalExpense = Number(localStorage.getItem("totalExpense")) || 0;
  totalIncome = Number(localStorage.getItem("totalIncome")) || 0;

  updateList();
  updateTotal();
  clearHide();
}


addbtn.addEventListener("click", function () {
  let dataValues = {
    Discription: Discription.value.trim(),
    amount: Number(amount.value),
    type: type.value,
  };

  if (!dataValues.Discription || !dataValues.amount) return;

  if (dataValues.type === "expense") {
    expenses.push(dataValues);
    totalExpense += dataValues.amount;
  } else {
    incomes.push(dataValues);
    totalIncome += dataValues.amount;
  }

  updateList();
  updateTotal();
  clearHide();
  saveToLocalStorage();

  Discription.value = "";
  amount.value = "";
});



function updateList() {
  expenseList.innerHTML = "";
  incomeList.innerHTML = "";

  expenses.forEach(function (expense) {
    let li = document.createElement("li");
    li.textContent = `${expense.Discription} = $${expense.amount}`;
    expenseList.appendChild(li);
  });

  incomes.forEach(function (income) {
    let li = document.createElement("li");
    li.textContent = `${income.Discription} = $${income.amount}`;
    incomeList.appendChild(li);
  });
}


function updateTotal() {
  const netIncome = totalIncome - totalExpense;
  total.textContent = netIncome;
}


function clearHide() {
  expenseClear.style.display =
    expenses.length > 0 ? "inline-block" : "none";

  incomeClear.style.display =
    incomes.length > 0 ? "inline-block" : "none";
}


if (expenseClear) {
  expenseClear.addEventListener("click", function () {
    expenses = [];
    totalExpense = 0;

    updateList();
    updateTotal();
    clearHide();
    saveToLocalStorage();
  });
}

if (incomeClear) {
  incomeClear.addEventListener("click", function () {
    incomes = [];
    totalIncome = 0;

    updateList();
    updateTotal();
    clearHide();
    saveToLocalStorage();
  });
}


loadFromLocalStorage();
