<template>
  <main class="container section-padding">
    <section class="auth-box">
      <h2>Реєстрація нового користувача</h2>
      
      <form @submit.prevent="handleRegister" class="auth-form">
        <div class="form-group">
          <label for="reg_email">Електронна пошта</label>
          <input v-model="email" type="email" id="reg_email" placeholder="Ваш email" required>
        </div>
        
        <div class="form-group">
          <label for="reg_password">Пароль</label>
          <input v-model="password" type="password" id="reg_password" placeholder="Придумайте пароль" required>
        </div>

        <div class="form-group">
          <label for="reg_confirm">Підтвердіть пароль</label>
          <input v-model="confirmPassword" type="password" id="reg_confirm" placeholder="Повторіть пароль" required>
        </div>
        
        <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>
        
        <button type="submit" class="auth-button">Створити акаунт</button>
        
        <p class="auth-link">
          Вже маєте акаунт? <router-link to="/login">Увійти</router-link>
        </p>
      </form>
    </section>
  </main>
</template>

<script>
import api from '../api';

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleRegister() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Паролі не збігаються!";
        return;
      }

      try {
        await api.post('/auth/register', {
          email: this.email,
          password: this.password
        });

        alert('Реєстрація успішна! Тепер ви можете увійти.');
        this.$router.push('/login');
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Помилка при реєстрації';
      }
    }
  }
};
</script>

<style scoped>
/* Залишаються тільки специфічні для цієї сторінки стилі */
.error-msg { 
  color: #ff4d4d; 
  margin-bottom: 10px; 
  font-weight: bold; 
  text-align: center;
}
</style>
