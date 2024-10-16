<script setup lang="ts">
import axiosInstance from '@/axios';
import type { Post } from '@/types';
import { usePostStore } from '@/store/usePostStore';
import { useUserStore } from '@/store/useUserStore';
import CommentsDialog from './CommentsDialog.vue';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

const props = defineProps<{
    post: Post
}>()

// Stores
const postStore = usePostStore()
const userStore = useUserStore()
const { thisUser } = storeToRefs(userStore)
const { getTimeLinePosts } = postStore

// Reactive Data
const isCommentsDialog = ref(false)
const toggleLike = async (postId: number | undefined) => {
    try {
        const response = await axiosInstance.post(`posts/${postId}/like/`);
        if (response) {
            getTimeLinePosts()
        }
    } catch (error) {
        console.error("Error liking the post:", error);
    }
};

</script>

<template>
    <div>
        <Card style="overflow: hidden" class="my-4">
            <template #header>
                <div class="inline-flex items-center gap-2 mb-4">
                    <Avatar
                        :image="props.post?.user?.profile_pic || 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png'"
                        shape="circle" />
                    <span class="font-bold whitespace-nowrap">{{ props.post?.user?.username }}</span>
                </div>
                <Image alt="user header" :src="props.post?.image" preview width="100%" height="550px"
                    class="object-contain" />
            </template>
            <template #subtitle>{{ props.post?.caption }}</template>
            <template #footer>
                <div class="flex gap-4 mt-1">
                    <Button :label="`Like ${props.post.likes?.length}`" severity="secondary" outlined class="w-full"
                        icon="pi pi-heart" @click="toggleLike(props.post?.id)"
                        :style="{ color: props.post.likes?.includes(thisUser?.id) ? 'green' : '' }" />
                    <Button :label="`Comments ${props.post.comments?.length}`" class="w-full" icon="pi pi-comment"
                        @click="isCommentsDialog = true" />
                </div>
            </template>
        </Card>
        <Divider />
        <CommentsDialog :visible="isCommentsDialog" :post="post" @close-dialog="isCommentsDialog = false" />
    </div>
</template>

<style lang="scss" scoped></style>