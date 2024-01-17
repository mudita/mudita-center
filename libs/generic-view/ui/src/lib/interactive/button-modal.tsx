/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { APIFC, withConfig, withData } from "generic-view/utils"

interface Config {
  text: string
}

interface Data {
  content: string
}

const ButtonModal: APIFC<Data, Config> = ({ config, data, ...props }) => {
  const showModal = () => {
    alert(data?.content)
  }

  return (
    <Button onClick={showModal} {...props}>
      {config?.text}
    </Button>
  )
}

export default withConfig(withData(ButtonModal))

const Button = styled.p`
  font-size: ${({ theme }) => theme.fontSize.link};
  line-height: ${({ theme }) => theme.lineHeight.link};
  color: ${({ theme }) => theme.color.blue2};
  text-transform: uppercase;
  letter-spacing: 0.12rem;
  cursor: pointer;
  margin: 0;
`
