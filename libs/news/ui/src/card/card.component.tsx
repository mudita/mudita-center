/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  CardContainer,
  CardContent,
  CardDate,
  CardDescription,
  CardImage,
} from "./card.styled"
import CommunityCommentsCount from "../community-comments-count/community-comments-count.component"
import moment from "moment"
import { FunctionComponent } from "react"
import { TextDisplayStyle } from "app-theme/models"
import { LegacyText } from "app-theme/ui"

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
          <LegacyText displayStyle={TextDisplayStyle.Title}>{title}</LegacyText>
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
