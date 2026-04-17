<template>
  <div class="rpg-viewport">
    <div class="scanlines"></div>

    <div class="rpg-grid">

      <!-- ════════════════════════════════
           PANEL IZQUIERDO — ESTADO
      ════════════════════════════════ -->
      <aside class="panel left-panel">

        <!-- HUD Principal -->
        <div class="glass-card hud">
          <div class="hud-header">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <polygon points="7,1 9,5 13,5.5 10,8.5 10.5,13 7,11 3.5,13 4,8.5 1,5.5 5,5" fill="#f1c40f" stroke="#b7950b" stroke-width="0.5"/>
            </svg>
            <span>ESTADO DE {{ user.name?.toUpperCase() || 'JUGADOR' }}</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <polygon points="7,1 9,5 13,5.5 10,8.5 10.5,13 7,11 3.5,13 4,8.5 1,5.5 5,5" fill="#f1c40f" stroke="#b7950b" stroke-width="0.5"/>
            </svg>
          </div>

          <!-- HP -->
          <div class="bar-group">
            <div class="bar-info">
              <div class="bar-label">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 10.5 C6 10.5 1 7 1 4a2.5 2.5 0 0 1 5-0 2.5 2.5 0 0 1 5 0C11 7 6 10.5 6 10.5Z" fill="#e74c3c" stroke="#c0392b" stroke-width="0.5"/>
                </svg>
                <span>Vitalidad</span>
              </div>
              <span class="bar-val hp-val">{{ user.hp }}<small>/100</small></span>
            </div>
            <div class="bar-outer">
              <div class="bar-inner hp" :style="{ width: user.hp + '%' }">
                <div class="bar-shine"></div>
              </div>
            </div>
          </div>

          <!-- XP -->
          <div class="bar-group">
            <div class="bar-info">
              <div class="bar-label">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="4.5" fill="none" stroke="#f1c40f" stroke-width="1"/>
                  <path d="M6 3v3l2 1.5" stroke="#f1c40f" stroke-width="1" stroke-linecap="round"/>
                </svg>
                <span>Experiencia</span>
              </div>
              <span class="bar-val xp-val">{{ user.xp }}<small>/{{ xpNeeded }}</small></span>
            </div>
            <div class="bar-outer">
              <div class="bar-inner xp" :style="{ width: xpPercentage + '%' }">
                <div class="bar-shine"></div>
              </div>
            </div>
          </div>

          <!-- Stats row -->
          <div class="stats-row">
            <div class="stat-chip">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2 L10 6 L14 6.5 L11 9.5 L11.5 14 L8 12 L4.5 14 L5 9.5 L2 6.5 L6 6Z" fill="#f1c40f" stroke="#b7950b" stroke-width="0.5"/>
              </svg>
              <div class="stat-data">
                <span class="stat-num">{{ user.level }}</span>
                <span class="stat-lbl">NIVEL</span>
              </div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-chip">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="5" fill="none" stroke="#f1c40f" stroke-width="1"/>
                <path d="M5 8.5 C5 8.5 6.5 6 8 8.5 C9.5 11 11 8.5 11 8.5" fill="none" stroke="#f1c40f" stroke-width="1" stroke-linecap="round"/>
                <circle cx="8" cy="5.5" r="1" fill="#f1c40f"/>
              </svg>
              <div class="stat-data">
                <span class="stat-num">{{ user.coins || 0 }}</span>
                <span class="stat-lbl">ORO</span>
              </div>
            </div>
          </div>

          <button @click="logout" class="btn-exit">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M5 2H2v8h3M8 4l3 2-3 2M5 6h6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Abandonar sesión
          </button>
        </div>

        <!-- Mercader -->
        <div class="glass-card shop">
          <div class="section-title">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="6" width="10" height="7" rx="1" fill="none" stroke="#f1c40f" stroke-width="1"/>
              <path d="M4 6V4a3 3 0 0 1 6 0v2" fill="none" stroke="#f1c40f" stroke-width="1" stroke-linecap="round"/>
              <circle cx="7" cy="9" r="1.2" fill="#f1c40f"/>
            </svg>
            MERCADER
          </div>
          <div class="reward-items">
            <div class="item-slot" :class="{ 'cant-afford': user.coins < 150 }">
              <div class="item-icon">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="4" y="8" width="20" height="14" rx="2" fill="#1a1a2e" stroke="#444" stroke-width="1"/>
                  <rect x="7" y="11" width="14" height="8" rx="1" fill="#2980b9" opacity="0.8"/>
                  <rect x="8" y="12" width="12" height="6" rx="0.5" fill="#3498db" opacity="0.6"/>
                  <circle cx="21" cy="18" r="2" fill="#f1c40f"/>
                  <rect x="12" y="6" width="4" height="3" rx="0.5" fill="#555"/>
                </svg>
              </div>
              <div class="item-info">
                <strong>1H GAMING</strong>
                <p>Tiempo de ocio ganado</p>
                <div class="cost-preview" :class="{ 'enough': user.coins >= 150, 'short': user.coins < 150 }">
                  <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="3.5" fill="none" stroke="currentColor" stroke-width="1"/></svg>
                  {{ user.coins >= 150 ? `Quedan ${user.coins - 150} tras compra` : `Faltan ${150 - user.coins} de oro` }}
                </div>
              </div>
              <button @click="buyReward(150, '1H Gaming')" :disabled="user.coins < 150 || buyingItem" class="btn-buy">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <circle cx="5" cy="5" r="3.5" fill="none" stroke="currentColor" stroke-width="1"/>
                  <path d="M3.5 5.5C3.5 5.5 4 6.5 5 6.5C6 6.5 6.5 5.8 6.5 5C6.5 4.2 6 3.5 5 3.5C4.2 3.5 3.8 4 3.8 4" stroke="currentColor" stroke-width="0.8" stroke-linecap="round"/>
                </svg>
                150
              </button>
            </div>
            <div class="item-slot" :class="{ 'cant-afford': user.coins < 500 }">
              <div class="item-icon">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="6" y="10" width="16" height="12" rx="2" fill="#2c1810" stroke="#5d3a1a" stroke-width="1"/>
                  <rect x="8" y="12" width="12" height="8" rx="1" fill="#3d2010" stroke="#5d3a1a" stroke-width="0.5"/>
                  <ellipse cx="12" cy="15" rx="2" ry="1.5" fill="#e67e22" opacity="0.8"/>
                  <ellipse cx="17" cy="14" rx="1.5" ry="1" fill="#27ae60" opacity="0.8"/>
                  <ellipse cx="16" cy="17" rx="2" ry="1.2" fill="#e74c3c" opacity="0.7"/>
                  <rect x="10" y="7" width="8" height="4" rx="1" fill="#5d3a1a" stroke="#3d2010" stroke-width="0.5"/>
                </svg>
              </div>
              <div class="item-info">
                <strong>CHEAT MEAL</strong>
                <p>Comida libre sin culpa</p>
                <div class="cost-preview" :class="{ 'enough': user.coins >= 500, 'short': user.coins < 500 }">
                  <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="3.5" fill="none" stroke="currentColor" stroke-width="1"/></svg>
                  {{ user.coins >= 500 ? `Quedan ${user.coins - 500} tras compra` : `Faltan ${500 - user.coins} de oro` }}
                </div>
              </div>
              <button @click="buyReward(500, 'Cheat Meal')" :disabled="user.coins < 500 || buyingItem" class="btn-buy">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <circle cx="5" cy="5" r="3.5" fill="none" stroke="currentColor" stroke-width="1"/>
                  <path d="M3.5 5.5C3.5 5.5 4 6.5 5 6.5C6 6.5 6.5 5.8 6.5 5C6.5 4.2 6 3.5 5 3.5C4.2 3.5 3.8 4 3.8 4" stroke="currentColor" stroke-width="0.8" stroke-linecap="round"/>
                </svg>
                500
              </button>
            </div>
          </div>
        </div>

      </aside>

      <!-- ════════════════════════════════
           PANEL CENTRAL — PERSONAJE
      ════════════════════════════════ -->
      <main class="panel center-panel">
        <div class="character-display">

          <div class="class-banner">
            <div class="lvl-pill">NV. {{ user.level }}</div>
            <h1 class="class-name">{{ characterTier.name }}</h1>
          </div>

          <div class="character-stage">
            <svg class="hero-svg" :viewBox="'0 0 680 520'" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient :id="'aura-' + user.level" cx="50%" cy="80%" r="50%">
                  <stop offset="0%" :stop-color="characterTier.aura" stop-opacity="0.5"/>
                  <stop offset="100%" stop-color="#000" stop-opacity="0"/>
                </radialGradient>
              </defs>
              <ellipse cx="340" cy="460" rx="180" ry="60" :fill="'url(#aura-' + user.level + ')'"/>
              <g v-html="characterTier.svg"></g>
            </svg>
            <div class="stage-glow" :style="{ background: `radial-gradient(ellipse at 50% 80%, ${characterTier.aura}40 0%, transparent 65%)` }"></div>
          </div>

          <p class="hero-quote">"{{ characterTier.desc }}"</p>
        </div>
      </main>

      <!-- ════════════════════════════════
           PANEL DERECHO — MISIONES
      ════════════════════════════════ -->
      <aside class="panel right-panel">

        <!-- Forjar misión -->
        <div class="glass-card quest-forge">
          <div class="section-title">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 12 L10 4 M8 2 L12 6 M10 4 L12 2 M4 10 L2 12 L4 12 L4 10Z" stroke="#f1c40f" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="11" cy="3" r="1.5" fill="#f1c40f"/>
            </svg>
            FORJAR MISIÓN
          </div>
          
          <!-- Formulario con inputs dinámicos según tipo -->
          <form @submit.prevent="submitForm" class="forge-form">
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" fill="none" stroke="#555" stroke-width="1"/>
                <path d="M7 4v3l2 1" stroke="#555" stroke-width="1" stroke-linecap="round"/>
              </svg>
              <input v-model="newHabit.title" placeholder="¿Cuál es tu próximo reto?" required />
            </div>
            
            <div class="forge-row">
              <div class="select-wrapper">
                <svg width="14" height="14" viewBox="0 0 10 10" fill="none">
                  <path d="M2 4l3 3 3-3" stroke="#888" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <select v-model="newHabit.type">
                  <option value="Diaria">Diaria</option>
                  <option value="Semanal">Semanal</option>
                  <option value="Unica">Única vez</option>
                </select>
              </div>
              <div class="oracle-section">
                <button type="button" @click="openOracle" class="btn-oracle" :disabled="!newHabit.title.trim()">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="1.2"/>
                    <path d="M6 8C6 5.5 7.5 3.5 10 3.5C12.5 3.5 14 5.5 14 8C14 10 12.5 11.5 11.5 12.5C10.8 13.2 10.2 14 10.2 15" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
                    <circle cx="10.5" cy="16" r="1.2" fill="currentColor"/>
                    <path d="M5 5L7 3M15 3L13 5M5 15L7 17M15 17L13 15" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
                  </svg>
                  <div class="oracle-btn-text">
                    <span class="oracle-title">El Oráculo</span>
                    <span class="oracle-desc">Evalúa la dificultad de tu misión</span>
                  </div>
                </button>
                <div v-if="oracleResult" class="oracle-badge" :class="'badge-' + newHabit.difficulty.toLowerCase()">
                  {{ newHabit.difficulty }}
                </div>
              </div>
            </div>

            <!-- Inputs dinámicos según tipo -->
            <div class="dynamic-inputs" v-if="newHabit.type === 'Diaria' || newHabit.type === 'Semanal' || newHabit.type === 'Unica'">
              <div v-if="newHabit.type === 'Diaria'" class="input-group">
                <label>Tiempo diario (min):</label>
                <input type="number" v-model="newHabit.target_time" min="1" class="input-dark" />
              </div>
              <div v-if="newHabit.type === 'Semanal'" class="input-group split">
                <div>
                  <label>Minutos por sesión:</label>
                  <input type="number" v-model="newHabit.target_time" min="1" class="input-dark" />
                </div>
                <div>
                  <label>Días a la semana:</label>
                  <input type="number" v-model="newHabit.target_days" min="1" max="7" class="input-dark" />
                </div>
              </div>
              <div v-if="newHabit.type === 'Unica'" class="input-group split">
                <div>
                  <label>Horas estimadas:</label>
                  <input type="number" v-model="newHabit.target_time" min="1" class="input-dark" />
                </div>
                <div>
                  <label>Fecha límite:</label>
                  <input type="date" v-model="newHabit.deadline" class="input-dark" />
                </div>
              </div>
            </div>

            <div class="forge-actions">
              <button type="submit" class="btn-forge" :disabled="!newHabit.title.trim() || !oracleResult" :title="!oracleResult ? 'Consulta al Oráculo primero' : (isEditing ? 'Guardar cambios' : 'Forjar misión')">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2v10M2 7h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
              </button>
              <button v-if="isEditing" type="button" @click="cancelEdit" class="btn-cancel" title="Cancelar">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
          </form>
        </div>

        <!-- Tablón con pestañas -->
        <div class="quest-board">
          <div class="section-title">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="2" width="10" height="10" rx="1.5" fill="none" stroke="#f1c40f" stroke-width="1"/>
              <path d="M4 5h6M4 7.5h4M4 10h5" stroke="#f1c40f" stroke-width="1" stroke-linecap="round"/>
            </svg>
            TABLÓN DE MISIONES
            <span class="quest-count">{{ displayedHabits.length }}</span>
          </div>

          <!-- Pestañas -->
          <div class="board-tabs">
            <button :class="{ active: activeTab === 'Diaria' }" @click="activeTab = 'Diaria'">DIARIAS</button>
            <button :class="{ active: activeTab === 'Semanal' }" @click="activeTab = 'Semanal'">SEMANALES</button>
            <button :class="{ active: activeTab === 'Unica' }" @click="activeTab = 'Unica'">ÚNICAS</button>
          </div>

          <div v-if="displayedHabits.length === 0" class="no-quests">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" opacity="0.3">
              <rect x="8" y="6" width="24" height="28" rx="3" fill="none" stroke="#888" stroke-width="1.5"/>
              <path d="M13 14h14M13 19h10M13 24h12" stroke="#888" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <p>El tablón está vacío.<br><small>Forja tu primera misión.</small></p>
          </div>

          <div class="quest-scroll">
            <div
              v-for="habit in displayedHabits"
              :key="habit.id"
              class="quest-card"
              :class="{
                'done': habit.completed,
                'diff-easy': habit.difficulty === 'Fácil',
                'diff-med': habit.difficulty === 'Medio',
                'diff-hard': habit.difficulty === 'Difícil'
              }"
            >
              <!-- Indicador dificultad -->
              <div class="diff-bar"></div>

              <div class="quest-body">
                <div class="quest-meta">
                  <!-- Tipo badge -->
                  <span class="type-badge">
                    <svg v-if="habit.type === 'Diaria'" width="9" height="9" viewBox="0 0 9 9" fill="none">
                      <circle cx="4.5" cy="4.5" r="3.5" fill="none" stroke="currentColor" stroke-width="1"/>
                      <path d="M4.5 2.5v2l1.2 1" stroke="currentColor" stroke-width="0.8" stroke-linecap="round"/>
                    </svg>
                    <svg v-else-if="habit.type === 'Semanal'" width="9" height="9" viewBox="0 0 9 9" fill="none">
                      <rect x="1" y="2" width="7" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1"/>
                      <path d="M3 1v2M6 1v2M1 4.5h7" stroke="currentColor" stroke-width="0.8" stroke-linecap="round"/>
                    </svg>
                    <svg v-else width="9" height="9" viewBox="0 0 9 9" fill="none">
                      <polygon points="4.5,1 5.8,3.5 8.5,3.9 6.5,5.8 7,8.5 4.5,7.2 2,8.5 2.5,5.8 0.5,3.9 3.2,3.5" fill="none" stroke="currentColor" stroke-width="0.8"/>
                    </svg>
                    {{ habit.type }}
                  </span>
                  <!-- Streak -->
                  <span v-if="habit.type === 'Diaria' && habit.streak > 0" class="streak-badge">
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                      <path d="M4.5 1C4.5 1 7 3 7 5.5A2.5 2.5 0 0 1 2 5.5C2 4 3 3 3 3C3 3 3.5 4.5 4.5 5C4.5 5 4 3.5 4.5 1Z" fill="#e67e22"/>
                    </svg>
                    {{ habit.streak }}
                  </span>
                  <!-- Progreso semanal -->
                  <span v-if="habit.type === 'Semanal'" class="progress-badge">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="2" width="10" height="9" rx="1" fill="none" stroke="currentColor" stroke-width="1"/><path d="M3 1v2M6 1v2M9 1v2M1 5h10" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>
                    {{ habit.current_days }}/{{ habit.target_days }}
                  </span>
                </div>

                <h4 class="quest-title">{{ habit.title }}</h4>

                <div class="quest-info">
                  <span v-if="habit.type === 'Diaria'">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" stroke-width="1"/><path d="M6 3v3l2 1.5" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>
                    {{ habit.target_time }} min/día
                  </span>
                  <span v-else-if="habit.type === 'Semanal'">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" stroke-width="1"/><path d="M6 3v3l2 1.5" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>
                    {{ habit.target_time }} min
                  </span>
                  <span v-else-if="habit.type === 'Unica'">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" stroke-width="1"/><path d="M6 3v3l2 1.5" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>
                    {{ habit.target_time }}h 
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="2" width="10" height="9" rx="1" fill="none" stroke="currentColor" stroke-width="1"/><path d="M3 1v2M6 1v2M9 1v2M1 5h10" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg>
                    {{ habit.deadline ? new Date(habit.deadline).toLocaleDateString() : 'Sin fecha' }}
                  </span>
                </div>

                <div class="quest-diff-label">{{ habit.difficulty }}</div>
              </div>

              <!-- Controles -->
              <div class="quest-controls" v-if="!habit.completed">
                <button @click="completeHabit(habit.id)" class="btn-action btn-complete" title="Completar">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <button @click="openEdit(habit)" class="btn-action btn-edit" title="Editar">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M10 2l2 2-7 7H3v-2l7-7z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <button @click="failHabit(habit.id)" class="btn-action btn-fail" title="Fallar">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 3v5M7 9.5v1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="7" cy="7" r="5.5" fill="none" stroke="currentColor" stroke-width="1.2"/>
                  </svg>
                </button>
                <button @click="deleteHabit(habit.id)" class="btn-action btn-delete" title="Abandonar">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 4h8M5 4V3h4v1M5.5 6.5v4M8.5 6.5v4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                    <path d="M4 4l.5 7h5l.5-7" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
              <div v-else class="done-stamp">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8l4 4 6-7" stroke="#27ae60" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                CUMPLIDA
              </div>

            </div>
          </div>
        </div>

      </aside>
    </div>



    <!-- Toast de notificación -->
    <transition name="toast">
      <div v-if="toast.visible" class="toast" :class="toast.type">
        <svg v-if="toast.type === 'success'" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6.5" fill="none" stroke="#27ae60" stroke-width="1.2"/>
          <path d="M4.5 8l2.5 2.5 4.5-5" stroke="#27ae60" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-else-if="toast.type === 'damage'" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2l1.5 4.5h4.5l-3.5 2.5 1.5 4.5L8 11l-4 2.5 1.5-4.5L2 6.5h4.5Z" fill="none" stroke="#e74c3c" stroke-width="1.2"/>
        </svg>
        <svg v-else-if="toast.type === 'levelup'" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <polygon points="8,2 10,6 14,6.5 11,9.5 11.5,14 8,12 4.5,14 5,9.5 2,6.5 6,6" fill="#f1c40f" stroke="#b7950b" stroke-width="0.8"/>
        </svg>
        <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6.5" fill="none" stroke="#e74c3c" stroke-width="1.2"/>
          <path d="M8 5v4M8 10.5v1" stroke="#e74c3c" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <span>{{ toast.message }}</span>
      </div>
    </transition>



    <!-- ════════════════════════════════════════════════
         MODAL ORÁCULO — EVALUADOR DE DIFICULTAD
    ════════════════════════════════════════════════ -->
    <transition name="modal">
      <div v-if="oracleModal.open" class="oracle-overlay" @click.self="closeOracle">
        <div class="oracle-container">
          
          <div class="oracle-header">
            <div class="oracle-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" fill="none" stroke="#9b59b6" stroke-width="1.5"/>
                <path d="M10 12C10 9.5 12 7.5 16 7.5C20 7.5 22 9.5 22 12C22 14 20 15.5 18.5 16.5C17.5 17.2 17 18 17 19" stroke="#9b59b6" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="17" cy="22" r="1.5" fill="#9b59b6"/>
                <path d="M8 24L12 20M24 20L28 24M8 8L12 4M24 4L20 8" stroke="#9b59b6" stroke-width="1" stroke-linecap="round"/>
              </svg>
            </div>
            <h2>EL ORÁCULO</h2>
            <p class="oracle-subtitle">Responde y conocerás tu destino</p>
            <button class="oracle-close" @click="closeOracle">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
          </div>

          <div class="oracle-mission">
            <span class="mission-label">MISIÓN</span>
            <span class="mission-title">{{ newHabit.title }}</span>
          </div>

          <div class="oracle-questions">
            <div v-for="(q, qi) in oracleQuestions" :key="qi" class="oracle-question" :class="{ answered: oracleAnswers[qi] !== undefined }">
              <div class="question-header">
                <span class="q-number">{{ qi + 1 }}</span>
                <span class="q-text">{{ q.text }}</span>
              </div>
              <div class="question-options">
                <button v-for="(opt, oi) in q.options" :key="oi" 
                  class="option-btn" 
                  :class="{ selected: oracleAnswers[qi] === oi }"
                  @click="setOracleAnswer(qi, oi)">
                  <span class="opt-marker">{{ ['Ⅰ','Ⅱ','Ⅲ','Ⅳ'][oi] }}</span>
                  {{ opt }}
                </button>
              </div>
            </div>
          </div>

          <div class="oracle-progress">
            <div class="progress-info">
              <span>{{ Object.keys(oracleAnswers).length }} / {{ oracleQuestions.length }} respondidas</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: (Object.keys(oracleAnswers).length / oracleQuestions.length * 100) + '%' }"></div>
            </div>
          </div>

          <button class="oracle-evaluate" 
            :disabled="Object.keys(oracleAnswers).length < oracleQuestions.length || oracleEvaluating"
            @click="evaluateOracle">
            <svg v-if="!oracleEvaluating" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1l2 5h5l-4 3 2 5-5-3-5 3 2-5-4-3h5Z" fill="currentColor"/>
            </svg>
            <span v-if="oracleEvaluating" class="spinner"></span>
            {{ oracleEvaluating ? 'Consultando los astros...' : 'Revelar Destino' }}
          </button>

        </div>
      </div>
    </transition>

    <!-- Dev Console -->
    <div class="dev-console">
      <h4>🛠️ Dev Console</h4>
      <div class="dev-actions">
        <button @click="cheatLevelUp">Nivel +1</button>
        <button @click="cheatLevelDown">Nivel -1</button>
        <button @click="cheatAddGold">Oro +1000</button>
        <button @click="cheatHeal">Curar HP</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref({ hp: 100, xp: 0, level: 1, coins: 0, name: '' })
