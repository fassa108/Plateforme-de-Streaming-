<template>

  <div class="home">

    <div class="hero">
      <h1>Bibliothèque Coranique</h1>
      <p>Écoutez vos récitations préférées</p>
    </div>

    <section class="section">

      <h2>Nouveaux Albums</h2>

      <div class="albums-container">

        <CarteAlbum
          v-for="album in albums"
          :key="album.id"
          :album="album"
        />

      </div>

    </section>

  </div>

</template>

<script setup>
import CarteAlbum from '../components/CarteAlbum.vue'
import { albums } from '../data/albums'
</script>

<style scoped>
.home{
  min-height:100vh;

  background:#020617;

  color:white;
  padding:35px;
}

.hero{
  margin-bottom:50px;
}

.hero h1{
  font-size:55px;
  margin-bottom:10px;
  color:#facc15;
}

.hero p{
  color:#b3b3b3;
}

.section h2{
  margin-bottom:25px;
  font-size:28px;
}

.albums-container{
  display:grid;

  grid-template-columns:
  repeat(auto-fill,minmax(220px,1fr));

  gap:25px;
}
</style>