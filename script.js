const form=document.querySelector(".add");
let transactions=localStorage.getItem("transactions")!==null ? JSON.parse(localStorage.getItem("transactions")) : [];
const incomeList=document.querySelector(".income-list");
const expenseList=document.querySelector(".expense-list");
const records=document.querySelector(".records");
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");







function genrateTemplate(id,source,amount,time){
    return `<li data-id="${id}">
    <p>
        <span>${source}</span>
        <span id="time">${time}</span>
    </p>
    $<span>${Math.abs(amount)}</span>
    <i class="bi bi-trash delete"></i>
</li>`
}

function addDomTransaction(id,source,amount,time){
    if(amount>=0){
        incomeList.innerHTML+=genrateTemplate(id,source,amount,time);
    }
    else{
        expenseList.innerHTML+=genrateTemplate(id,source,amount,time);
    }

    }

function fetchTransactions(){
    updateStatistics();
    for(i=0;i<transactions.length;i++){
        addDomTransaction(transactions[i].id,transactions[i].source,transactions[i].amount,transactions[i].time);
        
        }
}
function deleteTransactions(id){
    console.log(typeof(id));
    
    transactions=transactions.filter(transaction=>{
        return transaction.id!==id;
    })
    updateStatistics();
    localStorage.setItem("transactions",JSON.stringify(transactions))

}


fetchTransactions();





function addtransaction(source,amount){
    let time=new Date();
    var transaction={
        source:source,
        amount:amount,
        id: Math.floor(Math.random() * 100000),
        time:`${time.toLocaleTimeString()} ${time.toLocaleDateString()}`
};
    transactions.push((transaction)); 
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateStatistics();
    addDomTransaction(transaction.id,source,amount,transaction.time);

}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    addtransaction(form.source.value,Number(form.amount.value));
    form.reset();
    
})
records.addEventListener('click',(e)=>{
    if(e.target.classList.contains("delete")){
        deleteTransactions(Number(e.target.parentElement.dataset.id));
        e.target.parentElement.remove();
    }
})

function updateStatistics(){
    const updatedIncome = transactions
                            .filter((transaction) => transaction.amount > 0)
                            .reduce((total, transaction) => total += transaction.amount, 0);

    const updatedExpense = transactions
                            .filter(transaction => transaction.amount < 0)
                            .reduce((total, transaction) => total += Math.abs(transaction.amount), 0);
    console.log(updatedIncome)

    updatedBalance = updatedIncome - updatedExpense;
    balance.textContent = updatedBalance;
    income.textContent = updatedIncome;
    expense.textContent = updatedExpense;
    
}
