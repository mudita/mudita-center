/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect, useRef } from "react"

/**
 * `useDebouncedEventsHandler` facilitates batch processing of events with a debounce delay.
 * Ideal for reducing frequent calls to expensive operations in response to rapid event triggers like clicks or state changes.
 *
 * @param {Function} executeDebouncedEvents Callback executed with an accumulated list of events after the delay.
 * @param {number} delay Debounce delay in milliseconds before processing events.
 *
 * @returns {Function} `enqueueEvent` for adding events to the queue for debounced processing.
 *
 * Example:
 * const enqueueEvent = useDebouncedEventsHandler(processEvents, 500);
 * // Use enqueueEvent to queue events.
 */
export function useDebouncedEventsHandler<T = unknown>(
  executeDebouncedEvents: (events: T[]) => void,
  delay = 500
): (event: T) => void {
  const eventsQueue = useRef<T[]>([])
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>()

  const processEventsDebounced = useCallback(() => {
    if (eventsQueue.current.length > 0) {
      executeDebouncedEvents(eventsQueue.current)
      eventsQueue.current = []
    }
  }, [executeDebouncedEvents])

  const enqueueEvent = useCallback(
    (event: T) => {
      eventsQueue.current.push(event)

      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }

      debounceTimer.current = setTimeout(processEventsDebounced, delay)
    },
    [processEventsDebounced, delay]
  )

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [])

  return enqueueEvent
}
