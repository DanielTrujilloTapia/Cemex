import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import EditProfilePage from '../views/EditProfilePage.vue'
import DeleteAccountPage from '../views/DeleteAccountPage.vue'
import CameraPage from '../views/CameraPage.vue'
import BoardPage from '../views/BoardPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/editprofile',
    name: 'EditProfile',
    component: EditProfilePage
  },
  {
    path: '/deleteaccount',
    name: 'DeleteAccount',
    component: DeleteAccountPage
  },
  {
    path: '/camera',
    name: 'Camera',
    component: CameraPage
  },
  {
    path: '/board',
    name: 'Board',
    component: BoardPage
  },

  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '/tabs/',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/HomePage.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/ScannerPage.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/SettingsPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
