# QuickNotes

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Application-brightgreen.svg)](#)
[![Author](https://img.shields.io/badge/Engineer-Jesse%20Vincent-blue.svg)](https://github.com/JDILEMMAX)
[![Cohort](https://img.shields.io/badge/PLP-Exclusive%20SE%20Cohort-red.svg)](https://powerlearnproject.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

QuickNotes is a responsive, client-side productivity application engineered for rapid note creation, category tagging, instant keyword filtering and local persistence. Developed with vanilla HTML5, modern CSS3 and browser DOM APIs, the application provides an accessible and distraction-free workspace that retains state across browser reloads without server dependencies.

---

## Features

* **Semantic HTML5 Architecture:** Fully structured using semantic `<header>`, `<main>`, `<section>` and `<footer>` elements with connected input labels for accessibility.
* **Responsive Flexbox Design:** Adaptive form controls that fluidly stack into an accessible column layout on mobile viewports ($\le$ 600px).
* **Categorical Visual Hierarchy:** Color-coded border indicators and metadata badges differentiating `Personal`, `Work` and `Study` entries.
* **Defensive Form Validation:** Immediate client-side validation enforcing non-empty input and a strict 200-character upper threshold with descriptive feedback.
* **Dynamic Search & Filtering:** Real-time query matching across active notes with an informative empty state when no matching records exist.
* **Persistent Browser Storage:** Seamless state synchronization using serialized `localStorage` and `JSON` methods.
* **Bulk State Cleanup (Bonus):** Integrated confirmation modal safeguarding against accidental collection deletion.

---

## Local Development & Execution

To clone and run QuickNotes locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/JDILEMMAX/quicknotes-app.git
   cd quicknotes-app
   ```

2. Open the project in VS Code:
   ```bash
   code-insiders .
   ```

3. Launch the application:
   * Right-click `index.html` and choose **Open with Live Server**, or open `index.html` directly in any modern web browser.

---

## What I Learned

1. **The Single Source of Truth & Render Pattern:** Decoupling DOM rendering from internal application state (`notes` array) ensures UI consistency and prevents race conditions between data mutations and visual elements.
2. **XSS Mitigation via DOM Construction:** Generating interface nodes programmatically using `document.createElement()` and `textContent` rather than `innerHTML` ensures user inputs cannot execute arbitrary script injections.
3. **Event Delegation & Scope Isolation:** Attaching atomic event listeners directly to generated buttons while filtering collections by unique numeric identifiers (`Date.now()`) provides reliable, collision-free state management.

---

## License

This project is open-source software licensed under the [MIT License](LICENSE).