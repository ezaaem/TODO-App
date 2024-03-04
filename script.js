// JavaScript Code
const inputElement = document.querySelector(".TaskSearchBar__input");
const taskListElement = document.querySelector(".TaskList__list");
const darkThemeToggle = document.querySelector(".DarkThemeToggle");

const DarkThemeToggl = () => {
  document.body.classList.toggle("isDark");
};

darkThemeToggle.addEventListener("click", DarkThemeToggl);

const renderTask = (e) => {
  e.preventDefault();
  const taskValue = inputElement.value;

   if (taskValue.trim() === "") {
    // Check if the task value is empty
    alert("Please enter a task!");
    return;
  }

  const taskItem = document.createElement("ol");
  taskItem.classList.add("TaskList__taskContent");

  taskItem.innerHTML = `
    <div class='TaskList__checkbox' tabindex="0" role="button"></div>
    <div class='TaskList__valueContent'>
      <p class='TaskList__value'>${taskValue}</p>
      <img class="deleteIcon" src="/images/icon-cross.svg" alt="" role="button">
    </div>
  `;

  // Append the new task to the existing tasks
  taskListElement.appendChild(taskItem);
  
  // Clear the input field after rendering the task
  inputElement.value = "";
  

};

// Attach the renderTask function to a button click event
const addButton = document.querySelector(".buttoncheck");
addButton.addEventListener("click", renderTask);
   
const checkbutton=document.querySelectorAll(".TaskList__checkbox")

const complatedtasks=(checkbox)=>{

    checkbox.classList.toggle("TaskList__checked");  
    checkbox.parentElement.classList.toggle(
        "complatedtask"
      );
};

checkbutton.forEach((checkbox) => {
    checkbox.addEventListener('click',()=>complatedtasks(checkbox));
  });

  const container = document.querySelector('.TaskList__list');

container.addEventListener('click', function (event) {
  const target = event.target;

  if (target.classList.contains('TaskList__checkbox')) {
    complatedtasks(target);
  }else if(target.classList.contains('deleteIcon')){
deleteTask(target);
  }
});

const deleteIcon = document.querySelectorAll('.deleteIcon');

const deleteTask = (icon) => {
    
    icon.parentNode.parentNode.classList.toggle(
        "diaApper"
      );
};

deleteIcon.forEach((icon) => {
    icon.addEventListener('click', () => deleteTask(icon));
});
