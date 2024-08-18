<template>
  <div>
    <v-btn color="surface-variant" text="New Bill" @click="isActive = !isActive" variant="flat"></v-btn>
    <v-dialog v-model="isActive" max-width="500">
      <v-card title="New Bill">
        <v-card-text>
          <form>
            <v-select v-model="state.type" :error-messages="v$.type.$errors.map(e => e.$message)" :items="types"
              item-value="type" item-title="name" label="Type" required @blur="v$.type.$touch" @change="v$.type.$touch"
              return-object>
            </v-select>
            <v-text-field v-model="state.amount" :error-messages="v$.amount.$errors.map(e => e.$message)" label="Amount"
              required @blur="v$.amount.$touch" @input="v$.amount.$touch"></v-text-field>
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
import { required } from '@vuelidate/validators';
import { onMounted, reactive, ref, watch } from 'vue';
const isActive = ref(false)
import { useBillStore } from '@/stores/billStore';
import { useUserStore } from '@/stores/userStore';

const initialState = {
  type: "",
  amount: ""
}
const state = reactive({ ...initialState })
const types = ref([
  {
    type: "food",
    name: "Food"
  },
  {
    type: "travel",
    name: "Travel"
  },
  {
    type: "others",
    name: "Others"
  },

]);

const rules = {
  type: { required },
  amount: { required },
}

const v$ = useVuelidate(rules, state)

const clear = () => {
  v$.value.$reset()

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value
  }
}
const submitForm = async () => {
  v$.value.$validate();
  if (v$.value.$pending || v$.value.$error) {
    return;
  }
  const billStore = useBillStore()
  const userStore = useUserStore()
  await billStore.createBill({
    amount: state.amount,
    bill_type: state.type.type,
    submitted_by_id: userStore.employee.id
  })
  clear()
  isActive.value = false;
} 
</script>

<style scoped></style>