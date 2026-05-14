<template>
  <div class="glass-card hud">
    <div class="hud-header">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <polygon points="7,1 9,5 13,5.5 10,8.5 10.5,13 7,11 3.5,13 4,8.5 1,5.5 5,5" fill="#f1c40f" stroke="#b7950b" stroke-width="0.5"/>
      </svg>
      <span>ESTADO DE {{ userStore.user.name?.toUpperCase() || 'JUGADOR' }}</span>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <polygon points="7,1 9,5 13,5.5 10,8.5 10.5,13 7,11 3.5,13 4,8.5 1,5.5 5,5" fill="#f1c40f" stroke="#b7950b" stroke-width="0.5"/>
      </svg>
    </div>

    <div class="bar-group">
      <div class="bar-info">
        <div class="bar-label">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 10.5 C6 10.5 1 7 1 4a2.5 2.5 0 0 1 5-0 2.5 2.5 0 0 1 5 0C11 7 6 10.5 6 10.5Z" fill="#e74c3c" stroke="#c0392b" stroke-width="0.5"/>
          </svg>
          <span>Vitalidad</span>
        </div>
        <span class="bar-val hp-val">{{ userStore.user.hp }}<small>/100</small></span>
      </div>
      <div class="bar-outer" :class="{ 'hp-danger': userStore.user.hp < 20 }">
        <div class="bar-inner hp" :style="{ width: userStore.user.hp + '%' }">
          <div class="bar-shine"></div>
        </div>
      </div>
    </div>

    <div class="bar-group">
      <div class="bar-info">
        <div class="bar-label">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="4.5" fill="none" stroke="#f1c40f" stroke-width="1"/>
            <path d="M6 3v3l2 1.5" stroke="#f1c40f" stroke-width="1" stroke-linecap="round"/>
          </svg>
          <span>Experiencia</span>
        </div>
        <span class="bar-val xp-val">{{ userStore.user.xp }}<small>/{{ userStore.xpNeeded }}</small></span>
      </div>
      <div class="bar-outer">
        <div class="bar-inner xp" :style="{ width: userStore.xpPercentage + '%' }">
          <div class="bar-shine"></div>
        </div>
      </div>
    </div>

    <div class="stats-row">
      <div class="stat-chip">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2 L10 6 L14 6.5 L11 9.5 L11.5 14 L8 12 L4.5 14 L5 9.5 L2 6.5 L6 6Z" fill="#f1c40f" stroke="#b7950b" stroke-width="0.5"/>
        </svg>
        <div class="stat-data">
          <span class="stat-num">{{ userStore.user.level }}</span>
          <span class="stat-lbl">NIVEL</span>
        </div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-chip">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="5" fill="none" stroke="#f1c40f" stroke-width="1"/>
          <path d="M5 8.5 C5 8.5 6.5 6 8 8.5 C9.5 11 11 8.5 11 8.5" fill="none" stroke="#f1c40f" stroke-width="1" stroke-linecap="round"/>
          <circle cx="8" cy="5.5" r="1" fill="#f1c40f"/>
        </svg>
        <div class="stat-data">
          <span class="stat-num">{{ userStore.user.coins || 0 }}</span>
          <span class="stat-lbl">ORO</span>
        </div>
      </div>
    </div>

    <div class="progression-hint">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <polygon points="5,1 6.2,3.8 9,4.1 7,6.1 7.5,9 5,7.6 2.5,9 3,6.1 1,4.1 3.8,3.8" fill="none" stroke="#9b59b6" stroke-width="0.8"/>
      </svg>
      <span>{{ progressionHint }}</span>
    </div>

    <div v-if="userStore.user.achievements?.length" class="achievement-row">
      <div
        v-for="key in userStore.user.achievements" :key="key"
        class="ach-badge"
        :class="'ach-' + key"
        :title="ACHIEVEMENT_DEFS[key]?.name || key"
      >{{ ACHIEVEMENT_DEFS[key]?.abbr || '?' }}</div>
    </div>

    <button @click="logout" class="btn-exit">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M5 2H2v8h3M8 4l3 2-3 2M5 6h6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Abandonar sesión
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.store'
import { ACHIEVEMENT_DEFS } from '../data/characterData'

const router = useRouter()
const userStore = useUserStore()

const progressionHint = computed(() => {
  const lvl = userStore.user.level || 1
  if (lvl < 5)  return `Próxima forma: Cazador en nivel 5`
  if (lvl < 10) return `Próxima forma: Superviviente en nivel 10`
  if (lvl < 20) return `Próxima forma: Señor de la Ceniza en nivel 20`
  return 'Forma máxima alcanzada'
})

