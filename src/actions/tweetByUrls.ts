import {
  elizaLogger,
  Action,
  ActionExample,
  HandlerCallback,
  IAgentRuntime,
  Memory,
  State,
} from "@elizaos/core";
import { validateDesearchConfig } from "../environment";
import { DesearchServices } from "../services/desearchServices";
import { twitterUrlsExamples } from "../examples/examples";

export const TwitterByUrlsAction: Action = {
  name: "TWITTER_BY_URLS",
  similes: [],
  description:
    "Retrieve detailed information for multiple posts by providing their respective URLs. This endpoint extracts metadata, content, and relevant engagement metrics associated with each specified URL.",
  validate: async (runtime: IAgentRuntime) => {
    await validateDesearchConfig(runtime);
    return true;
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state: State,
    _options: { [key: string]: unknown },
    callback: HandlerCallback
  ) => {
    const config = await validateDesearchConfig(runtime);
    const desearchServices = new DesearchServices(config.DESEARCH_API_KEY);

    const twitterUrlsPayload = message.content.urls as string[];

    try {
      const result = await desearchServices.tweets_by_urls(twitterUrlsPayload);
      elizaLogger.success("Success Twitter by urls");
      if (callback) {
        callback({
          text: JSON.stringify(result),
          content: { result },
        });
        return true;
      }
    } catch (error: any) {
      elizaLogger.error("Error Twitter by urls", error);
      callback({
        text: `Error: ${error.message}`,
        content: { error: error.message },
      });
      return false;
    }
  },

  examples: twitterUrlsExamples as ActionExample[][],
} as Action;
