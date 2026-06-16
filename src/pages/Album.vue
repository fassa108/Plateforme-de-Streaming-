<template>
  <div class="album-view">

    <router-link class="back" to="/">
      ← Retour
    </router-link>

    <div v-if="!album">
      Album introuvable
    </div>

    <div v-else>

      <div class="album-header">

        <img :src="album.cover" />

        <div class="album-info">
          <span class="type">ALBUM</span>

          <h1>{{ album.titre }}</h1>

          <p>{{ album.recitateur }}</p>

          <span class="genre">
            {{ album.genre }}
          </span>
        </div>

      </div>

      <div class="liste-sourates">

        <h2>Sourates</h2>

        <LigneSourate
          v-for="piste in album.pistes"
          :key="piste.id"
          :piste="piste"
          @play="jouerPiste"
        />

      </div>

      <audio
        ref="player"
        controls
        class="player"
      ></audio>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { albums } from '../data/albums.js'
import LigneSourate from '../components/LigneSourate.vue'

const route = useRoute()
const album = ref(null)
const player = ref(null)

function jouerPiste(piste) {
  if (player.value) {
    player.value.src = piste.audio
    player.value.play()
  }
}

onMounted(() => {
  const id = Number(route.params.id)
  album.value = albums.find(a => a.id === id)
})
</script>

<style scoped>
.album-view {
  min-height: 100vh;
  background: #020617;
  color: white;
  padding: 30px;
}

.back {
  text-decoration: none;
  color: #fbbf24;
  font-weight: bold;
}

.album-header {
  display: flex;
  gap: 30px;
  align-items: center;

  margin-top: 20px;
  margin-bottom: 35px;

  background: linear-gradient(
      135deg,
      #0f172a,
      #1e293b
  );

  padding: 30px;
  border-radius: 20px;
}

.album-header img {
  width: 260px;
  height: 260px;
  object-fit: cover;
  border-radius: 20px;
  border: 3px solid #fbbf24;
}

.album-info h1 {
  font-size: 48px;
  color: #fbbf24;
  margin: 10px 0;
}

.album-info p {
  color: #cbd5e1;
  font-size: 18px;
}

.type {
  color: #94a3b8;
  font-size: 12px;
  letter-spacing: 2px;
}

.genre {
  display: inline-block;
  margin-top: 15px;
  background: #fbbf24;
  color: #020617;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: bold;
}

.liste-sourates {
  background: #0f172a;
  border-radius: 20px;
  padding: 20px;
}

.liste-sourates h2 {
  margin-bottom: 20px;
}

.player {
  width: 100%;
  margin-top: 20px;
}

@media(max-width:768px){

  .album-header{
    flex-direction:column;
    text-align:center;
  }

  .album-header img{
    width:220px;
    height:220px;
  }

  .album-info h1{
    font-size:32px;
  }
}
</style>