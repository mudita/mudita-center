/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import styled from "styled-components"
import { ArticlesList } from "./articles-list"
import { useSelector } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { selectCurrentSubcategory, selectHelpAssets } from "help/store"
import { H5 } from "generic-view/ui"

interface Props {
  id: string
}

export const Subcategory: FunctionComponent<Props> = ({ id }) => {
  const subcategory = useSelector((state: ReduxRootState) =>
    selectCurrentSubcategory(state, id)
  )
  const assets = useSelector(selectHelpAssets)

  if (!subcategory || !subcategory.articles.length) {
    return null
  }
  const icon = subcategory.icon ? assets[subcategory.icon].url : undefined

  return (
    <Wrapper key={subcategory.id}>
      <Title>
        {icon && <Image src={icon} />}
        {subcategory.name}
      </Title>
      <ArticlesList articleIds={subcategory.articles} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`

const Title = styled(H5)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.8rem;
`

const Image = styled.img`
  height: 2.2rem;
  width: 2.2rem;
  display: block;
  margin: 0;
`
