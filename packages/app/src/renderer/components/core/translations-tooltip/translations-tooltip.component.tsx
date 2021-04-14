/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useRef, MutableRefObject } from "react"
import styled from "styled-components"
import { usePopper } from "react-popper"
import { FunctionComponent } from "Renderer/types/function-component.interface"

type Props = {
  targetRef: MutableRefObject<null>
  isVisible: boolean
  text: string
}

const PopperContainer = styled.span`
  z-index: 999999999;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  background-color: white;
  padding: 1rem;
  text-align: center;
  word-break: break-word;
  max-width: 10rem;
  transform: translate3d(0, 0, 0) !important;
  display: block;
  white-space: pre-wrap;
`

const Text = styled.span`
  color: black;
  font-size: 1rem;
  font-weight: normal;
  word-break: break-word;
  display: block;
`

const Tooltip: FunctionComponent<Props> = ({ targetRef, isVisible, text }) => {
  const popperRef = useRef(null)
  const { styles, attributes } = usePopper(
    targetRef.current,
    popperRef.current,
    {
      placement: "bottom",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 0],
          },
        },
      ],
    }
  )

  if (!isVisible) {
    return null
  }

  return (
    <PopperContainer
      ref={popperRef}
      style={styles.popper}
      {...attributes.popper}
    >
      <Text>{text}</Text>
    </PopperContainer>
  )
}

export default Tooltip
