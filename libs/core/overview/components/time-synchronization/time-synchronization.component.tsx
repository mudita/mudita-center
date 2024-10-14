/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Card, {
  CardAction,
  CardBody,
  CardContent,
  CardHeader,
} from "Core/overview/components/card.elements"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import React, { useEffect, useMemo, useRef } from "react"
import { defineMessages, FormattedMessage } from "react-intl"
import { DisplayStyle } from "Core/__deprecated__/renderer/components/core/button/button.config"
import ButtonComponent from "Core/__deprecated__/renderer/components/core/button/button.component"
import { useDispatch, useSelector } from "react-redux"
import { selectTimeSynchronizationStatus } from "Core/time-synchronization/selectors/time-synchronization-status.selector"
import { resetTimeSynchronizationStatus } from "Core/time-synchronization/actions/reset-time-synchronization-status"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { ModalSize } from "Core/__deprecated__/renderer/components/core/modal/modal.interface"
import { ModalContent, ModalDialog, RoundIconWrapper } from "Core/ui"
import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import styled from "styled-components"
import { TimeSynchronizationTestIds } from "./time-synchronization-ids.enum"

const messages = defineMessages({
  timeSynchronizationTitle: {
    id: "module.overview.timeSynchronizationTitle",
  },
  timeSynchronizationDescription: {
    id: "module.overview.timeSynchronizationDescription",
  },
  timeSynchronizationButton: {
    id: "module.overview.timeSynchronizationButton",
  },
  timeSynchronizationProgressButton: {
    id: "module.overview.timeSynchronizationProgressButton",
  },
  timeSynchronizationSuccessButton: {
    id: "module.overview.timeSynchronizationSuccessButton",
  },
  timeSynchronizationFailedSubtitle: {
    id: "module.overview.timeSynchronizationFailedSubtitle",
  },
  timeSynchronizationFailedDescription: {
    id: "module.overview.timeSynchronizationFailedDescription",
  },
})

interface Props {
  onSynchronize?: () => void
}

const TimeSynchronization: FunctionComponent<Props> = ({
  onSynchronize,
  ...props
}) => {
  const status = useSelector(selectTimeSynchronizationStatus)
  const dispatch = useDispatch<Dispatch>()
  const timeoutRef = useRef<NodeJS.Timeout>()

  const onModalClose = () => {
    dispatch(resetTimeSynchronizationStatus())
  }

  const buttonMessage = useMemo(() => {
    switch (status) {
      case "loading":
        return messages.timeSynchronizationProgressButton
      case "success":
        return messages.timeSynchronizationSuccessButton
      default:
        return messages.timeSynchronizationButton
    }
  }, [status])

  useEffect(() => {
    clearTimeout(timeoutRef.current)
    if (status === "success") {
      timeoutRef.current = setTimeout(() => {
        dispatch(resetTimeSynchronizationStatus())
      }, 3000)
    }
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [dispatch, status])

  return (
    <>
      <Card {...props}>
        <CardHeader>
          <FormattedMessage {...messages.timeSynchronizationTitle} />
          <Text displayStyle={TextDisplayStyle.Label} color="secondary">
            <FormattedMessage {...messages.timeSynchronizationDescription} />
          </Text>
        </CardHeader>
        <CardBody>
          <CardContent>
            {/*TODO: Show current Harmony time and date */}
          </CardContent>
          <CardAction>
            <ButtonComponent
              displayStyle={
                status === "loading"
                  ? DisplayStyle.Primary
                  : DisplayStyle.Secondary
              }
              labelMessage={buttonMessage}
              onClick={onSynchronize}
              disabled={status === "loading"}
              loading={status === "loading"}
              Icon={status === "success" ? IconType.ButtonSuccess : undefined}
              data-testid={TimeSynchronizationTestIds.SynchronizeButton}
            />
          </CardAction>
        </CardBody>
      </Card>
      <ModalDialog
        open={status === "error"}
        title={intl.formatMessage(messages.timeSynchronizationTitle)}
        size={ModalSize.Small}
        onCloseButton={onModalClose}
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

export default TimeSynchronization

const ModalHeading = styled(Text)`
  margin-bottom: 0.8rem;
`
