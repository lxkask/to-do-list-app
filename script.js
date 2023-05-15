const inputBox = document.getElementById("input-box");
const filters = document.querySelectorAll(".filters span");
const listContainer = document.getElementById("list-container");
const clearAllButton = document.querySelector('.clear-btn');

// Funkce pro filtrování tasků
function filterTasks(taskItems, filter) {
  taskItems.forEach((item) => {
    if (filter === "all") {
      item.style.display = "flex";
    } else if (filter === "pending" && !item.classList.contains("checked")) {
      item.style.display = "flex";
    } else if (filter === "completed" && item.classList.contains("checked")) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

//Funkce pro smazání všech tasků
function clearAllTasks() {
    listContainer.innerHTML = "";
    localStorage.removeItem("task");
}
  
//"Aktivování" filtrů po kliknutí
filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    const activeFilter = document.querySelector(".filters span.active");
    activeFilter.classList.remove("active");
    btn.classList.add("active");
    const filterValue = btn.getAttribute("id");
    const taskItems = listContainer.querySelectorAll("li");
    filterTasks(taskItems, filterValue);
  });
});

//Funkce pro přidání nového tasku
function addTask() {
  if (inputBox.value === "") {
    alert("This field cannot be empty");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;

    if (document.querySelector("span.active").id === "completed") {
        li.classList.add("checked");
    }

    listContainer.appendChild(li);
    let span = document.createElement("span");
    let img = document.createElement("img");
    img.src = "images/delete.svg";
    span.appendChild(img);
    li.appendChild(span);
  }
  inputBox.value = "";
  saveTask();
}

//Označení tasku jako hotového po kliknutí a jeho smazání při kliknutí na ikonku koše
listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveTask();
    } else if (e.target.tagName === "IMG") {
      e.target.parentNode.parentNode.remove();
      saveTask();
    }
  },
  false
);

//Funkce pro savování tasku do localStorage, aby se tasky nesmazaly po refreshnutí stránky
function saveTask() {
  localStorage.setItem("task", listContainer.innerHTML);
}

//Funkce pro zobrazování tasků
function displayTask() {
  listContainer.innerHTML = localStorage.getItem("task");
}
displayTask();