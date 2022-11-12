import { reactive } from "vue";
import { StoreInterface } from "../src/models";
import { mps } from "./metaplex.js";

export const store: StoreInterface = reactive({
  connected: false,
  activeWallet: null,
  setConnected: (connected: boolean) => (store.connected = connected),
  setActiveWallet: (wallet: string) => (store.activeWallet = wallet),
  metaplex: mps,
  /** what follows are general UI states which should be refactpred into their own module */
  nftData: {
    owner: "",
    mint: "",
    name: "",
    description: "",
    collection: "",
    attributes: [],
    image: "",
    tradeState: "",
    listing: null,
  },
});
