/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import { backgroundColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"

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
export const NewMessageContainer = styled.div`
  position: sticky;
  top: 1.6rem;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
  z-index: 1;
`

export const NewMessageWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;
  background-color: ${backgroundColor("primary")};
  border-radius: 0.4rem;
  padding: 0 1.1rem;
  justify-content: space-between;
  align-items: center;
  width: 15.6rem;
`

export const ScrollButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  p {
    margin-left: 0.7rem;
  }
`
