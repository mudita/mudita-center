/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useId } from "react"
import { APIFC, IconType } from "generic-view/utils"
import styled, { css } from "styled-components"
import { IconButton } from "../../../shared/button"
import Icon from "../../../icon/icon"
import { useFormContext } from "react-hook-form"

interface Data {
  value: string
}

interface Config {
  name: string
  label: string
}

export const SearchInput: APIFC<Data, Config> = ({ data, config }) => {
  const id = useId()
  const { register, watch, setValue } = useFormContext()
  const value = (watch(config!.name) as string) || ""

  const clear = () => {
    setValue(config!.name, "")
  }

  useEffect(() => {
    if (config?.name) {
      setValue(config.name, data?.value)
    }
  }, [config?.name, data?.value, setValue])

  return (
    <Wrapper>
      <InputWrapper>
        <SearchIcon data={{ type: IconType.Search }} />
        <Input
          id={"input-" + id}
          type={"search"}
          placeholder={config!.label}
          {...register(config!.name)}
        />
        {value.length > 0 && (
          <ClearButton type={"button"} onClick={clear}>
            <ClearIcon data={{ type: IconType.Close }} />
          </ClearButton>
        )}
      </InputWrapper>
    </Wrapper>
  )
}

export default SearchInput

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.color.grey6};
`

const SearchIcon = styled(Icon)`
  width: 2.4rem;
  height: 2.4rem;
  align-self: center;
  margin-right: -3.4rem;
  margin-left: 1rem;
`

const ClearIcon = styled(Icon)`
  width: 1.2rem;
  height: 1.2rem;
`

const ClearButton = styled(IconButton)`
  min-width: 2.4rem;
  min-height: 2.4rem;
  width: 2.4rem;
  height: 2.4rem;
  margin-right: 1rem;
  align-self: center;
  margin-left: -3.4rem;
`

const inputFocusStyles = css`
  border-color: ${({ theme }) => theme.color.grey1};
`

const Input = styled.input<{ $withError?: boolean }>`
  color: ${({ theme }) => theme.color.black};
  font-size: ${({ theme }) => theme.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.lineHeight.paragraph3};
  letter-spacing: 0.05em;
  padding: 0 3.2rem 0 4.8rem;
  min-height: 4rem;
  border: 0.1rem solid ${({ theme }) => theme.color.grey4};
  border-radius: ${({ theme }) => theme.radius.sm};
  box-sizing: content-box;
  flex: 1;
  outline: none;
  background-color: transparent;
  transition: border-color 0.2s ease-in-out;

  &::placeholder {
    color: ${({ theme }) => theme.color.grey3};
    font-size: ${({ theme }) => theme.fontSize.paragraph3};
    line-height: ${({ theme }) => theme.lineHeight.paragraph3};
    letter-spacing: 0.05em;
  }

  &::-webkit-search-cancel-button {
    display: none;
  }

  &:focus {
    ${inputFocusStyles};
  }
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  &:hover {
    ${Input} {
      ${inputFocusStyles};
    }
  }
`
