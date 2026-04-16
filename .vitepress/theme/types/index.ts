import type { DefaultTheme } from "vitepress";

import type { SectionData } from "../plugins/section";

export interface ThemeConfig extends DefaultTheme.Config {
  titleSeparator?: string;
  sections?: Array<SectionData>;
}

export interface ThemeTeamMember extends Omit<DefaultTheme.TeamMember, "name"> {
  name: Record<string, string>;
}

export interface CustomConfig {
  footer: {
    qrcodeTitle: string;
    qrcodeMessage: string;
    qrcodeLink: string;
    navigation: {
      title: string;
      items: {
        text: string;
        link: string;
      }[];
    }[];
  };
}
