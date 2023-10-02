# Notable update errors

## [v18]

- (node:72183) [DEP_WEBPACK_DEV_SERVER_ON_BEFORE_SETUP_MIDDLEWARE] DeprecationWarning: 'onBeforeSetupMiddleware' option is deprecated. Please use the 'setupMiddlewares' option.
  @mudita/mudita-center-app: (Use `node --trace-deprecation ...` to show where the warning was created)
- (node:74176) UnhandledPromiseRejectionWarning: TypeError: Cannot read properties of undefined (reading 'apply')
  @mudita/mudita-center-app:     at e.stackAlloc (webpack://@mudita/mudita-center-app/./node_modules/sql.js/dist/sql-wasm.js?:176:500)
  @mudita/mudita-center-app:     at Object.e.onRuntimeInitialized (webpack://@mudita/mudita-center-app/./node_modules/sql.js/dist/sql-wasm.js?:75:210)
  @mudita/mudita-center-app:     at a (webpack://@mudita/mudita-center-app/./node_modules/sql.js/dist/sql-wasm.js?:178:432)
  @mudita/mudita-center-app:     at dd (webpack://@mudita/mudita-center-app/./node_modules/sql.js/dist/sql-wasm.js?:179:317)
  @mudita/mudita-center-app:     at cd (webpack://@mudita/mudita-center-app/./node_modules/sql.js/dist/sql-wasm.js?:177:340)
  @mudita/mudita-center-app:     at a (webpack://@mudita/mudita-center-app/./node_modules/sql.js/dist/sql-wasm.js?:165:215)
  @mudita/mudita-center-app:     at b (webpack://@mudita/mudita-center-app/./node_modules/sql.js/dist/sql-wasm.js?:165:235)

### New
- @mudita/mudita-center-app: objc[75483]: Class WebSwapCGLLayer is implemented in both /System/Library/Frameworks/WebKit.framework/Versions/A/Frameworks/WebCore.framework/Versions/A/Frameworks/libANGLE-shared.dylib (0x7ffb49f00378) and /Users/danielkarski/projects/mudita-center/packages/app/node_modules/electron/dist/Electron.app/Contents/Frameworks/Electron Framework.framework/Versions/A/Libraries/libGLESv2.dylib (0x11162f9c8). One of the two will be used. Which one is undefined.
- [75475:1002/094716.038183:ERROR:CONSOLE(1)] "Request Network.loadNetworkResource failed. {"code":-32602,"message":"Unsupported URL scheme"}", source: devtools://devtools/bundled/core/protocol_client/protocol_client.js (1)

## [to v17]

- (node:72183) [DEP_WEBPACK_DEV_SERVER_ON_BEFORE_SETUP_MIDDLEWARE] DeprecationWarning: 'onBeforeSetupMiddleware' option is deprecated. Please use the 'setupMiddlewares' option.
  @mudita/mudita-center-app: (Use `node --trace-deprecation ...` to show where the warning was created)

### New 
- [74176:1002/093855.705739:ERROR:CONSOLE(1)] "Uncaught TypeError: Cannot read properties of undefined (reading 'instance')", source: devtools://devtools/bundled/devtools_app.html?remoteBase=https://chrome-devtools-frontend.appspot.com/serve_file/@7f5320c63197ddacf4c8094154bd0cd63af422b5/&can_dock=true&toolbarColor=rgba(223,223,223,1)&textColor=rgba(0,0,0,1)&experiments=true (1)
- (node:74176) UnhandledPromiseRejectionWarning: TypeError: Cannot read properties of undefined (reading 'apply')
   @mudita/mudita-center-app:     at e.stackAlloc (webpack://@mudita/mudita-center-app/./node_modules/sql.js/dist/sql-wasm.js?:176:500)
   @mudita/mudita-center-app:     at Object.e.onRuntimeInitialized (webpack://@mudita/mudita-center-app/./node_modules/sql.js/dist/sql-wasm.js?:75:210)
   @mudita/mudita-center-app:     at a (webpack://@mudita/mudita-center-app/./node_modules/sql.js/dist/sql-wasm.js?:178:432)
   @mudita/mudita-center-app:     at dd (webpack://@mudita/mudita-center-app/./node_modules/sql.js/dist/sql-wasm.js?:179:317)
   @mudita/mudita-center-app:     at cd (webpack://@mudita/mudita-center-app/./node_modules/sql.js/dist/sql-wasm.js?:177:340)
   @mudita/mudita-center-app:     at a (webpack://@mudita/mudita-center-app/./node_modules/sql.js/dist/sql-wasm.js?:165:215)
   @mudita/mudita-center-app:     at b (webpack://@mudita/mudita-center-app/./node_modules/sql.js/dist/sql-wasm.js?:165:235)
- (node:74176) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)

## [to v8]

- (node:72183) [DEP_WEBPACK_DEV_SERVER_ON_BEFORE_SETUP_MIDDLEWARE] DeprecationWarning: 'onBeforeSetupMiddleware' option is deprecated. Please use the 'setupMiddlewares' option.
  @mudita/mudita-center-app: (Use `node --trace-deprecation ...` to show where the warning was created)
- (electron) The default value of app.allowRendererProcessReuse is deprecated, it is currently "false".  It will change to be "true" in Electron 9.  For more information please check https://github.com/electron/electron/issues/18397
- (node:72294) DeprecationWarning: Passing functions, DOM objects and other non-cloneable JavaScript objects to IPC methods is deprecated and will throw an exception beginning with Electron 9.
