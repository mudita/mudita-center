import { Slicer } from "@rematch/select"
import {
  filterContacts,
  generateFakeData,
  generateSortedStructure,
  removeEmptyContacts,
} from "Renderer/models/phone/utils/utils"

const initialStateValue = {
  contacts: generateFakeData(20),
  inputValue: "",
}

export default {
  state: initialStateValue,
  reducers: {
    handleInput(state: any, inputValue: string) {
      return {
        ...state,
        inputValue,
      }
    },
  },
  selectors: (slice: Slicer<typeof initialStateValue>) => ({
    grouped() {
      return slice(state => {
        return removeEmptyContacts(
          filterContacts(
            generateSortedStructure(state.contacts),
            state.inputValue
          )
        )
      })
    },
  }),
}
