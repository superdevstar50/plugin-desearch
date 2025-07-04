import { describe, expect, it, beforeAll, vi } from "vitest";
import desearchPlugin from "../index";

// Mock environment/config if needed
import * as envModule from "../environment";

beforeAll(() => {
  vi.spyOn(envModule, "validateDesearchConfig").mockResolvedValue({
    DESEARCH_API_KEY: "test-key",
  });
});

describe("Desearch Plugin Metadata", () => {
  it("should have correct plugin metadata", () => {
    expect(desearchPlugin.name).toBe("desearch");
    expect(desearchPlugin.description).toContain("DESEARCH");
    expect(desearchPlugin.actions).toBeDefined();
    expect(Array.isArray(desearchPlugin.actions)).toBe(true);
  });
});
