import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { 
    path: '/', 
    redirect: '/notes' 
  },
  { 
    path: '/notes', 
    name: 'Notes', 
    component: () => import('./views/Notes.vue') 
  },
  { 
    path: '/login', 
    name: 'Login', 
    component: () => import('./views/Login.vue') 
  },
  { 
    path: '/register', 
    name: 'Register', 
    component: () => import('./views/Register.vue') 
  },
  { 
    path: '/about', 
    name: 'About', 
    component: () => import('./views/About.vue') 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  
  if (to.name === 'Notes' && !isAuthenticated) {
    next({ name: 'Login' });
  } 
  else if ((to.name === 'Login' || to.name === 'Register') && isAuthenticated) {
    next({ name: 'Notes' });
  }
  else {
    next();
  }
});

export default router;
