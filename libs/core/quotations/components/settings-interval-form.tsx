/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  FocusEventHandler,
  FunctionComponent,
  useCallback,
  useRef,
} from "react"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import Icon, {
  IconSize,
} from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import styled from "styled-components"
import {
  backgroundColor,
  borderColor,
} from "Core/core/styles/theming/theme-getters"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  minutes: {
    id: "module.quotations.settingsModal.interval.options.minutes",
  },
  hours: {
    id: "module.quotations.settingsModal.interval.options.hours",
  },
  atMidnight: {
    id: "module.quotations.settingsModal.interval.options.midnight",
  },
})

const intervals = [
  15,
  30,
  45,
  60,
  120,
  180,
  240,
  300,
  360,
  420,
  480,
  540,
  600,
  660,
  720,
  780,
  840,
  900,
  960,
  1020,
  1080,
  1140,
  1200,
  1260,
  1320,
  1380,
  1440,
  "AtMidnight",
]

export type Interval = (typeof intervals)[number]

interface Props {
  selectedInterval: Interval
  setSelectedInterval: (interval: Interval) => void
}

export const SettingsIntervalForm: FunctionComponent<Props> = ({
  selectedInterval,
  setSelectedInterval,
}) => {
  const selectDropdownRef = useRef<HTMLUListElement>(null)

  const formatInterval = useCallback((interval: Interval) => {
    if (typeof interval === "number") {
      const hours = interval / 60
      if (hours < 1) {
        return intl.formatMessage(messages.minutes, { value: interval })
      } else {
        return intl.formatMessage(messages.hours, { value: hours })
      }
    }
    return intl.formatMessage(messages.atMidnight)
  }, [])

  const handleSelectFocus: FocusEventHandler = useCallback((event) => {
    if (event.target === selectDropdownRef.current) {
      return
    }
    const activeItem = selectDropdownRef.current?.querySelector(
      `li:has(span)`
    ) as HTMLLIElement | null

    if (!activeItem) {
      return
    }

    selectDropdownRef.current?.scrollTo({
      top: activeItem.offsetTop - activeItem.offsetHeight * 3 - 16,
      behavior: "instant",
    })
  }, [])

  return (
    <Select tabIndex={0} onFocus={handleSelectFocus}>
      <Text displayStyle={TextDisplayStyle.Paragraph1} color={"info"}>
        {formatInterval(selectedInterval)}
      </Text>
      <Icon type={IconType.Dropdown} size={IconSize.Large} />
      <SelectDropdown tabIndex={-1} ref={selectDropdownRef}>
        {intervals.map((item) => (
          <SelectItem
            key={item}
            onClick={() => {
              setSelectedInterval(item)
            }}
          >
            <SelectItemText>{formatInterval(item)}</SelectItemText>
            {selectedInterval === item && (
              <Icon type={IconType.CheckNew} size={IconSize.Large}></Icon>
            )}
          </SelectItem>
        ))}
      </SelectDropdown>
    </Select>
  )
}

const SelectDropdown = styled.ul`
  position: absolute;
  z-index: 10;
  bottom: 0;
  transform: translateY(4.4rem);
  left: 0;
  width: 100%;
  margin: 0;
  padding: 1rem 0;
  border-radius: 0.4rem;
  border: 0.1rem solid ${borderColor("secondary")};
  background-color: ${backgroundColor("row")};
  box-shadow: 0 1rem 5rem rgba(0, 0, 0, 0.08);
  max-height: 22rem;
  overflow-y: auto;
  box-sizing: border-box;

  opacity: 0;
  visibility: hidden;
  transition-property: opacity, visibility;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  transition-delay: 0.2s;

  &::-webkit-scrollbar {
    width: 0.2rem;
  }
`

const Select = styled.div`
  position: relative;
  border: 0.1rem solid ${borderColor("secondary")};
  border-radius: 0.4rem;
  background-color: ${backgroundColor("row")};
  min-width: 18.4rem;
  height: 4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.4rem;
  cursor: pointer;
  box-sizing: border-box;

  &:focus {
    ${SelectDropdown} {
      opacity: 1;
      visibility: visible;
      transition-delay: 0s;
    }
  }
`

const SelectItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  height: 4rem;
  margin: 0;
  padding: 0 1.2rem 0 1.4rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${backgroundColor("minor")};
  }
`

const SelectItemText = styled(Text).attrs((attrs) => ({
  ...attrs,
  displayStyle: TextDisplayStyle.Paragraph1,
}))``
