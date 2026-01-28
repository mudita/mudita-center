# Quickstart

To follow these instructions you need to have [Node.js 24.13](https://nodejs.org) installed on your local machine.

**Note:** Mudita Center utilizes Node.js and npm versions [specified in `package.json` file](package.json#L264). To change your currently installed version of Node.js please use [Node Version Manager](https://github.com/nvm-sh/nvm).

**Note:** Mudita Center utilizes [Nx](https://nx.dev) for managing packages contained in this repository. Nx installs the main packages and links internal dependencies. The project has been set up in a way which enables running test and linters for every package separately.

**Note:** Mudita Center utilizes [electron-vite](https://electron-vite.org/guide/) for building and packaging the application.

## Install packages

After cloning the repository to your local environment please install all packages by typing:

```bash
npm run setup
```

### Set up environmental variables

Please run the following command to copy and rename `.env.example` file

```bash
cp .env.example .env
```

Please keep in mind that we can not give full access to all environments to the Open Source community, so part of the integration may not work, but it should not affect the development process and the work of the application.

If you are Mudita employee please follow these [instructions](https://appnroll.atlassian.net/wiki/spaces/CD/pages/1852899454/How-to+Login+into+Bitwarden).

### Initial Git configuration

Please do not commit changes in the following files:

- libs/news/main/src/lib/default-news.json
- libs/help/main/src/lib/default-help.json

To ensure that files will be excluded from commits you can use the following git commands.

```bash
 git update-index --assume-unchanged libs/news/main/src/lib/default-news.json
 git update-index --assume-unchanged libs/help/main/src/lib/default-help.json
```

## Run Mudita Center development environment

Please run the following command to start the Mudita Center dev environment:

```bash
npm run start
```

This will start the application with hot-reload so you can instantly start developing it.

## Packaging

We use [Electron builder](https://www.electron.build/) to build and package the application. You can run one of the following commands to package it, depending on your current platform:

- MacOS:
  ```bash
  npm run build:mac
  ```
- Windows:
  ```bash
  npm run build:win
  ```
- Linux:
  ```bash
  npm run build:linux
  ```

This will create a package in a distributable format inside the `apps/app/release` folder.

**Note:** You might not be able to build the app for all platforms on one platform. Read more about it the ["Multi Platform Build" article](https://www.electron.build/multi-platform-build).

For more info, please refer to the [scripts manual](./SCRIPTS.md#building).

```bash
npm run build:mac -- --dir
```

## Release

### Update NPM version in App

Remember to update npm version in `package.json` and `package-lock.json`. You can do it by following the commands:

```bash
cd apps/app
npm version NEW_VERSION
```

## Troubleshooting common errors

### Font during development is slightly different from what I see in official app

That's because we're using `GT Pressura` font that can't be open-sourced, so we can't publish it in our repository.
Instead, for development purpose outside the Mudita company, we're using a `Roboto Condensed` font from Google which is quite similar.

### During `npm run setup` there's an issue with `node-gyp` and `python`

Make sure you have proper Python version installed (3.10).

Example on how to install it on macOS using Homebrew:

1. ```shell
   brew install python@3.10
   ```
2. ```shell
   export PYTHON=/opt/homebrew/bin/python3.10
   ```
3. ```shell
   source ~/.zshrc
   ```

### I am unable to update Pure soft with the application in the development mode

When you are in the development mode and you try to update your phone to the latest version, it may happen that it would not work (due to our internal bug). To fix this, try to change `FEATURE_TOGGLE_ENVIRONMENT` from `development` to `production`.

Disclaimer:
When you read this, it may happen that this problem does not exist anymore - it means that the bug was fixed.

### I am unable to run the application that has version equal or older than 1.3 (due to webpack errors)

Solution:
In the file `rules.js`, find a function `tsxMain` add to `plugins` array:

```
    ["@babel/plugin-proposal-optional-chaining"],
    ["@babel/plugin-proposal-nullish-coalescing-operator"],
```

## How to get logs from the built application

Logs are saved in file logs folder. The file format is `mudita-center-YYYY-MM-DD.log`.

- Windows: `C:\Users\<username>\AppData\Roaming\mudita-center\new-logs`
- Linux: `~/.config/mudita-center/new-logs`
- macOS: `~/Library/Application Support/mudita-center/new-logs`
