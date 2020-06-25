import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"
import {
  backgroundColor,
  borderRadius,
} from "Renderer/styles/theming/theme-getters"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import Image from "Renderer/components/core/image/image.component"
import CommunityCommentsCount from "Renderer/components/rest/news/card/community-comments-count.component"

const CardContainer = styled.div`
  max-width: 27.5rem;
  box-sizing: border-box;
  border-radius: ${borderRadius("medium")};
  overflow: hidden;
`

const CardImage = styled(Image)`
  object-fit: cover;
  height: 22rem;
  width: 100%;
`

const CardContent = styled.div`
  padding: 2.4rem;
  background-color: ${backgroundColor("row")};
`

const CardDescription = styled(Text)`
  margin-top: 1.8rem;
  margin-bottom: 2.4rem;
  overflow: hidden;
  line-height: 2.2rem;
  min-height: calc(2.2rem * 3);
  /* stylelint-disable */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  /* stylelint-enable */
`

export interface Props {
  content: string
  communityLink: string
  count?: number
  title: string
  imageSource?: string
  imageAlt?: string
  url: string
}

const Card: FunctionComponent<Props> = ({
  content,
  communityLink,
  count,
  title,
  imageSource,
  imageAlt,
  url,
}) => {
  return (
    <CardContainer data-testid="news-card">
      <a href={url} target="_blank" data-testid="image-link">
        <CardImage src={imageSource} alt={imageAlt} />
      </a>
      <CardContent>
        <a href={url} data-testid="header-link" target="_blank">
          <Text displayStyle={TextDisplayStyle.MediumTextUppercased}>
            {title}
          </Text>
        </a>
        <CardDescription
          displayStyle={TextDisplayStyle.MediumFadedLightText}
          data-testid="content"
        >
          {content}
        </CardDescription>
        <CommunityCommentsCount count={count} communityLink={communityLink} />
      </CardContent>
    </CardContainer>
  )
}

export default Card
