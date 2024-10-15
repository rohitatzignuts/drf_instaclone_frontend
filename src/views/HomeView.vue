<script setup lang="ts">
import HomeTab from '@/components/HomeTab.vue';
import AddTab from '@/components/AddTab.vue';
import AccountTab from '@/components/AccountTab.vue';
import Navbar from '@/components/Navbar.vue';

</script>

<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-0 lg:grid-cols-3 h-screen">
      <aside>
      </aside>
      <main class="flex flex-col bg-gray-950 p-4">
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
      </main>
      <aside>
      </aside>
    </div>
  </div>
</template>
