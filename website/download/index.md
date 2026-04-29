---
title: Download
description: Download page that allows users to access and install the latest version of the app.
lastUpdated: false
editLink: false
prev: false
next: false
footer: false
---

<script setup>
import DownloadButtons from "@theme/components/DownloadButtons.vue";
import ReleaseDate from "@theme/components/ReleaseDate.vue";
import Changelog from "@theme/components/Changelog.vue";
import { data as release } from "@theme/data/release.data";
</script>

# Download

The latest stable version of **Usagi** was released **<ReleaseDate type="stable" />**.<span v-if="release.beta"> The latest beta version was released **<ReleaseDate type="beta" />**.</span>

<DownloadButtons />

<Changelog type="stable" />
