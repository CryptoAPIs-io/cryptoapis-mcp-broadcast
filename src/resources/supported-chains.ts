import type { SupportedChainsResource } from "@cryptoapis-io/mcp-shared";

/**
 * Supported blockchains, networks, and actions for the broadcast package.
 */
export const supportedChains: SupportedChainsResource = {
    evm: {
        blockchains: [
            "ethereum",
            "ethereum-classic",
            "binance-smart-chain",
            "tron",
            "polygon",
            "avalanche",
            "arbitrum",
            "base",
            "optimism",
        ],
        networks: {
            ethereum: ["mainnet", "sepolia"],
            "ethereum-classic": ["mainnet", "mordor"],
            "binance-smart-chain": ["mainnet", "testnet"],
            tron: ["mainnet", "nile"],
            polygon: ["mainnet", "amoy"],
            avalanche: ["mainnet", "fuji"],
            arbitrum: ["mainnet", "sepolia"],
            base: ["mainnet", "sepolia"],
            optimism: ["mainnet", "sepolia"],
        },
        actions: {
            "broadcast-signed-transaction": [
                "ethereum", "ethereum-classic", "binance-smart-chain", "tron",
                "polygon", "avalanche", "arbitrum", "base", "optimism",
            ],
        },
    },
    utxo: {
        blockchains: [
            "bitcoin",
            "bitcoin-cash",
            "litecoin",
            "dogecoin",
            "dash",
            "zcash",
        ],
        networks: {
            bitcoin: ["mainnet", "testnet"],
            "bitcoin-cash": ["mainnet", "testnet"],
            litecoin: ["mainnet", "testnet"],
            dogecoin: ["mainnet", "testnet"],
            dash: ["mainnet", "testnet"],
            zcash: ["mainnet", "testnet"],
        },
        actions: {
            "broadcast-signed-transaction": [
                "bitcoin", "bitcoin-cash", "litecoin", "dogecoin", "dash", "zcash",
            ],
        },
    },
};
