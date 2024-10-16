<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue';
import axiosInstance from '@/axios';
import axios from 'axios';
import { useToast } from "primevue/usetoast";
import router from '@/router';
import type { User } from '@/types';

// Constants
const toast = useToast()

// Reactive Data
const user = ref<User>({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
})

// Methods
// handle user creation with error handeling
const handleUserRegistration = async () => {
    try {
        const response = await axiosInstance.post('register/', user.value);
        if (response) {
            localStorage.setItem('authToken', response.data.token);
            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: 'User registered successfully!',
                life: 3000,
            });
            setTimeout(() => {
                router.push("/")
            }, 3000);
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
        clearValues()
    }
};

const clearValues = () => {
    user.value.username = ""
    user.value.email = ""
    user.value.first_name = ""
    user.value.last_name = ""
    user.value.password = ""
}
</script>


<template>
    <div>
        <Toast />
        <main class="flex flex-col items-center justify-center min-h-screen">
            <div class="card flex justify-center">
                <form v-focustrap class="w-full sm:w-80 flex flex-col gap-4" @submit.prevent="handleUserRegistration">
                    <div class="text-center">
                        <h1 class="text-3xl">Register</h1>
                    </div>
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-user" />
                        </InputIcon>
                        <InputText id="username" v-model="user.username" type="text" placeholder="Username" autofocus
                            fluid required />
                    </IconField>
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-envelope" />
                        </InputIcon>
                        <InputText id="email" v-model="user.email" type="email" placeholder="Email" autofocus fluid
                            required />
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
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-key" />
                        </InputIcon>
                        <InputText id="password" v-model="user.password" type="password" placeholder="Password"
                            autofocus fluid required />
                    </IconField>

                    <Button type="submit" label="Register" severity="Primary" />
                </form>
            </div>
            <p class="mt-4">Already Have an account ? <router-link to="/login"><span class="underline font-medium">Try
                        Logging In</span></router-link></p>
        </main>
    </div>
</template>
