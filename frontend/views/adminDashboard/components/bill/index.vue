<template>
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
            Submitted By
          </th>
          <th class="text-left">
            Department
          </th>
          <th class="text-left">
            Status
          </th>
          <th class="text-left">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>{{ item.type }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ formatDate(item.created_at) }}</td>
          <td>{{ item.submitted_by.first_name }} {{ item.submitted_by.last_name }}</td>
          <td>{{ item.department.name }}</td>
          <td>{{ item.status }}</td>
          <td>
            <template v-if="item.status == 'pending'"">
              <v-btn @click=" approve(item.id)">
              Approve
              </v-btn>
              <v-btn class="mx-2" @click="reject(item.id)">
                Reject
              </v-btn>
            </template>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup lang="ts">
import { useBillStore } from '@/stores/billStore';
import { compile, computed, onMounted } from 'vue';
import { formatDate } from '@/utils/date';
const list = computed(() => {
  const billStore = useBillStore()
  return billStore.list
})
const meta = computed(() => {
  const billStore = useBillStore()
  return billStore.meta
})
onMounted(() => {
  const billStore = useBillStore()
  billStore.fetchBill()
})

const approve = async (id) => {
  const billStore = useBillStore()
  billStore.approve(id)
}

const reject = async (id) => {
  const billStore = useBillStore()
  billStore.reject(id)
}
</script>

<style scoped></style>