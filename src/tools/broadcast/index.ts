import type { CryptoApisHttpClient, RequestResult } from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { BroadcastToolSchema, type BroadcastToolInput } from "./schema.js";
import { broadcastLocallySignedTransaction } from "../../api/broadcast/broadcast-locally-signed-transaction/index.js";
import { credits as broadcastCredits } from "./broadcast-locally-signed-transaction/credits.js";

const BROADCAST_DESCRIPTION = `Broadcast locally signed transaction (Broadcast product).

Submit a signed transaction hex to the network. Supported blockchains and networks vary; see credits for per-chain cost.`;

export const broadcastTool: McpToolDef<typeof BroadcastToolSchema> = {
    name: "broadcast_signed_transaction",
    description: BROADCAST_DESCRIPTION,
    credits: { "broadcast-signed-transaction": broadcastCredits },
    inputSchema: BroadcastToolSchema,
    handler:
        (client: CryptoApisHttpClient) =>
        async (input: BroadcastToolInput) => {
            const result: RequestResult<unknown> = await broadcastLocallySignedTransaction(client, {
                blockchain: input.blockchain,
                network: input.network,
                signedTransactionHex: input.signedTransactionHex,
                context: input.context,
            });
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify({
                            ...(result.data as object),
                            creditsConsumed: result.creditsConsumed,
                            creditsAvailable: result.creditsAvailable,
                            responseTime: result.responseTime,
                            throughputUsage: result.throughputUsage,
                        }),
                    },
                ],
            };
        },
};
