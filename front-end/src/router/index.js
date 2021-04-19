import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Job from '../views/Job.vue'
import Saved from '../views/Saved.vue'
import Application from '../views/Application.vue'
import Employers from '../views/Employers.vue'
import SaveApp from '../views/SaveApp.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/job',
    name: 'Job',
    component: Job
  },
  {
    path: '/saved',
    name: 'Saved',
    component: Saved
  },
  {
    path: '/application',
    name: 'Application',
    component: Application
  },
  {
    path: '/employers',
    name: 'Employers',
    component: Employers
  },
  {
    path: '/saveapp',
    name: 'SaveApp',
    component: SaveApp
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router