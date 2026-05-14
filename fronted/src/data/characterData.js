// ─── Tier-specific customization defaults ───────────────────────────────────
export const tierDefaults = {
  latente: {
    cloakColor: '#1a1a1a',
    hoodColor:  '#161616',
    eyeColor:   '#3e2410',
    skinTone:   '#b07558'
  },
  cazador: {
    eyeColor:    '#1a6b38',
    armorColor:  '#4a3018',
    accentColor: '#27ae60',
    cloakColor:  '#1a3a22'
  },
  superviviente: {
    armorColor:  '#2471a3',
    visorGlow:   '#5dade2',
    accentColor: '#b7950b',
    runeColor:   '#5dade2'
  },
  ceniza: {
    visorGlow:   '#c0392b',
    accentColor: '#f1c40f',
    gemColor:    '#c0392b',
    emberColor:  '#f1c40f'
  },
  latente_f: {
    cloakColor: '#1e1020',
    hoodColor:  '#180c1c',
    eyeColor:   '#7b2d8b',
    skinTone:   '#c49070'
  },
  cazador_f: {
    eyeColor:    '#1a6b50',
    armorColor:  '#3a1830',
    accentColor: '#27ae60',
    cloakColor:  '#1a2e30'
  },
  superviviente_f: {
    armorColor:  '#1a3a5c',
    visorGlow:   '#a8d8f0',
    accentColor: '#d4af37',
    runeColor:   '#a8d8f0'
  },
  ceniza_f: {
    visorGlow:   '#c0392b',
    accentColor: '#e8c97a',
    gemColor:    '#9b2c7a',
    emberColor:  '#f1c40f'
  }
}

export const defaultCustomization = {
  latente:         { ...tierDefaults.latente },
  cazador:         { ...tierDefaults.cazador },
  superviviente:   { ...tierDefaults.superviviente },
  ceniza:          { ...tierDefaults.ceniza },
  latente_f:       { ...tierDefaults.latente_f },
  cazador_f:       { ...tierDefaults.cazador_f },
  superviviente_f: { ...tierDefaults.superviviente_f },
  ceniza_f:        { ...tierDefaults.ceniza_f }
}

// ─── Editor fields per tier ──────────────────────────────────────────────────
// Only the primary field is shown — it drives the CSS hue-rotate filter on the image.
export const tierFields = {
  latente:         [{ key: 'cloakColor',  label: 'Color del personaje', hint: 'Tono general de la imagen' }],
  cazador:         [{ key: 'armorColor',  label: 'Color del personaje', hint: 'Tono general de la imagen' }],
  superviviente:   [{ key: 'armorColor',  label: 'Color del personaje', hint: 'Tono general de la imagen' }],
  ceniza:          [{ key: 'accentColor', label: 'Color del personaje', hint: 'Tono general de la imagen' }],
  latente_f:       [{ key: 'cloakColor',  label: 'Color del personaje', hint: 'Tono general de la imagen' }],
  cazador_f:       [{ key: 'armorColor',  label: 'Color del personaje', hint: 'Tono general de la imagen' }],
  superviviente_f: [{ key: 'armorColor',  label: 'Color del personaje', hint: 'Tono general de la imagen' }],
  ceniza_f:        [{ key: 'accentColor', label: 'Color del personaje', hint: 'Tono general de la imagen' }],
}

// ─── Style presets (apply to current tier) ───────────────────────────────────
export const baseVariants = [
  {
    key: 'shadow', name: 'Sombra', desc: 'Oscuro y sigiloso',
    presets: {
      latente:         { cloakColor: '#1a1a1a', hoodColor: '#161616', eyeColor: '#3e2410', skinTone: '#b07558' },
      cazador:         { eyeColor: '#1a6b38',   armorColor: '#4a3018', accentColor: '#27ae60', cloakColor: '#1a3a22' },
      superviviente:   { armorColor: '#2471a3', visorGlow: '#5dade2',  accentColor: '#b7950b', runeColor: '#5dade2' },
      ceniza:          { visorGlow: '#c0392b',  accentColor: '#f1c40f', gemColor: '#c0392b',   emberColor: '#f1c40f' },
      latente_f:       { cloakColor: '#1e1020', hoodColor: '#180c1c', eyeColor: '#7b2d8b', skinTone: '#c49070' },
      cazador_f:       { eyeColor: '#1a6b50',   armorColor: '#3a1830', accentColor: '#27ae60', cloakColor: '#1a2e30' },
      superviviente_f: { armorColor: '#1a3a5c', visorGlow: '#a8d8f0',  accentColor: '#d4af37', runeColor: '#a8d8f0' },
      ceniza_f:        { visorGlow: '#c0392b',  accentColor: '#e8c97a', gemColor: '#9b2c7a',   emberColor: '#f1c40f' }
    }
  },
  {
    key: 'ember', name: 'Ígneo', desc: 'Fuego y ardor',
    presets: {
      latente:         { cloakColor: '#1f0d00', hoodColor: '#120800', eyeColor: '#c0392b', skinTone: '#c08060' },
      cazador:         { eyeColor: '#c0392b',   armorColor: '#7a2d00', accentColor: '#e74c3c', cloakColor: '#4a1800' },
      superviviente:   { armorColor: '#7b241c', visorGlow: '#e74c3c',  accentColor: '#f39c12', runeColor: '#e74c3c' },
      ceniza:          { visorGlow: '#ff6b35',  accentColor: '#e67e22', gemColor: '#e74c3c',   emberColor: '#e67e22' },
      latente_f:       { cloakColor: '#1f0d00', hoodColor: '#120800', eyeColor: '#c0392b',   skinTone: '#c08060' },
      cazador_f:       { eyeColor: '#c0392b',   armorColor: '#5a1a00', accentColor: '#e74c3c', cloakColor: '#3a0e00' },
      superviviente_f: { armorColor: '#7b241c', visorGlow: '#e74c3c',  accentColor: '#f39c12', runeColor: '#e74c3c' },
      ceniza_f:        { visorGlow: '#ff6b35',  accentColor: '#e67e22', gemColor: '#c0392b',   emberColor: '#e67e22' }
    }
  },
  {
    key: 'astral', name: 'Astral', desc: 'Energía cósmica',
    presets: {
      latente:         { cloakColor: '#1a0d2e', hoodColor: '#110820', eyeColor: '#9b59b6', skinTone: '#b8a8d0' },
      cazador:         { eyeColor: '#8e44ad',   armorColor: '#2d1848', accentColor: '#9b59b6', cloakColor: '#1a0d36' },
      superviviente:   { armorColor: '#5b2c8d', visorGlow: '#d7bde2',  accentColor: '#9b59b6', runeColor: '#d7bde2' },
      ceniza:          { visorGlow: '#d7bde2',  accentColor: '#9b59b6', gemColor: '#8e44ad',   emberColor: '#d7bde2' },
      latente_f:       { cloakColor: '#1a0d2e', hoodColor: '#110820', eyeColor: '#9b59b6',   skinTone: '#b8a8d0' },
      cazador_f:       { eyeColor: '#8e44ad',   armorColor: '#2d1848', accentColor: '#9b59b6', cloakColor: '#1a0d36' },
      superviviente_f: { armorColor: '#5b2c8d', visorGlow: '#d7bde2',  accentColor: '#9b59b6', runeColor: '#d7bde2' },
      ceniza_f:        { visorGlow: '#d7bde2',  accentColor: '#9b59b6', gemColor: '#8e44ad',   emberColor: '#d7bde2' }
    }
  }
]

