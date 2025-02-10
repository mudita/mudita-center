/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FormSelectInputConfig, FormSelectInputData } from "generic-view/models"
import { APIFC, IconType } from "generic-view/utils"
import { Icon } from "../../../icon/icon"
import React, { useEffect, useRef, useState } from "react"
import styled, { css } from "styled-components"

export const SelectInput: APIFC<FormSelectInputData, FormSelectInputConfig> = ({
  data,
  config,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  const handleSelect = (selectedValue: string) => {
    data!.value = selectedValue
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside, true)
    return () => document.removeEventListener("click", handleClickOutside, true)
  }, [])

  return (
    <Wrapper ref={selectRef}>
      <Select onClick={() => setIsOpen(!isOpen)} $selected={data?.value}>
        {data?.value || "Select an option"}
        <Icon config={{ type: IconType.DropdownArrow, size: "tiny" }} />
      </Select>
      {isOpen && (
        <DropdownList>
          {config.options.map((option, index) => (
            <DropdownItem key={index} onClick={() => handleSelect(option)}>
              {option}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: fit-content;
`

const Label = styled.label``

const Select = styled.div<{ $selected?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 10px;
  border: 0.1rem solid ${({ theme }) => theme.color.grey4};
  color: ${({ theme }) => theme.color.grey3};
  font-size: ${({ theme }) => theme.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.lineHeight.paragraph3};
  border-radius: 0.4rem;
  cursor: pointer;

  ${({ $selected, theme }) =>
    $selected &&
    css`
      color: ${theme.color.black};
    `}
`

const DropdownList = styled.ul`
  position: absolute;
  color: ${({ theme }) => theme.color.grey2};
  font-size: ${({ theme }) => theme.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.lineHeight.paragraph3};
  top: 100%;
  left: 0;
  width: 100%;
  background: ${({ theme }) => theme.color.white};
  border-radius: 8px;
  box-shadow: 0px 10px 50px 0px rgba(0, 0, 0, 0.08);
  list-style: none;
  padding: 1.2rem 0;
  margin: 0;
  z-index: 100;
`

const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.color.grey5};
    color: ${({ theme }) => theme.color.black};
  }
`
