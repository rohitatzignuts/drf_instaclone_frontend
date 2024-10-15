import axiosInstance from "@/axios";
import type { Post } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const usePostStore = defineStore('posts', () => {
    const userPosts = ref<Post[]>([])
    const timeLinePosts = ref<Post[]>([])

    const getPosts = async () => {
        try {
            const response = await axiosInstance.get("posts/list")
            userPosts.value = response.data
        } catch (error) {
            console.log("Error getting posts: ", error);
        }
    }

    const getTimeLinePosts = async () => {
        try {
            const response = await axiosInstance.get("posts/all")
            timeLinePosts.value = response.data
        } catch (error) {
            console.log("Error getting time line posts: ", error);
        }
    }
    return {
        userPosts,
        timeLinePosts,
        getPosts,
        getTimeLinePosts,
    }
})