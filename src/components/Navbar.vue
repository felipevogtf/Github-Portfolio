<script lang="ts">
import type { NavbarData } from "@/models/navbar-data.model";
import { useElementVisibility } from "@vueuse/core";
import { ref } from "vue";

export default {
  name: "NavbarComponent",
  props: {
    data: {
      type: Object as () => NavbarData,
      required: true,
    },
  },
  data() {
    return {
      showMobileMenu: false,
      visibleCounter: false,
    };
  },
  methods: {
    showMenu(): void {
      this.showMobileMenu = !this.showMobileMenu;
    },
    handleFocusOut(): void {
      setTimeout(() => {
        this.showMobileMenu = false;
      }, 100);
    },
    setVisible(): void {
      this.visibleCounter = true;
    },
    getOpenClass(): string {
      return this.showMobileMenu ? "open-menu" : "closed-menu";
    },
    getShowMenuClass(): string {
      return this.showMobileMenu ? "active-toggle" : "";
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
  <div class="nav" ref="target">
    <div
      class="nav-menu"
      :class="fadeClass"
      style="animation-delay: 200ms"
      @focusout="handleFocusOut"
      tabindex="0"
    >
      <!-- Inicio. Logo -->
      <router-link to="/" class="logo">
        <img class="logo-img" :src="data.logo" alt="logo" title="logo"/>
      </router-link>
      <!-- Fin. Logo -->

      <!-- Inicio. Toggle button -->
      <div class="nav-toggle" @click="showMenu()" :class="getShowMenuClass()">
        <i class="fas fa-bars"> </i>
      </div>
      <!-- Fin. Toggle button -->

      <!-- Inicio. Menus -->
      <div class="nav-content" :class="getOpenClass()">
        <a
          class="nav-link"
          v-for="(item, index) in data.items"
          :key="index"
          :href="`#${item.id}`"
          >{{ item.nombre }}</a
        >

        <a
          class="outline-button"
          rel="noopener noreferrer"
          target="_blank"
          :href="data.curriculum.link"
          v-if="data.curriculum.link"
          ><span>{{ data.curriculum.nombre }}</span></a
        >
      </div>
      <!-- Fin. Menus -->
    </div>
  </div>
</template>

<style lang="scss">
.nav-menu {
  color: var(--text);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0px 20px;
}
.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 20px;
  padding: 20px 0px;
  a.nav-link {
    color: var(--text);
    transition: color 200ms;
    font-size: var(--font-l);
  }
  a.nav-link:hover {
    color: var(--primary);
  }
}
.nav-toggle {
  visibility: hidden;
}
.logo {
  margin: 0;
  display: flex;
  align-items: center;

  .logo-img {
    height: 40px;
  }
}

.outline-button span {
  padding: 10px 20px;
  font-size: var(--font-l);
}

@media screen and (max-width: 992px) {
  .nav-menu {
    padding: 0;
    position: absolute;
    width: 100%;
    z-index: 100;
  }
  .logo {
    margin: 0px 10px;
  }
  .nav-toggle {
    visibility: visible;
    transition: background 200ms;

    padding-top: 12px;
    padding-left: 15px;
    padding-right: 15px;
  }
  .nav-toggle:hover {
    cursor: pointer;
    background: var(--background-opacity);
  }

  .active-toggle {
    background: var(--background-opacity);
  }

  .active-toggle:hover {
    background: var(--background-opacity);
  }

  .open-menu {
    opacity: 1;
    height: 300px;
  }
  .closed-menu {
    opacity: 0;
    height: 0;
    padding: 0;
  }
  .nav-content {
    background: var(--background-opacity);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    flex-direction: column;
    z-index: 100;
    position: relative;
    transition: all 0.2s ease-out;
    flex-basis: 100%;
    box-shadow: 10px 30px 20px 10px rgba(0, 0, 0, 0.75);
    a.nav-link {
      color: var(--text);
    }
    a.nav-link:hover {
      color: var(--primary);
    }
  }
}
</style>
