<template>
  <div class="mt-2 p-2">
    List
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Full Name
          </th>
          <th class="text-left">
            Designation
          </th>
          <th class="text-left">
            Department
          </th>
          <th class="text-left">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>{{ item.first_name }} {{ item.last_name }}</td>
          <td>{{ item.designation }}</td>
          <td>{{ item.department_id }}</td>
          <td>
            <v-btn @click="editItem(item.id)">
              edit
            </v-btn>
            <v-btn class="mx-2" @click="deleteItem(item.id)">
              delete
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup lang="ts">
import { useEmployeeStore } from '@/stores/employeeStore';
import { computed, onMounted } from 'vue';
const list = computed(() => {
  const employeeStore = useEmployeeStore()
  return employeeStore.list
})
const editItem = (id) => {
  const employeeStore = useEmployeeStore()
  employeeStore.isEdit = true
  employeeStore.editId = id
}
const deleteItem = (id) => {
  const employeeStore = useEmployeeStore()
  employeeStore.deleteEmployee(id)
}
onMounted(() => {
  const employeeStore = useEmployeeStore()
  employeeStore.fetchEmployee()
})
</script>

<style scoped></style>