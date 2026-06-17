<template>
  <div class="app-layout">

    <!-- SIDEBAR -->
    <aside class="sidebar">

      <h2 class="logo">🎧 Quran App</h2>

      <nav>
        <p class="title">Bibliothèque</p>

        <ul>
          <li>📀 Albums</li>
          <li>❤️ Favoris</li>
          <li>⏱ Récents</li>
        </ul>

      </nav>

    </aside>

    <!-- CONTENT -->
    <main class="content">

      <router-view v-slot="{ Component }">
        <component
          :is="Component"
          @pisteChoisie="changerPiste"
        />
      </router-view>

    </main>

    <!-- LECTEUR (GARDÉ COMME TU AIMES) -->
    <div class="lecteur">

      <div v-if="!sourateActuelle" class="lecteur-vide">
        🎧 Aucune sourate sélectionnée
      </div>

      <div v-else class="lecteur-actif">

        <div class="cover-mini">
          <img
            v-if="sourateActuelle.cover"
            :src="sourateActuelle.cover"
            alt="cover"
          >
          <div v-else class="placeholder">🎵</div>
        </div>

        <div class="infos">
          <p class="titre">{{ sourateActuelle.titre }}</p>
          <p class="recitateur">
            {{ sourateActuelle.recitateur || 'Récitation' }}
          </p>
        </div>

        <audio
          ref="audioRef"
          :src="sourateActuelle.audio"
          controls
          autoplay
        />

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const sourateActuelle = ref(null)
const audioRef = ref(null)

function changerPiste(piste) {
  sourateActuelle.value = piste
}

watch(sourateActuelle, async () => {
  if (audioRef.value) {
    audioRef.value.load()
    try {
      await audioRef.value.play()
    } catch (e) {
      console.log(e)
    }
  }
})
</script>

<style scoped>
.app-layout{
  display:flex;
  height:100vh;
  background:#020617;
  color:white;
}

/* SIDEBAR */
.sidebar{
  width:250px;
  background:#0b1220;
  padding:20px;
  border-right:1px solid #1e293b;
  box-sizing: border-box;
}

.logo{
  color:#fbbf24;
  margin-bottom:30px;
}

.title{
  color:#94a3b8;
  font-size:14px;
  margin-bottom:10px;
}

.sidebar ul{
  list-style:none;
  padding:0;
}

.sidebar li{
  padding:10px;
  margin-bottom:8px;
  border-radius:8px;
  cursor:pointer;
}

.sidebar li:hover{
  background:#1e293b;
}

/* CONTENT */
.content{
  flex:1;
  overflow-y:auto;
  padding:20px;
  padding-bottom:120px;
}

/* LECTEUR (SANS CHANGEMENT) */
.lecteur{
  position:fixed;
  bottom:0;
  left:250px;
  right:8px;
  background:#0b1220;
  border-top:1px solid #1e293b;
  padding:10px 15px;
  box-sizing: border-box;
}

.lecteur-actif{
  display:flex;
  align-items:center;
  gap:15px;
}

.cover-mini img{
  width:50px;
  height:50px;
  border-radius:10px;
  object-fit:cover;
  border:2px solid #fbbf24;
}

.placeholder{
  width:50px;
  height:50px;
  display:flex;
  align-items:center;
  justify-content:center;
  background:#020617;
  border-radius:10px;
  border:1px solid #1e293b;
}

.infos{
  flex:1;
}

.titre{
  font-weight:bold;
  margin:0;
}

.recitateur{
  font-size:12px;
  color:#94a3b8;
  margin:0;
}
</style>