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
  height: 22rem;
  width: 100%;
`

const CardContent = styled.div`
  padding: 2.4rem;
  background-color: ${backgroundColor("light")};
`

const CardDescription = styled(Text)`
  margin-top: 1.8rem;
  margin-bottom: 2.4rem;
  min-height: 6.5em;
  border-bottom: 1px solid black;
`

interface Props {
  content: string
  communityLink: string
  count?: number
  header: string
  imageSource: string
  imageAlt?: string
  url: string
}

const Card: FunctionComponent<Props> = ({
  content,
  communityLink,
  count,
  header,
  imageSource,
  imageAlt,
  url,
}) => {
  return (
    <CardContainer>
      <a href={url} target="_blank">
        <CardImage src={imageSource} alt={imageAlt} />
      </a>
      <CardContent>
        <a href={url}>
          <Text displayStyle={TextDisplayStyle.MediumTextUppercased}>
            {header}
          </Text>
        </a>
        <CardDescription displayStyle={TextDisplayStyle.MediumFadedLightText}>
          {content}
        </CardDescription>
        <a href={communityLink}>
          {count && <CommunityCommentsCount count={count} />}
        </a>
      </CardContent>
    </CardContainer>
  )
}

export default Card
