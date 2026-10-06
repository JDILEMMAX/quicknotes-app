/**
 * Project 1: Build QuickNotes
 * Task 3: Core Add & Display Engine
 * Engineer: Jesse Vincent
 */

// 1. DOM Element Selections
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

// 2. Application State
let notes = [];

/**
 * 3. render()
 * Clears and rebuilds the notes list using safe DOM creation methods.
 */
function render() {
  notesList.innerHTML = "";

  notes.forEach((note) => {
    const li = document.createElement("li");
    li.classList.add("note-item", `category-${note.category}`);

    const bodyDiv = document.createElement("div");
    bodyDiv.classList.add("note-body");

    const textP = document.createElement("p");
    textP.classList.add("note-text");
    textP.textContent = note.text;

    const metaDiv = document.createElement("div");
    metaDiv.classList.add("note-meta");

    const badgeSpan = document.createElement("span");
    badgeSpan.classList.add("note-badge");
    badgeSpan.textContent = note.category;

    const dateSpan = document.createElement("span");
    dateSpan.classList.add("note-date");
    dateSpan.textContent = note.createdAt;

    metaDiv.appendChild(badgeSpan);
    metaDiv.appendChild(dateSpan);
    bodyDiv.appendChild(textP);
    bodyDiv.appendChild(metaDiv);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.setAttribute("type", "button");

    li.appendChild(bodyDiv);
    li.appendChild(deleteBtn);
    notesList.appendChild(li);
  });
}

/**
 * 4. addNote(text, category)
 * Constructs a structured note object and inserts it into the state array.
 */
function addNote(text, category) {
  const newNote = {
    id: Date.now(),
    text: text.trim(),
    category: category,
    createdAt: new Date().toLocaleString([], {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  notes.unshift(newNote);
  render();
}

// 5. Event Listener
noteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = noteInput.value;
  if (text.trim() !== "") {
    addNote(text, noteCategory.value);
    noteInput.value = "";
    noteInput.focus();
  }
});

// Initial render
render();