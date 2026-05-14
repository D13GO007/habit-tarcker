import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import * as habitsApi from '../api/habits'
import { useUserStore } from './user.store'
import { useToastStore } from './toast.store'
import { ACHIEVEMENT_DEFS } from '../data/characterData'

const EMPTY_FORM = () => ({ title: '', type: 'Diaria', difficulty: 'Fácil', target_time: 30, target_days: 3, deadline: '', category: 'General' })

export const useHabitStore = defineStore('habit', () => {
  const habits = ref([])
  const activeTab = ref('Diaria')
  const isEditing = ref(false)
  const editingId = ref(null)
  const oracleResult = ref(false)
  const formData = ref(EMPTY_FORM())

  const showCompleted = ref(false)
  const activeCategory = ref('Todas')
  const history = ref([])

  const displayedHabits = computed(() =>
    habits.value.filter(h =>
      h.type === activeTab.value &&
      (showCompleted.value || !h.completed) &&
      (activeCategory.value === 'Todas' || h.category === activeCategory.value)
    )
  )
  const completedCount = computed(() =>
    habits.value.filter(h => h.type === activeTab.value && h.completed).length
  )

  async function fetchHabits(userId) {
    try {
      const res = await habitsApi.getHabits(userId)
      habits.value = res.data
    } catch { /* servidor no disponible */ }
  }

  async function submitForm(userId) {
    const toast = useToastStore()
    try {
      if (isEditing.value) {
        await habitsApi.updateHabit(editingId.value, formData.value)
        toast.show('Gesta actualizada correctamente.', 'success')
      } else {
        await habitsApi.createHabit({ ...formData.value, user_id: userId })
      }
      cancelEdit()
      await fetchHabits(userId)
    } catch { toast.show('Error en la forja de la misión.', 'error') }
  }

  async function fetchHistory(userId) {
    try {
      const res = await habitsApi.getHistory(userId)
      if (res.data.success) history.value = res.data.data
    } catch { /* no disponible */ }
  }

  async function completeHabit(habitId) {
    const userStore = useUserStore()
    const toast = useToastStore()
    try {
      const res = await habitsApi.completeHabit(habitId, userStore.user.id)
      userStore.applyStats(res.data.stats)
      await fetchHabits(userStore.user.id)
      const type = res.data.message?.includes('Nivel') ? 'levelup' : 'success'
      toast.show(res.data.message, type)
      for (const key of (res.data.newAchievements || [])) {
        userStore.addAchievement(key)
        toast.show(`Logro desbloqueado: ${ACHIEVEMENT_DEFS[key]?.name || key}`, 'levelup')
      }
    } catch { toast.show('Error al completar', 'error') }
  }

  async function failHabit(habitId) {
    const userStore = useUserStore()
    const toast = useToastStore()
    try {
      const res = await habitsApi.failHabit(habitId, userStore.user.id)
      userStore.applyStats(res.data.stats)
      await fetchHabits(userStore.user.id)
      toast.show(res.data.message, res.data.died ? 'error' : 'damage')
    } catch { toast.show('Error al procesar el daño', 'error') }
  }

  async function deleteHabit(habitId) {
    const userStore = useUserStore()
    const toast = useToastStore()
    if (!confirm('¿Abandonar misión?')) return
    try {
      await habitsApi.deleteHabit(habitId)
      await fetchHabits(userStore.user.id)
      toast.show('Misión abandonada', 'damage')
    } catch { toast.show('Error al abandonar', 'error') }
  }

  function openEdit(habit) {
    isEditing.value = true
    editingId.value = habit.id
    formData.value = {
      title: habit.title,
      type: habit.type,
      difficulty: habit.difficulty,
      target_time: habit.target_time,
      target_days: habit.target_days,
      deadline: habit.deadline ? habit.deadline.split('T')[0] : '',
      category: habit.category || 'General'
    }
    activeTab.value = habit.type
    oracleResult.value = true
  }

  function cancelEdit() {
    isEditing.value = false
    editingId.value = null
    formData.value = EMPTY_FORM()
    oracleResult.value = false
  }

  return {
    habits, activeTab, isEditing, editingId, oracleResult, formData,
    showCompleted, activeCategory, displayedHabits, completedCount, history,
    fetchHabits, fetchHistory, submitForm, completeHabit, failHabit, deleteHabit, openEdit, cancelEdit
  }
})
