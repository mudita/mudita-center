module.exports = {
  name: "icons",
  inputDir: "./src/icons/assets",
  outputDir: "./dist",
  fontTypes: ["ttf", "woff", "woff2"],
  assetTypes: ["ts"],
  fontsUrl: "",
  formatOptions: {
    ts: {
      types: ["enum"],
    },
  },
  fontHeight: 300,
  descent: 150,
  selector: null,
  normalize: true,
  pathOptions: {
    ts: "./src/icons/icon.enum.ts",
  },
}
