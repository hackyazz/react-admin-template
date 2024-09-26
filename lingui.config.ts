import type { LinguiConfig } from "@lingui/conf";

const config: LinguiConfig = {
  locales: ["en_US", "zh_CN"],
  sourceLocale: "zh_CN",
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
};

export default config;