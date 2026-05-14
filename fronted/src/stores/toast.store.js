import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', () => {
  const toast = ref({ visible: false, message: '', type: 'success' })
  let timer = null

  function show(message, type = 'success') {
    clearTimeout(timer)
    toast.value = { visible: true, message, type }
    const duration = (type === 'levelup' || type === 'damage' || type === 'error') ? 5500 : 3200
    timer = setTimeout(() => { toast.value.visible = false }, duration)
  }

  return { toast, show }
})
