<template>
  <router-link
    :to="`/album/${album.id}`"
    class="group block w-[220px] no-underline transition-all duration-300 hover:-translate-y-1"
  >
    <div class="relative overflow-hidden rounded-2xl bg-slate-900">

      <!-- IMAGE -->
      <img
        :src="album.cover"
        :alt="album.titre"
        class="h-[220px] w-full object-cover transition duration-300 group-hover:scale-105"
      />

      <!-- FAVORI -->
      <button
        @click.prevent="toggleFavori"
        class="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/90 text-yellow-400 shadow-lg transition hover:scale-110"
      >
        {{ estFavori ? '⭐' : '☆' }}
      </button>

      <!-- OVERLAY -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100"
      ></div>

      <!-- PLAY -->
      <div
        class="absolute bottom-3 right-3 z-10 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
      >
        <div
          class="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 text-slate-900 shadow-xl"
        >
          ▶
        </div>
      </div>

    </div>

    <!-- CONTENT -->
    <div class="mt-3">
      <h3 class="text-lg font-semibold text-white">
        {{ album.titre }}
      </h3>

      <p class="mt-1 text-sm text-slate-400">
        {{ album.recitateur }}
      </p>
    </div>
  </router-link>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  album: Object
})

const emit = defineEmits(['favoriChange'])

const favoris = ref(
  JSON.parse(localStorage.getItem('favoris') || '[]')
)

const estFavori = computed(() =>
  favoris.value.includes(props.album.id)
)

function toggleFavori() {
  if (estFavori.value) {
    favoris.value = favoris.value.filter(
      id => id !== props.album.id
    )
  } else {
    favoris.value.push(props.album.id)
  }

  localStorage.setItem(
    'favoris',
    JSON.stringify(favoris.value)
  )

  emit('favoriChange')
}
</script>