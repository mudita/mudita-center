/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, memo, PropsWithChildren, useCallback } from "react"
import { useFormContext } from "react-hook-form"
import styled from "styled-components"
import { AnimatePresence, motion } from "motion/react"
import { Button, SelectionManager } from "app-theme/ui"
import { ButtonSize, ButtonType, IconType } from "app-theme/models"
import { FormValues } from "./form"
import { defineMessages } from "app-localize/utils"

const messages = defineMessages({
  importButton: {
    id: "apiDevice.contacts.importButton",
  },
  selectedContacts: {
    id: "apiDevice.contacts.panel.selectedContacts",
  },
  deleteButton: {
    id: "general.app.deleteButton.text",
  },
})

interface Props extends PropsWithChildren {
  contactsIds: string[]
}

export const Panel: FunctionComponent<Props> = ({ contactsIds, children }) => {
  const form = useFormContext<FormValues>()

  const checkedContactsIds = form.watch("checkedContactsIds")
  const selectedCount = checkedContactsIds.filter(Boolean).length
  const totalCount = contactsIds.length

  const onAllToggle = useCallback(() => {
    if (selectedCount === totalCount) {
      form.setValue(
        "checkedContactsIds",
        Array.from({ length: totalCount }, () => undefined)
      )
    } else {
      form.setValue("checkedContactsIds", contactsIds)
    }
  }, [selectedCount, totalCount, form, contactsIds])

  return (
    <Wrapper>
      <AnimatePresence initial={false} mode={"popLayout"}>
        {selectedCount > 0 ? (
          <SelectMode
            key={"select-mode"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <PanelSelectMode
              selectedContactsCount={selectedCount}
              allContactsSelected={selectedCount === totalCount}
              onAllToggle={onAllToggle}
            />
          </SelectMode>
        ) : (
          <DefaultMode
            key={"default-mode"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <PanelDefaultMode>{children}</PanelDefaultMode>
          </DefaultMode>
        )}
      </AnimatePresence>
    </Wrapper>
  )
}

const PanelDefaultMode: FunctionComponent<PropsWithChildren> = memo(
  ({ children }) => {
    return (
      <>
        <HeadingSearch>{children}</HeadingSearch>
        <HeadingActions>
          <Button size={ButtonSize.Medium} message={messages.importButton.id} />
        </HeadingActions>
      </>
    )
  }
)

const PanelSelectMode: FunctionComponent<{
  selectedContactsCount: number
  allContactsSelected: boolean
  onAllToggle: VoidFunction
}> = ({ selectedContactsCount, allContactsSelected, onAllToggle }) => {
  return (
    <HeadingSelectionManager
      selectedItemsNumber={selectedContactsCount}
      message={messages.selectedContacts}
      allItemsSelected={allContactsSelected}
      onToggle={onAllToggle}
      buttons={[
        <Button
          key="delete-button"
          type={ButtonType.Text}
          message={messages.deleteButton.id}
          icon={IconType.Trash}
        />,
      ]}
    />
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 10.4rem;
  padding: 0 3.2rem;
`

const DefaultMode = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 28rem 1fr auto;
  grid-template-areas: "Search . Actions";
`

const SelectMode = styled(motion.div)`
  width: 100%;
`

const HeadingSearch = styled.div`
  grid-area: Search;
`

const HeadingSelectionManager = styled(SelectionManager)`
  grid-column-start: 1;
  grid-column-end: 3;
`

const HeadingActions = styled.div`
  grid-area: Actions;
  justify-self: end;
  display: flex;
  flex-direction: row;
  gap: 2.4rem;
`
