<template>
  <div class="character-display">
    <div class="class-banner">
      <div class="lvl-pill">NV. {{ userStore.user.level }}</div>
      <h1 class="class-name">{{ tier.name }}</h1>
    </div>

    <div class="character-stage">
      <svg class="background-svg" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" v-if="selectedBackground">
        <g v-html="selectedBackground.svg"></g>
      </svg>
      <svg class="hero-svg" viewBox="0 0 300 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient :id="'aura-' + userStore.user.level" cx="50%" cy="80%" r="50%">
            <stop offset="0%" :stop-color="tier.aura" stop-opacity="0.5"/>
            <stop offset="100%" stop-color="#000" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <ellipse cx="150" cy="480" rx="120" ry="28" :fill="'url(#aura-' + userStore.user.level + ')'"/>
        <g v-html="tier.svg"></g>
      </svg>
      <svg class="activity-svg" viewBox="0 0 300 500" xmlns="http://www.w3.org/2000/svg" v-if="selectedActivity" preserveAspectRatio="xMidYMid slice">
        <g v-html="selectedActivity.svg"></g>
      </svg>
      <div class="stage-glow" :style="{ background: `radial-gradient(ellipse at 50% 80%, ${tier.aura}40 0%, transparent 65%)` }"></div>
    </div>

    <p class="hero-quote">"{{ tier.desc }}"</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '../stores/user.store'

const userStore = useUserStore()
const tier = computed(() => userStore.characterTier)
const selectedBackground = computed(() => userStore.selectedBackground)
const selectedActivity = computed(() => userStore.selectedActivity)
</script>

<style scoped>
.character-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.class-banner {
  flex-shrink: 0;
  text-align: center;
  padding: clamp(6px, 0.8vh, 14px) 0 0;
  animation: fadeUp 0.5s ease-out;
}
@keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

.lvl-pill {
  display: inline-block;
  background: #f1c40f;
  color: #000;
  font-size: clamp(11px, 0.85vw, 14px); font-weight: 800;
  letter-spacing: 3px;
  padding: 4px 14px;
  border-radius: 5px;
  margin-bottom: 6px;
}
.class-name {
  font-size: clamp(22px, 2.4vw, 38px); font-weight: 800;
  color: #fff;
  letter-spacing: clamp(3px, 0.5vw, 6px);
  text-transform: uppercase;
  margin: 0;
}

/* ── Stage — ocupa el espacio restante, sin overflow ─────────────────────── */
.character-stage {
  position: relative;
  width: 100%;
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  pointer-events: none;
}

.background-svg {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  z-index: 0;
  pointer-events: none;
}

/* Hero y activity SVG llenan el stage completo; preserveAspectRatio="slice" hace zoom
   sobre el viewBox recortando el padding transparente del PNG */
.hero-svg,
.activity-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;
}
.hero-svg   { z-index: 1; }
.activity-svg { z-index: 2; }

.stage-glow {
  position: absolute;
  bottom: 5%; left: 50%;
  transform: translateX(-50%);
  width: clamp(240px, 40vw, 600px);
  height: clamp(80px, 14vw, 200px);
  border-radius: 50%;
  pointer-events: none;
  transition: background 0.8s ease;
  z-index: 3;
}

.hero-quote {
  flex-shrink: 0;
  font-style: italic;
  color: #555;
  font-size: clamp(11px, 0.75vw, 13px);
  text-align: center;
  letter-spacing: 0.5px;
  padding: 4px 0 clamp(4px, 0.6vh, 8px);
}
</style>
