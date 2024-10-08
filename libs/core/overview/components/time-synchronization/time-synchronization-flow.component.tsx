/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { useDispatch, useSelector } from "react-redux"
import { selectTimeSynchronizationStatus } from "Core/time-synchronization/selectors/time-synchronization-status.selector"
import LoaderModal from "Core/ui/components/loader-modal/loader-modal.component"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { abortTimeSynchronization } from "Core/time-synchronization/actions/synchronize-time.action"
import { ModalContent, ModalDialog, RoundIconWrapper } from "Core/ui"
import { ModalSize } from "Core/__deprecated__/renderer/components/core/modal/modal.interface"
import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { resetTimeSynchronizationStatus } from "Core/time-synchronization/actions/reset-time-synchronization-status"
import styled from "styled-components"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"

const messages = defineMessages({
  timeSynchronizationModalTitle: {
    id: "module.overview.timeSynchronizationModalTitle",
  },
  timeSynchronizationProgressSubtitle: {
    id: "module.overview.timeSynchronizationProgressSubtitle",
  },
  timeSynchronizationProgressDescription: {
    id: "module.overview.timeSynchronizationProgressDescription",
  },
  timeSynchronizationSuccessDescription: {
    id: "module.overview.timeSynchronizationSuccessDescription",
  },
  timeSynchronizationFailedSubtitle: {
    id: "module.overview.timeSynchronizationFailedSubtitle",
  },
  timeSynchronizationFailedDescription: {
    id: "module.overview.timeSynchronizationFailedDescription",
  },
})

export const TimeSynchronizationFlow: FunctionComponent = () => {
  const status = useSelector(selectTimeSynchronizationStatus)
  const dispatch = useDispatch<Dispatch>()

  const abort = () => {
    dispatch(abortTimeSynchronization())
  }

  const close = () => {
    dispatch(resetTimeSynchronizationStatus())
  }

  return (
    <>
      <LoaderModal
        open={status === "loading"}
        title={intl.formatMessage(messages.timeSynchronizationModalTitle)}
        subtitle={intl.formatMessage(
          messages.timeSynchronizationProgressSubtitle
        )}
        body={intl.formatMessage(
          messages.timeSynchronizationProgressDescription
        )}
        closeModal={abort}
        closeable={true}
      />
      <ModalDialog
        size={ModalSize.Small}
        open={status === "success"}
        title={intl.formatMessage(messages.timeSynchronizationModalTitle)}
        closeButton={true}
        onCloseButton={close}
      >
        <ModalContent>
          <RoundIconWrapper>
            <Icon type={IconType.CheckCircle} width={3.6} />
          </RoundIconWrapper>
          <Text
            displayStyle={TextDisplayStyle.Headline4}
            message={messages.timeSynchronizationSuccessDescription}
          />
        </ModalContent>
      </ModalDialog>
      <ModalDialog
        open={status === "error"}
        title={intl.formatMessage(messages.timeSynchronizationModalTitle)}
        size={ModalSize.Small}
        onCloseButton={close}
      >
        <ModalContent>
          <RoundIconWrapper>
            <Icon type={IconType.ThinFail} width={3.2} />
          </RoundIconWrapper>
          <ModalHeading
            displayStyle={TextDisplayStyle.Headline4}
            message={messages.timeSynchronizationFailedSubtitle}
          />
          <Text
            displayStyle={TextDisplayStyle.Paragraph4}
            color="secondary"
            message={messages.timeSynchronizationFailedDescription}
          />
        </ModalContent>
      </ModalDialog>
    </>
  )
}

const ModalHeading = styled(Text)`
  margin-bottom: 0.8rem;
`
