import {
  createGetConnector,
  createPostConnector,
  createPatchConnector,
  createDeleteConnector
} from 'standard-json-api-connectors'

import RouteError from '../errors/RouteError.js'

export default function (fetch, apiUrl) {
  const generateAdditionalHeaders = (params) => {
    return { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
  }

  const generateAccountRoute = (params) => `/v1/accounts${params.id ? '/' + params.id : ''}`

  const generatePatchNameRoute = (params) => `/v1/accounts/${params.id}/name`

  const generatePatchurlFriendlyNameRoute = (params) => `/v1/accounts/${params.id}/urlFriendlyName`

  const generateCheckAvailabilityRoute = () => '/v1/accounts/check-availability'

  const generateCreateAccountRoute = () => '/v1/accounts/create'

  const generateFinalizeRegistrationRoute = (params) => `/v1/accounts/${params.accountId}/users/${params.id}/finalize-registration`

  const generateSendInvitationRoute = (params) => `/v1/accounts/${params.id}/invitation/send`

  const generateAcceptInvitationRoute = (params) => `/v1/accounts/${params.id}/invitation/accept`

  const generateSendForgotPasswordRoute = (params) => `/v1/accounts/${params.id}/forgot-password/send`

  const generateResetForgotPasswordRoute = (params) => `/v1/accounts/${params.id}/forgot-password/reset`

  const getAccountsList = createGetConnector(fetch, apiUrl, generateAccountRoute, generateAdditionalHeaders)
  const getAccount = createGetConnector(fetch, apiUrl, generateAccountRoute, generateAdditionalHeaders)
  const updateName = createPatchConnector(fetch, apiUrl, generatePatchNameRoute, generateAdditionalHeaders)
  const updateUrlFriendlyName = createPatchConnector(fetch, apiUrl, generatePatchurlFriendlyNameRoute, generateAdditionalHeaders)
  const del = createDeleteConnector(fetch, apiUrl, generateAccountRoute, generateAdditionalHeaders)
  const getCheckAvailability = createGetConnector(fetch, apiUrl, generateCheckAvailabilityRoute)
  const postCreateAccount = createPostConnector(fetch, apiUrl, generateCreateAccountRoute, generateAdditionalHeaders)
  const postFinalizeRegistration = createPostConnector(fetch, apiUrl, generateFinalizeRegistrationRoute, generateAdditionalHeaders)
  const postSendInvitation = createPostConnector(fetch, apiUrl, generateSendInvitationRoute, generateAdditionalHeaders)
  const postAcceptInvitation = createPostConnector(fetch, apiUrl, generateAcceptInvitationRoute, generateAdditionalHeaders)
  const postSendForgotPassword = createPostConnector(fetch, apiUrl, generateSendForgotPasswordRoute)
  const postResetForgotPassword = createPostConnector(fetch, apiUrl, generateResetForgotPasswordRoute, generateAdditionalHeaders)

  const list = async function (param, query) {
    const res = await getAccountsList({}, query)
    return res
  }

  const readOne = async function (id) {
    if (!id) {
      throw new RouteError('Admin ID Is Required')
    }
    const res = await getAccount(id)
    return res
  }

  const patchName = async function (formData) {
    if (!formData || !formData.id || !formData.name) {
      throw new RouteError('Account ID And New Name Is Required')
    }
    const res = await updateName({ id: formData.id }, { name: formData.name })
    return res
  }

  const patchUrlFriendlyName = async function (formData) {
    if (!formData || !formData.id || !formData.urlFriendlyName) {
      throw new RouteError('Account ID And New urlFriendlyName Is Required')
    }
    const res = await updateUrlFriendlyName({ id: formData.id }, { urlFriendlyName: formData.urlFriendlyName })
    return res
  }

  const deleteOne = async function (id) {
    if (!id) {
      throw new RouteError('Account ID Is Required')
    }
    const res = await del(id)
    return res
  }

  const checkAvailability = async function (data) {
    if (!data || !data.urlFriendlyName) {
      throw new RouteError('Account UrlFriendlyName Is Required')
    }
    const res = await getCheckAvailability({}, { urlFriendlyName: data.urlFriendlyName })
    return res
  }

  const createOne = async function (formData) {
    if (!formData || !formData.account || !formData.account.name || !formData.account.urlFriendlyName) {
      throw new RouteError('Account Name And UrlFriendlyName Is Required')
    } else if (!formData.user || !formData.user.name || !formData.user.email || !formData.user.password) {
      throw new RouteError('User Name, Email And Password Is Required')
    }
    const res = await postCreateAccount({}, { account: formData.account, user: formData.user })
    return res
  }

  const finalizeRegistration = async function (data) {
    if (!data || !data.id || !data.accountId || !data.token) {
      throw new RouteError('User Id And Account Id Is Required')
    }
    localStorage.setItem('accessToken', data.token)
    const res = await postFinalizeRegistration({ id: data.id, accountId: data.accountId })
    return res
  }

  const sendInvitation = async function (data) {
    if (!data || !data.id || !data.email) {
      throw new RouteError('Email Is Required')
    }
    const res = await postSendInvitation({ id: data.id }, { email: data.email })
    return res
  }

  const accept = async function (formData) {
    if (!formData || !formData.id || !formData.token || !formData.newPassword || !formData.newPasswordAgain || !formData.name) {
      throw new RouteError('Accouunt Password Is Required')
    }
    localStorage.setItem('accessToken', formData.token)
    const res = await postAcceptInvitation({ id: formData.id }, { newPassword: formData.newPassword, newPasswordAgain: formData.newPasswordAgain, name: formData.name })
    return res
  }

  const sendForgotPassword = async function (data) {
    if (!data || !data.email || !data.id) {
      throw new RouteError('Email Is Required')
    }
    const res = await postSendForgotPassword({ id: data.id }, { email: data.email })
    return res
  }

  const reset = async function (formData) {
    if (!formData || !formData.id || !formData.token || !formData.newPassword || !formData.newPasswordAgain) {
      throw new RouteError('User Password Is Required')
    }
    localStorage.setItem('accessToken', formData.token)
    const res = await postResetForgotPassword({ id: formData.id }, { newPassword: formData.newPassword, newPasswordAgain: formData.newPasswordAgain })
    return res
  }

  return {
    account: { list, readOne, deleteOne, patchName, patchUrlFriendlyName, createOne, finalizeRegistration, checkAvailability },
    invitation: { send: sendInvitation, accept },
    forgotPassword: { send: sendForgotPassword, reset }
  }
}
