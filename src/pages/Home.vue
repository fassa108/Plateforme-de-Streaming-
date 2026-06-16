<template>
  <div class="home">

    <div class="hero">
      <h1>Bibliothèque Coranique</h1>
      <p>Écoutez les récitations de vos récitateurs préférés</p>
    </div>

    <section class="section">
      <h2>Nouveaux Albums</h2>

      <div class="albums-container">
        <CartAlbum
          v-for="album in albums"
          :key="album.id"
          :album="album"
        />
      </div>
    </section>

  </div>
</template>

<script setup>
import CartAlbum from '../components/CarteAlbum.vue'
import { albums } from '../data/albums.js'
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: #020617;
  color: white;
  padding: 30px;
}

.hero {
  margin-bottom: 50px;
}

.hero h1 {
  font-size: 42px;
  color: #fbbf24;
  margin-bottom: 10px;
}

.hero p {
  color: #94a3b8;
}

.section h2 {
  margin-bottom: 25px;
  font-size: 30px;
}

.albums-container {
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
}
</style>