// ─── Integrated accessory fragments (per-tier where needed) ─────────────────
const _acc = {
  voidCape: {
    latente: `
      <path d="M84 162 Q56 230 52 338 Q50 388 68 452 Q90 474 120 476 Q150 478 180 476 Q210 474 232 452 Q250 388 248 338 Q244 230 216 162Z" fill="#0f1220" stroke="#34495e" stroke-width="2"/>
      <path d="M84 162 Q90 225 92 330 Q94 380 100 450" fill="none" stroke="#5d6d7e" stroke-width="2" opacity="0.6"/>
      <path d="M216 162 Q210 225 208 330 Q206 380 200 450" fill="none" stroke="#5d6d7e" stroke-width="2" opacity="0.6"/>
      <path d="M150 165 Q152 225 152 330 Q152 390 149 452" fill="none" stroke="#1a2035" stroke-width="5" opacity="0.5"/>`,
    cazador: `
      <path d="M84 162 Q56 230 52 338 Q50 388 68 452 Q90 474 120 476 Q150 478 180 476 Q210 474 232 452 Q250 388 248 338 Q244 230 216 162Z" fill="#0f1220" stroke="#34495e" stroke-width="2"/>
      <path d="M84 162 Q90 225 92 330 Q94 380 100 450" fill="none" stroke="#5d6d7e" stroke-width="2" opacity="0.6"/>
      <path d="M216 162 Q210 225 208 330 Q206 380 200 450" fill="none" stroke="#5d6d7e" stroke-width="2" opacity="0.6"/>`,
    superviviente: `
      <path d="M88 158 Q56 230 52 338 Q50 388 68 455 Q88 478 150 478 Q212 478 232 455 Q250 388 248 338 Q244 230 212 158Z" fill="#0f1220" stroke="#34495e" stroke-width="2"/>
      <path d="M90 162 Q80 228 78 330 Q76 390 84 452" fill="none" stroke="#5d6d7e" stroke-width="2" opacity="0.6"/>
      <path d="M210 162 Q220 228 222 330 Q224 390 216 452" fill="none" stroke="#5d6d7e" stroke-width="2" opacity="0.6"/>`,
    ceniza: `
      <path d="M90 162 Q56 230 52 338 Q50 388 68 452 Q90 474 120 476 Q150 478 180 476 Q210 474 232 452 Q250 388 248 338 Q244 230 210 162Z" fill="#0f1220" stroke="#34495e" stroke-width="2"/>
      <path d="M90 162 Q84 228 82 330 Q80 390 86 452" fill="none" stroke="#5d6d7e" stroke-width="2" opacity="0.6"/>
      <path d="M210 162 Q216 228 218 330 Q220 390 214 452" fill="none" stroke="#5d6d7e" stroke-width="2" opacity="0.6"/>`
  },
  mysticHood: {
    latente: `
      <path d="M93 140 Q80 110 88 88 Q106 56 150 50 Q194 56 212 88 Q220 110 207 140 Q190 118 150 116 Q110 118 93 140Z" fill="#1b1b36" stroke="#7d5aa8" stroke-width="3"/>
      <path d="M108 114 Q126 96 150 96 Q174 96 192 114" fill="none" stroke="#9b59b6" stroke-width="2" opacity="0.8"/>
      <path d="M125 130 Q150 118 175 130" fill="none" stroke="#f8c471" stroke-width="1.5" opacity="0.6"/>
      <path d="M98 148 Q92 124 102 98 Q116 68 150 62 Q184 68 198 98 Q208 124 202 148" fill="#0a0a0a" opacity="0.8"/>`,
    cazador: `
      <path d="M93 152 Q80 120 88 96 Q106 62 150 56 Q194 62 212 96 Q220 122 207 152 Q190 130 150 126 Q110 130 93 152Z" fill="#1b1b36" stroke="#7d5aa8" stroke-width="3"/>
      <path d="M108 126 Q126 108 150 108 Q174 108 192 126" fill="none" stroke="#9b59b6" stroke-width="2" opacity="0.8"/>
      <path d="M125 142 Q150 130 175 142" fill="none" stroke="#f8c471" stroke-width="1.5" opacity="0.6"/>
      <path d="M100 150 Q94 128 104 104 Q118 74 150 68 Q182 74 196 104 Q206 130 200 150" fill="#0a0a0a" opacity="0.7"/>`
  },
  emberCrown: {
    latente: `
      <path d="M118 50 Q132 26 150 22 Q168 26 182 50 Q196 72 210 82 Q205 76 180 72 Q168 60 150 58 Q132 60 120 72 Q94 76 90 82 Q104 72 118 50Z" fill="#f39c12" stroke="#d35400" stroke-width="2"/>
      <path d="M146 24 L150 10 L154 24" fill="#f7dc6f" stroke="#d35400" stroke-width="1"/>`,
    cazador: `
      <path d="M118 56 Q132 32 150 28 Q168 32 182 56 Q196 78 210 88 Q205 82 180 78 Q168 66 150 64 Q132 66 120 78 Q94 82 90 88 Q104 78 118 56Z" fill="#f39c12" stroke="#d35400" stroke-width="2"/>
      <path d="M146 30 L150 16 L154 30" fill="#f7dc6f" stroke="#d35400" stroke-width="1"/>`,
    superviviente: `
      <path d="M118 46 Q132 22 150 18 Q168 22 182 46 Q196 68 210 78 Q205 72 180 68 Q168 56 150 54 Q132 56 120 68 Q94 72 90 78 Q104 68 118 46Z" fill="#f39c12" stroke="#d35400" stroke-width="2" opacity="0.9"/>
      <path d="M146 20 L150 6 L154 20" fill="#f7dc6f" stroke="#d35400" stroke-width="1"/>`
    // ceniza: skip (has its own crown)
  },
  shadowShoulder: `
    <path d="M64 176 Q52 188 58 208 Q82 220 98 218 Q80 202 64 176Z" fill="#111" stroke="#2c3e50" stroke-width="2"/>
    <path d="M236 176 Q248 188 242 208 Q218 220 202 218 Q220 202 236 176Z" fill="#111" stroke="#2c3e50" stroke-width="2"/>
    <path d="M70 190 C82 202 96 210 110 212" fill="none" stroke="#34495e" stroke-width="2" opacity="0.7"/>
    <path d="M230 190 C218 202 204 210 190 212" fill="none" stroke="#34495e" stroke-width="2" opacity="0.7"/>`,
  astralAmulet: `
    <line x1="130" y1="168" x2="150" y2="210" stroke="#2c3e50" stroke-width="2" opacity="0.8"/>
    <line x1="170" y1="168" x2="150" y2="210" stroke="#2c3e50" stroke-width="2" opacity="0.8"/>
    <circle cx="150" cy="226" r="16" fill="#5dade2" stroke="#2980b9" stroke-width="2" opacity="0.95"/>
    <path d="M150 210 L150 238" fill="none" stroke="#ebf5fb" stroke-width="1.8"/>
    <path d="M138 222 L150 204 L162 222" fill="none" stroke="#ebf5fb" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="150" y1="242" x2="150" y2="262" stroke="#2c3e50" stroke-width="2"/>`
}

