/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { OpenDialogOptions } from "electron"
import { PayloadAction } from "@reduxjs/toolkit"
import { getPaths } from "shared/app-state"
import { ResultObject } from "Core/core/builder"
import { TmpDispatch } from "Core/__deprecated__/renderer/store"

/**
 * `getPathsWrapper` simplifies testing the `getPaths` thunk by isolating dispatch calls,
 * addressing challenges with mocking `shared/app-state`. It streamlines unit testing,
 * minimizing the need for direct involvement of the store and external APIs.
 */
export const getPathsWrapper = async (
  dispatch: TmpDispatch,
  options: OpenDialogOptions
): Promise<PayloadAction<ResultObject<string[] | undefined>>> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  dispatch(getPaths(options))
