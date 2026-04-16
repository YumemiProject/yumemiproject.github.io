---
title: Contribute
description: Find out how to help translate or build the app and external plugins.
footer: false
---

# Contribute

Find out how to help translate or build the app and external plugins.

## App contribution guidelines

- If you want to fix bug or implement a new feature already listed in [issues](https://github.com/UsagiApp/Usagi/issues), assign the issue to yourself and/or comment first.
- For major features, open an issue or discussion first to confirm scope and direction.
- Translations have to be managed using the [Weblate](https://hosted.weblate.org/engage/usagi/) platform.
- Online sources are loaded through external plugins, not bundled directly in the app.

Refactoring and developer-experience improvements are welcome. Please keep these principles in mind:

- Performance matters. In the case of choosing between source code beauty and performance, performance should be a priority.
- Please do not modify README and other information files unless necessary (except typos).
- Avoid adding new dependencies unless required. APK size is important.

## External plugin contribution guidelines

Usagi loads source providers from external `.jar` plugins.

### Distribution requirements

- Package your plugin as a `.jar` file.
- To support **Import from GitHub**, publish the `.jar` asset in the repository's latest release.
- Keep source keys stable between releases to avoid breaking user data.
- Test compatibility against the current Usagi release before publishing.

### Testing flow in Usagi

1. Open **Settings** -> **Sources** -> **Manage plugins**.
1. Import your plugin via GitHub repository or local `.jar`.
1. Verify that the plugin loads successfully.
1. Open **Sources Catalog** and confirm that your sources appear and can be enabled.
1. Validate browse/search/details/chapters/pages before release.

For implementation details, see [External plugins SDK](/dev/plugin-sdk/).

## Help

If you need help or have some questions, ask a community in our [Telegram chat](https://t.me/UsagiApp)
or [Discord server](https://discord.gg/4AHskjwtj4).
