import type { CryptoApisHttpClient, McpLogger, RequestResult, DangerousActionMap } from "@cryptoapis-io/mcp-shared";
import { requiresConfirmation, buildConfirmationPreview, formatDangerousActionsWarning } from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { BroadcastToolSchema, type BroadcastToolInput } from "./schema.js";
import { broadcastLocallySignedTransaction } from "../../api/broadcast/broadcast-locally-signed-transaction/index.js";
import { credits as broadcastCredits } from "./broadcast-locally-signed-transaction/credits.js";

const DANGEROUS_ACTIONS: DangerousActionMap = {
    "broadcast-signed-transaction": {
        warning: "Broadcasting a signed transaction is irreversible. Once submitted to the network, it cannot be recalled or cancelled.",
        impact: "The transaction will be submitted to the blockchain network and, if valid, will be included in a block permanently.",
    },
};

const BROADCAST_DESCRIPTION = `Broadcast locally signed transaction (Broadcast product).

Submit a signed transaction hex to the network. Supported blockchains and networks vary; see credits for per-chain cost.${formatDangerousActionsWarning(DANGEROUS_ACTIONS)}`;

export const broadcastTool: McpToolDef<typeof BroadcastToolSchema> = {
    name: "broadcast_signed_transaction",
    description: BROADCAST_DESCRIPTION,
    credits: { "broadcast-signed-transaction": broadcastCredits },
    inputSchema: BroadcastToolSchema,
    handler:
        (client: CryptoApisHttpClient, logger: McpLogger) =>
        async (input: BroadcastToolInput) => {
            const dangerousAction = await requiresConfirmation("broadcast-signed-transaction", DANGEROUS_ACTIONS, input.confirmationToken);
            if (dangerousAction) {
                return await buildConfirmationPreview("broadcast-signed-transaction", dangerousAction, broadcastCredits);
            }

            const result: RequestResult<unknown> = await broadcastLocallySignedTransaction(client, {
                blockchain: input.blockchain,
                network: input.network,
                signedTransactionHex: input.signedTransactionHex,
                context: input.context,
            });

            logger.logInfo({
                tool: "broadcast_signed_transaction",
                action: "broadcast-signed-transaction",
                blockchain: input.blockchain,
                network: input.network,
                creditsConsumed: result.creditsConsumed,
                creditsAvailable: result.creditsAvailable,
                responseTime: result.responseTime,
                throughputUsage: result.throughputUsage,
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
