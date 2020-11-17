# Quickstart

To follow these instructions you need to have [Node.js](https://nodejs.org) installed on your local machine.

**Note:** Mudita Center utilizes Node.js and npm versions [specified in `package.json` file](package.json#L264). To downgrade your currently installed version of Node.js please use [Node Version Manager](https://github.com/nvm-sh/nvm).

## Install packages

After cloning the repository to your local environment please install all packages by typing:

```bash
npm install
```

### Set up environmental variables

Create an `.env` file and copy the contents of the [`.env.example` file](.env.example) into it.

Please provide all values marked as required to start working with the project. Add optional values when you need them.

## Run Mudita Center development environment

Please run the following command to start the Mudita Center dev environment:

```bash
npm run develop
```

This will start the application with hot-reload so you can instantly start developing it.

This command runs the User Interface and the backend simultaneously, however, if you wish to have logs from both processes in two separate consoles then please run the following commands in parallel in separate console tabs:

```bash
npm run dev:start:renderer
npm run dev:start:main
```

## Initialize Developer Options inside the application

To run additional Developer Options in Mudita Center, click 7-10 times on the phone box on the "Overview" page. This enables Developer Options which include:

- a simulation of a connected Mudita Pure phone
- additional placeholder data which you can modify inside the app 

## Packaging

We use [Electron builder](https://www.electron.build/) to build and package the application. By default, you can run the following to package it for your current platform:

```bash
npm run dist:all
```

This will create an installer for your platform in the `releases` folder.

You can make builds for specific platforms (or multiple platforms) by using [the CLI options](https://www.electron.build/cli). 

For example, building for all platforms (Windows, macOS, Linux):

```bash
npm run dist -- -mwl
```

## Troubleshooting common errors

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
electron-rebuild -f -w serialport
```
**Note:** to omit possible issues, you should execute the above command after every dependency update.

### Config schema violation: `language` should be a string

```bash
Uncaught Exception:
Error: Config schema violation: `language` should be a string
```

Solution:

The same error will apply to any change that was done to settings without updating `settings json`. It can be manually updated by removing the old `settings.json` and creating a new one in its place. To do that please remove `settings.json`.

`settings.json` is located in:

- Windows: `C:\Users\<username>\AppData\Roaming\pure-desktop-app`
- Linux: `~/.config/pure-desktop-app`
- macOS: `~/Library/Application Support/pure-desktop-app`

The next step is to reopen the app by running `npm run develop` so the app can create a new `settings.json` locally.