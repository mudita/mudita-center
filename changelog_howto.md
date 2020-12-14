# How to fill changelog entries

This article is based on [keep a changelog](https://keepachangelog.com/en/1.0.0/).

**Note:** Mudita Center changelog should be **edited by the Mudita Center core development team only**.

[View Mudita Center changelog](https://github.com/Mudita/mudita-center/releases).

## 1. The purpose of a changelog
To let the end user (not necessarily technically-skilled) know what your Pull Request changes. In practice, this means that if some spectacular crash has been fixed, changelog entry should say e.g. `Fix system crash on syncing contacts with Google`.

On the other hand, if several minor fixes or refactors have been made, simple information is sufficient eg. `Minor fixes in UI - syncing contacts view`. Nothing deeply-technical - just information understandable to the reader.

## 2. What not to put in the changelog
Try to be informative when drafting an entry. `Change GUI items according to last UI change` doesn't really say anything to the end user. Your entry should be short but informative and understandable to anyone.

## 3. When to fill the changelog
After every release.

## 4. How to add an entry to the changelog

A few rules to follow:

1. Add your entry using the `Releases` GitHub section.
2. Please don't remove anything, especially changes from previous releases.
3. If you're not sure about formatting - please see how previous entries are formatted.
4. Put relevant changes in `Added`, `Changed`, `Removed`, `Fixed` subsections.
5. If your change won't be visible to the end user, please put it in `Other` section (e.g. improvements to the build system).