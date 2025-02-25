document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // loadTasks in localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => addTaskToDOM(task.text, task.status));
    }

    // addTask
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;
        
        addTaskToDOM(taskText, "Waiting");
        saveTask(taskText, "Waiting");
        
        taskInput.value = "";
    }

    // addTaskToDOM
    function addTaskToDOM(taskText, status) {
        const li = document.createElement("li");
        li.textContent = taskText;
        li.classList.add("task-item");
        
        // change button
        const statusBtn = document.createElement("button");
        statusBtn.textContent = status;
        statusBtn.classList.add(status.toLowerCase());
        statusBtn.addEventListener("click", () => toggleStatus(taskText, statusBtn));
        
        // delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            removeTask(taskText, li);
        });
        
        li.appendChild(statusBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }

    // saveTask in localStorage
    function saveTask(taskText, status) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({ text: taskText, status });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // removeTask
    function removeTask(taskText, li) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(task => task.text !== taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        
        li.remove();
    }

    // toggleStatus
    function toggleStatus(taskText, statusBtn) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        let task = tasks.find(task => task.text === taskText);
        
        if (task) {
            task.status = task.status === "Waiting" ? "Succeed" : "Waiting";
            localStorage.setItem("tasks", JSON.stringify(tasks));
            
            statusBtn.textContent = task.status;
            statusBtn.classList.toggle("waiting");
            statusBtn.classList.toggle("succeed");
        }
    }

    addTaskBtn.addEventListener("click", addTask);
    loadTasks();
});
