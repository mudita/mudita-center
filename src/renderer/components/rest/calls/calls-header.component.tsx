import React, { useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import {
  FiltersWrapper,
  UnreadFilters,
} from "Renderer/components/rest/messages/topics-table.component"
import ButtonToggler, {
  ButtonTogglerItem,
} from "Renderer/components/core/button-toggler/button-toggler.component"
import { intl } from "Renderer/utils/intl"
import { noop } from "Renderer/utils/noop"
import styled from "styled-components"
import { VisibilityFilter } from "App/renderer/models/calls/calls.interface"

const toggleState = [
  intl.formatMessage({
    id: "view.name.phone.calls.allCallTypes",
  }),
  intl.formatMessage({
    id: "view.name.phone.calls.receivedCalls",
  }),
  intl.formatMessage({
    id: "view.name.phone.calls.missedCalls",
  }),
] as const

const CallsButtonTogglerItem = styled(ButtonTogglerItem)`
  width: 12.7rem;
`

interface Props {
  changeVisibilityFilter?: (filter: VisibilityFilter) => void
}

const CallsHeader: FunctionComponent<Props> = ({
  changeVisibilityFilter = noop,
}) => {
  const [activeLabel, setActiveLabel] = useState(toggleState[0])
  return (
    <FiltersWrapper checkMode>
      <UnreadFilters>
        <ButtonToggler>
          {toggleState.map((label, i) => {
            const onClick = () => noop()
            return (
              <CallsButtonTogglerItem
                key={i}
                label={label}
                onClick={onClick}
                active={false}
              />
            )
          })}
        </ButtonToggler>
      </UnreadFilters>
    </FiltersWrapper>
  )
}

export default CallsHeader
