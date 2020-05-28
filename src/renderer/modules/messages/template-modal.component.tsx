import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import Modal from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import styled from "styled-components"

interface Props {
  templates: string[]
}

const ModalTitle = styled(Text)`
  margin-left: 3rem;
`

const TemplateModal: FunctionComponent<Props> = ({ templates }) => (
  <ModalTitle size={ModalSize.Large} closeButton={false}>
    <Text displayStyle={TextDisplayStyle.LargeBoldText}>lala</Text>
  </ModalTitle>
)

export default TemplateModal
