/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import EventEmitter from "events"

enum Events {
  Frozen = "frozen",
  Unfrozen = "unfrozen",
}

type PublicEvent = "freeze" | "unfreeze"
type EventListener = (reason: "manual" | "timeout") => void

const DEFAULT_FREEZE_DURATION = 60_000 // 1 minute

export class DeviceFreezeHandler {
  isFrozen = false

  private freezeDuration?: number
  private timeout?: NodeJS.Timeout
  private readonly eventEmitter = new EventEmitter()

  private mapEvent(event: PublicEvent) {
    return event === "freeze" ? Events.Frozen : Events.Unfrozen
  }

  get isFreezable() {
    return this.freezeDuration !== undefined
  }

  prepareToFreeze(duration = DEFAULT_FREEZE_DURATION) {
    if (this.isFrozen) {
      return
    }
    if (duration <= 0 || !Number.isFinite(duration)) {
      throw new Error("Freeze duration must be a positive finite number.")
    }
    this.freezeDuration = duration
  }

  freeze() {
    if (this.isFrozen) {
      return
    }
    if (this.freezeDuration === undefined) {
      throw new Error(
        "Freeze duration is not set. Call prepareToFreeze(duration: number) first."
      )
    }

    this.isFrozen = true

    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.cleanup()
      this.eventEmitter.emit(Events.Unfrozen, "timeout")
    }, this.freezeDuration)

    this.eventEmitter.emit(Events.Frozen)
  }

  unfreeze() {
    this.freezeDuration = undefined

    if (!this.isFrozen) {
      return
    }

    this.cleanup()
    this.eventEmitter.emit(Events.Unfrozen, "manual")
  }

  private cleanup() {
    clearTimeout(this.timeout)

    this.isFrozen = false
    this.timeout = undefined
    this.freezeDuration = undefined
  }

  on(event: Extract<PublicEvent, "freeze">, listener: VoidFunction): void
  on(event: Extract<PublicEvent, "unfreeze">, listener: EventListener): void
  on(event: PublicEvent, listener: EventListener) {
    this.eventEmitter.on(this.mapEvent(event), listener)
  }

  once(event: Extract<PublicEvent, "freeze">, listener: VoidFunction): void
  once(event: Extract<PublicEvent, "unfreeze">, listener: EventListener): void
  once(event: PublicEvent, listener: EventListener) {
    this.eventEmitter.once(this.mapEvent(event), listener)
  }

  off(event?: PublicEvent, listener?: VoidFunction) {
    if (!event) {
      this.eventEmitter.removeAllListeners()
      return
    }
    if (!listener) {
      this.eventEmitter.removeAllListeners(this.mapEvent(event))
      return
    }
    this.eventEmitter.off(this.mapEvent(event), listener)
  }
}
