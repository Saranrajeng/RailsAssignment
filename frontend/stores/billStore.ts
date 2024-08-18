import { defineStore } from "pinia";
import { ref } from "vue";
import http from "../http"

export const useBillStore = defineStore("bill", () => {
  const list = ref([])
  const meta = ref({ total_approved: 0, total_submitted: 0 })
  const fetchBill = async () => {
    try {
      const response = await http.get('bill')
      list.value = response.data.data
      meta.value = response.data.meta
    } catch (error) {

    }
  }

  const approve = async (id) => {
    try {
      const response = await http.patch(`bill/${id}/approve`)
      list.value.find(element => element.id == id).status = "approved"
    } catch (error) {
      console.log(error)
    }
  }

  const reject = async (id) => {
    try {
      const response = await http.patch(`bill/${id}/reject`)
      list.value.find(element => element.id == id).status = "rejected"
    } catch (error) {
      console.log(error)
    }
  }

  const createBill = async (billObj) => {
    try{
      const response = await http.post('bill',{bill: billObj})
    } catch(error){
      console.log(error)
    }
  }

  return { list, fetchBill, approve, reject, meta, createBill }
})