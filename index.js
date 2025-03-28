// Storage with tasks
let tasks = [];

// Take DOM elements
let inputTask = document.querySelector("input");
let button = document.querySelector("button");
let tasksContainer = document.querySelector(".tasks");
let options = document.querySelectorAll(".options button")

// State variable
let stateTasks = "All";

button.addEventListener("click", addTask);

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter")
    addTask();
});

// Initialize todo list
render();

options.forEach(element => {

  element.addEventListener("click", (event) => {

    // Delete acitve class in all buttons and add to active button
    event.target.parentElement.querySelectorAll("button").forEach(el => el.classList.remove("active"));
    event.target.classList.add("active");

    // Change state for render
    if (event.target.textContent == "All") {
      stateTasks = "All";
    }
    if (event.target.textContent == "Complete") {
      stateTasks = "Complete";
    }
    if (event.target.textContent == "Uncomplete") {
      stateTasks = "Uncomplete";
    }

    render();

  });

});

function addTask() {
  const taskText = inputTask.value.trim();
  if (taskText != "") {
    tasks.push({ id: Date.now(), task: taskText, isComplete: false });
    inputTask.value = "";

    render();
  }
}

function render() {

  // Clear tasks container
  tasksContainer.innerHTML = "";

  // Select tasks based on status
  let tasksFiltered = stateTasks == "All" ? tasks :
    stateTasks == "Complete" ? tasks.filter(element => element.isComplete) : tasks.filter(element => !element.isComplete);

  // Checking if there is anything to render
  if (tasksFiltered.length > 0) {
    tasksFiltered.forEach(element => {
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

      // Render complete task
      if (element.isComplete) {
        taskContainer.classList.add("active");
      }

      // Add eventlisteners
      taskDelete.addEventListener("click", () => deleteTask(element.id));
      taskCheck.addEventListener("click", (event) => completeTask(event, element.id));

      // Insert elements into container
      taskContainer.append(taskTitle);
      taskContainer.append(taskCheck);
      taskContainer.append(taskDelete);

      // Render task
      tasksContainer.append(taskContainer);

    })
  }

  else{
    let message = document.createElement("h1");

    switch(stateTasks){

      case "All" : message.textContent = "There are no tasks at the moment"; break;
      case "Complete" : message.textContent = "No completed tasks"; break;
      case "Uncomplete" : message.textContent = "All tasks completed"; break;

    }
    tasksContainer.append(message);
  }

  // Save tasks in local storage
  localStorage.tasks = JSON.stringify(tasks);

}

function deleteTask(id) {
  tasks = tasks.filter(element => element.id !== id);
  render();
}

function completeTask(event, id) {

  tasks = tasks.map(element =>
    element.id === id ? { ...element, isComplete: !element.isComplete } : element
  );

  let taskContainer = event.target.closest(".task");
  taskContainer.classList.toggle("active");

  setTimeout(() => render(), 300);

}
