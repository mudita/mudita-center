/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import * as React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled from "styled-components"
import ProductCard, {
  Props as ProductCardProps,
} from "Renderer/components/rest/news/product-card/product-card.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { intl } from "Renderer/utils/intl"

const ProductCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 4rem;
`

const ProductCardsTitle = styled(Text)`
  margin-bottom: 4rem;
`

interface Props {
  productCards: ProductCardProps[]
}

const ProductCards: FunctionComponent<Props> = ({
  className,
  productCards,
}) => (
  <div className={className}>
    <ProductCardsTitle displayStyle={TextDisplayStyle.TertiaryBoldHeading}>
      {intl.formatMessage({
        id: "view.name.news.productCardsTitle",
      })}
    </ProductCardsTitle>
    <ProductCardsContainer>
      {productCards.slice(0, 3).map((card, index) => {
        return <ProductCard key={index} {...card} />
      })}
    </ProductCardsContainer>
  </div>
)

export default ProductCards
