import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { buyItem, cheatGold, fetchUser, saveCharacterState, usePotion as usePotionApi, fetchAchievements } from '../api/users'
import { useToastStore } from './toast.store'
import { backgroundCatalog, activityCatalog, defaultCustomization, tierDefaults, tierSVGBuilders } from '../data/characterData'

const createDefaultUser = () => ({
  id: null,
  hp: 100,
  xp: 0,
  level: 1,
  coins: 0,
  name: '',
  hard_mode: false,
  gender: 'male',
  shield: false,
  missions_completed: 0,
  character: JSON.parse(JSON.stringify(defaultCustomization)),
  inventory: [],
  equipped: [],
  backgrounds: [],
  selectedBackground: null,
  activities: [],
  selectedActivity: null,
  achievements: []
})

function mergeCharacterData(charData) {
  const base = JSON.parse(JSON.stringify(defaultCustomization))
  return {
    latente:         { ...base.latente,         ...(charData?.latente         || {}) },
    cazador:         { ...base.cazador,         ...(charData?.cazador         || {}) },
    superviviente:   { ...base.superviviente,   ...(charData?.superviviente   || {}) },
    ceniza:          { ...base.ceniza,          ...(charData?.ceniza          || {}) },
    latente_f:       { ...base.latente_f,       ...(charData?.latente_f       || {}) },
    cazador_f:       { ...base.cazador_f,       ...(charData?.cazador_f       || {}) },
    superviviente_f: { ...base.superviviente_f, ...(charData?.superviviente_f || {}) },
    ceniza_f:        { ...base.ceniza_f,        ...(charData?.ceniza_f        || {}) }
  }
}

