/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useId } from "react"
import { APIFC } from "generic-view/utils"
import { FormatMessageConfig, FormatMessageData } from "generic-view/models"
import { createIntl, createIntlCache, RawIntlProvider } from "react-intl"
import { useSelector } from "react-redux"
import { selectActiveDeviceConfiguration } from "generic-view/store"
import styled from "styled-components"

export const FormatMessage: APIFC<FormatMessageData, FormatMessageConfig> = ({
  data,
  config,
}) => {
  const id = useId()
  const deviceConfig = useSelector(selectActiveDeviceConfiguration)

  if (!data || !deviceConfig) {
    return null
  }
  const locale = deviceConfig.apiConfig.lang || "en-US"
  const cache = createIntlCache()
  const intl = createIntl(
    { locale, messages: { [id]: config.messageTemplate } },
    cache
  )
  return (
    <RawIntlProvider value={intl}>
      {/*// @ts-ignore*/}
      {intl.formatMessage(
        { id },
        {
          ...data.fields,
          b: (str) => <b>{str}</b>,
          c: (str) => <Capitalized>{str}</Capitalized>,
        }
      )}
    </RawIntlProvider>
  )
}

const Capitalized = styled.span`
  text-transform: lowercase;
  display: inline-block;

  &:first-letter {
    text-transform: uppercase;
  }
`
