"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasscodeModalContent = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var modal_dialog_1 = require("Core/ui/components/modal-dialog");
var styled_components_1 = __importDefault(require("styled-components"));
var icon_component_1 = __importStar(require("Core/__deprecated__/renderer/components/core/icon/icon.component"));
var button_component_1 = __importDefault(require("Core/__deprecated__/renderer/components/core/button/button.component"));
var button_config_1 = require("Core/__deprecated__/renderer/components/core/button/button.config");
var passcode_inputs_component_1 = require("./passcode-inputs.component");
var passcode_locked_component_1 = __importDefault(require("Core/device-initialization/components/passcode-modal/passcode-locked.component"));
var passcode_modal_test_ids_enum_1 = require("Core/device-initialization/components/passcode-modal/passcode-modal-test-ids.enum");
var icon_type_1 = require("Core/__deprecated__/renderer/components/core/icon/icon-type");
var ModalContent = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"], ["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"])));
var LogoWrapper = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  margin-left: 5rem;\n  span {\n    width: 8.1rem;\n    height: 5.6rem;\n  }\n"], ["\n  display: flex;\n  justify-content: center;\n  margin-left: 5rem;\n  span {\n    width: 8.1rem;\n    height: 5.6rem;\n  }\n"])));
var ButtonContainer = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n\n  button {\n    margin-left: 0.4rem;\n    padding: 0.4rem;\n    width: auto;\n    height: auto;\n  }\n"], ["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n\n  button {\n    margin-left: 0.4rem;\n    padding: 0.4rem;\n    width: auto;\n    height: auto;\n  }\n"])));
exports.PasscodeModalContent = (0, styled_components_1.default)(ModalContent)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  justify-content: space-between;\n  height: clamp(28rem, 60vh, 46.4rem);\n"], ["\n  justify-content: space-between;\n  height: clamp(28rem, 60vh, 46.4rem);\n"])));
var PasscodeModalUI = function (_a) {
    var openModal = _a.openModal, close = _a.close, values = _a.values, updateValues = _a.updateValues, openHelpWindow = _a.openHelpWindow, onNotAllowedKeyDown = _a.onNotAllowedKeyDown, errorMessage = _a.errorMessage, leftTime = _a.leftTime, canBeClosed = _a.canBeClosed, props = __rest(_a, ["openModal", "close", "values", "updateValues", "openHelpWindow", "onNotAllowedKeyDown", "errorMessage", "leftTime", "canBeClosed"]);
    var muditaLogo = ((0, jsx_runtime_1.jsx)(LogoWrapper, { children: (0, jsx_runtime_1.jsx)(icon_component_1.default, { type: icon_type_1.IconType.MuditaLogoVertical, size: icon_component_1.IconSize.Bigger }, icon_type_1.IconType.MuditaLogoVertical) }));
    return ((0, jsx_runtime_1.jsx)(modal_dialog_1.ModalDialog, __assign({ testId: passcode_modal_test_ids_enum_1.PasscodeModalTestIds.Container }, props, { open: openModal, closeable: canBeClosed, closeButton: false, closeModal: canBeClosed ? close : undefined, title: muditaLogo, children: (0, jsx_runtime_1.jsxs)(exports.PasscodeModalContent, { children: [(0, jsx_runtime_1.jsx)("span", {}), leftTime ? ((0, jsx_runtime_1.jsx)(passcode_locked_component_1.default, { leftTime: leftTime })) : ((0, jsx_runtime_1.jsx)(passcode_inputs_component_1.PasscodeInputs, { values: values, errorMessage: errorMessage, onNotAllowedKeyDown: onNotAllowedKeyDown, updateValues: updateValues })), (0, jsx_runtime_1.jsx)(ButtonContainer, { children: (0, jsx_runtime_1.jsx)(button_component_1.default, { displayStyle: button_config_1.DisplayStyle.ActionLink, labelMessage: {
                            id: "component.passcodeModalHelp",
                        }, onClick: openHelpWindow }) })] }) })));
};
exports.default = PasscodeModalUI;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=passcode-modal-ui.component.js.map