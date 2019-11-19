# PDA: Mudita's Pure Desktop App

### A Boilerplate for an Easy Start with TypeScript, React, and Electron.

## Install
```bash
npm install
```

## Usage
Both processes have to be started **simultaneously** in different console tabs:

```bash
npm run start:renderer-dev
npm run start:main-dev
```

This will start the application with hot-reload so you can instantly start developing your application.

You can also run do the following to start both in a single process:

```bash
npm run start:dev
```

## Packaging
We use [Electron builder](https://www.electron.build/) to build and package the application. By default you can run the following to package for your current platform:

```bash
npm run dist
```

This will create a installer for your platform in the `releases` folder.

You can make builds for specific platforms (or multiple platforms) by using the options found [here](https://www.electron.build/cli). E.g. building for all platforms (Windows, Mac, Linux):

```bash
npm run dist -- -mwl
```

## Precommit and Prettier
This project comes with both Precommit and Prettier setup to ensure a consistent code style.
