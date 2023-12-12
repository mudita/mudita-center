module.exports = (renderer) =>
  renderer
    ? {
        app: ["@babel/polyfill", "./src/app.tsx"],
      }
    : {
        main: "./src/main.ts",
      }
