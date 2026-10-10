const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUL = document.getElementById("todo-list");

let allTodos = [];

todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addTodo();
});

function addTodo() {
    const todoText = todoInput.value.trim();

    if (todoText.length > 0) {
        allTodos.push({
            text: todoText,
            completed: false
        });

        updateTodoList();
        todoInput.value = "";
    }
}

function updateTodoList() {
    todoListUL.innerHTML = "";

    allTodos.forEach((todo, todoIndex) => {
        const todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    });
}

function createTodoItem(todo, todoIndex) {
    const todoId = "todo-" + todoIndex;

    const todoLI = document.createElement("li");
    todoLI.className = "todo";

    todoLI.innerHTML = `
        <input
            type="checkbox"
            id="${todoId}"
            ${todo.completed ? "checked" : ""}
        >

        <label for="${todoId}" class="custom-checkbox">
            <svg
                fill="transparent"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
            >
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
            </svg>
        </label>

        <label for="${todoId}" class="todo-text">
            ${todo.text}
        </label>

        <button type="button" class="delete-button">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
            >
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360Z"/>
            </svg>
        </button>
    `;

    const checkbox = todoLI.querySelector('input[type="checkbox"]');

    checkbox.addEventListener("change", function () {
        allTodos[todoIndex].completed = checkbox.checked;
        updateTodoList();
        saveTodos();
    });

    const deleteButton = todoLI.querySelector(".delete-button");

    deleteButton.addEventListener("click", function () {
        allTodos.splice(todoIndex, 1);
        updateTodoList();
        saveTodos();
    });

    return todoLI;
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(allTodos));
}

function loadTodos() {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
        allTodos = JSON.parse(savedTodos);
        updateTodoList();
    }
}

loadTodos();

