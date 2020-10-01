import Faker from "faker"
import { StateProps } from "Renderer/models/templates/templates.interface"
import { Slicer } from "@rematch/select"
import { filterTemplates } from "Renderer/models/templates/filter-templates"
import { Template } from "Renderer/modules/messages/tabs/templates.component"

export type TemplateCallback = (param: Template) => void

export const initialState: StateProps = {
  templatesList: [],
  searchValue: "",
}

export const makeNewTemplate = (
  id: string = Faker.random.uuid(),
  content = "",
  date = new Date()
): Template => ({ id, content, date })

export default {
  state: initialState,
  reducers: {
    changeSearchValue(
      state: StateProps,
      searchValue: StateProps["searchValue"]
    ) {
      return { ...state, searchValue }
    },
    createNewTemplate(state: StateProps, callback?: TemplateCallback) {
      const oldTemplates = state.templatesList || []
      const newTemplate = makeNewTemplate()
      const newState = {
        ...state,
        newTemplateId: newTemplate.id,
        templatesList: [newTemplate, ...oldTemplates],
      }

      if (callback) {
        /**
         * Due to selector laziness we have to resort to callbacks in order
         * to process newest state.
         */
        callback(newTemplate)
      }

      return newState
    },
    saveTemplate(state: StateProps, templateData: Template) {
      const modifiedTemplates = state.templatesList?.map(
        (template: Template) => {
          if (template.id === templateData.id) {
            return templateData
          }

          return template
        }
      )

      if (modifiedTemplates) {
        return {
          ...state,
          ...(state.newTemplateId === templateData.id
            ? { newTemplateId: undefined }
            : {}),
          templatesList: modifiedTemplates,
        }
      }

      return state
    },
    removeTemplates(state: StateProps, itemsToRemove: string[]) {
      const templates = state.templatesList?.filter(
        ({ id }: Template) => !itemsToRemove.includes(id)
      )
      return {
        ...state,
        ...(state.newTemplateId && itemsToRemove.includes(state.newTemplateId)
          ? { newTemplateId: undefined }
          : {}),
        templatesList: templates,
      }
    },
  },
  selectors: (slice: Slicer<StateProps>) => ({
    filteredList() {
      return slice(({ templatesList: listOfTemplates, searchValue }) => {
        return filterTemplates(listOfTemplates, searchValue)
      })
    },
  }),
}
