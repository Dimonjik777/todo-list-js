// Storage with tasks
let tasks = [];

// Take DOM elements
let inputTask = document.querySelector("input");
let button = document.querySelector("button");
let tasksContainer = document.querySelector(".tasks");

button.addEventListener("click", addTask);

document.addEventListener("keydown", (event) => {
  if(event.key === "Enter")
    addTask();
});

function addTask() {

  const taskText = inputTask.value.trim();
  if(taskText != ""){
    tasks.push({id: Date.now(), task: taskText, isComplete: false});
    inputTask.value = "";

    render();
  }
}

// Реалізувати рендер задач через метод map

function render() {

  // Clear tasks container
  tasksContainer.innerHTML = "";

  tasks.map(element => {
        // Create elements in task for HTML
        let taskTitle = document.createElement("h3");
        let taskCheck = document.createElement("div");
        let taskDelete = document.createElement("p");
        let taskContainer = document.createElement("div");
    
        // Add classes
        taskCheck.classList.add("task__check");
        taskDelete.classList.add("task__delete");
        taskContainer.classList.add("task");
    
        // Add content
        taskTitle.textContent = element.task;
        taskDelete.textContent = "X";
    
        // Add ID task
        taskCheck.setAttribute("task__id", element.id);
        taskDelete.setAttribute("task_id", element.id);
    
        // Insert elements into container
        taskContainer.append(taskTitle);
        taskContainer.append(taskCheck);
        taskContainer.append(taskDelete);
    
        // Render task
        tasksContainer.append(taskContainer);
    
  })
  
}