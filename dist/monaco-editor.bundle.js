(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["monaco-editor"],{

/***/ "./node_modules/monaco-editor/esm/vs/base/browser/contextmenu.js":
/*!***********************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/base/browser/contextmenu.js ***!
  \***********************************************************************/
/*! exports provided: ContextSubMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextSubMenu", function() { return ContextSubMenu; });
/* harmony import */ var _ui_menu_menu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui/menu/menu.js */ "./node_modules/monaco-editor/esm/vs/base/browser/ui/menu/menu.js");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ContextSubMenu = /** @class */ (function (_super) {
    __extends(ContextSubMenu, _super);
    function ContextSubMenu(label, entries) {
        var _this = _super.call(this, label, entries, 'contextsubmenu') || this;
        _this.entries = entries;
        return _this;
    }
    return ContextSubMenu;
}(_ui_menu_menu_js__WEBPACK_IMPORTED_MODULE_0__["SubmenuAction"]));



/***/ })

}]);
//# sourceMappingURL=monaco-editor.bundle.js.map