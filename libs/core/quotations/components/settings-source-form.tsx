/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import styled from "styled-components"
import InputRadio from "Core/__deprecated__/renderer/components/core/input-radio/input-radio.component"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  predefined: {
    id: "module.quotations.settingsModal.source.options.predefined",
  },
  custom: {
    id: "module.quotations.settingsModal.source.options.custom",
  },
})

export enum Source {
  Predefined = "Predefined",
  Custom = "Custom",
}

interface Props {
  selectedSource: Source
  setSelectedSource: (source: Source) => void
  customQuotationsCount?: number
}

export const SettingsSourceForm: FunctionComponent<Props> = ({
  selectedSource,
  setSelectedSource,
  customQuotationsCount = 0,
}) => {
  const id = "settings-source-form"
  return (
    <Wrapper>
      <Label htmlFor={id + "-predefined"}>
        <InputRadio
          id={id + "-predefined"}
          value={Source.Predefined}
          checked={selectedSource === Source.Predefined}
          onChange={() => setSelectedSource(Source.Predefined)}
        />
        <Text
          displayStyle={TextDisplayStyle.Paragraph1}
          message={messages.predefined}
        />
      </Label>
      <Label htmlFor={id + "-custom"}>
        <InputRadio
          id={id + "-custom"}
          value={Source.Custom}
          checked={selectedSource === Source.Custom}
          onChange={() => setSelectedSource(Source.Custom)}
          disabled={customQuotationsCount === 0}
        />
        <Text
          displayStyle={TextDisplayStyle.Paragraph1}
          message={messages.custom}
          color={customQuotationsCount === 0 ? "disabled2" : "primary"}
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
