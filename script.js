/// Declearing the Matrials // 

const Discription = document.getElementById("Discription")
const amount = document.getElementById("amount")
const addbtn = document.getElementById("addbtn")
const type = document.getElementById("type")
const expenseList = document.getElementById("expense-list")
const incomeList = document.getElementById("income-list")
const expenseClear = document.getElementById("btn-clear")
const incomeClear = document.getElementById("btn-clear-income")
const total = document.getElementById("total")

// storing data // 
 let expenses = [];
 let incomes = [];
 let totalExpense = 0;
 let totalIncome = 0 ;

 // add event to add button //

 addbtn.addEventListener("click", function(){
   let dataValues = {
      Discription:Discription.value,
      amount:Number(amount.value),
      type:type.value
   }
    
   if(!dataValues.Discription || !dataValues.amount) return ;
   
   if (dataValues.type === "expense"){
      expenses.push(dataValues);
      totalExpense += dataValues.amount ;
   }
   else {
      incomes.push(dataValues);
      totalIncome += dataValues.amount ;
   }

updateList ();
updateTotal();
clearHide();

   Discription.value = "";
   amount.value = ""; 
 })


 function updateList () {
    expenseList.innerHTML = "";
    incomeList.innerHTML = "";

   expenses.forEach(function (expense) {
      let li = document.createElement("li");
      li.innerHTML = `${expense.Discription} = $${expense.amount}`
      expenseList.appendChild(li);
   });

   incomes.forEach(function (income) {
      let li = document.createElement("li");
      li.innerHTML = `${income.Discription} = $${income.amount}`
      incomeList.appendChild(li);
   });
 }

/// To Update the Total /// 
 function updateTotal(){
   const netIncome = totalIncome - totalExpense ;
   total.textContent = netIncome ;
 }

// Hide the clear Button // 

function clearHide() {
   expenseClear.style.display = expenses.length > 0 ? "inline-block" : "none" ;
   incomeClear.style.display = incomes.length > 0 ? "inline-block" : "none" ;
}
console.log(expenseClear , incomeClear);


// add event to clear btn //

if (expenseClear) {
   expenseClear.addEventListener("click", function (){
      expenses = [];
      totalExpense = 0 ;
      updateList ();
      updateTotal();
      clearHide();
   })
}

if (incomeClear) {
   incomeClear.addEventListener("click", function (){
      incomes = [];
      totalIncome = 0 ;
      updateList ();
      updateTotal();
      clearHide();
   })
}

clearHide () ;

