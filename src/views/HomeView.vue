<script setup lang="ts">
import HomeTab from '@/components/HomeTab.vue';
import AddTab from '@/components/AddTab.vue';
import AccountTab from '@/components/AccountTab.vue';
import Navbar from '@/components/Navbar.vue';

</script>

<template>
  <div>
    <div class="
  h-screen 
  flex flex-col sm:grid sm:grid-cols-6
">
      <!-- Left Sidebar -->
      <aside class="hidden sm:block">
        <!-- Sidebar content -->
      </aside>

      <!-- Main Content -->
      <main class="
      flex-1 
      sm:col-start-1 sm:col-span-6 
      md:col-start-2 md:col-span-4 
      lg:col-start-3 lg:col-span-2
    ">
        <div class="flex flex-col bg-gray-950 p-4 min-h-screen">
          <Navbar />

          <Tabs value="0" class="bg-red mt-4">
            <TabList>
              <Tab value="0">
                <i class="pi pi-home" style="font-size: 1.5rem"></i>
              </Tab>
              <Tab value="1">
                <i class="pi pi-plus" style="font-size: 1.5rem"></i>
              </Tab>
              <Tab value="2">
                <i class="pi pi-user" style="font-size: 1.5rem"></i>
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel value="0">
                <HomeTab />
              </TabPanel>
              <TabPanel value="1">
                <AddTab />
              </TabPanel>
              <TabPanel value="2">
                <AccountTab />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </main>

      <!-- Right Sidebar -->
      <aside class="hidden sm:block">
        <!-- Sidebar content -->
      </aside>
    </div>

  </div>
</template>
