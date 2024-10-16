<script setup lang="ts">
import axiosInstance from "@/axios";
import router from "@/router";
import { useConfirm } from "primevue/useconfirm";
import { useUserStore } from "@/store/useUserStore";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import EditProfileDialog from "./EditProfileDialog.vue";

// Composables and Stores
const confirm = useConfirm();
const userStore = useUserStore()
const { getUserDetails } = userStore
const { thisUser } = storeToRefs(userStore)

// Reactive Data
const isEditProfileDialog = ref(false)
const menu = ref();
const items = ref([
    {
        label: 'Menu',
        items: [
            {
                label: 'Edit Profile',
                icon: 'pi pi-user-edit',
                command: () => isEditProfileDialog.value = true
            },
        ]
    }
]);

// Methods
const toggle = (event: any) => {
    menu.value.toggle(event);
};

const confirmLogout = () => {
    confirm.require({
        group: 'headless',
        header: 'Are you sure?',
        accept: async () => {
            const response = await axiosInstance.post("logout/")
            if (response) {
                router.push({ name: 'Login' })
                localStorage.removeItem("authToken")
            }
        },
        reject: () => { }
    });
};

onMounted(() => {
    getUserDetails()
})
</script>

<template>
    <div>
        <ConfirmDialog group="headless">
            <template #container="{ message, acceptCallback, rejectCallback }">
                <div class="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded"
                    :style="{ width: '510px' }">
                    <div
                        class="rounded-full bg-primary text-primary-contrast inline-flex justify-center items-center h-24 w-24 -mt-20">
                        <i class="pi pi-question text-5xl"></i>
                    </div>
                    <span class="font-bold text-2xl block mb-2 mt-6">{{ message.header }}</span>
                    <p class="mb-0">{{ message.message }}</p>
                    <div class="flex items-center gap-2 mt-6">
                        <Button label="Logout" @click="acceptCallback"></Button>
                        <Button label="Cancel" outlined @click="rejectCallback"></Button>
                    </div>
                </div>
            </template>
        </ConfirmDialog>
        <div class="card">
            <Toolbar>
                <template #start>
                    <div class="flex items-center gap-2">
                        <Avatar
                            :image="thisUser?.profile_pic || 'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0='"
                            shape="circle" size="large" />
                        <span class="text-xl font-bold">{{ thisUser?.username || '' }}</span>
                    </div>
                </template>

                <template #end>
                    <div class="flex items-center gap-2">
                        <Button label="Logout" icon="pi pi-sign-out" text plain @click="confirmLogout()" />
                    </div>
                    <div class="card flex justify-center">
                        <Button type="button" icon="pi pi-ellipsis-v" text plain @click="toggle" aria-haspopup="true"
                            aria-controls="overlay_menu" />
                        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
                    </div>
                </template>
            </Toolbar>
        </div>
        <EditProfileDialog :visible="isEditProfileDialog" :user="thisUser"
            @close-dialog="isEditProfileDialog = false" />
    </div>
</template>