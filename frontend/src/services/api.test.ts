import { describe, expect, it, beforeEach } from "vitest";
import { getStoredAuthToken } from "./api";

describe("getStoredAuthToken", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("reads the token from the persisted Zustand state shape", () => {
    localStorage.setItem(
      "aramayus-auth",
      JSON.stringify({
        state: {
          user: { id: "1", email: "admin@aramayus.com", role: "admin" },
          token: "token-state-shape",
        },
        version: 0,
      }),
    );

    expect(getStoredAuthToken()).toBe("token-state-shape");
  });

  it("reads the token from a legacy flat auth object", () => {
    localStorage.setItem(
      "aramayus-auth",
      JSON.stringify({
        token: "token-flat-shape",
        user: { id: "1", email: "admin@aramayus.com", role: "admin" },
      }),
    );

    expect(getStoredAuthToken()).toBe("token-flat-shape");
  });

  it("returns null when storage is malformed", () => {
    localStorage.setItem("aramayus-auth", "{bad-json");

    expect(getStoredAuthToken()).toBeNull();
  });
});
