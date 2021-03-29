# Mudita Center - design-system

This repo will contain Mudita Center design components.

## Instructions

### Installing

##### Dependencies

```
npm install
```

##### Additional fonts

To install an additional font (`GT Pressura`) which is used across different Mudita products, you need to run:

```
npm run download:fonts
```

> **Note:** Please make sure you have access rights to the font (refer to troubleshooting section).

### Release flow

1. Make the appropriate changes in `/packages/app`.

2. Rebuild the `design-system` package:
   ```
   cd packages/design-system
   npm run prerelease
   ```
3. Increase package version:

   ```
   npm version <version>
   ```

   > **Note:** For version `0.0.31` the command will be `npm version 0.0.30`.

4. Publish the package to the GitHub registry
   ```
   npm publish
   ```

> **Note:** Steps 3 and 4 can be replaced by using [@lerna/publish](https://github.com/lerna/lerna/tree/main/commands/publish#readme).

### Troubleshooting

- `401 Authentication` error while publishing package

  ```
  code E401
  npm ERR! Unable to authenticate, need: Basic realm="GitHub Package Registry"
  ```
  **Solution:**
  Please make sure you have the GitHub access token provided in `.npmrc` file:
  
  ```
  //npm.pkg.github.com/:_authToken=YOUR_GH_TOKEN
  ```
  
- `402 Payment Required` error while publishing package
  ```
  code E402
  npm ERR! 402 Payment Required - PUT https://registry.npmjs.org/@mudita%2fdesign-system - You must sign up for private packages
  ```
  **Solution:**
  Please make sure you have the registry parameter provided in `.npmrc` file:

  ```
  registry=https://npm.pkg.github.com/mudita
  ```

- Authentication error while downloading fonts (`npm run download:fonts`).

  **Solution:**
  Please make sure you have the following envs added in the `.env` file:

  ```
  GITHUB_ACCESS_TOKEN=
  FONTS_DIRECTORY_URL=https://raw.githubusercontent.com/mudita/mudita-dev-resources/master/fonts/gt-pressura/
  ```

  > **Note:** The token should have granted at least `repo` scope and be able to access `mudita/mudita-dev-resources` repository.
