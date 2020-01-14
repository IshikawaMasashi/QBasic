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
import { fileTypeForExtension, isBinaryFileType, FileType, fileTypeForMimeType } from "./models";
export function toAddress(n) {
    var s = n.toString(16);
    while (s.length < 6) {
        s = "0" + s;
    }
    return "0x" + s;
}
export function padRight(s, n, c) {
    s = String(s);
    while (s.length < n) {
        s = s + c;
    }
    return s;
}
export function padLeft(s, n, c) {
    s = String(s);
    while (s.length < n) {
        s = c + s;
    }
    return s;
}
var x86JumpInstructions = [
    "jmp",
    "ja",
    "jae",
    "jb",
    "jbe",
    "jc",
    "je",
    "jg",
    "jge",
    "jl",
    "jle",
    "jna",
    "jnae",
    "jnb",
    "jnbe",
    "jnc",
    "jne",
    "jng",
    "jnge",
    "jnl",
    "jnle",
    "jno",
    "jnp",
    "jns",
    "jnz",
    "jo",
    "jp",
    "jpe",
    "jpo",
    "js",
    "jz"
];
export function isBranch(instr) {
    return x86JumpInstructions.indexOf(instr.mnemonic) >= 0;
}
var base64DecodeMap = [
    // starts at 0x2B
    62,
    0,
    0,
    0,
    63,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    0,
    0,
    0,
    0,
    0,
    0,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51
];
var base64DecodeMapOffset = 0x2b;
var base64EOF = 0x3d;
var _concat3array = new Array(3);
var _concat4array = new Array(4);
// const _concat9array = new Array(9);
/**
 * The concatN() functions concatenate multiple strings in a way that
 * avoids creating intermediate strings, unlike String.prototype.concat().
 *
 * Note that these functions don't have identical behaviour to using '+',
 * because they will ignore any arguments that are |undefined| or |null|.
 * This usually doesn't matter.
 */
