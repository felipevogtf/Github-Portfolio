<script lang="ts">
import type { Repository } from "@/models/github-data.model";
import type { ProyectosData } from "@/models/proyectos-data.model";
import { useElementVisibility } from "@vueuse/core";
import { ref } from "vue";

export default {
  name: "ProyectosComponent",
  props: {
    data: {
      type: Object as () => ProyectosData,
      required: true,
    },
    repositories: {
      type: Object as () => Repository[],
      required: true,
    },
  },
  data() {
    return {
      visibleCounter: false,
    };
  },
  methods: {
    getLink(proyecto: Repository): string {
      let link: string = "";
      if (proyecto.homepageUrl) {
        link = proyecto.homepageUrl;
      } else if (proyecto.url) {
        link = proyecto.url;
      }

      return link;
    },
    setVisible(): void {
      this.visibleCounter = true;
    },
    getPositionClass(index: number): string {
      return index % 2 === 0 ? "position-left" : "position-right";
    },
  },
  setup() {
    const target = ref(null);
    const targetIsVisible = useElementVisibility(target);

    return {
      target,
      targetIsVisible,
    };
  },
  computed: {
    fadeClass() {
      if (this.targetIsVisible && !this.visibleCounter) {
        this.setVisible();
        return "fade-in fade-in-animation";
      } else {
        return "";
      }
    },
  },
};
</script>

<template>
  <div class="proyectos" ref="target">
    <!-- Inicio. Titulo -->
    <h2
      class="section-titulo"
      :class="fadeClass"
      style="animation-delay: 200ms"
    >
      {{ data.titulo }}
    </h2>
    <!-- Fin. Titulo -->

    <div class="contenido">
      <div
        class="proyecto"
        :class="[fadeClass, getPositionClass(index)]"
        style="animation-delay: 300ms"
        v-for="(item, index) in repositories"
        :key="index"
      >
        <!-- Inicio. Imagen -->
        <a
          class="img-wrapper"
          :href="getLink(item)"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img :src="item.openGraphImageUrl" :alt="item.name" />
        </a>
        <!-- Fin. Imagen -->

        <!-- Inicio. Tarjeta -->
        <div class="proyecto-card" :class="getPositionClass(index)">
          <div class="chips">
            <span
              class="chip-span"
              v-for="(node, index) in item.repositoryTopics.nodes"
              :key="index"
            >
              {{ node.topic.name }}
            </span>
          </div>
          <h3 class="text-accent">{{ item.name }}</h3>
          <p class="proyecto-descripcion">
            {{ item.description }}
          </p>

          <div class="botonera">
            <a
              class="icon-button text-h3"
              v-if="item.url"
              :href="item.url"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i class="fa-brands fa-github"></i>
            </a>
            <a
              class="icon-button text-h3"
              v-if="item.homepageUrl"
              :href="item.homepageUrl"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        </div>
        <!-- Fin. Tarjeta -->
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.proyectos {
  .contenido {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    row-gap: 30px;
  }

  .proyecto {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    h3 {
      margin-top: 20px;
      font-family: LatoBlack;
      color: var(--text);
    }

    .proyecto-card {
      display: flex;
      flex-direction: column;
      color: var(--text);
      padding: 50px;

      border-radius: 5px;
      backdrop-filter: blur(10px);

      background-position: center;

      background: rgba(0, 0, 0, 0.8);
      box-shadow: var(--box-shadows);
    }

    .proyecto-descripcion {
      margin-top: 10px;
      color: var(--text-opacity);
    }

    .botonera {
      display: flex;
      flex-direction: row-reverse;
      margin-top: 40px;
      justify-content: flex-end;
      column-gap: 20px;

      .icon-button {
        font-size: var(--font-xxl);
      }
    }
  }

  .img-wrapper {
    width: 100%;
    height: 100%;
    position: absolute;

    display: flex;
    overflow: hidden;
    border-radius: 5px;
    box-shadow: var(--box-shadows);

    transition: background 400ms;

    img {
      object-fit: cover;
      opacity: 0.7;
      width: 100%;
      filter: grayscale(30%);
      transition: filter 400ms, opacity 400ms;
    }
  }

  .img-wrapper:hover {
    cursor: pointer;
    background: none;
    img {
      opacity: 1;
      filter: grayscale(10%);
    }
  }

  .chips {
    margin-top: 10px;
  }
}

@media screen and (min-width: 992px) {
  .proyectos {
    .contenido {
      row-gap: 100px;
    }

    .proyecto {
      position: static;
      .proyecto-card {
        width: 60%;
        position: relative;
        padding: 20px;
        background: rgba(0, 0, 0, 0.8) !important;
        box-shadow: var(--box-shadows);
      }
    }
    .position-left {
      flex-direction: row;
      .proyecto-card {
        left: -100px;
      }

      .botonera {
        flex-direction: row;
      }
    }

    .position-right {
      flex-direction: row-reverse;
      .proyecto-card {
        right: -100px;
      }

      .botonera {
        flex-direction: row-reverse;
      }
    }

    .img-wrapper {
      position: initial;
      height: auto;
      width: 60%;
    }
  }
}
</style>
