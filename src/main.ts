import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/styles/main.css";
import apolloProvider from "./apolloProvider";

const app = createApp(App);

app.use(router);
app.use(apolloProvider);

app.mount("#app");
