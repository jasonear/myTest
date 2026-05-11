<template>
  <div class="view-container">
    <el-container>
      <el-aside width="288px" class="sidebar">
        <el-button type="primary" class="new-chat-btn">
          <el-icon class="el-icon--left"><Plus /></el-icon>
          开启新会话
        </el-button>
        <div class="session-list">
          <el-card v-for="i in 3" :key="i" class="session-card">
            <p class="session-time">2025-12-31 15:05:06</p>
            <p class="session-title">方案编制会话 {{ i }}</p>
          </el-card>
        </div>
      </el-aside>
      
      <el-main class="main-content">
        <el-card class="welcome-card">
          <div class="welcome-content">
            <el-avatar :size="60" class="welcome-icon">
              <el-icon :size="30"><EditPen /></el-icon>
            </el-avatar>
            <div class="welcome-text">
              <h2>方案编制</h2>
              <p>智能辅助编制全域土地整治实施方案，自动生成项目建议书和可研报告</p>
            </div>
          </div>
        </el-card>
        
        <el-row :gutter="16">
          <el-col :span="12">
            <el-card class="feature-card">
              <template #header>
                <div class="card-header">
                  <el-icon><Document /></el-icon>
                  <span>文档生成</span>
                </div>
              </template>
              <el-form label-position="top">
                <el-form-item label="项目名称">
                  <el-input placeholder="请输入项目名称" />
                </el-form-item>
                <el-form-item label="整治类型">
                  <el-select placeholder="请选择整治类型" style="width: 100%">
                    <el-option label="农用地整治" value="1" />
                    <el-option label="建设用地整治" value="2" />
                    <el-option label="生态修复" value="3" />
                  </el-select>
                </el-form-item>
                <el-form-item label="项目描述">
                  <el-input type="textarea" :rows="4" placeholder="请输入项目描述" />
                </el-form-item>
                <el-button type="primary">生成方案</el-button>
              </el-form>
            </el-card>
          </el-col>
          
          <el-col :span="12">
            <el-card class="feature-card">
              <template #header>
                <div class="card-header">
                  <el-icon><DataAnalysis /></el-icon>
                  <span>数据分析</span>
                </div>
              </template>
              <div class="stats-grid">
                <el-statistic title="整治面积" :value="1234" suffix="亩" />
                <el-statistic title="预计投资" :value="5678" prefix="¥" />
                <el-statistic title="受益人口" :value="9999" />
                <el-statistic title="项目工期" :value="24" suffix="个月" />
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus, EditPen, Document, DataAnalysis } from '@element-plus/icons-vue'
</script>

<style scoped>
.view-container {
  height: 100%;
  background: #1a1d23;
}

.sidebar {
  background: #1a1d23;
  border-right: 1px solid #333842;
  padding: 16px;
}

.main-content {
  background: #1a1d23;
  padding: 24px;
}

.new-chat-btn {
  width: 100%;
  margin-bottom: 16px;
}

.session-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.session-card {
  background: #22262e;
  cursor: pointer;
}

.session-time {
  font-size: 12px;
  color: #666;
  margin: 0 0 8px 0;
}

.session-title {
  font-size: 14px;
  color: #ccc;
  margin: 0;
}

.welcome-card {
  background: #22262e;
  margin-bottom: 24px;
}

.welcome-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.welcome-icon {
  background: rgba(0, 212, 255, 0.2);
}

.welcome-text h2 {
  margin: 0 0 8px 0;
  color: #fff;
}

.welcome-text p {
  margin: 0;
  color: #999;
  font-size: 14px;
}

.feature-card {
  background: #22262e;
  height: 100%;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
</style>
