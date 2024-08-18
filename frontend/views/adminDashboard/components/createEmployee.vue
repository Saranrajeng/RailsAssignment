<template>
  <div>
    <v-btn color="surface-variant" text="New Employee" @click="isActive = !isActive" variant="flat"></v-btn>
    <v-dialog v-model="isActive" max-width="500">
      <v-card title="New Employee">
        <v-card-text>
          <form>
            <v-text-field v-model="state.firstName" :error-messages="v$.firstName.$errors.map(e => e.$message)"
              label="First Name" required @blur="v$.firstName.$touch" @input="v$.firstName.$touch"></v-text-field>
            <v-text-field v-model="state.lastName" :error-messages="v$.lastName.$errors.map(e => e.$message)"
              label="Last Name" required @blur="v$.lastName.$touch" @input="v$.lastName.$touch"></v-text-field>
            <v-text-field v-model="state.email" :error-messages="v$.email.$errors.map(e => e.$message)" label="E-mail"
              required @blur="v$.email.$touch" @input="v$.email.$touch"></v-text-field>
            <v-text-field v-model="state.designation" :error-messages="v$.designation.$errors.map(e => e.$message)"
              label="Designation" required @blur="v$.designation.$touch" @input="v$.designation.$touch"></v-text-field>
            <v-select v-model="state.department" :error-messages="v$.department.$errors.map(e => e.$message)"
              :items="departments" item-value="id" item-title="name" label="Department" required
              @blur="v$.department.$touch" @change="v$.department.$touch" return-object>
            </v-select>
          </form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Create" @click="submitForm"></v-btn>
          <v-btn text="Close Dialog" @click="isActive = false"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import { onMounted, reactive, ref, watch } from 'vue';
const isActive = ref(false)
import http from "@/http"
import { toast } from 'vue3-toastify';
import { useEmployeeStore } from '@/stores/employeeStore';

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  designation: "",
  department: ""
}
const state = reactive({ ...initialState })
const departments = ref([]);

const rules = {
  firstName: { required },
  lastName: { required },
  email: { email, required },
  designation: { required },
  department: { required }
}
const getDepartments = async () => {
  try {
    const response = await http.get('department')
    departments.value = response.data.data
    console.log(departments.value);

  } catch (error) {
    console.log(error);

    toast(error.response.data.error)
  }
}

watch(isActive, (newValue, oldValue) => {
  if (newValue && departments.value.length == 0) {
    getDepartments()
  }
})

const v$ = useVuelidate(rules, state)

const submitForm = async () => {
  v$.value.$validate();
  if (v$.value.$pending || v$.value.$error) {
    return;
  }
  const employeeStore = useEmployeeStore();
  await employeeStore.createEmployee({
    first_name: state.firstName,
    last_name: state.lastName,
    designation: state.designation,
    email: state.email,
    department_id: state.department.id
  })
  clear()
  isActive.value = false;

}
const clear = () => {
  v$.value.$reset()

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value
  }
}
</script>

<style scoped></style>