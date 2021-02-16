/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { init, RematchDispatch, RematchRootState } from "@rematch/core"
import selectPlugin from "@rematch/select"
import {
  ExternalProvidersModels,
  models,
} from "Renderer/models/external-providers/external-providers.models"

const externalProvidersStore = init({
  name: "External providers",
  models,
  plugins: [selectPlugin()],
})

export const { select } = externalProvidersStore
export type RootState = RematchRootState<typeof models>
export type Dispatch = RematchDispatch<ExternalProvidersModels>
export type Store = typeof externalProvidersStore

export default externalProvidersStore
