/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"

import Loader from "App/__deprecated__/renderer/components/core/loader/loader.component"
import { LoaderType } from "App/__deprecated__/renderer/components/core/loader/loader.interface"
import styled from "styled-components"
import { backgroundColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import { Message } from "App/__deprecated__/renderer/interfaces/message.interface"
import { defineMessages } from "react-intl"

export const Container = styled.section`
  display: grid;
  grid-template-areas: "Header" "Main" "Footer";
  grid-row-gap: 0;
  grid-template-rows: 6.5rem 1fr 14rem;

  main {
    grid-area: Main;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

const LoaderWrapper = styled.div`
  width: 20rem;
  height: 20rem;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background-color: ${backgroundColor("icon")};
  margin-bottom: 4rem;
`

interface Props {
  onCancel?: () => void
  longerConnection: boolean
  restoring: boolean
  backuping: boolean
}

const messages = defineMessages({
  connectingLongMessage: {
    id: "module.onboarding.connectingLongMessage",
  },
  connectingMessage: {
    id: "module.onboarding.connectingMessage",
  },
  backupInProgressMessage: {
    id: "module.onboarding.backupInProgressMessage",
  },
  restoreInProgressMessage: {
    id: "module.onboarding.restoreInProgressMessage",
  },
})

const getMessage = ({
  longerConnection,
  restoring,
  backuping,
}: {
  longerConnection: boolean
  restoring: boolean
  backuping: boolean
}): Message => {
  if (backuping) {
    return messages.backupInProgressMessage
  }
  if (restoring) {
    return messages.restoreInProgressMessage
  }
  return longerConnection
    ? messages.connectingLongMessage
    : messages.connectingMessage
}

const ConnectingContent: FunctionComponent<Props> = (props) => {
  return (
    <Container>
      <main>
        <LoaderWrapper>
          <Loader type={LoaderType.Spinner} size={6} />
        </LoaderWrapper>
        <Text
          displayStyle={TextDisplayStyle.Headline3}
          message={getMessage(props)}
        />
      </main>
    </Container>
  )
}

export default ConnectingContent
