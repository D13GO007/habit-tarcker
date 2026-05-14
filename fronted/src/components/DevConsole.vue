<template>
  <div class="dev-console">
    <h4>🛠️ Dev Console</h4>
    <div class="dev-actions">
      <button @click="userStore.cheatLevelUp()">Nivel +1</button>
      <button @click="userStore.cheatLevelDown()">Nivel -1</button>
      <button @click="userStore.cheatAddGold()">Oro +1000</button>
      <button @click="userStore.cheatHeal()">Curar HP</button>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user.store'
const userStore = useUserStore()
</script>

<style scoped>
.dev-console {
  position: fixed; bottom: 20px; right: 20px;
  background: rgba(0,0,0,0.8);
  border: 1px dashed #f39c12;
  padding: 15px; border-radius: 8px;
  z-index: 9999; color: #fff;
}
.dev-console h4 { margin: 0 0 10px 0; color: #f39c12; font-size: 12px; text-transform: uppercase; }
.dev-actions { display: flex; gap: 5px; flex-wrap: wrap; }
.dev-actions button { background: #333; color: #fff; border: 1px solid #555; padding: 5px 10px; cursor: pointer; font-size: 11px; }
.dev-actions button:hover { background: #f39c12; color: #000; }
</style>
