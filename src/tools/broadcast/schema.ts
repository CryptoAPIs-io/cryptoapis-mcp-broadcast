import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";
import { BroadcastBlockchain, BroadcastNetwork } from "./base-schema.js";

export const BroadcastToolSchema = z
    .object({
        blockchain: BroadcastBlockchain.describe("Blockchain protocol"),
        network: BroadcastNetwork.describe("Network name"),
        signedTransactionHex: z.string().min(1).describe("Signed transaction hex to broadcast"),
    })
    .merge(RequestMetadataSchema);

export type BroadcastToolInput = z.infer<typeof BroadcastToolSchema>;
