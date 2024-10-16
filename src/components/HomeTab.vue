<script setup lang="ts">
import { usePostStore } from '@/store/usePostStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import PostCard from './post/PostCard.vue';

// Stores
const postStore = usePostStore()
const { getTimeLinePosts } = postStore
const { timeLinePosts } = storeToRefs(postStore)

onMounted(() => {
    getTimeLinePosts()
})
</script>

<template>
    <div>
        <ul v-for="post in timeLinePosts">
            <PostCard :post="post" />
        </ul>
    </div>
</template>


<style scoped></style>