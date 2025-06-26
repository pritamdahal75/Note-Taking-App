// Get the "Add Note" button and the container where notes will be displayed
const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

// When the Add Note button is clicked, create a new note
addBtn.addEventListener("click", function () {
  addNote();
});

// Function to create and insert a new note
function addNote(text = "") {
  // Create the main note container
  const note = document.createElement("div");
  note.classList.add("note");

  // Set the HTML inside the note
  note.innerHTML = `
    <div class="tool">
      <i class="save fa-solid fa-floppy-disk"></i>
      <i class="trash fa-solid fa-trash"></i>
      <i class="pin fas fa-thumbtack" title="Pin note"></i>
    </div>
    <textarea placeholder="Enter Your Text">${text}</textarea>
    <small class="timestamp">Last updated: ${new Date().toLocaleString()}</small>
  `;

  // Handle pinning logic: toggle 'pinned' class and move the note to the top
  const pin = note.querySelector(".pin");
  pin.addEventListener("click", function () {
    note.classList.toggle("pinned"); // Style toggle
    main.prepend(note);              // Move note to top
  });

  // Trash button removes the note and updates localStorage
  note.querySelector(".trash").addEventListener("click", function () {
    note.remove();
    saveNotes();
  });

  // Save button stores the current note state
  note.querySelector(".save").addEventListener("click", function () {
    saveNotes();
  });

  // Automatically save note content when textarea loses focus
  note.querySelector("textarea").addEventListener("focusout", function () {
    saveNotes();
  });

  // Add the note to the page
  main.appendChild(note);

  // Save the updated list of notes
  saveNotes();
}

// Save all notes to localStorage
function saveNotes() {
  const notes = document.querySelectorAll(".note textarea");
  const data = [];

  // Collect the content of each note
  notes.forEach((note) => {
    data.push(note.value);
  });

  // Save data or clear storage if no notes left
  if (data.length === 0) {
    localStorage.removeItem("notes");
  } else {
    localStorage.setItem("notes", JSON.stringify(data));
  }
}

// When the page loads, retrieve and display saved notes from localStorage
(function () {
  const lsnotes = JSON.parse(localStorage.getItem("notes"));

  if (lsnotes === null) {
    addNote(); // No saved notes? Add one blank note
  } else {
    lsnotes.forEach((lsnote) => {
      addNote(lsnote); // Restore each saved note
    });
  }
})();