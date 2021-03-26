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

To get the environment variables you need to perform the following steps:

1. Install AWS cli [Instruction][https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html]
2. Provide the AWS credentials via `aws configure` command (ask [Igor Bezsmertnyi](https://github.com/igorbezsmertnyi), [Mateusz Kocz](https://github.com/mateuszkocz) or [Piotr Leniec](https://github.com/piotrleniec-mudita) for adding you to the AWS organization and issuing the credentials)
3. Install globally [@mudita/sm-cli](https://www.npmjs.com/package/@mudita/sm-cli) via `npm i -g @mudita/sm-cli`
4. Run `sm-cli fetch`. It should create `.env` file in the root directory

Read more about [@mudita/sm-cli](https://github.com/mudita/secrets-manager)

There are migrations scripts that will allow you to mirror our setup from Phrase (which we use for translating the UI) and Contentful (which we use for managing the "News" section content and help articles):

- _to be added_

## Run Mudita Center development environment

Please run the following command to start the Mudita Center dev environment:

```bash
npm run develop
```

This will start the application with hot-reload so you can instantly start developing it. You can also enable logs by executing:

```bash
npm run develop — --stream
```

This command runs the User Interface and the backend simultaneously, however, if you wish to have logs from both processes in two separate consoles then please run the following commands in parallel in separate console tabs:

```bash
lerna run --scope @mudita/mudita-center-app dev:start:renderer
lerna run --scope @mudita/mudita-center-app dev:start:main
```

## Enable Developer mode inside the application

To run additional Developer mode in Mudita Center, tap on the right button of your mouse and select "Enable developer mode". You can also toggle it on/off using `Ctrl`/`Cmd`+`D` keys. When Developer mode is enabled, `Ctrl`/`Cmd`+`P` toggles simulating phone connection.

Using Developer mode you can:

- simulate a connected Mudita Pure phone
- load/clear default 'placeholder' topics in the "Messages" view
- load/clear default 'placeholder' contacts in the "Contacts" view
- load/clear default 'placeholder' events in the "Calendar" view

## Packaging

We use [Electron builder](https://www.electron.build/) to build and package the application. By default, you can run the following to package it for your current platform:

```bash
npm run dist
```

This will create an installer for your platform in the `releases` folder.

You can also build the app for all platforms (Windows, macOS, Linux) by using the `npm run dist:all` command.

You can also make builds for a specific platform (or multiple platforms) by using [the CLI options](https://www.electron.build/cli).

For example, building for Windows and Linux:

```bash
npm run dist -- -wl
```

**Note:** You might not be able to build the app for all platforms one one platform. Read more about it the ["Multi Platform Build" article](https://www.electron.build/multi-platform-build).

## Release

### Update NPM version in App

Remember to update npm version in `package.json` and `package-lock.json`. You can do it by following the commands:

```bash
cd packages/app
npm version CURRENT_VERSION + 1
```

## Troubleshooting common errors

### Font during development is slightly different from what I see in official app

That's because we're using `GT Pressura` font that can't be open-sourced, so we can't publish it in our repository.
Instead, for development purpose outside the Mudita company, we're using a `Roboto Condensed` font from Google which is quite similar.

More info about managing fonts [can be found here](packages/app/src/renderer/fonts/README.md).

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

- Windows: `C:\Users\<username>\AppData\Roaming\mudita-center`
- Linux: `~/.config/mudita-center`
- macOS: `~/Library/Application Support/mudita-center`
