# Mudita Center - design-system

This repo will contain Mudita Center design components.

## Usage

1. Install `@mudita/design-system` package:
   ```
   npm install --save @mudita/design-system
   ```
2. This package contains React components that are built using `styled-components` library so make sure you also have installed the `5.x` version, otherwise install it:
   ```
   npm install --save styled-components
   ```
3. Use the `ThemeProvider` and global styles from the package:

   ```TSX
   import { MuditaGlobalStyle, MuditaThemeProvider } from "@mudita/design-system"

   ReactDOM.render(
     <MuditaThemeProvider>
       <MuditaGlobalStyle />
       <App />
     </MuditaThemeProvider>,
     document.getElementById("root")
   )
   ```

4. Now you can use the library freely:

   ```TSX
   import {
     AppFunctionComponent,
     Text,
     TextDecorator,
     TextVariant,
   } from "@mudita/design-system"

   const SomeComponent: AppFunctionComponent = () => (
     <Text
       variant={TextVariant.HeadingPrimary}
       decorators={[TextDecorator.Accent]}
     >
       Mudita is awesome!
     </Text>
   )
   ```

### Fonts

The basic Mudita's font is `GT Pressura` but it's not open sourced, so we can't provide you with it. Instead, there's very similar font bundled - `Roboto Condensed`. However, you can still attach a `GT Pressura` font to your project if you [own it](https://www.grillitype.com/shops/gt-pressura):

```CSS
/* style.css */

@font-face {
 font-family: "GT Pressura";
 font-weight: 300;
 font-display: fallback;
 src: url(path/to/font/GT-Pressura-Light.otf) format("opentype");
}
@font-face {
 font-family: "GT Pressura";
 font-weight: 400;
 font-display: fallback;
 src: url(path/to/font/GT-Pressura-Regular.otf) format("opentype");
}
@font-face {
 font-family: "GT Pressura";
 font-weight: 700;
 font-display: fallback;
 src: url(path/to/font/GT-Pressura-Bold.otf) format("opentype");
}
```

Then, you just need to import the CSS file in your main app's component:

```TSX
// index.tsx

import "./path/to/font/style.css"

ReactDOM.render(...)
```

The `GT Pressura` font has bigger priority, so no additional actions are required. It will be immediately displayed instead of other fonts.

## Development

### Installation

1. Install dependencies:

   ```
   npm install
   ```

2. Install additional font - `GT Pressura` (optional):

   ```
   npm run download:fonts
   ```

   > **Note:** Please make sure you have access rights to the font (refer to troubleshooting section).

### Release flow

1. Make the appropriate changes in `/packages/app`.

2. Rebuild the `design-system` package:
   ```
   cd packages/design-system
   npm run build
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
