<template>
  <transition name="toast">
    <div v-if="toastStore.toast.visible" class="toast" :class="toastStore.toast.type">
      <svg v-if="toastStore.toast.type === 'success'" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.5" fill="none" stroke="#27ae60" stroke-width="1.2"/>
        <path d="M4.5 8l2.5 2.5 4.5-5" stroke="#27ae60" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg v-else-if="toastStore.toast.type === 'damage'" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 2l1.5 4.5h4.5l-3.5 2.5 1.5 4.5L8 11l-4 2.5 1.5-4.5L2 6.5h4.5Z" fill="none" stroke="#e74c3c" stroke-width="1.2"/>
      </svg>
      <svg v-else-if="toastStore.toast.type === 'levelup'" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <polygon points="8,2 10,6 14,6.5 11,9.5 11.5,14 8,12 4.5,14 5,9.5 2,6.5 6,6" fill="#f1c40f" stroke="#b7950b" stroke-width="0.8"/>
      </svg>
      <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.5" fill="none" stroke="#e74c3c" stroke-width="1.2"/>
        <path d="M8 5v4M8 10.5v1" stroke="#e74c3c" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      <span>{{ toastStore.toast.message }}</span>
    </div>
  </transition>
</template>

<script setup>
import { useToastStore } from '../stores/toast.store'
const toastStore = useToastStore()
</script>

<style scoped>
.toast {
  position: fixed; bottom: 36px; left: 50%;
  transform: translateX(-50%);
  display: flex; align-items: center; gap: 14px;
  padding: 16px 28px; border-radius: 12px;
  font-size: 17px; font-weight: 600; letter-spacing: 1px;
  z-index: 100; border: 1px solid;
  backdrop-filter: blur(10px); white-space: nowrap;
}
.toast.success { background: rgba(39,174,96,0.12);  border-color: rgba(39,174,96,0.3);  color: #2ecc71; }
.toast.damage  { background: rgba(243,156,18,0.12); border-color: rgba(243,156,18,0.3); color: #f39c12; }
.toast.error   { background: rgba(231,76,60,0.12);  border-color: rgba(231,76,60,0.3);  color: #e74c3c; }
.toast.levelup { background: rgba(241,196,15,0.15); border-color: rgba(241,196,15,0.4); color: #f1c40f; }

.toast-enter-active { transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1); }
.toast-leave-active { transition: all 0.2s ease-in; }
.toast-enter-from   { opacity: 0; transform: translateX(-50%) translateY(16px); }
.toast-leave-to     { opacity: 0; transform: translateX(-50%) translateY(8px); }
</style>
