import React from "react"
import styled from "styled-components"
import { FunctionComponent } from "Renderer/types/function-component.interface"

const LightPhrase = styled.span`
  opacity: 0.5;
`

interface Props {
  text: string
  search: string
}

//TODO: create test
//TODO: create storybook
const SearchableText: FunctionComponent<Props> = ({ text, search }) => {
  const substrings = text
    .replace(new RegExp(`(${search})`, "gi"), `/$1/`)
    .split("/")

  return (
    <React.Fragment key={text}>
      {search
        ? substrings.map((substring, index) =>
            substring.toLowerCase() === search.toLowerCase() ? (
              <strong key={index}>{substring}</strong>
            ) : (
              <LightPhrase key={index}>{substring}</LightPhrase>
            )
          )
        : text}
    </React.Fragment>
  )
}

export default SearchableText
