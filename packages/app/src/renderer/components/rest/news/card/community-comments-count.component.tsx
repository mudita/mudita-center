/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import styled from "styled-components"
import { borderColor } from "Renderer/styles/theming/theme-getters"
import TranslationMessages from "Renderer/components/core/translations-tooltip/translation-messages.component"

interface Props {
  count?: number
  communityLink: string
}

const CommentsLine = styled.div`
  border-top: 0.01rem solid ${borderColor("verticalSeparator")};
  margin-bottom: 2.4rem;
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
        <Text displayStyle={TextDisplayStyle.MediumTextUppercased}>
          {count === undefined ? (
            <TranslationMessages id="view.name.news.cardCommunityCommentsLoading" />
          ) : (
            <TranslationMessages
              id="view.name.news.cardCommunityComments"
              values={{ count }}
            />
          )}
        </Text>
      </a>
    </>
  )
}

export default CommunityCommentsCount
