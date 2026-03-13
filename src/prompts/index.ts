import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { GetPromptResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { formatSupportedChains } from "@cryptoapis-io/mcp-shared";
import { supportedChains } from "../resources/supported-chains.js";

export function registerPrompts(server: McpServer): void {
    server.registerPrompt(
        "broadcast-transaction",
        {
            description: "Broadcast a signed transaction to the network",
            argsSchema: {
                blockchain: z.string().describe("Blockchain protocol (e.g. ethereum, bitcoin)"),
                network: z.string().describe("Network name (e.g. mainnet, testnet, sepolia)"),
                signedTransactionHex: z.string().describe("Hex-encoded signed transaction to broadcast"),
            },
        },
        (args): GetPromptResult => ({
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: `Broadcast the signed transaction to ${args.blockchain}/${args.network} using broadcast_signed_transaction. The signed transaction hex is: ${args.signedTransactionHex}. IMPORTANT: Broadcasting is irreversible — once sent, the transaction cannot be recalled. After broadcasting, report the transaction hash and any status information returned.\n\n${formatSupportedChains(supportedChains)}`,
                    },
                },
            ],
        }),
    );
}
