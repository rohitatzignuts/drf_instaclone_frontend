<script setup lang="ts">
import { ref } from 'vue';
import axiosInstance from '@/axios';
import type { Post } from '@/types';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';
import { usePostStore } from '@/store/usePostStore';

// Stores
const postStore = usePostStore()
const { getPosts } = postStore
// Constants
const toast = useToast()

// Reactive Data
const fileupload = ref<any>()
const post = ref<Post>({
    image: null,
    caption: ""
})
const handlePostCreate = async () => {
    try {
        if (!fileupload.value.files.length) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'please select an image',
                life: 3000,
            });
            return
        }
        const formData = new FormData()
        formData.append('image', fileupload.value.files[0])
        formData.append('caption', post.value.caption)

        const response = await uploadPost(formData)
        if (response) {
            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: 'post added successfully!',
                life: 3000,
            });
            getPosts()
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorData = error.response.data
            const errorMessage = Object.values(errorData).flat().join(', ')
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: errorMessage,
                life: 3000,
            });
        } else {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'An unexpected error occurred.',
                life: 3000,
            });
        }
    } finally {
        clearData()
    }
}

const uploadPost = async (formData: FormData) => {
    return await axiosInstance.post("posts/", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
};

const clearData = () => {
    post.value.image = null
    post.value.caption = ""
    fileupload.value.clear();
}
</script>

<template>
    <div>
        <Toast />
        <p class="text-2xl font-bold">Add Post</p>
        <Divider />
        <section>
            <form @submit.prevent="handlePostCreate" enctype="multipart/form-data">
                <div class="flex flex-col gap-4">
                    <FileUpload ref="fileupload" mode="basic" name="image" accept="image/*" :maxFileSize="1000000"
                        class="items-start" />
                    <InputText v-model="post.caption" type="text" size="large" placeholder="Caption" class="w-full" />
                    <Button type="submit" label="Upload" icon="pi pi-upload" />
                </div>
            </form>
        </section>
    </div>
</template>


<style scoped></style>