<template>
  <main class="container section-padding">
    <section class="auth-box">
      <h2>{{ isEditing ? 'Редагувати нотатку' : 'Нова нотатка' }}</h2>
      <form @submit.prevent="isEditing ? updateNote() : createNote()" class="auth-form note-form">
        <div class="form-group">
          <label>Заголовок</label>
          <input v-model="currentNote.title" type="text" placeholder="Введіть заголовок" required>
        </div>
        <div class="form-group">
          <label>Зміст</label>
          <textarea v-model="currentNote.content" rows="5" placeholder="Введіть текст нотатки" required></textarea>
        </div>
        <button type="submit" class="auth-button">
          {{ isEditing ? 'Оновити' : 'Зберегти' }}
        </button>
        <button v-if="isEditing" type="button" @click="cancelEdit" class="auth-button" style="background:#666; margin-top:10px;">
          Скасувати
        </button>
      </form>
    </section>

    <div class="section-padding">
      <h2>Ваші записи</h2>
      <div v-if="loading" class="auth-link">Завантаження...</div>
      <div v-else-if="notes.length === 0" class="auth-link">У вас ще немає нотаток.</div>
      <div v-else class="notes-grid">
        <div v-for="note in notes" :key="note._id" class="note-card">
          <h3>{{ note.title }}</h3>
          <p>{{ note.content }}</p>
          <div class="auth-buttons" style="margin-top:15px; margin-left:0;">
            <button @click="startEdit(note)" class="btn btn-login" style="padding:5px 10px; font-size:0.8em;">Редагувати</button>
            <button @click="deleteNote(note._id)" class="btn btn-register" style="padding:5px 10px; font-size:0.8em; background:#d9534f; border-color:#d9534f;">Видалити</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import api from '../api';

export default {
  data() {
    return { 
      notes: [], 
      loading: true, 
      isEditing: false, 
      editId: null, 
      currentNote: { title: '', content: '' } 
    };
  },
  async mounted() { 
    await this.fetchNotes(); 
  },
  methods: {
    async fetchNotes() {
      try {
        const response = await api.get('/notes');
        this.notes = response.data;
      } catch (err) { 
        console.error("Помилка завантаження нотаток:", err); 
      } finally { 
        this.loading = false; 
      }
    },
    async createNote() {
      try {
        await api.post('/notes', {
          title: this.currentNote.title,
          content: this.currentNote.content
        });
        this.resetForm();
        await this.fetchNotes();
      } catch (err) { 
        console.error("Помилка при створенні:", err.response?.data || err.message);
      }
    },
    async updateNote() {
      try {
        await api.put(`/notes/${this.editId}`, {
          title: this.currentNote.title,
          content: this.currentNote.content
        });
        this.cancelEdit();
        await this.fetchNotes();
      } catch (err) { 
        console.error("Помилка при оновленні:", err.response?.data || err.message);
      }
    },
    async deleteNote(id) {
      if (!confirm('Видалити цю нотатку?')) return;
      try { 
        await api.delete(`/notes/${id}`); 
        await this.fetchNotes(); 
      } catch (err) { 
        console.error("Помилка при видаленні:", err.response?.data || err.message);
      }
    },
    startEdit(note) {
      this.isEditing = true;
      this.editId = note._id;
      this.currentNote = { title: note.title, content: note.content };
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    cancelEdit() { 
      this.isEditing = false; 
      this.editId = null; 
      this.resetForm(); 
    },
    resetForm() { 
      this.currentNote = { title: '', content: '' }; 
    }
  }
};
</script>
