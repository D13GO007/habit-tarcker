<template>
  <div class="quest-board">
    <div class="section-title">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="2" y="2" width="10" height="10" rx="1.5" fill="none" stroke="#f1c40f" stroke-width="1"/>
        <path d="M4 5h6M4 7.5h4M4 10h5" stroke="#f1c40f" stroke-width="1" stroke-linecap="round"/>
      </svg>
      TABLÓN DE MISIONES
      <span class="quest-count">{{ habitStore.displayedHabits.length }}</span>
    </div>

    <div class="board-tabs">
      <button :class="{ active: habitStore.activeTab === 'Diaria' }" @click="habitStore.activeTab = 'Diaria'; habitStore.fetchHistory(userStore.user.id)">DIARIAS</button>
      <button :class="{ active: habitStore.activeTab === 'Semanal' }" @click="habitStore.activeTab = 'Semanal'">SEMANALES</button>
      <button :class="{ active: habitStore.activeTab === 'Unica' }" @click="habitStore.activeTab = 'Unica'">ÚNICAS</button>
      <button :class="{ active: habitStore.activeTab === 'Historia' }" @click="habitStore.activeTab = 'Historia'; habitStore.fetchHistory(userStore.user.id)">GESTA</button>
      <button
        v-if="habitStore.completedCount > 0"
        class="btn-toggle-done"
        :class="{ active: habitStore.showCompleted }"
        @click="habitStore.showCompleted = !habitStore.showCompleted"
        :title="habitStore.showCompleted ? 'Ocultar cumplidas' : 'Mostrar cumplidas'"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        {{ habitStore.completedCount }}
      </button>
    </div>

    <div v-if="habitStore.activeTab !== 'Historia'" class="category-filter">
      <button
        v-for="cat in categories" :key="cat"
        class="cat-pill" :class="{ active: habitStore.activeCategory === cat }"
        @click="habitStore.activeCategory = cat"
      >{{ cat }}</button>
    </div>

    <div v-if="habitStore.activeTab === 'Historia'" class="quest-scroll">
      <div v-if="habitStore.history.length === 0" class="no-quests">
        <p>Aún no hay misiones completadas.</p>
      </div>
      <div v-for="(h, i) in formattedHistory" :key="i" class="history-row">
        <span class="history-diff" :class="'hd-' + h.difficulty?.toLowerCase()">{{ h.difficulty }}</span>
        <span class="history-title">{{ h.title }}</span>
        <span class="history-cat">{{ h.category }}</span>
        <span class="history-date">{{ h.date }}</span>
      </div>
    </div>

    <div v-else-if="habitStore.displayedHabits.length === 0" class="no-quests">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" opacity="0.3">
        <rect x="8" y="6" width="24" height="28" rx="3" fill="none" stroke="#888" stroke-width="1.5"/>
        <path d="M13 14h14M13 19h10M13 24h12" stroke="#888" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      <p>El tablón está vacío.<br><small>Forja tu primera misión.</small></p>
    </div>

    <div v-else class="quest-scroll">
      <QuestCard
        v-for="habit in habitStore.displayedHabits"
        :key="habit.id"
        :habit="habit"
        @complete="habitStore.completeHabit($event)"
        @fail="habitStore.failHabit($event)"
        @edit="habitStore.openEdit($event)"
        @delete="habitStore.deleteHabit($event)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useHabitStore } from '../stores/habit.store'
import { useUserStore } from '../stores/user.store'
import QuestCard from './QuestCard.vue'
import { CATEGORIES } from '../data/characterData'

const habitStore = useHabitStore()
const userStore = useUserStore()
const categories = computed(() => ['Todas', ...CATEGORIES])
const formattedHistory = computed(() =>
  habitStore.history.map(h => ({ ...h, date: new Date(h.completed_at).toLocaleDateString() }))
)
</script>

<style scoped>
.quest-board {
  flex: 1; display: flex; flex-direction: column;
  overflow: hidden;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 10px; padding: 16px;
  position: relative;
}
.quest-board::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(241,196,15,0.15), transparent);
}
.quest-count {
  margin-left: auto;
  background: rgba(241,196,15,0.1); border: 1px solid rgba(241,196,15,0.2);
  color: #f1c40f; font-size: 13px; font-weight: 700;
  padding: 4px 12px; border-radius: 14px;
}
.board-tabs {
  display: flex; gap: 5px; margin-bottom: 15px;
  border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 5px;
}
.board-tabs button {
  flex: 1; background: transparent; border: none; color: #666;
  font-weight: bold; padding: 8px 0; cursor: pointer; transition: 0.3s;
}
.board-tabs button.active { color: #f1c40f; border-bottom: 2px solid #f1c40f; }

.category-filter { display: flex; gap: 5px; flex-wrap: wrap; margin-bottom: 10px; }
.cat-pill {
  padding: 4px 10px; border-radius: 12px; font-size: 10px; font-weight: 700;
  background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.06);
  color: #555; cursor: pointer; transition: all 0.15s; font-family: inherit;
  letter-spacing: 0.5px;
}
.cat-pill:hover { border-color: rgba(155,89,182,0.3); color: #888; }
.cat-pill.active { background: rgba(155,89,182,0.12); border-color: rgba(155,89,182,0.4); color: #9b59b6; }

.history-row {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 10px; border-radius: 8px;
  background: rgba(0,0,0,0.15); border: 1px solid rgba(255,255,255,0.04);
  font-size: 12px;
}
.history-diff { font-weight: 700; font-size: 10px; letter-spacing: 0.5px; flex-shrink: 0; }
.hd-fácil   { color: #27ae60; }
.hd-medio   { color: #f39c12; }
.hd-difícil { color: #e74c3c; }
.history-title { flex: 1; color: #bbb; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.history-cat  { font-size: 10px; color: #555; flex-shrink: 0; }
.history-date { font-size: 10px; color: #444; flex-shrink: 0; }

.btn-toggle-done {
  flex: 0 0 auto !important;
  display: inline-flex; align-items: center; gap: 4px;
  padding: 4px 8px !important;
  background: rgba(39,174,96,0.06); border: 1px solid rgba(39,174,96,0.15) !important;
  border-bottom: 1px solid rgba(39,174,96,0.15) !important;
  border-radius: 6px; color: #3d6b50 !important; font-size: 11px;
  margin-bottom: 2px; align-self: center;
}
.btn-toggle-done.active { background: rgba(39,174,96,0.15); color: #27ae60 !important; border-color: rgba(39,174,96,0.4) !important; }

.no-quests {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 10px; color: #444; text-align: center;
}
.no-quests p { font-size: 17px; line-height: 1.6; }
.no-quests small { font-size: 14px; color: #555; }

.quest-scroll {
  flex: 1; overflow-y: auto;
  display: flex; flex-direction: column; gap: 6px;
  padding-right: 4px;
}
.quest-scroll::-webkit-scrollbar { width: 3px; }
.quest-scroll::-webkit-scrollbar-track { background: transparent; }
.quest-scroll::-webkit-scrollbar-thumb { background: rgba(241,196,15,0.3); border-radius: 2px; }
</style>
