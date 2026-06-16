<template>
  <div>
    
    <CarteAlbum 
      v-for="album in albums"    
      :key="album.id"
      :album="album"           
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { albums as tousLesAlbums } from '../data/albums.js'
import CarteAlbum from '../components/CarteAlbum.vue'

const albums = ref([])

onMounted(() => {
  albums.value = tousLesAlbums   
})
</script>