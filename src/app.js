import './components.js';
import './styles1.css';
import NotesApi from './api/notesapp-api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const notesList = document.getElementById('notesList');
  const titleInput = document.querySelector('note-input').shadowRoot.querySelector('input');
  const contentInput = document.querySelector('note-textarea').shadowRoot.querySelector('textarea');
  const addButton = document.querySelector('note-button').shadowRoot.querySelector('button');

  // Tampilkan catatan dari API
  const renderNotes = async () => {
    notesList.innerHTML = ''; // kosongkan dulu
    const notes = await NotesApi.getNotes();

    notes.forEach((note) => {
      const noteElement = document.createElement('note-card');
      noteElement.note = note;
      notesList.appendChild(noteElement);
    });
  };

  await renderNotes();

  addButton.addEventListener('click', async () => {
    const title = titleInput.value.trim();
    const body = contentInput.value.trim();

    if (!title || !body) {
      alert('Judul dan isi catatan tidak boleh kosong.');
      return;
    }

    // Tambahkan catatan ke server
    await NotesApi.addNotes(title, body);

    // Bersihkan input
    titleInput.value = '';
    contentInput.value = '';

    // Tampilkan ulang semua catatan
    await renderNotes();
  });
});
