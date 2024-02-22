const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

let tasks = [];

const localStorageData = localStorage.getItem("tasks");
if (localStorageData) {
  tasks = JSON.parse(localStorageData);
  tasks.forEach((task) => renderTask(task));
}

checkEmptyList();

form.addEventListener("submit", addTask);
tasksList.addEventListener("click", deleteTask);
tasksList.addEventListener("click", doneTask);

// const localStorageData = localStorage.getItem("tasksHTML");
// if (localStorageData) {
//   tasksList.innerHTML = localStorageData;
// }

function addTask(event) {
  event.preventDefault();
  const taskText = taskInput.value;
  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };
  tasks.push(newTask);

  renderTask(newTask);

  taskInput.value = "";
  taskInput.focus();

  //   if (tasksList.children.length > 1) {
  //     emptyList.classList.add("none");
  //   }
  //   saveHTMLtoLS();
  saveToLocalStorage();
  checkEmptyList();
}

function deleteTask(event) {
  event.preventDefault();

  if (event.target.dataset.action === "delete") {
    const parentNode = event.target.closest(".list-group-item");

    // const index = tasks.findIndex((task) => task.id === Number(parentNode.id));
    // tasks.splice(index, 1);

    tasks = tasks.filter((task) => task.id !== Number(parentNode.id));

    parentNode.remove();

    // if (tasksList.children.length === 1) {
    //   emptyList.classList.remove("none");
    // }
    // saveHTMLtoLS();
    checkEmptyList();
    saveToLocalStorage();
  }
}

function doneTask(event) {
  if (event.target.dataset.action === "done") {
    const parentNode = event.target.closest(".list-group-item");
    const taskTitle = parentNode.querySelector(".task-title");
    const task = tasks.find((task) => task.id === Number(parentNode.id));
    task.done = !task.done;
    taskTitle.classList.toggle("task-title--done");

    // saveHTMLtoLS();
    saveToLocalStorage();
  }
}

function saveHTMLtoLS() {
  localStorage.setItem("tasksHTML", tasksList.innerHTML);
}

function checkEmptyList() {
  if (!tasks.length) {
    const emptyListElement = `
        <li id="emptyList" class="list-group-item empty-list">
            <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3" />
            <div class="empty-list__title">Список дел пуст</div>
        </li>`;
    tasksList.insertAdjacentHTML(`afterbegin`, emptyListElement);
    console.log(tasks.length);
  } else {
    const emptyListEl = document.querySelector("#emptyList");
    emptyListEl ? emptyListEl.remove() : null;
  }
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask(task) {
  const classDone = task.done ? "task-title--done" : "";
  const taskHTML = `
                <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
                    <span class="task-title ${classDone}">${task.text}</span>
                    <div class="task-item__buttons">
                        <button type="button" data-action="done" class="btn-action">
                            <img src="./img/tick.svg" alt="Done" width="18" height="18">
                        </button>
                        <button type="button" data-action="delete" class="btn-action">
                            <img src="./img/cross.svg" alt="Done" width="18" height="18">
                        </button>
                    </div>
                </li>`;

  tasksList.insertAdjacentHTML(`beforeend`, taskHTML);
}
