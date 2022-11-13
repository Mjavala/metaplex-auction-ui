
export const LISTING_RECEIPT_SIZE =
  8 + // key
  32 + // trade_state
  32 + // bookkeeper
  32 + // auction_house
  32 + // seller
  32 + // metadata
  1 +
  32 + // purchase_receipt
  8 + // price
  8 + // token_size
  1 + // bump
  1 + // trade_state_bump
  8 + // created_at
  1 +
  8; // canceled_at;

const ListingReceiptPosition = {
  Key: 0,
  TradeState: 8,
  BookKeeper: 8 + 32,
  AuctionHouse: 8 + 32 + 32,
  Seller: 8 + 32 + 32 + 32,
  Metadata: 8 + 32 + 32 + 32 + 32,
};

export const getAllListingsFilter = () => {
  //@ts-ignore
  return [
    {
      memcmp: {
        offset: ListingReceiptPosition.AuctionHouse,
        bytes: import.meta.env.VITE_AUCTION_HOUSE_INSTANCE,
      },
    },
    {
      dataSize: LISTING_RECEIPT_SIZE,
    },
  ];
};

export const getUserListingsFilter = (wallet: string) => {
  return [
    {
      memcmp: {
        offset: ListingReceiptPosition.AuctionHouse,
        bytes: import.meta.env.VITE_AUCTION_HOUSE_INSTANCE,
      },
    },
    {
      memcmp: {
        offset: ListingReceiptPosition.Seller,
        bytes: wallet,
      },
    },
    {
      dataSize: LISTING_RECEIPT_SIZE,
    },
  ];
};
