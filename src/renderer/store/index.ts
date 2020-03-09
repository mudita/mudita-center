import { init, RematchDispatch, RematchRootState } from "@rematch/core"
import selectPlugin from "@rematch/select"
import { models, RootModel } from "Renderer/models/models"

const store = init({
  models,
  plugins: [selectPlugin()],
})

export const { select } = store
export type RootState = RematchRootState<typeof models>
export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>

export default store
