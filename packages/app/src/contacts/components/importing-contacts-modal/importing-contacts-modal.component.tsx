/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
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
import { RoundIconWrapper } from "Renderer/components/core/modal-shared/modal-shared"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"

const messages = defineMessages({
  title: {
    id: "module.contacts.importingTitle",
  },
  subtitle: {
    id: "module.contacts.importingSubtitle",
  },
  body: {
    id: "module.contacts.importingBody",
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

export interface ImportingContactsModalProps
  extends ComponentProps<typeof ModalDialog> {
  count: number
  total: number
}

const ImportingContactsModal: FunctionComponent<ImportingContactsModalProps> =
  ({ count, total, ...props }) => (
    <ModalDialog
      size={ModalSize.Small}
      title={intl.formatMessage(messages.title)}
      closeable={false}
      closeButton={false}
      {...props}
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
    </ModalDialog>
  )

export default ImportingContactsModal
