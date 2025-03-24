/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { FormattedMessage } from "react-intl"
import { CommentsLine, CommentsText } from "./community-comments-count.styled"
import { TextDisplayStyle } from "app-theme/models"

interface Props {
  count?: number
  communityLink: string
}

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
          {count === undefined ? (
            <FormattedMessage id="module.news.cardCommunityCommentsLoading" />
          ) : (
            <FormattedMessage
              id="module.news.cardCommunityComments"
              values={{ count }}
            />
          )}
        </CommentsText>
      </a>
    </>
  )
}

export default CommunityCommentsCount
