<script lang="ts">
import type { ProyectosData } from "@/models/proyectos-data.model";
import { useElementVisibility } from "@vueuse/core";
import { ref } from "vue";
import type { Repository } from "@/models/github-data.model";

export default {
  name: "OtrosProyectosComponent",
  props: {
    data: {
      type: Object as () => ProyectosData,
      required: true,
    },
    hasMore: { Type: Boolean, required: true },
    isLoad: { Type: Boolean, required: true },
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
    mostrarMas(): void {
      this.$emit("mostrarMas", true);
    },
    capitalized(name: string) {
      const capitalizedFirst = name[0].toUpperCase();
      const rest = name.slice(1);
      return capitalizedFirst + rest;
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
  <div class="otros-proyectos" ref="target" :class="fadeClass">
    <!-- Inicio. Titulo -->
    <h2 class="section-titulo" style="animation-delay: 200ms">
      {{ data.titulo }}
    </h2>
    <!-- Fin. Titulo -->

    <div class="contenido" :class="fadeClass" style="animation-delay: 300ms">
      <TransitionGroup name="slide-up">
        <a
          class="wrap-card"
          v-for="(item, index) in repositories"
          :href="getLink(item)"
          rel="noopener noreferrer"
          target="_blank"
          v-bind:key="index"
        >
          <div class="card">
            <!-- Inicio. Chips -->
            <div class="chips">
              <span
                class="chip-span"
                v-for="(node, index) in item.repositoryTopics.nodes"
                :key="index"
              >
                {{ capitalized(node.topic.name) }}
              </span>
            </div>
            <!-- Fin. Chips -->

            <!-- Inicio. Texto  -->
            <h3 class="card-titulo">{{ item.name }}</h3>
            <p class="card-descripcion">{{ item.description }}</p>
            <!-- Fin. Texto -->

            <!-- Inicio. Botones -->
            <div class="card-opciones">
              <a
                class="icon-button"
                v-if="item.url"
                :href="item.url"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i class="fa-brands fa-github"></i>
              </a>
              <a
                class="icon-button"
                v-if="item.homepageUrl"
                :href="item.homepageUrl"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </div>
            <!-- Fin. Botones -->
          </div>
        </a>
      </TransitionGroup>
    </div>

    <Transition>
      <div class="mostrar-mas" v-if="hasMore">
        <button class="outline-button" v-on:click="mostrarMas()">
          <span class="spinner-button"
            ><i class="fa-solid fa-spinner fa-spin" v-if="isLoad"></i>
            {{ data.boton_mostrar_mas }}</span
          >
        </button>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss">
.otros-proyectos {
  .contenido {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
    width: 100%;

    .wrap-card {
      display: flex;
      background: linear-gradient(
        to right top,
        var(--primary),
        var(--secondary) 50%,
        var(--tertiary) 100%
      );
      padding: 3px;
      border-radius: 5px;
      transition: transform 200ms, box-shadow 200ms;
    }

    .card {
      display: flex;
      flex-direction: column;
      width: 100%;

      .card-opciones {
        margin-top: auto;
        display: flex;
        flex-direction: row;
        column-gap: 15px;
        justify-content: flex-end;
      }

      .card-titulo {
        margin-top: 20px;
        padding-bottom: 20px;
        color: var(--text);
        font-family: LatoBlack;
      }

      .card-descripcion {
        padding-bottom: 20px;
      }

      padding: 20px;
      background: var(--background);
      border-radius: 5px;
    }

    .wrap-card:hover {
      cursor: pointer;
      box-shadow: var(--box-shadows-2);
      transform: translateY(-10px);
    }
  }

  .mostrar-mas {
    margin-top: 50px;
    display: flex;
    width: 100%;
    justify-content: center;
  }
}
</style>
