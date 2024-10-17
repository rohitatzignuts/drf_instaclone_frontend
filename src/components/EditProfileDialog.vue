<script setup lang="ts">
import axiosInstance from "@/axios";
import { useUserStore } from "@/store/useUserStore";
import type { User } from "@/types";
import axios from "axios";
import { useToast } from "primevue/usetoast";
import { ref, watch } from "vue";

const props = defineProps<{
    visible: boolean
    user: User | undefined
}>()

const emit = defineEmits<{
    (e: 'closeDialog', value: boolean): void
}>()

// Stores 
const userStore = useUserStore()
const { getUserDetails } = userStore

// Constants
const toast = useToast()

// Reactive Data
const imgUpload = ref<any>(null);
const user = ref<User>({
    username: '',
    first_name: '',
    email: '',
    last_name: '',
})

// Methods
const setUserData = () => {
    if (props.user) {
        user.value.username = props.user.username
        user.value.first_name = props.user.first_name
        user.value.email = props.user.email
        user.value.last_name = props.user.last_name
        user.value.profile_pic = props.user.profile_pic
    }
}

const editUserProfile = async () => {
    try {
        const formData = new FormData();
        formData.append("profile_pic", imgUpload.value.files[0]);
        formData.append("username", user.value.username);
        formData.append("first_name", user.value.first_name);
        formData.append("last_name", user.value.last_name);

        const response = await updateProfile(formData)
        if (response) {
            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: 'profile updated successfully!',
                life: 3000,
            });
            emit('closeDialog', props.visible)
            getUserDetails()
        }

        if (response) {
            console.log("Profile updated successfully:", response.data);
        }
    } catch (error: any) {
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
    }
};

const updateProfile = async (formData: FormData) => {
    return await axiosInstance.put("user/edit/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

watch(() => props.visible, (newVal) => {
    if (newVal) {
        setUserData()
    }
})
</script>

<template>
    <div>
        <div class="card flex justify-center">
            <Dialog v-model:visible="props.visible" :draggable="false" :closable="false" modal header="Edit Profile"
                :style="{ width: '510px' }">
                <template #header>
                    <div class="flex items-center justify-between w-full">
                        <div class="flex items-center gap-4">
                            <div class="h-12 w-12">
                                <Avatar
                                    :image="user.profile_pic || 'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0='"
                                    shape="circle" size="large" preview />
                            </div>

                            <div class="flex flex-col">
                                <span class="text-lg font-semibold text-white">{{ user?.username || 'Username' }}</span>
                                <span class="text-sm text-gray-400">{{ user?.email || '' }}</span>
                            </div>
                        </div>
                        <Button type="button" severity="secondary" icon="pi pi-times"
                            @click="emit('closeDialog', props.visible)" />
                    </div>
                </template>


                <form v-focustrap class="w-full  flex flex-col gap-4">
                    <IconField variant="on">
                        <InputIcon>
                            <i class="pi pi-user" />
                        </InputIcon>
                        <InputText id="username" v-model="user.username" type="text" placeholder="Username" autofocus
                            fluid required />
                    </IconField>
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-user" />
                        </InputIcon>
                        <InputText id="firstname" v-model="user.first_name" type="text" placeholder="First Name"
                            autofocus fluid required />
                    </IconField>
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-user" />
                        </InputIcon>
                        <InputText id="lastname" v-model="user.last_name" type="text" placeholder="Last Name" autofocus
                            fluid required />
                    </IconField>
                    <FileUpload ref="imgUpload" mode="basic" chooseLabel="profile picture" accept="image/*"
                        :maxFileSize="1000000" />

                </form>
                <template #footer>
                    <Button label="Save" class="w-full" @click="editUserProfile" />
                    <Button label="Cancel" severity="secondary" outlined class="w-full"
                        @click="emit('closeDialog', props.visible)" />
                </template>
            </Dialog>
        </div>
    </div>
</template>

<style scoped></style>