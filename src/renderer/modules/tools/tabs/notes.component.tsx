import moment from "moment"
import React, { useEffect, useState } from "react"
import ButtonComponent from "Renderer/components/core/button/button.component"
import {
  DisplayStyle,
  Size as ButtonSize,
} from "Renderer/components/core/button/button.config"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { Size as CheckboxSize } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import {
  Col,
  EmptyState,
  Labels,
  RowSize,
  TableSortButton,
  TableWithSidebarWrapper,
} from "Renderer/components/core/table/table.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import {
  Checkbox,
  isToday,
} from "Renderer/components/rest/calls/calls-table.component"
import { NotesTestIds } from "Renderer/modules/tools/tabs/notes.interface"
import {
  FiltersWrapper,
  Row,
  SearchButton,
  SearchInput,
  SelectionManager,
  NotesSidebar,
  TextPreview,
  Table,
  TextCut,
  DeleteCol,
} from "Renderer/modules/tools/tabs/notes.styled"

import FunctionComponent from "Renderer/types/function-component.interface"
import useSort from "Renderer/utils/hooks/use-sort/use-sort"
import { SortDirection } from "Renderer/utils/hooks/use-sort/use-sort.types"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"

import { intl } from "Renderer/utils/intl"
import { noop } from "Renderer/utils/noop"
import useTableSidebar from "Renderer/utils/hooks/useTableSidebar"
import { useTextEditor } from "Renderer/components/core/text-editor/text-editor.hook"
import { defineMessages } from "react-intl"
import TextEditor from "Renderer/components/core/text-editor/text-editor.component"
import { useTemporaryStorage } from "Renderer/utils/hooks/use-temporary-storage/use-temporary-storage.hook"
import { isToday } from "Renderer/utils/is-today"

const messages = defineMessages({
  searchPlaceholder: {
    id: "view.name.tools.notes.searchPlaceholder",
  },
  searchNotes: {
    id: "view.name.tools.notes.searchNotes",
  },
  emptyListTitle: {
    id: "view.name.tools.notes.emptyList.title",
  },
  emptyListNoNotes: {
    id: "view.name.tools.notes.emptyList.noNotes",
  },
  emptyListNotFound: {
    id: "view.name.tools.notes.emptyList.notFound",
  },
  newNote: {
    id: "view.name.tools.notes.newNote",
  },
  note: {
    id: "view.name.tools.notes.note",
  },
  edited: {
    id: "view.name.tools.notes.edited",
  },
  today: {
    id: "view.generic.today",
  },
  selectionsNumber: {
    id: "view.name.tools.notes.selectionsNumber",
  },
  newButton: {
    id: "view.name.tools.notes.newButton",
  },
  deleteButton: {
    id: "view.name.tools.notes.deleteButton",
  },
  charactersNumber: { id: "view.name.tools.notes.editor.charactersNumber" },
})

interface Note {
  date: Date
  content: string
  id: string
}

interface NotesProps {
  data: Note[]
}

const mockFilter = (data: Note[], ids: string[]): Note[] =>
  data.filter(({ id }) => ids.indexOf(id) === -1)

