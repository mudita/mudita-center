import React from "react"

import {
  ComponentProps as MessagesProps,
  VisibilityFilter,
} from "Renderer/models/messages/messages.interface"
import FunctionComponent from "Renderer/types/function-component.interface"

const Messages: FunctionComponent<MessagesProps> = ({
  searchValue,
  visibilityFilter,
  handleSearchValue,
  handleVisibilityFilter,
  list,
}) => {
  return (
    <>
      <div>
        <input
          type="text"
          defaultValue={searchValue}
          onChange={handleSearchValue}
        />
        <label>
          <select
            onChange={handleVisibilityFilter}
            defaultValue={visibilityFilter}
          >
            <option value={VisibilityFilter.All}>Show all</option>
            <option value={VisibilityFilter.Unread}>Show unread only</option>
            <option value={VisibilityFilter.Read}>Show read only</option>
          </select>
        </label>
      </div>
      <div>
        {list.map(({ caller }, index) => (
          <p key={index}>
            {caller.forename} {caller.surname}
          </p>
        ))}
      </div>
    </>
  )
}

export default Messages
