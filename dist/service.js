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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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
import * as monaco from "monaco-editor";
import { Directory, Problem, isBinaryFileType, fileTypeFromFileName } from "./models";
import { decodeRestrictedBase64ToBytes, base64EncodeBytes } from "./util";
import { assert } from "./util";
import { gaEvent } from "./utils/ga";
import { WorkerCommand } from "./message";
import { processJSFile, RewriteSourcesContext } from "./utils/rewriteSources";
import { getCurrentRunnerInfo } from "./utils/taskRunner";
import { createCompilerService, Language } from "./compilerServices";
export { Language } from "./compilerServices";
function getProjectFilePath(file) {
    var project = file.getProject();
    return file.getPath(project);
}
var ServiceWorker = /** @class */ (function () {
    function ServiceWorker() {
        this.workerCallbacks = [];
        this.nextId = 0;
        //this.worker = new Worker("dist/worker.bundle.js");
        //this.worker.addEventListener("message", (e: { data: IWorkerResponse }) => {
        //    if (!e.data.id) {
        //        return;
        //    }
        //    const cb = this.workerCallbacks[e.data.id];
        //    if (e.data.success) {
        //        cb.fn(e);
        //    } else {
        //        cb.ex(e);
        //    }
        //    this.workerCallbacks[e.data.id] = null;
        //});
    }
    ServiceWorker.prototype.getNextId = function () {
        return String(this.nextId++);
    };
    ServiceWorker.prototype.setWorkerCallback = function (id, fn, ex) {
        assert(!this.workerCallbacks[id]);
        this.workerCallbacks[id] = { fn: fn, ex: ex };
    };
    ServiceWorker.prototype.postMessage = function (command, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var id = _this.getNextId();
                        _this.setWorkerCallback(id, function (e) {
                            resolve(e.data.payload);
                        }, function (e) {
                            reject(e.data.payload);
                        });
                        _this.worker.postMessage({
                            id: id,
                            command: command,
                            payload: payload
                        }, undefined);
                    })];
            });
        });
    };
    ServiceWorker.prototype.optimizeWasmWithBinaryen = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.postMessage(WorkerCommand.OptimizeWasmWithBinaryen, data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ServiceWorker.prototype.validateWasmWithBinaryen = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.postMessage(WorkerCommand.ValidateWasmWithBinaryen, data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ServiceWorker.prototype.createWasmCallGraphWithBinaryen = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.postMessage(WorkerCommand.CreateWasmCallGraphWithBinaryen, data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ServiceWorker.prototype.convertWasmToAsmWithBinaryen = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.postMessage(WorkerCommand.ConvertWasmToAsmWithBinaryen, data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ServiceWorker.prototype.disassembleWasmWithBinaryen = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.postMessage(WorkerCommand.DisassembleWasmWithBinaryen, data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ServiceWorker.prototype.assembleWatWithBinaryen = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.postMessage(WorkerCommand.AssembleWatWithBinaryen, data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ServiceWorker.prototype.disassembleWasmWithWabt = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.postMessage(WorkerCommand.DisassembleWasmWithWabt, data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ServiceWorker.prototype.assembleWatWithWabt = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.postMessage(WorkerCommand.AssembleWatWithWabt, data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ServiceWorker.prototype.twiggyWasm = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.postMessage(WorkerCommand.TwiggyWasm, data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ServiceWorker;
}());
export { ServiceWorker };
var Service = /** @class */ (function () {
    function Service() {
    }
    Service.getMarkers = function (response) {
        // Parse and annotate errors if compilation fails.
        var annotations = [];
        if (response.indexOf("(module") !== 0) {
            var re1 = /^.*?:(\d+?):(\d+?):\s(.*)$/gm;
            var m = void 0;
            // Single position.
            while ((m = re1.exec(response)) !== null) {
                if (m.index === re1.lastIndex) {
                    re1.lastIndex++;
                }
                var startLineNumber = parseInt(m[1], 10);
                var startColumn = parseInt(m[2], 10);
                var message = m[3];
                var severity = monaco.MarkerSeverity.Info;
                if (message.indexOf("error") >= 0) {
                    severity = monaco.MarkerSeverity.Error;
                }
                else if (message.indexOf("warning") >= 0) {
                    severity = monaco.MarkerSeverity.Warning;
                }
                annotations.push({
                    severity: severity,
                    message: message,
                    startLineNumber: startLineNumber,
                    startColumn: startColumn,
                    endLineNumber: startLineNumber,
                    endColumn: startColumn
                });
            }
            // Range. This is generated via the -diagnostics-print-source-range-info
            // clang flag.
            var re2 = /^.*?:\d+?:\d+?:\{(\d+?):(\d+?)-(\d+?):(\d+?)\}:\s(.*)$/gm;
            while ((m = re2.exec(response)) !== null) {
                if (m.index === re2.lastIndex) {
                    re2.lastIndex++;
                }
                var message = m[5];
                var severity = monaco.MarkerSeverity.Info;
                if (message.indexOf("error") >= 0) {
                    severity = monaco.MarkerSeverity.Error;
                }
                else if (message.indexOf("warning") >= 0) {
                    severity = monaco.MarkerSeverity.Warning;
                }
                annotations.push({
                    severity: severity,
                    message: message,
                    startLineNumber: parseInt(m[1], 10),
                    startColumn: parseInt(m[2], 10),
                    endLineNumber: parseInt(m[3], 10),
                    endColumn: parseInt(m[4], 10)
                });
            }
        }
        return annotations;
    };
    Service.compileFiles = function (files, from, to, options) {
        if (options === void 0) { options = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var service, fileNameMap, input, result, files_1, files_1_1, file, _loop_1, _a, _b, _c, name_1, item, outputFiles, _d, _e, _f, name_2, item, content;
            var e_1, _g, e_2, _h, e_3, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        gaEvent("compile", "Service", from + "->" + to);
                        return [4 /*yield*/, createCompilerService(from, to)];
                    case 1:
                        service = _k.sent();
                        fileNameMap = files.reduce(function (acc, f) {
                            acc[getProjectFilePath(f)] = f;
                            return acc;
                        }, {});
                        input = {
                            files: files.reduce(function (acc, f) {
                                acc[getProjectFilePath(f)] = {
                                    content: f.getData()
                                };
                                return acc;
                            }, {}),
                            options: options
                        };
                        return [4 /*yield*/, service.compile(input)];
                    case 2:
                        result = _k.sent();
                        try {
                            for (files_1 = __values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                                file = files_1_1.value;
                                file.setProblems([]);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (files_1_1 && !files_1_1.done && (_g = files_1.return)) _g.call(files_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        _loop_1 = function (name_1, item) {
                            if (name_1) {
                            }
                            var fileRef = item.fileRef, console_1 = item.console;
                            if (!fileRef || !console_1) {
                                return "continue";
                            }
                            var file = fileNameMap[fileRef];
                            if (!file) {
                                return "continue";
                            }
                            var markers = Service.getMarkers(console_1);
                            if (markers.length > 0) {
                                // エラーが出るのでコメントアウト
                                // monaco.editor.setModelMarkers(file.getBuffer(), "compiler", markers);
                                file.setProblems(markers.map(function (marker) {
                                    return Problem.fromMarker(file, marker);
                                }));
                            }
                        };
                        try {
                            for (_a = __values(Object.entries(result.items)), _b = _a.next(); !_b.done; _b = _a.next()) {
                                _c = __read(_b.value, 2), name_1 = _c[0], item = _c[1];
                                _loop_1(name_1, item);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_h = _a.return)) _h.call(_a);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        if (!result.success) {
                            throw new Error(result.console);
                        }
                        outputFiles = {};
                        try {
                            for (_d = __values(Object.entries(result.items)), _e = _d.next(); !_e.done; _e = _d.next()) {
                                _f = __read(_e.value, 2), name_2 = _f[0], item = _f[1];
                                content = item.content;
                                if (content) {
                                    outputFiles[name_2] = content;
                                }
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_e && !_e.done && (_j = _d.return)) _j.call(_d);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        return [2 /*return*/, outputFiles];
                }
            });
        });
    };
    Service.compileFile = function (file, from, to, options) {
        if (options === void 0) { options = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Service.compileFileWithBindings(file, from, to, options)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.wasm];
                }
            });
        });
    };
    Service.compileFileWithBindings = function (file, from, to, options) {
        if (options === void 0) { options = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var result, expectedOutputFilename, output, expectedWasmBindgenJsFilename;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (to !== Language.Wasm) {
                            throw new Error("Only wasm target is supported, but \"" + to + "\" was found");
                        }
                        return [4 /*yield*/, Service.compileFiles([file], from, to, options)];
                    case 1:
                        result = _a.sent();
                        expectedOutputFilename = "a.wasm";
                        output = {
                            wasm: result[expectedOutputFilename]
                        };
                        expectedWasmBindgenJsFilename = "wasm_bindgen.js";
                        if (result[expectedWasmBindgenJsFilename]) {
                            output = {
                                // ...output,
                                wasmBindgenJs: result[expectedWasmBindgenJsFilename]
                            };
                        }
                        return [2 /*return*/, output];
                }
            });
        });
    };
    Service.disassembleWasm = function (buffer, status) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        gaEvent("disassemble", "Service", "wabt");
                        status && status.push("Disassembling with Wabt");
                        return [4 /*yield*/, this.worker.disassembleWasmWithWabt(buffer)];
                    case 1:
                        result = _a.sent();
                        status && status.pop();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Service.disassembleWasmWithWabt = function (file, status) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Service.assembleWat = function (wat, status) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        gaEvent("assemble", "Service", "wabt");
                        status && status.push("Assembling Wat with Wabt");
                        result = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.worker.assembleWatWithWabt(wat)];
                    case 2:
                        result = _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        e_4 = _a.sent();
                        throw e_4;
                    case 4:
                        status && status.pop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/, result];
                }
            });
        });
    };
    Service.assembleWatWithWabt = function (file, status) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Service.createGist = function (json) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        url = "https://api.github.com/gists";
                        return [4 /*yield*/, fetch(url, {
                                method: "POST",
                                body: JSON.stringify(json),
                                headers: new Headers({
                                    "Content-type": "application/json; charset=utf-8"
                                })
                            })];
                    case 1:
                        response = _c.sent();
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, response.text()];
                    case 2: return [2 /*return*/, _b.apply(_a, [_c.sent()]).html_url];
                }
            });
        });
    };
    Service.loadJSON = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://webassembly-studio-fiddles.herokuapp.com/fiddle/" + uri;
                        return [4 /*yield*/, fetch(url, {
                                headers: new Headers({
                                    "Content-type": "application/json; charset=utf-8"
                                })
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Service.saveJSON = function (json, uri) {
        return __awaiter(this, void 0, void 0, function () {
            var update, response, jsonURI;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        update = !!uri;
                        if (!update) return [3 /*break*/, 1];
                        throw new Error("NYI");
                    case 1: return [4 /*yield*/, fetch("https://webassembly-studio-fiddles.herokuapp.com/set-fiddle", {
                            method: "POST",
                            headers: new Headers({
                                "Content-type": "application/json; charset=utf-8"
                            }),
                            body: JSON.stringify(json)
                        })];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        jsonURI = (_a.sent()).id;
                        jsonURI = jsonURI.substring(jsonURI.lastIndexOf("/") + 1);
                        return [2 /*return*/, jsonURI];
                }
            });
        });
    };
    Service.parseFiddleURI = function () {
        var uri = window.location.search.substring(1);
        if (uri) {
            var i = uri.indexOf("/");
            if (i > 0) {
                uri = uri.substring(0, i);
            }
        }
        return uri;
    };
    Service.exportToGist = function (content, uri) {
        return __awaiter(this, void 0, void 0, function () {
            function serialize(file) {
                if (file instanceof Directory) {
                    file.mapEachFile(function (file) { return serialize(file); }, true);
                }
                else {
                    files[file.getName()] = { content: file.data };
                }
            }
            var files, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        gaEvent("export", "Service", "gist");
                        files = {};
                        serialize(content);
                        json = {
                            description: "source: https://webassembly.studio",
                            public: true,
                            files: files
                        };
                        if (uri !== undefined) {
                            json["description"] = json["description"] + ("/?f=" + uri);
                        }
                        return [4 /*yield*/, this.createGist(json)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Service.saveProject = function (project, openedFiles, uri) {
        return __awaiter(this, void 0, void 0, function () {
            var files;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        files = [];
                        project.forEachFile(function (f) {
                            var data;
                            var type;
                            if (isBinaryFileType(f.getFileType())) {
                                data = base64EncodeBytes(new Uint8Array(f.value));
                                type = "binary";
                            }
                            else {
                                data = f.value;
                                type = "text";
                            }
                            var file = {
                                name: f.getPath(project),
                                data: data,
                                type: type
                            };
                            files.push(file);
                        }, true, true);
                        return [4 /*yield*/, this.saveJSON({
                                files: files
                            }, uri)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Service.loadFilesIntoProject = function (files, project, base) {
        if (base === void 0) { base = null; }
        return __awaiter(this, void 0, void 0, function () {
            var files_2, files_2_1, f, type, file, data, request, e_5_1;
            var e_5, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 10, 11, 12]);
                        files_2 = __values(files), files_2_1 = files_2.next();
                        _b.label = 1;
                    case 1:
                        if (!!files_2_1.done) return [3 /*break*/, 9];
                        f = files_2_1.value;
                        type = fileTypeFromFileName(f.name);
                        file = project.newFile(f.name, type, false);
                        data = void 0;
                        if (!f.data) return [3 /*break*/, 2];
                        if (f.type === "binary") {
                            data = decodeRestrictedBase64ToBytes(f.data).buffer;
                        }
                        else {
                            data = f.data;
                        }
                        return [3 /*break*/, 7];
                    case 2: return [4 /*yield*/, fetch(new URL(f.name, base).toString())];
                    case 3:
                        request = _b.sent();
                        if (!(f.type === "binary")) return [3 /*break*/, 5];
                        return [4 /*yield*/, request.arrayBuffer()];
                    case 4:
                        data = _b.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, request.text()];
                    case 6:
                        data = _b.sent();
                        _b.label = 7;
                    case 7:
                        file.setData(data);
                        _b.label = 8;
                    case 8:
                        files_2_1 = files_2.next();
                        return [3 /*break*/, 1];
                    case 9: return [3 /*break*/, 12];
                    case 10:
                        e_5_1 = _b.sent();
                        e_5 = { error: e_5_1 };
                        return [3 /*break*/, 12];
                    case 11:
                        try {
                            if (files_2_1 && !files_2_1.done && (_a = files_2.return)) _a.call(files_2);
                        }
                        finally { if (e_5) throw e_5.error; }
                        return [7 /*endfinally*/];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    Service.lazyLoad = function (uri, status) {
        return new Promise(function (resolve, reject) {
            status && status.push("Loading " + uri);
            // const self = this;
            var d = window.document;
            var b = d.body;
            var e = d.createElement("script");
            e.async = true;
            e.src = uri;
            b.appendChild(e);
            e.onload = function () {
                status && status.pop();
                resolve(this);
            };
            // TODO: What about fail?
        });
    };
    Service.optimizeWasmWithBinaryen = function (file, status) {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        assert(this.worker);
                        gaEvent("optimize", "Service", "binaryen");
                        data = file.getData();
                        status && status.push("Optimizing with Binaryen");
                        return [4 /*yield*/, this.worker.optimizeWasmWithBinaryen(data)];
                    case 1:
                        data = _c.sent();
                        status && status.pop();
                        file.setData(data);
                        _b = (_a = file).setValue;
                        return [4 /*yield*/, Service.disassembleWasm(data, status)];
                    case 2:
                        _b.apply(_a, [_c.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    Service.validateWasmWithBinaryen = function (file, status) {
        return __awaiter(this, void 0, void 0, function () {
            var data, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        gaEvent("validate", "Service", "binaryen");
                        data = file.getData();
                        status && status.push("Validating with Binaryen");
                        return [4 /*yield*/, this.worker.validateWasmWithBinaryen(data)];
                    case 1:
                        result = _a.sent();
                        status && status.pop();
                        return [2 /*return*/, !!result];
                }
            });
        });
    };
    Service.getWasmCallGraphWithBinaryen = function (file, status) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Service.disassembleWasmWithBinaryen = function (file, status) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Service.convertWasmToAsmWithBinaryen = function (file, status) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Service.assembleWatWithBinaryen = function (file, status) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Service.download = function (file) {
        if (!Service.downloadLink) {
            Service.downloadLink = document.createElement("a");
            Service.downloadLink.style.display = "none";
            document.body.appendChild(Service.downloadLink);
        }
        var url = URL.createObjectURL(new Blob([file.getData()], { type: "application/octet-stream" }));
        Service.downloadLink.href = url;
        Service.downloadLink.download = file.getName();
        if (Service.downloadLink.href !== document.location) {
            Service.downloadLink.click();
        }
    };
    // Kudos to https://github.com/tbfleming/cib
    Service.clangFormat = function (file, status) {
        return __awaiter(this, void 0, void 0, function () {
            function format() {
                var result = Service.clangFormatModule.ccall("formatCode", "string", ["string"], [file.getValue()]);
                file.setValue(result);
            }
            var response, wasmBinary, module_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        gaEvent("format", "Service", "clang-format");
                        if (!Service.clangFormatModule) return [3 /*break*/, 1];
                        format();
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, Service.lazyLoad("lib/clang-format.js", status)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, fetch("lib/clang-format.wasm")];
                    case 3:
                        response = _a.sent();
                        return [4 /*yield*/, response.arrayBuffer()];
                    case 4:
                        wasmBinary = _a.sent();
                        module_1 = {
                            postRun: function () {
                                format();
                            },
                            wasmBinary: wasmBinary
                        };
                        Service.clangFormatModule = Module(module_1);
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Service.disassembleX86 = function (file, status, options) {
        if (options === void 0) { options = ""; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Service.openBinaryExplorer = function (file) {
        window.open("//wasdk.github.io/wasmcodeexplorer/?api=postmessage", "", "toolbar=no,ocation=no,directories=no,status=no,menubar=no,location=no,scrollbars=yes,resizable=yes,width=1024,height=568");
        if (Service.binaryExplorerMessageListener) {
            window.removeEventListener("message", Service.binaryExplorerMessageListener, false);
        }
        Service.binaryExplorerMessageListener = function (e) {
            if (e.data.type === "wasmexplorer-ready") {
                window.removeEventListener("message", Service.binaryExplorerMessageListener, false);
                Service.binaryExplorerMessageListener = null;
                var dataToSend = new Uint8Array(file.data.slice(0));
                e.source.postMessage({
                    type: "wasmexplorer-load",
                    data: dataToSend
                }, "*", [dataToSend.buffer]);
            }
        };
        window.addEventListener("message", Service.binaryExplorerMessageListener, false);
    };
    Service.import = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, project, global, context, url, script, id, scriptReady, module;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = getCurrentRunnerInfo(), project = _a.project, global = _a.global;
                        context = new RewriteSourcesContext(project);
                        context.logLn = console.log;
                        context.createFile = function (src, type) {
                            var blob = new global.Blob([src], { type: type });
                            return global.URL.createObjectURL(blob);
                        };
                        url = processJSFile(context, path);
                        script = global.document.createElement("script");
                        script.setAttribute("type", "module");
                        script.setAttribute("async", "async");
                        id = "__import__" + Math.random()
                            .toString(36)
                            .substr(2);
                        scriptReady = new Promise(function (resolve, reject) {
                            global[id] = resolve;
                        });
                        script.textContent = "import * as i from '" + url + "'; " + id + "(i);";
                        global.document.head.appendChild(script);
                        return [4 /*yield*/, scriptReady];
                    case 1:
                        module = _b.sent();
                        // Module loaded -- cleaning up
                        script.remove();
                        delete global[id];
                        return [2 /*return*/, module];
                }
            });
        });
    };
    Service.compileMarkdownToHtml = function (src) {
        return __awaiter(this, void 0, void 0, function () {
            var converter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof showdown === "undefined")) return [3 /*break*/, 2];
                        return [4 /*yield*/, Service.lazyLoad("lib/showdown.min.js")];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        converter = new showdown.Converter({
                            tables: true,
                            ghCodeBlocks: true
                        });
                        showdown.setFlavor("github");
                        return [2 /*return*/, converter.makeHtml(src)];
                }
            });
        });
    };
    Service.twiggyWasm = function (file, status) {
        return __awaiter(this, void 0, void 0, function () {
            var buffer, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        buffer = file.getData();
                        gaEvent("disassemble", "Service", "twiggy");
                        status && status.push("Analyze with Twiggy");
                        return [4 /*yield*/, this.worker.twiggyWasm(buffer)];
                    case 1:
                        result = _a.sent();
                        // const output = file.parent.newFile(
                        //   file.getName() + ".md",
                        //   FileType.Markdown
                        // );
                        // output.description = "Analyzed " + file.getName() + " using Twiggy.";
                        // output.setData(result);
                        status && status.pop();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Service.worker = new ServiceWorker();
    Service.downloadLink = null;
    Service.clangFormatModule = null;
    return Service;
}());
export { Service };
//# sourceMappingURL=service.js.map