export function concat3(s0, s1, s2) {
    _concat3array[0] = s0;
    _concat3array[1] = s1;
    _concat3array[2] = s2;
    return _concat3array.join("");
}
export function concat4(s0, s1, s2, s3) {
    _concat4array[0] = s0;
    _concat4array[1] = s1;
    _concat4array[2] = s2;
    _concat4array[3] = s3;
    return _concat4array.join("");
}
// https://gist.github.com/958841
export function base64EncodeBytes(bytes) {
    var base64 = "";
    var encodings = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var byteLength = bytes.byteLength;
    var byteRemainder = byteLength % 3;
    var mainLength = byteLength - byteRemainder;
    var a;
    var b;
    var c;
    var d;
    var chunk;
    // Main loop deals with bytes in chunks of 3
    for (var i = 0; i < mainLength; i = i + 3) {
        // Combine the three bytes into a single integer
        chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        // Use bitmasks to extract 6-bit segments from the triplet
        a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
        b = (chunk & 258048) >> 12; // 258048 = (2^6 - 1) << 12
        c = (chunk & 4032) >> 6; // 4032 = (2^6 - 1) << 6
        d = chunk & 63; // 63 = 2^6 - 1
        // Convert the raw binary segments to the appropriate ASCII encoding
        base64 += concat4(encodings[a], encodings[b], encodings[c], encodings[d]);
    }
    // Deal with the remaining bytes and padding
    if (byteRemainder === 1) {
        chunk = bytes[mainLength];
        a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2
        // Set the 4 least significant bits to zero
        b = (chunk & 3) << 4; // 3 = 2^2 - 1
        base64 += concat3(encodings[a], encodings[b], "===");
    }
    else if (byteRemainder === 2) {
        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
        a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
        b = (chunk & 1008) >> 4; // 1008 = (2^6 - 1) << 4
        // Set the 2 least significant bits to zero
        c = (chunk & 15) << 2; // 15 = 2^4 - 1
        base64 += concat4(encodings[a], encodings[b], encodings[c], "=");
    }
    return base64;
}
export function decodeRestrictedBase64ToBytes(encoded) {
    var ch;
    var code;
    var code2;
    var len = encoded.length;
    var padding = encoded.charAt(len - 2) === "="
        ? 2
        : encoded.charAt(len - 1) === "="
            ? 1
            : 0;
    var decoded = new Uint8Array((encoded.length >> 2) * 3 - padding);
    for (var i = 0, j = 0; i < encoded.length;) {
        ch = encoded.charCodeAt(i++);
        code = base64DecodeMap[ch - base64DecodeMapOffset];
        ch = encoded.charCodeAt(i++);
        code2 = base64DecodeMap[ch - base64DecodeMapOffset];
        decoded[j++] = (code << 2) | ((code2 & 0x30) >> 4);
        ch = encoded.charCodeAt(i++);
        if (ch === base64EOF) {
            return decoded;
        }
        code = base64DecodeMap[ch - base64DecodeMapOffset];
        decoded[j++] = ((code2 & 0x0f) << 4) | ((code & 0x3c) >> 2);
        ch = encoded.charCodeAt(i++);
        if (ch === base64EOF) {
            return decoded;
        }
        code2 = base64DecodeMap[ch - base64DecodeMapOffset];
        decoded[j++] = ((code & 0x03) << 6) | code2;
    }
    return decoded;
}
var layoutThrottleDuration = 10;
var layoutTimeout = 0;
export function layout() {
    if (layoutTimeout) {
        window.clearTimeout(layoutTimeout);
    }
    window.setTimeout(function () {
        layoutTimeout = 0;
        document.dispatchEvent(new Event("layout"));
    }, layoutThrottleDuration);
}
export function resetDOMSelection() {
    window.getSelection().removeAllRanges();
}
export function assert(c, message) {
    if (!c) {
        throw new Error(message);
    }
}
export function clamp(x, min, max) {
    return Math.min(Math.max(min, x), max);
}
export function readUploadedFile(inputFile, readAs) {
    return __awaiter(this, void 0, void 0, function () {
        var temporaryFileReader;
        return __generator(this, function (_a) {
            temporaryFileReader = new FileReader();
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    temporaryFileReader.onerror = function () {
                        temporaryFileReader.abort();
                        reject(new DOMException("Problem parsing input file."));
                    };
                    temporaryFileReader.onload = function () {
                        resolve(temporaryFileReader.result);
                    };
                    if (readAs === "text") {
                        temporaryFileReader.readAsText(inputFile);
                    }
                    else if (readAs === "arrayBuffer") {
                        temporaryFileReader.readAsArrayBuffer(inputFile);
                    }
                    else {
                        assert(false, "NYI");
                    }
                })];
        });
    });
}
export function readUploadedDirectory(inputEntry, root, customRoot) {
    return __awaiter(this, void 0, void 0, function () {
        var reader;
        var _this = this;
        return __generator(this, function (_a) {
            reader = inputEntry.createReader();
            reader.readEntries(function (entries) {
                entries.forEach(function (entry) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        if (entry.isDirectory) {
                            return [2 /*return*/, readUploadedDirectory(entry, root, customRoot)];
                        }
                        entry.file(function (file) { return __awaiter(_this, void 0, void 0, function () {
                            var name_1, path, pathArray, fileType, data, newFile, e_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        name_1 = file.name;
                                        path = entry.fullPath.replace(/^\/+/g, "");
                                        if (customRoot) {
                                            pathArray = path.split("/");
                                            pathArray[0] = customRoot;
                                            path = pathArray.join("/");
                                        }
                                        fileType = fileTypeForExtension(name_1.split(".").pop());
                                        return [4 /*yield*/, readUploadedFile(file, isBinaryFileType(fileType) ? "arrayBuffer" : "text")];
                                    case 1:
                                        data = _a.sent();
                                        newFile = root.newFile(path, fileType, false, true);
                                        newFile.setData(data);
                                        return [3 /*break*/, 3];
                                    case 2:
                                        e_1 = _a.sent();
                                        console.log("Unable to read the file!");
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                    });
                }); });
            });
            return [2 /*return*/];
        });
    });
}
export function uploadFilesToDirectory(items, root) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            Array.from(items).forEach(function (item) { return __awaiter(_this, void 0, void 0, function () {
                var entry, customRoot, file, name, path, fileType, data, newFile, e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (typeof item.webkitGetAsEntry === "function") {
                                entry = item.webkitGetAsEntry();
                                if (entry.isDirectory) {
                                    if (root.getImmediateChild(entry.name)) {
                                        customRoot = root.handleNameCollision(entry.name);
                                        return [2 /*return*/, readUploadedDirectory(entry, root, customRoot)];
                                    }
                                    return [2 /*return*/, readUploadedDirectory(entry, root)];
                                }
                            }
                            if (item instanceof DataTransferItem) {
                                file = item.getAsFile();
                            }
                            else {
                                file = item;
                            }
                            name = file.name;
                            path = name;
                            fileType = fileTypeForExtension(name.split(".").pop());
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, readUploadedFile(file, isBinaryFileType(fileType) ? "arrayBuffer" : "text")];
                        case 2:
                            data = _a.sent();
                            newFile = root.newFile(path, fileType, false, true);
                            newFile.setData(data);
                            return [3 /*break*/, 4];
                        case 3:
                            e_2 = _a.sent();
                            console.log("Unable to read the file!");
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
export function isUploadAllowedForMimeType(type) {
    if (type === "") {
        // Firefox doesn't show the "application/wasm" mime type.
        return true;
    }
    return fileTypeForMimeType(type) !== FileType.Unknown;
}
var nextKey = 0;
export function getNextKey() {
    return nextKey++;
}
//# sourceMappingURL=util.js.map