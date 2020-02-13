import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import Modal, {
  ModalSize,
} from "Renderer/components/core/modal/modal.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

test("matches snapshot", () => {
  const { container } = renderWithThemeAndIntl(
    <Modal
      heading={<Text displayStyle={TextDisplayStyle.SmallText}>Heading</Text>}
      size={ModalSize.Medium}
    >
      <h1>lala</h1>
    </Modal>
  )
  expect(container.firstChild).toMatchSnapshot()
})
