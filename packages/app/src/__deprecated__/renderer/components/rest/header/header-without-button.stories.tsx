/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { MemoryRouter } from "react-router"
import styled from "styled-components"
import Header from "App/__deprecated__/renderer/components/rest/header/header.component"
import Tabs from "App/__deprecated__/renderer/components/rest/header/tabs.component"

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 70.4rem;
`
export default {
  title: "Components|Core/Header/With button",
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  decorators: [
    (story: any) => (
      <MemoryRouter initialEntries={["/phone"]}>{story()}</MemoryRouter>
    ),
  ],
}

export const WithoutButton = () => {
  return (
    <Container>
      <Header middleComponent={<Tabs currentLocation={"/phone"} />} />
    </Container>
  )
}

WithoutButton.story = {
  name: "Without button",
}