function logout() {
  userStore.clearSession()
  router.push('/login')
}
</script>

<style scoped>
.hud-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: clamp(11px, 0.85vw, 13px);
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #aaa;
  margin-bottom: clamp(8px, 1vw, 16px);
  padding-bottom: clamp(6px, 0.8vw, 12px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.bar-group { margin-bottom: clamp(6px, 0.8vw, 12px); }
.bar-info { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
.bar-label { display: flex; align-items: center; gap: 6px; font-size: clamp(11px, 0.85vw, 13px); font-weight: 600; color: #888; letter-spacing: 0.5px; }
.bar-val { font-size: clamp(12px, 0.9vw, 14px); font-weight: 700; }
.bar-val small { font-size: 10px; font-weight: 400; color: #555; margin-left: 1px; }
.hp-val { color: #e74c3c; }
.xp-val { color: #f1c40f; }

.bar-outer { height: 10px; background: rgba(0,0,0,0.5); border-radius: 6px; border: 1px solid rgba(255,255,255,0.04); overflow: hidden; }
.bar-outer.hp-danger { border-color: rgba(231,76,60,0.5); animation: hp-pulse 1.2s ease-in-out infinite; }
@keyframes hp-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(231,76,60,0); }
  50%       { box-shadow: 0 0 6px 2px rgba(231,76,60,0.45); }
}
.bar-inner { height: 100%; border-radius: 4px; transition: width 0.6s cubic-bezier(0.4,0,0.2,1); position: relative; overflow: hidden; }
.bar-inner.hp { background: linear-gradient(90deg, #922b21, #e74c3c); }
.bar-inner.xp { background: linear-gradient(90deg, #b7950b, #f1c40f); }
.bar-shine {
  position: absolute;
  top: 0; left: -100%; width: 60%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  animation: shine 3s ease-in-out infinite;
}
@keyframes shine { 0%,80%,100% { left: -100%; } 40% { left: 120%; } }

.stats-row {
  display: flex;
  align-items: center;
  background: rgba(0,0,0,0.3);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 8px;
  overflow: hidden;
  margin: 4px 0 clamp(6px, 0.8vw, 12px);
}
.stat-chip { flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; padding: clamp(7px, 0.7vw, 10px) 8px; }
.stat-divider { width: 1px; height: 28px; background: rgba(255,255,255,0.06); }
.stat-data { display: flex; flex-direction: column; align-items: flex-start; }
.stat-num { font-size: clamp(18px, 1.5vw, 24px); font-weight: 700; color: #f1c40f; line-height: 1; }
.stat-lbl { font-size: clamp(9px, 0.7vw, 10px); font-weight: 700; letter-spacing: 1px; color: #777; margin-top: 2px; }

.progression-hint {
  display: flex; align-items: center; gap: 6px;
  font-size: 10px; color: #9b59b6; letter-spacing: 0.5px;
  margin: 4px 0 8px; padding: 6px 10px;
  background: rgba(155,89,182,0.06); border: 1px solid rgba(155,89,182,0.15);
  border-radius: 6px;
}

.achievement-row {
  display: flex; flex-wrap: wrap; gap: 5px;
  margin-bottom: 8px;
}
.ach-badge {
  width: 28px; height: 28px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%; font-size: 9px; font-weight: 800; letter-spacing: 0.3px;
  background: rgba(241,196,15,0.12); border: 1px solid rgba(241,196,15,0.3);
  color: #f1c40f; cursor: default;
}
.ach-badge.ach-level_5, .ach-badge.ach-level_10 { background: rgba(39,174,96,0.12); border-color: rgba(39,174,96,0.3); color: #27ae60; }
.ach-badge.ach-streak_3, .ach-badge.ach-streak_7 { background: rgba(231,76,60,0.12); border-color: rgba(231,76,60,0.3); color: #e74c3c; }

.btn-exit {
  width: 100%;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.06);
  color: #666;
  padding: clamp(8px, 0.8vw, 12px);
  border-radius: 10px;
  cursor: pointer;
  font-size: clamp(11px, 0.85vw, 13px);
  font-weight: 600;
  letter-spacing: 1.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
  margin-top: 6px;
}
.btn-exit:hover { border-color: rgba(231,76,60,0.3); color: #e74c3c; }
</style>
