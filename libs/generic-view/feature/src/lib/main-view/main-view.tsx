/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"

const StyledMainView = styled.div`
  color: pink;
`

export function MainView() {
  return (
    <StyledMainView>
      <h1>Welcome to MainView!</h1>
    </StyledMainView>
  )
}

export default MainView
