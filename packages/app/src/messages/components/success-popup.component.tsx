/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled from "styled-components"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { defineMessages } from "react-intl"

const SuccessPopupWrapper = styled.div`
  position: absolute;
  right: 3.2rem;
  bottom: 3.2rem;
  background-color: ${backgroundColor("modal")};
  padding: 2.4rem;
  box-shadow: 0 0.2rem 3rem rgba(0, 0, 0, 0.0793816);
  border-radius: 0.4rem;
`
const messages = defineMessages({
  title: {
    id: "module.calendar.synchronizationFinishedTitle",
  },
})

interface Props {
  ids: string[]
}

const SuccessPopup: FunctionComponent<Props> = ({ ids }) => {
  return (
    <SuccessPopupWrapper>
      <Text
        displayStyle={TextDisplayStyle.Paragraph1}
        // message={{...messages.title, values: {
        // number: ids
        // }/>
        message={messages.title}
      />
      {ids}
    </SuccessPopupWrapper>
  )
}

export default SuccessPopup
