/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import {
  backgroundColor,
  textColor,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { defineMessages } from "react-intl"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { Close } from "App/__deprecated__/renderer/components/core/modal/modal.styled.elements"
import { DisplayStyle } from "App/__deprecated__/renderer/components/core/button/button.config"

const messages = defineMessages({
  warning: {
    id: "component.alphaWarning",
  },
  button: { id: "component.alphaWarningLink" },
})

const Warning = styled.div`
  background-color: ${backgroundColor("modal")};
  padding: 2.4rem;
  box-shadow: 0 0.2rem 3rem rgba(0, 0, 0, 0.0793816);
  border-radius: 0.4rem;
  z-index: 1;
  margin: 2.4rem 3.2rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const WarningIconWrapper = styled.div`
  margin-right: 2.4rem;
`
const ReleaseLink = styled.a`
  font-weight: bold;
  text-decoration: underline;
  color: ${textColor("warning")};
  padding: 0.1rem 0.3rem;
  &:hover {
    background-color: ${backgroundColor("minor")};
  }
`

interface Props {
  onClose: () => void
}

const AlphaReleaseWarning: FunctionComponent<Props> = ({ onClose }) => {
  const url = "https://mudita.com/products/software-apps/mudita-center/"
  return (
    <Warning>
      <WarningIconWrapper>
        <Icon type={IconType.Warning} width={2.4} />
      </WarningIconWrapper>
      <Text displayStyle={TextDisplayStyle.Paragraph1} color="warning">
        {intl.formatMessage(messages.warning)}
        <ReleaseLink target="_blank" href={url}>
          {intl.formatMessage(messages.button)}
        </ReleaseLink>
      </Text>
      <Close
        displayStyle={DisplayStyle.IconOnly}
        onClick={onClose}
        Icon={IconType.Close}
      />
    </Warning>
  )
}

export default AlphaReleaseWarning
