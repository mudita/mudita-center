import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import Modal from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import styled from "styled-components"
import {
  Row,
  RowSize,
} from "App/renderer/components/core/table/table.component"
import { noop } from "Renderer/utils/noop"
import { intl } from "Renderer/utils/intl"

interface Props {
  templates: string[]
}

const ModalFrame = styled(Modal)`
  background-color: white;
  margin-bottom: 14.8rem;
`

const TemplatesWrapper = styled.ul`
  margin-top: 2.2rem;
  list-style-type: none;
  padding: 0;
`

const TemplateModal: FunctionComponent<Props> = ({ templates }) => (
  <ModalFrame
    size={ModalSize.Large}
    closeButton={false}
    title={intl.formatMessage({ id: "view.name.messages.templatesModalTitle" })}
  >
    <TemplatesWrapper>
      {templates.map((template, index) => (
        <li key={index} data-testid="template-element">
          <Row size={RowSize.Tiny} onClick={noop}>
            <Text displayStyle={TextDisplayStyle.MediumText}>{template}</Text>
          </Row>
        </li>
      ))}
    </TemplatesWrapper>
  </ModalFrame>
)

export default TemplateModal
