/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { FormattedMessage } from "react-intl"
import styled from "styled-components"
import { borderColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"

interface Props {
  count?: number
  communityLink: string
}

const CommentsLine = styled.div`
  border-top: 0.01rem solid ${borderColor("verticalSeparator")};
  margin-bottom: 2.4rem;
`

const CommentsText = styled(Text)`
  text-transform: uppercase;
`

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
