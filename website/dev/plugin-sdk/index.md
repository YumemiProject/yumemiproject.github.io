---
title: External plugins SDK
description: Documentation on how to create an external Usagi manga source plugin.
footer: false
---

# External plugins SDK

Usagi loads source providers from external plugin files (`.jar`).
This page outlines the current packaging and release workflow for plugin authors.

## What to ship

- Build your plugin as a `.jar`.
- Ensure the plugin exposes compatible parser entry points for the current Usagi release.
- Keep source keys stable between updates.

## Release workflow

1. Publish your plugin code in a GitHub repository.
1. Create a release and attach the plugin `.jar` asset.
1. Make sure the **latest release** contains a valid `.jar` so users can import via GitHub directly in Usagi.

## User import flow (for testing)

1. Open **Settings** -> **Sources** -> **Manage plugins** in Usagi.
1. Tap **+**.
1. Use **Import from GitHub** (`owner/repository`) or **Import from local storage**.
1. Confirm sources appear in **Sources Catalog** and can be enabled.

## Compatibility checklist

- Test with the latest app build before publishing.
- Validate browse/search/details/chapters/pages on at least one source in your plugin.
- If import fails, confirm the release asset is a `.jar` and not blocked by packaging/signing issues.
