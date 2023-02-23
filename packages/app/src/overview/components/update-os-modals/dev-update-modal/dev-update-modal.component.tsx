/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DevUpdateModalProps } from "App/overview/components/update-os-modals/dev-update-modal/dev-update-modal.inteface"
import { CenteredText } from "App/overview/components/update-os-modals/dev-update-modal/dev-update-modal.styled"
import { OSUpdateModal } from "App/overview/components/update-os-modals/os-update-modal"
import { ModalMainText, RoundIconWrapper } from "App/ui/components/modal-dialog"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import React from "react"

export const DevUpdateModal: FunctionComponent<DevUpdateModalProps> = ({
  action,
  install,
  version,
  date,
  prerelease,
  open,
  onClose,
  testId,
}) => {
  const textDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
  return (
    <OSUpdateModal
      testId={testId}
      open={open}
      closeable
      actionButtonLabel={install ? "Install now" : "Download now"}
      onActionButtonClick={action}
      closeModal={onClose}
    >
      <RoundIconWrapper>
        <Icon type={IconType.Pure} width={3.2} />
      </RoundIconWrapper>
      <ModalMainText displayStyle={TextDisplayStyle.Headline4}>
        {install ? "Installing" : "Downloading"}. Are you sure?
      </ModalMainText>
      <CenteredText displayStyle={TextDisplayStyle.Paragraph3}>
        {/* AUTO DISABLED - fix me if you like :) */}
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        You're about to {install ? "install" : "download"} an update that{" "}
        {prerelease ? (
          <span>may be unstable</span>
        ) : (
          <span>may be incompatible with the current OS version</span>
        )}
        .<br />
        <br />
        Selected version: <strong>{version}</strong> (
        <strong>{textDate}</strong>).
        <br />
        <br />
        {/* AUTO DISABLED - fix me if you like :) */}
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        Please make sure you know what you're doing!
      </CenteredText>
    </OSUpdateModal>
  )
}
