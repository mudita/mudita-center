/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ChangeEvent } from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { searchIcon } from "App/__deprecated__/renderer/components/core/input-text/input-text.elements"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"
import styled from "styled-components"
import InputComponent from "App/__deprecated__/renderer/components/core/input-text/input-text.component"

const messages = defineMessages({
  searchPlaceholder: { id: "module.filesManager.panelSearchPlaceholder" },
})

export const Input = styled(InputComponent)`
  width: 28rem;
`

interface Props {
  searchValue: string
  onSearchValueChange: (value: string) => void
}

const FilesManagerSearchInput: FunctionComponent<Props> = ({
  searchValue,
  onSearchValueChange,
  ...props
}) => {
  const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchValueChange(event.target.value)
  }

  return (
    <Input
      outlined
      type="search"
      leadingIcons={[searchIcon]}
      label={intl.formatMessage(messages.searchPlaceholder)}
      value={searchValue}
      onChange={handleSearchValueChange}
      {...props}
    />
  )
}

export default FilesManagerSearchInput
