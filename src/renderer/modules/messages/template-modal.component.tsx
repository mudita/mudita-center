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
  selectTemplate?: (template: string) => void
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

const TemplateText = styled(Text)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const TemplateModal: FunctionComponent<Props> = ({
  selectTemplate = noop,
  templates,
}) => (
  <ModalFrame
    size={ModalSize.Large}
    closeButton={false}
    title={intl.formatMessage({
      id: "view.name.messages.templatesModalTitle",
    })}
  >
    <TemplatesWrapper>
      {templates.map((template, index) => {
        const chooseTemplate = () => {
          selectTemplate(template)
        }
        return (
          <li
            key={index}
            data-testid="template-element"
            onClick={chooseTemplate}
          >
            <Row size={RowSize.Tiny} onClick={noop}>
              <TemplateText displayStyle={TextDisplayStyle.MediumText}>
                {template}
              </TemplateText>
            </Row>
          </li>
        )
      })}
    </TemplatesWrapper>
  </ModalFrame>
)

export default TemplateModal
