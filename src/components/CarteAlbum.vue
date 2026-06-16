<template>
  <div class="carte">
    <img :src="album.cover" :alt="album.titre" />
    <h3>{{ album.titre }}</h3>
    <p>{{ album.recitateur }}</p>
    <router-link :to="`/album/${album.id}`">
      Voir les sourates
    </router-link>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';

defineProps(['album'])
</script>