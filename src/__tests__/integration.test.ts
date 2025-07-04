import { describe, expect, it, spyOn, beforeAll } from "bun:test";
import desearchPlugin from "../index";
import { createMockRuntime } from "./test-utils";
import {
  Content,
  HandlerCallback,
  IAgentRuntime,
  Memory,
  State,
  UUID,
} from "@elizaos/core";
import * as envModule from "../environment";
import { DesearchServices } from "../services/desearchServices";

function getMockMessage(): Memory {
  return {
    id: "12345678-1234-1234-1234-123456789012" as UUID,
    roomId: "12345678-1234-1234-1234-123456789012" as UUID,
    entityId: "12345678-1234-1234-1234-123456789012" as UUID,
    agentId: "12345678-1234-1234-1234-123456789012" as UUID,
    content: {
      text: "test",
      query: "test",
      user: "user",
      id: "id",
      urls: ["url1"],
    },
    createdAt: Date.now(),
  };
}

function getMockState(): State {
  return { values: {}, data: {}, text: "" };
}

function getOptions() {
  return {
    prompt: "test",
    model: "NOVA",
    tools: ["web"],
    user: "user",
    id: "id",
    urls: ["url1"],
  };
}
const mockRuntime = createMockRuntime();

describe("Integration: All desearchPlugin Actions", () => {
  beforeAll(() => {
    spyOn(envModule, "validateDesearchConfig").mockResolvedValue({
      DESEARCH_API_KEY: "test-key",
    });
    DesearchServices.prototype.ai_search = async () => ({
      result: "mocked ai_search result",
    });
    DesearchServices.prototype.twitter_links_search = async () => ({
      result: "mocked twitter_links_search result",
    });
    DesearchServices.prototype.web_links_search = async () => ({
      result: "mocked web_links_search result",
    });
    DesearchServices.prototype.twitter_search = async () => ({
      result: "mocked twitter_search result",
    });
    DesearchServices.prototype.tweets_by_urls = async () => ({
      result: "mocked tweets_by_urls result",
    });
    DesearchServices.prototype.tweets_by_id = async () => ({
      result: "mocked tweets_by_id result",
    });
    DesearchServices.prototype.tweets_by_user = async () => ({
      result: "mocked tweets_by_user result",
    });
    DesearchServices.prototype.web_search = async () => ({
      result: "mocked web_search result",
    });
    DesearchServices.prototype.latest_tweets = async () => ({
      result: "mocked latest_tweets result",
    });
  });

  if (!desearchPlugin?.actions) {
    return;
  }

  function getCallback(callbackCalls: Content[]): HandlerCallback {
    return async (response) => {
      callbackCalls.push(response);
      return [] as Memory[];
    };
  }

  // ...existing code...

  for (const action of desearchPlugin.actions) {
    it(`should handle ${action.name} action and return expected result`, async () => {
      const callbackCalls: Content[] = [];
      await action.handler(
        mockRuntime as unknown as IAgentRuntime,
        getMockMessage(),
        getMockState(),
        getOptions(),
        getCallback(callbackCalls),
        []
      );
      expect(callbackCalls.length).toBeGreaterThan(0);
      expect(callbackCalls[0]).toHaveProperty("content");
      expect(callbackCalls[0].content).toHaveProperty("result");
    });

    it(`should handle error case in ${action.name} action and call callback with error`, async () => {
      const methodName = {
        AI_SEARCH: "ai_search",
        TWITTER_LINKS_SEARCH: "twitter_links_search",
        WEB_LINKS_SEARCH: "web_links_search",
        TWITTER_SEARCH: "twitter_search",
        TWITTER_BY_URLS: "tweets_by_urls",
        TWEET_BY_ID: "tweets_by_id",
        TWEET_BY_USER: "tweets_by_user",
        WEB_SEARCH: "web_search",
        LATEST_TWEET: "latest_tweets",
      }[action.name];

      if (!methodName) return;

      const errorMsg = "Simulated error";
      DesearchServices.prototype[methodName] = async () => {
        throw new Error(errorMsg);
      };

      const callbackCalls: Content[] = [];
      await action.handler(
        mockRuntime as unknown as IAgentRuntime,
        getMockMessage(),
        getMockState(),
        getOptions(),
        getCallback(callbackCalls),
        []
      );
      expect(callbackCalls.length).toBeGreaterThan(0);
      expect(callbackCalls[0].text).toContain("Error:");
      expect(callbackCalls[0].content).toHaveProperty("error", errorMsg);
    });
  }
});

describe("Action validate methods", () => {
  if (!desearchPlugin?.actions) {
    return;
  }

  for (const action of desearchPlugin.actions) {
    if (typeof action.validate === "function") {
      it(`${action.name}.validate should call validateDesearchConfig and return true on success`, async () => {
        const spy = spyOn(
          envModule,
          "validateDesearchConfig"
        ).mockResolvedValue({ DESEARCH_API_KEY: "test-key" });
        const result = await action.validate(
          mockRuntime as any,
          getMockMessage()
        );
        expect(spy).toHaveBeenCalledWith(mockRuntime);
        expect(result).toBe(true);
      });
      it(`${action.name}.validate should throw if validateDesearchConfig throws`, async () => {
        spyOn(envModule, "validateDesearchConfig").mockRejectedValue(
          new Error("fail")
        );
        await expect(
          action.validate(mockRuntime as any, getMockMessage())
        ).rejects.toThrow("fail");
      });
    }
  }
});
