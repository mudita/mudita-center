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

const TemplateModal: FunctionComponent<Props> = ({ templates }) => (
  <ModalFrame
    size={ModalSize.Large}
    closeButton={false}
    title={intl.formatMessage({ id: "view.name.messages.templatesModalTitle" })}
  >
    <div>
      {templates.map((template, index) => (
        <Row size={RowSize.Tiny} key={index} onClick={noop}>
          <Text displayStyle={TextDisplayStyle.MediumText}>{template}</Text>
        </Row>
      ))}
    </div>
  </ModalFrame>
)

export default TemplateModal
