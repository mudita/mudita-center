/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { CommentsLine, CommentsText } from "./community-comments-count.styled"
import { TextDisplayStyle } from "app-theme/models"
import { defineMessages, formatMessage } from "app-localize/utils"

interface Props {
  count?: number
  communityLink: string
}

const messages = defineMessages({
  loading: {
    id: "page.news.cardCommunityCommentsLoading",
  },
  comments: {
    id: "page.news.cardCommunityComments",
  },
})

const CommunityCommentsCount: FunctionComponent<Props> = ({
  count,
  communityLink,
}) => {
  return (
    <>
      <CommentsLine />
      <a
        href={communityLink}
        data-testid="community-link"
        target="_blank"
        rel="noreferrer"
      >
        <CommentsText displayStyle={TextDisplayStyle.Paragraph3}>
          {count === undefined
            ? formatMessage(messages.loading)
            : formatMessage(messages.comments, {
                count,
              })}
        </CommentsText>
      </a>
    </>
  )
}

export default CommunityCommentsCount
