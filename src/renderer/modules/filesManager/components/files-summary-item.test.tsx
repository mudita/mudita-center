import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { Router } from "react-router"
import FilesSummaryItem from "Renderer/modules/filesManager/components/files-summary-item.component"
import history from "Renderer/routes/history"
import VoiceRecorder from "Renderer/svg/voice-recorder.svg"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

const fakeDataWithUrl = {
  filesType: "Voice Recorder",
  occupiedMemory: 4294967296,
  filesAmount: 3,
  color: "#AEBEC9",
  icon: VoiceRecorder,
  url: "/tools/voice-recorder",
}

const { url, ...fakeDataWithoutUrl } = fakeDataWithUrl

test("should match snapshot with link", () => {
  const { container } = renderWithThemeAndIntl(
    <Router history={history}>
      <FilesSummaryItem {...fakeDataWithUrl} />
    </Router>
  )
  expect(container.firstChild).toMatchSnapshot()
})

test("should match snapshot without link", () => {
  const { container } = renderWithThemeAndIntl(
    <Router history={history}>
      <FilesSummaryItem {...fakeDataWithoutUrl} />
    </Router>
  )
  expect(container.firstChild).toMatchSnapshot()
})

test("should render", () => {
  const { container } = renderWithThemeAndIntl(
    <Router history={history}>
      <FilesSummaryItem {...fakeDataWithUrl} />
    </Router>
  )
  expect(container.firstChild).toBeInTheDocument()
})

test("should render", () => {
  const { container } = renderWithThemeAndIntl(
    <Router history={history}>
      <FilesSummaryItem {...fakeDataWithoutUrl} />
    </Router>
  )
  expect(container.firstChild).toBeInTheDocument()
})

test("should render link", () => {
  const { container } = renderWithThemeAndIntl(
    <Router history={history}>
      <FilesSummaryItem {...fakeDataWithUrl} />
    </Router>
  )
  const link = container.querySelector("a")
  expect(link).toBeInTheDocument()
  expect(link).toHaveAttribute("href", "#/tools/voice-recorder")
})

test("should render without link", () => {
  const { container } = renderWithThemeAndIntl(
    <Router history={history}>
      <FilesSummaryItem {...fakeDataWithoutUrl} />
    </Router>
  )
  const link = container.querySelector("a")
  expect(link).not.toBeInTheDocument()
})
