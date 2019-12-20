import { Slicer } from "@rematch/select"
import { FilesManagerState } from "Renderer/models/files-manager/files-manager.interface"

const initialStateValue: FilesManagerState = {
  memoryData: [
    {
      filesType: "Music",
      occupiedMemory: 58485385,
      filesAmount: 15,
      color: "#000000",
    },
    {
      filesType: "Voice Recorder",
      occupiedMemory: 58485,
      filesAmount: 3,
      color: "#000000",
    },
    {
      filesType: "Storage",
      occupiedMemory: 58485385111,
      filesAmount: 85,
      color: "#000000",
    },
    {
      filesType: "Music",
      occupiedMemory: 5848538522,
      filesAmount: 44,
      color: "#000000",
    },
  ],
}

export default {
  state: initialStateValue,
  selectors: (slice: Slicer<typeof initialStateValue>) => ({
    grouped() {
      return slice(state => {
        return state
      })
    },
  }),
}
