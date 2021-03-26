# Mudita Center - design-system

This repo will contain Mudita Center design components.

## Instructions

### Installing

```
npm install
```

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

- Authentication error while publishing package

  ```
   code E401
   npm ERR! Unable to authenticate, need: Basic realm="GitHub Package Registry"
  ```

  **Solution:**
  Please make sure you have the GitHub access token provided in `.npmrc` file:

  ```
  //npm.pkg.github.com/:_authToken=YOUR_GH_TOKEN
  ```

  > **Note:** The token should have granted at least `write:packages` scope.

- Authentication error while downloading fonts (`npm run download:fonts`).

  **Solution:**
  Please make sure you have the following envs added in the `.env` file:

  ```
  GITHUB_ACCESS_TOKEN=
  FONTS_DIRECTORY_URL=https://raw.githubusercontent.com/mudita/mudita-dev-resources/master/fonts/gt-pressura/
  ```

  > **Note:** The token should have granted at least `repo` scope and be able to access `mudita/mudita-dev-resources` repository.
