<script setup lang="ts">
import type { Post } from '@/types';

const props = defineProps<{
    post: Post
}>()
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
                    <Button label="Like" severity="secondary" outlined class="w-full" icon="pi pi-heart" />
                    <Button label="Comment" class="w-full" icon="pi pi-comment" />
                </div>
            </template>
        </Card>
        <Divider />

    </div>
</template>

<style lang="scss" scoped></style>