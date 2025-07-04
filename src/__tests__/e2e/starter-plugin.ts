import { type Content, type HandlerCallback } from "@elizaos/core";

interface TestSuite {
  name: string;
  description?: string;
  tests: Array<{
    name: string;
    fn: (runtime: any) => Promise<any>;
  }>;
}

type UUID = `${string}-${string}-${string}-${string}-${string}`;

interface Memory {
  entityId: UUID;
  roomId: UUID;
  content: Record<string, any>;
}

interface State {
  values: Record<string, any>;
  data: Record<string, any>;
  text: string;
}

function makeTestMessage(content: Record<string, any> = {}) {
  return {
    entityId: "12345678-1234-1234-1234-123456789012" as UUID,
    roomId: "12345678-1234-1234-1234-123456789012" as UUID,
    content,
  };
}

function makeTestState() {
  return { values: {}, data: {}, text: "" };
}

export const StarterPluginTestSuite: TestSuite = {
  name: "plugin_desearch_test_suite",
  description: "E2E tests for the Desearch plugin actions",

  tests: [
    {
      name: "AI_SEARCH action handler",
      fn: async (runtime) => {
        const action = runtime.actions?.find((a) => a.name === "AI_SEARCH");
        if (!action) throw new Error("AI_SEARCH action not found");
        let called = false;
        const callback: HandlerCallback = async (response: Content) => {
          called = true;
          if (!("content" in response))
            throw new Error("No content in response");
          return [];
        };
        await action.handler(
          runtime,
          makeTestMessage({
            text: "AI search",
            prompt: "test",
            model: "NOVA",
            tools: ["web"],
          }),
          makeTestState(),
          { prompt: "test", model: "NOVA", tools: ["web"] },
          callback
        );
        if (!called) throw new Error("Callback not called for AI_SEARCH");
      },
    },
    {
      name: "TWITTER_LINKS_SEARCH action handler",
      fn: async (runtime) => {
        const action = runtime.actions?.find(
          (a) => a.name === "TWITTER_LINKS_SEARCH"
        );
        if (!action) throw new Error("TWITTER_LINKS_SEARCH action not found");
        let called = false;
        const callback: HandlerCallback = async (response: Content) => {
          called = true;
          if (!("content" in response))
            throw new Error("No content in response");
          return [];
        };
        await action.handler(
          runtime,
          makeTestMessage({
            text: "twitter links",
            prompt: "test",
            model: "NOVA",
          }),
          makeTestState(),
          { prompt: "test", model: "NOVA" },
          callback
        );
        if (!called)
          throw new Error("Callback not called for TWITTER_LINKS_SEARCH");
      },
    },
    {
      name: "WEB_LINKS_SEARCH action handler",
      fn: async (runtime) => {
        const action = runtime.actions?.find(
          (a) => a.name === "WEB_LINKS_SEARCH"
        );
        if (!action) throw new Error("WEB_LINKS_SEARCH action not found");
        let called = false;
        const callback: HandlerCallback = async (response: Content) => {
          called = true;
          if (!("content" in response))
            throw new Error("No content in response");
          return [];
        };
        await action.handler(
          runtime,
          makeTestMessage({
            text: "web links",
            prompt: "test",
            model: "NOVA",
            tools: ["web"],
          }),
          makeTestState(),
          { prompt: "test", model: "NOVA", tools: ["web"] },
          callback
        );
        if (!called)
          throw new Error("Callback not called for WEB_LINKS_SEARCH");
      },
    },
    {
      name: "TWITTER_SEARCH action handler",
      fn: async (runtime) => {
        const action = runtime.actions?.find(
          (a) => a.name === "TWITTER_SEARCH"
        );
        if (!action) throw new Error("TWITTER_SEARCH action not found");
        let called = false;
        const callback: HandlerCallback = async (response: Content) => {
          called = true;
          if (!("content" in response))
            throw new Error("No content in response");
          return [];
        };
        await action.handler(
          runtime,
          makeTestMessage({ query: "test" }),
          makeTestState(),
          {},
          callback
        );
        if (!called) throw new Error("Callback not called for TWITTER_SEARCH");
      },
    },
    // Add similar tests for the rest of your actions:
    // TWITTER_BY_URLS, TWEET_BY_ID, TWEET_BY_USER, WEB_SEARCH, LATEST_TWEET
  ],
};

export default StarterPluginTestSuite;
