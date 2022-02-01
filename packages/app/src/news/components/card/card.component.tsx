/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled from "styled-components"
import {
  backgroundColor,
  borderRadius,
} from "Renderer/styles/theming/theme-getters"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import Image from "Renderer/components/core/image/image.component"
import CommunityCommentsCount from "App/news/components/card/community-comments-count.component"
import moment from "moment"

const CardContainer = styled.div`
  max-width: 27.5rem;
  box-sizing: border-box;
  border-radius: ${borderRadius("medium")};
  overflow: hidden;
  margin-bottom: 4rem;
`

const CardImage = styled(Image)`
  object-fit: cover;
  height: 22rem;
  width: 100%;
`

const CardContent = styled.div`
  padding: 2.4rem;
  background-color: ${backgroundColor("row")};
`

const CardDescription = styled(Text)`
  margin-top: 1.2rem;
  margin-bottom: 2.4rem;
  overflow: hidden;
  line-height: 2.2rem;
  min-height: calc(2.2rem * 3);
  /* stylelint-disable */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  /* stylelint-enable */
`

const CardDate = styled(Text)`
  text-transform: uppercase;
`

export interface Props {
  content: string
  communityLink: string
  count?: number
  title: string
  imageSource?: string
  imageAlt?: string
  url: string
  date: string
}

const Card: FunctionComponent<Props> = ({
  content,
  communityLink,
  count,
  title,
  imageSource,
  imageAlt,
  url,
  date,
}) => {
  return (
    <CardContainer data-testid="news-card">
      <a href={url} target="_blank" rel="noreferrer" data-testid="image-link">
        <CardImage src={imageSource} alt={imageAlt} />
      </a>
      <CardContent>
        <a
          href={url}
          data-testid="header-link"
          target="_blank"
          rel="noreferrer"
        >
          <Text displayStyle={TextDisplayStyle.Title}>{title}</Text>
          <CardDate displayStyle={TextDisplayStyle.Label} color="secondary">
            {moment(date).format("ll")}
          </CardDate>
        </a>
        <CardDescription
          displayStyle={TextDisplayStyle.BiggerLightText}
          data-testid="content"
          color="secondary"
        >
          {content}
        </CardDescription>
        <CommunityCommentsCount count={count} communityLink={communityLink} />
      </CardContent>
    </CardContainer>
  )
}

export default Card
