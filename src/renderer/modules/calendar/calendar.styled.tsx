import styled from "styled-components"
import Table from "Renderer/components/core/table/table.component"
import { borderColor } from "Renderer/styles/theming/theme-getters"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

export const CalendarEventsList = styled(Table)`
  --columnsTemplate: 5fr 3fr 3fr;
  --columnsGap: 4rem;
  border-top: solid 0.1rem ${borderColor("list")};
`

export const Header = styled(Text).attrs({
  displayStyle: TextDisplayStyle.LargeBoldText,
})`
  padding: 4rem 4rem 1.7rem 4rem;
`
