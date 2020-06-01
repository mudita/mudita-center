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
import { backgroundColor } from "Renderer/styles/theming/theme-getters"

interface Template {
  id: string
  content: string
}

interface Props {
  templates: Template[]
  selectTemplate?: (id: string) => void
}

const ModalFrame = styled(Modal)`
  background-color: ${backgroundColor("light")};
  margin-bottom: calc(14rem - 4rem);
`

const TemplatesWrapper = styled.ul`
  margin-top: 2.2rem;
  list-style-type: none;
  padding: 0;
`

const TemplateRow = styled(Row)`
  height: 4.8rem;
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
          selectTemplate(template.id)
        }
        return (
          <li
            key={index}
            data-testid="template-element"
            onClick={chooseTemplate}
          >
            <TemplateRow size={RowSize.Tiny}>
              <TemplateText displayStyle={TextDisplayStyle.MediumText}>
                {template.content}
              </TemplateText>
            </TemplateRow>
          </li>
        )
      })}
    </TemplatesWrapper>
  </ModalFrame>
)

export default TemplateModal
