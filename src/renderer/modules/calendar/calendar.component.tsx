import React, { useEffect, useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { CalendarProps } from "Renderer/modules/calendar/calendar.interface"
import { eventsData } from "App/seeds/calendar"
import modalService from "Renderer/components/core/modal/modal.service"
import { Calendar } from "Renderer/models/calendar/calendar.interfaces"
import SelectVendorModal from "Renderer/components/rest/calendar/select-vendor-modal.component"
import SelectCalendarsModal from "Renderer/components/rest/calendar/select-calendars-modal.component"
import SynchronizingEventsModal from "Renderer/components/rest/calendar/synchronizing-events-modal.component"
import delayResponse from "@appnroll/delay-response"
import logger from "App/main/utils/logger"
import EventsSynchronizationFinishedModal from "Renderer/components/rest/calendar/synchronization-finished-modal.component"
import EventsSynchronizationFailedModal from "Renderer/components/rest/calendar/synchronization-failed.component"
import { Provider } from "Renderer/models/external-providers/external-providers.interface"
import AuthorizationFailedModal from "Renderer/components/rest/calendar/authorization-failed.component"
import CalendarUI from "Renderer/modules/calendar/calendar-ui.component"

const CalendarComponent: FunctionComponent<CalendarProps> = ({
  calendars,
  events = eventsData,
  loadCalendars,
  loadEvents,
}) => {
  const [calendarEvents, setEvents] = useState(events)
  const [provider, setProvider] = useState<Provider | undefined>()
  const _devClearEvents = () => setEvents([])

  const setGoogleProvider = () => setProvider(Provider.Google)

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
    const closeModal = () => modalService.closeModal()
    await closeModal()
    modalService.openModal(
      <EventsSynchronizationFinishedModal
        importedEventsCount={importedEventsCount}
        onActionButtonClick={closeModal}
      />,
      true
    )
  }

  const openSelectVendorModal = () => {
    try {
      modalService.openModal(
        <SelectVendorModal onGoogleButtonClick={setGoogleProvider} />
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
      const events = await delayResponse(loadEvents(calendar))
      openSynchronizationFinishedModal(events.length)
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

  useEffect(() => setEvents(events), [events])

  return (
    <CalendarUI
      events={calendarEvents}
      openSelectVendorModal={openSelectVendorModal}
      _devClearEvents={_devClearEvents}
    />
  )
}

export default CalendarComponent
