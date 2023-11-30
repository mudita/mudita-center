# Mudita Center changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased] - yyyy-mm-dd

Here we write upgrading notes for brands. It's a team effort to make them as
straightforward as possible.

## [2.2.5] - 2023-11-30

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
