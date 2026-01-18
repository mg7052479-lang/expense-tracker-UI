
//   /// Declearing the list  ///

   const expenseList = document.getElementById("expense-list")
   const incomeList = document.getElementById("income-list")
   const total = document.getElementById("total")
   const expenseForm = document.getElementById("expense-form")
   const expenseDescription = document.getElementById("Discription")
   const expenseAmount = document.getElementById("amount")
   const type = document.getElementById("type")
   const addBtn = document.getElementById("addbtn")

  /// Initiling the arrays and variable in expense and income .. 

  let expenses = [];
  let income = [];
  let totalExpense = 0;
  let totalIncome = 0;

 // Add event listner to the add button  .. 

 addBtn.addEventListener("click", function () {
     // Create an object to represent the expnese and the amount ... 
   let dataValues = {                                      
                      Discription:expenseDescription.nodeValue,     // Must be a douts 2// 
                      Amount:expenseAmount.value, 
                      type:type.value
   };
     // if the expenses has the dispriction and amount , add it to the appropriate array ..   
   if (dataValues.Discription && dataValues.Amount){
      if (dataValues.type === "expense"){
         expenses.push(dataValues);
         totalExpense +=dataValues.Amount ;
      }
      else {
         income.push(dataValues);
         totalIncome += dataValues.Amount
      }
   }

 })

 // create a Function to a