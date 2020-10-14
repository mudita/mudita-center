import moment from "moment"
import React from "react"
import ButtonComponent from "Renderer/components/core/button/button.component"
import {
  DisplayStyle,
  Size as ButtonSize,
} from "Renderer/components/core/button/button.config"
import Icon, { IconSize } from "Renderer/components/core/icon/icon.component"
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
  TextInfo,
  Checkbox,
} from "Renderer/modules/tools/tabs/notes.styled"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import { intl } from "Renderer/utils/intl"
import { noop } from "Renderer/utils/noop"
import useTableSidebar from "Renderer/utils/hooks/use-table-sidebar"
import {
  normalizeText,
  useTextEditor,
} from "Renderer/components/core/text-editor/text-editor.hook"
import { defineMessages } from "react-intl"
import TextEditor from "Renderer/components/core/text-editor/text-editor.component"
import { useTemporaryStorage } from "Renderer/utils/hooks/use-temporary-storage/use-temporary-storage.hook"
import { isToday } from "Renderer/utils/is-today"
import { NoteCallback } from "Renderer/models/notes/notes"
import { makeNewNote } from "Renderer/models/notes/make-new-note"
import { searchIcon } from "Renderer/components/core/input-text/input-text.elements"
import { SortOrder } from "Common/enums/sort-order.enum"

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
  unsavedNote: {
    id: "view.name.tools.notes.unsavedNote",
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
  emptyNoteText: { id: "view.name.tools.notes.emptyNote" },
})

export interface Note {
  date: Date
  content: string
  id: string
}

interface NotesProps {
  notes: Note[]
  newNoteId?: string
  createNewNote?: (noteCallback: NoteCallback) => void
  saveNote?: (note: Note) => void
  removeNotes?: (ids: string[]) => void
  sortOrder: SortOrder
  changeSortOrder: (sortOrder: SortOrder) => void
}

const Notes: FunctionComponent<NotesProps> = ({
  notes,
  newNoteId,
  createNewNote,
  saveNote,
  removeNotes,
  sortOrder,
  changeSortOrder,
}) => {
  const maxCharacters = 4000
  const {
    getRowStatus,
    toggleRow,
    resetRows,
    noneRowsSelected: noRowsSelected,
    selectedRows,
    toggleAll,
  } = useTableSelect(notes)
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

  const deleteNotes = () => {
    if (removeNotes) {
      const ids = (selectedRows as Note[]).map(({ id }: Note) => id)
      removeNotes(ids)
      resetRows()
    }
  }

  const selectionManagerVisible = selectedRows.length > 0
  const notesAvailable = notes.length > 0

  const onNewButtonClick = () => {
    if (createNewNote) {
      createNewNote(openSidebar)
    }
  }

  const tryToSave = () => {
    if (saveNote && activeRow) {
      const content = textEditorHook.temporaryText
      const { id } = activeRow

      saveNote(makeNewNote(id, content))
    }
  }

  const handleChangesReject = () => {
    rejectChanges()
    if (removeNotes && newNoteId && activeRow?.id === newNoteId) {
      removeNotes([newNoteId])
      closeSidebar()
    }
  }

  const toggleSortOrder = () => {
    if (sortOrder === SortOrder.Descending) {
      changeSortOrder(SortOrder.Ascending)
    } else {
      changeSortOrder(SortOrder.Descending)
    }
  }

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
                onClick={deleteNotes}
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
            leadingIcons={[searchIcon]}
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
          disabled={Boolean(newNoteId)}
        />
      </FiltersWrapper>

      <TableWithSidebarWrapper>
        {notesAvailable ? (
          <Table
            hideColumns={Boolean(activeRow)}
            hideableColumnsIndexes={[2, 3, 4]}
            role="list"
          >
            <Labels size={RowSize.Small}>
              <Col />
              <Col>
                <Text message={messages.note} />
              </Col>
              <Col />
              <Col
                onClick={toggleSortOrder}
                data-testid={NotesTestIds.SortColumn}
              >
                <Text message={messages.edited} />
                <TableSortButton sortOrder={sortOrder} />
              </Col>
              <Col />
            </Labels>
            <div data-testid={NotesTestIds.ItemsWrapper}>
              {notes.map((note) => {
                const { id, content, date } = note
                const { selected } = getRowStatus(note)
                const { getTemporaryValue } = useTemporaryStorage<string>(
                  id,
                  content
                )

                const editedNote =
                  normalizeText(getTemporaryValue()) !== normalizeText(content)

                const newNote = id === newNoteId

                const emptyNote = getTemporaryValue().length === 0
                const text = emptyNote
                  ? intl.formatMessage(messages.emptyNoteText)
                  : (editedNote
                      ? getTemporaryValue()
                      : normalizeText(content)
                    ).substr(0, 250)

                const toggle = () => {
                  if (sidebarOpened) {
                    closeSidebar()
                  }
                  toggleRow(note)
                }

                const handleTextPreviewClick = () => {
                  noRowsSelected ? openSidebar(note) : toggle()
                }

                const deleteNote = () => {
                  if (removeNotes) {
                    removeNotes([id])
                  }
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
                        {emptyNote ? <em>{text}</em> : text}
                      </TextCut>
                    </TextPreview>
                    <Col>
                      {(editedNote || newNote) && (
                        <TextInfo>
                          {newNote && (
                            <>
                              <em>{intl.formatMessage(messages.newNote)}</em>
                              <br />
                            </>
                          )}
                          <em>{intl.formatMessage(messages.unsavedNote)}</em>
                        </TextInfo>
                      )}
                    </Col>
                    <Col onClick={noop}>
                      <Text displayStyle={TextDisplayStyle.LargeText}>
                        {isToday(date)
                          ? intl.formatMessage(messages.today)
                          : moment(date).format("ll")}
                      </Text>
                    </Col>
                    <DeleteCol onClick={deleteNote}>
                      <Icon type={Type.Delete} width={IconSize.Medium} />
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
              onChangesReject={handleChangesReject}
              statsInfoError={textLength > maxCharacters}
              statsInfo={intl.formatMessage(messages.charactersNumber, {
                currentCharacters: textLength,
                maxCharacters,
              })}
              autoFocus={newNoteId === activeRow?.id}
              onChangesSave={tryToSave}
            />
          )}
        </NotesSidebar>
      </TableWithSidebarWrapper>
    </>
  )
}

export default Notes
