/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  backgroundColor,
  borderColor,
  borderRadius,
  transitionTime,
} from "Core/core/styles/theming/theme-getters"
import styled from "styled-components"
import Text from "Core/__deprecated__/renderer/components/core/text/text.component"
import { ProcessReleasesProgress } from "Core/overview/components/update-os-modals/process-releases-progress"

export const WarningBox = styled.div`
  max-width: 100%;
  border-radius: ${borderRadius("medium")};
  border: 0.2rem solid ${borderColor("deviceListSeparator")};
  border-top: 0.8rem solid ${borderColor("warning")};
  margin-top: 2.4rem;
  padding: 1.6rem 1rem 2.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ProgressBar = styled.div`
  width: 22rem;
  margin-top: 0.8rem;
  height: 0.4rem;
  position: relative;
  border-radius: ${borderRadius("medium")};
  background-color: ${backgroundColor("minor")};

  span {
    display: block;
    height: inherit;
    border-radius: inherit;
    background-color: ${backgroundColor("activity")};
    transition: width ${transitionTime("faster")} ease-in-out;
  }
`
export const Percentage = styled(Text)`
  margin-top: 0.8rem;
`
