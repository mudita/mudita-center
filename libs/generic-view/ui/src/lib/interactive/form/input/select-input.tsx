/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FormSelectInputConfig, FormSelectInputData } from "generic-view/models"
import { APIFC, IconType } from "generic-view/utils"
import { Icon } from "../../../icon/icon"
import React, { useRef, useState } from "react"
import { useFormContext } from "react-hook-form"
import styled, { css } from "styled-components"
import useOutsideClick from "Core/__deprecated__/renderer/utils/hooks/useOutsideClick"

export const SelectInput: APIFC<FormSelectInputData, FormSelectInputConfig> = ({
  data,
  config,
  ...props
}) => {
  const { setValue, watch } = useFormContext()
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)
  useOutsideClick(selectRef, () => setIsOpen(false))

  const selectedValue = watch(config.name) || data?.option
  const placeholder = config.options[0]

  const handleSelect = (selectedValue: string) => {
    setValue(config.name, selectedValue)
    setIsOpen(false)
  }

  const displayedValue = selectedValue ?? placeholder

  return (
    <Wrapper ref={selectRef} {...props}>
      <Select
        onClick={() => setIsOpen(!isOpen)}
        $isPlaceholder={!selectedValue}
        $isOpen={isOpen}
      >
        {displayedValue}
        <Icon config={{ type: IconType.DropdownArrow, size: "tiny" }} />
      </Select>
      {isOpen && (
        <DropdownList>
          {config.options.map((option, index) => (
            <DropdownItem
              key={index}
              onClick={() => handleSelect(option)}
              $isSelected={option === data?.option}
            >
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
  min-width: fit-content;
`

export const Select = styled.div<{
  $isPlaceholder?: boolean
  $isOpen?: boolean
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 10rem;
  gap: 2rem;
  padding: 1rem;
  border: 0.1rem solid ${({ theme }) => theme.color.grey4};
  font-size: ${({ theme }) => theme.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.lineHeight.paragraph3};
  border-radius: 0.4rem;
  cursor: pointer;

  color: ${({ theme, $isPlaceholder }) =>
    $isPlaceholder ? theme.color.grey3 : theme.color.black};

  &:hover {
    border: 0.1rem solid ${({ theme }) => theme.color.black} !important;
  }

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      border: 0.1rem solid ${({ theme }) => theme.color.black} !important;
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
  border-radius: 0.8rem;
  box-shadow: 0 1rem 5rem 0 rgba(0, 0, 0, 0.08);
  list-style: none;
  padding: 1.2rem 0;
  margin: 0;
  z-index: 100;
`

const DropdownItem = styled.li<{ $isSelected?: boolean }>`
  padding: 1rem;
  cursor: pointer;
  line-height: normal;

  &:hover {
    background: ${({ theme }) => theme.color.grey5};
    color: ${({ theme }) => theme.color.black};
  }

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      background: ${({ theme }) => theme.color.grey5};
      color: ${({ theme }) => theme.color.black};
    `}
`
