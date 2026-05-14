<template>
  <div class="glass-card character-editor">
    <div class="section-title">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1L9.5 5.5H4.5L7 1Z" fill="#f1c40f"/>
        <path d="M2 6.5H12L8.5 13L2 6.5Z" fill="#f1c40f" opacity="0.85"/>
      </svg>
      FORMA: {{ tier.name }}
    </div>

    <button class="btn-reset" type="button" @click="resetTier">Restablecer forma</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '../stores/user.store'

const userStore = useUserStore()
const tier = computed(() => userStore.characterTier)

function resetTier() {
  userStore.resetCharacterBase(tier.value.key)
}
</script>

<style scoped>
.character-editor {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.field-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.field-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.field-label {
  color: #c5c9d8;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.field-hint {
  color: #666;
  font-size: 10px;
}

.preset-list {
  display: flex;
  gap: 6px;
}
.preset-btn {
  flex: 1;
  border: 1px solid rgba(241,196,15,0.18);
  background: rgba(0,0,0,0.18);
  color: #f5f6fa;
  padding: 7px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 11px;
  font-family: inherit;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.preset-btn:hover {
  border-color: #f1c40f;
  background: rgba(241,196,15,0.14);
}

.btn-reset {
  width: 100%;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.04);
  color: #9aa2b3;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 11px;
  font-family: inherit;
  transition: all 0.2s;
}
.btn-reset:hover {
  background: rgba(255,255,255,0.08);
  color: #dfe4ee;
}
</style>
