/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import Text from "App/__deprecated__/renderer/components/core/text/text.component"

export const WindowContainer = styled.div`
  margin: 2.4rem 21rem 3.4rem;
  min-width: 5.9rem;
  max-width: 47rem;
`
export const WindowHeader = styled(Text)`
  font-weight: normal;
  margin-bottom: 4rem;
`
export const WindowTitle = styled(Text)`
  margin: 2.4rem 0 4rem;
`
export const NoteText = styled(Text)`
  text-transform: uppercase;
`

export const LightText = styled(Text)`
  margin-bottom: 1.6rem;
`

export const BoldText = styled(Text)`
  font-weight: normal;
  margin-bottom: 1.6rem;
`

export const LightTextNested = styled(Text)`
  margin-bottom: 1.6rem;
  margin-left: 3rem;
`
export const GridWrapper = styled("div")`
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-auto-rows: minmax(10rem, auto);
  margin-bottom: 1.6rem;
`

export const GridItem = styled(Text)`
  display: flex;
  align-items: center;
  padding: 1rem 0.5rem 1rem 0.5rem;
  border: 0.125rem solid black;
  margin: 0 -0.125rem -0.125rem 0;
`
export const GridBoldItem = styled(GridItem)`
  font-weight: normal;
`
