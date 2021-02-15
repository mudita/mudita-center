import React from "react"
import { storiesOf } from "@storybook/react"
import TemplateModal from "App/templates/components/template-modal.component"
import {
  ModalBackdrop,
  ModalWrapper,
} from "Renderer/components/core/modal/modal.styled.elements"
import {
  mockedTemplateData,
  extendedTemplateData,
} from "App/templates/__mocks__/template-modal-data"

storiesOf("Views|Templates/Modals", module)
  .add("Template modal", () => (
    <div style={{ maxWidth: "97.5rem" }}>
      <ModalWrapper>
        <TemplateModal templates={mockedTemplateData} />
      </ModalWrapper>
      <ModalBackdrop />
    </div>
  ))
  .add("Template modal - extended", () => (
    <div style={{ maxWidth: "97.5rem" }}>
      <ModalWrapper>
        <TemplateModal templates={extendedTemplateData} />
      </ModalWrapper>
      <ModalBackdrop />
    </div>
  ))