const habits = ref([])

// --- NUEVAS VARIABLES PARA FASE 2 ---
// Añadimos los tiempos y días por defecto al formulario
const newHabit = ref({ 
  title: '', 
  type: 'Diaria', 
  difficulty: 'Fácil',
  target_time: 30,  // 30 min por defecto
  target_days: 3,   // 3 días a la semana por defecto
  deadline: ''      // Fecha límite vacía por defecto
});

// Pestaña activa del tablón
const activeTab = ref('Diaria');

// Filtramos las misiones según la pestaña que estemos viendo
const displayedHabits = computed(() => {
  return habits.value.filter(habit => habit.type === activeTab.value);
});
// -------------------------------------

// Variables para el modo edición
const isEditing = ref(false);
const editingId = ref(null);

// Función para cargar los datos en el formulario al darle clic en "Editar"
const openEdit = (habit) => {
  isEditing.value = true;
  editingId.value = habit.id;
  
  newHabit.value = {
    title: habit.title,
    type: habit.type,
    difficulty: habit.difficulty,
    target_time: habit.target_time,
    target_days: habit.target_days,
    deadline: habit.deadline ? habit.deadline.split('T')[0] : ''
  };
  
  activeTab.value = habit.type;
  oracleResult.value = true; // Ya tiene dificultad asignada
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Función para cancelar la edición
const cancelEdit = () => {
  isEditing.value = false;
  editingId.value = null;
  newHabit.value = { title: '', type: 'Diaria', difficulty: 'Fácil', target_time: 30, target_days: 3, deadline: '' };
  oracleResult.value = false;
};

// Modifica tu función "submit" del formulario para que decida si crear o editar
const submitForm = async () => {
  try {
    if (isEditing.value) {
      // EDITAR
      await axios.put(`http://localhost:3000/api/habits/${editingId.value}`, newHabit.value);
      showToast('Gesta actualizada correctamente.', 'success');
    } else {
      // CREAR
      await axios.post('http://localhost:3000/api/habits', { ...newHabit.value, user_id: user.value.id });
    }
    cancelEdit();
    await fetchHabits();
  } catch (error) { showToast('Error en la forja de la misión.', 'error'); }
};

const buyingItem = ref(false)

// ── Toast ──────────────────────────────────────────────
const toast = ref({ visible: false, message: '', type: 'success' })
let toastTimer = null
function showToast(message, type = 'success') {
  clearTimeout(toastTimer)
  toast.value = { visible: true, message, type }
  toastTimer = setTimeout(() => { toast.value.visible = false }, 3200)
}

// ══════════════════════════════════════════════════════
// ORÁCULO — EVALUADOR DE DIFICULTAD
// ══════════════════════════════════════════════════════
const oracleModal = ref({ open: false })
const oracleQuestions = ref([
  { text: '¿Con qué frecuencia realizas esta actividad?', options: ['Nunca', 'Lo intenté antes', 'Ocasionalmente', 'Ya es rutina'] },
  { text: '¿Cuánto tiempo requiere cada vez?', options: ['<15 min', '15-45 min', '45 min-2h', '>2 horas'] },
  { text: '¿Qué nivel de esfuerzo implica?', options: ['Muy bajo', 'Moderado', 'Alto', 'Extremo'] },
  { text: '¿Requiere preparación especial?', options: ['No', 'Mínima', 'Planificación', 'Factores externos'] },
  { text: '¿Cuánta voluntad necesitas?', options: ['Poca', 'Moderada', 'Bastante', 'Mucha'] }
])
const oracleAnswers = ref({})
const oracleEvaluating = ref(false)
const oracleResult = ref(false)

function openOracle() {
  if (!newHabit.value.title.trim()) return
  oracleModal.value.open = true
  oracleAnswers.value = {}
  oracleEvaluating.value = false
  oracleResult.value = false
}
function closeOracle() { oracleModal.value.open = false }
function setOracleAnswer(qi, oi) { oracleAnswers.value[qi] = oi }

function evaluateOracle() {
  oracleEvaluating.value = true
  setTimeout(() => {
    const score = Object.values(oracleAnswers.value).reduce((s, v) => s + v, 0)
    const maxScore = oracleQuestions.value.length * 3
    const ratio = score / maxScore
    newHabit.value.difficulty = ratio < 0.33 ? 'Fácil' : ratio < 0.66 ? 'Medio' : 'Difícil'
    oracleResult.value = true
    oracleEvaluating.value = false
    closeOracle()
  }, 1500)
}

// ── Lifecycle ──────────────────────────────────────────
onMounted(async () => {
  const storedUser = localStorage.getItem('user')
  if (!storedUser) { router.push('/login'); return }
  user.value = JSON.parse(storedUser)
  await fetchHabits()
})

// ── Computed ───────────────────────────────────────────
const xpNeeded = computed(() => (user.value.level || 1) * 100)
const xpPercentage = computed(() => Math.min((user.value.xp / xpNeeded.value) * 100, 100))

// ══════════════════════════════════════════════════════
// MODAL IA — ORÁCULO DE MISIONES
// ══════════════════════════════════════════════════════
// (Eliminado: función duplicada submitForm)
// ── Character Tier ─────────────────────────────────────
const characterTier = computed(() => {
  const lvl = user.value.level || 1

  if (lvl < 5) {
    return {
      name: 'Latente', desc: 'Un alma desnuda frente al destino.', aura: '#555555',
      svg: `
        <ellipse cx="340" cy="468" rx="80" ry="18" fill="#000" opacity="0.4"/>
        <rect x="305" y="260" width="70" height="110" rx="8" fill="#3d2b1f" stroke="#2a1e14" stroke-width="1"/>
        <rect x="302" y="310" width="76" height="8" rx="3" fill="#5d3a1a" stroke="#3d2510" stroke-width="0.5"/>
        <rect x="310" y="370" width="24" height="80" rx="6" fill="#3d2b1f" stroke="#2a1e14" stroke-width="1"/>
        <rect x="346" y="370" width="24" height="80" rx="6" fill="#3d2b1f" stroke="#2a1e14" stroke-width="1"/>
        <ellipse cx="322" cy="450" rx="16" ry="8" fill="#2a1e0e" stroke="#1a1008" stroke-width="0.5"/>
        <ellipse cx="358" cy="450" rx="16" ry="8" fill="#2a1e0e" stroke="#1a1008" stroke-width="0.5"/>
        <rect x="268" y="260" width="22" height="80" rx="8" fill="#3d2b1f" stroke="#2a1e14" stroke-width="1"/>
        <rect x="390" y="260" width="22" height="80" rx="8" fill="#3d2b1f" stroke="#2a1e14" stroke-width="1"/>
        <ellipse cx="279" cy="348" rx="12" ry="10" fill="#c8956c" stroke="#8d6040" stroke-width="0.5"/>
        <ellipse cx="401" cy="348" rx="12" ry="10" fill="#c8956c" stroke="#8d6040" stroke-width="0.5"/>
        <rect x="326" y="218" width="28" height="22" rx="6" fill="#c8956c" stroke="#a07050" stroke-width="0.5"/>
        <ellipse cx="340" cy="192" rx="46" ry="50" fill="#c8956c" stroke="#a07050" stroke-width="1"/>
        <path d="M296 175 Q300 145 320 148 Q330 138 340 140 Q355 138 365 148 Q380 145 384 175" fill="#2c1e0e" stroke="#1a1008" stroke-width="0.5"/>
        <path d="M294 180 Q288 160 296 150" fill="none" stroke="#2c1e0e" stroke-width="6" stroke-linecap="round"/>
        <path d="M386 180 Q392 160 384 150" fill="none" stroke="#2c1e0e" stroke-width="6" stroke-linecap="round"/>
        <ellipse cx="325" cy="190" rx="7" ry="5" fill="#fff" stroke="#999" stroke-width="0.5"/>
        <ellipse cx="355" cy="190" rx="7" ry="5" fill="#fff" stroke="#999" stroke-width="0.5"/>
        <circle cx="326" cy="191" r="4" fill="#5d3a1a"/><circle cx="356" cy="191" r="4" fill="#5d3a1a"/>
        <circle cx="327" cy="190" r="1.5" fill="#111"/><circle cx="357" cy="190" r="1.5" fill="#111"/>
        <path d="M338 200 Q336 212 332 216 Q340 218 348 216 Q344 212 342 200Z" fill="#b07855"/>
        <path d="M328 228 Q340 232 352 228" fill="none" stroke="#8d5533" stroke-width="2" stroke-linecap="round"/>
        <path d="M360 205 L368 210" stroke="#8b3a2a" stroke-width="1.5" stroke-linecap="round"/>
      `
    }
  }
  if (lvl < 10) {
    return {
      name: 'Cazador', desc: 'Forjado en el bosque, templado en sangre.', aura: '#27ae60',
      svg: `
        <ellipse cx="340" cy="468" rx="80" ry="18" fill="#000" opacity="0.4"/>
        <path d="M295 255 Q280 280 278 380 L305 378 L305 255Z" fill="#1a4a2e" stroke="#123322" stroke-width="1"/>
        <path d="M385 255 Q400 280 402 380 L375 378 L375 255Z" fill="#1a4a2e" stroke="#123322" stroke-width="1"/>
        <rect x="303" y="255" width="74" height="120" rx="8" fill="#2d5a3d" stroke="#1a3d28" stroke-width="1"/>
        <rect x="308" y="260" width="64" height="50" rx="5" fill="#1a4a2e" stroke="#123322" stroke-width="0.5"/>
        <line x1="340" y1="265" x2="340" y2="308" stroke="#0d3320" stroke-width="2" opacity="0.5"/>
        <line x1="308" y1="285" x2="372" y2="285" stroke="#0d3320" stroke-width="1" opacity="0.4"/>
        <rect x="300" y="373" width="80" height="10" rx="4" fill="#5d3a1a" stroke="#3d2510" stroke-width="0.5"/>
        <rect x="307" y="380" width="26" height="85" rx="7" fill="#1a3d28" stroke="#0d2a1a" stroke-width="1"/>
        <rect x="347" y="380" width="26" height="85" rx="7" fill="#1a3d28" stroke="#0d2a1a" stroke-width="1"/>
        <path d="M305 455 Q305 470 308 472 L332 472 Q338 470 336 460 L336 455Z" fill="#2c1e0e" stroke="#1a1008" stroke-width="0.5"/>
        <path d="M345 455 Q345 470 348 472 L372 472 Q378 470 376 460 L376 455Z" fill="#2c1e0e" stroke="#1a1008" stroke-width="0.5"/>
        <rect x="265" y="255" width="24" height="90" rx="8" fill="#2d5a3d" stroke="#1a3d28" stroke-width="1"/>
        <rect x="391" y="255" width="24" height="90" rx="8" fill="#2d5a3d" stroke="#1a3d28" stroke-width="1"/>
        <ellipse cx="277" cy="310" rx="14" ry="10" fill="#3d7a52" stroke="#2a5a3a" stroke-width="0.5"/>
        <ellipse cx="403" cy="310" rx="14" ry="10" fill="#3d7a52" stroke="#2a5a3a" stroke-width="0.5"/>
        <rect x="263" y="343" width="28" height="22" rx="5" fill="#5d3a1a" stroke="#3d2510" stroke-width="0.5"/>
        <rect x="389" y="343" width="28" height="22" rx="5" fill="#5d3a1a" stroke="#3d2510" stroke-width="0.5"/>
        <rect x="247" y="330" width="6" height="35" rx="2" fill="#aaa" stroke="#888" stroke-width="0.5"/>
        <path d="M250 295 L244 330 L256 330Z" fill="#ccc" stroke="#aaa" stroke-width="0.5"/>
        <path d="M415 240 Q440 300 415 380" fill="none" stroke="#5d3a1a" stroke-width="5" stroke-linecap="round"/>
        <line x1="415" y1="242" x2="415" y2="378" stroke="#daa520" stroke-width="1.5" opacity="0.7"/>
        <rect x="326" y="215" width="28" height="20" rx="5" fill="#c8956c" stroke="#a07050" stroke-width="0.5"/>
        <ellipse cx="340" cy="188" rx="44" ry="48" fill="#c8956c" stroke="#a07050" stroke-width="1"/>
        <path d="M296 175 Q297 148 318 144 Q330 136 342 138 Q358 136 368 144 Q384 148 384 175" fill="#1a0e08" stroke="#0a0604" stroke-width="1"/>
        <ellipse cx="325" cy="188" rx="7" ry="5.5" fill="#fff" stroke="#999" stroke-width="0.5"/>
        <ellipse cx="355" cy="188" rx="7" ry="5.5" fill="#fff" stroke="#999" stroke-width="0.5"/>
        <circle cx="325" cy="189" r="4.5" fill="#27ae60"/><circle cx="355" cy="189" r="4.5" fill="#27ae60"/>
        <circle cx="326" cy="188" r="2" fill="#0d2a44"/><circle cx="356" cy="188" r="2" fill="#0d2a44"/>
        <path d="M337 196 Q335 210 330 214 Q340 218 350 214 Q345 210 343 196Z" fill="#b07855"/>
        <path d="M325 224 Q340 228 355 224" fill="none" stroke="#8d5533" stroke-width="2"/>
        <path d="M308 216 Q340 238 372 216 Q370 238 340 242 Q310 234 308 216Z" fill="#1a0e08" opacity="0.65"/>
      `
    }
  }
  if (lvl < 20) {
    return {
      name: 'Superviviente', desc: 'Las runas hablan. El acero obedece.', aura: '#2980b9',
      svg: `
        <ellipse cx="340" cy="468" rx="80" ry="18" fill="#000" opacity="0.4"/>
        <path d="M290 250 Q260 310 255 460 L290 458 L295 250Z" fill="#1a3a5c" stroke="#0d2640" stroke-width="1"/>
        <path d="M390 250 Q420 310 425 460 L390 458 L385 250Z" fill="#1a3a5c" stroke="#0d2640" stroke-width="1"/>
        <path d="M300 248 L300 375 Q340 388 380 375 L380 248 Q340 238 300 248Z" fill="#1c3d5e" stroke="#0d2a44" stroke-width="1"/>
        <path d="M315 255 L315 355 Q340 365 365 355 L365 255 Q340 245 315 255Z" fill="#2471a3" stroke="#1a5276" stroke-width="1"/>
        <line x1="340" y1="270" x2="340" y2="340" stroke="#5dade2" stroke-width="1.5" opacity="0.7"/>
        <line x1="318" y1="295" x2="362" y2="295" stroke="#5dade2" stroke-width="1.5" opacity="0.7"/>
        <path d="M295 248 Q272 240 265 268 L280 275 Q285 255 300 255Z" fill="#1c3d5e" stroke="#0d2a44" stroke-width="1"/>
        <path d="M385 248 Q408 240 415 268 L400 275 Q395 255 380 255Z" fill="#1c3d5e" stroke="#0d2a44" stroke-width="1"/>
        <path d="M265 262 Q262 248 272 245 Q282 242 285 255" fill="#2471a3" stroke="#1a5276" stroke-width="1"/>
        <path d="M415 262 Q418 248 408 245 Q398 242 395 255" fill="#2471a3" stroke="#1a5276" stroke-width="1"/>
        <rect x="298" y="373" width="84" height="12" rx="5" fill="#0d2a44" stroke="#1a5276" stroke-width="0.5"/>
        <rect x="330" y="371" width="20" height="16" rx="4" fill="#2471a3" stroke="#1a5276" stroke-width="0.5"/>
        <rect x="305" y="382" width="28" height="88" rx="7" fill="#1c3d5e" stroke="#0d2a44" stroke-width="1"/>
        <rect x="347" y="382" width="28" height="88" rx="7" fill="#1c3d5e" stroke="#0d2a44" stroke-width="1"/>
        <rect x="307" y="382" width="24" height="40" rx="5" fill="#2471a3" stroke="#1a5276" stroke-width="0.5"/>
        <rect x="349" y="382" width="24" height="40" rx="5" fill="#2471a3" stroke="#1a5276" stroke-width="0.5"/>
        <path d="M303 460 Q302 475 306 478 L333 478 Q340 476 338 464 L338 460Z" fill="#0d1f35"/>
        <path d="M343 460 Q342 475 346 478 L373 478 Q380 476 378 464 L378 460Z" fill="#0d1f35"/>
        <rect x="261" y="248" width="26" height="98" rx="8" fill="#1c3d5e" stroke="#0d2a44" stroke-width="1"/>
        <rect x="393" y="248" width="26" height="98" rx="8" fill="#1c3d5e" stroke="#0d2a44" stroke-width="1"/>
        <rect x="263" y="248" width="22" height="45" rx="6" fill="#2471a3" stroke="#1a5276" stroke-width="0.5"/>
        <rect x="395" y="248" width="22" height="45" rx="6" fill="#2471a3" stroke="#1a5276" stroke-width="0.5"/>
        <rect x="260" y="344" width="30" height="24" rx="5" fill="#0d2a44" stroke="#1a5276" stroke-width="0.5"/>
        <rect x="390" y="344" width="30" height="24" rx="5" fill="#0d2a44" stroke="#1a5276" stroke-width="0.5"/>
        <path d="M391 258 L386 298 L397 298Z" fill="#d0d0d0" stroke="#aaa" stroke-width="0.5"/>
        <rect x="388" y="298" width="6" height="48" rx="2" fill="#bdc3c7" stroke="#aaa" stroke-width="0.5"/>
        <rect x="380" y="297" width="22" height="5" rx="1" fill="#f1c40f" stroke="#b7950b" stroke-width="0.3"/>
        <path d="M391 210 L386 258 L397 258Z" fill="#e8e8e8" stroke="#ccc" stroke-width="0.5"/>
        <rect x="325" y="213" width="30" height="20" rx="5" fill="#c8956c" stroke="#a07050" stroke-width="0.5"/>
        <circle cx="340" cy="238" r="8" fill="#0d2a44" stroke="#2471a3" stroke-width="1"/>
        <ellipse cx="340" cy="185" rx="44" ry="47" fill="#c8956c" stroke="#a07050" stroke-width="1"/>
        <path d="M296 172 Q298 145 320 142 Q330 134 340 136" fill="#1c3d5e" stroke="#0d2a44" stroke-width="1"/>
        <path d="M296 172 Q290 180 290 200 L300 200 L300 172Z" fill="#1c3d5e" stroke="#0d2a44" stroke-width="1"/>
        <path d="M384 172 Q382 145 360 142 Q350 134 340 136" fill="#1c3d5e" stroke="#0d2a44" stroke-width="1"/>
        <path d="M384 172 Q390 180 390 200 L380 200 L380 172Z" fill="#1c3d5e" stroke="#0d2a44" stroke-width="1"/>
        <line x1="296" y1="172" x2="384" y2="172" stroke="#2471a3" stroke-width="1.5"/>
        <ellipse cx="325" cy="186" rx="7.5" ry="5.5" fill="#fff" stroke="#999" stroke-width="0.5"/>
        <ellipse cx="355" cy="186" rx="7.5" ry="5.5" fill="#fff" stroke="#999" stroke-width="0.5"/>
        <circle cx="325" cy="187" r="5" fill="#2471a3"/><circle cx="355" cy="187" r="5" fill="#2471a3"/>
        <circle cx="326" cy="186" r="2" fill="#0d2a44"/><circle cx="356" cy="186" r="2" fill="#0d2a44"/>
        <path d="M337 196 Q335 210 330 214 Q340 218 350 214 Q345 210 343 196Z" fill="#b07855"/>
        <path d="M325 224 Q340 228 355 224" fill="none" stroke="#8d5533" stroke-width="2"/>
        <path d="M308 216 Q340 238 372 216 Q370 238 340 248 Q310 238 308 216Z" fill="#1a0e08" opacity="0.65"/>
      `
    }
  }
  return {
    name: 'Señor de la Ceniza', desc: 'Donde otros ven el fin, yo veo un umbral.', aura: '#f1c40f',
    svg: `
      <ellipse cx="340" cy="468" rx="80" ry="18" fill="#000" opacity="0.4"/>
      <circle cx="240" cy="300" r="2" fill="#f1c40f" opacity="0.6"><animate attributeName="cy" values="300;260;240" dur="2.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.6;0.3;0" dur="2.5s" repeatCount="indefinite"/></circle>
      <circle cx="260" cy="320" r="1.5" fill="#e67e22" opacity="0.5"><animate attributeName="cy" values="320;280;250" dur="3.2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.5;0.2;0" dur="3.2s" repeatCount="indefinite"/></circle>
      <circle cx="430" cy="290" r="2" fill="#f1c40f" opacity="0.7"><animate attributeName="cy" values="290;250;230" dur="2.8s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.7;0.3;0" dur="2.8s" repeatCount="indefinite"/></circle>
      <circle cx="450" cy="340" r="1.5" fill="#e74c3c" opacity="0.5"><animate attributeName="cy" values="340;300;270" dur="3.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.5;0.2;0" dur="3.5s" repeatCount="indefinite"/></circle>
      <path d="M285 245 Q250 320 235 470 L275 468 L288 245Z" fill="#1a0000" stroke="#3d0000" stroke-width="1"/>
      <path d="M395 245 Q430 320 445 470 L405 468 L392 245Z" fill="#1a0000" stroke="#3d0000" stroke-width="1"/>
      <path d="M295 242 L295 380 Q340 395 385 380 L385 242 Q340 230 295 242Z" fill="#0d0d0d" stroke="#3d3d3d" stroke-width="1"/>
      <path d="M310 248 L310 360 Q340 372 370 360 L370 248 Q340 236 310 248Z" fill="#1a1a1a" stroke="#b7950b" stroke-width="1.5"/>
      <line x1="340" y1="265" x2="340" y2="355" stroke="#f1c40f" stroke-width="2.5"/>
      <line x1="316" y1="302" x2="364" y2="302" stroke="#f1c40f" stroke-width="2.5"/>
      <path d="M290 242 Q258 230 248 260 Q245 278 260 285 L278 278 Q282 258 298 252Z" fill="#0d0d0d" stroke="#b7950b" stroke-width="1.5"/>
      <path d="M260 258 L253 240 L260 244" fill="#b7950b"/>
      <path d="M252 268 L243 252 L252 255" fill="#b7950b"/>
      <path d="M390 242 Q422 230 432 260 Q435 278 420 285 L402 278 Q398 258 382 252Z" fill="#0d0d0d" stroke="#b7950b" stroke-width="1.5"/>
      <path d="M420 258 L427 240 L420 244" fill="#b7950b"/>
      <path d="M428 268 L437 252 L428 255" fill="#b7950b"/>
      <rect x="295" y="377" width="90" height="14" rx="6" fill="#0d0d0d" stroke="#b7950b" stroke-width="1.5"/>
      <rect x="326" y="373" width="28" height="22" rx="5" fill="#1a1a1a" stroke="#f1c40f" stroke-width="1.5"/>
      <circle cx="340" cy="384" r="6" fill="#c0392b" stroke="#8b2020" stroke-width="0.5"/>
      <rect x="303" y="388" width="30" height="92" rx="7" fill="#0d0d0d" stroke="#3d3d3d" stroke-width="1"/>
      <rect x="347" y="388" width="30" height="92" rx="7" fill="#0d0d0d" stroke="#3d3d3d" stroke-width="1"/>
      <rect x="305" y="390" width="26" height="42" rx="5" fill="#1a1a1a" stroke="#b7950b" stroke-width="1"/>
      <rect x="349" y="390" width="26" height="42" rx="5" fill="#1a1a1a" stroke="#b7950b" stroke-width="1"/>
      <rect x="305" y="435" width="26" height="42" rx="5" fill="#1a1a1a" stroke="#b7950b" stroke-width="1"/>
      <rect x="349" y="435" width="26" height="42" rx="5" fill="#1a1a1a" stroke="#b7950b" stroke-width="1"/>
      <path d="M300 468 Q298 482 303 486 L336 486 Q344 484 342 472 L342 468Z" fill="#0a0a0a" stroke="#b7950b" stroke-width="1"/>
      <path d="M340 468 Q338 482 343 486 L376 486 Q384 484 382 472 L382 468Z" fill="#0a0a0a" stroke="#b7950b" stroke-width="1"/>
      <rect x="257" y="242" width="28" height="102" rx="8" fill="#0d0d0d" stroke="#3d3d3d" stroke-width="1"/>
      <rect x="395" y="242" width="28" height="102" rx="8" fill="#0d0d0d" stroke="#3d3d3d" stroke-width="1"/>
      <rect x="259" y="244" width="24" height="48" rx="6" fill="#1a1a1a" stroke="#b7950b" stroke-width="1"/>
      <rect x="397" y="244" width="24" height="48" rx="6" fill="#1a1a1a" stroke="#b7950b" stroke-width="1"/>
      <rect x="259" y="295" width="24" height="46" rx="6" fill="#1a1a1a" stroke="#b7950b" stroke-width="1"/>
      <rect x="397" y="295" width="24" height="46" rx="6" fill="#1a1a1a" stroke="#b7950b" stroke-width="1"/>
      <rect x="255" y="342" width="32" height="26" rx="5" fill="#0d0d0d" stroke="#b7950b" stroke-width="1.5"/>
      <rect x="393" y="342" width="32" height="26" rx="5" fill="#0d0d0d" stroke="#b7950b" stroke-width="1.5"/>
      <rect x="395" y="248" width="8" height="12" rx="2" fill="#b7950b"/>
      <rect x="382" y="258" width="34" height="6" rx="2" fill="#f1c40f" stroke="#8a6d0b" stroke-width="0.5"/>
      <path d="M399 260 L392 340 L406 340Z" fill="#bdc3c7" stroke="#aaa" stroke-width="0.5"/>
      <path d="M399 210 L393 260 L405 260Z" fill="#e8e8e8" stroke="#ccc" stroke-width="0.5"/>
      <path d="M242 268 Q228 270 224 310 Q222 350 242 380 Q255 400 268 380 Q284 355 284 310 Q284 272 270 268Z" fill="#0d0d0d" stroke="#b7950b" stroke-width="1.5"/>
      <path d="M244 275 Q232 278 230 315 Q228 350 244 373 Q255 390 266 373 Q278 350 278 315 Q278 280 266 275Z" fill="#1a1a1a" stroke="#f1c40f" stroke-width="1"/>
      <line x1="255" y1="290" x2="255" y2="360" stroke="#f1c40f" stroke-width="2"/>
      <line x1="236" y1="325" x2="274" y2="325" stroke="#f1c40f" stroke-width="2"/>
      <circle cx="255" cy="325" r="8" fill="none" stroke="#f1c40f" stroke-width="1.5"/>
      <circle cx="255" cy="325" r="3" fill="#c0392b"/>
      <rect x="322" y="210" width="36" height="22" rx="8" fill="#1a1a1a" stroke="#b7950b" stroke-width="1.5"/>
      <path d="M292 180 Q292 130 340 118 Q388 130 388 180 L388 205 L292 205Z" fill="#0d0d0d" stroke="#b7950b" stroke-width="1.5"/>
      <path d="M296 185 L296 205 Q340 215 384 205 L384 185 Q340 178 296 185Z" fill="#1a1a1a" stroke="#b7950b" stroke-width="1"/>
      <path d="M306 188 Q315 183 326 188 L326 198 Q315 202 306 198Z" fill="#c0392b" opacity="0.9"/>
      <path d="M354 188 Q365 183 374 188 L374 198 Q365 202 354 198Z" fill="#c0392b" opacity="0.9"/>
      <ellipse cx="316" cy="193" rx="8" ry="4" fill="#e74c3c"/>
      <ellipse cx="364" cy="193" rx="8" ry="4" fill="#e74c3c"/>
      <ellipse cx="316" cy="193" rx="5" ry="2.5" fill="#f1948a"/>
      <ellipse cx="364" cy="193" rx="5" ry="2.5" fill="#f1948a"/>
      <path d="M340 118 Q335 95 330 75 Q340 65 350 75 Q345 95 340 118Z" fill="#c0392b" stroke="#8b2020" stroke-width="1"/>
      <path d="M332 78 Q340 68 348 78 Q344 90 340 95 Q336 90 332 78Z" fill="#e74c3c"/>
      <path d="M292 175 Q310 165 340 162 Q370 165 388 175" fill="none" stroke="#f1c40f" stroke-width="2"/>
      <circle cx="340" cy="135" r="5" fill="#f1c40f" stroke="#b7950b" stroke-width="0.5"/>
      <path d="M292 185 L292 208 Q300 218 310 215 L310 185 Q300 182 292 185Z" fill="#0d0d0d" stroke="#b7950b" stroke-width="1"/>
      <path d="M388 185 L388 208 Q380 218 370 215 L370 185 Q380 182 388 185Z" fill="#0d0d0d" stroke="#b7950b" stroke-width="1"/>
      <rect x="334" y="198" width="12" height="20" rx="4" fill="#1a1a1a" stroke="#b7950b" stroke-width="1"/>
      <rect x="316" y="218" width="48" height="14" rx="5" fill="#0d0d0d" stroke="#b7950b" stroke-width="1"/>
    `
  }
})

// ── API calls ──────────────────────────────────────────
const fetchHabits = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/habits/user/${user.value.id}`)
    habits.value = res.data
  } catch (e) { console.error(e) }
}

const completeHabit = async (habitId) => {
  try {
    const res = await axios.put(`http://localhost:3000/api/habits/${habitId}/complete`, { userId: user.value.id })
    user.value = { ...user.value, ...res.data.stats }
    localStorage.setItem('user', JSON.stringify(user.value))
    await fetchHabits()
    const type = res.data.message?.includes('Nivel') ? 'levelup' : 'success'
    showToast(res.data.message, type)
  } catch { showToast('Error al completar', 'error') }
}

