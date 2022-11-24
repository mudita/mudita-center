/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"

const messages = defineMessages({
  updateAvailableCautionSectionTitle: {
    id: "module.overview.updateAvailableCautionSectionTitle",
  },
  updateAvailableCautionSectionSequenceUpdateDescription: {
    id: "module.overview.updateAvailableCautionSectionSequenceUpdateDescription",
  },
  updateAvailableCautionSectionSingleUpdateDescription: {
    id: "module.overview.updateAvailableCautionSectionSingleUpdateDescription",
  },
})

interface CautionSectionProps {
  isSingleRelease: boolean
}

const CautionSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2.4rem;

  p {
    text-align: left;
  }
`

export const CautionSection: FunctionComponent<CautionSectionProps> = ({
  isSingleRelease,
}) => {
  return (
    <CautionSectionContainer>
      <Text
        displayStyle={TextDisplayStyle.Headline5}
        color="primary"
        message={messages.updateAvailableCautionSectionTitle}
      />
      {isSingleRelease ? (
        <Text
          displayStyle={TextDisplayStyle.Label}
          color="primary"
          message={
            messages.updateAvailableCautionSectionSingleUpdateDescription
          }
        />
      ) : (
        <Text
          displayStyle={TextDisplayStyle.Label}
          color="primary"
          message={
            messages.updateAvailableCautionSectionSequenceUpdateDescription
          }
        />
      )}
    </CautionSectionContainer>
  )
}
