/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { QuotationSettingsGroup } from "devices/common/models"
import { formatMessage, Messages } from "app-localize/utils"
import { RadioInput } from "app-theme/ui"

export interface SettingsFormSourceProps {
  selectedSource: QuotationSettingsGroup
  setSelectedSource: (source: QuotationSettingsGroup) => void
  customQuotationsCount?: number
  messages: {
    updateSettingsFormPredefined: Messages
    updateSettingsFormCustom: Messages
  }
}

export const SettingsFormSource: FunctionComponent<SettingsFormSourceProps> = ({
  selectedSource,
  setSelectedSource,
  customQuotationsCount = 0,
  messages,
}) => {
  return (
    <Wrapper>
      <RadioInput
        name={"settings-source"}
        value={QuotationSettingsGroup.Predefined}
        checked={selectedSource === QuotationSettingsGroup.Predefined}
        onChange={() => setSelectedSource(QuotationSettingsGroup.Predefined)}
      >
        {formatMessage(messages.updateSettingsFormPredefined)}
      </RadioInput>
      <RadioInput
        name={"settings-source"}
        value={QuotationSettingsGroup.Custom}
        checked={selectedSource === QuotationSettingsGroup.Custom}
        onChange={() => setSelectedSource(QuotationSettingsGroup.Custom)}
        disabled={customQuotationsCount === 0}
      >
        {formatMessage(messages.updateSettingsFormCustom)}
      </RadioInput>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`
