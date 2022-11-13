import { markRaw, reactive } from "vue";
import { useWallet } from "solana-wallets-vue";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import {
  Bid,
  guestIdentity,
  Listing,
  Metaplex,
  sol,
  walletAdapterIdentity,
  WalletAdapter,
  lamports,
  formatAmount,
} from "@metaplex-foundation/js";
import { AUCTION_HOUSE_INSTANCE, AUCTION_HOUSE_PROGRAM } from "../constants";
import { getProgramAccounts, processNFTMetadata } from "../utils";
import { getAllListingsFilter } from "../utils/auctions";
import { MetaplexInterface } from "../models";

import { useToast } from "vue-toastification";
const toast = useToast();

export const mps: MetaplexInterface = reactive({
  app: null,
  auctionHouse: null,
  auctionHouseListings: [],
  walletNfts: null,
  initialize: async (wallet: any) => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    if (wallet) {
      mps.app = markRaw(
        Metaplex.make(connection).use(
          // @ts-ignore
          walletAdapterIdentity(wallet)
        )
      );
    } else {
      mps.app = markRaw(Metaplex.make(connection).use(guestIdentity()));
    }

    if (!mps.auctionHouse) await mps.setAuctionHouse();
  },
  setAuctionHouse: async () => {
    if (!mps.app) return;

    mps.auctionHouse = markRaw(
      await mps.app
        .auctions()
        .findAuctionHouseByAddress(new PublicKey(AUCTION_HOUSE_INSTANCE))
        .run()
    );
  },
  getAllNftsForSale: async () => {
    if (!mps.app) return;

    console.log("here");
    try {
      const accounts = await getProgramAccounts(
        AUCTION_HOUSE_PROGRAM,
        getAllListingsFilter()
      );

      if (!accounts) return;

      if (accounts.length == 0) {
        toast("No Listings Available...");
      }

      if (!mps.auctionHouse) await mps.setAuctionHouse();

      for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].account.data) {
          const { listing, tradeState } = await mps.checkListingTradeState(
            accounts[i].account.data
          );
          if (listing) {
            const mint = new PublicKey(listing.asset.address.toString());
            // @ts-ignore
            const nft = await mps.app
              .nfts()
              .findByMint({ mintAddress: mint })
              .run();

            if (nft.jsonLoaded && nft.json) {
              mps.auctionHouseListings?.push({
                owner: listing.sellerAddress.toString(),
                mint: mint.toString(),
                // @ts-ignore
                name: nft.json.name,
                description: nft.json.description,
                collection: nft.json.collection,
                image: nft.json.image,
                attributes: nft.json.attributes,
                tradeStateAddress: tradeState,
                listing: listing,
              });
            }
          }
        }
      }
      return mps.auctionHouseListings;
    } catch (error) {
      console.log(error);
    }
  },
  getAllWalletNfts: async () => {
    if (mps.app == null) return;

    const { publicKey } = useWallet();

    if (!publicKey.value) return;

    const nfts = await mps.app
      .nfts()
      .findAllByOwner({ owner: publicKey.value! })
      .run();

    mps.walletNfts = await processNFTMetadata(nfts);
    return mps.walletNfts;
  },
  listNFT: async (mint: string, price: number) => {
    if (mps.app == null) return;

    const auctionHouse = await mps.app
      .auctions()
      .findAuctionHouseByAddress(new PublicKey(AUCTION_HOUSE_INSTANCE))
      .run();

    await mps.app
      .auctions()
      .for(auctionHouse)
      .list({
        mintAccount: new PublicKey(mint),
        price: sol(price),
        printReceipt: true,
      })
      .run();
  },
  checkListingTradeState: async (account: any) => {
    if (mps.app == null) return;

    const tradeState = new PublicKey(
      /*@ts-ignore*/
      //accounts[i].account.data.slice(8, 8 + 32)
      account.slice(8, 40)
    );
    try {
      const listing = await mps.app
        .auctions()
        .for(mps.auctionHouse)
        .findListingByAddress(new PublicKey(tradeState))
        .run();

      if (
        listing.purchaseReceiptAddress == null &&
        listing.canceledAt == null
      ) {
        // active listing with no purchase
        return { listing, tradeState };
      } else {
        return { undefined, tradeState };
      }
    } catch (e) {
      console.log(`checkListingTradeState Error: ${e} `);
    }
  },
  listNft: async (mint: string, price: number) => {
    if (!mps.app || !mps.auctionHouse) return;

    const task = await mps.app
      .auctions()
      .for(mps.auctionHouse)
      .list({
        mintAccount: new PublicKey(mint),
        price: sol(price),
        printReceipt: true,
      })
      .run();
  },
  cancelListing: async (nft: Listing) => {
    if (!mps.app || !mps.auctionHouse) return;

    const task = await mps.app
      .auctions()
      .for(mps.auctionHouse)
      .cancelListing({ listing: nft })
      .run();
  },
  buy: async (wallet: PublicKey, mint: PublicKey, listing: Listing) => {
    if (!mps.app || !mps.auctionHouse) return;

    const { bid } = await mps.app
      .auctions()
      .for(mps.auctionHouse)
      .bid({ buyer: wallet, mintAccount: mint })
      .run();

    const purchase = await mps.app
      .auctions()
      .for(mps.auctionHouse)
      .executeSale({
        listing: listing,
        bid: bid,
      })
      .run();
  },
  /*
  findBid: async (tradeState: any) => {
    if (!mps.app || !mps.auctionHouse) return;

    const task = await mps.app
      .auctions()
      .for(mps.auctionHouse)
      // @ts-ignore
      .findBidByTradeState(tradeState)
      .run();

    console.log(task);
  },

 fundWalletBids: async (wallet: WalletAdapter) => {
  if (!mps.app || !mps.auctionHouse) return;

  const task = await mps.app.auctions().for(mps.auctionHouse)

 },
  cancelBid: async (b: Bid) => {
    if (!mps.app || !mps.auctionHouse) return;

    const task = await mps.app
      .auctions()
      .for(mps.auctionHouse)
      .cancelBid({ bid: b });
  },
  */
});
