/// Declaring the Materials ///
const Discription = document.getElementById("Discription");
const amount = document.getElementById("amount");
const addbtn = document.getElementById("addbtn");
const type = document.getElementById("type");
const expenseList = document.getElementById("expense-list");
const incomeList = document.getElementById("income-list");
const expenseClear = document.getElementById("btn-clear");
const incomeClear = document.getElementById("btn-clear-income");
const total = document.getElementById("total");

/// Data storage ///
let expenses = [];
let incomes = [];
let totalExpense = 0;
let totalIncome = 0;

/// ADD BUTTON ///
addbtn.addEventListener("click", function () {
  let dataValues = {
    Discription: Discription.value,
    amount: Number(amount.value),
    type: type.value
  };

  // if (!dataValues.Discription || !dataValues.amount) return;

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

/// UPDATE LIST (WITH DOUBLE CLICK EDIT) ///
function updateList() {
  expenseList.innerHTML = "";
  incomeList.innerHTML = "";

  expenses.forEach(function (expense, index) {
    let li = document.createElement("li");
    li.textContent = `${expense.Discription} = $${expense.amount}`;

    li.addEventListener("dblclick", function () {
      editTheList("expense", index);
    });

    expenseList.appendChild(li);
  });

  incomes.forEach(function (income, index) {
    let li = document.createElement("li");
    li.textContent = `${income.Discription} = $${income.amount}`;

    li.addEventListener("dblclick", function () {
      editTheList("income", index);
    });

    incomeList.appendChild(li);
  });
}

/// EDIT FUNCTION ///
function editTheList(type, index) {
  let list = type === "expense" ? expenses : incomes;
  let item = list[index];

  let newDescription = prompt("Edit description:", item.Discription);
  if (newDescription === null) return;

  let newAmount = prompt("Edit amount:", item.amount);
  if (newAmount === null || isNaN(newAmount)) return;

  newAmount = Number(newAmount);

  if (type === "expense") {
    totalExpense = totalExpense - item.amount + newAmount;
  } else {
    totalIncome = totalIncome - item.amount + newAmount;
  }

  item.Discription = newDescription;
  item.amount = newAmount;

  updateList();
  updateTotal();
  saveToLocalStorage();
}

/// UPDATE TOTAL ///
function updateTotal() {
  const netIncome = totalIncome - totalExpense;
  total.textContent = netIncome;
}

/// HIDE CLEAR BUTTONS ///
function clearHide() {
  expenseClear.style.display = expenses.length ? "inline-block" : "none";
  incomeClear.style.display = incomes.length ? "inline-block" : "none";
}

/// LOCAL STORAGE SAVE ///
function saveToLocalStorage() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  localStorage.setItem("incomes", JSON.stringify(incomes));
  localStorage.setItem("totalExpense", totalExpense);
  localStorage.setItem("totalIncome", totalIncome);
}

/// LOAD FROM LOCAL STORAGE ///
function loadFromLocalStorage() {
  expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  incomes = JSON.parse(localStorage.getItem("incomes")) || [];
  totalExpense = Number(localStorage.getItem("totalExpense")) || 0;
  totalIncome = Number(localStorage.getItem("totalIncome")) || 0;

  updateList();
  updateTotal();
  clearHide();
}

/// CLEAR BUTTONS ///
expenseClear.addEventListener("click", function () {
  expenses = [];
  totalExpense = 0;
  updateList();
  updateTotal();
  clearHide();
  saveToLocalStorage();
});

incomeClear.addEventListener("click", function () {
  incomes = [];
  totalIncome = 0;
  updateList();
  updateTotal();
  clearHide();
  saveToLocalStorage();
});

/// INIT ///
loadFromLocalStorage();
clearHide();
