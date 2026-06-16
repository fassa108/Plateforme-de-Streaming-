<script setup></script>

<template>
  <div class="layout">

    <!-- SIDEBAR -->
    <aside class="sidebar">
      <h2 class="logo">🎧 Sunu-music</h2>

      <nav>
        <RouterLink to="/" class="link"> Album</RouterLink>
        <RouterLink to="/favoris" class="link">Favoris</RouterLink>
      </nav>
    </aside>

    <!-- CONTENU -->
    <main class="content">
      <RouterView />
    </main>

  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  background: #0b1220;
  color: white;
}

/* SIDEBAR */
.sidebar {
  width: 220px;
  background: #111c36;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(255,255,255,0.05);
}

.logo {
  color: #fbbf24;
  margin-bottom: 30px;
  font-size: 18px;
}

/* LINKS */
.link {
  display: block;
  padding: 10px;
  margin-bottom: 10px;
  color: #cbd5e1;
  text-decoration: none;
  border-radius: 8px;
  transition: 0.3s;
}

.link:hover {
  background: #1e293b;
  color: #fbbf24;
}

/* CONTENT */
.content {
  flex: 1;
  padding: 20px;
}
</style>