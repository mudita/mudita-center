/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum FileDialogToMainEvents {
  OpenFile = "file-dialog/open-file",
  ChooseDirectory = "file-dialog/choose-directory",
}

export enum FileDialogToRendererEvents {
  FileDialogOpened = "file-dialog/file-dialog-opened",
  FileDialogClosed = "file-dialog/file-dialog-closed",
}
