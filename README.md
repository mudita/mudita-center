# PDA: Mudita's Pure Desktop App

### A Boilerplate for an Easy Start with TypeScript, React, and Electron.

## Install

```bash
npm install
```

## Usage

Both processes have to be started **simultaneously** in different console tabs:

```bash
npm run dev:start:renderer
npm run dev:start:main
```

This will start the application with hot-reload so you can instantly start developing your application.

You can also run do the following to start both in a single process:

```bash
npm run dev:start
```

## Packaging

We use [Electron builder](https://www.electron.build/) to build and package the application. By default, you can run the following to package for your current platform:

```bash
npm run dist:all
```

This will create an installer for your platform in the `releases` folder.

You can make builds for specific platforms (or multiple platforms) by using the options found [here](https://www.electron.build/cli). E.g. building for all platforms (Windows, Mac, Linux):

```bash
npm run dist -- -mwl
```

## Precommit and Prettier

This project comes with both Precommit and Prettier setup to ensure a consistent code style.

## Troubleshooting

- ##### Error:
  ```
  Uncaught Error: The module '../node_modules/@serialport/bindings/build/Release/bindings.node'
  was compiled against a different Node.js version using
  NODE_MODULE_VERSION 72. This version of Node.js requires
  NODE_MODULE_VERSION 75. Please try re-compiling or re-installing
  the module (for instance, using `npm rebuild` or `npm install`).
  ```
  ##### Solution:
  ```bash
  electron-rebuild -f -w serialport
  ```
  > :warning: To omit possible issues, you should execute the above command after every dependencies update.
