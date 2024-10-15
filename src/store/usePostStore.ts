import axiosInstance from "@/axios";
import type { Post } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const usePostStore = defineStore('posts', () => {
    const userPosts = ref<Post[]>([])

    const getPosts = async () => {
        try {
            const response = await axiosInstance.get("posts/list")
            userPosts.value = response.data
        } catch (error) {
            console.log("Error getting posts: ", error);
        }
    }

    return {
        getPosts,
        userPosts
    }
})