const failHabit = async (habitId) => {
  try {
    const res = await axios.put(`http://localhost:3000/api/habits/${habitId}/fail`, { userId: user.value.id })
    user.value = { ...user.value, ...res.data.stats }
    localStorage.setItem('user', JSON.stringify(user.value))
    await fetchHabits()
    showToast(res.data.message, res.data.died ? 'error' : 'damage')
  } catch { showToast('Error al procesar el daño', 'error') }
}

const deleteHabit = async (habitId) => {
  if (!confirm('¿Abandonar misión?')) return
  try {
    await axios.delete(`http://localhost:3000/api/habits/${habitId}`)
    await fetchHabits()
    showToast('Misión abandonada', 'damage')
  } catch { showToast('Error al abandonar', 'error') }
}

// ── Compra con validación en BD ────────────────────────
const buyReward = async (cost, itemName) => {
  if (user.value.coins < cost) {
    showToast(`Oro insuficiente — faltan ${cost - user.value.coins}`, 'error')
    return
  }
  buyingItem.value = true
  try {
    const res = await axios.post(`http://localhost:3000/api/users/${user.value.id}/buy`, { cost })
    if (res.data.success) {
      user.value.coins = res.data.coins
      localStorage.setItem('user', JSON.stringify(user.value))
      showToast(`¡${itemName} obtenido!`, 'success')
    } else {
      if (res.data.coins !== undefined) {
        user.value.coins = res.data.coins
        localStorage.setItem('user', JSON.stringify(user.value))
      }
      showToast(res.data.message, 'error')
    }
  } catch (err) {
    const serverMsg = err.response?.data?.message
    if (err.response?.status === 400 && serverMsg) {
      if (err.response.data.coins !== undefined) {
        user.value.coins = err.response.data.coins
        localStorage.setItem('user', JSON.stringify(user.value))
      }
      showToast(serverMsg, 'error')
    } else {
      showToast('Error al procesar la compra', 'error')
    }
  } finally {
    buyingItem.value = false
  }
}

