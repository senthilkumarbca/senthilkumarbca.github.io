let inputBox = document.querySelector("#inputBox");
let dateBox = document.querySelector("#dateBox");
let total = document.querySelector("#total");
let priceBox = document.querySelector("#priceBox");
let addBtn = document.querySelector("#addBtn");
let todoList = document.querySelector("#todoList");
let styleSheets = document.querySelector("#styleSheets");
let theme = document.querySelector("#theme");
let themeIcon = document.querySelector("#themeIcon");
let dellAll = document.querySelector("#dellAll");

let tot = 0;
let todoArr=[];

function addTodo(){
    if(inputBox.value === "") return alert("Please enter some task...");

    let count = 0;
    for(i in inputBox.value){
        if(inputBox.value[i] === " ") count++;
    }
    if(inputBox.value.length === count) return alert("Please enter valid task...");

    let todoObj = {
        id : Math.random(),
        todo : inputBox.value,
        price : priceBox.value,
        date : dateBox.value
    };

    todoArr.push(todoObj);
    storeTodo();

    createElement(todoObj.id , todoObj.todo , todoObj.date, todoObj.price);

    inputBox.value="";
    priceBox.value="";
}

function createElement(id , todo , date, price)
{
    tot += Number(price);
    total.innerHTML = `₹ ${tot}`
    let todoElement = document.createElement("div");
    todoElement.classList.add("col-md-6");
    todoElement.innerHTML = `
        <div class="todo" id="${id}">
            <p class="" style="flex-grow: 9">${todo}</p>
            <p class="" style="flex-grow: .9; border-left: 1px solid #efefef">₹${price}</p>
            <i class="fa fa-pen" style="flex-grow: .2; " job="editTodo"></i>
            <i class="fa fa-trash-alt" style="flex-grow: .2; " job="delTodo"></i>
        </div>
    `;

    todoList.appendChild(todoElement);

    todoElement.addEventListener("click",function (e){
        let job = e.target.attributes.job.value;
    
        if(job == "delTodo") delTodo(e.target);
        else if(job == "editTodo") editTodo(e.target);
    });
}

function delTodo(element)
{
    element.parentNode.parentNode.remove();

    let a =element.parentNode;
    for(i in todoArr)
    {
        if(todoArr[i].id == a.id) todoArr.splice(i,1);
    }
    storeTodo();
}

function editTodo(element)
{
    let x = prompt("Edit",element.parentNode.children[1].innerHTML);
    if(x)
    {
        element.parentNode.children[1].innerHTML=x;
        
        let a =element.parentNode;
        for(i in todoArr)
        {
            if(todoArr[i].id == a.id) todoArr[i].todo=x;
        }
        storeTodo();
    } 
    
}

function storeTodo()
{
    let todoList = JSON.stringify(todoArr);
    localStorage.setItem("MyExpenses",todoList);
}

function readTodo()
{
    let datas = localStorage.getItem("MyExpenses");
    let todoList = JSON.parse(datas);
    if(todoList)
    {
        for(todos of todoList)
        {
            todoArr.push(todos);
            createElement(todos.id , todos.todo , todos.date, todos.price);
        }
    }
    else
    {
        storeTodo();
    }
    
}
function storeTheme()
{
    let myTheme = styleSheets.getAttribute("href");
    localStorage.setItem("MyExpensesTheme",myTheme);   
}
function readTheme()
{
    let myTheme = localStorage.getItem("MyExpensesTheme");
    if(myTheme)
    {
    styleSheets.setAttribute("href",myTheme);
    if(myTheme == "./assests/css/intex.css") themeIcon.setAttribute("class","fas fa-moon");
    else themeIcon.setAttribute("class","fas fa-sun");
    }
    else
    {
        localStorage.setItem("MyExpensesTheme","./assests/css/intex.css");
        styleSheets.setAttribute("href",localStorage.getItem("MyExpensesTheme")); 
    }
}
function themeFun()
{
    if(styleSheets.getAttribute("href") == "./assests/css/intex.css"){
        styleSheets.setAttribute("href","./assests/css/index1.css");
        themeIcon.setAttribute("class","fas fa-sun");
        storeTheme();
    }
    else{
        styleSheets.setAttribute("href","./assests/css/intex.css");
        themeIcon.setAttribute("class","fas fa-moon");
        storeTheme();
    }
}
function dellAllFun()
{
    todoArr=[];
    storeTodo();
    document.location.reload();
}

readTodo();

readTheme();

addBtn.addEventListener("click",addTodo);
priceBox.addEventListener("keyup",function(e){
    if(e.keyCode === 13) addTodo();
});
/* inputBox.addEventListener("keyup",function(e){
    if(e.keyCode === 13) priceBox;
}); */

theme.addEventListener("click",themeFun);
dellAll.addEventListener("click",dellAllFun);
