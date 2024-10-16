import axiosInstance from "@/axios";
import type { User } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('users', () => {
    const thisUser = ref<User | undefined>()

    const getUserDetails = async () => {
        try {
            const response = await axiosInstance.get("user/")
            if (response) {
                thisUser.value = response.data
            }
        } catch (error) {
            console.log(error);
        }
    }

    return {
        getUserDetails,
        thisUser
    }
})