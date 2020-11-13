import {
  init,
  RematchDispatch,
  RematchRootState,
  InitConfig,
} from "@rematch/core"
import selectPlugin from "@rematch/select"
import { models, RootModel } from "Renderer/models/models"
import { filesManagerSeed } from "App/seeds/filesManager"
import { messagesSeed } from "App/seeds/messages"
import { templatesSeed } from "App/seeds/templates"
import { initialState } from "Renderer/models/phone/phone"
import { helpSeed } from "App/seeds/help"
import { notesSeed } from "App/seeds/notes"
import { calendarSeed } from "App/seeds/calendar"

const config: InitConfig<RootModel> = {
  models,
  plugins: [selectPlugin()],
}

if (process.env.NODE_ENV !== "test") {
  config.redux = {
    initialState: {
      filesManager: filesManagerSeed,
      messages: messagesSeed,
      templates: templatesSeed,
      phone: initialState,
      help: helpSeed,
      notes: notesSeed,
      calendar: calendarSeed,
    },
  }
}

const store = init(config)

export const { select } = store
export type RootState = RematchRootState<typeof models>
export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>

export default store
