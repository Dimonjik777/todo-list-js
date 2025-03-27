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

function render() {

  // Clear tasks container
  tasksContainer.innerHTML = "";

  tasks.forEach(element => {
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

function deleteTask(id){
  tasks = tasks.filter(element => element.id !== id);
  render();
}

function completeTask(event, id){

  tasks = tasks.map(element => 
      element.id === id ? {...element, isComplete: !element.isComplete} : element
  );
  
  let taskContainer = event.target.closest(".task");
  taskContainer.classList.toggle("active");
}