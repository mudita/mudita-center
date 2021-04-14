/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import store from "Renderer/store"
import Tooltip from "Renderer/components/core/translations-tooltip/translations-tooltip.component"
import styled from "styled-components"
import { Message } from "Renderer/interfaces/message.interface"
import FormattedMessageFixed from "Renderer/components/core/translations-tooltip/fixed"

const Wrapper = styled.span`
  position: relative;
  background-color: hotpink;
`

const TranslationMessages: FunctionComponent<Message> = ({
  id,
  defaultMessage,
  values,
  description,
}) => {
  const elementRef = React.useRef(null)
  const [isVisible, setVisibility] = React.useState(false)

  return (
    <Wrapper
      ref={elementRef}
      // onMouseEnter={() => setVisibility(true)}
      // onMouseLeave={() => setVisibility(false)}
      onClick={() => setVisibility(!isVisible)}
    >
      <FormattedMessageFixed
        id={id}
        defaultMessage={defaultMessage}
        values={values}
        description={description}
      />
      {store.getState().devMode.showPhrase && (
        <Tooltip text={id} isVisible={isVisible} targetRef={elementRef} />
      )}
    </Wrapper>
  )
}

export default TranslationMessages
