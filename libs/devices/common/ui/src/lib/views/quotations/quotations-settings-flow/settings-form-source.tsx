/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { QuotationSettingsGroup } from "devices/common/models"
import { Messages } from "app-localize/utils"
import { Radio, Typography } from "app-theme/ui"

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
  const id = "settings-source-form"
  return (
    <Wrapper>
      <Label htmlFor={id + "-predefined"}>
        <Radio
          id={id + "-predefined"}
          value={QuotationSettingsGroup.Predefined}
          checked={selectedSource === QuotationSettingsGroup.Predefined}
          onChange={() => setSelectedSource(QuotationSettingsGroup.Predefined)}
        />
        <Typography.P1
          message={messages.updateSettingsFormPredefined.id}
          color={"black"}
        />
      </Label>
      <Label htmlFor={id + "-custom"}>
        <Radio
          id={id + "-custom"}
          value={QuotationSettingsGroup.Custom}
          checked={selectedSource === QuotationSettingsGroup.Custom}
          onChange={() => setSelectedSource(QuotationSettingsGroup.Custom)}
          disabled={customQuotationsCount === 0}
        />
        <Typography.P1
          message={messages.updateSettingsFormCustom.id}
          color={customQuotationsCount === 0 ? "grey4" : "black"}
        />
      </Label>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const Label = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.2rem;
  height: 3.2rem;

  &:not(:has(input:disabled)) {
    cursor: pointer;
  }

  p {
    margin-top: 0.1rem;
  }
`
