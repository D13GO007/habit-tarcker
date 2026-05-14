import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './user.store'

export const RARITY_COLORS = {
  common:    '#95a5a6',
  rare:      '#2980b9',
  epic:      '#8e44ad',
  legendary: '#f1c40f',
}

export const SLOT_LABELS = {
  head:   'CABEZA',
  weapon: 'ARMA',
  back:   'ESPALDA',
  effect: 'EFECTO',
}

export const ACCESSORIES = [
  // ─── HEAD ────────────────────────────────────────────────────────────────
  {
    id: 'horns_cursed',
    name: 'Cuernos Malditos',
    desc: 'Marca del que cruzó el abismo',
    slot: 'head', cost: 200, rarity: 'common',
    svg: `
      <path d="M120 52 Q108 28 112 8 Q120 16 124 32 Q127 44 126 54Z" fill="#5d1a1a" stroke="#8b2020" stroke-width="1.3"/>
      <path d="M120 52 Q110 30 113 10 Q118 20 120 36Z" fill="#e74c3c" opacity="0.32"/>
      <circle cx="113" cy="9" r="3" fill="#e74c3c" opacity="0.5"/>
      <path d="M180 52 Q192 28 188 8 Q180 16 176 32 Q173 44 174 54Z" fill="#5d1a1a" stroke="#8b2020" stroke-width="1.3"/>
      <path d="M180 52 Q190 30 187 10 Q182 20 180 36Z" fill="#e74c3c" opacity="0.32"/>
      <circle cx="187" cy="9" r="3" fill="#e74c3c" opacity="0.5"/>
    `
  },
  {
    id: 'crown_ruby',
    name: 'Corona de Rubí',
    desc: 'Quien la porta, manda',
    slot: 'head', cost: 520, rarity: 'rare',
    svg: `
      <path d="M114 57 Q150 48 186 57 L188 67 Q150 60 112 67Z" fill="#8b1a1a" stroke="#c0392b" stroke-width="1.2"/>
      <path d="M150 57 L146 39 L154 39Z" fill="#f1c40f" stroke="#b7950b" stroke-width="0.8"/>
      <path d="M132 61 L126 44 L134 46Z" fill="#f1c40f" stroke="#b7950b" stroke-width="0.8"/>
      <path d="M168 61 L174 44 L166 46Z" fill="#f1c40f" stroke="#b7950b" stroke-width="0.8"/>
      <circle cx="150" cy="57" r="5.5" fill="#e74c3c" stroke="#f1c40f" stroke-width="1"/>
      <circle cx="150" cy="57" r="2.5" fill="#f1948a"/>
      <circle cx="132" cy="61" r="3.5" fill="#c0392b" stroke="#f1c40f" stroke-width="0.8"/>
      <circle cx="168" cy="61" r="3.5" fill="#c0392b" stroke="#f1c40f" stroke-width="0.8"/>
      <path d="M114 57 Q150 48 186 57" fill="none" stroke="#f1c40f" stroke-width="1.5" opacity="0.55"/>
    `
  },
  {
    id: 'diadem_oracle',
    name: 'Diadema del Oráculo',
    desc: 'Ve lo que ningún ojo mortal puede ver',
    slot: 'head', cost: 1200, rarity: 'legendary',
    svg: `
      <path d="M110 73 Q150 63 190 73 L192 83 Q150 76 108 83Z" fill="#1a0050" stroke="#9b59b6" stroke-width="1.5"/>
      <path d="M150 73 L143 51 L150 45 L157 51Z" fill="#9b59b6" stroke="#bf7fff" stroke-width="1.2"/>
      <path d="M150 73 L145 55 L150 49 L155 55Z" fill="#d7bfff" opacity="0.5"/>
      <circle cx="126" cy="75" r="5.5" fill="#9b59b6" stroke="#bf7fff" stroke-width="1"/>
      <circle cx="174" cy="75" r="5.5" fill="#9b59b6" stroke="#bf7fff" stroke-width="1"/>
      <ellipse cx="150" cy="60" rx="12" ry="14" fill="#9b59b6" opacity="0.1"/>
      <circle cx="150" cy="60" r="22" fill="none" stroke="#9b59b6" stroke-width="0.6" opacity="0.28"/>
      <circle cx="172" cy="60" r="2.8" fill="#bf7fff" opacity="0.88">
        <animateTransform attributeName="transform" type="rotate" values="0 150 60;360 150 60" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="128" cy="60" r="2" fill="#9b59b6" opacity="0.72">
        <animateTransform attributeName="transform" type="rotate" values="180 150 60;540 150 60" dur="4.5s" repeatCount="indefinite"/>
      </circle>
    `
  },

  // ─── WEAPON ──────────────────────────────────────────────────────────────
  {
    id: 'sword_iron',
    name: 'Espada de Hierro',
    desc: 'Simple, directa, letal',
    slot: 'weapon', cost: 150, rarity: 'common',
    svg: `
      <path d="M256 80 L251 80 L247 306 L256 311 L265 306Z" fill="#c0c8d8" stroke="#9aa0b0" stroke-width="0.8"/>
      <line x1="256" y1="90" x2="251" y2="304" stroke="#dde2ee" stroke-width="1.8" opacity="0.5"/>
      <rect x="235" y="300" width="44" height="11" rx="5" fill="#7a6010" stroke="#5a4808" stroke-width="1"/>
      <rect x="248" y="311" width="18" height="36" rx="4" fill="#2c1a00" stroke="#7a6010" stroke-width="1"/>
      <line x1="250" y1="317" x2="264" y2="317" stroke="#7a6010" stroke-width="1.2" opacity="0.6"/>
      <line x1="250" y1="324" x2="264" y2="324" stroke="#7a6010" stroke-width="1.2" opacity="0.6"/>
      <line x1="250" y1="331" x2="264" y2="331" stroke="#7a6010" stroke-width="1.2" opacity="0.6"/>
      <circle cx="257" cy="350" r="8.5" fill="#7a6010" stroke="#5a4808" stroke-width="1"/>
      <circle cx="257" cy="350" r="4" fill="#5a4808"/>
    `
  },
  {
    id: 'sword_flame',
    name: 'Espada Llameante',
    desc: 'Forjada en la boca de un volcán dormido',
    slot: 'weapon', cost: 420, rarity: 'rare',
    svg: `
      <ellipse cx="255" cy="68" rx="7" ry="18" fill="#f1c40f" opacity="0.15"/>
      <circle cx="253" cy="76" r="3" fill="#f1c40f" opacity="0.55"><animate attributeName="cy" values="76;58;44" dur="1.4s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.55;0.25;0" dur="1.4s" repeatCount="indefinite"/></circle>
      <circle cx="258" cy="86" r="2" fill="#e74c3c" opacity="0.5"><animate attributeName="cy" values="86;68;52" dur="1.8s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.5;0.2;0" dur="1.8s" repeatCount="indefinite"/></circle>
      <circle cx="251" cy="92" r="1.5" fill="#f39c12" opacity="0.6"><animate attributeName="cy" values="92;74;58" dur="2.2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.6;0.2;0" dur="2.2s" repeatCount="indefinite"/></circle>
      <path d="M256 84 L251 84 L246 304 L256 310 L266 304Z" fill="#e74c3c" stroke="#c0392b" stroke-width="0.8"/>
      <path d="M256 90 L251 90 L247 301 L256 306 L265 301Z" fill="#f39c12" stroke="#e67e22" stroke-width="0.6" opacity="0.8"/>
      <line x1="256" y1="96" x2="251" y2="299" stroke="#fff" stroke-width="1.5" opacity="0.42"/>
      <rect x="234" y="301" width="44" height="11" rx="5" fill="#f1c40f" stroke="#b7950b" stroke-width="1.2"/>
      <rect x="248" y="312" width="18" height="36" rx="4" fill="#1a0000" stroke="#f1c40f" stroke-width="1"/>
      <line x1="250" y1="318" x2="264" y2="318" stroke="#f1c40f" stroke-width="1.2" opacity="0.6"/>
      <line x1="250" y1="325" x2="264" y2="325" stroke="#f1c40f" stroke-width="1.2" opacity="0.6"/>
      <circle cx="257" cy="351" r="9.5" fill="#f1c40f" stroke="#b7950b" stroke-width="1.5"/>
      <circle cx="257" cy="351" r="4.5" fill="#b7950b"/>
    `
  },
  {
    id: 'staff_crystal',
    name: 'Báculo del Cristal',
    desc: 'El arcano condensado en forma pura',
    slot: 'weapon', cost: 680, rarity: 'epic',
    svg: `
      <rect x="252" y="158" width="8" height="288" rx="3.5" fill="#1a0050" stroke="#6a0dad" stroke-width="1.2"/>
      <ellipse cx="256" cy="452" rx="10" ry="7" fill="#5a008a" stroke="#9b59b6" stroke-width="1.2"/>
      <path d="M256 72 L239 122 L247 128 L256 112 L265 128 L273 122Z" fill="#7f00ff" stroke="#5a008a" stroke-width="1.2"/>
      <path d="M256 78 L245 120 L256 110 L267 120Z" fill="#c09fff" opacity="0.48"/>
      <ellipse cx="256" cy="96" rx="17" ry="30" fill="#9b59b6" opacity="0.1"/>
      <path d="M249 82 L245 98" fill="none" stroke="#fff" stroke-width="2.2" opacity="0.52" stroke-linecap="round"/>
      <circle cx="256" cy="96" r="21" fill="none" stroke="#9b59b6" stroke-width="0.8" opacity="0.32"/>
      <circle cx="256" cy="96" r="13" fill="none" stroke="#bf7fff" stroke-width="0.6" opacity="0.28"/>
      <circle cx="256" cy="96" r="28" fill="none" stroke="#9b59b6" stroke-width="0.5" opacity="0.15"><animate attributeName="r" values="28;34;28" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.15;0.05;0.15" dur="3s" repeatCount="indefinite"/></circle>
      <circle cx="256" cy="172" r="3.5" fill="#9b59b6" opacity="0.55"><animate attributeName="opacity" values="0.55;0.1;0.55" dur="2s" repeatCount="indefinite"/></circle>
      <circle cx="256" cy="306" r="2.5" fill="#bf7fff" opacity="0.4"><animate attributeName="opacity" values="0.4;0.08;0.4" dur="2.6s" repeatCount="indefinite"/></circle>
    `
  },

  // ─── BACK ────────────────────────────────────────────────────────────────
  {
    id: 'cape_traveler',
    name: 'Manto del Viajero',
    desc: 'Mil caminos, una sola verdad',
    slot: 'back', cost: 80, rarity: 'common',
    svg: `
      <path d="M148 132 Q86 158 44 216 Q12 278 10 396 Q14 456 48 476 Q68 486 90 470 Q79 434 78 396 Q78 314 90 268 Q105 222 148 206Z" fill="#1a1008" stroke="#0d0806" stroke-width="1" opacity="0.92"/>
      <path d="M152 132 Q214 158 256 216 Q288 278 290 396 Q286 456 252 476 Q232 486 210 470 Q221 434 222 396 Q222 314 210 268 Q195 222 152 206Z" fill="#1a1008" stroke="#0d0806" stroke-width="1" opacity="0.92"/>
      <path d="M44 216 Q12 278 10 396 Q14 456 48 476" fill="none" stroke="#5d3a1a" stroke-width="1.5" opacity="0.55"/>
      <path d="M256 216 Q288 278 290 396 Q286 456 252 476" fill="none" stroke="#5d3a1a" stroke-width="1.5" opacity="0.55"/>
      <path d="M90 268 Q84 348 82 408 Q80 446 86 464" fill="none" stroke="#222" stroke-width="8" stroke-linecap="round" opacity="0.7"/>
      <path d="M210 268 Q216 348 218 408 Q220 446 214 464" fill="none" stroke="#222" stroke-width="8" stroke-linecap="round" opacity="0.7"/>
    `
  },
  {
    id: 'cape_crimson',
    name: 'Manto Carmesí',
    desc: 'El rojo de quien nunca se rinde',
    slot: 'back', cost: 300, rarity: 'rare',
    svg: `
      <path d="M148 128 Q84 156 40 214 Q8 278 6 398 Q10 460 44 480 Q64 490 88 474 Q77 438 76 398 Q76 316 88 268 Q103 222 148 204Z" fill="#6b0a0a" stroke="#8b1a1a" stroke-width="1.2"/>
      <path d="M152 128 Q216 156 260 214 Q292 278 294 398 Q290 460 256 480 Q236 490 212 474 Q223 438 224 398 Q224 316 212 268 Q197 222 152 204Z" fill="#6b0a0a" stroke="#8b1a1a" stroke-width="1.2"/>
      <path d="M40 214 Q8 278 6 398 Q10 460 44 480" fill="none" stroke="#f1c40f" stroke-width="2.2" opacity="0.88"/>
      <path d="M260 214 Q292 278 294 398 Q290 460 256 480" fill="none" stroke="#f1c40f" stroke-width="2.2" opacity="0.88"/>
      <path d="M86 268 Q80 350 78 412 Q76 450 82 466" fill="none" stroke="#3d0000" stroke-width="9" stroke-linecap="round" opacity="0.7"/>
      <path d="M214 268 Q220 350 222 412 Q224 450 218 466" fill="none" stroke="#3d0000" stroke-width="9" stroke-linecap="round" opacity="0.7"/>
      <circle cx="116" cy="136" r="9" fill="#f1c40f" stroke="#b7950b" stroke-width="1.3"/>
      <circle cx="116" cy="136" r="4.5" fill="#b7950b"/>
      <circle cx="184" cy="136" r="9" fill="#f1c40f" stroke="#b7950b" stroke-width="1.3"/>
      <circle cx="184" cy="136" r="4.5" fill="#b7950b"/>
    `
  },
  {
    id: 'wings_shadow',
    name: 'Alas de Sombra',
    desc: 'Más allá del horizonte visible',
    slot: 'back', cost: 780, rarity: 'legendary',
    svg: `
      <path d="M103 170 Q45 134 12 106 Q-8 74 18 58 Q38 44 64 80 Q80 102 93 146 Q98 160 103 170Z" fill="#140028" stroke="#4a0080" stroke-width="1.5"/>
      <path d="M103 170 Q55 166 25 150 Q7 136 10 118 Q17 102 41 112 Q66 124 91 154Z" fill="#220044" stroke="#6a0090" stroke-width="1" opacity="0.75"/>
      <path d="M103 170 Q66 152 40 124 Q28 108 36 98" fill="none" stroke="#8b00ff" stroke-width="2.2" opacity="0.42"/>
      <path d="M100 200 Q58 190 32 205 Q18 215 22 232" fill="none" stroke="#4a0080" stroke-width="8" stroke-linecap="round" opacity="0.6"/>
      <path d="M97 230 Q62 225 40 240 Q28 250 30 265" fill="none" stroke="#4a0080" stroke-width="6" stroke-linecap="round" opacity="0.5"/>
      <path d="M197 170 Q255 134 288 106 Q308 74 282 58 Q262 44 236 80 Q220 102 207 146 Q202 160 197 170Z" fill="#140028" stroke="#4a0080" stroke-width="1.5"/>
      <path d="M197 170 Q245 166 275 150 Q293 136 290 118 Q283 102 259 112 Q234 124 209 154Z" fill="#220044" stroke="#6a0090" stroke-width="1" opacity="0.75"/>
      <path d="M197 170 Q234 152 260 124 Q272 108 264 98" fill="none" stroke="#8b00ff" stroke-width="2.2" opacity="0.42"/>
      <path d="M200 200 Q242 190 268 205 Q282 215 278 232" fill="none" stroke="#4a0080" stroke-width="8" stroke-linecap="round" opacity="0.6"/>
      <path d="M203 230 Q238 225 260 240 Q272 250 270 265" fill="none" stroke="#4a0080" stroke-width="6" stroke-linecap="round" opacity="0.5"/>
      <path d="M103 170 Q68 188 50 210 Q38 226 44 244" fill="none" stroke="#6a0090" stroke-width="2.5" stroke-linecap="round" opacity="0.45"/>
      <path d="M197 170 Q232 188 250 210 Q262 226 256 244" fill="none" stroke="#6a0090" stroke-width="2.5" stroke-linecap="round" opacity="0.45"/>
      <ellipse cx="150" cy="178" rx="32" ry="12" fill="#8b00ff" opacity="0.06"/>
    `
  },

  // ─── EFFECT ──────────────────────────────────────────────────────────────
  {
    id: 'sparks_gold',
    name: 'Chispas Doradas',
    desc: 'La fortuna siempre llama primero',
    slot: 'effect', cost: 120, rarity: 'common',
    svg: `
      <circle cx="50" cy="395" r="2.5" fill="#f1c40f" opacity="0.82"><animate attributeName="cy" values="395;312;248" dur="2.4s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.82;0.4;0" dur="2.4s" repeatCount="indefinite"/></circle>
      <circle cx="250" cy="375" r="2" fill="#f1c40f" opacity="0.72"><animate attributeName="cy" values="375;292;228" dur="2.8s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.72;0.3;0" dur="2.8s" repeatCount="indefinite"/></circle>
      <circle cx="128" cy="462" r="1.8" fill="#e67e22" opacity="0.62"><animate attributeName="cy" values="462;378;314" dur="3.2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.62;0.22;0" dur="3.2s" repeatCount="indefinite"/></circle>
      <circle cx="174" cy="448" r="2.2" fill="#f1c40f" opacity="0.68"><animate attributeName="cy" values="448;364;300" dur="2.6s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.68;0.26;0" dur="2.6s" repeatCount="indefinite"/></circle>
      <circle cx="274" cy="432" r="1.5" fill="#f1c40f" opacity="0.55"><animate attributeName="cy" values="432;352;292" dur="3.6s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.55;0.2;0" dur="3.6s" repeatCount="indefinite"/></circle>
      <circle cx="36" cy="420" r="1.8" fill="#f39c12" opacity="0.5"><animate attributeName="cy" values="420;342;282" dur="4s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.5;0.15;0" dur="4s" repeatCount="indefinite"/></circle>
      <ellipse cx="150" cy="480" rx="68" ry="13" fill="#f1c40f" opacity="0.07"/>
    `
  },
  {
    id: 'flames_infernal',
    name: 'Llamas Infernales',
    desc: 'Arde o perece en el intento',
    slot: 'effect', cost: 440, rarity: 'rare',
    svg: `
      <circle cx="88" cy="438" r="3" fill="#e74c3c" opacity="0.78"><animate attributeName="cy" values="438;352;286" dur="1.9s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.78;0.36;0" dur="1.9s" repeatCount="indefinite"/></circle>
      <circle cx="212" cy="452" r="2.5" fill="#e67e22" opacity="0.68"><animate attributeName="cy" values="452;366;300" dur="2.2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.68;0.26;0" dur="2.2s" repeatCount="indefinite"/></circle>
      <circle cx="140" cy="466" r="2" fill="#f39c12" opacity="0.62"><animate attributeName="cy" values="466;380;314" dur="2.7s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.62;0.22;0" dur="2.7s" repeatCount="indefinite"/></circle>
      <circle cx="58" cy="420" r="2.5" fill="#c0392b" opacity="0.62"><animate attributeName="cy" values="420;336;272" dur="2.1s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.62;0.22;0" dur="2.1s" repeatCount="indefinite"/></circle>
      <circle cx="244" cy="428" r="2" fill="#e74c3c" opacity="0.55"><animate attributeName="cy" values="428;346;282" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.55;0.2;0" dur="3s" repeatCount="indefinite"/></circle>
      <circle cx="165" cy="442" r="1.5" fill="#f1c40f" opacity="0.45"><animate attributeName="cy" values="442;360;298" dur="2.4s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.45;0.15;0" dur="2.4s" repeatCount="indefinite"/></circle>
      <path d="M116 474 Q150 460 184 474 Q168 466 150 468 Q132 466 116 474Z" fill="#c0392b" opacity="0.32"/>
      <ellipse cx="150" cy="482" rx="66" ry="12" fill="#e74c3c" opacity="0.1"/>
    `
  },
  {
    id: 'stars_cosmic',
    name: 'Espiral de Estrellas',
    desc: 'Nacido del tejido mismo del cosmos',
    slot: 'effect', cost: 800, rarity: 'legendary',
    svg: `
      <circle cx="58" cy="255" r="2.2" fill="#fff" opacity="0.62"><animate attributeName="opacity" values="0.62;0.1;0.62" dur="1.9s" repeatCount="indefinite"/></circle>
      <circle cx="244" cy="205" r="2.5" fill="#fff" opacity="0.52"><animate attributeName="opacity" values="0.52;0.1;0.52" dur="2.5s" repeatCount="indefinite"/></circle>
      <circle cx="40" cy="335" r="1.5" fill="#bf7fff" opacity="0.72"><animate attributeName="opacity" values="0.72;0.15;0.72" dur="1.7s" repeatCount="indefinite"/></circle>
      <circle cx="266" cy="358" r="1.8" fill="#bf7fff" opacity="0.65"><animate attributeName="opacity" values="0.65;0.12;0.65" dur="2.2s" repeatCount="indefinite"/></circle>
      <circle cx="74" cy="185" r="1.5" fill="#9b59b6" opacity="0.55"><animate attributeName="opacity" values="0.55;0.1;0.55" dur="2.8s" repeatCount="indefinite"/></circle>
      <circle cx="232" cy="165" r="1.8" fill="#fff" opacity="0.5"><animate attributeName="opacity" values="0.5;0.1;0.5" dur="3.1s" repeatCount="indefinite"/></circle>
      <circle cx="150" cy="248" r="90" fill="none" stroke="#9b59b6" stroke-width="0.6" opacity="0.18"/>
      <circle cx="150" cy="248" r="110" fill="none" stroke="#7f00ff" stroke-width="0.4" opacity="0.1"/>
      <circle cx="240" cy="248" r="3.5" fill="#f1c40f" opacity="0.82">
        <animateTransform attributeName="transform" type="rotate" values="0 150 248;360 150 248" dur="7s" repeatCount="indefinite"/>
      </circle>
      <circle cx="60" cy="248" r="2.5" fill="#bf7fff" opacity="0.72">
        <animateTransform attributeName="transform" type="rotate" values="180 150 248;540 150 248" dur="5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="150" cy="158" r="2.2" fill="#9b59b6" opacity="0.62">
        <animateTransform attributeName="transform" type="rotate" values="90 150 248;450 150 248" dur="9s" repeatCount="indefinite"/>
      </circle>
    `
  },
]

export const useCharacterStore = defineStore('character', () => {
  const composedSVG = computed(() => {
    const userStore = useUserStore()
    const tier = userStore.characterTier
    const equipped = userStore.user.equipped ?? {}
    const get = (slot) => ACCESSORIES.find(a => a.id === equipped[slot])
    return [
      get('back')?.svg   ?? '',
      tier.svg,
      get('head')?.svg   ?? '',
      get('weapon')?.svg ?? '',
      get('effect')?.svg ?? '',
    ].join('\n')
  })

  function equipItem(id) {
    const userStore = useUserStore()
    const acc = ACCESSORIES.find(a => a.id === id)
    if (!acc || !(userStore.user.inventory ?? []).includes(id)) return
    if (!userStore.user.equipped) userStore.user.equipped = {}
    userStore.user.equipped[acc.slot] = id
    userStore.saveToStorage()
  }

  function unequipSlot(slot) {
    const userStore = useUserStore()
    if (!userStore.user.equipped) return
    userStore.user.equipped[slot] = null
    userStore.saveToStorage()
  }

  return { ACCESSORIES, composedSVG, equipItem, unequipSlot }
})
