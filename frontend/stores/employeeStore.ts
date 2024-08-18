import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import http from "./../http";
import { toast } from 'vue3-toastify';

export const useEmployeeStore = defineStore('employee', () => {
  const list = ref([]);
  const isEdit = ref(false)
  const editId = ref(null)

  const createEmployee = async (employeeObj) => {
    try {
      const response = await http.post('employee', { employee: employeeObj })
      console.log(response);
      fetchEmployee()

    } catch (error) {
      console.log(error);

    }
  }

  const updateEmployee = async (employeeObj,id) => {
    try {
      const response = await http.put(`employee/${id}`, { employee: employeeObj })
      console.log(response);
      fetchEmployee()

    } catch (error) {
      console.log(error);

    }
  }

  const fetchEmployee = async () => {
    try {
      const response = await http.get('employee')
      list.value = response.data.data
    } catch (error) {
      console.log(error)
    }
  }

  const deleteEmployee = async (id) => {
    try {
      const response = await http.delete(`employee/${id}`)
      fetchEmployee()
    } catch (error) {
      console.log(error)
      toast(error?.response?.data || "Error")
    }
  }

  return { list, createEmployee, fetchEmployee, deleteEmployee,updateEmployee, isEdit, editId }
})