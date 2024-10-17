<script setup lang="ts">
import axiosInstance from "@/axios";
import type { Post } from "@/types";
import { ref } from "vue";
import { usePostStore } from "@/store/usePostStore";
import { useToast } from "primevue/usetoast";
import axios from "axios";

const props = defineProps<{
    visible: boolean
    post: Post | undefined
}>()

const emit = defineEmits<{
    (e: 'closeDialog', value: boolean): void
}>()

// Stores
const postStore = usePostStore()
const { getTimeLinePosts } = postStore

// Constants
const toast = useToast()

// Reactive Data
const userComment = ref('')

// Methods
const addComment = async () => {
    try {
        const response = await axiosInstance.post(`posts/${props.post?.id}/comments/`, {
            content: userComment.value,
        });

        if (response) {
            getTimeLinePosts()
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            // Extract error details from the API response
            const errorData = error.response.data;
            const errorMessage = Object.values(errorData)
                .flat()
                .join(', ');
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
        userComment.value = ''
    }
};

</script>

<template>
    <div>
        <div class="card flex justify-center">
            <!-- <Button label="Show" @click="props.visible = true" /> -->
            <Dialog v-model:visible="props.visible" :draggable="false" :closable="false" modal header="Edit Profile"
                :style="{ width: '510px' }">
                <template #header>


                    <div class="flex items-center justify-between w-full">
                        <div class="flex-grow mr-4">
                            <InputText type="text" v-model="userComment" placeholder="Comment" class="w-full"
                                @keyup.enter="addComment" />
                        </div>
                        <Button type="button" severity="secondary" icon="pi pi-times"
                            @click="emit('closeDialog', props.visible)" />
                    </div>
                </template>
                <p class="font-medium pb-4">Comments</p>
                <div v-if="!props.post?.comments?.length">
                    <p class="text-muted-color-emphasis">
                        there are no comments.. u are lame !!
                    </p>
                </div>
                <div v-else>
                    <VirtualScroller :items="props.post?.comments" :itemSize="props.post?.comments?.length"
                        class="border border-surface-200 dark:border-surface-700 rounded" style="height: 300px">
                        <template v-slot:item="{ item, options }">
                            <div class="flex gap-2 items-center my-2 px-2 cursor-pointer">
                                <Avatar :image="item?.user?.profile_pic" shape="circle" />
                                <span class="text-muted-color-emphasis">{{ item?.content }}</span>
                            </div>
                        </template>
                    </VirtualScroller>
                </div>
            </Dialog>
        </div>
    </div>
</template>

<style scoped></style>