// --- CHEATS PARA PRUEBAS ---
const cheatLevelDown = () => {
  if (user.value.level > 1) {
    user.value.level--;
    user.value.xp = 0;
    localStorage.setItem('user', JSON.stringify(user.value));
    showToast('Nivel reducido', 'success');
  }
}

const cheatLevelUp = async () => {
  user.value.level += 1;
  user.value.xp = 0;
  localStorage.setItem('user', JSON.stringify(user.value));
  showToast('¡Nivel aumentado!', 'levelup')
};

const cheatAddGold = () => {
  user.value.coins += 1000;
  localStorage.setItem('user', JSON.stringify(user.value));
  showToast('+1000 Oro', 'success')
};

const cheatHeal = () => {
  user.value.hp = 100;
  localStorage.setItem('user', JSON.stringify(user.value));
  showToast('HP restaurado', 'success')
};

const logout = () => {
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

<style scoped>
/* ══════════════════════════════════════
   VARIABLES & RESET
══════════════════════════════════════ */
:root {
  --gold: #f1c40f;
  --gold-dim: #b7950b;
  --red: #e74c3c;
  --green: #27ae60;
  --blue: #2980b9;
  --bg: #08080a;
  --surface: rgba(255,255,255,0.03);
  --border: rgba(255,255,255,0.06);
}

.rpg-viewport {
  width: 100vw;
  height: 100vh;
  display: flex;
  background: radial-gradient(ellipse at 50% 30%, #0e0e1a 0%, #08080a 70%);
  position: relative;
  overflow: hidden;
  font-family: 'Segoe UI', 'Helvetica Neue', sans-serif;
}

/* Scanlines overlay */
.scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0,0,0,0.04) 2px,
    rgba(0,0,0,0.04) 4px
  );
  pointer-events: none;
  z-index: 1;
}

