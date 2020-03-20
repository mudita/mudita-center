import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"
import Image from "Renderer/components/core/image/image.component"
import {
  backgroundColor,
  borderRadius,
} from "Renderer/styles/theming/theme-getters"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import {
  Button100,
  ButtonElement,
} from "Renderer/components/core/button/stories/styled-elements"
import {
  DisplayStyle,
  Size,
} from "Renderer/components/core/button/button.config"
import { Type } from "Renderer/components/core/icon/icon.config"
import Button from "Renderer/components/core/button/button.component"

const ProductCardContainer = styled.div`
  width: 27.5rem;
  background-color: ${backgroundColor("light")};
`

const ProductCardImage = styled(Image)`
  height: 32.5rem;
  width: 100%;
  object-fit: contain;
  margin-top: -8rem;
`

const ProductCardDescription = styled.div`
  padding: 0 2.4rem;
`

const ProductCardTitle = styled(Text)`
  margin-top: 4rem;
`

const ProductCardSubTitle = styled(Text)`
  margin-top: 0.8rem;
`

const ProductCardLabel = styled(Text)`
  display: inline-block;
  color: inherit;
  padding: 0.8rem 3.5rem;
  margin-top: 1.6rem;
  white-space: nowrap;
  vertical-align: middle;
  border-radius: ${borderRadius("medium")};
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.06);
`

const ProductCardList = styled.ul`
  margin-top: 1.6rem;
  min-height: 19.2rem;
`

const ProductCardListElement = styled(Text)`
  margin-bottom: 1.6rem;
`

interface Props {
  url?: string
  imageSource?: string
  imageAlt?: string
  title?: string
  subTitle?: string
  label?: string
  featuresElements?: string[]
  buttonLabel?: string
}

const ProductCard: FunctionComponent<Props> = ({
  url,
  imageSource,
  imageAlt,
  title,
  subTitle,
  label,
  featuresElements,
}) => (
  <ProductCardContainer>
    <a href={url} target="_blank" data-testid="image-link">
      <ProductCardImage src={imageSource} alt={imageAlt} />
    </a>
    <ProductCardDescription>
      <ProductCardTitle displayStyle={TextDisplayStyle.TertiaryHeading}>
        {title}
      </ProductCardTitle>
      <ProductCardSubTitle displayStyle={TextDisplayStyle.MediumLightText}>
        {subTitle}
      </ProductCardSubTitle>
      <ProductCardLabel displayStyle={TextDisplayStyle.SmallText}>
        {label}
      </ProductCardLabel>
      <ProductCardList>
        {featuresElements?.map((element, index) => {
          return (
            <li key={index}>
              <ProductCardListElement
                displayStyle={TextDisplayStyle.MediumFadedLightText}
              >
                {element}
              </ProductCardListElement>
            </li>
          )
        })}
      </ProductCardList>
      <Button100
        displayStyle={DisplayStyle.Primary}
        size={Size.FixedBig}
        label="Click"
        href="http://www.google.pl"
        target="_blank"
      />
    </ProductCardDescription>
  </ProductCardContainer>
)

export default ProductCard
