"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessageMap = exports.ErrorState = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
var react_1 = require("react");
var electron_better_ipc_1 = require("electron-better-ipc");
var passcode_modal_ui_component_1 = __importDefault(require("Core/device-initialization/components/passcode-modal/passcode-modal-ui.component"));
var help_actions_enum_1 = require("Core/__deprecated__/common/enums/help-actions.enum");
var modal_layers_enum_1 = require("Core/modals-manager/constants/modal-layers.enum");
var ErrorState;
(function (ErrorState) {
    ErrorState["NoError"] = "no-error";
    ErrorState["TypingError"] = "typing-error";
    ErrorState["BadPasscode"] = "bad-passcode";
    ErrorState["InternalServerError"] = "internal-server-error";
})(ErrorState || (exports.ErrorState = ErrorState = {}));
exports.ErrorMessageMap = (_a = {},
    _a[ErrorState.NoError] = "",
    _a[ErrorState.TypingError] = "component.passcodeModalErrorTyping",
    _a[ErrorState.BadPasscode] = "component.passcodeModalError",
    _a[ErrorState.InternalServerError] = "component.passcodeModalTryAgain",
    _a);
var timeoutId3;
var initValue = ["", "", "", ""];
var PasscodeModal = function (_a) {
    var openModal = _a.openModal, canBeClosed = _a.canBeClosed, close = _a.close, leftTime = _a.leftTime, unlockDevice = _a.unlockDevice, rest = __rest(_a, ["openModal", "canBeClosed", "close", "leftTime", "unlockDevice"]);
    var _b = __read((0, react_1.useState)(ErrorState.NoError), 2), errorState = _b[0], setErrorState = _b[1];
    var _c = __read((0, react_1.useState)(initValue), 2), values = _c[0], setValues = _c[1];
    var openHelpWindow = function () { return electron_better_ipc_1.ipcRenderer.callMain(help_actions_enum_1.HelpActions.OpenWindow); };
    var updateValues = function (values) {
        setValues(values);
    };
    var onNotAllowedKeyDown = function () {
        clearTimeout(timeoutId3);
        setErrorState(ErrorState.TypingError);
        timeoutId3 = setTimeout(function () {
            setErrorState(ErrorState.NoError);
        }, 1500);
    };
    (0, react_1.useEffect)(function () {
        var unlockDeviceRequest = function (code) { return __awaiter(void 0, void 0, void 0, function () {
            var unlockDeviceStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, unlockDevice(code)];
                    case 1:
                        unlockDeviceStatus = _a.sent();
                        if (unlockDeviceStatus.error) {
                            setErrorState(ErrorState.InternalServerError);
                            return [2 /*return*/];
                        }
                        if (!unlockDeviceStatus.payload) {
                            setErrorState(ErrorState.BadPasscode);
                            return [2 /*return*/];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        if (values[values.length - 1] !== "") {
            var code = values.map(function (value) { return parseInt(value); });
            if (leftTime === undefined) {
                void unlockDeviceRequest(code);
            }
        }
        else {
            setErrorState(ErrorState.NoError);
        }
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values]);
    (0, react_1.useEffect)(function () {
        var timeoutId;
        if (errorState === ErrorState.BadPasscode ||
            errorState === ErrorState.InternalServerError) {
            timeoutId = setTimeout(function () {
                setErrorState(ErrorState.NoError);
                setValues(initValue);
            }, 1500);
        }
        return function () {
            clearTimeout(timeoutId);
        };
    }, [errorState]);
    return ((0, jsx_runtime_1.jsx)(passcode_modal_ui_component_1.default, __assign({ openModal: openModal, close: close, errorMessage: exports.ErrorMessageMap[errorState], values: values, updateValues: updateValues, openHelpWindow: openHelpWindow, onNotAllowedKeyDown: onNotAllowedKeyDown, leftTime: leftTime, canBeClosed: canBeClosed, layer: modal_layers_enum_1.ModalLayers.Passcode }, rest)));
};
exports.default = PasscodeModal;
//# sourceMappingURL=passcode-modal.component.js.map