import { storiesOf } from "@storybook/react"

// Stories
import partsLabels from "Renderer/components/core/table/stories/parts/labels"
import partsRowsTypes from "Renderer/components/core/table/stories/parts/rows-types"
import partsRowsStates from "Renderer/components/core/table/stories/parts/rows-states"
import partsSidebar from "Renderer/components/core/table/stories/parts/sidebar"
import partsLoadingState from "Renderer/components/core/table/stories/parts/loading-state"
import partsEmptyState from "Renderer/components/core/table/stories/parts/empty-state"

import basicEmpty from "Renderer/components/core/table/stories/basic/empty"
import basicWithData from "Renderer/components/core/table/stories/basic/with-data"
import basicWithoutLabel from "Renderer/components/core/table/stories/basic/without-label"
import basicWithColumnsHidden from "Renderer/components/core/table/stories/basic/with-columns-hidden"
import basicWithSidebar from "Renderer/components/core/table/stories/basic/with-sidebar"
import basicWithSelectableRows from "Renderer/components/core/table/stories/basic/with-selectable-rows"
import basicSortable from "Renderer/components/core/table/stories/basic/sortable"

import nestedEmpty from "Renderer/components/core/table/stories/nested/empty"
import nestedWithData from "Renderer/components/core/table/stories/nested/with-data"
import nestedWithoutLabels from "Renderer/components/core/table/stories/nested/without-labels"
import nestedWithColumnsHidden from "Renderer/components/core/table/stories/nested/with-columns-hidden"
import nestedWithSelectableRows from "Renderer/components/core/table/stories/nested/with-selectable-rows"

import groupedEmpty from "Renderer/components/core/table/stories/grouped/empty"
import groupedWithData from "Renderer/components/core/table/stories/grouped/with-data"
import groupedWithHiddenColumns from "Renderer/components/core/table/stories/grouped/with-hidden-columns"
import groupedWithSidebar from "Renderer/components/core/table/stories/grouped/with-sidebar"
import groupedWithSelectableRows from "Renderer/components/core/table/stories/grouped/with-selectable-rows"

storiesOf("Components|Table/Parts", module)
  .add("Labels", partsLabels)
  .add("Rows / types", partsRowsTypes)
  .add("Rows / states", partsRowsStates)
  .add("Sidebar", partsSidebar)
  .add("Loading state", partsLoadingState)
  .add("Empty state", partsEmptyState)

storiesOf("Components|Table/Basic", module)
  .add("Empty", basicEmpty)
  .add("With data", basicWithData)
  .add("Without labels", basicWithoutLabel)
  .add("With columns hidden", basicWithColumnsHidden)
  .add("With sidebar", basicWithSidebar)
  .add("With selectable rows", basicWithSelectableRows)
  .add("Sortable", basicSortable)

storiesOf("Components|Table/Nested", module)
  .add("Empty", nestedEmpty)
  .add("With data", nestedWithData)
  .add("Without labels", nestedWithoutLabels)
  .add("With columns hidden", nestedWithColumnsHidden)
  .add("With selectable rows", nestedWithSelectableRows)

storiesOf("Components|Table/Grouped", module)
  .add("Empty", groupedEmpty)
  .add("With data", groupedWithData)
  .add("With hidden columns", groupedWithHiddenColumns)
  .add("With sidebar", groupedWithSidebar)
  .add("With selectable rows", groupedWithSelectableRows)
