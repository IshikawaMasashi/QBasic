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
export function notifyAboutFork(fiddle) {
    window.parent.postMessage({
        type: "wasm-studio/fork",
        fiddle: fiddle,
    }, "*");
}
var Arc = /** @class */ (function () {
    function Arc() {
    }
    Arc.publish = function (manifest) {
        window.parent.postMessage({
            type: "wasm-studio/module-publish",
            manifest: manifest,
        }, "*");
    };
    Arc.animationBufferToJSON = function (animation, rows, cols, frameCount) {
        var json = [];
        var frameSize = rows * cols * 3;
        for (var i = 0; i < frameCount; i++) {
            var buffer = new Uint8Array(animation, frameSize * i, frameSize);
            var frame = [];
            json.push(frame);
            var pos = 0;
            for (var y = 0; y < rows; y++) {
                var row = [];
                frame.push(row);
                for (var x = 0; x < cols; x++) {
                    row.push([buffer[pos++], buffer[pos++], buffer[pos++]]);
                }
            }
        }
        return json;
    };
    return Arc;
}());
export { Arc };
//# sourceMappingURL=arc.js.map