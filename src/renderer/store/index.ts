import { init } from "@rematch/core"
import selectPlugin from "@rematch/select"

import models from "Renderer/models/models"

const store = init({
  models,
  plugins: [selectPlugin()],
})

export const { select } = store

export type Store = typeof store

export default store
