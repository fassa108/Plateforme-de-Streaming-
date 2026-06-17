<template>

  <div class="home">

    <div class="hero">
      <div class="left">
        <h1>Bibliothèque Coranique</h1>
        <p>Écoutez vos récitations préférées</p>
      </div>
      <div class="right">
        <div class="recherche">
          <input 
            type="text"
            placeholder="Rechercher un album ou recitateur"
            :value="recherche"
            @input="recherche = $event.target.value"
          />
        </div>
      </div>
    </div>

    <section class="section">

      <h2>Nouveaux Albums</h2>

      <div class="albums-container">

        <CarteAlbum
          v-for="album in albumsFiltres"
          :key="album.id"
          :album="album"
        />

      </div>
      <p v-if="albumsFiltres.length === 0">
        Aucun album trouvé pour "{{ recherche }}"
      </p>
     

    </section>

  </div>

</template>

<script setup>
import { ref, computed } from 'vue'
import CarteAlbum from '../components/CarteAlbum.vue'
import { albums } from '../data/albums'

const recherche = ref('')

const albumsFiltres = computed(() => {
  if (recherche.value === '') {
    return albums  // retourne tout si recherche vide
  }
  return albums.filter(album =>
    album.titre.toLowerCase().includes(recherche.value.toLowerCase()) ||
    album.recitateur.toLowerCase().includes(recherche.value.toLowerCase())
  )
})
</script>

<style scoped>
.home{
  min-height:100vh;
  background:#020617;
  color:white;
  padding:35px;
}

.hero{
  display: flex;
  justify-content: space-between;
  align-items: end;
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

.recherche {
  display: flex;
  justify-content: right;
  min-width: 300px;
  margin-bottom: 20px;
}

.recherche input {
  width: 100%;
  padding: 12px 20px;
  border-radius: 25px;
  border: 2px solid #fbbf24;
  background: #1e293b;
  color: white;
  font-size: 16px;
  outline: none;
}

.recherche input::placeholder {
  color: #94a3b8;
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