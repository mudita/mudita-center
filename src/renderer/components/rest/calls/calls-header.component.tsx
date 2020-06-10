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
  {
    label: intl.formatMessage({
      id: "view.name.phone.calls.allCallTypes",
    }),
    visibilityFilter: VisibilityFilter.All,
  },
  {
    label: intl.formatMessage({
      id: "view.name.phone.calls.receivedCalls",
    }),
    visibilityFilter: VisibilityFilter.Received,
  },
  {
    label: intl.formatMessage({
      id: "view.name.phone.calls.missedCalls",
    }),
    visibilityFilter: VisibilityFilter.Missed,
  },
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
  const [activeLabel, setActiveLabel] = useState(toggleState[0].label)
  const showAllCalls = () => changeVisibilityFilter(VisibilityFilter.All)
  const showReceivedCalls = () =>
    changeVisibilityFilter(VisibilityFilter.Received)
  const showMissedCalls = () => changeVisibilityFilter(VisibilityFilter.Missed)
  return (
    <FiltersWrapper checkMode>
      <UnreadFilters>
        <ButtonToggler>
          {toggleState.map(({ label, visibilityFilter }, i) => {
            const getFilterByLabel = () => {
              switch (visibilityFilter) {
                case VisibilityFilter.All:
                  showAllCalls()
                  setActiveLabel(label)
                case VisibilityFilter.Received:
                  showReceivedCalls()
                  setActiveLabel(label)
                case VisibilityFilter.Missed:
                  showMissedCalls()
                  setActiveLabel(label)
              }
            }
            return (
              <CallsButtonTogglerItem
                key={i}
                label={label}
                onClick={getFilterByLabel}
                active={activeLabel === label}
              />
            )
          })}
        </ButtonToggler>
      </UnreadFilters>
    </FiltersWrapper>
  )
}

export default CallsHeader
