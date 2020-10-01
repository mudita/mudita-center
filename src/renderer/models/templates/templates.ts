import Faker from "faker"
import {
  SortOrder,
  StateProps,
} from "Renderer/models/templates/templates.interface"
import { Slicer } from "@rematch/select"
import { filterTemplates } from "Renderer/models/templates/filter-templates"
import { Template } from "Renderer/modules/messages/tabs/templates.component"
import { orderBy } from "lodash"

export type TemplateCallback = (param: Template) => void

export const initialState: StateProps = {
  templates: [],
  searchValue: "",
  sortOrder: SortOrder.Descending,
}

export const makeTemplate = (
  id: string = Faker.random.uuid(),
  content = "",
  date = new Date()
): Template => ({ id, content, date })

export default {
  state: initialState,
  reducers: {
    changeSortOrder(state: StateProps, sortOrder: SortOrder) {
      return { ...state, sortOrder }
    },
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
        templates: [makeTemplate(), ...oldTemplates],
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
    saveTemplate(state: StateProps, templateData: Template) {
      const modifiedTemplates = state.templates?.map((template: Template) => {
        if (template.id === templateData.id) {
          return templateData
        }

        return template
      })

      if (modifiedTemplates) {
        return {
          ...state,
          templates: modifiedTemplates,
        }
      }

      return state
    },
    removeItems(state: StateProps, itemsToRemove: string[]) {
      return {
        ...state,
        templates: state.templates?.filter(
          ({ id }) => !itemsToRemove.includes(id)
        ),
      }
    },
  },
  selectors: (slice: Slicer<StateProps>) => ({
    filteredList() {
      return slice(({ templates: listOfTemplates, searchValue, sortOrder }) => {
        const filteredTemplates = filterTemplates(listOfTemplates, searchValue)
        return orderBy(filteredTemplates, ["date"], [sortOrder])
      })
    },
  }),
}
