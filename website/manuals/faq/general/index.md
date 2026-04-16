---
title: General
description: Frequently Asked Questions
footer: false
---

# General

Frequently Asked Questions

## What is Usagi?

Usagi is an open-source **Android** app that lets you read any from your device - faster and easier than ever.

::: tip Disclaimer
Usagi is not hosting any content, we are not affilated with or responsible for any content.
:::

## Where do i post app issues, bugs or feature requests?

To post app issues, bugs, and feature requests please open a ticket on GitHub by following the link [here](https://github.com/UsagiApp/Usagi/issues/new/choose)

## Why isn't Usagi on the Google Play Store?

**Usagi** won't be on the **Google Play Store**. **Google** might take down the app due to certain content, which the developers wishes to avoid.

To report **Usagi** copycats on the **Google Play Store**, fill out [this form](https://support.google.com/googleplay/android-developer/contact/takedown) following the steps below.

:::details Steps to report Usagi copycats

1.  Go to the page -> three dots menu -> Flag as inappropriate -> Other objection.
2.  After choosing "Other objection", you may choose to put down any or all of the following:

    The app infringes on the Google Play Developer Policy by

    Encouraging Infringement of Copyright

    > We don’t allow apps that induce or encourage copyright infringement. Before you publish your app, look for ways your app may be encouraging copyright infringement and get legal advice if necessary.

    Trademark Infringement

    > We don’t allow apps that infringe on others’ trademarks. A trademark is a word, symbol, or combination that identifies the source of a good or service. Once acquired, a trademark gives the owner exclusive rights to the trademark usage with respect to certain goods or services.
    >
    > Trademark infringement is an improper or unauthorized use of an identical or similar trademark in a way that is likely to cause confusion as to the source of that product. If your app uses another party’s trademarks in a way that is likely to cause confusion, your app may be suspended.

    Misleading Claims, e.g. "MangaTop - Best Manga Reader"

    > We don’t allow apps that contain false or misleading information or claims, including in the description, title, icon, and screenshots. Here are some examples of common violations: Apps that misrepresent or do not accurately and clearly describe their functionality:
    >
    > - Developer or app names that misrepresent their current status or performance on Play. (E.g. “Editor’s Choice,” “Number 1 App,” “Top Paid”)...
    > - Apps that are improperly categorized.

:::

## Is Usagi available for iOS/iPadOS?

There is no iOS or iPadOS version and neither are there plans for one.
Porting is difficult due to the separate codebases of iOS and Android apps.

Any app proclaiming to be "**Usagi for iOS**" is not by us and should be treated as a scam.

## Can I read light novels?

**Usagi** can't read light novels; it's an image parser, not a text parser.

## Can I stream anime?

**Usagi** isn't designed for anime streaming.

Projects using the **Usagi** name for anime streaming aren't affiliated with the main project.

## Can I use Usagi on desktop?

No, you can't.

## Can Usagi sync across devices?

Yes, the application supports synchronization between devices.

Learn how to create a Usagi Sync account [here](/manuals/guides/synchronization/)

## What do I do if I have to switch to a new phone?

Please follow these steps:

1. Backup your entire favourites and history from your old device and transfer it to your new phone.
1. Restore the backup.

:::tip Note
More information about backup and restore is listed [here](/manuals/guides/backups/).
:::

## Can I restore my Tachiyomi/Mihon backup to Usagi?

No, you can't. This is due to the difficulty in supporting and adapting the `.proto.gz` or `.tachibk` format that **Tachiyomi/Mihon** uses. Also **Usagi** and **Tachiyomi** and its forks have different data structures that they use. For **Neko for MangaDex** users, we recommend to use [Nekotatsu](https://github.com/PhantomShift/nekotatsu) if you're on the desktop or [Nekotatsu Mobile](https://github.com/PhantomShift/nekotatsu-mobile) for android devices.

::::tabs
== Nekotatsu
:::tip How to use
The instructions are based from the project's README.
:::
1. It is recommended to run the update command first to fetch some necessary files.
`$ nekotatsu update`
1. Then, you can run the conversion command like so:
`$ nekotatsu convert (neko.tachibk)`
== Nekotatsu Mobile
1. Tap the ⚙️ icon on the top left and tap `Download`.
1. Next, you'll need to tap `Download` button on the right for each item (Tachiyomi Sources, Usagi Plugins, Fixer Script) and make sure they have a green checkmark on the left.
1. Tap the ⚙️ icon again on the top left and tap `Convert`.
1. To get started, tap the `Pick Backup` button and pick the `.tachibk` file you'll want to convert. Next, tap the `Pick Save Path` button and select the path you'll want to save your converted backup onto.
1. Finally, tap the `Convert` button. If it says `Conversion completed!`, that means the file is converted successfully.
::::
