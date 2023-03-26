<script lang="ts">
import { RouterView } from "vue-router";

export default {
  components: {
    RouterView,
  },
  async created() {
    const baseUrl = import.meta.env.VITE_URL;
    const response = await fetch(`${baseUrl}data/data.json`);
    const file = await response.json();
    document.title = file.titulo_pagina;
    document.querySelector('meta[name="description"]')?.setAttribute("content", file.descripcion_pagina);
  },
};
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
