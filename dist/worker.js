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
import { WorkerCommand } from "./message";
function assert(c, message) {
    if (!c) {
        throw new Error(message);
    }
}
function loadBinaryen() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (typeof Binaryen === "undefined") {
                importScripts("https://cdn.rawgit.com/AssemblyScript/binaryen.js/v48.0.0-nightly.20180624/index.js");
            }
            return [2 /*return*/];
        });
    });
}
function loadWabt() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (typeof wabt === "undefined") {
                self.global = self; // Wabt installs itself on the global object.
                importScripts("https://cdn.rawgit.com/AssemblyScript/wabt.js/v1.0.0-nightly.20180421/index.js");
            }
            return [2 /*return*/];
        });
    });
}
var Twiggy = null;
function loadTwiggy() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!Twiggy) return [3 /*break*/, 2];
                    importScripts("../lib/twiggy_wasm_api.js");
                    return [4 /*yield*/, wasm_bindgen("../lib/twiggy_wasm_api_bg.wasm")];
                case 1:
                    _a.sent();
                    Twiggy = {
                        Items: wasm_bindgen.Items,
                        Top: wasm_bindgen.Top,
                        Paths: wasm_bindgen.Paths,
                        Monos: wasm_bindgen.Monos,
                        Dominators: wasm_bindgen.Dominators
                    };
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
onmessage = function (e) {
    var _a;
    var fn = (_a = {},
        _a[WorkerCommand.OptimizeWasmWithBinaryen] = optimizeWasmWithBinaryen,
        _a[WorkerCommand.ValidateWasmWithBinaryen] = validateWasmWithBinaryen,
        _a[WorkerCommand.CreateWasmCallGraphWithBinaryen] = createWasmCallGraphWithBinaryen,
        _a[WorkerCommand.ConvertWasmToAsmWithBinaryen] = convertWasmToAsmWithBinaryen,
        _a[WorkerCommand.DisassembleWasmWithBinaryen] = disassembleWasmWithBinaryen,
        _a[WorkerCommand.AssembleWatWithBinaryen] = assembleWatWithBinaryen,
        _a[WorkerCommand.DisassembleWasmWithWabt] = disassembleWasmWithWabt,
        _a[WorkerCommand.AssembleWatWithWabt] = assembleWatWithWabt,
        _a[WorkerCommand.TwiggyWasm] = twiggyWasm,
        _a)[e.data.command];
    assert(fn, "Command " + e.data.command + " not found.");
    processMessage(e.data, fn);
};
function processMessage(request, fn) {
    return __awaiter(this, void 0, void 0, function () {
        var response, _a, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    response = {
                        id: request.id,
                        payload: null,
                        success: true
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    _a = response;
                    return [4 /*yield*/, fn(request.payload)];
                case 2:
                    _a.payload = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _b.sent();
                    response.payload = {
                        message: e_1.message
                    };
                    response.success = false;
                    return [3 /*break*/, 4];
                case 4:
                    postMessage(response, undefined);
                    return [2 /*return*/];
            }
        });
    });
}
function optimizeWasmWithBinaryen(data) {
    return __awaiter(this, void 0, void 0, function () {
        var module;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadBinaryen()];
                case 1:
                    _a.sent();
                    module = Binaryen.readBinary(new Uint8Array(data));
                    module.optimize();
                    return [2 /*return*/, Promise.resolve(module.emitBinary())];
            }
        });
    });
}
function validateWasmWithBinaryen(data) {
    return __awaiter(this, void 0, void 0, function () {
        var module;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadBinaryen()];
                case 1:
                    _a.sent();
                    module = Binaryen.readBinary(new Uint8Array(data));
                    return [2 /*return*/, Promise.resolve(module.validate())];
            }
        });
    });
}
function createWasmCallGraphWithBinaryen(data) {
    return __awaiter(this, void 0, void 0, function () {
        var module, old, ret;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadBinaryen()];
                case 1:
                    _a.sent();
                    module = Binaryen.readBinary(new Uint8Array(data));
                    old = Binaryen.print;
                    ret = "";
                    Binaryen.print = function (x) { ret += x + "\n"; };
                    module.runPasses(["print-call-graph"]);
                    Binaryen.print = old;
                    return [2 /*return*/, Promise.resolve(ret)];
            }
        });
    });
}
function convertWasmToAsmWithBinaryen(data) {
    return __awaiter(this, void 0, void 0, function () {
        var module;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadBinaryen()];
                case 1:
                    _a.sent();
                    module = Binaryen.readBinary(new Uint8Array(data));
                    module.optimize();
                    return [2 /*return*/, Promise.resolve(module.emitAsmjs())];
            }
        });
    });
}
function disassembleWasmWithBinaryen(data) {
    return __awaiter(this, void 0, void 0, function () {
        var module;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadBinaryen()];
                case 1:
                    _a.sent();
                    module = Binaryen.readBinary(new Uint8Array(data));
                    return [2 /*return*/, Promise.resolve(module.emitText())];
            }
        });
    });
}
function assembleWatWithBinaryen(data) {
    return __awaiter(this, void 0, void 0, function () {
        var module;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadBinaryen()];
                case 1:
                    _a.sent();
                    module = Binaryen.parseText(data);
                    return [2 /*return*/, Promise.resolve(module.emitBinary())];
            }
        });
    });
}
function disassembleWasmWithWabt(data) {
    return __awaiter(this, void 0, void 0, function () {
        var module;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadWabt()];
                case 1:
                    _a.sent();
                    module = wabt.readWasm(data, { readDebugNames: true });
                    module.generateNames();
                    module.applyNames();
                    return [2 /*return*/, Promise.resolve(module.toText({ foldExprs: false, inlineExport: true }))];
            }
        });
    });
}
function assembleWatWithWabt(data) {
    return __awaiter(this, void 0, void 0, function () {
        var module;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadWabt()];
                case 1:
                    _a.sent();
                    module = wabt.parseWat("test.wat", data);
                    module.resolveNames();
                    module.validate();
                    return [2 /*return*/, Promise.resolve(module.toBinary({ log: true, write_debug_names: true }).buffer)];
            }
        });
    });
}
function twiggyWasm(data) {
    return __awaiter(this, void 0, void 0, function () {
        function printDominator(dominator, depth) {
            var prefix = "";
            for (var i = 0; i < depth - 1; i++) {
                prefix += "   ";
            }
            if (depth) {
                prefix += "⤷ ";
            }
            md += "| " + dominator.retained_size + " | " + dominator.retained_size_percent.toFixed(2) + " | `" + (prefix + dominator.name) + "` |\n";
            if (dominator.children) {
                dominator.children.forEach(function (child) {
                    if (child.retained_size_percent >= retainedSizePercentIgnoreThreshold) {
                        printDominator(child, depth + 1);
                    }
                    else {
                        ignoreCount++;
                    }
                });
            }
        }
        var opts, items, md, top, ignoreCount, shallowSizePercentIgnoreThreshold, retainedSizePercentIgnoreThreshold, dominator;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadTwiggy()];
                case 1:
                    _a.sent();
                    items = Twiggy.Items.parse(new Uint8Array(data));
                    md = "# Twiggy Analysis\n\nTwiggy is a code size profiler, learn more about it [here](https://github.com/rustwasm/twiggy).\n\n";
                    // Top
                    opts = Twiggy.Top.new();
                    top = JSON.parse(items.top(opts));
                    md += "## Top\n\n";
                    md += "| Shallow Bytes | Shallow % | Item |\n";
                    md += "| ------------: | --------: | :--- |\n";
                    ignoreCount = 0;
                    shallowSizePercentIgnoreThreshold = 0.1;
                    top.forEach(function (entry) {
                        if (entry.shallow_size_percent >= shallowSizePercentIgnoreThreshold) {
                            md += "| " + entry.shallow_size + " | " + entry.shallow_size_percent.toFixed(2) + " | `" + entry.name + "` |\n";
                        }
                        else {
                            ignoreCount++;
                        }
                    });
                    if (ignoreCount) {
                        md += "\n### Note:\n" + ignoreCount + " items had a shallow size percent less than " + shallowSizePercentIgnoreThreshold + " and were not listed above.\n";
                    }
                    // Paths
                    // md += "\n\n# Paths\n\n";
                    // opts = Twiggy.Paths.new();
                    // const paths = JSON.parse(items.paths(opts));
                    // Monos
                    // md += "\n\n# Monos\n\n";
                    // opts = Twiggy.Monos.new();
                    // opts.set_max_generics(10);
                    // opts.set_max_monos(10);
                    // const monos = JSON.parse(items.monos(opts));
                    md += "\n\n## Dominators\n\n";
                    md += "| Retained Bytes | Retained % | Dominator Tree |\n";
                    md += "| ------------: | --------: | :--- |\n";
                    retainedSizePercentIgnoreThreshold = 0.1;
                    ignoreCount = 0;
                    opts = Twiggy.Dominators.new();
                    dominator = JSON.parse(items.dominators(opts));
                    printDominator(dominator, 0);
                    if (ignoreCount) {
                        md += "\n### Note:\n" + ignoreCount + " items had a retained size percent less than " + retainedSizePercentIgnoreThreshold + " and were not listed above.\n";
                    }
                    return [2 /*return*/, Promise.resolve(md)];
            }
        });
    });
}
//# sourceMappingURL=worker.js.map