const Notes: FunctionComponent<NotesProps> = ({ data }) => {
  const maxCharacters = 4000
  const [notes, setNotes] = useState<Note[]>([])
  const { data: sortedData, sort, sortDirection } = useSort(data)
  const {
    getRowStatus,
    toggleRow,
    noneRowsSelected: noRowsSelected,
    selectedRows,
    toggleAll,
  } = useTableSelect(data)

  const {
    openSidebar,
    closeSidebar,
    activeRow,
    sidebarOpened,
  } = useTableSidebar<Note>()

  const textEditorHook = useTextEditor(activeRow)

  const {
    temporaryText: { length: textLength },
  } = textEditorHook

  const sortByDate = () => sort("date")

  const filterOutMessages = () => {
    setNotes(mockFilter(sortedData, selectedRows as string[]))
  }

  const selectionManagerVisible = selectedRows.length > 0
  const notesAvailable = notes.length > 0

  /**
   * Just an exemplary effect here, it will be removed
   * after the logic implementation will take place.
   */

  useEffect(() => {
    sortByDate()
    setNotes(sortedData)
  }, [])

  useEffect(() => {
    setNotes(sortedData)
  }, [sortedData])

  return (
    <>
      <FiltersWrapper>
        {selectionManagerVisible ? (
          <SelectionManager
            data-testid={NotesTestIds.SelectionElement}
            selectedItemsNumber={selectedRows.length}
            allItemsSelected={selectedRows.length === notes.length}
            onToggle={toggleAll}
            message={messages.selectionsNumber}
            checkboxSize={CheckboxSize.Small}
            buttons={[
              <ButtonComponent
                key="delete"
                label={intl.formatMessage(messages.deleteButton)}
                displayStyle={DisplayStyle.Link1}
                Icon={Type.Delete}
                onClick={filterOutMessages}
              />,
            ]}
          />
        ) : (
          <SearchInput
            data-testid={NotesTestIds.SearchElement}
            type={"search"}
            disabled={!notesAvailable}
            label={intl.formatMessage(
              notesAvailable ? messages.searchNotes : messages.emptyListNoNotes
            )}
            outlined
          />
        )}
        <SearchButton
          displayStyle={DisplayStyle.Primary}
          size={ButtonSize.FixedBig}
          label={intl.formatMessage(messages.newNote)}
          onClick={noop}
          Icon={Type.PlusSign}
        />
      </FiltersWrapper>

      <TableWithSidebarWrapper>
        {notesAvailable ? (
          <Table
            hideColumns={Boolean(activeRow)}
            hideableColumnsIndexes={[2, 3]}
          >
            <Labels size={RowSize.Small}>
              <Col />
              <Col>
                <Text message={messages.note} />
              </Col>
              <Col onClick={sortByDate}>
                <Text message={messages.edited} />
                <TableSortButton
                  sortDirection={sortDirection.date || SortDirection.Ascending}
                />
              </Col>
            </Labels>
            <div data-testid={NotesTestIds.ItemsWrapper}>
              {notes.map(note => {
                const { id, content, date } = note
                const { selected, indeterminate } = getRowStatus(note)
                const { get: getAutosavedNote } = useTemporaryStorage(
                  id,
                  content
                )

                const toggle = () => {
                  if (sidebarOpened) {
                    closeSidebar()
                  }
                  toggleRow(note)
                }

                const handleTextPreviewClick = () => {
                  if (noRowsSelected) {
                    openSidebar(note)
                  } else {
                    toggle()
                  }
                }

                return (
                  <Row
                    key={id}
                    data-testid={NotesTestIds.Note}
                    active={activeRow?.id === id}
                  >
                    <Col>
                      <Checkbox
                        data-testid={NotesTestIds.Checkbox}
                        checked={selected}
                        indeterminate={indeterminate}
                        onChange={toggle}
                        size={CheckboxSize.Small}
                        visible={!noRowsSelected}
                      />
                    </Col>
                    <TextPreview onClick={handleTextPreviewClick}>
                      <TextCut displayStyle={TextDisplayStyle.LargeText}>
                        {(getAutosavedNote() || "").substr(0, 250)}
                      </TextCut>
                    </TextPreview>
                    <Col onClick={noop}>
                      <Text displayStyle={TextDisplayStyle.LargeText}>
                        {isToday(date)
                          ? intl.formatMessage(messages.today)
                          : moment(date).format("ll")}
                      </Text>
                    </Col>
                    <DeleteCol onClick={noop}>
                      <Icon type={Type.Delete} width={1.5} />
                    </DeleteCol>
                  </Row>
                )
              })}
            </div>
          </Table>
        ) : (
          <EmptyState
            title={messages.emptyListTitle}
            description={messages.emptyListNoNotes}
            data-testid={NotesTestIds.Empty}
          />
        )}
        <NotesSidebar show={Boolean(activeRow)} onClose={closeSidebar}>
          {activeRow && (
            <TextEditor
              {...textEditorHook}
              statsInfoError={textLength > maxCharacters}
              statsInfo={intl.formatMessage(messages.charactersNumber, {
                currentCharacters: textLength,
                maxCharacters,
              })}
            />
          )}
        </NotesSidebar>
      </TableWithSidebarWrapper>
    </>
  )
}

export default Notes
