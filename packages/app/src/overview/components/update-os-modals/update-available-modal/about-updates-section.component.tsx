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
import { borderColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"

const messages = defineMessages({
  updateAvailableAboutUpdatesTitle: {
    id: "module.overview.updateAvailableAboutUpdatesTitle",
  },
  updateAvailableOsVersionDescription: {
    id: "module.overview.updateAvailableOsVersionDescription",
  },
  updateAvailableAboutOsVersionSubDescription: {
    id: "module.overview.updateAvailableAboutOsVersionSubDescription",
  },
})
interface Release {
  version: string
  date: Date
}

export interface AboutUpdatesSectionProps {
  releases: Release[]
}

const AboutUpdatesSectionTitle = styled(Text)`
  border-bottom: 0.1rem solid ${borderColor("secondary")};
  margin-bottom: 1rem;
`

const AboutUpdatesSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 2.4rem 0;

  p {
    text-align: left;
  }
`

const UpdatesOsVersionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`

export const AboutUpdatesSection: FunctionComponent<
  AboutUpdatesSectionProps
> = ({ releases }) => {
  return (
    <AboutUpdatesSectionContainer>
      <AboutUpdatesSectionTitle
        displayStyle={TextDisplayStyle.Label}
        color="primary"
        message={{
          ...messages.updateAvailableAboutUpdatesTitle,
          values: { num: releases.length },
        }}
      />
      {releases.map(({ version, date }, index) => {
        const isSingleRelease = releases.length === 1
        const isLatestRelease = releases.length - 1 === index
        const displaySubDescription = !isSingleRelease && isLatestRelease
        return (
          <UpdatesOsVersionContainer key={index}>
            <Text
              displayStyle={TextDisplayStyle.Label}
              color="secondary"
              message={{
                ...messages.updateAvailableOsVersionDescription,
                values: {
                  version,
                  date: new Date(date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }),
                },
              }}
            />
            {displaySubDescription && (
              <Text
                displayStyle={TextDisplayStyle.Label}
                color="tabHover"
                message={
                  messages.updateAvailableAboutOsVersionSubDescription
                }
              />
            )}
          </UpdatesOsVersionContainer>
        )
      })}
    </AboutUpdatesSectionContainer>
  )
}
