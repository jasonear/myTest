import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useKnowledgeBaseStore = defineStore('knowledgeBase', () => {
  const searchQuery = ref('')
  
  const libraries = ref([
    {
      title: '政策法规库',
      items: [
        { id: 1, name: '政策文件名称政策文件名称政策文件名称...' },
        { id: 2, name: '政策文件名称政策文件名称政策文件名称...' },
        { id: 3, name: '政策文件名称政策文件名称政策文件名称...' },
        { id: 4, name: '政策文件名称政策文件名称政策文件名称...' },
        { id: 5, name: '政策文件名称政策文件名称政策文件名称...' },
        { id: 6, name: '政策文件名称政策文件名称政策文件名称...' },
      ]
    },
    {
      title: '项目案例库',
      items: [
        { id: 1, name: '项目案例项目案例项目案例文件名称...' },
        { id: 2, name: '项目案例项目案例项目案例文件名称...' },
        { id: 3, name: '项目案例项目案例项目案例文件名称...' },
        { id: 4, name: '项目案例项目案例项目案例文件名称...' },
        { id: 5, name: '项目案例项目案例项目案例文件名称...' },
        { id: 6, name: '项目案例项目案例项目案例项目案例文件名称...' },
      ]
    },
    {
      title: '工程技术库',
      items: [
        { id: 1, name: '工程技术工程技术工程技术文件名称...' },
        { id: 2, name: '工程技术工程技术工程技术文件名称...' },
        { id: 3, name: '工程技术工程技术工程技术文件名称...' },
        { id: 4, name: '工程技术工程技术工程技术文件名称...' },
        { id: 5, name: '工程技术工程技术工程技术文件名称...' },
        { id: 6, name: '工程技术工程技术工程技术工程技术文件名称...' },
      ]
    },
    {
      title: '专家档案库',
      items: [
        { id: 1, name: '专家档案专家档案专家档案文件名称...' },
        { id: 2, name: '专家档案专家档案专家档案文件名称...' },
        { id: 3, name: '专家档案专家档案专家档案文件名称...' },
        { id: 4, name: '专家档案专家档案专家档案文件名称...' },
        { id: 5, name: '专家档案专家档案专家档案文件名称...' },
        { id: 6, name: '专家档案专家档案专家档案文件名称...' },
      ]
    }
  ])

  const setSearchQuery = (query) => {
    searchQuery.value = query
  }

  return {
    searchQuery,
    libraries,
    setSearchQuery
  }
})
