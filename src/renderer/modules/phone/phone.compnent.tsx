import React from "react"
import mockedTopics from "Renderer/components/rest/messages/mocked-data"
import TablePoC, {
  RowTemplateProps,
} from "Renderer/components/rest/messages/table.component.poc"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

interface RowProps extends RowTemplateProps {
  row: {
    id: number
    caller: {
      forename: string
    }
  }
}

const NameWrapper = styled.span`
  grid-area: Name;
`

const IDWrapper = styled.span`
  grid-area: ID;
`

const rowTemplate = ({
  row: {
    id,
    caller: { forename },
  },
}: RowProps) => {
  return (
    <div>
      <NameWrapper>{forename} </NameWrapper>
      <IDWrapper>{id}</IDWrapper>
    </div>
  )
}

const actionsTemplate = ({ row: { id }, index }: RowProps) => {
  const onClick = () => {
    console.log(index, id)
  }
  return (
    <div>
      <button onClick={onClick}>•••</button>
    </div>
  )
}

const Phone: FunctionComponent = () => {
  return (
    <TablePoC
      rows={mockedTopics}
      rowTemplate={rowTemplate}
      rowActionsTemplate={actionsTemplate}
    />
  )
}

export default Phone
