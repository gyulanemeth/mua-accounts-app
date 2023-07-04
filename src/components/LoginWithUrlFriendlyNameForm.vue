<script setup >
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  formData: Object
})

const route = useRoute()
const data = ref({})
const processing = ref(false)

const appIcon = window.config.appIcon
const title = window.config.title
const url = ref(window.location.href)
</script>

<template>
    <v-form class="d-flex flex-column justify-center align-center h-screen">
        <v-card elevation="0" class="w-25">
            <v-card-text align="center">
                <v-avatar size="80">
                    <v-img :src="appIcon" cover></v-img>
                </v-avatar>
            </v-card-text>
            <v-card-title class="justify-center py-0">
                <h4 class="text-h4"> {{ title }} </h4>
            </v-card-title>
        </v-card>
        <v-card class="ma-2 pa-2  rounded-xl  elevation-2" width="30%">
            <v-card-text align="center">
                <h6 class="text-h6">{{ $t('loginAndResetForm.loginUrlFriendlyNameHeader', {
                    name:
                        props.formData.accountName
                }) }} </h6>
                <h6 class="text-subtitle-1">({{ url }})</h6>

                <v-text-field hide-details data-test-id="loginAndResetForm-emailField" density="compact"
                    class=" elevation-2 my-5 pt-2 pl-3 rounded" color="info" variant="plain" type="email" name="email"
                    :placeholder="data.email || $t('loginAndResetForm.emailPlaceHolder')" :value="data.email"
                    @update:modelValue="res => data.email = res.replace(/[^a-z0-9+@ \.,_-]/gim, '')" required />

                <v-text-field hide-details density="compact" class=" elevation-2 my-5 pt-2 pl-3 rounded" color="info"
                    variant="plain" name="password" data-test-id="loginAndResetForm-passwordField"
                    :label="$t('loginAndResetForm.passwordLabel')" type="password"
                    :placeholder="data.password || $t('loginAndResetForm.passwordPlaceholder')" :value="data.password"
                    @update:modelValue="res => data.password = res.replace(/[^a-z0-9!@#$%^&* \.,_-]/gim, '')" required />

                <div>
                    <v-btn color="info" data-test-id="loginAndResetForm-getLoginAccountsBtn"
                        @click="processing = true; $emit('handleLoginWithUrlFriendlyName',{ email: data.email, password: data.password, urlFriendlyName: props.formData.urlFriendlyName }, () => { processing = false })">
                        {{ !processing ? $t('loginAndResetForm.loginBtnText') : '' }}
                        <v-progress-circular v-if="processing" :size="20" class="pa-3 ma-3"
                            indeterminate></v-progress-circular>{{ processing ? $t('processing') : '' }}
                    </v-btn>

                    <div class=" pa-4">
                        <p>{{ $t('loginAndResetForm.forgotHeader') }}
                            <router-link style="text-decoration: none; color: inherit;"
                                data-test-id="loginAndResetForm-resetPasswordBtn" class="font-weight-bold"
                                :to="`/forgot-password?urlFriendlyName=${route.params.urlFriendlyName}`">{{ $t('loginAndResetForm.forgotBtn')
                                }}</router-link>
                        </p>
                        <p>{{ $t('loginAndResetForm.cb.loginToDifferentAccountMessage') }}
                            <router-link data-test-id="loginAndResetForm-createAccountBtn"
                                style="text-decoration: none;  color: inherit;" class="font-weight-bold" to="/">{{
                                    $t('loginAndResetForm.cb.loginToDifferentAccountCbBtn') }}</router-link>
                        </p>
                        <button hidden
                            @click.enter.prevent="processing = true; $emit('handleLoginWithUrlFriendlyName', { email: data.email, password: data.password, urlFriendlyName: props.formData.urlFriendlyName }, () => { processing = false })" />
                        {{ $t('loginAndResetForm.cb.forgotMessage') }}
                        <router-link data-test-id="loginAndResetForm-createAccountBtn"
                            style="text-decoration: none;  color: inherit;" class="font-weight-bold" to="/create-account">{{
                                $t('loginAndResetForm.cb.forgotCbBtn') }}</router-link>
                    </div>
                </div>
            </v-card-text>

        </v-card>
    </v-form>
</template>