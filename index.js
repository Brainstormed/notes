const newBtn = document.querySelector(".new-note");
const deleteBtn = document.querySelector(".delete-note");
const form = document.querySelector("form");
const titleInput = document.querySelector("[type='text']");
const contentInput = document.querySelector("textarea");
const done = document.querySelector(".done");
const cancel = document.querySelector(".cancel");
const notesSec = document.querySelector("section");
const modal = document.querySelector(".modal");
const modalContainer = document.querySelector(".modal-container");
const modalText = document.querySelector(".modal-text")

let titles;
let contents;

if (
  localStorage.getItem("titles") !== null &&
  localStorage.getItem("contents") !== null
) {
  titles = JSON.parse(localStorage.getItem("titles"));
  contents = JSON.parse(localStorage.getItem("contents"));
} else {
  titles = [];
  contents = [];
}

function saveInput() {
  if (titleInput.value.length !== 0) {
    if (notesSec.innerText === "There are no notes!") {
      notesSec.style = {};
      notesSec.innerHTML = "";
    }
    titles.push(titleInput.value);
    contents.push(contentInput.value);
    notesSec.innerHTML =
      `<div class="note"><h2>${titleInput.value}</h2><p>${contentInput.value}</p></div>` +
      notesSec.innerHTML;
    localStorage.setItem("titles", JSON.stringify(titles));
    localStorage.setItem("contents", JSON.stringify(contents));
    titleInput.value = "";
    contentInput.value = "";
    form.style.display = "none";
  }
}

function newNote() {
  form.style.display = "grid";
  form.style.height = "0";
  setTimeout(() => {
    form.style.height = "14em";
  }, 10);
  form.style.transition = "height 0.1s ease-out";
  titleInput.focus();
}

function noNotes() {
  notesSec.innerHTML =
    "<h2 style='font-weight: 300; font-size: 2em; text-align: center;'>There are no notes!</h2>";
  notesSec.style.background = "#272727";
  notesSec.style.borderRadius = "0.5em";
  notesSec.style.border = "#555555 2px solid";
  notesSec.style.width = "22.2em";
  notesSec.style.margin = "3em auto";
}

function hideModal() {
  modal.style.display = "none";
  modalContainer.style.display = "none";
}

function deleteNotes() {
  localStorage.clear();
  hideModal();
  noNotes();
}

function cancelDeleteNotes() {
  hideModal();
}

titleInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    setTimeout(contentInput.focus(), 10);
  }
});

contentInput.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "Enter") {
    saveInput();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.altKey && (e.key === "N" || e.key === "n")) {
    newNote();
  }
});

form.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    form.style.height = 0;
    form.style.display = "none";
  }
});

newBtn.addEventListener("click", () => {
  newNote();
});

deleteBtn.addEventListener("click", () => {
  if (titles.length !== 0) {
    modal.style.display = "grid";
    modalContainer.style.display = "block";
    modal.style.transform = "translate(-50%, -30vh)"
    setTimeout(() => modal.style.transform = "translate(-50%, 0)", 10);
    modal.style.transition = "all 0.1s ease-out"
    modalText.textContent = "Are you sure you want to delete all notes?";
  }
});

done.addEventListener("click", (e) => {
  e.preventDefault();
  saveInput();
});

cancel.addEventListener("click", (e) => {
  e.preventDefault();
  form.style.height = "14em";
  setTimeout(() => {
    form.style.height = "0";
  }, 10);
  form.style.transition = "height 0.1s ease-out";
  setTimeout(() => (form.style.display = "none"), 100);
});

if (titles.length === 0 && contents.length === 0) {
  noNotes();
} else {
  for (let index = 0; index < titles.length; index++) {
    notesSec.innerHTML =
      `<div class="note"><h2>${titles[index]}</h2><p>${contents[index]}</p></div>` +
      notesSec.innerHTML;
  }
}
