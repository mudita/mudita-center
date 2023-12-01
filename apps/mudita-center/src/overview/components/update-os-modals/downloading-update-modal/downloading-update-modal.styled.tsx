/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  backgroundColor,
  borderRadius,
  transitionTime,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import styled from "styled-components"
import Text from "App/__deprecated__/renderer/components/core/text/text.component"
import { ProcessReleasesProgress } from "App/overview/components/update-os-modals/process-releases-progress"

export const DownloadBar = styled.div`
  width: 22rem;
  margin-top: 3.2rem;
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
export const Submessage = styled(Text)`
  text-align: center;
`
export const Pergentage = styled(Text)`
  margin-top: 0.8rem;
`
export const DownloadProgressText = styled(ProcessReleasesProgress)`
  margin-top: 2.4rem;
`
