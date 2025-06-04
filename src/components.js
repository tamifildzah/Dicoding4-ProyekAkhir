// components.js

// Komponen input
class NoteInput extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const label = this.getAttribute('label') || '';
    const id = this.getAttribute('id') ? this.getAttribute('id') + '-input' : 'input-id';

    shadow.innerHTML = `
      <style>
        .container {
          width: 100%;
        
        }
        label {
          margin-bottom: 6px;
          display: block;
        }
        input {
          margin right: 24px;
          width: 100%;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
      </style>
      <label for="${id}">${label}</label>
      <input type="text" id="${id}" />
    `;
  }
}
customElements.define('note-input', NoteInput);

// Komponen textarea
class NoteTextarea extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const label = this.getAttribute('label') || '';
    const id = this.getAttribute('id') ? this.getAttribute('id') + '-textarea' : 'textarea-id';

    shadow.innerHTML = `
      <style>
        .container {
          width: 100%;
         
        }
        label {
          margin-bottom: 6px;
          display: block;
        
        }
        textarea {
          width: 100%;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
          min-height: 100px;
          margin right: 24px;
        }
      </style>
      <label for="${id}">${label}</label>
      <textarea id="${id}"></textarea>
    `;
  }
}
customElements.define('note-textarea', NoteTextarea);

// Komponen tombol
class NoteButton extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const label = this.getAttribute('label') || 'Submit';

    shadow.innerHTML = `
      <style>
        .container {
          width: 100%;
        }
        button {
          background-color: #C95792;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 16px;
          width: 100%;
          cursor: pointer;
          font-size: 1rem;
        }
      </style>
      <button>${label}</button>
    `;
  }
}
customElements.define('note-button', NoteButton);

//Untuk Data notesData
class NoteCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set note(data) {
    const { title, body, createdAt } = data;

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 16px;
          background-color: #fff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: column;
          gap: 8px;
          position: relative;
        }

        .title {
          font-weight: bold;
          font-size: 1.2rem;
        }

        .body {
          font-size: 0.95rem;
          color: #333;
        }

        .date {
          font-size: 0.8rem;
          color: #888;
        }

        .delete-btn {
          margin-top: 10px;
          align-self: flex-end;
          background: #e74c3c;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 4px;
          cursor: pointer;
        }
      </style>
      <div class="card">
        <div class="title">${title}</div>
        <div class="body">${body}</div>
        <div class="date">${new Date(createdAt).toLocaleString()}</div>
        <button class="delete-btn">Hapus</button>
      </div>
    `;
    // Event hapus
    this.shadowRoot.querySelector('.delete-btn').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('delete-note', {
        detail: { id },
        bubbles: true,
       composed: true,
      }));
    });
  }
}

customElements.define('note-card', NoteCard);

