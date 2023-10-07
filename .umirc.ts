import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: '/', redirect: '/login'},
    { path: "/login", component: "login", layout: false },
    { path: '/user', component: 'user', wrappers: [
      '@/auth',
    ]},
  ],
  npmClient: 'pnpm',
});
