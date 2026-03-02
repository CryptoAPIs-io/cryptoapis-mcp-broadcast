import * as z from "zod";

export const BroadcastBlockchain = z.enum([
    "ethereum",
    "ethereum-classic",
    "binance-smart-chain",
    "tron",
    "polygon",
    "avalanche",
    "arbitrum",
    "base",
    "optimism",
    "bitcoin",
    "bitcoin-cash",
    "litecoin",
    "dogecoin",
    "dash",
    "zcash",
]);

export const BroadcastNetwork = z.enum([
    "mainnet",
    "mordor",
    "testnet",
    "nile",
    "sepolia",
    "amoy",
    "fuji",
]);
