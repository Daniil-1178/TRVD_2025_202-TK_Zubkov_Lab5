import axios from 'axios';
import router from './router';

// Створюємо екземпляр axios
const apiClient = axios.create({
  // ВАЖЛИВО: Переконайтеся, що порт (3000 чи 5000) збігається з вашим бекендом
  baseURL: 'http://localhost:3000/api',
});

// Перехоплювач запитів: додаємо токен до кожного запиту
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Перехоплювач відповідей: обробка помилок авторизації
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Перевіряємо, чи повернув сервер помилку 401 (Неавторизовано)
    if (error.response && error.response.status === 401) {
      
      // Отримуємо назву поточного маршруту
      const currentRouteName = router.currentRoute.value.name;

      // Якщо помилка 401 сталася НЕ на сторінці Login і НЕ на сторінці Register,
      // значить токен прострочився або видалений — тоді розлогінюємо
      if (currentRouteName !== 'Login' && currentRouteName !== 'Register') {
        localStorage.removeItem('token');
        router.push('/login');
      }
    }
    
    // Повертаємо помилку далі, щоб її можна було обробити в блоці catch у компонентах
    return Promise.reject(error);
  }
);

export default apiClient;
