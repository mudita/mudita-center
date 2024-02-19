# Mudita Center Project Setup and Troubleshooting Guide

## I. Installation and Configuration

### 1. Pre-requisites Installation

- **Git**: Download and install Git from [Git's official website](https://git-scm.com/).
- **Node.js**: Download Node.js version 18.16.1 from [Node.js official downloads](https://nodejs.org/en/download/), then install it and reboot your PC.
- **Chromedriver**: Install Chromedriver globally using npm: `npm install -g chromedriver`.

### 2. Mudita Center Setup

- **Clone Mudita Center**: Clone the `mudita/mudita-center` repository to your local machine.
- **Download Mudita Center Application**: Download the executable for Mudita Center from the Releases section on GitHub (`mudita/mudita-center`) and install it.
    - [Github: Releases · mudita/mudita-center](https://github.com/mudita/mudita-center/releases)
    - [Nexus: Sonatype Nexus Repository](https://www.sonatype.com/products/repository-oss)
- **Node.js Verification**: Verify the Node.js installation in your terminal with `node -v`.

### 3. Environment Configuration

- **Environment File**: Create or paste a `.env` file in the root folder of the repository. You will receive API keys and other necessary configurations from other developers or QA team members. The file includes various keys and URLs necessary for development, such as `PHRASE_API_KEY`, `MUDITA_CENTER_SERVER_URL`, etc.

### 4. Test Environment Setup

- **Navigate to Test Directory**: Use `cd apps/mudita-center-e2e` to move to the test directory.
- **.env File for Tests**: Similar to step 3, create or paste a `.env` file in the test directory with specific configurations for testing, including the path to the Mudita Center binary (`TEST_BINARY_PATH`), which varies by operating system.

### 5. Running Tests

- **Setup Command**: Run `npm run setup` from the root directory to prepare the environment.
- **Execute All Tests**: Use `npm run e2e:test` from the main folder or `npx wdio run wdio.conf.ts` in the `apps/mudita-center-e2e` folder to execute all tests.
- **Running Specific Tests**: For individual test scenarios, use `npx wdio run wdio.conf.ts --spec ./path/to/test/file`.

## II. Troubleshooting Common Issues

### 1. Pure and Linux Permissions

- **Issue**: Need to run `chmod` command each time Pure is restarted/connected, and Mudita Center loses permissions for the device.
- **Solution**:
    - Run `sudo ls -l /dev/ttyACM0` in Terminal to identify the group with device permissions (typically, `dialout`).
    - Add your username to the `dialout` group with `sudo adduser yourUsername dialout` or `sudo usermod -a -G dialout yourUsername`.
    - Restart your system.

### 2. Linux/MacOS Path Configuration for NVM

- **Issue**: Problems running the `nvm` command.
- **Solution**:
    - Verify your shell using `echo $SHELL` in Terminal.
    - Ensure `export NVM_DIR` is added to your shell startup file (.bash_profile, .zshrc, .profile, or .bashrc). If missing, add it manually.
    - Close and reopen your Terminal window or run `source ~/.zshrc`.

### 3. Issues with nx postsetup for Mudita Center

- **Problem**: Incorrect location of your `.env` file.
- **Solution**:
    - Ensure one `.env` file is in the main root folder of the app (`mudita-center`), and the second is within `mudita-center/apps/mudita-center-e2e`.

### 4. Automation Issues on MacOS

- **Issue**: Automation starts, but Mudita Center does not open.
- **Solution**:
    - Check your `apps/mudita-center-e2e/.env` file. Ensure the application path includes `Contents/MacOS/Mudita Center`, for example, `TEST_BINARY_PATH='/Applications/Mudita Center.app/Contents/MacOS/Mudita Center'`.

### 5. Running E2E Tests on Linux with AppImage

- **Issue**: Difficulty in executing end-to-end (e2e) tests for Mudita Center packaged as an AppImage on Linux systems.
- **Solution**:
    - **Extract the AppImage**: Before running tests, you need to extract the AppImage file. Use the command `chmod +x MuditaCenter.AppImage` to make the AppImage executable, followed by `./MuditaCenter.AppImage --appimage-extract` to extract it.
    - **Find the Binary**: After extraction, navigate to the `squashfs-root` directory. The executable file for the Mudita Center application, typically named `Mudita Center` or `AppRun`, is located here.
    - **Update .env File**: In your `apps/mudita-center-e2e/.env` file, update the `TEST_BINARY_PATH` to point to the extracted executable, for example, `TEST_BINARY_PATH='/path/to/extracted/AppImage/squashfs-root/Mudita Center'`.
    - **Permission Issues**: If you encounter permission issues with the extracted binary, run `chmod +x /path/to/extracted/AppImage/squashfs-root/Mudita Center` to ensure the file is executable.

## III. Continuous Integration and Deployment (CI/CD)
As of today, end-to-end (e2e) tests are not automated. We plan to incorporate them into our automation process in the future.

## IV. Related Documents

- [Coding Standards - Guidelines for Javascript/Typescript/WebdriverIO code reviews and Git Strategy](https://appnroll.atlassian.net/wiki/spaces/CP/pages/2050392249/Coding+Standards+-+Guidelines+for+Javascript+Typescript+WebdriverIO+code+reviews+and+Git+Strategy).
- **WebdriverIO Documentation**: For more information on getting started and best practices, visit [Getting Started with WebdriverIO](https://webdriver.io/docs/gettingstarted).
