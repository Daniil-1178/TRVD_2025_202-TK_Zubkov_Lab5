<template>
  <main class="container section-padding">
    <section class="auth-box" style="max-width: 800px;">
      <h2>Про проєкт</h2>
      
      <div class="about-content">
        <p>
          Це сучасний вебзастосунок для керування нотатками, розроблений як 
          <strong>Single Page Application (SPA)</strong> за допомогою фреймворку Vue.js.
        </p>
        
        <div class="tech-stack">
          <h3>Технологічний стек:</h3>
          <ul>
            <li><strong>Frontend:</strong> Vue.js 3, Vue Router для навігації без перезавантаження.</li>
            <li><strong>Backend:</strong> Node.js & Express (REST API).</li>
            <li><strong>База даних:</strong> MongoDB для надійного зберігання ваших записів.</li>
            <li><strong>Безпека:</strong> Авторизація на основі JWT-токенів.</li>
          </ul>
        </div>

        <p>
          Проєкт був створений, щоб кожен користувач міг працювати зі своїми нотатками. 
          Міг планувати свій день, будувати свої плани та занотовувати важливі моменти.
        </p>
      </div>
      
      <div class="back-actions">
        <button @click="goBack" class="auth-button">
          Повернутися назад
        </button>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'About',
  methods: {
    goBack() {
      // Повертає користувача на ту сторінку, з якої він прийшов 
      // (або на Notes, або на Login/Register)
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.about-content {
  text-align: left;
  line-height: 1.6;
}

.about-content p {
  margin-bottom: 20px;
  color: #444;
}

.tech-stack {
  margin: 25px 0;
  padding: 20px;
  background-color: #f4f7f6;
  border-left: 4px solid #0056b3;
  border-radius: 4px;
}

.tech-stack h3 {
  margin-top: 0;
  color: #003f8e;
  font-size: 1.2rem;
}

.tech-stack ul {
  list-style: disc;
  margin-left: 20px;
}

.tech-stack li {
  margin-bottom: 10px;
}

.back-actions {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

/* Використовуємо ширину кнопки як у формах, але не на весь екран */
.auth-button {
  max-width: 250px;
}
</style>
