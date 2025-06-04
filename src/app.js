import './components.js';
import './styles1.css';
import NotesApi from './api/notesapp-api.js';

document.addEventListener('DOMContentLoaded', () => {
  const notesList = document.getElementById('notesList');
  const titleInput = document.querySelector('note-input').shadowRoot.querySelector('input');
  const contentInput = document.querySelector('note-textarea').shadowRoot.querySelector('textarea');
  const addButton = document.querySelector('note-button').shadowRoot.querySelector('button');

    // Fungsi indikator loading
  const showLoader = () => {
    document.getElementById('loader').style.display = 'block';
  };

  const hideLoader = () => {
    document.getElementById('loader').style.display = 'none';
  };

  // Tampilkan catatan dari API
 const renderNotes = async () => {
  showLoader();
  notesList.innerHTML = ''; // kosongkan dulu

  try {
    const notes = await NotesApi.getNotes();
    notes.forEach((note) => {
      const noteElement = document.createElement('note-card');
      noteElement.note = note;

      // Tambahkan tombol hapus
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Hapus';
      deleteButton.classList.add('delete-button');
      deleteBtn.addEventListener('click', async () => {
        showLoader();
        await NotesApi.deleteNotes(note.id);
        await renderNotes(); // refresh setelah hapus
      });

      noteElement.appendChild(deleteBtn);
      notesList.appendChild(noteElement);
    });
  } catch (error) {
    alert('Gagal memuat catatan');
  } finally {
    hideLoader();
  }
};

  // Handler tombol tambah catatan
  addButton.addEventListener('click', async () => {
    const title = titleInput.value.trim();
    const body = contentInput.value.trim();

    if (!title || !body) {
      alert('Judul dan isi catatan tidak boleh kosong.');
      return;
    }

    showLoader();
    try {
      await NotesApi.addNotes(title, body);
      titleInput.value = '';
      contentInput.value = '';
      await renderNotes();
    } catch (error) {
      alert('Gagal menambahkan catatan.');
    } finally {
      hideLoader();
    }
  });

  // Load pertama kali
  renderNotes();
});