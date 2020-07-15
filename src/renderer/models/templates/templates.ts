import Faker from "faker"
import { templates } from "Renderer/components/core/table/table.fake-data"
import { StateProps } from "Renderer/models/templates/templates.interface"
import { Slicer } from "@rematch/select"
import { filterTemplates } from "Renderer/models/templates/filter-templates"

import { Template } from "Renderer/modules/messages/tabs/templates-ui.component"

export type TemplateCallback = (param: Template) => void

const initalState: StateProps = {
  templates,
  searchValue: "",
}

const templateFactory = (
  id: string = Faker.random.uuid(),
  content: string = ""
): Template => ({ id, content })

export default {
  state: initalState,
  reducers: {
    changeSearchValue(
      state: StateProps,
      searchValue: StateProps["searchValue"]
    ) {
      return { ...state, searchValue }
    },
    createNewTemplate(state: StateProps, callback?: TemplateCallback) {
      const oldTemplates = state.templates || []
      const newState = {
        ...state,
        templates: [templateFactory(), ...oldTemplates],
      }

      if (callback) {
        /**
         * Due to selector laziness we have to resort to callbacks in order
         * to process newest state.
         */
        callback(newState.templates[0])
      }

      return newState
    },
  },
  selectors: (slice: Slicer<StateProps>) => ({
    filteredList() {
      return slice(({ templates: listOfTemplates, searchValue }) => {
        return filterTemplates(listOfTemplates, searchValue)
      })
    },
  }),
}
