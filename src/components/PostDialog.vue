<script setup lang="ts">
import type { Post } from "@/types";

const props = defineProps<{
    visible: boolean
    post: Post | undefined
}>()

const emit = defineEmits<{
    (e: 'closeDialog', value: boolean): void
}>()
</script>

<template>
    <div>
        <div class="card flex justify-center">
            <!-- <Button label="Show" @click="props.visible = true" /> -->
            <Dialog v-model:visible="props.visible" :draggable="false" :closable="false" modal header="Edit Profile"
                :style="{ width: '510px' }">
                <template #header>
                    <div class="flex items-center justify-between w-full">
                        <div class="inline-flex items-center gap-2">
                            <Avatar
                                :image="props.post?.user?.profile_pic || 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png'"
                                shape="circle" />
                            <span class="font-bold whitespace-nowrap">{{ props.post?.user?.username }}</span>
                        </div>
                        <Button type="button" severity="secondary" icon="pi pi-times"
                            @click="emit('closeDialog', props.visible)" />
                    </div>
                </template>

                <Image :src="props.post?.image" alt="Image"
                    class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-auto object-cover" />
                <p class="font-medium py-2">{{ props.post?.caption }}</p>
                <p><span class="font-medium">{{ props.post?.likes }}</span> {{ props.post?.likes > 1 ? 'Likes' :
                    'Like' }}</p>
            </Dialog>
        </div>
    </div>
</template>

<style scoped></style>