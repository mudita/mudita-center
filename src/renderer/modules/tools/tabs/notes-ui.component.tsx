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
import { Checkbox } from "Renderer/components/rest/calls/calls-table.styled"
import { NotesTestIds } from "Renderer/modules/tools/tabs/notes.enum"
import {
  FiltersWrapper,
  Row,
  NewNoteButton,
  SearchInput,
  SelectionManager,
  NotesSidebar,
  TextPreview,
  Table,
  TextCut,
  DeleteCol,
} from "Renderer/modules/tools/tabs/notes.styled"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import useSort from "Renderer/utils/hooks/use-sort/use-sort"
import { SortDirection } from "Renderer/utils/hooks/use-sort/use-sort.types"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import { intl, textFormatters } from "Renderer/utils/intl"
import { noop } from "Renderer/utils/noop"
import useTableSidebar from "Renderer/utils/hooks/useTableSidebar"
import { useTextEditor } from "Renderer/components/core/text-editor/text-editor.hook"
import { defineMessages } from "react-intl"
import TextEditor from "Renderer/components/core/text-editor/text-editor.component"
import { useTemporaryStorage } from "Renderer/utils/hooks/use-temporary-storage/use-temporary-storage.hook"
import { isToday } from "Renderer/utils/is-today"
import { NoteCallback } from "Renderer/models/notes/notes"
import { makeNewNote } from "Renderer/models/notes/make-new-note"

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
  newNoteText: { id: "view.name.tools.notes.newNote" },
  emptyNoteText: { id: "view.name.tools.notes.emptyNote" },
})

export interface Note {
  date: Date
  content: string
  id: string
}

interface NotesProps {
  notesList: Note[]
  createNewNote?: (noteCallback: NoteCallback) => void
  saveNote?: (note: Note) => void
  removeNotes?: (ids: string[]) => void
}

const Notes: FunctionComponent<NotesProps> = ({
  notesList,
  createNewNote,
  saveNote,
  removeNotes,
}) => {
  const maxCharacters = 4000
  const [newNoteId, setNewNoteId] = useState<string | undefined>()
  const { data: sortedData, sort, sortDirection } = useSort(notesList)
  const {
    getRowStatus,
    toggleRow,
    resetRows,
    noneRowsSelected: noRowsSelected,
    selectedRows,
    toggleAll,
  } = useTableSelect(notesList)
  const {
    openSidebar,
    closeSidebar,
    activeRow,
    sidebarOpened,
  } = useTableSidebar<Note>()

  const { rejectChanges, ...textEditorHook } = useTextEditor(activeRow)
  const {
    temporaryText: { length: textLength },
  } = textEditorHook
  const sortByDate = () => sort("date", notesList)

  const filterOutMessages = () => {
    if (removeNotes) {
      const ids = (selectedRows as Note[]).map(({ id }: Note) => id)
      removeNotes(ids)
      resetRows()
    }
  }

  const selectionManagerVisible = selectedRows.length > 0
  const notesAvailable = sortedData.length > 0
  const newNoteAvailable = newNoteId === undefined

  const onNewButtonClick = () => {
    if (createNewNote) {
      createNewNote(openSidebar)
      setNewNoteId("")
    }
  }

  const tryToSave = () => {
    if (saveNote && activeRow) {
      const content = textEditorHook.temporaryText
      const { id } = activeRow

      saveNote(makeNewNote(id, content))

      if (!newNoteAvailable) {
        setNewNoteId(undefined)
      }
    }
  }

  useEffect(() => {
    if (activeRow && newNoteId === "") {
      setNewNoteId(activeRow.id)
    }
  }, [activeRow, newNoteId])

  useEffect(() => {
    sortByDate()
  }, [])

  const onChangesReject = () => {
    rejectChanges()
    if (removeNotes && newNoteId && activeRow?.id === newNoteId) {
      removeNotes([newNoteId])
      setNewNoteId(undefined)
      closeSidebar()
    }
  }

  return (
    <>
      <FiltersWrapper>
        {selectionManagerVisible ? (
          <SelectionManager
            data-testid={NotesTestIds.SelectionElement}
            selectedItemsNumber={selectedRows.length}
            allItemsSelected={selectedRows.length === sortedData.length}
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
        <NewNoteButton
          displayStyle={DisplayStyle.Primary}
          size={ButtonSize.FixedBig}
          label={intl.formatMessage(messages.newButton)}
          onClick={onNewButtonClick}
          Icon={Type.PlusSign}
          data-testid={NotesTestIds.NewNoteButton}
          disabled={!newNoteAvailable}
        />
      </FiltersWrapper>

      <TableWithSidebarWrapper>
        {notesAvailable ? (
          <Table
            hideColumns={Boolean(activeRow)}
            hideableColumnsIndexes={[2, 3]}
            role="list"
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
              {sortedData.map((note) => {
                const { id, content, date } = note
                const { selected } = getRowStatus(note)
                const { getTemporaryValue } = useTemporaryStorage<string>(
                  id,
                  content
                )

                const newNote =
                  getTemporaryValue().length === 0 && id === newNoteId
                const emptyNote = getTemporaryValue().length === 0
                const text = newNote
                  ? intl.formatMessage(messages.newNoteText, textFormatters)
                  : emptyNote
                  ? intl.formatMessage(messages.emptyNoteText, textFormatters)
                  : getTemporaryValue().substr(0, 250)

                const toggle = () => {
                  if (sidebarOpened) {
                    closeSidebar()
                  }
                  toggleRow(note)
                }

                const handleTextPreviewClick = () => {
                  noRowsSelected ? openSidebar(note) : toggle()
                }

                return (
                  <Row
                    key={id}
                    data-testid={NotesTestIds.Note}
                    active={activeRow?.id === id}
                    role="listitem"
                  >
                    <Col>
                      <Checkbox
                        data-testid={NotesTestIds.Checkbox}
                        checked={selected}
                        onChange={toggle}
                        size={CheckboxSize.Small}
                        visible={!noRowsSelected}
                      />
                    </Col>
                    <TextPreview onClick={handleTextPreviewClick}>
                      <TextCut displayStyle={TextDisplayStyle.LargeText}>
                        {text}
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
        <NotesSidebar
          show={Boolean(activeRow)}
          onClose={closeSidebar}
          data-testid={NotesTestIds.NewNoteSidebar}
        >
          {activeRow && (
            <TextEditor
              {...textEditorHook}
              rejectChanges={onChangesReject}
              statsInfoError={textLength > maxCharacters}
              statsInfo={intl.formatMessage(messages.charactersNumber, {
                currentCharacters: textLength,
                maxCharacters,
              })}
              autoFocus={!newNoteAvailable}
              saveChanges={tryToSave}
            />
          )}
        </NotesSidebar>
      </TableWithSidebarWrapper>
    </>
  )
}

export default Notes
