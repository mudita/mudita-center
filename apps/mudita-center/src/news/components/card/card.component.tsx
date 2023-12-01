/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  CardContainer,
  CardDate,
  CardDescription,
  CardImage,
  CardContent,
} from "App/news/components/card/card.styled"
import CommunityCommentsCount from "App/news/components/community-comments-count/community-comments-count.component"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import moment from "moment"
import * as React from "react"

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
          displayStyle={TextDisplayStyle.Paragraph4}
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
