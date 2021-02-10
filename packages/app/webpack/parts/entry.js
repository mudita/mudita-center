module.exports = (renderer) =>
  renderer
    ? {
        app: ["@babel/polyfill", "./src/renderer/app.tsx"],
      }
    : {
        main: "./src/main/main.ts",
      }
