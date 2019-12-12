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
    handleInput(state: any, payload: string) {
      return Object.assign({}, state, {
        inputValue: payload,
      })
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
