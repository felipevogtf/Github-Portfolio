<script lang="ts">
import type { SobreMiData } from "@/models/sobre-mi-data.model";
import { useElementVisibility } from "@vueuse/core";
import { ref } from "vue";

export default {
  name: "SobreMiComponent",
  props: {
    data: {
      type: Object as () => SobreMiData,
      required: true,
    },
  },
  data() {
    return {
      visibleCounter: false,
    };
  },
  setup() {
    const target = ref(null);
    const targetIsVisible = useElementVisibility(target);

    return {
      target,
      targetIsVisible,
    };
  },
  methods: {
    setVisible(): void {
      this.visibleCounter = true;
    },
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
  <div class="sobre-mi" ref="target">
    <!-- Inicio. Titulo -->
    <h2
      class="section-titulo"
      :class="fadeClass"
      style="animation-delay: 200ms"
    >
      {{ data.titulo }}
    </h2>
    <!-- Fin. Titulo -->

    <div class="contenido" :class="fadeClass" style="animation-delay: 300ms">
      <!-- Inicio. Parrafos -->
      <div class="contenido-descripcion">
        <p v-for="(item, index) in data.parrafos" class="parrafo" :key="index">
          {{ item }}
        </p>

        <div class="contenido-tecnologias">
          <div
            class="chips-icon"
            v-for="(item, index) in data.tecnologias"
            :key="index"
          >
            <img class="chips-icon-svg" :src="item.icono" :alt="item.nombre" :title="item.nombre"/>
            <span class="chips-icon-name">{{ item.nombre }}</span>
          </div>
        </div>
      </div>
      <!-- Fin. Parrafos -->

      <!-- Inicio. Imagen -->
      <div class="contenido-imagen">
        <a
          class="img-wrapper"
          :href="data.perfil_link"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img :src="data.imagen" :alt="data.titulo" :title="data.titulo"/>
        </a>
      </div>
      <!-- Fin. Imagen -->
    </div>
  </div>
</template>

<style lang="scss">
.sobre-mi {
  .contenido {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }

  .parrafo {
    margin-bottom: 20px;
  }

  .contenido-tecnologias {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  .contenido-imagen {
    display: flex;
    justify-content: center;
    flex-direction: row;
    margin-top: 100px;

    .img-wrapper {
      height: fit-content;
      overflow: hidden;
      border-radius: 50%;
      transition: background 400ms, box-shadow 500ms;
      box-shadow: 10px 10px 30px var(--primary-glow),
        -10px -10px 30px var(--secondary-glow);

      img {
        max-height: 300px;
        width: 100%;
        object-fit: cover;
        opacity: 0.7;
        transform: scale(1.1);
        filter: grayscale(30%);
        transition: filter 400ms, opacity 400ms;
      }
    }

    .img-wrapper:hover {
      cursor: pointer;
      background: none;
      box-shadow: 10px 10px 30px var(--secondary-glow),
        -10px -10px 30px var(--primary-glow);

      img {
        opacity: 1;
        filter: grayscale(10%);
      }
    }
  }
}

@media screen and (min-width: 992px) {
  .sobre-mi {
    .contenido {
      flex-direction: row;

      .contenido-descripcion {
        width: 50%;
      }

      .contenido-imagen {
        margin-top: 0;
        width: calc(50% - 20px);

        .img-wrapper {
          img {
            height: 400px;
            max-height: 400px;
            width: 400px;
          }
        }
      }
    }
  }
}
</style>
