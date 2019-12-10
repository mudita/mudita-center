import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import { borderColor } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const Filter = styled.div`
  grid-area: Filter;
`

const Search = styled.div`
  grid-area: Search;
`

const Create = styled.div`
  grid-area: Create;
`

const TopicFiltersWrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 4fr 2fr;
  grid-template-areas: "Filter Search Create";
  align-content: center;
  padding: 0 3rem;
  height: 10rem;
  min-height: 10rem;
  box-sizing: border-box;
  border-bottom: solid 0.1rem ${borderColor("light")};
`

interface TopicsFilteringProps {
  search: Dispatch<SetStateAction<string>>
  filter: Dispatch<SetStateAction<boolean>>
}

const FilterButton = styled.button<{ active: boolean }>`
  background-color: ${({ active }) => (active ? "hotpink" : "transparent")};
`

interface FilterProps {
  onChange: Dispatch<SetStateAction<boolean>>
  onLabel: string
  offLabel: string
}

export const FilterComponent: FunctionComponent<FilterProps> = ({
  onChange,
  onLabel,
  offLabel,
}) => {
  const [on, setOn] = useState(true)

  useEffect(() => {
    onChange(on)
  }, [on])

  const turnOn = () => {
    setOn(true)
  }

  const turnOff = () => {
    setOn(false)
  }

  return (
    <>
      <FilterButton onClick={turnOn} active={on}>
        {onLabel}
      </FilterButton>
      <FilterButton onClick={turnOff} active={!on}>
        {offLabel}
      </FilterButton>
    </>
  )
}

const TopicsFilters: FunctionComponent<TopicsFilteringProps> = ({
  search,
  filter,
}) => {
  const filterByString = (e: ChangeEvent<HTMLInputElement>) => {
    search(e.target!.value)
  }
  return (
    <TopicFiltersWrapper>
      <Filter>
        <FilterComponent
          onChange={filter}
          onLabel={"All messages"}
          offLabel={"Unread only"}
        />
      </Filter>
      <Search>
        <input onChange={filterByString} type="text" placeholder="Search" />
      </Search>
      <Create>
        <button>New message</button>
      </Create>
    </TopicFiltersWrapper>
  )
}

export default TopicsFilters
