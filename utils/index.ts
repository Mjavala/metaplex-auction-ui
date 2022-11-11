// written in vue
import { useWallet } from "solana-wallets-vue";
import { useToast } from "vue-toastification";
import { store } from "../store";
import axios from "axios";
import { PublicKey } from "@solana/web3.js";
import * as auctions from "./auctions";
import { nftMetadata } from "../models";

export default auctions;

const toast = useToast();

/**
 * Helper function to hook into wallet initialization.
 * A loop runs every 2 seconds to see if a user has signed in.
 * If so, the metaplex store is initialized with the wallet as a signer and the loop ends.
 */
export const walletConnected = async () => {
  const id = setInterval(() => {
    const { wallet } = useWallet();
    if (wallet.value) {
      store.metaplex.initialize(wallet.value);
      store.connected = true;
      clearInterval(id);
    }
  }, 2000);
};

export const isConnected = () => {
  if (store.connected) return true;
  else {
    toast("Please Connect Wallet");
    return false;
  }
};

/**
 * Helper function to determine if solana is injected in the browser.
 * If so, the metaplex store is initialized with a guest identity to perform reads.
 */

export const solanaConnected = async () => {
  // @ts-ignore
  if (!window.solana) {
    toast("Solana Web3 Not Found");
  } else {
    store.metaplex.initialize(null);
  }
};

/**
 * Helper function to update the metaplex instance signer and other store variables
 */
export const handleWalletChange = async () => {
  setInterval(async () => {
    const { wallet } = useWallet();
    if (
      wallet.value?.publicKey &&
      wallet.value.publicKey?.toString() != store.activeWallet
    ) {
      // set new active wallet
      store.setActiveWallet(wallet.value.publicKey.toString());
      // reset state
      await store.metaplex.initialize(wallet.value);
    }
  }, 3000);
};

export const processNFTMetadata = async (nfts: any[]) => {
  const nftMetadatas: nftMetadata[] = [];
  const endpoints = nfts.map(({ uri }) => uri).filter((uri) => uri != "");

  const metadata = await axios.all(
    endpoints.map(async (endpoint: string) => await axios.get(endpoint))
  );
  // @ts-ignore
  metadata.forEach((item, index) => {
    nftMetadatas.push({
      owner: nfts[index].updateAuthorityAddress.toString(),
      mint: nfts[index].mintAddress.toString(),
      name: nfts[index].name,
      description: item.data.description,
      collection: item.data.collection.name,
      image: item.data.image,
      attributes: item.data.attributes,
      tradeStateAddress: null,
      listing: null,
    });
  });
  return nftMetadatas;
};

export const getProgramAccounts = async (
  programAddress: string,
  filters: any[]
) => {
  const accounts =
    await store.metaplex.app?.connection.getParsedProgramAccounts(
      new PublicKey(programAddress),
      { filters: filters }
    );

  if (accounts && accounts.length > 0) return accounts;
  else {
    toast("Utils: No accounts found");
    return undefined;
  }
};
