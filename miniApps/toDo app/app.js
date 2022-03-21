// ------------------ Selecting the DOM ------------------
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoContainer = document.querySelector(".todo-container");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


// ------------------ Event Listeners ------------------
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getAllTodos);


// ------------------ Functions ------------------
function addTodo(event) {
    // preventing submission of the form, which is natual behaviour of the submit button
    event.preventDefault();

    // creating the todo div
    const todoDiv = document.createElement("div");
    todoDiv.className = "todo";

    // creating the li (todo-item) for the todo-div
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // saving to local storage and then clearing the input bar
    saveLocalTodos(todoInput.value);
    todoInput.value = "";

    // adding the complete btn in todo div
    const checkBtn = document.createElement("button");
    checkBtn.classList.add("complete-btn");
    checkBtn.innerHTML = `<i class="fas fa-check"></i>`
    todoDiv.appendChild(checkBtn);

    // adding the delete btn in todo div
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`
    todoDiv.appendChild(deleteBtn);

    // appending to the todo list (ul) the todo div
    todoList.appendChild(todoDiv);
}

function deleteCheck(e) {
    const item = e.target;

    if (item.classList.contains("delete-btn")) {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        // after the transition ends, remove the todo list
        todo.addEventListener("transitionend", function () {
            todo.remove();
        })
    }

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
}

function filterTodo(e) {
    const todos = todoList.children;
    Array.from(todos).forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "none";
                } else {
                    todo.style.display = "flex";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    const todos = getSavedTodos();

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
    const todos = getSavedTodos();

    const todoIndex = todos.indexOf(todo.children[0].innerText);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getAllTodos() {
    const todos = getSavedTodos();

    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.setAttribute("class", "todo");

        // creating the li (todo-item) for the todo-div
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        todoInput.value = "";

        // adding the complete btn in todo div
        const checkBtn = document.createElement("button");
        checkBtn.classList.add("complete-btn");
        checkBtn.innerHTML = `<i class="fas fa-check"></i>`
        todoDiv.appendChild(checkBtn);

        // adding the delete btn in todo div
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`
        todoDiv.appendChild(deleteBtn);

        // appending to the todo list (ul) the todo div
        todoList.appendChild(todoDiv);
    });
}

function getSavedTodos() {
    if (localStorage.getItem("todos") === null) {
        return [];
    } else {
        return JSON.parse(localStorage.getItem("todos"));
    }
}