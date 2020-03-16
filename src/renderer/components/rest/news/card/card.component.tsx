import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"
import { borderRadius } from "Renderer/styles/theming/theme-getters"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import Image from "Renderer/components/core/image/image.component"
import Button from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import Upload from "Renderer/svg/upload.svg"
import { StoryWrapper } from "Renderer/components/core/button/stories/styled-elements"

const CardContainer = styled.div`
  width: 27.5rem;
  box-sizing: border-box;
  border-radius: ${borderRadius("medium")};
  overflow: hidden;
`

const CardImage = styled(Image)`
  width: 100%;
`

const CardContent = styled.div`
  padding: 2.4rem;
`

const CardDescription = styled(Text)`
  margin-top: 1.8rem;
  min-height: 6em;
  border-bottom: 1px solid black;
`

interface Props {
  header?: string
  imageSource?: string
  imageAlt?: string
  url: string
  content?: string
}

const Card: FunctionComponent<Props> = ({
  content,
  header,
  imageSource,
  imageAlt,
  url,
}) => (
  <CardContainer>
    <a href={url} target="_blank">
      <CardImage src={imageSource} alt={imageAlt} />
    </a>
    <CardContent>
      <Text displayStyle={TextDisplayStyle.MediumTextUppercased}>{header}</Text>
      <CardDescription displayStyle={TextDisplayStyle.MediumFadedLightText}>
        {content}
      </CardDescription>
    </CardContent>
  </CardContainer>
)

export default Card
