/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React, { useEffect, useRef, useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { CalendarProps } from "Renderer/modules/calendar/calendar.interface"
import modalService from "Renderer/components/core/modal/modal.service"
import SelectVendorModal from "Renderer/components/rest/calendar/select-vendor-modal.component"
import SelectCalendarsModal from "Renderer/components/rest/calendar/select-calendars-modal.component"
import SynchronizingEventsModal from "Renderer/components/rest/calendar/synchronizing-events-modal.component"
import delayResponse from "@appnroll/delay-response"
import logger from "App/main/utils/logger"
import EventsSynchronizationFinishedModal from "Renderer/components/rest/calendar/synchronization-finished-modal.component"
import EventsSynchronizationFailedModal from "Renderer/components/rest/calendar/synchronization-failed.component"
import { Provider } from "Renderer/models/external-providers/external-providers.interface"
import AuthorizationFailedModal from "Renderer/components/rest/calendar/authorization-failed.component"
import {
  Calendar,
  CalendarEvent,
} from "Renderer/models/calendar/calendar.interfaces"
import CalendarUI from "Renderer/modules/calendar/calendar-ui.component"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import parseIcs from "App/calendar/helpers/parse-ics/parse-ics"
import ImportEventsModal from "App/calendar/components/import-events-modal/import-events-modal.component"
import overwriteDuplicates from "App/calendar/helpers/overwrite-duplicates/overwrite-duplicates"

const CalendarComponent: FunctionComponent<CalendarProps> = ({
  calendars,
  events,
  loadCalendars,
  loadEvents,
  setEvents,
}) => {
  const tableSelectHook = useTableSelect<CalendarEvent>(events)
  const [provider, setProvider] = useState<Provider | undefined>()
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const highlightActiveEventTimeout = useRef<NodeJS.Timeout>()

  const setGoogleProvider = () => setProvider(Provider.Google)
  const resetProvider = () => setProvider(undefined)
  const closeModal = () => modalService.closeModal()
  const authorizeAndLoadCalendars = async () => {
    if (!provider) {
      throw new Error("No provider selected")
    }

    try {
      return await loadCalendars(provider)
    } catch (error) {
      logger.error(error)
      openAuthorizationFailedModal()
    }
  }

  const openAuthorizationFailedModal = async () => {
    await modalService.closeModal()
    modalService.openModal(
      <AuthorizationFailedModal
        provider={provider as Provider}
        onActionButtonClick={authorizeAndLoadCalendars}
      />
    )
  }

  const openSynchronizingLoaderModal = async () => {
    await modalService.closeModal()
    modalService.openModal(<SynchronizingEventsModal />)
  }

  const openSynchronizationFailedModal = async () => {
    await modalService.closeModal()
    modalService.openModal(<EventsSynchronizationFailedModal />)
  }

  const openSynchronizationFinishedModal = async (
    importedEventsCount: number
  ) => {
    await closeModal()
    modalService.openModal(
      <EventsSynchronizationFinishedModal
        importedEventsCount={importedEventsCount}
        onActionButtonClick={closeModal}
      />,
      true
    )
  }

  const addImportedEvents = async (files: File[]) => {
    const calendarEvents = await parseIcs(files.map(({ path }) => path))
    await modalService.closeModal()
    modalService.openModal(
      <ImportEventsModal
        events={calendarEvents}
        onActionButtonClick={closeModal}
      />
    )
    setEvents(overwriteDuplicates(events, calendarEvents))
  }

  const manualImport = (inputElement: HTMLInputElement) => {
    const onFileSelect = async () => {
      if (inputElement.files) {
        await addImportedEvents(Array.from(inputElement.files))
        inputElement.removeEventListener("change", onFileSelect)
      }
    }

    inputElement.click()
    inputElement.addEventListener("change", onFileSelect)
  }

  const openSelectVendorModal = () => {
    resetProvider()

    try {
      modalService.openModal(
        <SelectVendorModal
          onGoogleButtonClick={setGoogleProvider}
          onManualImportClick={manualImport}
        />
      )
    } catch (error) {
      openSynchronizationFailedModal()
      logger.error(error)
      return error
    }
  }

  const openSelectCalendarsModal = async () => {
    await modalService.closeModal()
    modalService.openModal(
      <SelectCalendarsModal
        calendars={calendars}
        onSynchronize={synchronizeEvents}
      />
    )
  }

  const synchronizeEvents = async (calendar: Calendar) => {
    try {
      openSynchronizingLoaderModal()
      const newEvents = await delayResponse(loadEvents(calendar))
      openSynchronizationFinishedModal(newEvents.length)
    } catch (error) {
      openSynchronizationFailedModal()
      logger.error(error)
      return error
    }
  }

  useEffect(() => {
    if (calendars.length && provider) {
      openSelectCalendarsModal()
    }
  }, [calendars, provider])

  useEffect(() => {
    if (provider) {
      authorizeAndLoadCalendars()
    }
  }, [provider])

  useEffect(() => {
    if (selectedEvent) {
      const selectedEventIndex = events.indexOf(selectedEvent)

      if (selectedEventIndex >= 0) {
        highlightActiveEventTimeout.current = setTimeout(() => {
          setSelectedEvent(null)
        }, 3500)
      }
    }
    return () => {
      if (highlightActiveEventTimeout.current) {
        clearTimeout(highlightActiveEventTimeout.current)
      }
    }
  }, [selectedEvent])
  return (
    <CalendarUI
      events={events}
      openSelectVendorModal={openSelectVendorModal}
      tableSelectHook={tableSelectHook}
      selectedEventIndex={selectedEvent ? events.indexOf(selectedEvent) : -1}
      onEventSelect={setSelectedEvent}
    />
  )
}

export default CalendarComponent
