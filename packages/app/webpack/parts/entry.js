module.exports = (renderer) =>
  renderer
    ? {
        app: ["@babel/polyfill", "./src/__deprecated__/renderer/app.tsx"],
      }
    : {
        main: "./src/__deprecated__/main/main.ts",
      }
