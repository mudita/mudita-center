import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { FormattedMessage } from "react-intl"
import styled from "styled-components"
import { borderColor } from "Renderer/styles/theming/theme-getters"

interface Props {
  count?: number
  communityLink: string
}

const CommentsLine = styled.div`
  border-top: 0.01rem solid ${borderColor("grey3")};
  margin-bottom: 2.4rem;
`

const CommunityCommentsCount: FunctionComponent<Props> = ({
  count,
  communityLink,
}) => {
  return (
    <>
      <CommentsLine />
      <a href={communityLink} data-testid="community-link" target="_blank">
        <Text displayStyle={TextDisplayStyle.MediumTextUppercased}>
          {count === undefined ? (
            <FormattedMessage id="view.name.news.cardCommunityCommentsLoading" />
          ) : (
            <FormattedMessage
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
