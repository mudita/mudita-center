/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    width: 2.5rem;
  }
  button:hover {
    background-color: ${backgroundColor("primary")};
  }
`

export const NewMessageWrapper = styled.div`
  position: sticky;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;
  background-color: ${backgroundColor("primary")};
  border-radius: 0.4rem;
  padding: 0.4rem 1.1rem;
  justify-content: space-between;
  align-items: center;
  width: 15.6rem;
`
