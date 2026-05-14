<template>
  <div class="glass-card shop">
    <div class="section-title">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="2" y="6" width="10" height="7" rx="1" fill="none" stroke="#f1c40f" stroke-width="1"/>
        <path d="M4 6V4a3 3 0 0 1 6 0v2" fill="none" stroke="#f1c40f" stroke-width="1" stroke-linecap="round"/>
        <circle cx="7" cy="9" r="1.2" fill="#f1c40f"/>
      </svg>
      TIENDA ÉPICA
    </div>

    <div class="reward-section">
      <div class="section-subtitle">Consumibles</div>
      <div class="reward-items">
        <div class="item-slot" :class="{ 'cant-afford': userStore.user.coins < 150 }">
          <div class="item-icon potion-icon">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M8 3h6M9 3v4L5 14a4 4 0 0 0 12 0L13 7V3" stroke="#e74c3c" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6.5 14.5a3 3 0 0 0 5 2" stroke="#e74c3c" stroke-width="1" stroke-linecap="round" opacity="0.6"/>
            </svg>
          </div>
          <div class="item-info">
            <strong>Poción de Vida</strong>
            <p>Restaura 30 HP al instante.</p>
            <div class="cost-preview" :class="userStore.user.coins >= 150 ? 'enough' : 'short'">
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="3.5" fill="none" stroke="currentColor" stroke-width="1"/></svg>
              {{ userStore.user.coins >= 150 ? `Quedan ${userStore.user.coins - 150} tras uso` : `Faltan ${150 - userStore.user.coins}` }}
            </div>
          </div>
          <button @click="userStore.usePotion('life')" :disabled="userStore.user.coins < 150 || userStore.user.hp >= 100" class="btn-buy">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 2v6M2 5h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            150
          </button>
        </div>
        <div class="item-slot" :class="{ 'cant-afford': userStore.user.coins < 300 }">
          <div class="item-icon potion-icon">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 3L5 9l6 10 6-10-6-6z" stroke="#3498db" stroke-width="1.3" stroke-linejoin="round"/>
              <path d="M8 9l3 4 3-4" stroke="#3498db" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>
            </svg>
          </div>
          <div class="item-info">
            <strong>Escudo de Día</strong>
            <p>Absorbe el daño de medianoche una vez.</p>
            <div class="cost-preview" :class="userStore.user.coins >= 300 ? 'enough' : 'short'">
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="3.5" fill="none" stroke="currentColor" stroke-width="1"/></svg>
              <template v-if="userStore.user.shield">Escudo activo</template>
              <template v-else>{{ userStore.user.coins >= 300 ? `Quedan ${userStore.user.coins - 300} tras uso` : `Faltan ${300 - userStore.user.coins}` }}</template>
            </div>
          </div>
          <button @click="userStore.usePotion('shield')" :disabled="userStore.user.coins < 300 || userStore.user.shield" class="btn-buy btn-shield">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1L2 3v3c0 2 3 3 3 3s3-1 3-3V3L5 1z" stroke="currentColor" stroke-width="1" stroke-linejoin="round"/></svg>
            300
          </button>
        </div>
      </div>
    </div>

    <div class="reward-section">
      <div class="section-subtitle">Fondos Épicos</div>
      <div class="reward-items">
        <div v-for="item in backgrounds" :key="item.name" class="item-slot" :class="{ 'cant-afford': userStore.user.coins < item.cost }">
          <div class="item-icon" v-html="item.icon || item.svg"></div>
          <div class="item-info">
            <strong>{{ item.name }}</strong>
            <p>{{ item.desc }}</p>
            <div class="cost-preview" :class="userStore.user.coins >= item.cost ? 'enough' : 'short'">
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="3.5" fill="none" stroke="currentColor" stroke-width="1"/></svg>
              <template v-if="userStore.isBackgroundOwned(item.key)">
                Comprado
              </template>
              <template v-else>
                {{ userStore.user.coins >= item.cost
                  ? `Quedan ${userStore.user.coins - item.cost} tras compra`
                  : `Faltan ${item.cost - userStore.user.coins} de oro` }}
              </template>
            </div>
          </div>
          <button v-if="userStore.isBackgroundOwned(item.key)" @click="userStore.selectBackground(item.key)" class="btn-select" :class="{ 'selected': userStore.user.selectedBackground === item.key }">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="3.5" fill="none" stroke="currentColor" stroke-width="1"/>
              <path d="M3 5L4.5 6.5L7 4" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Seleccionar
          </button>
          <button v-else @click="userStore.buyReward(item.cost, item.key)" :disabled="userStore.user.coins < item.cost" class="btn-buy">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="3.5" fill="none" stroke="currentColor" stroke-width="1"/>
              <path d="M3.5 5.5C3.5 5.5 4 6.5 5 6.5C6 6.5 6.5 5.8 6.5 5C6.5 4.2 6 3.5 5 3.5C4.2 3.5 3.8 4 3.8 4" stroke="currentColor" stroke-width="0.8" stroke-linecap="round"/>
            </svg>
            {{ item.cost }}
          </button>
        </div>
      </div>
    </div>

    <div class="reward-section">
      <div class="section-subtitle">Actividades</div>
      <div class="reward-items">
        <div v-for="item in activities" :key="item.name" class="item-slot" :class="{ 'cant-afford': userStore.user.coins < item.cost }">
          <div class="item-icon" v-html="item.icon || item.svg"></div>
          <div class="item-info">
            <strong>{{ item.name }}</strong>
            <p>{{ item.desc }}</p>
            <div class="cost-preview" :class="userStore.user.coins >= item.cost ? 'enough' : 'short'">
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="3.5" fill="none" stroke="currentColor" stroke-width="1"/></svg>
              <template v-if="userStore.isActivityOwned(item.key)">
                Comprado
              </template>
              <template v-else>
                {{ userStore.user.coins >= item.cost
                  ? `Quedan ${userStore.user.coins - item.cost} tras compra`
                  : `Faltan ${item.cost - userStore.user.coins} de oro` }}
              </template>
            </div>
          </div>
          <button v-if="userStore.isActivityOwned(item.key)" @click="userStore.selectActivity(item.key)" class="btn-select" :class="{ 'selected': userStore.user.selectedActivity === item.key }">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="3.5" fill="none" stroke="currentColor" stroke-width="1"/>
              <path d="M3 5L4.5 6.5L7 4" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Seleccionar
          </button>
          <button v-else @click="userStore.buyActivity(item.cost, item.key)" :disabled="userStore.user.coins < item.cost" class="btn-buy">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="3.5" fill="none" stroke="currentColor" stroke-width="1"/>
              <path d="M3.5 5.5C3.5 5.5 4 6.5 5 6.5C6 6.5 6.5 5.8 6.5 5C6.5 4.2 6 3.5 5 3.5C4.2 3.5 3.8 4 3.8 4" stroke="currentColor" stroke-width="0.8" stroke-linecap="round"/>
            </svg>
            {{ item.cost }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user.store'
import { backgroundCatalog, activityCatalog } from '../data/characterData'

const userStore = useUserStore()
const backgrounds = backgroundCatalog
const activities = activityCatalog
</script>

<style scoped>
.shop { flex-shrink: 0; }
.reward-items { display: flex; flex-direction: column; gap: 8px; }

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  color: #f1c40f; /* Cambia este color, ej. a #ff0000 para rojo */
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
}

