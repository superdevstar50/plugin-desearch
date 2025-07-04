import { ActionExample } from "@elizaos/core";

export const aiSearchExamples: ActionExample[][] = [
  [
    {
      name: "{{user1}}",
      content: {
        text: "Can you perform a search for the latest AI advancements?",
      },
    },
    {
      name: "{{agent}}",
      content: {
        text: "Sure, let me perform an AI-powered search for the latest AI advancements.",
        action: "AI_SEARCH",
      },
    },
  ],
  [
    {
      name: "{{user1}}",
      content: {
        text: "Find recent research papers on machine learning.",
      },
    },
    {
      name: "{{agent}}",
      content: {
        text: "I'll search for recent research papers on machine learning.",
        action: "AI_SEARCH",
      },
    },
  ],
];

export const twitterLinksSearchExamples: ActionExample[][] = [
  [
    {
      name: "{{user1}}",
      content: {
        text: "Can you find Twitter links related to AI advancements?",
      },
    },
    {
      name: "{{agent}}",
      content: {
        text: "Sure, let me find some Twitter links related to AI advancements.",
        action: "TWITTER_LINKS_SEARCH",
      },
    },
  ],
  [
    {
      name: "{{user1}}",
      content: {
        text: "Search for Twitter discussions on machine learning.",
      },
    },
    {
      name: "{{agent}}",
      content: {
        text: "I'll search for Twitter discussions on machine learning.",
        action: "TWITTER_LINKS_SEARCH",
      },
    },
  ],
];

export const webLinksSearchExamples: ActionExample[][] = [
  [
    {
      name: "{{user1}}",
      content: {
        text: "Can you find web links related to AI advancements?",
      },
    },
    {
      name: "{{agent}}",
      content: {
        text: "Sure, let me find some web links related to AI advancements.",
        action: "WEB_LINKS_SEARCH",
        parameters: {
          prompt: "AI advancements",
          model: "NOVA",
        },
      },
    },
  ],
  [
    {
      name: "{{user1}}",
      content: {
        text: "Search for web articles on machine learning.",
      },
    },
    {
      name: "{{agent}}",
      content: {
        text: "I'll search for web articles on machine learning.",
        action: "WEB_LINKS_SEARCH",
        parameters: {
          prompt: "machine learning",
          model: "NOVA",
        },
      },
    },
  ],
];

export const twitterSearchExamples: ActionExample[][] = [
  [
    {
      name: "{{user1}}",
      content: {
        query: "AI advancements",
        count: 10,
      },
    },
    {
      name: "{{agent}}",
      content: {
        text: "Sure, let me find some tweets about AI advancements.",
        action: "TWITTER_SEARCH",
      },
    },
  ],
  [
    {
      name: "{{user1}}",
      content: {
        text: "Search for tweets on machine learning.",
        query: "Elonmusk",
        count: 10,
      },
    },
    {
      name: "{{agent}}",
      content: {
        text: "I'll search for tweets on machine learning.",
        action: "TWITTER_SEARCH",
      },
    },
  ],
];

export const twitterUrlsExamples: ActionExample[][] = [
  [
    {
      name: "{{user1}}",
      content: {
        urls: [
          "https://twitter.com/user/status/1234567890",
          "https://twitter.com/user/status/0987654321",
        ],
      },
    },
    {
      name: "{{agent}}",
      content: {
        text: "Sure, let me fetch tweets from the provided URLs.",
        action: "TWITTER_BY_URLS",
      },
    },
  ],
  [
    {
      name: "{{user1}}",
      content: {
        urls: [
          "https://twitter.com/user/status/1234567890",
          "https://twitter.com/user/status/0987654321",
        ],
      },
    },
    {
      name: "{{agent}}",
      content: {
        text: "I'll retrieve tweets from the specified links.",
        action: "TWITTER_BY_URLS",
      },
    },
  ],
];

export const twitterByIdExamples: ActionExample[][] = [
  [
    {
      name: "{{user1}}",
      content: {
        id: "5544332211",
      },
    },
    {
      name: "{{agent}}",
      content: {
        text: "Sure",
        action: "TWEET_BY_ID",
      },
    },
  ],
  [
    {
      name: "{{user1}}",
      content: {
        id: "5544332211",
      },
    },
    {
      name: "{{agent}}",
      content: {
        text: "I'll tweet about the latest in machine learning.",
        action: "TWEET_BY_ID",
      },
    },
  ],
];

export const tweetByUserExamples: ActionExample[][] = [
  [
    {
      name: "{{user1}}",
      content: {
        user: "Elonmusk",
        query: "",
        count: 10,
      },
    },
    {
      name: "{{agent}}",
      content: {
        text: "suer:",
        action: "TWEET_BY_USER",
      },
    },
  ],
  [
    {
      name: "{{user1}}",
      content: {
        user: "Elonmusk",
        query: "",
        count: 10,
      },
    },
    {
      name: "{{agent}}",
      content: {
        text: "suer: ",
        action: "TWEET_BY_USER",
      },
    },
  ],
];

export const webSearchExamples: ActionExample[][] = [
  [
    {
      name: "{{user1}}",
      content: {
        query: "Elonmusk",
        num: 10,
        start: 0,
      },
    },
    {
      name: "{{agent}}",
      content: {
        text: "Sure: ",
        action: "WEB_SEARCH",
      },
    },
  ],
  [
    {
      name: "{{user1}}",
      content: {
        query: "Elonmusk",
        num: 10,
        start: 0,
      },
    },
    {
      name: "{{agent}}",
      content: {
        text: "sure:",
        action: "WEB_SEARCH",
      },
    },
  ],
];

export const latestTweetExamples: ActionExample[][] = [
  [
    {
      name: "{{user1}}",
      content: {
        user: "Elonmusk",
        count: 10,
      },
    },
    {
      name: "{{agent}}",
      content: {
        text: "suer:",
        action: "LATEST_TWEET",
      },
    },
  ],
  [
    {
      name: "{{user1}}",
      content: {
        user: "Elonmusk",
        count: 10,
      },
    },
    {
      name: "{{agent}}",
      content: {
        text: "suer: ",
        action: "LATEST_TWEET",
      },
    },
  ],
];

export const twitterUserExamples: ActionExample[][] = [
  [
    {
      name: "{{user1}}",
      content: {
        user: "Elonmusk",
      },
    },
    {
      name: "{{agent}}",
      content: {
        text: "suer:",
        action: "TWITTER_USER",
      },
    },
  ],
  [
    {
      name: "{{user1}}",
      content: {
        user: "nasa",
      },
    },
    {
      name: "{{agent}}",
      content: {
        text: "suer: ",
        action: "TWITTER_USER",
      },
    },
  ],
];
