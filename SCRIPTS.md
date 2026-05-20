# Scripts manual

## About

This document explains different scripts available in the `package.json`.
It's split into different sections:

### Main

```bash
npm run setup # sets up the project locally
npm run postsetup # automatically runs after setup, running additional tasks required to finalize the setup
npm run postinstall # runs automatically after every npm install
```

### Development

```bash
npm run start # starts Mudita Center in development mode with hot-reload for renderer process
npm run start:watch # starts Mudita Center in development mode with hot-reload for main and renderer processes
npm run preview # builds and opens a preview of the production build
```

**Note:** `start:watch` command may trigger app close and full rebuild when updating code in the main process. Use it with caution.

### Building

```bash
npm run build:mac # builds the app for macOS
npm run build:win # builds the app for Windows
npm run build:linux # builds the app for Linux
```

You can also generate only a package directory without really packaging it by passing a `--dir` flag, which is useful for testing purposes as it speeds up the build process.

**Note:** You might not be able to build the app for all platforms on one platform. Read more about it the ["Multi Platform Build" article](https://www.electron.build/multi-platform-build).

### Code quality

```bash
npm run lint # lints all packages
npm run test # runs Jest tests for all packages
npm run test:e2e # runs WebDriverIO end-to-end tests
```

**Note:** For end-to-end tests to run properly, Mudita Center app must not be running in the background. You also need to build the app first, using the `npm run build:<your_platform>` command (building with a `-- --dir` flag is enough).

### Storybook

```bash
npm run storybook # starts Storybook for UI components development
npm run build:storybook # builds Storybook static site
```

### Nx utilities

```bash
npm run nx:update # updates Nx and its dependencies to the latest version
npm run nx:migrate # migrates the workspace to the latest Nx version
npm run nx:reset # resets the Nx cache
```

More about Nx CLI can be found in the [official Nx documentation](https://nx.dev/docs/reference/nx-commands).

### Project tools

```bash
npm run audit:icons # audits icon usage in the project to make sure they are properly prepared
```
