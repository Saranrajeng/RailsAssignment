<template>
  <createBill />
  <div class="mt-2 p-2">
    <h1>Bill</h1>
    <h4>Total Approved: {{ meta.total_approved }}</h4>
    <h4>Total Submitted: {{ meta.total_submitted }}</h4>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Type
          </th>
          <th class="text-left">
            Amount
          </th>
          <th class="text-left">
            Date of Submission
          </th>
          <th class="text-left">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>{{ item.type }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ formatDate(item.created_at) }}</td>
          <td>{{ item.status }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import createBill from './createBill.vue';
import { useBillStore } from '@/stores/billStore';
import { formatDate } from '@/utils/date';
const list = computed(()=>{
  const billStore = useBillStore()
  return billStore.list
})
const meta = computed(()=>{
  const billStore = useBillStore()
  return billStore.meta
})
onMounted(()=>{
  const billStore = useBillStore()
  billStore.fetchBill()
})
</script>

<style scoped></style>