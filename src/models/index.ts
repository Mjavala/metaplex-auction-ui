import { Listing } from "@metaplex-foundation/js";
import { Metaplex } from "@metaplex-foundation/js/dist/types/Metaplex";
import { PublicKey } from "@solana/web3.js";

export interface StoreInterface {
  connected: boolean;
  activeWallet: string | null;
  metaplex: MetaplexInterface;
  nftData: nftMetadata;
  setConnected: Function;
  setActiveWallet: Function;
}

export interface nftMetadata {
  owner: string;
  mint: string;
  name: string;
  description: string;
  collection: string;
  image: string;
  attributes: any[];
  tradeStateAddress: PublicKey | null;
  listing: Listing | null;
}

export interface MetaplexInterface {
  app: Metaplex | null;
  walletNfts: any[] | null;
  auctionHouse: any | null;
  auctionHouseListings: any[];
  initialize: Function;
  setAuctionHouse: Function;
  getAllNftsForSale: Function;
  getAllWalletNfts: Function;
  checkListingTradeState: Function;
  listNft: Function;
  buy: Function;
  cancelListing: Function;
  /*
  findBid: Function;
  cancelBid: Function;
  bid: Function;
  */
}
