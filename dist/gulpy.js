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
var Task = /** @class */ (function () {
    function Task(dependencies, promiseMaker) {
        this.dependencies = dependencies;
        this.promiseMaker = promiseMaker;
    }
    return Task;
}());
var TaskInstance = /** @class */ (function () {
    function TaskInstance(task) {
        this.task = task;
        this.promise = null;
    }
    TaskInstance.prototype.makePromise = function () {
        if (this.promise) {
            return this.promise;
        }
        return this.promise = this.task.promiseMaker();
    };
    return TaskInstance;
}());
var GulpySession = /** @class */ (function () {
    function GulpySession(gulpy) {
        this.tasks = new Map();
        this.gulpy = gulpy;
    }
    GulpySession.prototype.ensureInstance = function (task) {
        var instance = this.tasks.get(task);
        if (instance) {
            return instance;
        }
        instance = new TaskInstance(task);
        this.tasks.set(task, instance);
        return instance;
    };
    GulpySession.prototype.runInstance = function (instance) {
        return __awaiter(this, void 0, void 0, function () {
            var dependencies;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dependencies = instance.task.dependencies.map(function (x) { return _this.ensureInstance(x); });
                        return [4 /*yield*/, Promise.all(dependencies.map(function (x) { return _this.runInstance(x); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, instance.makePromise()];
                }
            });
        });
    };
    GulpySession.prototype.run = function (task) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.runInstance(this.ensureInstance(task))];
            });
        });
    };
    return GulpySession;
}());
var Gulpy = /** @class */ (function () {
    function Gulpy() {
        this.tasks = {};
    }
    Gulpy.prototype.task = function (name, a, b) {
        var _this = this;
        var dependencies = [];
        var fn = null;
        if (arguments.length === 3) {
            dependencies = a;
            fn = b;
        }
        else if (arguments.length === 2) {
            if (Array.isArray(a)) {
                dependencies = a;
                fn = b || (function () { });
            }
            else {
                fn = a;
            }
        }
        this.tasks[name] = new Task(dependencies.map(function (x) { return _this.tasks[x]; }), fn);
    };
    Gulpy.prototype.series = function (tasks) {
        return null;
    };
    Gulpy.prototype.parallel = function (tasks) {
        return null;
    };
    Gulpy.prototype.hasTask = function (name) {
        return name in this.tasks;
    };
    Gulpy.prototype.run = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var session;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        session = new GulpySession(this);
                        return [4 /*yield*/, session.run(this.tasks[name])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Gulpy;
}());
export { Gulpy };
//# sourceMappingURL=gulpy.js.map