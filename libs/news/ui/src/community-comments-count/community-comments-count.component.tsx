/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { CommentsLine, CommentsText } from "./community-comments-count.styled"
import { TextDisplayStyle } from "app-theme/models"
import { defineMessages, formatMessage } from "app-localize/utils"
import { NewsItem, NewsTestId } from "news/models"

type Props = Pick<NewsItem, "communityLink" | "commentsCount">

const messages = defineMessages({
  comments: {
    id: "page.news.cardCommunityComments",
  },
})

const CommunityCommentsCount: FunctionComponent<Props> = ({
  commentsCount,
  communityLink,
}) => {
  return (
    <>
      <CommentsLine />
      <a
        href={communityLink}
        target="_blank"
        rel="noreferrer"
        data-testid={NewsTestId.CommunityLink}
      >
        <CommentsText displayStyle={TextDisplayStyle.Paragraph3}>
          {formatMessage(messages.comments, {
            count: commentsCount,
          })}
        </CommentsText>
      </a>
    </>
  )
}

export default CommunityCommentsCount
