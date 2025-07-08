/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useState } from "react"
import { ModalSize } from "Core/__deprecated__/renderer/components/core/modal/modal.interface"
import { ModalDialog } from "Core/ui"
import { Size } from "Core/__deprecated__/renderer/components/core/button/button.config"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import InputSearchComponent from "Core/__deprecated__/renderer/components/core/input-search/input-search.component"
import { SelectInput } from "../../../generic-view/ui/src/lib/interactive/form/input/select-input"
import { Form } from "../../../generic-view/ui/src/lib/interactive/form/form"
import { GenericThemeProvider } from "generic-view/theme"

interface Props {
  open: boolean
  handleClose?: VoidFunction
}

export const SettingsModal: FunctionComponent<Props> = ({
  open,
  handleClose,
}) => {
  const [selectedSource, setSelectedSource] = useState<string>("")
  const [selectedInterval, setSelectedInterval] = useState<string>("24 hours")

  console.log(selectedSource, selectedInterval)
  return (
    <ModalDialog
      open={open}
      closeable
      closeModal={handleClose}
      title={"Quotation Settings"}
      size={ModalSize.MediumNew}
      actionButtonLabel={"Save changes"}
      actionButtonDisabled
      onActionButtonClick={handleClose}
      closeButton={false}
      actionButtonSize={Size.FixedSmall}
    >
      <GenericThemeProvider>
        <Form>
          <Form.SelectInput
            config={{
              name: "quotation-source",
              options: [
                "15 min",
                "30 min",
                "1h",
                "2h",
                "3h",
                "4h",
                "5h",
                "6h",
                "7h",
                "8h",
                "9h",
                "10h",
                "11h",
                "12h",
                "13h",
                "14h",
                "15h",
                "16h",
                "17h",
                "18h",
                "19h",
                "20h",
                "21h",
                "22h",
                "23h",
                "24h",
                "midnight",
              ],
            }}
          />
        </Form>
      </GenericThemeProvider>
      <QuotationSource>
        <SectionTitle>Display on Harmony:</SectionTitle>
      </QuotationSource>
      <QuotationSource>
        <SectionTitle>Display a different quotation every:</SectionTitle>
        {/*<InputSearchComponent*/}
        {/*  onSearchValueChange={() => {}}*/}
        {/*  searchValue={""}*/}
        {/*  items={[*/}
        {/*    {*/}
        {/*      data: "24 hours",*/}
        {/*      label: "24 hours",*/}
        {/*    },*/}
        {/*    {*/}
        {/*      data: "12 hours",*/}
        {/*      label: "12 hours",*/}
        {/*    },*/}
        {/*  ]}*/}
        {/*  selectedItem={selectedInterval}*/}
        {/*  // onChange={setSelectedInterval}*/}
        {/*  searchable={false}*/}
        {/*  onSelect={(item: string) => {*/}
        {/*    console.log("Selected Interval:", item)*/}
        {/*    setSelectedInterval(item)*/}
        {/*  }}*/}
        {/*  renderListItem={({ item }) => {*/}
        {/*    return (*/}
        {/*      <ListItem>*/}
        {/*        <Text displayStyle={TextDisplayStyle.Label}>{item.label}</Text>*/}
        {/*      </ListItem>*/}
        {/*    )*/}
        {/*  }}*/}
        {/*/>*/}
      </QuotationSource>
    </ModalDialog>
  )
}

const SectionTitle = styled(Text).attrs((attrs) => ({
  ...attrs,
  displayStyle: TextDisplayStyle.Headline4,
}))``

const QuotationSource = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 2.4rem;
`

const ListItem = styled(Text).attrs((attrs) => ({
  ...attrs,
  displayStyle: TextDisplayStyle.Paragraph1,
}))``
