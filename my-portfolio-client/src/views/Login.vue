<template>
  <main class="container section-padding">
    <div class="auth-box">
      <h2>Вхід</h2>
      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="Email" required>
        </div>
        <div class="form-group">
          <label>Пароль</label>
          <input v-model="password" type="password" placeholder="Пароль" required>
        </div>
        <button type="submit" class="auth-button">Увійти</button>
      </form>
      <div class="auth-link">
        Немає акаунту? <router-link to="/register">Зареєструватися</router-link>
      </div>
    </div>
  </main>
</template>

<script>
import api from '../api';
export default {
  data() { return { email: '', password: '' }; },
  methods: {
    async handleLogin() {
      try {
        const response = await api.post('/auth/login', { 
          email: this.email, 
          password: this.password 
        });
        
        // 1. Очищаємо старі дані
        localStorage.clear();
        
        // 2. Зберігаємо новий актуальний токен
        localStorage.setItem('token', response.data.token);
        
        // 3. Переходимо на сторінку нотаток
        await this.$router.push('/notes');
        
        // 4. Перезавантажуємо сторінку для оновлення стану додатка
        window.location.reload();
      } catch (err) {
        console.error("Login error:", err);
        alert('Помилка входу: перевірте правильність даних');
      }
    }
  }
};
</script>
