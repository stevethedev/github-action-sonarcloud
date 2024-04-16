import {
  isRawOrganization,
  isOrganization,
  parseOrganization,
  type Organization,
  type RawOrganization,
} from "./organization";

describe("isRawOrganization", () => {
  it("should return true if value is RawOrganization", () => {
    const rawOrganization: RawOrganization = {
      key: "key",
      name: "name",
    };
    expect(isRawOrganization(rawOrganization)).toBe(true);
  });

  it("should return false if value is not RawOrganization", () => {
    const rawOrganization: RawOrganization = {
      key: "key",
      name: "name",
    };
    expect(isRawOrganization({ ...rawOrganization, key: 1 })).toBe(false);
  });
});

describe("isOrganization", () => {
  it("should return true if value is Organization", () => {
    const organization: Organization = {
      key: "key",
      name: "name",
    };
    expect(isOrganization(organization)).toBe(true);
  });

  it("should return false if value is not Organization", () => {
    const organization: Organization = {
      key: "key",
      name: "name",
    };
    expect(isOrganization({ ...organization, key: 1 })).toBe(false);
  });
});

describe("parseOrganization", () => {
  it("should return Organization", () => {
    const rawOrganization: RawOrganization = {
      key: "key",
      name: "name",
    };
    expect(parseOrganization(rawOrganization)).toEqual(rawOrganization);
  });
});
