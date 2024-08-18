<template>
  <div class="login-container">
    <div class="login">
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Login form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <form>
            <v-text-field v-model="state.email" :error-messages="v$.email.$errors.map(e => e.$message)" label="E-mail"
              required @blur="v$.email.$touch" @input="v$.email.$touch"></v-text-field>
            <v-text-field v-model="state.password" :error-messages="v$.password.$errors.map(e => e.$message)" type="password"
              label="Password" required @blur="v$.password.$touch" @input="v$.password.$touch"></v-text-field>
            <v-btn class="me-4" @click="submitForm">
              Login
            </v-btn>
          </form>
        </v-card-text>
      </v-card>
    </div>
  </div>

</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import { useUserStore } from '@/stores/userStore';

const initialState = {
  email: '',
  password: ''
}

const state = reactive({
  ...initialState,
})

const rules = {
  password: { required },
  email: { required, email },
}

const v$ = useVuelidate(rules, state)

const submitForm = async () => {
  v$.value.$validate();
  if (v$.value.$pending || v$.value.$error) {
    return;
  }
  const userStore = useUserStore()
  await userStore.login(state.email, state.password)
}

</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login {
  width: 800px;
  padding: 20px;
  text-align: center;
}
</style>