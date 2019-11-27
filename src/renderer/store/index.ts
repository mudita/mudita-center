import { init } from "@rematch/core"

import models from "Renderer/models/models"

const store = init({
  models,
})

export type Store = typeof store

export default store