.item-slot {
  display: flex;
  align-items: center;
  border: 1px solid rgba(255,255,255,0.04);
  border-radius: 8px;
  padding: 10px;
  transition: border-color 0.2s;
}
.item-slot:hover { border-color: rgba(241,196,15,0.15); }
.item-slot.cant-afford { opacity: 0.55; }

.item-icon {
  width: 44px; height: 44px;
  background: rgba(0,0,0,0.3);
  border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  border: 1px solid rgba(255,255,255,0.05);
  font-size: 20px;
}
.item-info { flex: 1; min-width: 0; }
.item-info strong { display: block; font-size: 13px; font-weight: 700; color: #ddd; letter-spacing: 0.5px; }
.item-info p { font-size: 11px; color: #777; margin-top: 3px; margin-bottom: 4px; }

.cost-preview { display: flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 600; }
.cost-preview.enough { color: #27ae60; }
.cost-preview.short  { color: #e74c3c; }

.btn-buy {
  display: flex; align-items: center; gap: 6px;
  background: rgba(241,196,15,0.08);
  border: 1px solid rgba(241,196,15,0.25);
  color: #ffcd06;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px; font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
  white-space: nowrap;
}
.btn-buy:hover:not(:disabled) { background: rgba(241,196,15,0.18); border-color: #f1c40f; }
.btn-buy:disabled { opacity: 0.25; cursor: not-allowed; }

.btn-select {
  display: flex; align-items: center; gap: 6px;
  background: rgba(39,174,96,0.08);
  border: 1px solid rgba(39,174,96,0.25);
  color: #27ae60;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px; font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
  white-space: nowrap;
}
.btn-select:hover { background: rgba(39,174,96,0.18); border-color: #27ae60; }
.btn-select.selected { background: rgba(39,174,96,0.25); border-color: #27ae60; color: #2ecc71; }
.potion-icon { background: rgba(0,0,0,0.3) !important; }
.btn-shield { border-color: rgba(52,152,219,0.35) !important; color: #3498db !important; background: rgba(52,152,219,0.08) !important; }
.btn-shield:hover:not(:disabled) { background: rgba(52,152,219,0.18) !important; border-color: #3498db !important; }
</style>
