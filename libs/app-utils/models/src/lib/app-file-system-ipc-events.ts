/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum AppFileSystemIpcEvents {
  Rm = "appFileSystem:rm",
  Mkdir = "appFileSystem:mkdir",
  Archive = "appFileSystem:archive",
  WriteFile = "appFileSystem:writeFile",
  ReadFile = "appFileSystem:readFile",
  PathExists = "appFileSystem:pathExists",
  FileStats = "appFileSystem:fileStats",
  CalculateFileCrc32 = "appFileSystem:calculateFileCrc32",
  ReadFileChunk = "appFileSystem:readFileChunk",
  WriteFileChunk = "appFileSystem:writeFileChunk",
  Extract = "appFileSystem:extract",
}
