import { init, RematchDispatch, RematchRootState } from "@rematch/core"
import selectPlugin from "@rematch/select"
import immerPlugin from "@rematch/immer"
import {
  ExternalProvidersModels,
  models,
} from "Renderer/models/external-providers/external-providers.models"

const externalProvidersStore = init({
  models,
  plugins: [selectPlugin(), immerPlugin()],
})

export const { select } = externalProvidersStore
export type RootState = RematchRootState<typeof models>
export type Dispatch = RematchDispatch<ExternalProvidersModels>
export type Store = typeof externalProvidersStore

export default externalProvidersStore
