/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  CommentsLine,
  CommentsText,
} from "App/news/components/community-comments-count/community-comments-count.styled"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import * as React from "react"
import { FormattedMessage } from "react-intl"

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
