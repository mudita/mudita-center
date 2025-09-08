/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"

export const Marker = styled.div<{ $color: string }>`
  display: inline-block;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
`
