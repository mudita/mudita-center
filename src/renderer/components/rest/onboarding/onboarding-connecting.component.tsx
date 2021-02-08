/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { OnboardingConnectingProps } from "Renderer/components/rest/onboarding/onboarding.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import ButtonComponent from "Renderer/components/core/button/button.component"
import {
  DisplayStyle,
  Type as ButtonType,
} from "Renderer/components/core/button/button.config"
import { intl } from "Renderer/utils/intl"
import { noop } from "Renderer/utils/noop"
import { OnboardingWrapper } from "Renderer/components/rest/onboarding/onboarding.elements"
import Loader from "Renderer/components/core/loader/loader.component"
import { LoaderType } from "Renderer/components/core/loader/loader.interface"
import styled from "styled-components"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"

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

const OnboardingConnecting: FunctionComponent<OnboardingConnectingProps> = ({
  onCancel = noop,
}) => {
  return (
    <OnboardingWrapper>
      <main>
        <LoaderWrapper>
          <Loader type={LoaderType.Spinner} size={6} />
        </LoaderWrapper>
        <Text
          displayStyle={TextDisplayStyle.SecondaryBoldHeading}
          message={{ id: "view.name.onboarding.connecting.message" }}
        />
      </main>
      <footer>
        <ButtonComponent
          type={ButtonType.Button}
          displayStyle={DisplayStyle.Secondary}
          label={intl.formatMessage({
            id: "view.name.onboarding.connecting.button",
          })}
          onClick={onCancel}
        />
      </footer>
    </OnboardingWrapper>
  )
}

export default OnboardingConnecting
