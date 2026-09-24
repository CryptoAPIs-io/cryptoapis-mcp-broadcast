import type { CreditsPerBlockchain } from "@cryptoapis-io/mcp-shared";

/** Credits per blockchain (source: OpenAPI x-blockchain-specific-cost, verified live). */
export const credits: CreditsPerBlockchain = {
    ethereum: 50,
    "ethereum-classic": 65,
    "binance-smart-chain": 125,
    polygon: 100,
    avalanche: 90,
    arbitrum: 80,
    base: 60,
    optimism: 70,
    tron: 75,
    bitcoin: 50,
    "bitcoin-cash": 60,
    litecoin: 55,
    dogecoin: 55,
    dash: 55,
    zcash: 65,
    xrp: 50,
    solana: 150,
    tezos: 65,
};
