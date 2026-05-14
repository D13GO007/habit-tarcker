const HP_MAX        = 100
const HP_HEAL       = 5
const DAMAGE_NORMAL = 20
const DAMAGE_HARD   = 40

const XP_BY_DIFF = { 'Fácil': 10, 'Medio': 30, 'Difícil': 50 }
const XP_BY_DIFF_WEEKLY = { 'Fácil': 30, 'Medio': 60, 'Difícil': 100 }
const XP_WEEKLY_PARTIAL = 10

const GOLD_BY_DIFF = { 'Fácil': 10, 'Medio': 50, 'Difícil': 100 }
const GOLD_BY_DIFF_WEEKLY = { 'Fácil': 40, 'Medio': 80, 'Difícil': 150 }
const GOLD_WEEKLY_PARTIAL = 5

const HABITS_PAGE_SIZE = 100

const POTIONS = {
  life:   { cost: 150, name: 'Poción de Vida' },
  shield: { cost: 300, name: 'Escudo de Día'  },
}

const ACHIEVEMENT_CHECKS = [
  { key: 'first_mission', test: (m, _s, _l) => m >= 1  },
  { key: 'missions_10',   test: (m, _s, _l) => m >= 10 },
  { key: 'missions_50',   test: (m, _s, _l) => m >= 50 },
  { key: 'streak_3',      test: (_m, s, _l) => s >= 3  },
  { key: 'streak_7',      test: (_m, s, _l) => s >= 7  },
  { key: 'level_5',       test: (_m, _s, l) => l >= 5  },
  { key: 'level_10',      test: (_m, _s, l) => l >= 10 },
]

module.exports = {
  HP_MAX, HP_HEAL, DAMAGE_NORMAL, DAMAGE_HARD,
  XP_BY_DIFF, XP_BY_DIFF_WEEKLY, XP_WEEKLY_PARTIAL,
  GOLD_BY_DIFF, GOLD_BY_DIFF_WEEKLY, GOLD_WEEKLY_PARTIAL,
  HABITS_PAGE_SIZE,
  POTIONS,
  ACHIEVEMENT_CHECKS,
}
