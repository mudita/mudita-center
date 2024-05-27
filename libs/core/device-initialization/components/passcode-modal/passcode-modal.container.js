"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var passcode_modal_component_1 = __importDefault(require("Core/device-initialization/components/passcode-modal/passcode-modal.component"));
var selectors_1 = require("Core/device/selectors");
var is_passcode_modal_can_be_closed_selector_1 = require("Core/device-initialization/selectors/is-passcode-modal-can-be-closed.selector");
var actions_1 = require("Core/device/actions");
var use_watch_lock_time_effect_1 = require("Core/device-initialization/components/passcode-modal/use-watch-lock-time-effect");
var use_watch_unlock_status_effect_1 = require("Core/device-initialization/components/passcode-modal/use-watch-unlock-status-effect");
var modal_service_1 = __importDefault(require("Core/__deprecated__/renderer/components/core/modal/modal.service"));
var use_handle_active_device_aborted_hook_1 = require("Core/overview/components/overview-screens/pure-overview/use-handle-active-device-aborted.hook");
var PasscodeModalContainer = function () {
    (0, use_watch_lock_time_effect_1.useWatchLockTimeEffect)();
    (0, use_watch_unlock_status_effect_1.useWatchUnlockStatus)();
    var dispatch = (0, react_redux_1.useDispatch)();
    var leftTime = (0, react_redux_1.useSelector)(selectors_1.getLeftTimeSelector);
    var canBeClosed = (0, react_redux_1.useSelector)(is_passcode_modal_can_be_closed_selector_1.isPasscodeModalCanBeClosedSelector);
    var handleActiveDeviceAborted = (0, use_handle_active_device_aborted_hook_1.useHandleActiveDeviceAborted)();
    var handleUnlockDevice = function (code) {
        return dispatch((0, actions_1.unlockDevice)({ code: code }));
    };
    (0, react_1.useEffect)(function () {
        // handle closing contact import failure modal
        void modal_service_1.default.closeModal(true);
    }, []);
    return ((0, jsx_runtime_1.jsx)(passcode_modal_component_1.default, { openModal: true, close: handleActiveDeviceAborted, leftTime: leftTime, unlockDevice: handleUnlockDevice, canBeClosed: canBeClosed }));
};
exports.default = PasscodeModalContainer;
//# sourceMappingURL=passcode-modal.container.js.map