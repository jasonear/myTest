<template>
  <div class="h-screen flex flex-col bg-dark-900 overflow-hidden">
    <Header />
    <div class="flex-1 flex overflow-hidden">
      <Sidebar />
      <ChatArea />
      <RightPanel />
    </div>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import ChatArea from './components/ChatArea.vue'
import RightPanel from './components/RightPanel.vue'
</script>
