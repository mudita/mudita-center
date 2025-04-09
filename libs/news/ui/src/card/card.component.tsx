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
import { FunctionComponent } from "react"
import { TextDisplayStyle } from "app-theme/models"
import { LegacyText } from "app-theme/ui"
import { NewsItem, NewsTestId } from "news/models"

const Card: FunctionComponent<NewsItem> = ({
  title,
  description,
  link,
  formattedDate,
  imageSource,
  imageAlt,
  communityLink,
  commentsCount,
}) => {
  return (
    <CardContainer data-testid={NewsTestId.Card}>
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        data-testid={NewsTestId.ImageLink}
      >
        <CardImage src={imageSource} alt={imageAlt} />
      </a>
      <CardContent>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          data-testid={NewsTestId.HeaderLink}
        >
          <LegacyText
            displayStyle={TextDisplayStyle.Title}
            data-testid={NewsTestId.Title}
          >
            {title}
          </LegacyText>
          <CardDate
            displayStyle={TextDisplayStyle.Label}
            color="secondary"
            data-testid={NewsTestId.Date}
          >
            {formattedDate}
          </CardDate>
        </a>
        <CardDescription
          displayStyle={TextDisplayStyle.Paragraph4}
          color="secondary"
          data-testid={NewsTestId.Description}
        >
          {description}
        </CardDescription>
        <CommunityCommentsCount
          commentsCount={commentsCount}
          communityLink={communityLink}
        />
      </CardContent>
    </CardContainer>
  )
}

export default Card
