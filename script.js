/**
 * Project 1: Build QuickNotes
 * Task 4: Validation, Deletion & Counter
 * Engineer: Jesse Vincent
 */

// 1. DOM Element Selections
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const errorMessage = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");

// 2. Application State
let notes = [];

/**
 * 3. updateCountDisplay()
 * Formats note metrics for zero, singular and plural quantities.
 */
function updateCountDisplay() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

/**
 * 4. deleteNote(id)
 * Filters out targeted note by unique ID and refreshes the interface.
 */
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  render();
}

/**
 * 5. render()
 * Rebuilds the notes list and synchronises counter indicators.
 */
function render() {
  notesList.innerHTML = "";
  updateCountDisplay();

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
    deleteBtn.addEventListener("click", () => deleteNote(note.id));

    li.appendChild(bodyDiv);
    li.appendChild(deleteBtn);
    notesList.appendChild(li);
  });
}

/**
 * 6. addNote(text, category)
 * Enforces validation boundaries before accepting note creation.
 */
function addNote(text, category) {
  const cleaned = text.trim();

  if (cleaned === "") {
    errorMessage.textContent = "Please type a note first.";
    return false;
  }

  if (cleaned.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return false;
  }

  // Clear active validation error
  errorMessage.textContent = "";

  const newNote = {
    id: Date.now(),
    text: cleaned,
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
  return true;
}

// 7. Event Listener
noteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const added = addNote(noteInput.value, noteCategory.value);
  if (added) {
    noteInput.value = "";
    noteInput.focus();
  }
});

// Initial render
render();