import { Slicer } from "@rematch/select"
import { URL_MAIN } from "Renderer/constants/urls"
import { FilesManagerState } from "Renderer/models/files-manager/files-manager.interface"
import { prepareDataForStackedBarChart } from "Renderer/models/files-manager/utils"
import FilesManager from "Renderer/svg/files-manager.svg"
import Mudita from "Renderer/svg/mudita.svg"
import Music from "Renderer/svg/music.svg"
import VoiceRecorder from "Renderer/svg/voice-recorder.svg"

const initialStateValue: FilesManagerState = {
  memoryData: [
    {
      filesType: "Music",
      occupiedMemory: 5848538500,
      filesAmount: 15,
      color: "#6D9BBC",
      icon: Music,
      url: URL_MAIN.music,
    },
    {
      filesType: "Voice Recorder",
      occupiedMemory: 584850000,
      filesAmount: 3,
      color: "#AEBEC9",
      icon: VoiceRecorder,
      url: "/tools/voice-recorder",
    },
    {
      filesType: "Storage",
      occupiedMemory: 984443800,
      filesAmount: 85,
      color: "#E3F3FF",
      icon: FilesManager,
    },
    {
      filesType: "Free",
      occupiedMemory: 5848538522,
      filesAmount: 44,
      color: "#E9E9E9",
      icon: Mudita,
    },
  ],
}

export default {
  state: initialStateValue,
  selectors: (slice: Slicer<typeof initialStateValue>) => ({
    stackedBarChart() {
      return slice(state => {
        return prepareDataForStackedBarChart(state)
      })
    },
    memoryChart() {
      return slice(state => {
        return state.memoryData
      })
    },
  }),
}
