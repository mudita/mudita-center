import React from "react"
import Modal, {
  ModalProps,
} from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { intl } from "Renderer/utils/intl"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import { defineMessages } from "react-intl"
import styled from "styled-components"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import StackedBarChart, {
  DisplayStyle,
} from "Renderer/components/core/stacked-bar-chart/stacked-bar-chart.component"
import { RoundIconWrapper } from "Renderer/modules/overview/overview.modals"

const messages = defineMessages({
  title: {
    id: "view.name.phone.contacts.modal.importing.title",
  },
  subtitle: {
    id: "view.name.phone.contacts.modal.importing.subtitle",
  },
  body: {
    id: "view.name.phone.contacts.modal.importing.body",
  },
})

const Info = styled(ModalText)`
  width: 100%;
  text-align: center;
  margin-top: 0.5em;
`

const ProgressBar = styled(StackedBarChart)`
  min-width: 100%;
  margin-top: 2rem;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 2rem 0;
`

export interface ImportingContactsModalProps extends ModalProps {
  count: number
  total: number
}

const ImportingContactsModal: FunctionComponent<ImportingContactsModalProps> = ({
  count,
  total,
}) => (
  <Modal
    size={ModalSize.Small}
    title={intl.formatMessage(messages.title)}
    closeable={false}
    closeButton={false}
  >
    <Content>
      <RoundIconWrapper>
        <Icon type={Type.Download} width={4} />
      </RoundIconWrapper>
      <ModalText
        displayStyle={TextDisplayStyle.LargeBoldText}
        message={messages.subtitle}
      />
      <ModalText
        displayStyle={TextDisplayStyle.MediumFadedText}
        message={messages.body}
      />
      <ProgressBar
        chartData={[
          { value: count, color: "#6d9bbc" },
          { value: total - count, color: "#f4f5f6" },
        ]}
        displayStyle={DisplayStyle.Thin}
      />
      <Info displayStyle={TextDisplayStyle.MediumLightText}>
        {Math.round((count * 100) / total)}%
      </Info>
    </Content>
  </Modal>
)

export default ImportingContactsModal
