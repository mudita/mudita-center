/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"

import Loader from "Core/__deprecated__/renderer/components/core/loader/loader.component"
import { LoaderType } from "Core/__deprecated__/renderer/components/core/loader/loader.interface"
import styled from "styled-components"
import { backgroundColor } from "Core/core/styles/theming/theme-getters"

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
  longerConnection?: boolean
}

const ConnectingContent: FunctionComponent<Props> = ({ longerConnection = false }) => {
  return (
    <Container>
      <main>
        <LoaderWrapper>
          <Loader type={LoaderType.Spinner} size={6} />
        </LoaderWrapper>
        <Text
          displayStyle={TextDisplayStyle.Headline3}
          message={{
            id: longerConnection
              ? "module.onboarding.connectingLongMessage"
              : "module.onboarding.connectingMessage",
          }}
        />
      </main>
    </Container>
  )
}

export default ConnectingContent
