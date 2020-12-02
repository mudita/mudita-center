import { FunctionComponent } from "Renderer/types/function-component.interface"
import Modal from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import theme from "Renderer/styles/theming/theme"
import StackedBarChart, {
  DisplayStyle,
} from "Renderer/components/core/stacked-bar-chart/stacked-bar-chart.component"
import React, { useEffect } from "react"
import styled from "styled-components"
import { Message as MessageInterface } from "Renderer/interfaces/message.interface"
import { ModalIcon } from "Renderer/modules/overview/backup-process/modals.styled"
import { Props as ButtonProps } from "Renderer/components/core/button/button.component"
import { ModalText } from "Renderer/components/rest/sync-modals/sync-contacts.styled"

const LoadingBar = styled(StackedBarChart)`
  margin: 3.2rem auto auto;
  max-width: 22rem;
`

interface BackupLoadingModalProps {
  onSuccess: () => void
  onFailure: () => void
  body: MessageInterface
  subtitle: MessageInterface
  failed?: boolean
  icon: Type
  title?: string
  closeButtonLabel?: ButtonProps["label"]
}

export const SynchronizingContactsModal: FunctionComponent<BackupLoadingModalProps> = ({
  onSuccess,
  onFailure,
  failed,
  title,
  body,
  subtitle,
  closeButtonLabel,
  icon,
}) => {
  // const countdown = setTimeout(() => {
  //   if (failed) {
  //     onFailure()
  //   } else {
  //     onSuccess()
  //   }
  // }, 1500)
  //
  // const cancelCountdown = () => clearTimeout(countdown)

  useEffect(() => {
    if (failed) {
      onFailure()
    } else {
      onSuccess()
    }
  }, [failed])

  return (
    <Modal
      size={ModalSize.Small}
      title={title}
      // onClose={cancelCountdown}
      closeButtonLabel={closeButtonLabel}
    >
      <ModalIcon>
        <Icon type={icon} width={5} />
      </ModalIcon>
      <ModalText
        message={subtitle}
        displayStyle={TextDisplayStyle.LargeBoldText}
      />
      <ModalText
        message={body}
        displayStyle={TextDisplayStyle.MediumFadedLightText}
      />
      <LoadingBar
        chartData={[
          { value: 8, color: backgroundColor("chartBar")({ theme }) },
          {
            value: 2,
            color: backgroundColor("minor")({ theme }),
          },
        ]}
        displayStyle={DisplayStyle.Thin}
      />
    </Modal>
  )
}
