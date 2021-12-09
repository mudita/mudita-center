/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum ImportContactsFlowTestIds {
  Start = "import-contacts-start",
  Downloading = "import-contacts-downloading",
  DownloadingError = "import-contacts-downloading-error",
  SelectingEmpty = "import-contacts-selecting-empty",
  Selecting = "import-contacts-selecting",
  ParsingError = "import-contacts-parsing-error",
  AuthorizationError = "import-contacts-authorization-error",
  Importing = "import-contacts-importing",
  Success = "import-contacts-success",
  Failed = "import-contacts-failed",
}
