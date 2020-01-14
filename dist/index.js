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
        while (_) try {
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
import * as React from "react";
import * as ReactDOM from "react-dom";
import { App, EmbeddingType } from "./components/App";
// import { Service } from "./service";
import { layout } from "./util";
import BrowserNotSupported from "./components/BrowserNotSupported";
import registerLanguages from "./utils/registerLanguages";
import registerTheme from "./utils/registerTheme";
import { Logger } from "./utils/Logger";
import { ErrorBoundary } from "./components/ErrorBoundary";
export function forEachUrlParameter(callback) {
    var url = window.location.search.substring(1);
    url = url.replace(/\/$/, ""); // Replace / at the end that gets inserted by browsers.
    url.split("&").forEach(function (s) {
        var t = s.split("=");
        if (t.length === 2) {
            callback(t[0], decodeURIComponent(t[1]));
        }
        else {
            callback(t[0], true);
        }
    });
}
export function getUrlParameters() {
    var params = {};
    forEachUrlParameter(function (key, value) {
        params[key] = value;
    });
    return params;
}
export var appWindowContext = {
    promptWhenClosing: false
};
export function unloadPageHandler(e) {
    if (!appWindowContext.promptWhenClosing) {
        window.removeEventListener("beforeunload", unloadPageHandler, false);
        return;
    }
    e.returnValue = "Project data is not saved.";
}
export function getEmbeddingParams(parameters) {
    var embedding = parameters["embedding"];
    var type;
    switch (embedding) {
        case "default":
            type = EmbeddingType.Default;
            break;
        case "arc_website":
            type = EmbeddingType.Arc;
            break;
        default:
            var embed = parameters["embed"] === true
                ? true
                : !!parseInt(parameters["embed"], 10);
            type = embed ? EmbeddingType.Default : EmbeddingType.None;
            break;
    }
    var templatesName = parameters["embedding"] === "arc_website" ? "arc" : "default";
    return {
        type: type,
        templatesName: templatesName
    };
}
export function init(environment) {
    if (environment === void 0) { environment = "production"; }
    return __awaiter(this, void 0, void 0, function () {
        var parameters, update, fiddle, embeddingParams, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Logger.init();
                    window.addEventListener("resize", layout, false);
                    window.addEventListener("beforeunload", unloadPageHandler, false);
                    parameters = getUrlParameters();
                    update = parameters["update"] === true ? true : !!parseInt(parameters["update"], 10);
                    fiddle = parameters["fiddle"] || parameters["f"];
                    embeddingParams = getEmbeddingParams(parameters);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, registerTheme()];
                case 2:
                    _a.sent();
                    if (typeof WebAssembly !== "object") {
                        ReactDOM.render(React.createElement(BrowserNotSupported, null), document.getElementById("app"));
                    }
                    else {
                        ReactDOM.render(React.createElement(ErrorBoundary, null,
                            React.createElement(App, { update: update, fiddle: fiddle, embeddingParams: embeddingParams, windowContext: appWindowContext })), document.getElementById("app"));
                    }
                    if (!(environment !== "test")) return [3 /*break*/, 4];
                    return [4 /*yield*/, import(/* webpackChunkName: "monaco-languages" */ "monaco-editor")];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    registerLanguages();
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _a.sent();
                    Logger.captureException(e_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
init();
//# sourceMappingURL=index.js.map