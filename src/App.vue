<template>
  <div class="flex h-screen bg-slate-950 text-white">

    <!-- SIDEBAR / HEADER -->
    <aside
      class="fixed left-0 top-0 w-full lg:w-[250px] lg:h-full bg-slate-900 border-b lg:border-b-0 lg:border-r border-slate-800 z-30"
    >
      <!-- HEADER MOBILE -->
      <div class="flex items-center justify-between px-4 py-3 lg:hidden">
        <h2 class="text-xl font-bold text-yellow-400">
          Quran App
        </h2>

        <button
          type="button"
          class="p-2 rounded-md border border-slate-700 text-slate-200 hover:bg-slate-800"
          @click="menuOuvert = !menuOuvert"
        >
          <span v-if="!menuOuvert">☰</span>
          <span v-else>✕</span>
        </button>
      </div>

      <!-- MENU MOBILE -->
      <nav
        class="px-4 pb-3 lg:hidden"
        v-if="menuOuvert"
      >
        <p class="mb-3 text-xs text-slate-400">
          Bibliothèque
        </p>

        <ul class="space-y-1">
          <li>
            <router-link
              to="/"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white transition hover:bg-slate-800"
              active-class="bg-slate-800 text-yellow-400 font-bold"
              @click="menuOuvert = false"
            >
              <LibraryBig :size="18" />
              <span>Albums</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/favoris"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white transition hover:bg-slate-800"
              active-class="bg-slate-800 text-yellow-400 font-bold"
              @click="menuOuvert = false"
            >
              <Star :size="18" />
              <span>Favoris</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/recents"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white transition hover:bg-slate-800"
              active-class="bg-slate-800 text-yellow-400 font-bold"
              @click="menuOuvert = false"
            >
              <History :size="18" />
              <span>Récents</span>
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- SIDEBAR DESKTOP (inchangé visuellement) -->
      <div class="hidden lg:block h-full p-5">
        <h2 class="mb-8 text-2xl font-bold text-yellow-400">
          Quran App
        </h2>

        <nav>
          <p class="mb-3 text-sm text-slate-400">
            Bibliothèque
          </p>

          <ul class="space-y-2">
            <li>
              <router-link
                to="/"
                class="flex items-center gap-3 rounded-lg p-3 text-white transition hover:bg-slate-800"
                active-class="bg-slate-800 text-yellow-400 font-bold"
              >
                <LibraryBig :size="20" />
                <span>Albums</span>
              </router-link>
            </li>

            <li>
              <router-link
                to="/favoris"
                class="flex items-center gap-3 rounded-lg p-3 text-white transition hover:bg-slate-800"
                active-class="bg-slate-800 text-yellow-400 font-bold"
              >
                <Star :size="20" />
                <span>Favoris</span>
              </router-link>
            </li>

            <li>
              <router-link
                to="/recents"
                class="flex items-center gap-3 rounded-lg p-3 text-white transition hover:bg-slate-800"
                active-class="bg-slate-800 text-yellow-400 font-bold"
              >
                <History :size="20" />
                <span>Récents</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>

    <!-- CONTENT -->
    <main
      class="pt-[56px] lg:pt-0 lg:ml-[250px] flex-1 overflow-y-auto p-4 lg:p-5 pb-32"
    >

      <router-view v-slot="{ Component }">
        <component
          :is="Component"
          @pisteChoisie="changerPiste"
        />
      </router-view>

    </main>

    <!-- PLAYER -->
    <div
      class="fixed bottom-0 left-0 right-0 lg:left-[270px] lg:right-5 border-t lg:border border-slate-800 rounded-none lg:rounded-t-xl bg-slate-900 px-3 lg:px-4 py-2 lg:py-3 shadow-lg"
    >

      <div
        v-if="!sourateActuelle"
        class="text-slate-400"
      >
        🎧 Aucune sourate sélectionnée
      </div>

      <div
        v-else
        class="flex items-center gap-3 lg:gap-4"
      >

        <div>
          <img
            v-if="sourateActuelle.cover"
            :src="sourateActuelle.cover"
            alt="cover"
            class="h-[40px] w-[40px] lg:h-[50px] lg:w-[50px] rounded-lg border-2 border-yellow-400 object-cover"
          >

          <div
            v-else
            class="flex h-[40px] w-[40px] lg:h-[50px] lg:w-[50px] items-center justify-center rounded-lg border border-slate-700 bg-slate-950"
          >
            🎵
          </div>
        </div>

        <div class="flex-1 min-w-0">
          <p class="font-bold truncate">
            {{ sourateActuelle.titre }}
          </p>

          <p class="text-xs text-slate-400 truncate">
            {{ sourateActuelle.recitateur || 'Récitation' }}
          </p>
        </div>

        <audio
          ref="audioRef"
          :src="sourateActuelle.audio"
          controls
          autoplay
          class="w-[140px] lg:w-[260px]"
        />
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

import {
  LibraryBig,
  Star,
  History
} from 'lucide-vue-next'

const sourateActuelle = ref(null)
const audioRef = ref(null)
const menuOuvert = ref(false)

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


