/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { Typography } from "../../typography/typography"

export const FilesManagerUploadProgressWarning: FunctionComponent = () => {
  return (
    <Wrapper>
      <Typography.P3
        className="modal-content-original-paragraph"
        config={{ color: "black" }}
      >
        Some apps slow down transfer, it’s better <br /> to close them if you
        have them open.
      </Typography.P3>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: ${({ theme }) => theme.color.grey5};
  padding: 1.2rem;
  margin: -1rem 1.2rem 0 1.2rem;

  p {
    text-align: center;
    white-space: pre-line;
  }
`
