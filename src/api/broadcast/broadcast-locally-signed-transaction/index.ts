import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";
import type { BroadcastLocallySignedTransactionRequest } from "./types.js";

export type BroadcastLocallySignedTransactionInput = BroadcastLocallySignedTransactionRequest & RequestMetadata;

export async function broadcastLocallySignedTransaction(
    client: CryptoApisHttpClient,
    input: BroadcastLocallySignedTransactionInput
) {
    const path = `/broadcast-transactions/${input.blockchain}/${input.network}`;

    return client.request<unknown>("POST", path, {
        query: { context: input.context },
        body: {
            data: {
                item: {
                    signedTransactionHex: input.signedTransactionHex,
                },
            },
        },
    });
}
