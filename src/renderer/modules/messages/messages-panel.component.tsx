import React, { ChangeEvent, useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import {
  FiltersWrapper,
  UnreadFilters,
} from "Renderer/components/rest/messages/topics-table.component"
import ButtonToggler, {
  ButtonTogglerItem,
} from "Renderer/components/core/button-toggler/button-toggler.component"
import { intl } from "Renderer/utils/intl"
import { searchIcon } from "Renderer/components/core/input-text/input-text.elements"
import Button from "Renderer/components/core/button/button.component"
import {
  DisplayStyle,
  Size,
} from "Renderer/components/core/button/button.config"
import { noop } from "Renderer/utils/noop"
import { Type } from "Renderer/components/core/icon/icon.config"
import styled from "styled-components"
import InputText from "Renderer/components/core/input-text/input-text.component"

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const MessagesButtonTogglerItem = styled(ButtonTogglerItem)`
  width: 13.8rem;
`

const SearchInput = styled(InputText)`
  width: 38rem;
`

const toggleState = [
  intl.formatMessage({
    id: "view.name.messages.allMessages",
  }),
  intl.formatMessage({
    id: "view.name.messages.unreadOnly",
  }),
] as const

interface Props {
  showAllMessages: () => void
  hideReadMessages: () => void
  searchValue: string
  changeSearchValue?: (event: ChangeEvent<HTMLInputElement>) => void
}

const MessagesPanel: FunctionComponent<Props> = ({
  showAllMessages,
  hideReadMessages,
  searchValue,
  changeSearchValue,
}) => {
  const [activeLabel, setActiveLabel] = useState(toggleState[0])
  return (
    <FiltersWrapper checkMode>
      <UnreadFilters>
        <ButtonToggler>
          {toggleState.map((label, i) => {
            const onClick = () => {
              i === 0 ? showAllMessages() : hideReadMessages()
              setActiveLabel(label)
            }
            return (
              <MessagesButtonTogglerItem
                key={i}
                label={label}
                onClick={onClick}
                active={activeLabel === label}
              />
            )
          })}
        </ButtonToggler>
      </UnreadFilters>
      <SearchInput
        type={"search"}
        label={intl.formatMessage({
          id: "view.name.messages.search",
        })}
        outlined
        defaultValue={searchValue}
        onChange={changeSearchValue}
        leadingIcons={[searchIcon]}
      />
      <ButtonWrapper>
        <Button
          displayStyle={DisplayStyle.Primary}
          size={Size.FixedBig}
          label={intl.formatMessage({
            id: "view.name.messages.newMessage",
          })}
          onClick={noop}
          Icon={Type.PlusSign}
        />
      </ButtonWrapper>
    </FiltersWrapper>
  )
}

export default MessagesPanel
