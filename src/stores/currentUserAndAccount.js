import { defineStore } from 'pinia'
import jwtDecode from 'jwt-decode'

import RouteError from '../errors/RouteError.js'
import useSystemMessagesStore from './systemMessages.js'

export default (connectors) => {

  const storage = {}
 const storedAccessToken = localStorage.getItem('accessToken')
   if (!storedAccessToken || Date.now() >= jwtDecode(storedAccessToken).exp * 1000) {
  /*   if (window.location.pathname !== "/") {
       window.location.href = "/";
     }*/
   }else {
     storage.user = jwtDecode(storedAccessToken).user
     storage.account = jwtDecode(storedAccessToken).account
     storage.accessToken = storedAccessToken
  /*
     if (window.location.pathname === "/") {
       window.location.pathname = "/me";
     }*/
   }

  const currentUserAndAccountStore = defineStore('currentUserAndAccount', {
    state: () => ({
      accessToken: storage.accessToken,
      user: storage.user,
      account: storage.account
    }),
    getters: {
   loggedIn () {
      return !!this.user || !! this.account
    }
  },
    actions: {
      async login (token, password, accountId) {
        try {
          localStorage.setItem('accessToken', token)
          this.accessToken = await connectors.user.login({ password, accountId })
          const tokenData = jwtDecode(this.accessToken)
          this.accessToken = await connectors.user.getAccessToken({ id: tokenData.user._id, accountId: tokenData.account._id })
          this.user = await connectors.user.readOne({ id: tokenData.user._id, accountId: tokenData.account._id })
          this.account = await connectors.account.readOne({ id: tokenData.account._id })
          return 'success'
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      },
      async createAccount (formData) {
        try {
          await connectors.account.createOne(formData)
          return 'success'
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      },
      async loginGetAccounts (email) {
        try {
          const res = await connectors.user.loginGetAccounts({ email })
          return res
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      },
      logout () {
        localStorage.removeItem('accessToken')
        this.accessToken = null
        this.user = null
      },

      async  sendForgotPassword (data) {
        try {
          if (!data || ! data.email || !data.accountId) {
            throw new RouteError('account Id and email Is Required')
          }
          const res = await connectors.forgotPassword.send({ email:data.email, id: data.accountId })
          return res
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      },

      async  resetForgotPassword (forgotPasswordToken, newPassword, newPasswordAgain) {
        try {
          const forgotPasswordTokenData = jwtDecode(forgotPasswordToken)
          if (!forgotPasswordToken || !forgotPasswordTokenData || Date.now() >= forgotPasswordTokenData.exp * 1000 || !newPassword || !newPasswordAgain) {
            throw new RouteError('Valid token, password and new password Is Required')
          }
          this.accessToken = await connectors.forgotPassword.reset({ id: forgotPasswordTokenData.user.accountId, token: forgotPasswordToken, newPassword, newPasswordAgain })
          const tokenData = jwtDecode(this.accessToken)
          this.accessToken = await connectors.user.getAccessToken({ id: tokenData.user._id, accountId: tokenData.user.accountId })
          this.user = await connectors.user.readOne({ id: tokenData.user._id, accountId: tokenData.user._id })
          return 'success'
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      },

      async sendInvitation (email) {
        try {
          if (this.account === null || this.account._id === undefined) {
            throw new RouteError('account ID Is Required')
          }
          await connectors.invitation.send({ email, id: this.account._id })
          return 'success'
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      },
      async acceptInvitation (acceptInvitationToken, newPassword, newPasswordAgain, name) {
        try {
          if (this.account === null || this.account._id === undefined) {
            throw new RouteError('account ID Is Required')
          }
          this.accessToken = await connectors.invitation.accept({ id: this.account._id, token: acceptInvitationToken, newPassword, newPasswordAgain, name })
          const tokenData = jwtDecode(this.accessToken)
          this.accessToken = await connectors.user.getAccessToken({ id: tokenData.user._id, accountId: tokenData.user.accountId })
          this.user = await connectors.user.readOne({ id: tokenData.user._id, accountId: tokenData.user._id })
          return 'success'
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      },
      async readOne () {
        try {
          if (this.account === null || this.account._id === undefined) {
            throw new RouteError('account ID Is Required')
          }
          this.account = await connectors.account.readOne({ id: this.account._id })
          return this.account
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      },
      async patchUserName (name) {
        try {
          if (this.account === null || this.account._id === undefined || this.user === null || this.user._id === undefined) {
            throw new RouteError('User ID Is Required')
          }
          await connectors.user.patchName({ id: this.user._id, name, accountId: this.account._id })
          this.user.name = name
          return 'success'
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      },
      async patchAccountName (name) {
        try {
          if (this.account === null || this.account._id === undefined || this.user === null || this.user._id === undefined) {
            throw new RouteError('User ID Is Required')
          }
          await connectors.account.patchName({ id: this.account._id, name })
          this.account.name = name
          return 'success'
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      },
      async patchUrlFriendlyName (newUrlFriendlyName) {
        try {
          if (this.account === null || this.account._id === undefined) {
            throw new RouteError('account ID Is Required')
          }
          await connectors.account.patchUrlFriendlyName({ id: this.account._id, urlFriendlyName: newUrlFriendlyName })
          this.account.urlFriendlyName = newUrlFriendlyName
          return 'success'
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      },
      async patchPassword (oldPassword, newPassword, newPasswordAgain) {
        try {
          if (this.user === null || this.user._id === undefined || this.account === undefined || this.account._id === undefined) {
            throw new RouteError('Admin ID Is Required')
          }
          await connectors.user.patchPassword({ accountId: this.account._id, id: this.user._id, oldPassword, newPassword, newPasswordAgain })
          return 'success'
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      },
      async finalizeRegistration (token) {
        try {
          const tokenData = jwtDecode(token)
          if (!token || !tokenData || Date.now() >= tokenData.exp * 1000) {
            throw new RouteError('Valid Token Is Required')
          }
          await connectors.account.finalizeRegistration({ id: tokenData.user._id, accountId: tokenData.account._id, token })
          return 'success'
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      }
    }
  })

  return currentUserAndAccountStore
}
