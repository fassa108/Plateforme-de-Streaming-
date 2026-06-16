<template>
  <router-link :to="`/album/${album.id}`" class="carte">

    <div class="image-container">
      <img :src="album.cover" :alt="album.titre" />

      <div class="overlay">
        <div class="play-btn">
          ▶
        </div>
      </div>
    </div>

    <div class="content">
      <h3>{{ album.titre }}</h3>
      <p>{{ album.recitateur }}</p>
    </div>

  </router-link>
</template>

<script setup>
defineProps({
  album: Object
})
</script>

<style scoped>
.carte {
  width: 220px;
  text-decoration: none;
  transition: .3s;
}

.carte:hover {
  transform: translateY(-6px);
}

.image-container {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
}

.image-container img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
  transition: .4s;
}

.carte:hover img {
  transform: scale(1.08);
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
      to top,
      rgba(0,0,0,.8),
      transparent
  );
  opacity: 0;
  transition: .3s;
}

.carte:hover .overlay {
  opacity: 1;
}

.play-btn {
  position: absolute;
  bottom: 15px;
  right: 15px;

  width: 50px;
  height: 50px;

  border-radius: 50%;
  background: #fbbf24;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #020617;
  font-size: 18px;
  font-weight: bold;
}

.content {
  padding-top: 12px;
}

.content h3 {
  color: white;
  font-size: 16px;
  margin-bottom: 5px;
}

.content p {
  color: #94a3b8;
  font-size: 13px;
}
</style>