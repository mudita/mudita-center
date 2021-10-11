/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"

export const ModalIcon = styled.div`
  width: 12rem;
  height: 12rem;
  border-radius: 100%;
  margin: auto auto 2rem auto;
  background: ${backgroundColor("icon")};
  position: relative;

  & > * {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`
export const RoundIconWrapper = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background-color: ${backgroundColor("icon")};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3.2rem;
`
