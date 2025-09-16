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
  pathExists: window.api.appFileSystem.pathExists,
  fileStats: window.api.appFileSystem.fileStats,
  calculateFileCrc32: window.api.appFileSystem.calculateFileCrc32,
  readFileChunk: window.api.appFileSystem.readFileChunk,
}