/* ══════════════════════════════════════
   GRID LAYOUT
══════════════════════════════════════ */
.rpg-grid {
  display: grid;
  grid-template-columns: 420px 1fr 440px;
  gap: 28px;
  width: 100%;
  height: 100%;
  padding: 28px;
  box-sizing: border-box;
  z-index: 10;
}

.panel {
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 100%;
  overflow: hidden;
}

/* ══════════════════════════════════════
   GLASS CARDS
══════════════════════════════════════ */
.glass-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 32px;
  position: relative;
  overflow: hidden;
}
.glass-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(241,196,15,0.15), transparent);
}

/* ══════════════════════════════════════
   SECTION TITLES
══════════════════════════════════════ */
.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 3px;
  color: #f1c40f;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(241,196,15,0.1);
}

/* HUD — PANEL IZQUIERDO
══════════════════════════════════════ */
.hud-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #aaa;
  margin-bottom: 28px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--border);
}

/* Bars */
.bar-group { margin-bottom: 16px; }
.bar-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 7px;
}
.bar-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #888;
  letter-spacing: 1px;
}
.bar-val { font-size: 18px; font-weight: 700; }
.bar-val small { font-size: 11px; font-weight: 400; color: #555; margin-left: 1px; }
.hp-val { color: #e74c3c; }
.xp-val { color: #f1c40f; }

.bar-outer {
  height: 14px;
  background: rgba(0,0,0,0.5);
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.04);
  overflow: hidden;
}
.bar-inner {
  height: 100%;
  border-radius: 5px;
  transition: width 0.6s cubic-bezier(0.4,0,0.2,1);
  position: relative;
  overflow: hidden;
}
.bar-inner.hp { background: linear-gradient(90deg, #922b21, #e74c3c); }
.bar-inner.xp { background: linear-gradient(90deg, #b7950b, #f1c40f); }
.bar-shine {
  position: absolute;
  top: 0; left: -100%; width: 60%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  animation: shine 3s ease-in-out infinite;
}
@keyframes shine { 0%,80%,100% { left: -100%; } 40% { left: 120%; } }

/* Stats chips */
.stats-row {
  display: flex;
  align-items: center;
  gap: 0;
  background: rgba(0,0,0,0.3);
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
  margin: 6px 0 18px;
}
.stat-chip {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 10px;
}
.stat-divider { width: 1px; height: 40px; background: var(--border); }
.stat-data { display: flex; flex-direction: column; align-items: flex-start; }
.stat-num { font-size: 42px; font-weight: 700; color: #f1c40f; line-height: 1; }
.stat-lbl { font-size: 12px; font-weight: 700; letter-spacing: 2px; color: #777; margin-top: 4px; }

.btn-exit {
  width: 100%;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.06);
  color: #666;
  padding: 18px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.2s;
}
.btn-exit:hover { border-color: rgba(231,76,60,0.3); color: #e74c3c; }

/* ══════════════════════════════════════
   MERCADER
══════════════════════════════════════ */
.shop { flex-shrink: 0; }
.reward-items { display: flex; flex-direction: column; gap: 10px; }

.item-slot {
  display: flex;
  align-items: center;
  gap: 14px;
  background: rgba(0,0,0,0.25);
  border: 1px solid rgba(255,255,255,0.04);
  border-radius: 10px;
  padding: 14px;
  transition: border-color 0.2s;
}
.item-slot:hover { border-color: rgba(241,196,15,0.15); }

.item-icon {
  width: 52px;
  height: 52px;
  background: rgba(0,0,0,0.3);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid rgba(255,255,255,0.05);
}
.item-info { flex: 1; min-width: 0; }
.item-info strong { display: block; font-size: 17px; font-weight: 700; color: #ddd; letter-spacing: 1px; }
.item-info p { font-size: 13px; color: #777; margin-top: 5px; }

.btn-buy {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(241,196,15,0.08);
  border: 1px solid rgba(241,196,15,0.25);
  color: #f1c40f;
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}
.btn-buy:hover:not(:disabled) { background: rgba(241,196,15,0.18); border-color: #f1c40f; }
.btn-buy:disabled { opacity: 0.25; cursor: not-allowed; }

/* ══════════════════════════════════════
   PERSONAJE CENTRAL
══════════════════════════════════════ */
.center-panel {
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.character-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 0;
}

.class-banner {
  text-align: center;
  margin-bottom: 8px;
  animation: fadeUp 0.5s ease-out;
}
@keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

.lvl-pill {
  display: inline-block;
  background: #f1c40f;
  color: #000;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 4px;
  padding: 8px 24px;
  border-radius: 6px;
  margin-bottom: 12px;
}
.class-name {
  font-size: 56px;
  font-weight: 800;
  color: #fff;
  letter-spacing: 8px;
  text-transform: uppercase;
  margin: 0;
}

.character-stage {
  position: relative;
  width: 100%;
  max-width: 100vw;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 520px;
}
.hero-svg {
  display: block;
  width: auto;
  height: 900px;
  max-height: 90vh;
  margin-left: auto;
  margin-right: auto;
}
.stage-glow {
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  height: 200px;
  border-radius: 50%;
  pointer-events: none;
  transition: background 0.8s ease;
}

.hero-quote {
  font-style: italic;
  color: #666;
  font-size: 18px;
  text-align: center;
  letter-spacing: 1px;
  margin-top: 12px;
}

/* ══════════════════════════════════════
   MISIONES — PANEL DERECHO
══════════════════════════════════════ */
.right-panel { overflow: hidden; }

/* Forge form */
.quest-forge { flex-shrink: 0; }

.oracle-section {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.btn-oracle {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: linear-gradient(135deg, #8e44ad, #9b59b6);
  border: none;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;
}
.btn-oracle:hover:not(:disabled) { background: linear-gradient(135deg, #9b59b6, #a569bd); transform: translateY(-1px); }
.btn-oracle:disabled { opacity: 0.4; cursor: not-allowed; }

.oracle-btn-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}
.oracle-title {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.oracle-desc {
  font-size: 10px;
  opacity: 0.8;
}

.oracle-badge {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-shrink: 0;
}
.oracle-badge.badge-fácil { background: rgba(39,174,96,0.15); color: #27ae60; border: 1px solid rgba(39,174,96,0.3); }
.oracle-badge.badge-medio { background: rgba(243,156,18,0.15); color: #f39c12; border: 1px solid rgba(243,156,18,0.3); }
.oracle-badge.badge-difícil { background: rgba(231,76,60,0.15); color: #e74c3c; border: 1px solid rgba(231,76,60,0.3); }

/* Responsive */
@media (max-width: 900px) {
  .main-layout { flex-direction: column; }
  .left-panel, .center-panel, .right-panel { width: 100%; }
  .quest-forge { order: -1; }
  .forge-row { flex-direction: column; gap: 10px; }
  .oracle-section { flex-direction: column; }
  .btn-oracle { width: 100%; justify-content: center; }
  .oracle-badge { width: 100%; text-align: center; }
  .dynamic-inputs .input-group.split { flex-direction: column; }
  .forge-actions { justify-content: center; }
}

@media (max-width: 600px) {
  .forge-form input { font-size: 16px; padding: 14px 14px 14px 38px; }
  .section-title { font-size: 14px; }
  .btn-forge { width: 48px; height: 48px; }
  .oracle-questions .question-options { grid-template-columns: 1fr; }
  .oracle-container { max-width: 100%; margin: 10px; }
}

.input-wrapper {
  position: relative;
  margin-bottom: 8px;
}
.input-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
.forge-form input {
  width: 100%;
  background: rgba(0,0,0,0.4);
  border: 1px solid rgba(255,255,255,0.07);
  color: #e0e0e0;
  padding: 16px 16px 16px 40px;
  border-radius: 10px;
  font-size: 18px;
  box-sizing: border-box;
  transition: border-color 0.2s;
  font-family: inherit;
}
.forge-form input:focus { outline: none; border-color: rgba(241,196,15,0.35); }
.forge-form input::placeholder { color: #444; }

.forge-row { display: flex; gap: 6px; align-items: center; }

.select-wrapper {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}
.select-wrapper svg {
  position: absolute;
  right: 8px;
  pointer-events: none;
}
.forge-form select {
  width: 100%;
  background: rgba(0,0,0,0.4);
  border: 1px solid rgba(255,255,255,0.07);
  color: #bbb;
  padding: 14px 32px 14px 14px;
  border-radius: 10px;
  font-size: 15px;
  appearance: none;
  cursor: pointer;
  font-family: inherit;
  transition: border-color 0.2s;
}
.forge-form select:focus { outline: none; border-color: rgba(241,196,15,0.35); }

.oracle-required {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(155,89,182,0.1);
  border: 1px dashed rgba(155,89,182,0.4);
  border-radius: 10px;
  color: #9b59b6;
  font-size: 13px;
  font-weight: 500;
}
.oracle-result {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.diff-badge {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.diff-badge.diff-fácil { background: rgba(39,174,96,0.15); color: #27ae60; border: 1px solid rgba(39,174,96,0.3); }
.diff-badge.diff-medio { background: rgba(243,156,18,0.15); color: #f39c12; border: 1px solid rgba(243,156,18,0.3); }
.diff-badge.diff-difícil { background: rgba(231,76,60,0.15); color: #e74c3c; border: 1px solid rgba(231,76,60,0.3); }

.btn-forge {
  width: 52px;
  height: 52px;
  background: #f1c40f;
  border: none;
  border-radius: 10px;
  color: #000;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;
}
.btn-forge:hover:not(:disabled) { background: #f4d03f; transform: scale(1.05); }
.btn-forge:disabled { opacity: 0.4; cursor: not-allowed; }

.btn-oracle-main {
  width: 52px;
  height: 52px;
  background: linear-gradient(135deg, #8e44ad, #9b59b6);
  border: none;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;
}
.btn-oracle-main:hover:not(:disabled) { background: linear-gradient(135deg, #9b59b6, #a569bd); transform: scale(1.05); }
.btn-oracle-main:disabled { opacity: 0.5; cursor: not-allowed; }

/* ══════════════════════════════════════════════════════
   ORÁCULO — MODAL Y ESTILOS (ya definidos arriba)
══════════════════════════════════════════════════════ */

/* Quest board */
.oracle-container {
  background: linear-gradient(145deg, #1a1a2e, #16213e);
  border: 1px solid rgba(155,89,182,0.3);
  border-radius: 16px;
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(155,89,182,0.1);
}

.oracle-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.oracle-header {
  position: relative;
  text-align: center;
  padding: 24px 20px 16px;
  border-bottom: 1px solid rgba(155,89,182,0.2);
}

.oracle-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 12px;
  background: rgba(155,89,182,0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
}

.oracle-header h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #9b59b6;
  letter-spacing: 3px;
  text-transform: uppercase;
}

.oracle-subtitle {
  margin: 6px 0 0;
  font-size: 13px;
  color: #888;
  font-style: italic;
}

.oracle-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s;
}
.oracle-close:hover { color: #fff; }

.oracle-mission {
  margin: 20px;
  padding: 16px;
  background: rgba(241,196,15,0.05);
  border: 1px solid rgba(241,196,15,0.2);
  border-radius: 10px;
  text-align: center;
}

.mission-label {
  display: block;
  font-size: 10px;
  color: #f1c40f;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 6px;
}

.mission-title {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}

.oracle-questions {
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.oracle-question {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 10px;
  padding: 14px;
  transition: all 0.3s;
}
.oracle-question.answered { border-color: rgba(155,89,182,0.3); }

.question-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.q-number {
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #8e44ad, #9b59b6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
}

.q-text {
  font-size: 13px;
  color: #ccc;
  line-height: 1.4;
}

.question-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.option-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
  color: #aaa;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}
.option-btn:hover { background: rgba(155,89,182,0.1); border-color: rgba(155,89,182,0.3); color: #fff; }
.option-btn.selected { background: rgba(155,89,182,0.2); border-color: #9b59b6; color: #fff; }

.opt-marker {
  font-size: 10px;
  color: #9b59b6;
  font-weight: 700;
}
.option-btn.selected .opt-marker { color: #fff; }

.oracle-progress {
  padding: 20px 20px 0;
}

.progress-info {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

.progress-bar {
  height: 4px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #8e44ad, #9b59b6);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.oracle-evaluate {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: calc(100% - 40px);
  margin: 20px;
  padding: 14px 20px;
  background: linear-gradient(135deg, #8e44ad, #9b59b6);
  border: none;
  border-radius: 10px;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.oracle-evaluate:hover:not(:disabled) { background: linear-gradient(135deg, #9b59b6, #a569bd); transform: translateY(-2px); }
.oracle-evaluate:disabled { opacity: 0.5; cursor: not-allowed; }

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Quest board */
.quest-board {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 16px;
  position: relative;
}
.quest-board::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(241,196,15,0.15), transparent);
}

.quest-count {
  margin-left: auto;
  background: rgba(241,196,15,0.1);
  border: 1px solid rgba(241,196,15,0.2);
  color: #f1c40f;
  font-size: 13px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 14px;
}

.no-quests {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #444;
  text-align: center;
}
.no-quests p { font-size: 17px; line-height: 1.6; }
.no-quests small { font-size: 14px; color: #555; }

.quest-scroll {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-right: 4px;
}
.quest-scroll::-webkit-scrollbar { width: 3px; }
.quest-scroll::-webkit-scrollbar-track { background: transparent; }
.quest-scroll::-webkit-scrollbar-thumb { background: rgba(241,196,15,0.3); border-radius: 2px; }

/* Quest cards */
.quest-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: rgba(0,0,0,0.2);
  border: 1px solid rgba(255,255,255,0.04);
  border-radius: 12px;
  padding: 14px 14px 14px 0;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
}
.quest-card:hover { border-color: rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); }
.quest-card.done { opacity: 0.35; }

/* Diff color bar */
.diff-bar {
  width: 3px;
  align-self: stretch;
  border-radius: 0 2px 2px 0;
  flex-shrink: 0;
}
.diff-easy .diff-bar { background: #27ae60; }
.diff-med  .diff-bar { background: #f39c12; }
.diff-hard .diff-bar { background: #e74c3c; }

.quest-body { flex: 1; min-width: 0; }
.quest-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 6px;
}

.type-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #888;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.06);
  padding: 4px 8px;
  border-radius: 5px;
}

.streak-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 700;
  color: #e67e22;
}

.quest-title {
  font-size: 17px;
  font-weight: 600;
  color: #ddd;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.quest-diff-label {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
  letter-spacing: 1px;
}
.diff-easy .quest-diff-label { color: #1e8449; }
.diff-med  .quest-diff-label { color: #b7770d; }
.diff-hard .quest-diff-label { color: #922b21; }

/* Quest action buttons */
.quest-controls {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
  padding-right: 4px;
}

.btn-action {
  width: 44px;
  height: 44px;
  border: 1px solid transparent;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
}
.btn-complete {
  background: rgba(39,174,96,0.1);
  border-color: rgba(39,174,96,0.2);
  color: #27ae60;
}
.btn-complete:hover { background: rgba(39,174,96,0.25); border-color: #27ae60; }

.btn-fail {
  background: rgba(231,76,60,0.08);
  border-color: rgba(231,76,60,0.15);
  color: #e74c3c;
}
.btn-fail:hover { background: rgba(231,76,60,0.2); border-color: #e74c3c; }

.btn-delete {
  background: rgba(255,255,255,0.03);
  border-color: rgba(255,255,255,0.06);
  color: #555;
}
.btn-delete:hover { background: rgba(255,255,255,0.07); color: #888; }

.done-stamp {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #27ae60;
  padding-right: 8px;
  flex-shrink: 0;
}

/* ══════════════════════════════════════
   TOAST
══════════════════════════════════════ */
.toast {
  position: fixed;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 28px;
  border-radius: 12px;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 1px;
  z-index: 100;
  border: 1px solid;
  backdrop-filter: blur(10px);
  white-space: nowrap;
}
.toast.success  { background: rgba(39,174,96,0.12);  border-color: rgba(39,174,96,0.3);  color: #2ecc71; }
.toast.damage   { background: rgba(243,156,18,0.12); border-color: rgba(243,156,18,0.3); color: #f39c12; }
.toast.error    { background: rgba(231,76,60,0.12);  border-color: rgba(231,76,60,0.3);  color: #e74c3c; }
.toast.levelup  { background: rgba(241,196,15,0.15); border-color: rgba(241,196,15,0.4); color: #f1c40f; }

.toast-enter-active { transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1); }
.toast-leave-active { transition: all 0.2s ease-in; }
.toast-enter-from   { opacity: 0; transform: translateX(-50%) translateY(16px); }
.toast-leave-to     { opacity: 0; transform: translateX(-50%) translateY(8px); }

/* DEV CONSOLE */
.dev-console {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px dashed #f39c12;
  padding: 15px;
  border-radius: 8px;
  z-index: 9999;
  color: #fff;
}
.dev-console h4 { margin: 0 0 10px 0; color: #f39c12; font-size: 12px; text-transform: uppercase; }
.dev-actions { display: flex; gap: 5px; flex-wrap: wrap; }
.dev-actions button { background: #333; color: #fff; border: 1px solid #555; padding: 5px 10px; cursor: pointer; font-size: 11px; }
.dev-actions button:hover { background: #f39c12; color: #000; }

/* FORMULARIOS Y PESTAÑAS (FASE 2) */
.input-dark, .select-dark {
  background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); 
  color: #fff; padding: 10px; border-radius: 6px; box-sizing: border-box; width: 100%;
}
.dynamic-inputs { margin-top: 10px; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 6px; border: 1px dashed rgba(241,196,15,0.3); }
.input-group label { display: block; font-size: 11px; color: #aaa; margin-bottom: 5px; text-transform: uppercase; }
.split { display: flex; gap: 10px; }
.split > div { flex: 1; }

.board-tabs { display: flex; gap: 5px; margin-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 5px; }
.board-tabs button {
  flex: 1; background: transparent; border: none; color: #666; font-weight: bold; 
  padding: 8px 0; cursor: pointer; transition: 0.3s;
}
.board-tabs button.active { color: #f1c40f; border-bottom: 2px solid #f1c40f; }
.quest-meta { font-size: 11.5px; color: #888; margin-top: 4px; display: flex; gap: 8px; flex-wrap: wrap; }
.diff-tag { color: #555; }
.form-row { display: flex; gap: 10px; margin: 10px 0; }
.form-row select { flex: 1; }
.btn-forjar { background: #f1c40f; color: #000; border: none; padding: 12px; border-radius: 6px; font-weight: bold; cursor: pointer; }
.btn-forjar:hover { background: #f39c12; }
.quest-data { flex: 1; }
.quest-data h4 { margin: 0 0 5px 0; color: #ddd; font-size: 15px; }
.btn-check { background: #27ae60; color: #fff; border: none; width: 32px; height: 32px; border-radius: 6px; cursor: pointer; }
.btn-fail { background: #e74c3c; color: #fff; border: none; width: 32px; height: 32px; border-radius: 6px; cursor: pointer; }

/* ══════════════════════════════════════
   FORJAR — INPUT + BOTÓN IA
══════════════════════════════════════ */
.forge-quick { display: flex; flex-direction: column; gap: 10px; }
.forge-quick input {
  width: 100%; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.07);
  color: #e0e0e0; padding: 18px 16px 18px 48px; border-radius: 12px; font-size: 16px;
  box-sizing: border-box; transition: border-color 0.2s; font-family: inherit;
}
.forge-quick input:focus { outline: none; border-color: rgba(241,196,15,0.35); }
.forge-quick input::placeholder { color: #444; }

.btn-ai-eval {
  width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px;
  background: rgba(241,196,15,0.06); border: 1px solid rgba(241,196,15,0.2);
  color: #f1c40f; padding: 16px; border-radius: 12px; font-size: 15px; font-weight: 700;
  letter-spacing: 1.5px; cursor: pointer; transition: all 0.2s;
}
.btn-ai-eval:hover:not(:disabled) { background: rgba(241,196,15,0.14); border-color: #f1c40f; }
.btn-ai-eval:disabled { opacity: 0.3; cursor: not-allowed; }

/* ══════════════════════════════════════
   MERCADER — EXTRAS
══════════════════════════════════════ */
.item-slot.cant-afford { opacity: 0.55; }
.item-info p { margin-bottom: 6px; }
.cost-preview {
  display: flex; align-items: center; gap: 5px;
  font-size: 12px; font-weight: 600;
}
.cost-preview.enough { color: #27ae60; }
.cost-preview.short  { color: #e74c3c; }

/* ══════════════════════════════════════
   MODAL — ORÁCULO DE MISIONES
══════════════════════════════════════ */
.modal-overlay {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(0,0,0,0.78); backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
}
.modal-box {
  background: #0e0e16; border: 1px solid rgba(241,196,15,0.22);
  border-radius: 20px; width: 580px; max-width: 94vw; max-height: 92vh;
  overflow-y: auto; box-shadow: 0 0 80px rgba(0,0,0,0.7);
}
.modal-box::-webkit-scrollbar { width: 3px; }
.modal-box::-webkit-scrollbar-thumb { background: rgba(241,196,15,0.2); border-radius: 2px; }

.modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 24px 32px 18px; border-bottom: 1px solid rgba(255,255,255,0.05);
}
.modal-title {
  display: flex; align-items: center; gap: 10px;
  font-size: 13px; font-weight: 800; letter-spacing: 3px; color: #f1c40f;
}
.modal-close {
  background: transparent; border: 1px solid rgba(255,255,255,0.08); color: #666;
  width: 34px; height: 34px; border-radius: 7px; cursor: pointer;
  display: flex; align-items: center; justify-content: center; transition: all 0.2s;
}
.modal-close:hover { border-color: rgba(231,76,60,0.4); color: #e74c3c; }

.modal-reto { padding: 18px 32px 22px; border-bottom: 1px solid rgba(255,255,255,0.04); }
.modal-reto-label { display: block; font-size: 9px; font-weight: 700; letter-spacing: 2.5px; color: #555; margin-bottom: 7px; }
.modal-reto-text { font-size: 20px; font-weight: 600; color: #e0e0e0; line-height: 1.4; }

.modal-phase { padding: 26px 32px; }
.modal-intro { font-size: 14px; color: #666; margin-bottom: 24px; line-height: 1.65; }

/* Preguntas */
.questions-list { display: flex; flex-direction: column; gap: 16px; }
.question-block {
  background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);
  border-radius: 12px; padding: 18px; transition: border-color 0.25s;
}
.question-block.answered { border-color: rgba(241,196,15,0.18); }
.question-text {
  display: flex; align-items: flex-start; gap: 12px;
  font-size: 14px; color: #bbb; font-weight: 500; margin-bottom: 14px; line-height: 1.55;
}
.q-num {
  flex-shrink: 0; width: 24px; height: 24px;
  background: rgba(241,196,15,0.1); border: 1px solid rgba(241,196,15,0.25);
  color: #f1c40f; border-radius: 50%; display: flex; align-items: center;
  justify-content: center; font-size: 10px; font-weight: 800; margin-top: 1px;
}
.question-options { display: flex; flex-direction: column; gap: 6px; }
.opt-btn {
  text-align: left; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.06);
  color: #888; padding: 11px 16px; border-radius: 8px; font-size: 13px; cursor: pointer;
  transition: all 0.15s; font-family: inherit; line-height: 1.4;
}
.opt-btn:hover { border-color: rgba(241,196,15,0.25); color: #ccc; background: rgba(255,255,255,0.03); }
.opt-btn.selected { background: rgba(241,196,15,0.08); border-color: rgba(241,196,15,0.45); color: #f1c40f; font-weight: 600; }

/* Footer del modal */
.modal-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 26px; gap: 14px; }
.answers-progress { flex: 1; }
.answers-progress span { font-size: 12px; color: #555; display: block; margin-bottom: 7px; }
.prog-bar { height: 4px; background: rgba(255,255,255,0.05); border-radius: 2px; overflow: hidden; }
.prog-fill { height: 100%; background: #f1c40f; border-radius: 2px; transition: width 0.35s ease; }

.btn-evaluate {
  display: flex; align-items: center; gap: 9px; background: #f1c40f; border: none;
  color: #000; padding: 14px 26px; border-radius: 12px; font-size: 13px; font-weight: 800;
  letter-spacing: 1px; cursor: pointer; transition: all 0.2s; flex-shrink: 0;
}
.btn-evaluate:hover:not(:disabled) { background: #f4d03f; transform: translateY(-1px); }
.btn-evaluate:disabled { opacity: 0.3; cursor: not-allowed; transform: none; }

.spinner {
  width: 15px; height: 15px; border: 2px solid rgba(0,0,0,0.25);
  border-top-color: #000; border-radius: 50%; animation: spin 0.55s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Resultado */
.result-diff {
  display: flex; align-items: center; gap: 18px;
  padding: 20px; border-radius: 14px; margin-bottom: 20px;
}
.result-diff.diff-facil   { background: rgba(39,174,96,0.07);  border: 1px solid rgba(39,174,96,0.22); }
.result-diff.diff-medio   { background: rgba(243,156,18,0.07); border: 1px solid rgba(243,156,18,0.22); }
.result-diff.diff-dificil { background: rgba(231,76,60,0.07);  border: 1px solid rgba(231,76,60,0.22); }

.result-diff-icon { flex-shrink: 0; }
.result-diff-label { flex: 1; }
.result-tier { display: block; font-size: 9px; font-weight: 700; letter-spacing: 2px; color: #555; margin-bottom: 5px; }
.result-value { font-size: 32px; font-weight: 800; color: #fff; }

.result-rewards { display: flex; flex-direction: column; gap: 7px; align-items: flex-end; }
.reward-chip { padding: 5px 12px; border-radius: 7px; font-size: 13px; font-weight: 800; letter-spacing: 1px; }
.xp-chip   { background: rgba(52,152,219,0.14); border: 1px solid rgba(52,152,219,0.28); color: #5dade2; }
.gold-chip { background: rgba(241,196,15,0.11); border: 1px solid rgba(241,196,15,0.24); color: #f1c40f; }

.result-reasoning {
  background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);
  border-radius: 12px; padding: 18px; margin-bottom: 22px;
}
.reasoning-label {
  display: flex; align-items: center; gap: 7px;
  font-size: 10px; font-weight: 700; letter-spacing: 1.5px; color: #555; margin-bottom: 10px;
}
.result-reasoning p { font-size: 15px; color: #aaa; line-height: 1.65; margin: 0; font-style: italic; }

.result-config { display: flex; align-items: center; gap: 14px; margin-bottom: 4px; flex-wrap: wrap; }
.diff-override { display: flex; align-items: center; gap: 8px; }
.diff-override-label { font-size: 12px; color: #555; font-weight: 600; letter-spacing: 1px; white-space: nowrap; }
.diff-chip {
  padding: 7px 14px; border-radius: 7px; font-size: 12px; font-weight: 700;
  cursor: pointer; border: 1px solid rgba(255,255,255,0.06); transition: all 0.15s;
  background: rgba(255,255,255,0.03); color: #666;
}
.diff-chip.chip-facil.active,   .diff-chip.chip-facil:hover   { border-color: #27ae60; color: #27ae60; background: rgba(39,174,96,0.1); }
.diff-chip.chip-medio.active,   .diff-chip.chip-medio:hover   { border-color: #f39c12; color: #f39c12; background: rgba(243,156,18,0.1); }
.diff-chip.chip-dificil.active, .diff-chip.chip-dificil:hover { border-color: #e74c3c; color: #e74c3c; background: rgba(231,76,60,0.1); }

.btn-back {
  display: flex; align-items: center; gap: 7px; background: transparent;
  border: 1px solid rgba(255,255,255,0.08); color: #666; padding: 14px 20px;
  border-radius: 12px; font-size: 14px; cursor: pointer; transition: all 0.2s;
}
.btn-back:hover { border-color: rgba(255,255,255,0.18); color: #aaa; }

.btn-forge-confirm {
  display: flex; align-items: center; gap: 9px; background: #f1c40f; border: none;
  color: #000; padding: 14px 28px; border-radius: 12px; font-size: 15px; font-weight: 800;
  letter-spacing: 1px; cursor: pointer; transition: all 0.2s;
}
.btn-forge-confirm:hover { background: #f4d03f; transform: translateY(-1px); }

/* Animación modal */
.modal-enter-active { transition: all 0.28s cubic-bezier(0.34,1.4,0.64,1); }
.modal-leave-active { transition: all 0.18s ease-in; }
.modal-enter-from   { opacity: 0; transform: scale(0.93) translateY(12px); }
.modal-leave-to     { opacity: 0; transform: scale(0.96); }
</style>