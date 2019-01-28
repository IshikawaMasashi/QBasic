(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./src/utils/download.ts":
/*!*******************************!*\
  !*** ./src/utils/download.ts ***!
  \*******************************/
/*! exports provided: downloadProject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "downloadProject", function() { return downloadProject; });
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models */ "./src/models/index.ts");
/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jszip */ "./node_modules/jszip/lib/index.js");
/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jszip__WEBPACK_IMPORTED_MODULE_1__);
/* Copyright 2018 Mozilla Foundation
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


function downloadProject(project, uri) {
    return __awaiter(this, void 0, void 0, function* () {
        const zipFile = new jszip__WEBPACK_IMPORTED_MODULE_1___default.a();
        let zipName = "wasm-project.zip";
        if (uri !== undefined) {
            zipName = `wasm-project-${uri}.zip`;
        }
        const queue = [];
        project.mapEachFile((f) => queue.push({ filePrefix: "", file: f }));
        while (queue.length > 0) {
            const { filePrefix, file } = queue.shift();
            const fileName = filePrefix + file.name;
            if (file instanceof _models__WEBPACK_IMPORTED_MODULE_0__["Directory"]) {
                file.mapEachFile(f => queue.push({ filePrefix: fileName + "/", file: f }));
                zipFile.folder(fileName);
                continue;
            }
            zipFile.file(fileName, file.data);
        }
        yield zipFile.generateAsync({ type: "blob", mimeType: "application/zip" }).then((blob) => {
            // Creating <a> to programmatically click for downloading zip via blob's URL
            const link = document.createElement("a");
            link.download = zipName;
            link.href = URL.createObjectURL(blob);
            // A fix for making link clickable in Firefox
            // Explicity adding link to DOM for Firefox
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });
}


/***/ }),

/***/ 0:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=7.bundle.js.map