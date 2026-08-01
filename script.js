var counter = document.getElementById("counter");
var remained = document.getElementById("remainingCount");
var inputBox = document.getElementById("taskInput");
var addBtn = document.getElementById("addBtn");
var taskList = document.getElementById("taskList");
var clearBtn = document.getElementById("clearBtn");
var allDoneMsg = document.getElementById("allDoneMsg");
var errorMsg = document.getElementById("errorMsg");

addBtn.addEventListener("click", addTask);

let tasks = [];
let savedTasks = localStorage.getItem("tasks");

if (savedTasks) {
    tasks = JSON.parse(savedTasks);
}

function addTask() {
    let taskText = inputBox.value.trim();

    if (taskText ===  "") {
        errorMsg.textContent = "Please type a task first.";
        return;
    }

    let taskNames = [];

    for (let i = 0; i < tasks.length; i++) {
        taskNames.push(tasks[i].text.toLowerCase());
    }

    if (taskNames.includes(taskText.toLowerCase())) {
        errorMsg.textContent = "This task already exists!";
        return;
    }

    errorMsg.textContent = "";

    tasks.push({
        text: taskText,
        done: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    inputBox.value = "";
    showTasks();
}

function showTasks() {
    taskList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {

        let li = document.createElement("li");
        li.className = "task-item";

        if (tasks[i].done) {
            li.classList.add("done");
        }

        let span = document.createElement("span");
        span.className = "task-text";
        span.textContent = tasks[i].text;

        let doneBtn = document.createElement("button");
        doneBtn.className = "done-btn";

        if (tasks[i].done) {
            doneBtn.textContent = "Undo";
        } else {
            doneBtn.textContent = "Done";
        }

        let deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";

        doneBtn.addEventListener("click", function () {
            tasks[i].done = !tasks[i].done;
            li.classList.toggle("done");
            showTasks();
        });

        deleteBtn.addEventListener("click", function () {
            tasks.splice(i, 1);
            showTasks();
        });

        li.appendChild(span);
        li.appendChild(doneBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    }

    updateCounter();
}

function updateCounter() {
    let remaining = tasks.filter(function (task) {
        return task.done == false;
    }).length;

    let completed = tasks.filter(function (task) {
        return task.done == true;
    }).length;

    counter.innerHTML =
        "Tasks remaining: <span>" + remaining + "</span><br>" +
        completed + " of " + tasks.length + " tasks completed";

    if (tasks.length > 0 && remaining == 0) {
        counter.textContent = "All tasks done! Great job!";
        counter.classList.add("all-done-msg");
        counter.classList.add("visible");
    }
}

clearBtn.addEventListener("click", function () {
    tasks = [];
    showTasks();
});

let colors = document.querySelectorAll(".color-circle");

colors.forEach(function (circle) {

    circle.addEventListener("click", function () {

        document.body.style.backgroundColor = circle.dataset.color;

        for (let i = 0; i < colors.length; i++) {
            colors[i].classList.remove("active");
        }

        circle.classList.add("active");
    });
});

showTasks();