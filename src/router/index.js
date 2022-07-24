import { createRouter, createWebHistory } from 'vue-router'

import UserView from '../views/UserView.vue'
import MeView from '../views/MeView.vue'
import AccountView from '../views/AccountView.vue'
import SetAndReSetPasswordView from '../views/SetAndReSetPasswordView.vue'
import EmailAndNameFormView from '../views/EmailAndNameFormView.vue'
import LoginView from '../views/LoginView.vue'
import CreateAccountView from '../views/CreateAccountView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/users',
      name: 'users',
      component: UserView
    },
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/finalize-registration',
      name: 'finalize-registration',
      component: LoginView
    },
    {
      path: '/createAccount',
      name: 'createAccount',
      component: CreateAccountView
    },
    {
      path: '/loginSelect',
      name: 'loginSelect',
      component: LoginView
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: EmailAndNameFormView
    },
    {
      path: '/me',
      name: 'me',
      component: MeView
    },
    {
      path: '/patchUserName',
      name: 'patchUserName',
      component: MeView
    },
    {
      path: '/patchPassword',
      name: 'patchPassword',
      component: MeView
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView
    },
    {
      path: '/patchAccountName',
      name: 'patchAccountName',
      component: AccountView
    },
    {
      path: '/patchUrlFriendlyName',
      name: 'patchUrlFriendlyName',
      component: AccountView
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: EmailAndNameFormView
    },
    {
      path: '/forgot-password/reset',
      name: 'forgot-password-reset',
      component: SetAndReSetPasswordView
    },
    {
      path: '/invitation',
      name: 'invite',
      component: EmailAndNameFormView
    },
    {
      path: '/invitation/accept',
      name: 'accept-invitation',
      component: SetAndReSetPasswordView
    }
  ]
})

export default router
