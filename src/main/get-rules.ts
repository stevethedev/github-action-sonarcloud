import { type RequestFn } from "@/request/factory";
import searchRules from "@/sonarcloud-api/rules/search";
import type { DescriptionSection } from "@/sonarcloud-api/rules/search/transform/description-section";
import type { Impact } from "@/sonarcloud-api/rules/search/transform/impact";
import toTitleCase from "@/types/string/to-title-case";

export interface Options {
  sonarOrganization: string;
  ruleKeys: string[];
}

export interface Rule {
  name: string;
  impacts: Array<{ metric: string; severity: string }>;
  description: {
    introduction: string | null;
    resources: string | null;
    rootCause: string | null;
    howToFix: string | null;
  };
}

export default class RuleGetter {
  private readonly cache: Map<string, Rule> = new Map();
  private readonly sonarRequest: RequestFn;
  private readonly sonarOrganization: string;

  constructor(sonarRequest: RequestFn, sonarOrganization: string) {
    this.sonarRequest = sonarRequest;
    this.sonarOrganization = sonarOrganization;
  }

  async getRules(ruleKeys: string[]): Promise<Partial<Record<string, Rule>>> {
    const fetchRules = ruleKeys.filter((key) => !this.cache.has(key));
    if (fetchRules.length > 0) {
      const rules = await getRules(this.sonarRequest, {
        sonarOrganization: this.sonarOrganization,
        ruleKeys: Array.from(new Set(fetchRules)),
      });
      Object.entries(rules).forEach(([key, rule]) => {
        this.cache.set(key, rule!);
      });
    }
    return Object.fromEntries(
      ruleKeys
        .map((key) => [key, this.cache.get(key)])
        .filter(([, rule]) => rule),
    );
  }
}

const getRules = async (
  sonarRequest: RequestFn,
  { sonarOrganization, ruleKeys }: Options,
): Promise<Partial<Record<string, Rule>>> => {
  if (ruleKeys.length === 0) {
    return {};
  }
  const { rules } = await searchRules(sonarRequest, {
    organization: sonarOrganization,
    rule_keys: Array.from(ruleKeys),
    f: ["name", "descriptionSections"],
  });

  const entries = Object.entries(rules);
  return Object.fromEntries(
    entries.map(([key, rule]) => {
      return [
        key,
        {
          name: rule?.name ?? "Rule Name",
          description: parseDescription(rule?.descriptionSections ?? []),
          impacts: parseImpact(rule?.impacts ?? []),
        },
      ];
    }),
  );
};

const parseDescription = (
  descriptionSections: DescriptionSection[],
): Rule["description"] => {
  const description: Rule["description"] = {
    introduction: null,
    resources: null,
    rootCause: null,
    howToFix: null,
  };

  for (const section of descriptionSections) {
    switch (section.key) {
      case "introduction":
        description.introduction = section.content;
        break;
      case "resources":
        description.resources = section.content
          ?.replace(
            /<h(\d)([^>]*)>/gi,
            (_, level, rest) => `<h${parseInt(level) + 1}${rest}>`,
          )
          .replace(
            /<\/h(\d)([^>]*)>/gi,
            (_, level, rest) => `</h${parseInt(level) + 1}${rest}>`,
          );
        break;
      case "root_cause":
        description.rootCause = section.content;
        break;
      case "how_to_fix":
        description.howToFix = section.content;
        break;
    }
  }

  return description;
};

const parseImpact = (impacts: Impact[]): Rule["impacts"] =>
  impacts.map((impact) => ({
    metric: toTitleCase(impact.softwareQuality),
    severity: toTitleCase(impact.severity),
  }));
