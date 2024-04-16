import { isRawUser, isUser, parseUser, type RawUser, type User } from "./user";

describe("isRawUser", () => {
  it("should return true for valid raw user", () => {
    const rawUser: RawUser = {
      login: "login",
      name: "name",
      active: true,
      avatar: "avatar",
    };

    expect(isRawUser(rawUser)).toBe(true);
  });

  it("should return false for invalid raw user", () => {
    expect(isRawUser({})).toBe(false);
    expect(isRawUser({ login: "login" })).toBe(false);
    expect(isRawUser({ login: "login", name: "name" })).toBe(false);
    expect(isRawUser({ login: "login", name: "name", active: "true" })).toBe(
      false,
    );
  });
});

describe("isUser", () => {
  it("should return true for valid user", () => {
    const user: User = {
      login: "login",
      name: "name",
      active: true,
      avatar: "avatar",
    };

    expect(isUser(user)).toBe(true);
  });

  it("should return false for invalid user", () => {
    expect(isUser({})).toBe(false);
    expect(isUser({ login: "login" })).toBe(false);
    expect(isUser({ login: "login", name: "name" })).toBe(false);
    expect(isUser({ login: "login", name: "name", active: "true" })).toBe(
      false,
    );
  });
});

describe("parseUser", () => {
  it("should parse raw user to user", () => {
    const rawUser: RawUser = {
      login: "login",
      name: "name",
      active: true,
      avatar: "avatar",
    };

    const user: User = {
      ...rawUser,
    };

    expect(parseUser(rawUser)).toEqual(user);
  });

  it("should throw error if raw user is invalid", () => {
    expect(() => parseUser({})).toThrow();
  });
});
