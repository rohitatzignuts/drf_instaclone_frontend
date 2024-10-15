<script setup lang="ts">
import type { Post } from '@/types';

const props = defineProps<{
    post: Post
}>()
</script>

<template>
    <div>
        <Card style="overflow: hidden">
            <template #header>
                <img alt="user header"
                    src="https://d3cm515ijfiu6w.cloudfront.net/wp-content/uploads/2024/02/27105809/fernando-alonso.jpg"
                    width="100%" height="550px" class="object-contain" />
            </template>
            <template #title>Advanced Card</template>
            <template #subtitle>Card subtitle</template>
            <template #content>
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error
                    repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam
                    perferendis esse, cupiditate neque
                    quas!
                </p>
            </template>
            <template #footer>
                <div class="flex gap-4 mt-1">
                    <Button label="Cancel" severity="secondary" outlined class="w-full" />
                    <Button label="Save" class="w-full" />
                </div>
            </template>
        </Card>
    </div>
</template>

<style lang="scss" scoped></style>