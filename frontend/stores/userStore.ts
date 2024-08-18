import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import http from "../http"
import { toast } from 'vue3-toastify';
import router from "@/router";


export const useUserStore = defineStore('User', () => {
  const user = reactive({id: null, email: null, role: null, name: null})
  const isLoggedIn = ref(false)
  const token = ref('')
  const employee = ref({})

  const assignUser =(userData) => {
    user.id = userData.id
    user.email = userData.email
    user.name= userData.name
    user.role = userData.role
  }

  const login = async (email: string, password: string) => {
    try{
      const response = await http.post('login', { email, password });
      toast("Login successfully")
      isLoggedIn.value = true
      assignUser(response.data.user)
      token.value = response.data.token
      if(user.role =="admin"){
        router.push({name: "admin"})
      }else {
        employee.value= response.data.employee
        router.push({name: "employee"})
      }
    } catch (error) {   
      console.log(error);
         
      toast(error.response.data.error,{autoClose:1000})
    }
  }

  return { token, user, isLoggedIn, login, employee }
})