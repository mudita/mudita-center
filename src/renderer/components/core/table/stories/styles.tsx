import InputCheckbox from "Renderer/components/core/input-checkbox/input-checkbox.component"
import Table, {
  Col,
  Sidebar,
} from "Renderer/components/core/table/table.component"
import Text from "Renderer/components/core/text/text.component"
import styled from "styled-components"

export const Checkbox = styled(InputCheckbox)``
export const Contacts = styled(Table)`
  --columnsTemplate: 1fr 1fr;
  --columnsTemplateWithOpenedSidebar: 1fr;
  --columnsGap: 2rem;

  height: 100vh;
`
export const SelectableContacts = styled(Contacts)`
  --columnsTemplate: 4rem 1fr 1fr;
  --columnsTemplateWithOpenedSidebar: 4rem 1fr;

  ${Col} {
    :first-of-type {
      justify-content: flex-end;
    }
  }
`
export const Files = styled(Table)`
  --columnsTemplate: 1fr 1fr 10rem;
  --columnsTemplateWithOpenedSidebar: 1fr;
  --columnsGap: 2rem;
  --nestSize: 2rem;

  height: 100vh;
`
export const SelectableFiles = styled(Files)`
  ${Checkbox} {
    margin-right: 2rem;
  }
`
export const Part = styled.div`
  padding: 2rem;
  p {
    margin-bottom: 2rem;
  }
`
export const PartWrapper = styled.div`
  display: flex;
  height: 100vh;
`
export const CustomSidebarTitle = styled(Text)`
  margin: 0 !important;
`
export const CustomizedSidebar = styled(Sidebar)`
  --header-height: 8rem;
  --header-background: #eee;

  max-height: 24rem;
`
