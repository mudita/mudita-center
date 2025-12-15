/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "types-preload"

export const AppFileSystem = {
  rm: window.api.appFileSystem.rm,
  mkdir: window.api.appFileSystem.mkdir,
  archive: window.api.appFileSystem.archive,
  writeFile: window.api.appFileSystem.writeFile,
  readFile: window.api.appFileSystem.readFile,
  readDir: window.api.appFileSystem.readDir,
  pathExists: window.api.appFileSystem.pathExists,
  fileStats: window.api.appFileSystem.fileStats,
  calculateFileCrc32: window.api.appFileSystem.calculateFileCrc32,
  readFileChunk: window.api.appFileSystem.readFileChunk,
  writeFileChunk: window.api.appFileSystem.writeFileChunk,
  extract: window.api.appFileSystem.extract,
  openDirectory: window.api.appFileSystem.openDirectory,
  getPath: window.api.appFileSystem.getPath,
}
