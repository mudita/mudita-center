import { storiesOf } from "@storybook/react"
import React from "react"
import Messages from "./messages.component"
import { rowsMessages } from "Renderer/components/core/table/table.fake-data"
import TemplateModal from "Renderer/modules/messages/template-modal.component"
import styled from "styled-components"
import {
  ModalBackdrop,
  ModalWrapper,
} from "Renderer/components/core/modal/modal.styled.elements"
import {
  mockedTemplateData,
  extendedTemplateData,
} from "Renderer/modules/messages/__mocks__/template-modal-data"
import { Provider } from "react-redux"
import { init } from "@rematch/core"
import selectPlugin from "@rematch/select"
import devMode from "Renderer/models/dev-mode/dev-mode"

const TemplateModalWrapper = styled(ModalWrapper)`
  padding: 4rem 3.2rem;
`

const store = init({ models: { devMode }, plugins: [selectPlugin()] })

storiesOf("Views|Messages", module).add("Messages", () => (
  <div style={{ maxWidth: "97.5rem" }}>
    <Provider store={store}>
      <Messages list={rowsMessages} searchValue={""} />
    </Provider>
  </div>
))

storiesOf("Views|Messages/Modals", module)
  .add("Template modal", () => (
    <div style={{ maxWidth: "97.5rem" }}>
      <TemplateModalWrapper>
        <TemplateModal templates={mockedTemplateData} />
      </TemplateModalWrapper>
      <ModalBackdrop />
    </div>
  ))
  .add("Template modal - extended", () => (
    <div style={{ maxWidth: "97.5rem" }}>
      <TemplateModalWrapper>
        <TemplateModal templates={extendedTemplateData} />
      </TemplateModalWrapper>
      <ModalBackdrop />
    </div>
  ))
