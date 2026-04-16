import type { GetResponseDataTypeFromEndpointMethod } from "@octokit/types";

import { Octokit } from "@octokit/rest";
import fs from "node:fs";
import { join } from "node:path";
import { defineLoader } from "vitepress";

import { CACHE_DIR } from ".";

const isDev = process.env.NODE_ENV === "development";

const CACHE_PATH = join(CACHE_DIR, "release.data.json");

const octokit = new Octokit();

type GitHubRelease = GetResponseDataTypeFromEndpointMethod<typeof octokit.repos.listReleases>[number];

export interface AppRelease {
  stable: GitHubRelease;
}

declare const data: AppRelease;
export { data };

export default defineLoader({
  async load(): Promise<AppRelease> {
    if (fs.existsSync(CACHE_PATH)) {
      console.log("Release data cache found, loading from cache");
      const cachedData = JSON.parse(fs.readFileSync(CACHE_PATH, "utf-8"));
      return cachedData;
    }

    const releases = await octokit.paginate(octokit.repos.listReleases, {
      owner: "UsagiApp",
      repo: "Usagi",
      per_page: 100,
    });

    const stable = releases.find((release) => !release.draft && !release.prerelease);

    if (!stable) {
      throw new Error("Unable to find a stable release in UsagiApp/Usagi");
    }

    const releaseData = { stable };

    if (isDev) {
      console.log("Creating release cache");
      fs.mkdirSync(CACHE_DIR, { recursive: true });
      fs.writeFileSync(CACHE_PATH, JSON.stringify(releaseData, null, 2), "utf-8");
    }

    return releaseData;
  },
});
