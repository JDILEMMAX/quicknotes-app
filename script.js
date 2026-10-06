/**
 * Project 1: Build QuickNotes
 * Task 5: Persistence, Live Search & Bulk Operations
 * Lead Systems Architect: Jesse Vincent
 * Repository: quicknotes-app
 */

// 1. DOM Element Selections
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const noteCount = document.querySelector("#note-count");
const notesList = document.querySelector("#notes-list");
const clearAllBtn = document.querySelector("#clear-all-btn");

// 2. Storage Constants & Application State
const STORAGE_KEY = "quicknotes_app_data";
let notes = loadNotes();

/**
 * 3. loadNotes()
 * Hydrates state from browser localStorage or returns an empty collection.
 */
function loadNotes() {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    return rawData ? JSON.parse(rawData) : [];
  } catch (error) {
    console.error("Failed to parse stored notes:", error);
    return [];
  }
}

/**
 * 4. saveNotes()
 * Persists active state array to browser localStorage as serialized JSON.
 */
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

/**
 * 5. updateCountDisplay(displayCount)
 * Updates status text handling zero, singular and plural forms.
 */
function updateCountDisplay(displayCount) {
  if (displayCount === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (displayCount === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${displayCount} notes.`;
  }
}

/**
 * 6. render(filterQuery)
 * Reconstructs list items safely using DOM nodes and textContent.
 * Supports keyword filtering and informative empty states.
 */
function render(filterQuery = "") {
  notesList.innerHTML = "";
  const query = filterQuery.trim().toLowerCase();

  const filteredNotes = notes.filter((note) => {
    return note.text.toLowerCase().includes(query);
  });

  if (notes.length === 0) {
    updateCountDisplay(0);
    const emptyLi = document.createElement("li");
    emptyLi.classList.add("empty-state");
    emptyLi.textContent = "Your workspace is clear. Add your first note above.";
    notesList.appendChild(emptyLi);
    return;
  }

  if (filteredNotes.length === 0) {
    updateCountDisplay(0);
    const noMatchLi = document.createElement("li");
    noMatchLi.classList.add("empty-state");
    noMatchLi.textContent = "No notes match your search.";
    notesList.appendChild(noMatchLi);
    return;
  }

  updateCountDisplay(filteredNotes.length);

  filteredNotes.forEach((note) => {
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
    deleteBtn.setAttribute("aria-label", `Delete note: ${note.text}`);
    deleteBtn.addEventListener("click", () => deleteNote(note.id));

    li.appendChild(bodyDiv);
    li.appendChild(deleteBtn);
    notesList.appendChild(li);
  });
}

/**
 * 7. addNote(text, category)
 * Validates text bounds, appends record to state and persists to storage.
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
  saveNotes();
  render(searchInput.value);
  return true;
}

/**
 * 8. deleteNote(id)
 * Removes targeted note by ID, persists to storage and updates UI.
 */
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render(searchInput.value);
}

/**
 * 9. clearAllNotes() (Bonus Objective)
 * Prompts confirmation before clearing state and local storage.
 */
function clearAllNotes() {
  if (notes.length === 0) return;

  const confirmed = confirm("Delete all notes?");
  if (confirmed) {
    notes = [];
    saveNotes();
    render();
  }
}

// ==========================================
// EVENT LISTENERS
// ==========================================

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const added = addNote(noteInput.value, noteCategory.value);
  if (added) {
    noteInput.value = "";
    noteInput.focus();
  }
});

searchInput.addEventListener("input", () => {
  render(searchInput.value);
});

clearAllBtn.addEventListener("click", clearAllNotes);

// Initial application render on DOM ready
render();