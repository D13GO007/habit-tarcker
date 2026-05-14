<template>
  <RouterView />
</template>

<style>
/* Reset absoluto de "Modo Juego" */
* {
  box-sizing: border-box;
  user-select: none;
}

body, html, #app {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background-color: #08080a;
  color: #e0e0e0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow: visible;
}

html {
  pointer-events: auto;
}

body {
  background-color: #08080a;
}

/* Scrollbar estilo Cyberpunk/RPG */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
::-webkit-scrollbar-thumb { 
  background: #f1c40f; 
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(241, 196, 15, 0.5);
}
</style>
