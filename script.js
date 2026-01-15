
// ===== SELECTING ELEMENTS =====
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeSelect = document.getElementById("type");
const addBtn = document.getElementById("addbtn");

const expenseList = document.getElementById("expense-list");
const incomeList = document.getElementById("income-list");

const totalDisplay = document.getElementById("total");

const clearExpenseBtn = document.getElementById("btn-clear-expense");
const clearIncomeBtn = document.getElementById("btn-clear-income");

// ===== DATA STORAGE =====
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let incomes = JSON.parse(localStorage.getItem("incomes")) || [];

// ===== ADD BUTTON CLICK =====
addBtn.addEventListener("click", () => {
    const description = descriptionInput.value.trim();
    const amount = Number(amountInput.value);
    const type = typeSelect.value;

    // Validation
    if (description === "" || amount <= 0) {
        alert("Please enter valid description and amount");
        return;
    }

    const item = { description, amount };

    if (type === "expense") {
        expenses.push(item);
        saveData();
        renderExpenses();
    } else {
        incomes.push(item);
        saveData();
        renderIncomes();
    }

    updateTotal();
    clearInputs();
});

// ===== RENDER EXPENSES =====
function renderExpenses() {
    expenseList.innerHTML = "";

    expenses.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${item.description}</span>
            <span>-$${item.amount}</span>
        `;
        expenseList.appendChild(li);
    });
}

// ===== RENDER INCOMES =====
function renderIncomes() {
    incomeList.innerHTML = "";

    incomes.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${item.description}</span>
            <span>+$${item.amount}</span>
        `;
        incomeList.appendChild(li);
    });
}

// ===== UPDATE TOTAL =====
function updateTotal() {
    const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
    const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);

    const netTotal = totalIncome - totalExpense;
    totalDisplay.textContent = `$${netTotal}`;
}

// ===== CLEAR INPUTS =====
function clearInputs() {
    descriptionInput.value = "";
    amountInput.value = "";
}

// ===== CLEAR BUTTONS =====
clearExpenseBtn.addEventListener("click", () => {
    expenses = [];
    saveData();
    renderExpenses();
    updateTotal();
});

clearIncomeBtn.addEventListener("click", () => {
    incomes = [];
    saveData();
    renderIncomes();
    updateTotal();
});

// ===== LOCAL STORAGE =====
function saveData() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("incomes", JSON.stringify(incomes));
}

// ===== LOAD DATA ON PAGE LOAD =====
renderExpenses();
renderIncomes();
updateTotal();