// ─── SVG builder functions ────────────────────────────────────────────────
export const tierSVGBuilders = {
  latente:         () => `<image href="/characters/latente_m.png"         x="0" y="0" width="300" height="500"/>`,
  cazador:         () => `<image href="/characters/cazador_m.png"         x="0" y="0" width="300" height="500"/>`,
  superviviente:   () => `<image href="/characters/superviviente_m.png"   x="0" y="0" width="300" height="500"/>`,
  ceniza:          () => `<image href="/characters/ceniza_m.png"          x="0" y="0" width="300" height="500"/>`,
  latente_f:       () => `<image href="/characters/latente_f.png"         x="0" y="0" width="300" height="500"/>`,
  cazador_f:       () => `<image href="/characters/cazador_f.png"         x="0" y="0" width="300" height="500"/>`,
  superviviente_f: () => `<image href="/characters/superviviente_f.png"   x="0" y="0" width="300" height="500"/>`,
  ceniza_f:        () => `<image href="/characters/ceniza_f.png"          x="0" y="0" width="300" height="500"/>`,
}

// ─── Background catalog (epic backgrounds representing achievements) ─────────────────────────────────────────────────
export const backgroundCatalog = [
  {
    key: 'castle-flames', name: 'Castillo en Llamas', desc: 'Un castillo ardiente simbolizando victorias épicas.', cost: 500,
    svg: `<defs><linearGradient id="flameGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#3b0f10;stop-opacity:1"/><stop offset="40%" style="stop-color:#921c0f;stop-opacity:1"/><stop offset="100%" style="stop-color:#2b0200;stop-opacity:1"/></linearGradient><radialGradient id="emberGlow" cx="50%" cy="35%" r="65%"><stop offset="0%" style="stop-color:#f9d76f;stop-opacity:0.6"/><stop offset="100%" style="stop-color:#e74c3c;stop-opacity:0"/></radialGradient><radialGradient id="smokeGlow" cx="40%" cy="20%" r="30%"><stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.22"/><stop offset="100%" style="stop-color:#000000;stop-opacity:0"/></radialGradient></defs>
          <rect width="1920" height="1080" fill="url(#flameGrad)"/>
          <path d="M0 780 C420 700 760 820 1120 760 C1480 700 1920 840 1920 1080 L0 1080Z" fill="#3c110f" opacity="0.96"/>
          <path d="M120 820 L260 620 L390 780 L420 690 L540 840 L640 650 L740 820 L880 630 L980 840 L1060 710 L1160 860 L1210 760" stroke="#4b1e13" stroke-width="60" fill="none" opacity="0.45"/>
          <path d="M384 840 L384 620 L520 620 L520 840Z" fill="#2f1c10"/>
          <path d="M520 760 L520 620 L636 620 L636 760Z" fill="#2f1c10"/>
          <path d="M1164 820 L1164 620 L1288 620 L1288 820Z" fill="#2f1c10"/>
          <path d="M1288 760 L1288 620 L1420 620 L1420 760Z" fill="#2f1c10"/>
          <path d="M384 620 L440 560 L516 620 Z" fill="#472a1f"/>
          <path d="M1164 620 L1220 560 L1296 620 Z" fill="#472a1f"/>
          <path d="M450 680 C470 640 520 620 540 680 C560 740 510 760 490 720 Z" fill="#d35400" opacity="0.9"/>
          <path d="M1230 700 C1250 660 1300 640 1320 700 C1340 760 1290 780 1270 740 Z" fill="#e67e22" opacity="0.92"/>
          <ellipse cx="1200" cy="220" rx="240" ry="180" fill="#f1c40f" opacity="0.08"/>
          <circle cx="720" cy="180" r="108" fill="#f39c12" opacity="0.18"/>
          <circle cx="1700" cy="260" r="72" fill="#f7c548" opacity="0.12"/>
          <circle cx="1600" cy="940" r="56" fill="#ff8c00" opacity="0.22"/>
          <path d="M140 920 Q240 880 300 940 T420 930 Q510 950 620 910 T740 947 Q840 970 960 930 T1080 940 Q1180 960 1300 930 T1420 930 Q1520 950 1640 920 T1760 940 Q1840 960 1920 930" fill="none" stroke="#f39c12" stroke-width="12" opacity="0.35"/>
          <g opacity="0.85">
            <path d="M880 760 L880 620 L930 620 L930 760Z" fill="#2f1c10"/>
            <path d="M980 780 C1010 740 1060 720 1090 780 C1120 840 1070 860 1040 820 Z" fill="#d35400"/>
            <path d="M940 680 L980 630 L1020 680 L980 700Z" fill="#f7c548" opacity="0.7"/>
          </g>
          <circle cx="760" cy="440" r="320" fill="url(#emberGlow)" opacity="0.45"/>
          <circle cx="1120" cy="520" r="180" fill="url(#emberGlow)" opacity="0.25"/>
          <path d="M480 540 C510 530 570 520 620 560 C670 600 730 590 760 540" fill="none" stroke="#ffb347" stroke-width="16" opacity="0.16"/>
          <path d="M1540 500 C1560 470 1600 450 1630 500 C1660 555 1620 590 1590 560 Z" fill="#f1c40f" opacity="0.18"/>
          <path d="M480 260 C520 240 560 230 600 260 C640 290 620 310 580 300 Z" fill="url(#smokeGlow)"/>
          <path d="M1300 240 C1340 220 1380 210 1420 240 C1460 270 1440 290 1400 280 Z" fill="url(#smokeGlow)"/>
          <circle cx="420" cy="520" r="22" fill="#ffb347" opacity="0.7"/><circle cx="650" cy="420" r="18" fill="#ffb347" opacity="0.5"/><circle cx="920" cy="380" r="14" fill="#f7e3a4" opacity="0.4"/>`
  },
  {
    key: 'enchanted-forest', name: 'Bosque Encantado', desc: 'Un bosque místico lleno de magia antigua.', cost: 450,
    svg: `<defs><radialGradient id="forestGrad" cx="50%" cy="20%" r="90%"><stop offset="0%" style="stop-color:#2fcf87;stop-opacity:0.35"/><stop offset="45%" style="stop-color:#16432a;stop-opacity:0.96"/><stop offset="100%" style="stop-color:#061f14;stop-opacity:1"/></radialGradient><radialGradient id="mysticGlow" cx="30%" cy="35%" r="35%"><stop offset="0%" style="stop-color:#8ef2c9;stop-opacity:0.9"/><stop offset="100%" style="stop-color:#0f3d1f;stop-opacity:0"/></radialGradient><filter id="softFog"><feGaussianBlur stdDeviation="18" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
          <rect width="1920" height="1080" fill="url(#forestGrad)"/>
          <path d="M0 790 C320 720 520 860 760 820 C980 780 1220 900 1500 840 C1720 790 1920 860 1920 1080 L0 1080Z" fill="#0b2819"/>
          <path d="M0 760 C240 700 520 730 840 700 C1140 670 1360 780 1600 740 C1800 710 1920 760 1920 1080 L0 1080Z" fill="#133424" opacity="0.8"/>
          <path d="M1120 160 C1060 200 1040 280 1060 340 C1080 400 1140 440 1180 500 C1220 560 1240 620 1260 720 C1280 820 1320 900 1380 920 C1440 940 1500 930 1560 900 C1620 870 1680 780 1700 720 C1720 660 1700 560 1640 520 C1580 480 1500 460 1440 420 C1380 380 1340 300 1320 220 C1300 140 1240 90 1180 100 C1120 110 1140 120 1120 160Z" fill="#153a25" opacity="0.95"/>
          <path d="M280 120 C220 160 190 230 210 300 C230 370 310 420 360 500 C410 580 430 650 460 740 C490 830 530 870 580 900 C640 930 700 930 760 900 C820 870 860 820 890 760 C920 700 930 620 920 560 C910 500 880 440 840 390 C800 340 760 280 740 220 C720 160 680 110 620 100 C560 90 520 120 480 140 C440 160 380 120 280 120Z" fill="#1f4e2f" opacity="0.94"/>
          <path d="M1600 140 C1540 190 1520 260 1540 330 C1560 400 1620 460 1670 520 C1720 580 1750 640 1770 720 C1790 800 1810 860 1840 900 C1880 940 1920 960 1920 1080 L1600 1080Z" fill="#1b462d" opacity="0.93"/>
          <path d="M1880 460 C1830 420 1780 430 1740 470 C1700 510 1690 570 1700 620 C1710 670 1730 720 1760 760" stroke="#2ca36f" stroke-width="26" fill="none" opacity="0.55"/>
          <path d="M112 760 C220 700 300 690 430 720 C560 750 720 760 860 730 C1000 700 1140 720 1260 740 C1380 760 1520 750 1660 730 C1800 710 1900 705 1920 712" stroke="#3bbc87" stroke-width="14" opacity="0.35"/>
          <path d="M1240 260 Q1160 330 1180 420 Q1200 510 1260 540 Q1320 570 1390 520 Q1460 470 1440 380 Q1420 290 1340 250 Q1260 210 1240 260Z" fill="#29b06f" opacity="0.85"/>
          <path d="M520 240 Q470 320 480 410 Q490 500 540 560 Q590 620 650 590 Q710 560 760 500 Q790 460 820 390 Q830 320 790 260 Q740 200 680 210 Q620 220 520 240Z" fill="#36c880" opacity="0.75"/>
          <path d="M400 540 Q380 570 380 610 Q380 650 410 700 Q440 750 480 760 Q520 770 560 740 Q600 710 580 660 Q560 610 520 580 Q480 550 440 530Z" fill="#4fbf91" opacity="0.5"/>
          <g opacity="0.72">
            <path d="M200 820 C240 780 280 760 320 740 C360 720 400 710 440 700" stroke="#a7ffce" stroke-width="42" fill="none" opacity="0.16"/>
            <path d="M1460 820 C1500 780 1540 760 1580 740" stroke="#a7ffce" stroke-width="32" fill="none" opacity="0.14"/>
          </g>
          <circle cx="380" cy="280" r="15" fill="#5ef0d1" opacity="0.84"/><circle cx="560" cy="320" r="12" fill="#5ef0d1" opacity="0.78"/><circle cx="820" cy="390" r="17" fill="#5ef0d1" opacity="0.92"/><circle cx="1220" cy="470" r="20" fill="#9ff9d8" opacity="0.68"/><circle cx="1550" cy="320" r="16" fill="#9ff9d8" opacity="0.72"/><circle cx="1720" cy="190" r="22" fill="#8cf2c0" opacity="0.64"/>
          <circle cx="920" cy="180" r="140" fill="url(#mysticGlow)" opacity="0.42"/>
          <circle cx="1470" cy="560" r="90" fill="url(#mysticGlow)" opacity="0.32"/>
          <path d="M1160 520 Q1180 480 1200 520 Q1220 560 1240 520 Q1260 480 1280 520" fill="none" stroke="#76f9c0" stroke-width="8" opacity="0.6"/>
          <path d="M520 630 Q540 600 560 620 Q580 640 600 620 Q620 600 640 620" fill="none" stroke="#76f9c0" stroke-width="6" opacity="0.5"/>
          <path d="M860 980 C900 920 940 900 980 920 C1020 940 1060 980 1100 940 C1140 900 1180 910 1210 950" stroke="#0d2617" stroke-width="34" fill="none" opacity="0.6"/>`
  },
  {
    key: 'cyber-city', name: 'Ciudad Cibernética', desc: 'Una metrópolis futurista de neón y tecnología.', cost: 600,
    svg: `<defs><linearGradient id="cyberGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#02091d;stop-opacity:1"/><stop offset="40%" style="stop-color:#0f1f48;stop-opacity:1"/><stop offset="100%" style="stop-color:#02030b;stop-opacity:1"/></linearGradient><linearGradient id="neonBlue" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:#4fd8ff;stop-opacity:1"/><stop offset="100%" style="stop-color:#0f78ff;stop-opacity:1"/></linearGradient><linearGradient id="neonPurple" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:#a76bff;stop-opacity:1"/><stop offset="100%" style="stop-color:#5b2dff;stop-opacity:1"/></linearGradient></defs>
          <rect width="1920" height="1080" fill="url(#cyberGrad)"/>
          <path d="M0 760 L0 1080 L1920 1080 L1920 760 C1620 700 1320 760 1020 700 C720 640 380 720 0 760Z" fill="#04132b" opacity="0.96"/>
          <rect x="120" y="420" width="120" height="520" rx="24" fill="#101c3b"/>
          <rect x="260" y="340" width="90" height="600" rx="22" fill="#101c3b"/>
          <rect x="420" y="300" width="110" height="640" rx="24" fill="#101c3b"/>
          <rect x="620" y="360" width="92" height="580" rx="20" fill="#101c3b"/>
          <rect x="830" y="320" width="140" height="620" rx="28" fill="#101c3b"/>
          <rect x="1050" y="370" width="100" height="570" rx="22" fill="#101c3b"/>
          <rect x="1270" y="330" width="118" height="610" rx="26" fill="#101c3b"/>
          <rect x="1510" y="300" width="142" height="660" rx="28" fill="#101c3b"/>
          <rect x="1690" y="360" width="100" height="560" rx="22" fill="#101c3b"/>
          <g opacity="0.85">
            <rect x="140" y="450" width="70" height="24" rx="8" fill="#4fd8ff" opacity="0.28"/>
            <rect x="285" y="380" width="52" height="18" rx="6" fill="#a76bff" opacity="0.28"/>
            <rect x="450" y="490" width="88" height="28" rx="10" fill="#4fd8ff" opacity="0.25"/>
            <rect x="860" y="360" width="120" height="32" rx="12" fill="#a76bff" opacity="0.28"/>
            <rect x="1288" y="420" width="96" height="24" rx="10" fill="#4fd8ff" opacity="0.26"/>
            <rect x="1560" y="340" width="118" height="26" rx="10" fill="#a76bff" opacity="0.32"/>
          </g>
          <path d="M120 520 L222 520 M260 460 L350 460 M420 390 L490 390 M620 520 L690 520 M830 470 L910 470 M1050 510 L1130 510 M1270 440 L1360 440 M1510 500 L1590 500" stroke="#0ff" stroke-width="8" opacity="0.42" stroke-linecap="round"/>
          <path d="M1500 210 Q1540 140 1580 210 Q1620 280 1660 210" fill="none" stroke="#a76bff" stroke-width="16" opacity="0.55"/>
          <path d="M1400 240 Q1500 160 1600 240" fill="none" stroke="#4fd8ff" stroke-width="10" opacity="0.62"/>
          <path d="M800 180 L900 140 L940 190 L860 210 Z" fill="#4fd8ff" opacity="0.22"/>
          <path d="M350 180 L420 130 L470 200 L400 230 Z" fill="#a76bff" opacity="0.22"/>
          <path d="M980 760 C1040 700 1100 700 1160 760" stroke="#4fd8ff" stroke-width="28" fill="none" opacity="0.18"/>
          <path d="M1020 760 C1080 720 1140 720 1200 760" stroke="#a76bff" stroke-width="28" fill="none" opacity="0.16"/>
          <path d="M0 820 C260 760 520 820 780 760 C1040 700 1280 780 1520 740 C1760 700 1920 740" stroke="#0e4d7d" stroke-width="20" fill="none" opacity="0.24"/>
          <rect x="140" y="820" width="1520" height="20" fill="#0f2f56" opacity="0.78"/>
          <g stroke="#0ff" stroke-width="4" opacity="0.32">
            <path d="M160 880 L1760 880"/>
            <path d="M180 840 L1780 840"/>
            <path d="M200 900 L1760 900"/>
          </g>
          <circle cx="320" cy="760" r="22" fill="#4fd8ff" opacity="0.9"/><circle cx="520" cy="760" r="18" fill="#a76bff" opacity="0.8"/><circle cx="860" cy="720" r="24" fill="#4fd8ff" opacity="0.85"/><circle cx="1200" cy="760" r="20" fill="#a76bff" opacity="0.78"/><circle cx="1560" cy="720" r="18" fill="#4fd8ff" opacity="0.82"/>`
  },
  {
    key: 'dimensional-portal', name: 'Portal Dimensional', desc: 'Un vórtice cósmico a otros mundos.', cost: 700,
    svg: `<defs><radialGradient id="portalGrad" cx="50%" cy="50%" r="80%"><stop offset="0%" style="stop-color:#1d0b2d;stop-opacity:1"/><stop offset="40%" style="stop-color:#2c196f;stop-opacity:1"/><stop offset="100%" style="stop-color:#090a14;stop-opacity:1"/></radialGradient><radialGradient id="portalGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" style="stop-color:#a274ff;stop-opacity:0.95"/><stop offset="100%" style="stop-color:#16c6ff;stop-opacity:0.02"/></radialGradient><filter id="sparkleBlur"><feGaussianBlur stdDeviation="8" result="soft"/><feMerge><feMergeNode in="soft"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
          <rect width="1920" height="1080" fill="url(#portalGrad)"/>
          <g opacity="0.55">
            <circle cx="960" cy="540" r="520" fill="#1b0a29"/>
            <circle cx="960" cy="540" r="420" fill="#260f4f"/>
            <circle cx="960" cy="540" r="340" fill="#311e72"/>
          </g>
          <path d="M960 120 C660 180 600 300 720 460 C840 620 1080 760 1320 660 C1560 560 1560 360 1320 260 C1140 180 980 120 960 120Z" fill="#4523a7" opacity="0.12"/>
          <path d="M960 180 C740 240 720 360 820 510 C920 660 1080 780 1280 650 C1480 520 1480 360 1280 260 C1080 160 980 160 960 180Z" fill="#5d39d5" opacity="0.18"/>
          <circle cx="960" cy="540" r="432" fill="none" stroke="#7d44ff" stroke-width="24" opacity="0.23"/>
          <circle cx="960" cy="540" r="328" fill="none" stroke="#4dd9ff" stroke-width="18" opacity="0.34"/>
          <circle cx="960" cy="540" r="232" fill="none" stroke="#d8b6ff" stroke-width="14" opacity="0.56"/>
          <path d="M960 240 L960 360" stroke="#68d8ff" stroke-width="12" opacity="0.4" stroke-linecap="round"/>
          <path d="M760 320 L880 440" stroke="#d8b6ff" stroke-width="10" opacity="0.3" stroke-linecap="round"/>
          <path d="M1160 320 L1040 440" stroke="#68d8ff" stroke-width="10" opacity="0.3" stroke-linecap="round"/>
          <path d="M960 540 C950 520 950 500 960 480 C970 460 990 450 1010 460 C1030 470 1040 490 1040 510 C1040 530 1030 550 1010 560 C990 570 970 560 960 540Z" fill="#f1c40f" opacity="0.25"/>
          <path d="M820 540 C820 500 840 460 880 450 C920 440 950 460 960 500 C970 540 950 580 910 590 C870 600 840 580 820 540Z" fill="#89d8ff" opacity="0.3"/>
          <path d="M1100 520 C1180 500 1220 460 1240 420 C1260 380 1240 340 1200 320 C1160 300 1120 320 1100 360 C1080 400 1080 460 1100 520Z" fill="#a774ff" opacity="0.23"/>
          <circle cx="960" cy="540" r="120" fill="url(#portalGlow)" opacity="0.82"/>
          <g filter="url(#sparkleBlur)" opacity="0.7">
            <circle cx="960" cy="540" r="58" fill="#ffffff" opacity="0.65"/>
            <circle cx="890" cy="620" r="30" fill="#7be7ff" opacity="0.38"/>
            <circle cx="1040" cy="450" r="24" fill="#c19fff" opacity="0.35"/>
          </g>
          <g stroke="#8ff5ff" stroke-width="6" opacity="0.46">
            <path d="M500 160 C620 120 760 140 840 200" fill="none"/>
            <path d="M1320 180 C1400 230 1460 320 1440 420" fill="none"/>
            <path d="M420 900 C520 760 680 760 760 860" fill="none"/>
          </g>
          <path d="M80 200 L170 180 L210 240 L140 260Z" fill="#9b8cff" opacity="0.28"/>
          <path d="M1780 220 L1890 200 L1910 260 L1810 280Z" fill="#73e3ff" opacity="0.26"/>
          <path d="M860 920 L980 860 L1040 920 L920 980Z" fill="#82ccff" opacity="0.2"/>
          <circle cx="260" cy="200" r="10" fill="#7df0ff" opacity="0.72"/><circle cx="1760" cy="260" r="8" fill="#d7b7ff" opacity="0.72"/><circle cx="1300" cy="120" r="16" fill="#95eeff" opacity="0.68"/>`
  },
  {
    key: 'throne-room', name: 'Sala del Trono', desc: 'Un trono majestuoso para gobernantes legendarios.', cost: 800,
    svg: `<defs><linearGradient id="throneGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#2c1a0b;stop-opacity:1"/><stop offset="45%" style="stop-color:#5f3910;stop-opacity:0.96"/><stop offset="100%" style="stop-color:#080505;stop-opacity:1"/></linearGradient><radialGradient id="throneGlow" cx="50%" cy="30%" r="40%"><stop offset="0%" style="stop-color:#f7e08d;stop-opacity:0.9"/><stop offset="100%" style="stop-color:#f39c12;stop-opacity:0"/></radialGradient></defs>
          <rect width="1920" height="1080" fill="url(#throneGrad)"/>
          <path d="M0 760 C320 720 760 760 960 720 C1160 680 1600 760 1920 720 L1920 1080 L0 1080Z" fill="#1b0f07"/>
          <path d="M280 120 L360 80 L540 120 C640 140 740 220 820 340 C880 430 940 560 960 660 C980 760 1020 860 1060 940 C1100 1020 1240 1080 1280 1080 C1320 1080 1400 970 1440 860 C1480 750 1500 620 1490 520 C1480 420 1450 340 1400 280 C1340 200 1240 160 1120 150 C980 140 820 100 680 110 C540 120 420 150 280 120Z" fill="#0f0905" opacity="0.95"/>
          <path d="M260 140 C400 100 540 90 680 100 C820 110 980 110 1120 140 C1240 165 1340 210 1400 280" fill="none" stroke="#8b5e1c" stroke-width="24" opacity="0.24"/>
          <rect x="580" y="360" width="760" height="520" rx="60" fill="#24180b" stroke="#a67b20" stroke-width="12"/>
          <path d="M760 380 L760 560 L1160 560 L1160 380Z" fill="#22140d" opacity="0.9"/>
          <path d="M760 560 C820 590 980 610 1160 560" fill="#3e2917" opacity="0.88"/>
          <path d="M840 380 L920 260 L1000 380Z" fill="#c89b3f" opacity="0.75"/>
          <path d="M900 260 L960 220 L1020 260 L1120 280 L1120 340 L760 340 L760 280 L860 260Z" fill="#5a3e1a" opacity="0.85"/>
          <path d="M906 400 L906 530 L1014 530 L1014 400Z" fill="#f7e3a6" opacity="0.25"/>
          <path d="M878 430 C900 420 940 418 962 430 C984 442 994 470 982 492 C970 514 940 524 918 514 C896 504 862 460 878 430Z" fill="#ffda6a" opacity="0.46"/>
          <path d="M726 520 C706 560 706 620 726 660 C746 700 794 720 842 700 C890 680 924 640 932 600 C940 560 920 520 876 500 C834 480 760 480 726 520Z" fill="#5f3a12" opacity="0.96"/>
          <path d="M1160 520 C1180 560 1180 620 1160 660 C1140 700 1092 720 1044 700 C996 680 962 640 954 600 C946 560 966 520 1010 500 C1052 480 1126 480 1160 520Z" fill="#5f3a12" opacity="0.96"/>
          <path d="M0 760 L1920 760 L1920 780 L0 780Z" fill="#342012" opacity="0.72"/>
          <g opacity="0.42">
            <path d="M420 820 C540 760 760 740 960 780 C1160 820 1380 780 1540 760 C1700 740 1860 780 1920 790" stroke="#f1c473" stroke-width="28" fill="none"/>
          </g>
          <path d="M780 580 L860 520 L940 580 L860 620Z" fill="#ffd15a" opacity="0.28"/>
          <path d="M840 600 L910 540 L980 600 L910 650Z" fill="#ffe98a" opacity="0.16"/>
          <circle cx="960" cy="320" r="78" fill="url(#throneGlow)" opacity="0.65"/>
          <path d="M840 240 C860 200 900 180 940 190 C980 200 1010 240 1020 290" stroke="#f7e3a6" stroke-width="10" fill="none" opacity="0.4"/>
          <g opacity="0.22">
            <path d="M300 760 L340 660 L380 760 L420 660 L460 760 L500 660" stroke="#d4af5c" stroke-width="14" fill="none"/>
            <path d="M1420 760 L1460 660 L1500 760 L1540 660 L1580 760" stroke="#d4af5c" stroke-width="14" fill="none"/>
          </g>
          <circle cx="820" cy="860" r="12" fill="#ffe9a1" opacity="0.7"/><circle cx="1080" cy="860" r="12" fill="#ffe9a1" opacity="0.68"/><circle cx="980" cy="940" r="18" fill="#f7e3a6" opacity="0.58"/>`
  }
]

