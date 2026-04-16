---
title: Plugin package format
description: How Usagi discovers and installs external source plugins.
footer: false
---

# Plugin package format

Usagi does not bundle online source packs inside the app.
Online sources are provided by external plugins distributed as `.jar` files.

## How plugin loading works

When a plugin is imported, Usagi stores the `.jar` and reloads available sources from that file.
Loaded sources then appear in **Sources Catalog**.

## Distribution requirements

- Plugin artifact must be a `.jar` file.
- For **Import from GitHub**, the latest release must contain at least one `.jar` asset.
- Use stable source identifiers between versions to avoid breaking user data mappings.
- Keep plugin and app versions compatible. Incompatible plugins will fail to load.

## Installation flow for users

1. Open **Settings** -> **Sources** -> **Manage plugins**.
1. Tap **+**.
1. Choose one import mode:
   - **Import from GitHub** (enter `owner/repository`).
   - **Import from local storage** (pick a `.jar`).
1. After successful import, open **Sources Catalog** and enable the sources you need.

## Updating and removing plugins

- Update by importing a newer plugin release (same filename can be overwritten).
- Remove plugins from **Manage plugins**.
- If plugin loading fails, confirm that the file is a valid `.jar` and built for the current app version.

## For plugin authors

- Start with [External plugins SDK](/dev/plugin-sdk/).
- Validate plugin import and source behavior on a real Usagi build before publishing.

## Contribution

Check [Contribute](/dev/contribute/) for project-wide contribution guidelines.

## DMCA disclaimer

The developer(s) of this application does not have any affiliation with the content providers available. If there is any content, it's provided by external libraries (added / imported by users); the application itself doesn't include any built-in content.
