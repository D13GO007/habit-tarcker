<template>
  <header>
    <nav>
      <RouterLink to="/login">Login</RouterLink> |
      <RouterLink to="/register">Registro</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
nav { padding: 20px; text-align: center; }
</style>
