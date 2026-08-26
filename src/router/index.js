import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'home', component: () => import('../views/Home.vue') },
  { path: '/about', name: 'about', component: () => import('../views/About.vue') },
  { path: '/projects', name: 'projects', component: () => import('../views/Projects.vue') },
  {
    path: '/projects/:slug',
    name: 'project-detail',
    component: () => import('../views/projects/ProjectDetail.vue'),
    props: true,
  },
  { path: '/contact', name: 'contact', component: () => import('../views/Contact.vue') },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFound.vue') },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
