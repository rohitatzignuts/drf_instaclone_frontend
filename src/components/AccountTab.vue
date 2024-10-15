<script setup lang="ts">
import { usePostStore } from '@/store/usePostStore';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import PostDialog from './PostDialog.vue';
import type { Post } from '@/types';

// Stores
const postStore = usePostStore()
const { getPosts } = postStore
const { userPosts } = storeToRefs(postStore)

// Reactive Data
const isPostDialogVisible = ref(false)
const currPost = ref<Post | undefined>()

// Methods
const viewPost = (post: Post) => {
    isPostDialogVisible.value = true
    currPost.value = post
}

onMounted(() => {
    getPosts()
})
</script>

<template>
    <div>
        <p class="text-2xl font-bold">Your Posts</p>
        <Divider />
        <main>
            <div class="grid gap-2 grid-cols-3">
                <div v-for="post in userPosts">
                    <Image :src="post.image" :id="post?.id" alt="Image" width="250" class="cursor-pointer"
                        @click="viewPost(post)" />
                </div>
            </div>
        </main>
        <PostDialog :visible="isPostDialogVisible" :post="currPost" @close-dialog="isPostDialogVisible = false" />
    </div>
</template>


<style scoped></style>