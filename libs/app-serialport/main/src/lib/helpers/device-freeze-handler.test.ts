/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceFreezeHandler } from "./device-freeze-handler"

describe("DeviceFreezeHandler", () => {
  let handler: DeviceFreezeHandler

  beforeEach(() => {
    handler = new DeviceFreezeHandler()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe("shouldFreeze", () => {
    it("should return false when prepareToFreeze was not called", () => {
      expect(handler.isFreezable).toBe(false)
    })

    it("should return true after prepareToFreeze is called", () => {
      handler.prepareToFreeze(5000)
      expect(handler.isFreezable).toBe(true)
    })

    it("should return true when device is already frozen", () => {
      handler.prepareToFreeze(5000)
      handler.freeze()
      expect(handler.isFreezable).toBe(true)
    })

    it("should return false after unfreeze", () => {
      handler.prepareToFreeze(5000)
      handler.freeze()
      handler.unfreeze()
      expect(handler.isFreezable).toBe(false)
    })

    it("should return false after timeout unfreeze", () => {
      handler.prepareToFreeze(5000)
      handler.freeze()
      jest.advanceTimersByTime(5000)
      expect(handler.isFreezable).toBe(false)
    })
  })

  describe("prepareToFreeze", () => {
    it("should set freeze duration with default value", () => {
      handler.prepareToFreeze()
      expect(handler.isFrozen).toBe(false)
      expect(handler["freezeDuration"]).toBe(60000)
    })

    it("should set freeze duration with custom value", () => {
      handler.prepareToFreeze(5000)
      expect(handler.isFrozen).toBe(false)
      expect(handler["freezeDuration"]).toBe(5000)
    })

    it("should not prepare again when already frozen", () => {
      handler.prepareToFreeze(5000)
      expect(handler["freezeDuration"]).toBe(5000)
      handler.freeze()
      handler.prepareToFreeze(10000)
      expect(handler["freezeDuration"]).toBe(5000)
    })

    it("should throw error when duration is zero", () => {
      expect(() => handler.prepareToFreeze(0)).toThrow(
        "Freeze duration must be a positive finite number."
      )
    })

    it("should throw error when duration is negative", () => {
      expect(() => handler.prepareToFreeze(-1000)).toThrow(
        "Freeze duration must be a positive finite number."
      )
    })

    it("should throw error when duration is Infinity", () => {
      expect(() => handler.prepareToFreeze(Infinity)).toThrow(
        "Freeze duration must be a positive finite number."
      )
    })
  })

  describe("freeze", () => {
    it("should freeze the device", () => {
      handler.prepareToFreeze(5000)
      handler.freeze()
      expect(handler.isFrozen).toBe(true)
      expect(handler["freezeDuration"]).toBe(5000)
    })

    it("should emit frozen event when freezing", () => {
      const listener = jest.fn()
      handler.on("freeze", listener)
      handler.prepareToFreeze(5000)
      handler.freeze()
      expect(listener).toHaveBeenCalledTimes(1)
    })

    it("should not freeze again when already frozen", () => {
      handler.prepareToFreeze(5000)
      handler.freeze()
      const timeoutBefore = handler["timeout"]
      handler.freeze()
      expect(handler["timeout"]).toBe(timeoutBefore)
    })

    it("should throw error when prepareToFreeze was not called", () => {
      expect(() => handler.freeze()).toThrow(
        "Freeze duration is not set. Call prepareToFreeze(duration: number) first."
      )
    })

    it("should automatically unfreeze after the duration", () => {
      handler.prepareToFreeze(5000)
      handler.freeze()
      expect(handler.isFrozen).toBe(true)
      jest.advanceTimersByTime(5000)
      expect(handler.isFrozen).toBe(false)
    })

    it("should emit unfrozen event after timeout", () => {
      const listener = jest.fn()
      handler.on("unfreeze", listener)
      handler.prepareToFreeze(5000)
      handler.freeze()
      jest.advanceTimersByTime(5000)
      expect(listener).toHaveBeenCalledTimes(1)
    })

    it("should emit unfrozen event with 'timeout' reason after duration", () => {
      const listener = jest.fn()
      handler.on("unfreeze", listener)
      handler.prepareToFreeze(5000)
      handler.freeze()
      jest.advanceTimersByTime(5000)
      expect(listener).toHaveBeenCalledWith("timeout")
    })
  })

  describe("unfreeze", () => {
    it("should unfreeze the device", () => {
      handler.prepareToFreeze(5000)
      handler.freeze()
      expect(handler.isFrozen).toBe(true)
      handler.unfreeze()
      expect(handler.isFrozen).toBe(false)
    })

    it("should emit unfrozen event when unfreezing", () => {
      const listener = jest.fn()
      handler.on("unfreeze", listener)
      handler.prepareToFreeze(5000)
      handler.freeze()
      handler.unfreeze()
      expect(listener).toHaveBeenCalledTimes(1)
    })

    it("should emit unfrozen event with 'manual' reason when unfreezing manually", () => {
      const listener = jest.fn()
      handler.on("unfreeze", listener)
      handler.prepareToFreeze(5000)
      handler.freeze()
      handler.unfreeze()
      expect(listener).toHaveBeenCalledWith("manual")
    })

    it("should not unfreeze again when not frozen", () => {
      const timeoutBefore = handler["timeout"]
      handler.unfreeze()
      expect(handler["timeout"]).toBe(timeoutBefore)
    })

    it("should clear freezeDuration when not frozen and unfreeze is called", () => {
      handler.prepareToFreeze(5000)

      handler.unfreeze()
      expect(handler["freezeDuration"]).toBe(undefined)
    })

    it("should clear freezeDuration when frozen and unfreeze is called", () => {
      handler.prepareToFreeze(5000)
      handler.freeze()

      handler.unfreeze()
      expect(handler["freezeDuration"]).toBe(undefined)
    })

    it("should clear the timeout when manually unfreezing", () => {
      handler.prepareToFreeze(5000)
      handler.freeze()
      handler.unfreeze()

      const listener = jest.fn()

      handler.on("unfreeze", listener)

      jest.advanceTimersByTime(5000)
      expect(listener).not.toHaveBeenCalled()
    })

    it("should reset freezeDuration after unfreeze", () => {
      handler.prepareToFreeze(5000)
      handler.freeze()
      handler.unfreeze()
      expect(handler["freezeDuration"]).toBe(undefined)
    })
  })

  describe("event listeners", () => {
    it("should support on listener", () => {
      const listener = jest.fn()
      handler.on("freeze", listener)
      handler.prepareToFreeze(5000)
      handler.freeze()
      handler.unfreeze()
      handler.prepareToFreeze(5000)
      handler.freeze()
      expect(listener).toHaveBeenCalledTimes(2)
    })

    it("should support once listener", () => {
      const listener = jest.fn()
      handler.once("freeze", listener)
      handler.prepareToFreeze(5000)
      handler.freeze()
      handler.unfreeze()
      handler.prepareToFreeze(5000)
      handler.freeze()
      expect(listener).toHaveBeenCalledTimes(1)
    })

    it("should support off listener", () => {
      const listener = jest.fn()
      handler.on("freeze", listener)
      handler.off("freeze", listener)
      handler.prepareToFreeze(5000)
      handler.freeze()
      expect(listener).not.toHaveBeenCalled()
    })

    it("should support unfreeze event with on listener", () => {
      const listener = jest.fn()
      handler.on("unfreeze", listener)
      handler.prepareToFreeze(5000)
      handler.freeze()
      handler.unfreeze()
      handler.prepareToFreeze(5000)
      handler.freeze()
      handler.unfreeze()
      expect(listener).toHaveBeenCalledTimes(2)
    })

    it("should support unfreeze event with once listener", () => {
      const listener = jest.fn()
      handler.once("unfreeze", listener)
      handler.prepareToFreeze(5000)
      handler.freeze()
      handler.unfreeze()
      handler.prepareToFreeze(5000)
      handler.freeze()
      handler.unfreeze()
      expect(listener).toHaveBeenCalledTimes(1)
    })

    it("should support off for unfreeze listener", () => {
      const listener = jest.fn()
      handler.on("unfreeze", listener)
      handler.off("unfreeze", listener)
      handler.prepareToFreeze(5000)
      handler.freeze()
      handler.unfreeze()
      expect(listener).not.toHaveBeenCalled()
    })

    it("should remove all listeners for specific event when called with only event argument", () => {
      const listener1 = jest.fn()
      const listener2 = jest.fn()
      const unfreezeListener = jest.fn()
      handler.on("freeze", listener1)
      handler.on("freeze", listener2)
      handler.on("unfreeze", unfreezeListener)
      handler.off("freeze")
      handler.prepareToFreeze(5000)
      handler.freeze()
      handler.unfreeze()
      expect(listener1).not.toHaveBeenCalled()
      expect(listener2).not.toHaveBeenCalled()
      expect(unfreezeListener).toHaveBeenCalledTimes(1)
    })

    it("should remove all listeners when called without arguments", () => {
      const freezeListener = jest.fn()
      const unfreezeListener = jest.fn()
      handler.on("freeze", freezeListener)
      handler.on("unfreeze", unfreezeListener)
      handler.off()
      handler.prepareToFreeze(5000)
      handler.freeze()
      handler.unfreeze()
      expect(freezeListener).not.toHaveBeenCalled()
      expect(unfreezeListener).not.toHaveBeenCalled()
    })
  })
})
