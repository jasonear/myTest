<template>
  <el-config-provider :locale="zhCn">
    <div class="app-container">
      <el-container>
        <el-header height="64px" class="app-header">
          <div class="header-left">
            <div class="logo">
              <el-avatar :size="40" class="logo-icon">
                <el-icon :size="24"><MapLocation /></el-icon>
              </el-avatar>
              <span class="logo-text">全域土地整治</span>
            </div>
            
            <el-menu 
              mode="horizontal" 
              :default-active="currentRoute"
              class="header-menu"
              @select="handleMenuSelect"
            >
              <el-menu-item index="/">智能问答</el-menu-item>
              <el-menu-item index="/research">调研沙盘</el-menu-item>
              <el-menu-item index="/planning">方案编制</el-menu-item>
              <el-menu-item index="/review">审查报备</el-menu-item>
              <el-menu-item index="/evaluation">实施评估</el-menu-item>
            </el-menu>
          </div>
          
          <div class="header-right">
            <el-dropdown>
              <span class="user-info">
                <el-icon><User /></el-icon>
                <span>用户名</span>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>个人设置</el-dropdown-item>
                  <el-dropdown-item divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        
        <el-main class="app-main">
          <router-view />
        </el-main>
      </el-container>
    </div>
  </el-config-provider>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { MapLocation, User } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

const currentRoute = computed(() => route.path)

const handleMenuSelect = (index) => {
  router.push(index)
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
}

.app-container {
  height: 100vh;
  background: #1a1d23;
}

.app-header {
  background: #22262e;
  border-bottom: 1px solid #333842;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 32px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  background: #00d4ff;
}

.logo-text {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}

.header-menu {
  background: transparent;
  border: none;
}

.header-menu .el-menu-item {
  color: #999;
  font-size: 14px;
}

.header-menu .el-menu-item:hover,
.header-menu .el-menu-item.is-active {
  background: transparent;
  color: #00d4ff;
  border-bottom-color: #00d4ff;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #999;
  cursor: pointer;
  font-size: 14px;
}

.user-info:hover {
  color: #fff;
}

.app-main {
  padding: 0;
  background: #1a1d23;
}

/* Element Plus 深色主题覆盖 */
.el-card {
  --el-card-bg-color: #22262e;
  --el-card-border-color: #333842;
}

.el-input__wrapper {
  background: #2a2f38;
}

.el-textarea__inner {
  background: #2a2f38;
}

.el-select__wrapper {
  background: #2a2f38;
}

.el-dropdown-menu {
  background: #22262e;
}

.el-dropdown-menu__item {
  color: #ccc;
}

.el-dropdown-menu__item:hover {
  background: #2a2f38;
  color: #fff;
}

.el-steps {
  --el-step-border-color: #333842;
  --el-step-bg-color: #22262e;
}

.el-table {
  --el-table-bg-color: #22262e;
  --el-table-tr-bg-color: #22262e;
  --el-table-header-bg-color: #2a2f38;
  --el-table-row-hover-bg-color: #2a2f38;
  --el-table-border-color: #333842;
}

.el-form-item__label {
  color: #ccc;
}
</style>
