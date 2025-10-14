/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FocusEventHandler,
  FunctionComponent,
  useCallback,
  useRef,
} from "react"
import styled from "styled-components"
import { IconSize, IconType } from "app-theme/models"
import { formatMessage } from "app-localize/utils"
import { backgroundColor, borderColor } from "app-theme/utils"
import { Icon, Typography } from "app-theme/ui"
import { Interval, intervals } from "../quotations.types"
import { quotationsMessages } from "../quotations.messages"

interface Props {
  selectedInterval: Interval
  setSelectedInterval: (interval: Interval) => void
}

export const SettingsFormInterval: FunctionComponent<Props> = ({
  selectedInterval,
  setSelectedInterval,
}) => {
  const selectDropdownRef = useRef<HTMLUListElement>(null)

  const formatInterval = useCallback((interval: Interval) => {
    if (typeof interval === "number") {
      const hours = interval / 60
      if (hours < 1) {
        return formatMessage(quotationsMessages.updateSettingsFormMinutes, {
          value: interval,
        })
      } else {
        return formatMessage(quotationsMessages.updateSettingsFormHours, {
          value: hours,
        })
      }
    }
    return formatMessage(quotationsMessages.updateSettingsFormAtMidnight)
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
      <Typography.P1 color={"grey1"}>
        {formatInterval(selectedInterval)}
      </Typography.P1>
      <Icon type={IconType.Dropdown} size={IconSize.Medium} />
      <SelectDropdown tabIndex={-1} ref={selectDropdownRef}>
        {intervals.map((item) => (
          <SelectItem
            key={item}
            onClick={() => {
              setSelectedInterval(item)
            }}
          >
            <Typography.P1>{formatInterval(item)}</Typography.P1>
            {selectedInterval === item && (
              <Icon type={IconType.CheckBold} size={IconSize.Medium}></Icon>
            )}
          </SelectItem>
        ))}
      </SelectDropdown>
    </Select>
  )
}

/* '&&' boosts selector specificity without using '!important' (useful inside ModalContent). */
const SelectDropdown = styled.ul`
  && {
    display: block;
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
  }
`

/* '&&' boosts selector specificity without using '!important' (useful inside ModalContent). */
const SelectItem = styled.li`
  && {
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
