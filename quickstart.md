# Quickstart

To follow these instructions you need to have [Node.js](https://nodejs.org) installed on your local machine.

**Note:** Mudita Center utilizes Node.js and npm versions [specified in `package.json` file](package.json#L264). To downgrade your currently installed version of Node.js please use [Node Version Manager](https://github.com/nvm-sh/nvm).

**Note:** Mudita Center utilizes [Lerna](https://github.com/lerna/lerna) for managing packages contained in this repository. Lerna installs the main packages and links internal dependencies. The project has been set up in a way which enables running test and linters for every package separately.

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

If you are Mudita employee please follow these [instructions](https://appnroll.atlassian.net/l/c/aSD9NC1u).

### Initial Git configuration

Please do not commit changes in the following files:

- libs/core/news/default-news.json
- libs/core/help/default-help.json
- libs/core/settings/static/app-configuration.json

To ensure that files will be excluded from commits you can use the following git commands.

```bash
 git update-index --assume-unchanged libs/core/news/default-news.json
 git update-index --assume-unchanged libs/help/feature/src/lib/default-help.json
 git update-index --assume-unchanged libs/core/settings/static/app-configuration.json
```

## Run Mudita Center development environment

Please run the following command to start the Mudita Center dev environment:

```bash
npm run app:develop
```

This will start the application with hot-reload so you can instantly start developing it.

## Enable Developer mode inside the application

To run additional Developer mode in Mudita Center, tap on the right button of your mouse and select "Enable developer mode". You can also toggle it on/off using `Ctrl`/`Cmd`+`D` keys. When Developer mode is enabled you can:

- `Ctrl`/`Cmd`+`P` toggle simulating Mudita Pure connection.
- `Ctrl`/`Cmd`+`B` toggle simulating Mudita Harmony connection.

Using Developer mode you can:

- simulate a connected Mudita Pure device
- simulate a connected Mudita Harmony device
- load/clear default 'placeholder' topics in the "Messages" view
- load/clear default 'placeholder' contacts in the "Contacts" view
- load/clear default 'placeholder' events in the "Calendar" view

## Packaging

We use [Electron builder](https://www.electron.build/) to build and package the application. By default, you can run the following to package it for your current platform:

```bash
npm run app:dist
```

This will create an installer for your platform in the `releases` folder.

You can also make builds for a specific platform (or multiple platforms) by using [the CLI options](https://www.electron.build/cli).

For example, building for Windows and Linux:

```bash
npm run app:dist -- -wl
```

### Feature toggle environment separation

Also you are able to distribute an application with in specific predefined environment. The environment is responsible for handling the sets of feature toggles predefined for each release/test case.

To run distribution with feature toggle environment use the next formula:

```bash
FEATURE_TOGGLE_ENVIRONMENT=__environment__ npm run app:dist
```

For example:

```bash
FEATURE_TOGGLE_ENVIRONMENT=development npm run app:dist
```

Will distribute an application with development set of feature toggles

The Mudita Center have the next feature toggle environments:

- development
- production
- alpha-production

**Note:** You might not be able to build the app for all platforms one one platform. Read more about it the ["Multi Platform Build" article](https://www.electron.build/multi-platform-build).

## Release

### Update NPM version in App

Remember to update npm version in `package.json` and `package-lock.json`. You can do it by following the commands:

```bash
cd apps/mudita-center/
npm version CURRENT_VERSION + 1
```

## Troubleshooting common errors

### Font during development is slightly different from what I see in official app

That's because we're using `GT Pressura` font that can't be open-sourced, so we can't publish it in our repository.
Instead, for development purpose outside the Mudita company, we're using a `Roboto Condensed` font from Google which is quite similar.

More info about managing fonts [can be found here](apps/mudita-center/src/__deprecated__/renderer/fonts/README.md).

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

### Checking Node.js Architecture Compatibility After Migration to Apple Silicon

Incompatibility between the Node.js architecture and your Mac's processor (Intel vs. Apple Silicon) often occurs after migrating between devices with different processors. This test will help you determine if this is the source of the issue.

#### Example Error:

```
App threw an error during load
Error: dlopen(/path/to/node_modules/@serialport/bindings-cpp/prebuilds/darwin-x64+arm64/node.napi.node, 0x0001): 
tried: '.../node.napi.node' (mach-o file, but is an incompatible architecture (have 'x86_64', need 'arm64e' or 'arm64')),
...
```

#### Steps:

##### Check your computer's architecture:

```
arch
```

##### Check Node.js architecture:

```
node -p "process.arch"
```

##### Compare the results:

- If the computer's architecture and Node.js architecture are different, reinstall Node.js to match your computer's architecture.

### The module was compiled against a different Node.js version

```bash
Uncaught Error: The module '../node_modules/@serialport/bindings/build/Release/bindings.node'
was compiled against a different Node.js version using
NODE_MODULE_VERSION 72. This version of Node.js requires
NODE_MODULE_VERSION 75. Please try re-compiling or re-installing
the module (for instance, using `npm rebuild` or `npm install`).
```

Solution:

```bash
npm run app:electron:rebuild-serialport
```

### Config schema violation: `language` should be a string

```bash
Uncaught Exception:
Error: Config schema violation: `language` should be a string
```

Solution:

The same error may appear after any change in code that was done to settings without updating `settings.json`.

To fix that, `settings.json` file should be updated manually according to changes in code or automatically - by removing the `settings.json` and running the app again (this will create a new settings file with default values).

`settings.json` is located in:

- Windows: `C:\Users\<username>\AppData\Roaming\@mudita\mudita-center-app`
- Linux: `~/.config/@mudita/mudita-center-app`
- macOS: `~/Library/Application Support/@mudita/mudita-center-app`

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

Logs are saved in file logs folder. The file format is `mc-YYYY-MM-DD`.

- Windows: `C:\Users\<username>\AppData\Roaming\@mudita\mudita-center-app\logs`
- Linux: `~/.config/@mudita/mudita-center-app/logs`
- macOS: `~/Library/Application Support/@mudita/mudita-center-app/logs`
