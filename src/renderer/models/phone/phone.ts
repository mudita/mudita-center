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

type State = typeof initialStateValue

export default {
  state: initialStateValue,
  reducers: {
    handleInput(state: State, inputValue: string) {
      return {
        ...state,
        inputValue,
      }
    },
  },
  selectors: (slice: Slicer<State>) => ({
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
