// Storage with tasks
let tasks = [];

// Take DOM elements
let input__task = document.querySelector("input");
let button = document.querySelector("button");

button.addEventListener("click", addTask);

document.addEventListener("keydown", (event) => {
  if(event.key === "Enter")
    addTask();
});

function addTask() {
  const taskText = input__task.value.trim();
  if(taskText != ""){
    tasks.push({task: taskText, isComplete: false});
    input__task.value = "";
  }
}