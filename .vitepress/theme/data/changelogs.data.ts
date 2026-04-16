import type { GetResponseDataTypeFromEndpointMethod } from "@octokit/types";

import { Octokit } from "@octokit/rest";
import fs from "node:fs";
import { join } from "node:path";
import { defineLoader } from "vitepress";

import { CACHE_DIR } from ".";

const isDev = process.env.NODE_ENV === "development";

const CACHE_PATH = join(CACHE_DIR, "changelogs.data.json");

const octokit = new Octokit();

type GitHubReleaseList = GetResponseDataTypeFromEndpointMethod<typeof octokit.repos.listReleases>;

declare const data: GitHubReleaseList;
export { data };

export default defineLoader({
  async load(): Promise<GitHubReleaseList> {
    if (fs.existsSync(CACHE_PATH)) {
      console.log("Changelogs data cache found, loading from cache");
      const cachedData = JSON.parse(fs.readFileSync(CACHE_PATH, "utf-8"));
      return cachedData;
    }

    const releases = await octokit.paginate(octokit.repos.listReleases, {
      owner: "UsagiApp",
      repo: "Usagi",
      per_page: 100,
    });

    if (isDev) {
      console.log("Creating changelogs cache");
      fs.mkdirSync(CACHE_DIR, { recursive: true });
      fs.writeFileSync(CACHE_PATH, JSON.stringify(releases, null, 2), "utf-8");
    }

    return releases;
  },
});
