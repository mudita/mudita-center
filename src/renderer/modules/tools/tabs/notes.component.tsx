import moment from "moment"
import React, { useEffect, useState } from "react"

import { NotesTestIds } from "Renderer/modules/tools/tabs/notes.interface"
import ButtonComponent from "Renderer/components/core/button/button.component"
import {
  DisplayStyle,
  Size as ButtonSize,
} from "Renderer/components/core/button/button.config"
import { Type } from "Renderer/components/core/icon/icon.config"
import { Size as CheckboxSize } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import {
  Labels,
  TableSortButton,
} from "Renderer/components/core/table/table.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import {
  Checkbox,
  isToday,
} from "Renderer/components/rest/calls/calls-table.component"
import { messages } from "Renderer/components/rest/messages/templates/templates-panel.component"
import {
  Col,
  FiltersWrapper,
  Row,
  SearchButton,
  SearchInput,
  Table,
  SelectionManager,
  TextCut,
  EmptyState,
} from "Renderer/modules/tools/tabs/notes.styled"

import FunctionComponent from "Renderer/types/function-component.interface"
import useSort from "Renderer/utils/hooks/use-sort/use-sort"
import { SortDirection } from "Renderer/utils/hooks/use-sort/use-sort.types"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"

import { intl } from "Renderer/utils/intl"
import { noop } from "Renderer/utils/noop"

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
  const [notes, setNotes] = useState<Note[]>([])
  const { data: sortedData, sort, sortDirection } = useSort(data)
  const {
    getRowStatus,
    toggleRow,
    noneRowsSelected: noRowsSelected,
    selectedRows,
    toggleAll,
  } = useTableSelect(data)

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
      <FiltersWrapper checkMode>
        {selectionManagerVisible ? (
          <SelectionManager
            data-testid={NotesTestIds.SelectionElement}
            selectedItemsNumber={selectedRows.length}
            allItemsSelected={selectedRows.length === notes.length}
            onToggle={toggleAll}
            message={{
              id: "view.name.notes.selected",
            }}
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
            label={intl.formatMessage({
              id: notesAvailable
                ? "view.name.notes.searchNotes"
                : "view.name.notes.noNotes",
            })}
            outlined
          />
        )}
        <SearchButton
          displayStyle={DisplayStyle.Primary}
          size={ButtonSize.FixedBig}
          label={intl.formatMessage({
            id: "view.name.notes.newNote",
          })}
          onClick={noop}
          Icon={Type.PlusSign}
        />
      </FiltersWrapper>

      {notesAvailable ? (
        <Table>
          <Labels>
            <Col />
            <Col>
              <Text message={{ id: "view.name.notes.note" }} />
            </Col>
            <Col onClick={sortByDate}>
              <Text message={{ id: "view.name.notes.edited" }} />
              <TableSortButton
                sortDirection={sortDirection.date || SortDirection.Ascending}
              />
            </Col>
          </Labels>
          <div data-testid={NotesTestIds.ItemsWrapper}>
            {notes.map(note => {
              const { id, content, date } = note
              const { selected, indeterminate } = getRowStatus(note)
              const toggle = () => toggleRow(note)

              return (
                <Row key={id} data-testid={NotesTestIds.Note}>
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
                  <Col onClick={noop}>
                    <TextCut displayStyle={TextDisplayStyle.LargeText}>
                      {content}
                    </TextCut>
                  </Col>
                  <Col onClick={noop}>
                    <Text displayStyle={TextDisplayStyle.LargeText}>
                      {isToday(date)
                        ? intl.formatMessage({ id: "view.generic.today" })
                        : moment(date).format("ll")}
                    </Text>
                  </Col>
                </Row>
              )
            })}
          </div>
        </Table>
      ) : (
        <EmptyState data-testid={NotesTestIds.Empty}>
          <Text
            message={{ id: "view.name.notes.noNotes" }}
            displayStyle={TextDisplayStyle.LargeText}
          />
        </EmptyState>
      )}
    </>
  )
}

export default Notes
