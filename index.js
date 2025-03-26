// Storage with tasks
let tasks = [];

// Take DOM elements
let inputTask = document.querySelector("input");
let button = document.querySelector("button");
let taskContainer = document.querySelector(".tasks");

button.addEventListener("click", addTask);

document.addEventListener("keydown", (event) => {
  if(event.key === "Enter")
    addTask();
});

function addTask() {
  const taskText = inpuTask.value.trim();
  if(taskText != ""){
    tasks.push({id: Date.now(), task: taskText, isComplete: false});
    inputTask.value = "";
  }
}