export const activityCatalog = [
  {
    key: 'gaming', name: 'Jugar Videojuegos', desc: 'Sumérgete en mundos virtuales y aventuras épicas.', cost: 200,
    icon: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="30" width="40" height="20" rx="5" fill="#34495e"/><circle cx="35" cy="40" r="3" fill="#e74c3c"/><circle cx="45" cy="40" r="3" fill="#27ae60"/><path d="M50 35 L55 30 L60 35" fill="#f39c12"/></svg>`,
    svg: `<g class="gaming-activity" opacity="0.9"><rect x="100" y="380" width="60" height="30" rx="8" fill="#34495e"/><circle cx="115" cy="395" r="4" fill="#e74c3c"/><circle cx="125" cy="395" r="4" fill="#27ae60"/><path d="M130 390 L135 385 L140 390" fill="#f39c12"/><text x="130" y="375" font-size="10" fill="#ecf0f1" text-anchor="middle">🎮</text></g>`
  },
  {
    key: 'reading', name: 'Leer Libros', desc: 'Explora historias fascinantes y conocimientos profundos.', cost: 150,
    icon: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><rect x="25" y="25" width="30" height="40" rx="2" fill="#8e44ad"/><path d="M30 35 L50 35 M30 45 L50 45 M30 55 L45 55" stroke="#f8c471" stroke-width="2"/></svg>`,
    svg: `<g class="reading-activity" opacity="0.9"><rect x="90" y="370" width="45" height="60" rx="3" fill="#8e44ad"/><path d="M95 385 L125 385 M95 400 L125 400 M95 415 L120 415" stroke="#f8c471" stroke-width="3"/><text x="112" y="365" font-size="12" fill="#ecf0f1" text-anchor="middle">📖</text></g>`
  },
  {
    key: 'exercise', name: 'Hacer Ejercicio', desc: 'Mantén tu cuerpo fuerte y saludable con actividad física.', cost: 180,
    icon: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="35" r="15" fill="#27ae60"/><path d="M35 30 L45 30 M40 25 L40 45" stroke="#fff" stroke-width="3"/><circle cx="40" cy="35" r="8" fill="none" stroke="#fff" stroke-width="2"/></svg>`,
    svg: `<g class="exercise-activity" opacity="0.9"><circle cx="150" cy="390" r="20" fill="#27ae60"/><path d="M140 380 L160 380 M150 370 L150 410" stroke="#fff" stroke-width="4"/><circle cx="150" cy="390" r="10" fill="none" stroke="#fff" stroke-width="3"/><text x="150" y="385" font-size="8" fill="#fff" text-anchor="middle">💪</text></g>`
  },
  {
    key: 'painting', name: 'Pintar/Dibujar', desc: 'Exprésate creativamente con colores y formas.', cost: 250,
    icon: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="35" width="20" height="25" fill="#9b59b6"/><path d="M35 40 L45 40 M35 50 L45 50" stroke="#f8c471" stroke-width="2"/><circle cx="40" cy="30" r="5" fill="#e74c3c"/></svg>`,
    svg: `<g class="painting-activity" opacity="0.9"><rect x="80" y="380" width="30" height="40" fill="#9b59b6"/><path d="M85 390 L105 390 M85 405 L105 405" stroke="#f8c471" stroke-width="3"/><circle cx="95" cy="375" r="8" fill="#e74c3c"/><text x="95" y="372" font-size="6" fill="#fff" text-anchor="middle">🎨</text></g>`
  },
  {
    key: 'meditation', name: 'Meditar', desc: 'Encuentra paz interior y claridad mental.', cost: 120,
    icon: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="20" fill="#5dade2" opacity="0.8"/><path d="M30 40 L50 40 M40 30 L40 50" stroke="#fff" stroke-width="3"/><circle cx="40" cy="40" r="8" fill="#85c1e9"/></svg>`,
    svg: `<g class="meditation-activity" opacity="0.9"><circle cx="250" cy="390" r="25" fill="#5dade2"/><path d="M235 390 L265 390 M250 375 L250 405" stroke="#fff" stroke-width="4"/><circle cx="250" cy="390" r="10" fill="#85c1e9"/><text x="250" y="385" font-size="8" fill="#fff" text-anchor="middle">🧘</text></g>`
  }
]

export const CATEGORIES = ['General', 'Salud', 'Trabajo', 'Estudio', 'Fitness']

export const ACHIEVEMENT_DEFS = {
  first_mission: { name: 'Primera Gesta',  abbr: 'PG' },
  missions_10:   { name: 'Veterano',        abbr: 'V'  },
  missions_50:   { name: 'Leyenda',         abbr: 'L'  },
  streak_3:      { name: 'Constante',       abbr: 'C'  },
  streak_7:      { name: 'Imparable',       abbr: 'I'  },
  level_5:       { name: 'Cazador',         abbr: 'C5' },
  level_10:      { name: 'Superviviente',   abbr: 'S10'},
}

