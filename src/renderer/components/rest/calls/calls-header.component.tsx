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
  const getFilterByLabel = ({
    label,
    visibilityFilter,
  }: {
    label: string
    visibilityFilter: VisibilityFilter
  }) => {
    switch (visibilityFilter) {
      case VisibilityFilter.Received:
        changeVisibilityFilter(VisibilityFilter.Received)
        setActiveLabel(label)
        break
      case VisibilityFilter.Missed:
        changeVisibilityFilter(VisibilityFilter.Missed)
        setActiveLabel(label)
        break
      default:
        changeVisibilityFilter(VisibilityFilter.All)
        setActiveLabel(label)
        break
    }
  }
  return (
    <FiltersWrapper checkMode>
      <UnreadFilters>
        <ButtonToggler>
          {toggleState.map(({ label, visibilityFilter }, i) => {
            const filter = () => getFilterByLabel({ label, visibilityFilter })

            return (
              <CallsButtonTogglerItem
                key={i}
                label={label}
                onClick={filter}
                active={activeLabel === label}
                data-testid={visibilityFilter}
              />
            )
          })}
        </ButtonToggler>
      </UnreadFilters>
    </FiltersWrapper>
  )
}

export default CallsHeader
