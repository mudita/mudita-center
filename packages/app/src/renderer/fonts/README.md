## Fonts

#### Intro

There are two fonts defined in the app:

- _GT Pressura_

  It's the main font of the app, but the licensing doesn't allow us to store it on a public repo. It may be used only internally by Mudita developers or in a built application. However, you can always buy and use a font on your own.

- _Roboto Condensed_

  This is a fallback font that is used only when _GT Pressura_ is not available. It's open-sourced, so we can freely store it in the repo. Also, it's quite similar to the main font, so should be enough for development purposes.

#### Adding own font

To add an own font to the project, you have to replace the files from `fallback` directory or add the new ones to the `main` folder.
In both cases, the following structure must be preserved:

1. `style.css` file with _@font-face_ definitions:

   ```CSS
   @font-face {
    font-family: "GT Pressura";
    font-weight: 300;
    font-display: fallback;
    src: url(./GT-Pressura-Light.otf) format("opentype");
   }
   @font-face {
    font-family: "GT Pressura";
    font-weight: 400;
    font-display: fallback;
    src: url(./GT-Pressura-Regular.otf) format("opentype");
   }
   @font-face {
    font-family: "GT Pressura";
    font-weight: 700;
    font-display: fallback;
    src: url(./GT-Pressura-Bold.otf) format("opentype");
   }
   ```

   > **Note:** By default, we're using only 300, 400 and 700 weights with no italics, but it's up to you if you need more variety.

2. `*.otf` files according to those defined in `style.css` file. If you don't have the `otf` file, you can use one of the online font converter like [onlinefontconverter.com](https://onlinefontconverter.com).
