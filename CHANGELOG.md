# Mudita Center changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased] - yyyy-mm-dd

Here we write upgrading notes for brands. It's a team effort to make them as
straightforward as possible.

## [2.5.0] - 2024-12-02

Starting with version 2.5.0, users will be able to synchronize the time and date on the Harmony and will be informed about an error in case of fail in the synchronization.

### Added

- Added time synchronization for Mudita Harmony.

## [2.4.0] - 2024-09-16

In this release, we have updated the Help section in the Mudita Center application. As of version 2.4.0, users can benefit from a refreshed help section with intuitive navigation. The article search functionality is also available. In addition, we have fixed two bugs occurring in our software.

### Added

- Added new Help section.

### Changed

- Removed old help functionality.
- Configured CMS for Help section in Mudita Center.

### Fixed

- Fixed not displayed newly added file on Manage Sounds.
- Fixed renaming of AppImage file when App Update.
- Fixed bypassing force update.
- Fixed broken layout in Contacts Search.
- Fixed ignoring of opening connected device Overview page, when News is current active tab.
- Fixed unexpected MDS behavior for Back and Forward mouse buttons.
- Fixed type in update checking failed window copy.

## [2.3.0] - 2024-05-22

In this update, we have released the functionality of Multidevice support, the feature allows to support multiple Mudita devices in the Mudita Center application simultaneously without switching it. Moreover, we've successfully addressed 20 bugs across various features.

### Added

- Added the ability to identify Harmony by color.
- Added supports multiple devices, allowing users to launch applications simultaneously and select a device.
- Added notifications when a new device appears.
- Added the ability to switch to another device.

### Changed

- Removed the `Disconnect` button for device disconnection.
- Enhanced error handling with notifications for connection errors, consolidated into a single troubleshooting view.
- Mudita Center now properly handles Mudita Device connection by resolving missing user group inclusion.
- Updated the Mudita Center application Start screen.

### Fixed

- Fixed pixelation and aliasing of Mudita News thumbnails on 1920x1080 resolution at 100% scaling.
- Fixed issue where VCF import did not restrict file type.
- Fixed issue with the white background shrinking on 'No search result' message.
- Fixed the white screen issue when opening the Center app on Ubuntu.
- Fixed flickering white screen during the first load of the News view.
- Fixed issue allowing Mudita Center to be saved into an index.html file by clicking Alt + Left Click on menu items.
- Fixed an issue where Mudita Center did not recognize lost internet connection while checking for device updates.
- Fixed an issue where the 'Upload failed' popup was not displayed.
- Fixed unexpected animation of menu items in Mudita Center.
- Fixed an issue where the 'Select file' window on Linux Ubuntu did not display at the front after the first opening.
- Fixed a typo in the vCard extension in the "Import contacts" modal.
- Fixed an issue where the device color changed from white to black in the overview tab while creating Restore or Backup.
- Fixed the issue where the black Harmony 2 device was displayed as grey in the MC overview.
- Fixed issue where Help Report was not sent, resulting in infinite sending.
- Fixed text error in "MuditaOS v\*\*\* was downloaded".
- Fixed white screen issue when opening Center app on Ubuntu - WebFrame.
- Fixed the issue where news partially overlapped the Mudita News Header.
- Fixed issue with two dots appearing after pressing F1, F2, etc., while entering the password.
- Updated outdated copyright on macOS.
- Fixed the issue where gray highlight was faster than the scroll tool on the right side of the contact search list.

## [2.2.8] - 2024-02-22

### Changed

- Removed the 100 files upload limit for Relaxation audio files in Mudita Center, aligning with Harmony's unlimited songs capacity.

### Fixed

- Implemented validation to ensure contact numbers are unique, preventing duplication and resolving the issue with endless synchronization when editing contacts.

## [2.2.7] - 2023-12-07

### Fixed

- Resolved an issue with updating from version 2.2.5 to 2.2.6 on Windows, requiring administrator rights for a successful update.
- Fixed the problem with clicking links in Terms of Service, preventing the opening of additional Electron windows.

## [2.2.6] - 2023-11-30

### Changed

- **Electron**: updated to version 26.0.0
- **Node.js**: updated to version 18.16.1
- **Chromedriver**: updated to version 116.0.0
- **Jest**: updated to version 29.0.0
- **React**: updated to version 18.2.0
- **TypeScript**: updated to version 5.2.2
- Additionally, unnecessary dependencies have been removed, resulting in a more streamlined and efficient project structure. This release includes various minor fixes and optimizations to enhance overall stability and user experience.

## [2.2.5] - 2023-11-23

### Changed

- Improved the connection between Mudita Pure and Mudita Center after disabling MTP

### Fixed

- Outlook import shows Mudita Center as verified publisher

## [2.2.4] - 2023-10-26

### Fixed

- Secondary phone number disappears after deleting it

### Changed

- Enhance of update badge status for Mudita Center
- Enhance of update badge status for OS

## [2.2.3] - 2023-05-10

### Fixed

- Fixed issue with breaking connection when deleting a large number of contacts
- Improved search results preview when searching for contacts in Contacts and Messages section
- Fixed issues with creating device backup and changing device
- Fixed an issue in which Mudita Center did not stop file transfer when the device was disconnected
- Added possibility to stop file upload if the user selected more files than can be uploaded to Mudita Harmony
- Added the possibility to upload only supported files in scenarios when selected files included unsupported ones instead of terminating the flow
- The formatting of headlines in News section articles has been improved
- Changed connection error flow to be more user-friendly
- Changed text in contacts import flow for a more intuitive one

## [2.2.2] - 2023-09-28

### Changed

- Improved handling of the onboarding process when connecting the phone to the Center app for the first time.
