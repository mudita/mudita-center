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

interface Props {
  templates: string[]
}

const ModalTitle = styled(Text)`
  margin-left: 3rem;
`

const RowsWrapper = styled.div`
  padding: 4rem;
`

const ModalFrame = styled(Modal)`
  background-color: white;
`

const TemplateModal: FunctionComponent<Props> = ({ templates }) => (
  <ModalFrame size={ModalSize.Large} closeButton={false}>
    <ModalTitle displayStyle={TextDisplayStyle.LargeBoldText}>lala</ModalTitle>
    <RowsWrapper>
      {templates.map((template, index) => (
        <Row size={RowSize.Tiny} key={index}>
          <Text displayStyle={TextDisplayStyle.MediumText}>lala</Text>
        </Row>
      ))}
    </RowsWrapper>
  </ModalFrame>
)

export default TemplateModal
