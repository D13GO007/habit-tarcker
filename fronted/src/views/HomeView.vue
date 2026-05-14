<template>
  <div class="rpg-viewport">
    <div class="scanlines"></div>

    <div class="rpg-grid">
      <aside class="panel left-panel">
        <div class="left-scroll">
          <PlayerHUD />
          <ShopPanel />
        </div>
      </aside>

      <main class="panel center-panel">
        <CharacterDisplay />
      </main>

      <aside class="panel right-panel">
        <QuestForge />
        <QuestBoard />
      </aside>
    </div>

    <AppToast />
    <DevConsole v-if="isDev" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.store'
import { useHabitStore } from '../stores/habit.store'
import PlayerHUD from '../components/PlayerHUD.vue'
import ShopPanel from '../components/ShopPanel.vue'
import CharacterDisplay from '../components/CharacterDisplay.vue'
import QuestForge from '../components/QuestForge.vue'
import QuestBoard from '../components/QuestBoard.vue'
import AppToast from '../components/AppToast.vue'
import DevConsole from '../components/DevConsole.vue'

const router = useRouter()
const userStore = useUserStore()
const habitStore = useHabitStore()
const isDev = import.meta.env.DEV

onMounted(async () => {
  const ok = userStore.loadFromStorage()
  if (!ok) { router.push('/login'); return }
  // Sincronizar desde la BD: los stats y cosmética se actualizan desde el servidor
  await userStore.syncFromServer()
  await habitStore.fetchHabits(userStore.user.id)
})
</script>

<style scoped>
.rpg-viewport {
  width: 100vw;
  height: 100vh;
  display: flex;
  background: radial-gradient(ellipse at 50% 30%, #0e0e1a 0%, #08080a 70%);
  position: relative;
  overflow: hidden;
  font-family: 'Segoe UI', 'Helvetica Neue', sans-serif;
}

.scanlines {
  position: absolute; inset: 0;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px);
  pointer-events: none; z-index: 1;
}

/* ── Grid principal — 3 columnas fluidas con clamp ───────────────────────── */
.rpg-grid {
  display: grid;
  grid-template-columns:
    clamp(220px, 21vw, 380px)   /* izquierda */
    1fr                          /* personaje */
    clamp(260px, 25vw, 480px);  /* derecha   */
  gap: clamp(8px, 1vw, 20px);
  width: 100%;
  height: 100%;
  padding: clamp(8px, 1vw, 20px);
  box-sizing: border-box;
  z-index: 10;
  overflow: hidden;
}

/* ── Paneles base ────────────────────────────────────────────────────────── */
.panel {
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 0.7vw, 14px);
  height: 100%;
  overflow: hidden;
  min-width: 0;
}

.left-scroll {
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 0.9vw, 18px);
  overflow-y: auto;
  padding-right: 6px;
}
.left-scroll > * { flex-shrink: 0; }
.left-scroll::-webkit-scrollbar { width: 4px; }
.left-scroll::-webkit-scrollbar-thumb { background: rgba(241,196,15,0.25); border-radius: 999px; }
.left-scroll::-webkit-scrollbar-track { background: transparent; }

.center-panel { justify-content: center; align-items: center; overflow: hidden; }
.right-panel  { overflow: hidden; }

/* ── Tablet landscape / portátil pequeño (< 900px) ──────────────────────── */
@media (max-width: 900px) {
  .rpg-grid {
    grid-template-columns: clamp(180px, 28vw, 260px) 1fr;
    grid-template-rows: 1fr clamp(160px, 28vh, 240px);
    padding: 8px;
    gap: 8px;
  }
  .left-panel  { grid-column: 1; grid-row: 1 / 3; }
  .center-panel { grid-column: 2; grid-row: 1; }
  .right-panel {
    grid-column: 2;
    grid-row: 2;
    flex-direction: row;
    gap: 8px;
    overflow: hidden;
  }
}

/* ── Móvil (< 600px) ─────────────────────────────────────────────────────── */
@media (max-width: 600px) {
  .rpg-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    padding: 6px;
    gap: 6px;
  }
  .left-panel   { grid-row: 1; max-height: 35vh; }
  .center-panel { grid-row: 2; min-height: 0; }
  .right-panel  { grid-row: 3; max-height: 35vh; }
}
</style>
