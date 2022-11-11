import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createWebHistory } from "vue-router";
import createRouter from "./router/index";
// @ts-ignore
import { Row, Column, Hidden } from "vue-grid-responsive";
import SolanaWallets from "solana-wallets-vue";
import "solana-wallets-vue/styles.css";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import DotsHorizontal from "vue-material-design-icons/DotsHorizontal.vue";
import LocationExit from "vue-material-design-icons/LocationExit.vue";
import AccountCircle from "vue-material-design-icons/AccountCircle.vue";
import Refresh from "vue-material-design-icons/Refresh.vue";

import Toast, { PluginOptions } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

import "virtual:windi.css";

// @ts-ignore
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const router = createRouter(createWebHistory());

const options: PluginOptions = {
  // You can set your default options here
};

const walletOptions = {
  wallets: [
    new PhantomWalletAdapter(),
    new SlopeWalletAdapter(),
    new SolflareWalletAdapter({ network: WalletAdapterNetwork.Devnet }),
  ],
  autoConnect: true,
};

createApp(App)
  .use(SolanaWallets, walletOptions)
  .use(router)
  .use(Toast, options)
  .component("row", Row)
  .component("column", Column)
  .component("hidden", Hidden)
  .component("dots-horizontal", DotsHorizontal)
  .component("location-exit", LocationExit)
  .component("account-circle", AccountCircle)
  .component("refresh", Refresh)
  .mount("#app");
