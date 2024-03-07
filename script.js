// JavaScript Code
const inputElement = document.querySelector(".TaskSearchBar__input");
const taskListElement = document.querySelector(".TaskList__list");
const darkThemeToggle = document.querySelector(".DarkThemeToggle");
const checkbox = document.querySelector(".TaskList__checkbox ");
const allBtnElement = document.querySelector(".all-btn");
const activeBtnElement = document.querySelector(".active-btn");
const completedBtnElement = document.querySelector(".completed-btn");
const clearCompletedElement = document.querySelector(".clear-competed-btn");
const getDeleteIcons = () => document.querySelectorAll(".deleteIcon");
const getCheckboxIcons = () => document.querySelectorAll(".TaskList__checkbox");

const DarkThemeToggl = () => {
  document.body.classList.toggle("isDark");
  saveToDB("darkModeFlag", document.body.classList.contains("dark-theme"));
};
const fetchData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : false;
};
const saveToDB = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

darkThemeToggle.addEventListener("click", DarkThemeToggl);
const renderTask = (Tasks) => {
  let taskItem = "";
  Tasks.forEach((task, index) => {
    taskItem += `<li class="TaskList__taskContent" id="${index}" draggable="true" >
<div role="button" class=" TaskList__checkbox ${
      task.isCompleted ? "TaskList__checked" : ""
    }"></div>

<div class='TaskList__valueContent'>
  <p class='TaskList__value'>${task.value}</p>
  <img class="deleteIcon" src="/images/icon-cross.svg" alt="" role="button">
</div>
</li>`;
  });
  taskListElement.innerHTML = taskItem;
  inputElement.value = "";
};

const addTask = () => {
  const taskValue = inputElement.value;

  if (!taskValue) return;

  const task = {
    value: taskValue,
    isCompleted: false,
  };

  const tasks = fetchData("tasks") || [];

  tasks.push(task);
  saveToDB("tasks", tasks);

  initTaskList(tasks);
};
const renderEmptyState = () => {
  taskListElement.innerHTML = `<li class='EmptyList'>
   <p>The task list is empty</p>
  </li>
  `;
};
const initTaskList = (tasks) => {
  if (tasks?.length) {
    renderTask(tasks);
    initTaskListeners();
    initDragAndDrop();
  } else {
    renderEmptyState();
  }
  numberTasks();
};
inputElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  }
});
const deleteTask = (event, index) => {
  
  const tasks = fetchData("tasks");

  tasks.splice(index, 1);
  saveToDB("tasks", tasks);
  initTaskList(tasks);
};
const toggleTask = (event, index) => {
  event.currentTarget.parentElement.classList.toggle("complatedtask");
  event.currentTarget.classList.toggle("TaskList__checked");
  const tasks = fetchData("tasks");
  tasks[index].isCompleted = !tasks[index].isCompleted;
  saveToDB("tasks", tasks);
  numberTasks();
};
const initTaskListeners = () => {
  getDeleteIcons().forEach((icon, index) => {
    icon.addEventListener("click", (event) => deleteTask(event, index));
  });

  getCheckboxIcons().forEach((box, index) => {
    box.addEventListener("click", (event) => toggleTask(event, index));
  });
};

inputElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  }
});

const addButton = document.querySelector(".buttoncheck");
addButton.addEventListener("click", addTask);

const initDataStratup = () => {
  fetchData("darkModeFlag") && toggleDarkMode();
  initTaskList(fetchData("tasks"));
};

const checkbutton = document.querySelectorAll(".TaskList__checkbox");

const complatedtasks = (checkbox) => {
  checkbox.classList.toggle("TaskList__checked");
  checkbox.parentElement.classList.toggle("complatedtask");
  const tasks = fetchData("tasks");
  tasks[index].isCompleted = !tasks[index].isCompleted;
  saveToDB("tasks", tasks);
  numberTasks();
};

checkbutton.forEach((checkbox) => {
  checkbox.addEventListener("click", () => complatedtasks(checkbox));
});

const container = document.querySelector(".TaskList__list");

const deleteIcon = document.querySelectorAll(".deleteIcon");

deleteIcon.forEach((icon) => {
  icon.addEventListener("click", () => deleteTask(icon));
});

const numberLeftTasks = document.querySelector(".number-tasks");
const numberTasks = () => {
  const tasks = fetchData("tasks");
  const changeTasks = tasks.filter((task) => !task.isCompleted);
  numberLeftTasks.textContent = changeTasks.length;
};
const allTasks = () => {
  const tasks = fetchData("tasks");
  const changeTasks = tasks.filter((task) => task.value);
  initTaskList(changeTasks);
}
allBtnElement.addEventListener("click", () => allTasks());


const activeTasks = () => {
  const tasks = fetchData("tasks");
  const changeTasks = tasks.filter((task) => !task.isCompleted);
  initTaskList(changeTasks);
};
activeBtnElement.addEventListener("click", () => activeTasks());


const CompletedTasks = () => {
  const tasks = fetchData("tasks");
  const changeTasks = tasks.filter((task) => task.isCompleted);
  initTaskList(changeTasks);
}
completedBtnElement.addEventListener("click", () => CompletedTasks());


const clearCompletedTasks = () => {
  const tasks = fetchData("tasks");
  const changeTasks = tasks.filter((task) => !task.isCompleted);
  saveToDB("tasks", changeTasks);
  initTaskList(changeTasks);
};
clearCompletedElement.addEventListener("click", () => clearCompletedTasks());

const initDragAndDrop = () => {
  const listItems = document.querySelectorAll(".TaskList__taskContent");

  listItems.forEach((item) => {
    item.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", item.id);
    });

    item.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    item.addEventListener("drop", (e) => {
      e.preventDefault();
      const draggedItemId = e.dataTransfer.getData("text/plain");
      const draggedItem = document.getElementById(draggedItemId);
      const dropTarget = e.target.closest(".TaskList__taskContent");

      if (draggedItem && dropTarget) {
        const tasks = fetchData("tasks");
        const draggedIndex = parseInt(draggedItemId, 10);
        const dropIndex = parseInt(dropTarget.id, 10);

        const temp = tasks[draggedIndex];
        tasks[draggedIndex] = tasks[dropIndex];
        tasks[dropIndex] = temp;

        saveToDB("tasks", tasks);
        initTaskList(tasks);
      }
    });
  });
};

initDataStratup();
/*to do without localstorge 
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
        "disApper"
      );
};

deleteIcon.forEach((icon) => {
    icon.addEventListener('click', () => deleteTask(icon));
});


const taskContentElements = document.querySelectorAll(".TaskList__taskContent");

const filterTask = () => {
  console.log("Filtering tasks...");
  taskContentElements.forEach((element) => {
    if (element.classList.contains('complatedtask')) {
      console.log("Adding disApper class");
      element.classList.add('disApper');
    }
  });
};

const activeBtn = document.querySelector(".active-btn");
activeBtn.addEventListener("click", filterTask);
*/
