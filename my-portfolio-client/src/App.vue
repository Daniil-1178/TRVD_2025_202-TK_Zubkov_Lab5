<template>
  <div id="app">
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <router-link to="/">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ69Fwj99WJXjBQDCclk1og9MAoF_NFTWiDww&s.jpg" alt="Логотип">
              <h1>Сервіс для нотаток</h1>
            </router-link>
          </div>
          <nav class="main-nav">
            <ul class="nav-list">
              <li><router-link to="/about">Про сайт</router-link></li>
            </ul>
          </nav>
          <div class="auth-buttons">
            <template v-if="!isLoggedIn">
              <router-link to="/login" class="btn btn-login">Увійти</router-link>
              <router-link to="/register" class="btn btn-register">Реєстрація</router-link>
            </template>
            <button v-else @click="handleLogout" class="btn btn-login">Вийти</button>
          </div>
        </div>
      </div>
    </header>

    <router-view />

    <footer class="footer">
      <div class="container">
        <div class="footer-bottom">
          <p>&copy; 2025 Сервіс для нотаток. Усі права захищено.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: !!localStorage.getItem('token')
    };
  },
  watch: {
    '$route'() {
      this.isLoggedIn = !!localStorage.getItem('token');
    }
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('token');
      this.isLoggedIn = false;
      this.$router.push('/login');
    }
  }
};
</script>

<style>
/* Базова структура для притискання футера до низу */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex: 1;
}
</style>
