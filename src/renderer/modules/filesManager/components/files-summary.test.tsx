import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { Router } from "react-router"
import { URL_MAIN } from "Renderer/constants/urls"
import FilesSummary from "Renderer/modules/filesManager/components/files-summary.component"
import history from "Renderer/routes/history"
import FilesManager from "Renderer/svg/files-manager.svg"
import Mudita from "Renderer/svg/mudita.svg"
import Music from "Renderer/svg/music.svg"
import VoiceRecorder from "Renderer/svg/voice-recorder.svg"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

const fakeData = [
  {
    filesType: "Music",
    occupiedMemory: 4294967296,
    filesAmount: 15,
    color: "#6D9BBC",
    icon: Music,
    url: URL_MAIN.music,
  },
  {
    filesType: "Voice Recorder",
    occupiedMemory: 4294967296,
    filesAmount: 3,
    color: "#AEBEC9",
    icon: VoiceRecorder,
    url: "/tools/voice-recorder",
  },
  {
    filesType: "Storage",
    occupiedMemory: 4294967296,
    filesAmount: 85,
    color: "#E3F3FF",
    icon: FilesManager,
  },
  {
    filesType: "Free",
    occupiedMemory: 4294967296,
    color: "#E9E9E9",
    icon: Mudita,
  },
]

test("should match snapshot", () => {
  const { container } = renderWithThemeAndIntl(
    <Router history={history}>
      <FilesSummary memoryChartData={fakeData} />
    </Router>
  )
  expect(container.firstChild).toMatchSnapshot()
})

test("should render", () => {
  const { container } = renderWithThemeAndIntl(
    <Router history={history}>
      <FilesSummary memoryChartData={fakeData} />
    </Router>
  )
  expect(container.firstChild).toBeInTheDocument()
})

test("correct amount of items should render", () => {
  const testId = "files-manager-item"
  const { queryAllByTestId } = renderWithThemeAndIntl(
    <Router history={history}>
      <FilesSummary memoryChartData={fakeData} />
    </Router>
  )
  expect(queryAllByTestId(testId)).toHaveLength(4)
})
