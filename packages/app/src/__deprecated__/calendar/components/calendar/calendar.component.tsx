/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useRef, useState } from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { CalendarProps } from "App/__deprecated__/calendar/components/calendar/calendar.interface"
import modalService from "App/__deprecated__/renderer/components/core/modal/modal.service"
import SelectVendorModal from "App/__deprecated__/calendar/components/select-vendor-modal/select-vendor-modal.component"
import SelectCalendarsModal from "App/__deprecated__/calendar/components/select-calendars-modal/select-calendars-modal.component"
import SynchronizingEventsModal from "App/__deprecated__/calendar/components/synchronizing-events-modal.component"
import delayResponse from "@appnroll/delay-response"
import logger from "App/__deprecated__/main/utils/logger"
import EventsSynchronizationFinishedModal from "App/__deprecated__/calendar/components/synchronization-finished-modal.component"
import EventsSynchronizationFailedModal from "App/__deprecated__/calendar/components/synchronization-failed.component"
import {
  ExternalProvider,
  Provider,
} from "App/__deprecated__/renderer/models/external-providers/external-providers.interface"
import AuthorizationFailedModal from "App/__deprecated__/calendar/components/authorization-failed.component"
import {
  Calendar,
  CalendarEvent,
} from "App/__deprecated__/calendar/store/calendar.interfaces"
import CalendarUIStateless from "App/__deprecated__/calendar/components/calendar-ui-stateless.component"
import useTableSelect from "App/__deprecated__/renderer/utils/hooks/useTableSelect"
import parseIcs from "App/__deprecated__/calendar/helpers/parse-ics/parse-ics"
import ImportEventsModal from "App/__deprecated__/calendar/components/import-events-modal/import-events-modal.component"

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
  const setOutlookProvider = () => setProvider(Provider.Outlook)
  const resetProvider = () => setProvider(undefined)
  const closeModal = () => modalService.closeModal()
  const authorizeAndLoadCalendars = async () => {
    if (!provider) {
      throw new Error("No provider selected")
    }

    try {
      return await loadCalendars(provider)
    } catch (error) {
      logger.error(
        `Calendar: Load calendars from provider ${provider}. Data: ${JSON.stringify(
          error
        )}`
      )
      void openAuthorizationFailedModal()
    }
  }

  const openAuthorizationFailedModal = async () => {
    await modalService.closeModal()
    void modalService.openModal(
      <AuthorizationFailedModal
        provider={provider as ExternalProvider}
        onActionButtonClick={authorizeAndLoadCalendars}
      />
    )
  }

  const openSynchronizingLoaderModal = async () => {
    await modalService.closeModal()
    void modalService.openModal(<SynchronizingEventsModal />)
  }

  const openSynchronizationFailedModal = async () => {
    await modalService.closeModal()
    void modalService.openModal(<EventsSynchronizationFailedModal />)
  }

  const openSynchronizationFinishedModal = async (
    importedEventsCount: number
  ) => {
    await closeModal()
    void modalService.openModal(
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
    void modalService.openModal(
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
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        inputElement.removeEventListener("change", onFileSelect)
      }
    }

    inputElement.click()
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    inputElement.addEventListener("change", onFileSelect)
  }

  const openSelectVendorModal = () => {
    resetProvider()

    try {
      void modalService.openModal(
        <SelectVendorModal
          onGoogleButtonClick={setGoogleProvider}
          onManualImportClick={manualImport}
          onOutlookButtonClick={setOutlookProvider}
        />
      )
    } catch (error) {
      void openSynchronizationFailedModal()
      logger.error(
        `Calendar: selection vendor throw error. Data: ${JSON.stringify(error)}`
      )
      return error
    }
  }

  const openSelectCalendarsModal = async () => {
    await modalService.closeModal()
    void modalService.openModal(
      <SelectCalendarsModal
        calendars={calendars}
        onSynchronize={synchronizeEvents}
      />
    )
  }

  const synchronizeEvents = async (calendar: Calendar) => {
    try {
      void openSynchronizingLoaderModal()
      const newEvents = await delayResponse(loadEvents(calendar))
      void openSynchronizationFinishedModal(newEvents.length)
    } catch (error) {
      void openSynchronizationFailedModal()
      logger.error(
        `Calendar: synchronize throw error. Data: ${JSON.stringify(error)}`
      )
      return error
    }
  }

  useEffect(() => {
    if (calendars.length && provider) {
      void openSelectCalendarsModal()
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendars, provider])

  useEffect(() => {
    if (provider) {
      void authorizeAndLoadCalendars()
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