export const useUserStore = defineStore('user', () => {
  const user = ref(createDefaultUser())

  const xpNeeded     = computed(() => (user.value.level || 1) * 100)
  const xpPercentage = computed(() => Math.min((user.value.xp / xpNeeded.value) * 100, 100))

  const ownedBackgrounds = computed(() =>
    user.value.backgrounds.map(k => backgroundCatalog.find(i => i.key === k)).filter(Boolean)
  )
  const selectedBackground = computed(() =>
    backgroundCatalog.find(i => i.key === user.value.selectedBackground) || null
  )
  const ownedActivities = computed(() =>
    user.value.activities.map(k => activityCatalog.find(i => i.key === k)).filter(Boolean)
  )
  const selectedActivity = computed(() =>
    activityCatalog.find(i => i.key === user.value.selectedActivity) || null
  )

  const characterTier = computed(() => {
    const lvl = user.value.level || 1
    const gender = user.value.gender || 'male'
    let baseKey, name, desc, aura
    if (lvl < 5)       { baseKey = 'latente';      name = gender === 'female' ? 'Latente'              : 'Latente';            desc = 'Un alma desnuda frente al destino.';       aura = '#555555' }
    else if (lvl < 10) { baseKey = 'cazador';       name = gender === 'female' ? 'Cazadora'             : 'Cazador';            desc = 'Forjado en el bosque, templado en sangre.'; aura = '#27ae60' }
    else if (lvl < 20) { baseKey = 'superviviente'; name = gender === 'female' ? 'Superviviente'        : 'Superviviente';      desc = 'Las runas hablan. El acero obedece.';       aura = '#2980b9' }
    else               { baseKey = 'ceniza';         name = gender === 'female' ? 'Señora de la Ceniza' : 'Señor de la Ceniza'; desc = 'Donde otros ven el fin, yo veo un umbral.'; aura = '#f1c40f' }
    const key = gender === 'female' ? `${baseKey}_f` : baseKey
    const c = { ...tierDefaults[key], ...(user.value.character?.[key] || {}) }
    const equipped = user.value.equipped || []
    return { key, name, desc, aura, svg: tierSVGBuilders[key](c, equipped) }
  })

  // ── Persistencia local ────────────────────────────────────────────────────────
  function saveUserState() {
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  // ── Persistencia remota ───────────────────────────────────────────────────────
  // character_data también almacena cosmética (backgrounds, activities, selecciones)
  async function persistCharacterToDB() {
    if (!user.value.id) return
    try {
      await saveCharacterState(user.value.id, {
        character_data: {
          ...user.value.character,
          backgrounds:        user.value.backgrounds,
          selectedBackground: user.value.selectedBackground,
          activities:         user.value.activities,
          selectedActivity:   user.value.selectedActivity
        },
        inventory: user.value.inventory,
        equipped:  user.value.equipped
      })
    } catch { /* ignorar si el servidor no está disponible */ }
  }

  // ── Carga inicial ─────────────────────────────────────────────────────────────
  function loadFromStorage() {
    const stored = localStorage.getItem('user')
    if (!stored) return false
    const parsed = JSON.parse(stored)
    user.value = {
      ...createDefaultUser(),
      ...parsed,
      character:          mergeCharacterData(parsed.character),
      inventory:          Array.isArray(parsed.inventory)   ? parsed.inventory   : [],
      equipped:           Array.isArray(parsed.equipped)    ? parsed.equipped    : [],
      backgrounds:        Array.isArray(parsed.backgrounds) ? parsed.backgrounds : [],
      selectedBackground: parsed.selectedBackground || null,
      activities:         Array.isArray(parsed.activities)  ? parsed.activities  : [],
      selectedActivity:   parsed.selectedActivity   || null
    }
    return true
  }

  // Sincroniza con la BD al arrancar el frontend.
  // Stats de juego: la BD es siempre fuente de verdad.
  // Cosmética: la BD gana si tiene datos; si está vacía (migración) sube el estado local.
  async function syncFromServer() {
    if (!user.value.id) return
    try {
      const res = await fetchUser(user.value.id)
      if (!res.data.success) return
      const s = res.data.data

      user.value.xp    = s.xp    ?? user.value.xp
      user.value.level = s.level ?? user.value.level
      user.value.hp    = s.hp    ?? user.value.hp
      user.value.coins = s.coins ?? user.value.coins
      user.value.name  = s.name  ?? user.value.name

      const srvChar      = s.character_data || {}
      const srvInventory = Array.isArray(s.inventory) ? s.inventory : []
      const srvEquipped  = Array.isArray(s.equipped)  ? s.equipped  : []

      const dbHasChar  = Object.keys(srvChar).length > 0
      const dbHasItems = srvInventory.length > 0 || srvEquipped.length > 0

      if (dbHasChar) {
        user.value.character          = mergeCharacterData(srvChar)
        user.value.backgrounds         = Array.isArray(srvChar.backgrounds)  ? srvChar.backgrounds  : user.value.backgrounds
        user.value.selectedBackground  = srvChar.selectedBackground           ?? user.value.selectedBackground
        user.value.activities          = Array.isArray(srvChar.activities)    ? srvChar.activities   : user.value.activities
        user.value.selectedActivity    = srvChar.selectedActivity             ?? user.value.selectedActivity
      }
      if (dbHasItems) {
        user.value.inventory = srvInventory
        user.value.equipped  = srvEquipped
      }

      if (s.hard_mode !== undefined)          user.value.hard_mode          = s.hard_mode
      if (s.gender !== undefined)            user.value.gender             = s.gender
      if (s.shield !== undefined)            user.value.shield             = s.shield
      if (s.missions_completed !== undefined) user.value.missions_completed = s.missions_completed

      saveUserState()

      // Migración: si la BD estaba vacía, subir el estado local ahora
      if (!dbHasChar || !dbHasItems) await persistCharacterToDB()

      await fetchAchievementsFromServer()
    } catch { /* servidor no disponible: continuar con datos del localStorage */ }
  }

  async function fetchAchievementsFromServer() {
    if (!user.value.id) return
    try {
      const res = await fetchAchievements(user.value.id)
      if (res.data.success) user.value.achievements = res.data.data.map(a => a.key)
    } catch { /* servidor no disponible */ }
  }

  // Llamado justo después del login con la respuesta del servidor
  function applyStats(stats) {
    const { character_data, inventory: srvInventory, equipped: srvEquipped, ...rest } = stats

    const dbHasChar = character_data && Object.keys(character_data).length > 0
    const dbHasInv  = Array.isArray(srvInventory) && srvInventory.length > 0
    const dbHasEq   = Array.isArray(srvEquipped)  && srvEquipped.length  > 0

    user.value = {
      ...user.value,
      ...rest,
      character:          dbHasChar ? mergeCharacterData(character_data) : user.value.character,
      backgrounds:        dbHasChar && Array.isArray(character_data.backgrounds) ? character_data.backgrounds : user.value.backgrounds,
      selectedBackground: dbHasChar ? (character_data.selectedBackground ?? user.value.selectedBackground)    : user.value.selectedBackground,
      activities:         dbHasChar && Array.isArray(character_data.activities)  ? character_data.activities  : user.value.activities,
      selectedActivity:   dbHasChar ? (character_data.selectedActivity   ?? user.value.selectedActivity)      : user.value.selectedActivity,
      inventory:          dbHasInv  ? srvInventory : user.value.inventory,
      equipped:           dbHasEq   ? srvEquipped  : user.value.equipped
    }
    saveUserState()

    // Migración: si la BD no tenía cosmética, subirla ahora
    if (!dbHasChar || (!dbHasInv && !dbHasEq)) {
      persistCharacterToDB()
    }
  }

  async function usePotion(type) {
    const toast = useToastStore()
    try {
      const res = await usePotionApi(user.value.id, type)
      if (res.data.success) {
        user.value.hp = res.data.hp
        user.value.coins = res.data.coins
        user.value.shield = res.data.shield
        saveUserState()
        toast.show(res.data.message, 'success')
      }
    } catch (err) {
      toast.show(err.response?.data?.message || 'Error al usar poción', 'error')
    }
  }

  function setToken(token) {
    localStorage.setItem('token', token)
  }

  function clearSession() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    user.value = createDefaultUser()
  }

  // ── Fondos ────────────────────────────────────────────────────────────────────
  function getBackgroundByKey(key) { return backgroundCatalog.find(i => i.key === key) }
  function isBackgroundOwned(key)  { return user.value.backgrounds.includes(key) }

  function selectBackground(key) {
    if (!isBackgroundOwned(key)) return
    user.value.selectedBackground = key
    saveUserState()
    persistCharacterToDB()
  }

  async function purchaseItem(cost, itemKey, getItem, isOwned, onSuccess, unknownMsg) {
    const toast = useToastStore()
    const item = getItem(itemKey)
    if (!item) { toast.show(unknownMsg, 'error'); return }
    if (user.value.coins < cost) { toast.show(`Oro insuficiente — faltan ${cost - user.value.coins}`, 'error'); return }
    if (isOwned(itemKey)) { toast.show(`Ya posees ${item.name}`, 'success'); return }
    try {
      const res = await buyItem(user.value.id, cost)
      if (res.data.success) {
        user.value.coins = res.data.coins
        onSuccess(itemKey)
        saveUserState()
        await persistCharacterToDB()
        toast.show(`¡${item.name} desbloqueado!`, 'success')
      } else {
        if (res.data.coins !== undefined) { user.value.coins = res.data.coins; saveUserState() }
        useToastStore().show(res.data.message, 'error')
      }
    } catch (err) {
      const serverMsg = err.response?.data?.message
      if (err.response?.status === 400 && serverMsg) {
        if (err.response.data.coins !== undefined) { user.value.coins = err.response.data.coins; saveUserState() }
        useToastStore().show(serverMsg, 'error')
      } else {
        useToastStore().show('Error al procesar la compra', 'error')
      }
    }
  }

  async function buyReward(cost, itemKey) {
    await purchaseItem(cost, itemKey, getBackgroundByKey, isBackgroundOwned,
      (key) => user.value.backgrounds.push(key), 'Fondo desconocido')
  }

  // ── Actividades ───────────────────────────────────────────────────────────────
  function getActivityByKey(key) { return activityCatalog.find(i => i.key === key) }
  function isActivityOwned(key)  { return user.value.activities.includes(key) }

  function selectActivity(key) {
    if (!isActivityOwned(key)) return
    user.value.selectedActivity = key
    saveUserState()
    persistCharacterToDB()
  }

  async function buyActivity(cost, itemKey) {
    await purchaseItem(cost, itemKey, getActivityByKey, isActivityOwned,
      (key) => user.value.activities.push(key), 'Actividad desconocida')
  }

  function addAchievement(key) {
    if (!user.value.achievements.includes(key)) user.value.achievements.push(key)
  }

  // ── Personalización de personaje ──────────────────────────────────────────────
  function setCharacterCustomization(tierKey, changes) {
    if (!user.value.character[tierKey]) {
      user.value.character[tierKey] = { ...tierDefaults[tierKey] }
    }
    user.value.character[tierKey] = { ...user.value.character[tierKey], ...changes }
    saveUserState()
    persistCharacterToDB()
  }

  function resetCharacterBase(tierKey) {
    if (tierKey) {
      user.value.character[tierKey] = { ...tierDefaults[tierKey] }
    } else {
      user.value.character = JSON.parse(JSON.stringify(defaultCustomization))
    }
    saveUserState()
    persistCharacterToDB()
  }

  // ── Cheats ────────────────────────────────────────────────────────────────────
  function cheatLevelUp() {
    user.value.level++; user.value.xp = 0; saveUserState()
    useToastStore().show('¡Nivel aumentado!', 'levelup')
  }
  function cheatLevelDown() {
    if (user.value.level > 1) { user.value.level--; user.value.xp = 0; saveUserState(); useToastStore().show('Nivel reducido', 'success') }
  }
  async function cheatAddGold() {
    try {
      const res = await cheatGold(user.value.id)
      if (res.data.success) {
        user.value.coins = res.data.coins
        saveUserState()
        useToastStore().show(`+1000 Oro (total: ${res.data.coins})`, 'success')
      }
    } catch {
      user.value.coins += 1000; saveUserState()
      useToastStore().show('+1000 Oro (local)', 'success')
    }
  }
  function cheatHeal() {
    user.value.hp = 100; saveUserState(); useToastStore().show('HP restaurado', 'success')
  }

  return {
    user, xpNeeded, xpPercentage, characterTier,
    ownedBackgrounds, selectedBackground, ownedActivities, selectedActivity,
    loadFromStorage, applyStats, syncFromServer, clearSession, setToken,
    fetchAchievementsFromServer, usePotion, addAchievement,
    buyReward, buyActivity,
    setCharacterCustomization, resetCharacterBase,
    getBackgroundByKey, getActivityByKey,
    isBackgroundOwned, isActivityOwned,
    selectBackground, selectActivity,
    cheatLevelUp, cheatLevelDown, cheatAddGold, cheatHeal
  }
})
