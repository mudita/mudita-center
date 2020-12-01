import React from "react"
import Modal, {
  ModalProps,
} from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { intl } from "Renderer/utils/intl"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import { ModalText } from "Renderer/components/rest/sync-modals/sync-contacts.styled"
import { defineMessages } from "react-intl"
import styled from "styled-components"
import LoaderSpinner from "Renderer/components/core/loader/loader-spinner.component"
import { noop } from "Renderer/utils/noop"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import StackedBarChart, {
  DisplayStyle,
} from "Renderer/components/core/stacked-bar-chart/stacked-bar-chart.component"

const messages = defineMessages({
  title: {
    id: "view.name.phone.contacts.modal.importing.title",
  },
  text: {
    id: "view.name.phone.contacts.modal.importing.text",
  },
  failedText: {
    id: "view.name.phone.contacts.modal.importing.failedText",
  },
  closeButton: {
    id: "view.name.phone.contacts.modal.importing.closeButton",
  },
})

const Info = styled(ModalText)`
  width: 100%;
  text-align: right;
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

interface ImportContactsModalProps extends ModalProps {
  count: number
  total: number
}

const ImportingContactsModal: FunctionComponent<ImportContactsModalProps> = ({
  count,
  total,
  onClose = noop,
}) => (
  <Modal
    size={ModalSize.Small}
    title={intl.formatMessage(messages.title)}
    closeable={false}
    closeButton={false}
    onActionButtonClick={onClose}
    actionButtonLabel={intl.formatMessage(messages.closeButton)}
    actionButtonDisabled={count < total}
  >
    <Content>
      {count < total ? <LoaderSpinner /> : <Icon type={Type.Check} size={4} />}
      <ProgressBar
        chartData={[
          { value: count, color: "#6d9bbc" },
          { value: total - count, color: "#f4f5f6" },
        ]}
        displayStyle={DisplayStyle.Thin}
      />
      <Info
        displayStyle={TextDisplayStyle.MediumLightText}
        message={{ ...messages.text, values: { count, total } }}
      />
    </Content>
  </Modal>
)

export default ImportingContactsModal
