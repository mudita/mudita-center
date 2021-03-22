/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useRef, useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { CalendarProps } from "App/calendar/calendar.interface"
import modalService from "Renderer/components/core/modal/modal.service"
import SelectVendorModal from "App/calendar/components/select-vendor-modal/select-vendor-modal.component"
import SelectCalendarsModal from "App/calendar/components/select-calendars-modal/select-calendars-modal.component"
import SynchronizingEventsModal from "App/calendar/components/synchronizing-events-modal.component"
import delayResponse from "@appnroll/delay-response"
import logger from "App/main/utils/logger"
import EventsSynchronizationFinishedModal from "App/calendar/components/synchronization-finished-modal.component"
import EventsSynchronizationFailedModal from "App/calendar/components/synchronization-failed.component"
import {
  ExternalProvider,
  Provider,
} from "Renderer/models/external-providers/external-providers.interface"
import AuthorizationFailedModal from "App/calendar/components/authorization-failed.component"
import { Calendar, CalendarEvent } from "App/calendar/store/calendar.interfaces"
import CalendarUIStateless from "App/calendar/components/calendar-ui-stateless.component"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import parseIcs from "App/calendar/helpers/parse-ics/parse-ics"
import ImportEventsModal from "App/calendar/components/import-events-modal/import-events-modal.component"

const CalendarUI: FunctionComponent<CalendarProps> = ({
  calendars,
  events,
  loadCalendars,
  loadEvents,
  setEvents,
}) => {
  const tableSelectHook = useTableSelect<CalendarEvent>(events)
  const [provider, setProvider] = useState<ExternalProvider | undefined>()
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
        provider={provider as ExternalProvider}
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
    setEvents(calendarEvents)
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
    <CalendarUIStateless
      events={events}
      openSelectVendorModal={openSelectVendorModal}
      tableSelectHook={tableSelectHook}
      selectedEventIndex={selectedEvent ? events.indexOf(selectedEvent) : -1}
      onEventSelect={setSelectedEvent}
    />
  )
}

export default CalendarUI
