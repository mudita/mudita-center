import { Slicer } from "@rematch/select"
import {
  filterContacts,
  generateFakeData,
  generateSortedStructure,
} from "Renderer/models/phone/phone.utils"

const initialStateValue = {
  contacts: generateFakeData(40),
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
        return filterContacts(
          generateSortedStructure(state.contacts),
          state.inputValue
        )
      })
    },
  }),
}
