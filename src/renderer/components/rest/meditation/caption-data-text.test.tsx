import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import CaptionDataText from "Renderer/components/rest/meditation/caption-data-text.component"

test("correct translation is displayed", () => {
  const intlExampleId = "view.name.meditation.dataBox.totalPracticeTime"
  const { container } = renderWithThemeAndIntl(
    <CaptionDataText id={intlExampleId} />
  )
  expect(container).toHaveTextContent(intlExampleId)
})
