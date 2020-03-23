import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"
import Image from "Renderer/components/core/image/image.component"
import {
  backgroundColor,
  borderRadius,
  boxShadowColor,
} from "Renderer/styles/theming/theme-getters"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { Button100 } from "Renderer/components/core/button/stories/styled-elements"
import {
  DisplayStyle,
  Size,
} from "Renderer/components/core/button/button.config"

const ProductCardContainer = styled.div`
  width: 27.5rem;
  background-color: ${backgroundColor("light")};
`

const ProductCardImage = styled(Image)`
  height: 32.5rem;
  width: 100%;
  object-fit: contain;
  margin-top: -6rem;
`

const ProductCardDescription = styled.div`
  padding: 4rem 2.4rem;
`

const ProductCardSubTitle = styled(Text)`
  margin-top: 0.8rem;
`

const ProductCardLabel = styled(Text)`
  display: inline-block;
  width: 12.8rem;
  padding: 0.8rem 0;
  margin-top: 1.6rem;
  text-align: center;
  border-radius: ${borderRadius("medium")};
  box-shadow: 0 0.2rem 2rem 0 ${boxShadowColor("app")};
`

const ProductListElement = styled.li`
  position: relative;
  &:not(:last-child) {
    margin-bottom: 1.6rem;
  }
  &::before {
    content: "";
    display: block;
    position: absolute;
    left: -10%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 0.5rem;
    width: 0.5rem;
    border-radius: 50%;
    background-color: black;
  }
`

const ProductCardList = styled.ul`
  margin: 1.6rem 0 0 0;
  min-height: 21rem;
  list-style: none;
  padding-left: 2.4rem;
`

interface Props {
  url?: string
  imageSource?: string
  imageAlt?: string
  title?: string
  subtitle?: string
  label?: string
  featuresElements?: string[]
  buttonLabel?: string
}

const ProductCard: FunctionComponent<Props> = ({
  url,
  imageSource,
  imageAlt,
  title,
  subtitle,
  label,
  featuresElements,
  buttonLabel,
}) => (
  <ProductCardContainer>
    <a href={url} target="_blank" data-testid="image-link">
      <ProductCardImage src={imageSource} alt={imageAlt} />
    </a>
    <ProductCardDescription>
      <Text displayStyle={TextDisplayStyle.TertiaryHeading}>{title}</Text>
      <ProductCardSubTitle displayStyle={TextDisplayStyle.MediumLightText}>
        {subtitle}
      </ProductCardSubTitle>
      <ProductCardLabel
        displayStyle={TextDisplayStyle.SmallText}
        element="span"
      >
        {label}
      </ProductCardLabel>
      <ProductCardList>
        {featuresElements?.map((element, index) => {
          return (
            <ProductListElement key={index}>
              <Text displayStyle={TextDisplayStyle.MediumFadedLightText}>
                {element}
              </Text>
            </ProductListElement>
          )
        })}
      </ProductCardList>
      <Button100
        displayStyle={DisplayStyle.Primary}
        size={Size.FixedBig}
        label={buttonLabel}
        href={url}
        target="_blank"
        data-testid="button-link"
      />
    </ProductCardDescription>
  </ProductCardContainer>
)

export default ProductCard
