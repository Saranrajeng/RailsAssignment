import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Login from '@/views/Login.vue'
import { useUserStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/adminDashboard/index.vue'),
      meta: {
        requiresAdmin: true,
      },
      redirect: { name: "admin_employee" },
      children: [
        {
          path: "employee_crud",
          name: "admin_employee",
          component: () => import("../views/adminDashboard/components/employeeCrud/index.vue")
        },
        {
          path: "bill",
          name: "admin_bill",
          component: () => import("../views/adminDashboard/components/bill/index.vue")
        }
      ]
    },
    {
      path: '/employee',
      name: 'employee',
      component: () => import('../views/employeeDashboard/index.vue'),
      meta: {
        requiresAdmin: false,
      },
      redirect: { name: "employee_bill" },
      children: [
        {
          path: "bill",
          name: "employee_bill",
          component: () => import("../views/employeeDashboard/components/Bill.vue")
        }
      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (userStore.isLoggedIn == false && to.name != "login") {
    return next({ name: "login" })
  }

  if (to?.meta?.requiresAdmin == true) {
    if (userStore.user.role != "admin") {
      return next({ name: "employee" })
    }
  }
  next()
})

export default router
