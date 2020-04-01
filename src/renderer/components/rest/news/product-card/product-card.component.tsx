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
import Button from "Renderer/components/core/button/button.component"
import {
  DisplayStyle,
  Size,
} from "Renderer/components/core/button/button.config"
import { FormattedMessage } from "react-intl"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"

const ProductCardContainer = styled.div`
  width: 27.5rem;
  background-color: ${backgroundColor("light")};
  position: relative;
  border-radius: ${borderRadius("medium")};
`

const ProductCardNotification = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -3%;
  right: 0;
  width: 20rem;
  padding: 2.4rem 0;
  box-shadow: 0 1rem 5.5rem -0.5rem ${boxShadowColor("grey")};
  border-radius: 0.4rem;
  background-color: inherit;
`

const ProductCardNotificationIcon = styled(Icon)`
  border-radius: 50%;
  background-color: ${backgroundColor("blue")};
  margin-right: 0.8rem;
  svg {
    height: 1rem;
    width: 1rem;
  }
  path {
    stroke: ${backgroundColor("light")};
  }
`

const ProductCardLink = styled.a`
  display: flex;
  justify-content: center;
`

const ProductCardImage = styled(Image)`
  width: 100%;
  object-fit: contain;
  margin-bottom: 2.4rem;
`

const ProductCardDescription = styled.div`
  padding: 0 2.4rem 2.4rem 2.4rem;
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
    background-color: ${backgroundColor("dark")};
  }
`

const ProductCardList = styled.ul`
  margin: 1.6rem 0 5.6rem 0;
  min-height: 19.2rem;
  list-style: none;
  padding-left: 2.4rem;
`

const ProductCardButton = styled(Button)`
  width: 100%;
`

export interface Props {
  url?: string
  imageSource?: string
  imageAlt?: string
  title?: string
  subtitle?: string
  label?: string
  featuresElements?: string[]
  buttonLabel?: string
  connected?: boolean
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
  connected = false,
}) => (
  <ProductCardContainer data-testid="product-card">
    {connected && (
      <ProductCardNotification data-testid="card-notification">
        <ProductCardNotificationIcon
          type={Type.Check}
          height={2.1}
          width={2.1}
        />
        <Text displayStyle={TextDisplayStyle.LargeText}>
          <FormattedMessage id="view.name.news.productCardNotification" />
        </Text>
      </ProductCardNotification>
    )}
    <ProductCardLink href={url} target="_blank" data-testid="image-link">
      <ProductCardImage src={imageSource} alt={imageAlt} />
    </ProductCardLink>
    <ProductCardDescription>
      <a href={url} target="_blank" data-testid="title-link">
        <Text displayStyle={TextDisplayStyle.TertiaryHeading}>{title}</Text>
      </a>
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
      <ProductCardButton
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
