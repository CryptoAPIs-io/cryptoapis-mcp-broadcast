import { systemInfoTool } from "@cryptoapis-io/mcp-shared";
import { broadcastTool } from "./broadcast/index.js";

export const tools = [broadcastTool, systemInfoTool] as const;
