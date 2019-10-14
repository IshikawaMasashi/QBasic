var Scheme;
(function (Scheme) {
    // Find the script tag
    var find_script_tag = function (e) {
        if (e.nodeName.toLowerCase() == 'script') {
            return e;
        }
        else if (e.id == '_firebugConsole') {
            if (e.previousSibling.nodeName.toLowerCase() == 'script')
                return e.previousSibling;
            else
                console.error("BiwaScheme could not find the script tag... please use firebug 1.5.0");
        }
        else {
            return find_script_tag(e.lastChild);
        }
    };
    //var script = find_script_tag(document);
    //var src = script.getAttribute("src");
    //var dir = src.match(/(.*)src\/development_initializer.js/)[1];
    //var script_tag = function (path: string) {
    //    return '<script type="text/javascript" src="' +
    //        path +
    //        '"><\/script>';
    //};
    //document.write(script_tag(dir + "src/version.js"));
    //document.write(script_tag(dir + "src/deps/jquery.js"));
    //document.write(script_tag(dir + "src/deps/underscore.js"));
    //document.write(script_tag(dir + "src/deps/underscore.string.js"));
    //document.write(script_tag(dir + "src/header.js"));
    //document.write(script_tag(dir + "src/system/utils.js"));
    // document.write(script_tag(dir+"src/system/class.js"));
    //document.write(script_tag(dir + "src/system/_writer.js"));
    //document.write(script_tag(dir + "src/system/_types.js"));
    //document.write(script_tag(dir + "src/system/error.js"));
    //document.write(script_tag(dir + "src/system/set.js"));
    //document.write(script_tag(dir + "src/system/values.js"));
    //document.write(script_tag(dir + "src/system/pair.js"));
    //document.write(script_tag(dir + "src/system/symbol.js"));
    //document.write(script_tag(dir + "src/system/char.js"));
    //document.write(script_tag(dir + "src/system/number.js"));
    //document.write(script_tag(dir + "src/system/port.js"));
    //document.write(script_tag(dir + "src/system/record.js"));
    //document.write(script_tag(dir + "src/system/enumeration.js"));
    //document.write(script_tag(dir + "src/system/hashtable.js"));
    //document.write(script_tag(dir + "src/system/syntax.js"));
    //document.write(script_tag(dir + "src/system/parser.js"));
    //document.write(script_tag(dir + "src/system/compiler.js"));
    //document.write(script_tag(dir + "src/system/pause.js"));
    //document.write(script_tag(dir + "src/system/call.js"));
    //document.write(script_tag(dir + "src/system/interpreter.js"));
    //document.write(script_tag(dir + "src/system/promise.js"));
    //document.write(script_tag(dir + "src/library/infra.js"));
    //document.write(script_tag(dir + "src/library/r6rs_lib.js"));
    //document.write(script_tag(dir + "src/library/js_interface.js"));
    //document.write(script_tag(dir + "src/library/webscheme_lib.js"));
    //document.write(script_tag(dir + "src/library/extra_lib.js"));
    //document.write(script_tag(dir + "src/library/node_functions.js"));
    //document.write(script_tag(dir + "src/library/srfi.js"));
    //document.write(script_tag(dir + "src/platforms/browser/dumper.js"));
    //document.write(script_tag(dir + "src/platforms/browser/console.js"));
    //document.write("<script type='text/javascript'>BiwaScheme.startDev()<\/script>");
    // Start user's program
    //window.onload = () => {
    //    var worker = new Worker('built/scheme.js');
    //    worker.addEventListener('message', function (e) {
    //        console.log('Worker said: ', e.data);
    //    }, false);
    //    let script = document.getElementById("test");
    //    //export function startDev(): any {
    //    //var onError = function (e: any) { throw e; }
    //    //var intp = new Interpreter(onError);
    //    //intp.evaluate(script.textContent);
    //    //}
    //    worker.postMessage(script.textContent); // Send data to our worker.
    //}
})(Scheme || (Scheme = {}));
var Scheme;
(function (Scheme) {
    //
    // Heap based scheme from 3imp.pdf
    //
    //
    // variables
    //
    Scheme.TopEnv = {};
    Scheme.CoreEnv = {};
    // Prints the arguments to console.debug.
    function debug( /*arguments*/) {
        var args = Scheme.toArray(arguments);
        console.debug.apply(console, args.map(Scheme.inspect));
    }
    Scheme.debug = debug;
    //
    // Assertion
    //
    //export function assert(cond, desc) {
    //    if (!cond) {
    //        throw new BiwaScheme.Bug("[BUG] Assertion failed: " + desc);
    //    }
    //}
    //
    // Configurations
    //
    // Maximum depth of stack trace
    // (You can also set Interpreter#max_trace_size for each Interpreter)
    Scheme.max_trace_size = 40;
    // Stop showing deprecation warning
    Scheme.suppress_deprecation_warning = false;
})(Scheme || (Scheme = {}));
var Scheme;
(function (Scheme) {
    ///
    /// Interpreter
    ///
    class Interpreter {
        constructor(value) {
            // new BiwaScheme.Interpreter()
            // new BiwaScheme.Interpreter(lastInterpreter)
            // new BiwaScheme.Interpreter(errorHandler)
            // new BiwaScheme.Interpreter(lastInterpreter, errorHandler)
            // Interpreter stack
            this.stack = [];
            this.tco_counter = [];
            var last_interpreter = null;
            var on_error = null;
            if (arguments.length == 2) {
                last_interpreter = arguments[0];
                on_error = arguments[1];
            }
            else if (arguments.length == 1 && arguments[0] instanceof Interpreter) {
                last_interpreter = arguments[0];
            }
            else if (arguments.length == 1 && typeof (arguments[0]) == "function") {
                on_error = arguments[0];
            }
            // JS function to handle error
            this.on_error = on_error || (last_interpreter ? last_interpreter.on_error : function (e) { });
            // JS function to handle result
            this.after_evaluate = function () { };
            // (Variables for stack trace)
            // Name of the last variable read by refer-xx
            this.last_refer = last_interpreter ? last_interpreter.last_refer : null;
            // Call stack (array of last_refer)
            this.call_stack = last_interpreter ? Scheme.clone(last_interpreter.call_stack) : [];
            // Counts number of tail calls (= how many times should we pop call_stack
            // in op_return)
            // this.tco_counter = [];
            // Maximum length of call_stack
            // (Note: we should cap call_stack for inifinite loop with recursion)
            this.max_trace_size = last_interpreter ? last_interpreter.max_trace_size : Scheme.max_trace_size;
        }
        inspect() {
            return [
                "#<Interpreter: stack size=>",
                this.stack.length, " ",
                "after_evaluate=",
                Scheme.inspect(this.after_evaluate),
                ">"
            ].join("");
        }
        // private
        push(x, s) {
            this.stack[s] = x;
            return s + 1;
        }
        // private
        //s: depth of stack to save
        //ret: saved(copied) stack 
        save_stack(s) {
            var v = [];
            for (var i = 0; i < s; i++) {
                v[i] = this.stack[i];
            }
            return { stack: v, last_refer: this.last_refer, call_stack: Scheme.clone(this.call_stack), tco_counter: Scheme.clone(this.tco_counter) };
        }
        // private
        //v: stack array to restore
        //ret: lenght of restored stack
        restore_stack(stuff) {
            let v = stuff.stack;
            var s = v.length;
            for (var i = 0; i < s; i++) {
                this.stack[i] = v[i];
            }
            this.last_refer = stuff.last_refer;
            this.call_stack = Scheme.clone(stuff.call_stack);
            this.tco_counter = Scheme.clone(stuff.tco_counter);
            return s;
        }
        // private
        //s: depth of stack to save
        //n: number of args(for outer lambda) to remove (= 0 unless tail position)
        //ret: closure array
        continuation(s, n) {
            // note: implementation of this function for final version doesn't exist in 3imp.pdf..
            var ss = this.push(n, s);
            return this.closure(["refer-local", 0,
                ["nuate", this.save_stack(ss),
                    ["return"]]], 0, //n (number of frees)
            null, //s (stack position to get frees)
            -1); // dotpos
        }
        // private
        // shift stack 
        // n: number of items to skip (from stack top)
        // m: number of items to shift
        // s: stack pointer (= index of stack top + 1)
        shift_args(n, m, s) {
            for (var i = n - 1; i >= -1; i--) {
                this.index_set(s, i + m + 1, this.index(s, i));
            }
            return s - m - 1;
        }
        index(s, i) {
            return this.stack[s - i - 2];
        }
        // private
        index_set(s, i, v) {
            this.stack[s - i - 2] = v;
        }
        // private
        //ret: [body, stack[s-1], stack[s-2], .., stack[s-n], dotpos]
        closure(body, n, s, dotpos) {
            var v = []; //(make-vector n+1+1)
            v[0] = body;
            for (var i = 0; i < n; i++)
                v[i + 1] = this.index(s, i - 1);
            v[n + 1] = dotpos;
            v.closure_p = true;
            return v;
        }
        // private
        run_dump_hook(a, x, f, c, s) {
            var dumper;
            var state;
            if (this.dumper) {
                dumper = this.dumper;
            }
            else if (Interpreter.dumper) {
                dumper = Interpreter.dumper;
            }
            else
                return;
            if (dumper) {
                state = {
                    "a": a,
                    "f": f,
                    "c": c,
                    "s": s,
                    "x": x,
                    "stack": this.stack
                };
                dumper.dump(state);
            }
        }
        // private
        _execute(a, x, f, c, s) {
            var ret = null;
            //Console.puts("executing "+x[0]);
            while (true) { //x[0] != "halt"){
                this.run_dump_hook(a, x, f, c, s);
                switch (x[0]) {
                    case "halt":
                        return a;
                    case "refer-local":
                        var n = x[1], x = x[2];
                        a = this.index(f, n);
                        this.last_refer = "(anon)";
                        break;
                    case "refer-free":
                        var n = x[1], x = x[2];
                        a = c[n + 1];
                        this.last_refer = "(anon)";
                        break;
                    case "refer-global":
                        var sym = x[1], x = x[2];
                        if (Scheme.TopEnv.hasOwnProperty(sym))
                            var val = Scheme.TopEnv[sym];
                        else if (Scheme.CoreEnv.hasOwnProperty(sym))
                            var val = Scheme.CoreEnv[sym];
                        else
                            throw new Scheme._Error("execute: unbound symbol: " + Scheme.inspect(sym));
                        a = val;
                        this.last_refer = sym || "(anon)";
                        break;
                    case "indirect":
                        var x = x[1];
                        a = a[0]; //unboxing
                        break;
                    case "constant":
                        var obj = x[1], x = x[2];
                        a = obj;
                        this.last_refer = "(anon)";
                        break;
                    case "close":
                        var ox = x;
                        var n = ox[1], body = ox[2], x = ox[3], dotpos = ox[4];
                        a = this.closure(body, n, s, dotpos);
                        s -= n;
                        break;
                    case "box":
                        var n = x[1], x = x[2];
                        this.index_set(s, n, [this.index(s, n)]); //boxing
                        break;
                    case "test":
                        var thenc = x[1], elsec = x[2];
                        x = ((a !== false) ? thenc : elsec);
                        break;
                    case "assign-global":
                        var name = x[1], x = x[2];
                        if (!Scheme.TopEnv.hasOwnProperty(name) && !Scheme.CoreEnv.hasOwnProperty(name))
                            throw new Scheme._Error("global variable '" + name + "' is not defined");
                        Scheme.TopEnv[name] = a;
                        a = Scheme.undef;
                        break;
                    case "assign-local":
                        var n = x[1], x = x[2];
                        var box = this.index(f, n);
                        box[0] = a;
                        a = Scheme.undef;
                        break;
                    case "assign-free":
                        var n = x[1], x = x[2];
                        var box = c[n + 1];
                        box[0] = a;
                        a = Scheme.undef;
                        break;
                    case "conti":
                        var n = x[1], x = x[2];
                        a = this.continuation(s, n);
                        break;
                    case "nuate":
                        var stack = x[1], x = x[2];
                        s = this.restore_stack(stack);
                        break;
                    case "frame":
                        var ret = x[2];
                        x = x[1];
                        s = this.push(ret, this.push(f, this.push(c, s)));
                        this.tco_counter[this.tco_counter.length] = 0;
                        break;
                    case "argument":
                        var x = x[1];
                        s = this.push(a, s);
                        break;
                    case "shift":
                        var n = x[1], x = x[2];
                        // the number of arguments in the last call
                        var n_args = this.index(s, n);
                        s = this.shift_args(n, n_args, s);
                        break;
                    case "tco_hinted_apply": // just like a regular apply, except we need to trace the # of TCO calls so we can generate a stacktrace
                        this.tco_counter[this.tco_counter.length - 1]++;
                        // x = ["apply"].concat(rest(x));
                        x = ["apply"].concat(x.slice(1));
                        break;
                    case "apply": //extended: n_args as second argument
                        var func = a; //, n_args = x[1];
                        // Save stack trace
                        this.call_stack.push(this.last_refer);
                        if (this.call_stack.length > this.max_trace_size) {
                            // Remove old memory if it grows too long
                            // Note: this simple way may be inconvenient (e.g. no trace
                            // will be shown when an error occurred right after returning
                            // from a large function)
                            this.call_stack.shift();
                        }
                        // the number of arguments in the last call is
                        // pushed to the stack.
                        var n_args = this.index(s, -1);
                        if (func instanceof Array) { //closure
                            a = func;
                            x = func[0];
                            // The position of dot in the parameter list.
                            var dotpos = func[func.length - 1];
                            if (dotpos >= 0) {
                                // The dot is found
                                // ----------------
                                // => Process the &rest args: packing the rest args into a list.
                                var ls = Scheme.nil;
                                for (let i = n_args; --i >= dotpos;) {
                                    ls = new Scheme.Pair(this.index(s, i), ls);
                                }
                                if (dotpos >= n_args) {
                                    // No rest argument is passed to this closure.
                                    // However, the closure expects the caller passes the rest argument.
                                    // In such case this VM prepares an empty list as the rest argument.
                                    // --------------------------------------------------------------
                                    // => We extend the stack to put the empty list.
                                    for (let i = -1; i < n_args; i++) {
                                        this.index_set(s, i - 1, this.index(s, i));
                                    }
                                    s++;
                                    // => Update the number of arguments
                                    this.index_set(s, -1, this.index(s, -1) + 1);
                                }
                                this.index_set(s, dotpos, ls);
                            }
                            f = s;
                            c = a;
                        }
                        else if (func instanceof Scheme.FunctionHolder) { // Apply JavaScript function
                            // load arguments from stack
                            var args = [];
                            for (var i = 0; i < n_args; i++)
                                args.push(this.index(s, i));
                            // invoke the function
                            var result = func.call(args, this);
                            if (result instanceof Scheme.Pause) {
                                // it requested the interpreter to suspend
                                var pause = result;
                                pause.set_state(this, ["return"], f, c, s);
                                pause.ready();
                                return pause;
                            }
                            else if (result instanceof Scheme.Call) {
                                // it requested the interpreter to call a scheme closure
                                //   [frame,
                                //     [constant... (args)
                                //     [constant, proc
                                //     [apply]]]]
                                //   [frame,
                                //     [constant, after
                                //     [apply 1]]]]
                                //   x
                                var call_after = ["frame",
                                    ["argument",
                                        ["constant", 1,
                                            ["argument",
                                                ["constant", result.after,
                                                    ["apply"]]]]],
                                    ["return"]];
                                var call_proc = ["constant", result.args.length,
                                    ["argument",
                                        ["constant", result.proc,
                                            ["apply", result.args.length]]]];
                                var push_args = result.args.reduce((opc, arg) => {
                                    // (foo 1 2) => first push 2, then 1
                                    //   [constant 2 ... [constant 1 ... ]
                                    return ["constant", arg,
                                        ["argument",
                                            opc]];
                                }, call_proc);
                                x = ["frame",
                                    push_args,
                                    call_after];
                            }
                            else {
                                // the JavaScript function returned a normal value
                                a = result;
                                x = ["return"];
                            }
                        }
                        else {
                            // unknown function type
                            throw new Scheme._Error(Scheme.inspect(func) + " is not a function");
                        }
                        break;
                    case "return":
                        // Pop stack frame
                        var n = this.index(s, -1);
                        var ss = s - n;
                        x = this.index(ss, 0),
                            f = this.index(ss, 1),
                            c = this.index(ss, 2),
                            s = ss - 3 - 1;
                        // Pop stack trace (> 1 times if tail calls are done)
                        var n_pops = 1 + this.tco_counter[this.tco_counter.length - 1];
                        this.call_stack.splice(-n_pops);
                        this.tco_counter.pop();
                        break;
                    default:
                        throw new Scheme.Bug("unknown opecode type: " + x[0]);
                }
            }
            //      if(ret === null)
            //        throw new BiwaScheme.Bug("interpreter exited in unusual way");
            //      else
            //        return ret;
            // return a
        }
        // Compile and evaluate Scheme program
        evaluate(str, after_evaluate) {
            this.call_stack = [];
            this.parser = new Scheme.Parser(str);
            this.compiler = new Scheme.Compiler();
            if (after_evaluate)
                this.after_evaluate = after_evaluate;
            // if ((BiwaScheme as any).Debug) (Console as any).puts("executing: " + str);
            this.is_top = true;
            this.file_stack = [];
            try {
                return this.resume(false);
            }
            catch (e) {
                e.message = e.message + " [" + this.call_stack.join(", ") + "]";
                return this.on_error(e);
            }
        }
        // Resume evaluation
        // (internally used from Interpreter#execute and Pause#resume)
        resume(is_resume, a, x, f, c, s) {
            var ret = Scheme.undef;
            for (;;) {
                if (is_resume) {
                    ret = this._execute(a, x, f, c, s);
                    is_resume = false;
                }
                else {
                    if (!this.parser)
                        break; // adhoc: when Pause is used via invoke_closure
                    var expr = this.parser.getObject();
                    if (expr === Scheme.Parser.EOS)
                        break;
                    // expand
                    expr = Interpreter.expand(expr);
                    // compile
                    var opc = this.compiler.run(expr);
                    //if(BiwaScheme.Debug) Console.p(opc);
                    // execute
                    ret = this._execute(expr, opc, 0, [], 0);
                }
                if (ret instanceof Scheme.Pause) { //suspend evaluation
                    return ret;
                }
            }
            // finished executing all forms
            this.after_evaluate(ret);
            return ret;
        }
        // Invoke a scheme closure
        invoke_closure(closure, args) {
            args || (args = []);
            var n_args = args.length;
            var x = ["constant", n_args, ["argument", ["constant", closure, ["apply"]]]];
            for (var i = 0; i < n_args; i++)
                x = ["constant", args[i], ["argument", x]];
            return this._execute(closure, ["frame", x, ["halt"]], 0, closure, 0);
        }
        // only compiling (for debug use only)
        compile(str) {
            var obj = Interpreter.read(str);
            var opc = Scheme.Compiler.compile(obj);
            return opc;
        }
        // Take a string and returns an expression.
        static read(str) {
            var parser = new Scheme.Parser(str);
            var r = parser.getObject();
            return (r == Scheme.Parser.EOS) ? Scheme.eof : r;
        }
        // Expand macro calls in a expression recursively.
        //
        // x - expression
        // flag - used internally. do not specify this
        //
        // @throws {BiwaScheme.Error} when x has syntax error
        static expand(x, flag = {} /*optional*/) {
            var expand = Interpreter.expand;
            // flag || (flag = {})
            var ret = null;
            if (x instanceof Scheme.Pair) {
                switch (x.car) {
                    case Scheme.Sym("define"):
                        var left = x.cdr.car, exp = x.cdr.cdr;
                        ret = new Scheme.Pair(Scheme.Sym("define"), new Scheme.Pair(left, expand(exp, flag)));
                        break;
                    case Scheme.Sym("begin"):
                        ret = new Scheme.Pair(Scheme.Sym("begin"), expand(x.cdr, flag));
                        break;
                    case Scheme.Sym("quote"):
                        ret = x;
                        break;
                    case Scheme.Sym("lambda"):
                        var vars = x.cdr.car, body = x.cdr.cdr;
                        ret = new Scheme.Pair(Scheme.Sym("lambda"), new Scheme.Pair(vars, expand(body, flag)));
                        break;
                    case Scheme.Sym("if"):
                        var testc = x.second(), thenc = x.third(), elsec = x.fourth();
                        ret = Scheme.List(Scheme.Sym("if"), expand(testc, flag), expand(thenc, flag), expand(elsec, flag));
                        break;
                    case Scheme.Sym("set!"):
                        var v = x.second(), x = x.third();
                        ret = Scheme.List(Scheme.Sym("set!"), v, expand(x, flag));
                        break;
                    case Scheme.Sym("call-with-current-continuation"):
                    case Scheme.Sym("call/cc"):
                        var x = x.second();
                        ret = Scheme.List(Scheme.Sym("call/cc"), expand(x, flag));
                        break;
                    default: //apply
                        var transformer = null;
                        if (Scheme.isSymbol(x.car)) {
                            if (Scheme.TopEnv[x.car.name] instanceof Scheme.Syntax)
                                transformer = Scheme.TopEnv[x.car.name];
                            else if (Scheme.CoreEnv[x.car.name] instanceof Scheme.Syntax)
                                transformer = Scheme.CoreEnv[x.car.name];
                        }
                        if (transformer) {
                            flag["modified"] = true;
                            ret = transformer.transform(x);
                            //            // Debug
                            //            var before = BiwaScheme.to_write(x);
                            //            var after = BiwaScheme.to_write(ret);
                            //            if(before != after){
                            //              console.log("before: " + before)
                            //              console.log("expand: " + after)
                            //            }
                            var fl;
                            for (;;) {
                                ret = expand(ret, fl = {});
                                if (!fl["modified"])
                                    break;
                            }
                        }
                        else {
                            var expanded_car = expand(x.car, flag);
                            var expanded_cdr;
                            if (!(x.cdr instanceof Scheme.Pair) && (x.cdr !== Scheme.nil)) {
                                throw new Error("proper list required for function application " +
                                    "or macro use: " + Scheme.to_write(x));
                            }
                            expanded_cdr = Scheme.array_to_list(x.cdr.to_array().map((item) => { return expand(item, flag); }));
                            ret = new Scheme.Pair(expanded_car, expanded_cdr);
                        }
                }
            }
            else {
                ret = x;
            }
            return ret;
        }
    }
    Scheme.Interpreter = Interpreter;
})(Scheme || (Scheme = {}));
/// <reference path="./system/interpreter.ts" />
function onError(e) {
    postMessage(e.message, undefined);
    throw e;
}
const intp = new Scheme.Interpreter(onError);
addEventListener('message', (e) => {
    intp.evaluate(e.data);
}, false);
var Scheme;
(function (Scheme) {
    class FunctionHolder {
        constructor(fname, min, max, func) {
            this.fname = fname;
            this.min = min;
            this.max = max;
            this.func = func;
        }
        check_arity(len) {
            const fname = this.fname;
            const min = this.min;
            const max = this.max;
            if (len < min) {
                if (max && max == min)
                    throw new Scheme._Error(fname + ": wrong number of arguments (expected: " + min + " got: " + len + ")");
                else
                    throw new Scheme._Error(fname + ": too few arguments (at least: " + min + " got: " + len + ")");
            }
            else if (max && max < len)
                throw new Scheme._Error(fname + ": too many arguments (at most: " + max + " got: " + len + ")");
        }
        call(ar, intp) {
            this.check_arity(ar.length);
            return this.func(ar, intp);
        }
        inspect() {
            return this.fname;
        }
    }
    Scheme.FunctionHolder = FunctionHolder;
})(Scheme || (Scheme = {}));
var Scheme;
(function (Scheme) {
    //
    // Syntax
    //
    class Syntax {
        constructor(sname, func) {
            this.sname = sname;
            this.func = func;
            // this.sname = sname;
            // this.func = func;
        }
        transform(x) {
            if (!this.func) {
                throw new Scheme.Bug("sorry, syntax " + this.sname +
                    " is a pseudo syntax now");
            }
            return this.func(x);
        }
        inspect() {
            return "#<Syntax " + this.sname + ">";
        }
    }
    Scheme.Syntax = Syntax;
    // A built-in syntax did not have associated Syntax object.
    // Following code installed dummy Syntax objects to built-in syntax.
    Scheme.CoreEnv["define"] = new Syntax("define");
    Scheme.CoreEnv["begin"] = new Syntax("begin");
    Scheme.CoreEnv["quote"] = new Syntax("quote");
    Scheme.CoreEnv["lambda"] = new Syntax("lambda");
    Scheme.CoreEnv["if"] = new Syntax("if");
    Scheme.CoreEnv["set!"] = new Syntax("set!");
})(Scheme || (Scheme = {}));
var Scheme;
(function (Scheme) {
    // Generate a unique integer id (unique within the entire client session).
    // Useful for temporary DOM ids.
    var idCounter = 0;
    function uniqueId(prefix) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
    }
    Scheme.uniqueId = uniqueId;
    function shallowProperty(key) {
        return function (obj) {
            return obj == null ? void 0 : obj[key];
        };
    }
    Scheme.shallowProperty = shallowProperty;
    // Retrieve the names of an object's own properties.
    // Delegates to **ECMAScript 5**'s native `Object.keys`.
    function keys(obj) {
        if (!Scheme.isObject(obj))
            return [];
        return Object.keys(obj);
    }
    Scheme.keys = keys;
    // Retrieve the values of an object's properties.
    function values(obj) {
        var _keys = keys(obj);
        var length = _keys.length;
        var values = Array(length);
        for (var i = 0; i < length; i++) {
            values[i] = obj[_keys[i]];
        }
        return values;
    }
    Scheme.values = values;
    var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
    function toArray(obj) {
        if (!obj)
            return [];
        if (Scheme.isArray(obj))
            return Array.prototype.slice.call(obj);
        if (Scheme.isString(obj)) {
            // Keep surrogate pair characters together
            return obj.match(reStrSymbol);
        }
        // if (isArrayLike(obj)) return map(obj, identity);
        if (Scheme.isArrayLike(obj)) {
            let result = [];
            for (let i = 0; i < obj.length; ++i) {
                result.push(obj[i]);
            }
            return result;
        }
        return values(obj);
    }
    Scheme.toArray = toArray;
    // Create a (shallow-cloned) duplicate of an object.
    function clone(obj) {
        if (!Scheme.isObject(obj))
            return obj;
        // return isArray(obj) ? obj.slice() : extend({}, obj);
        return Scheme.isArray(obj) ? obj.slice() : Object.assign({}, obj);
    }
    Scheme.clone = clone;
    function makeString(object) {
        if (object == null)
            return '';
        return '' + object;
    }
    function truncate(str, length, truncateStr = '...') {
        str = makeString(str);
        // truncateStr = truncateStr || '...';
        length = ~~length;
        return str.length > length ? str.slice(0, length) + truncateStr : str;
    }
    Scheme.truncate = truncate;
    // List of HTML entities for escaping.
    const escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&#x60;'
    };
    // Functions for escaping and unescaping strings to/from HTML interpolation.
    function createEscaper(map) {
        var escaper = function (match) {
            return map[match];
        };
        // Regexes for identifying a key that needs to be escaped.
        var source = '(?:' + Object.keys(map).join('|') + ')';
        var testRegexp = RegExp(source);
        var replaceRegexp = RegExp(source, 'g');
        return function (string) {
            string = string == null ? '' : '' + string;
            return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
        };
    }
    Scheme._escape = createEscaper(escapeMap);
})(Scheme || (Scheme = {}));
var Scheme;
(function (Scheme) {
    //
    // Char
    //
    class Char {
        // value: string;
        constructor(value) {
            this.value = value;
            Scheme.Chars[this.value /* = c*/] = this;
        }
        to_write() {
            switch (this.value) {
                case '\n': return "#\\newline";
                case ' ': return "#\\space";
                case '\t': return "#\\tab";
                default: return "#\\" + this.value;
            }
        }
        inspect() {
            return this.to_write();
        }
        static get(c) {
            if (typeof (c) != "string") {
                throw new Scheme.Bug("Char.get: " + Scheme.inspect(c) + " is not a string");
            }
            if (Scheme.Chars[c] === undefined)
                return new Char(c);
            else
                return Scheme.Chars[c];
        }
    }
    Scheme.Char = Char;
    function isChar(obj) {
        return (obj instanceof Char);
    }
    Scheme.isChar = isChar;
    Scheme.Chars = {};
})(Scheme || (Scheme = {}));
/// <reference path="./utils.ts" />
/// <reference path="./char.ts" />
/// <reference path="../header.ts" />
var Scheme;
(function (Scheme) {
    //
    // types.js - type predicators, equality, compare
    //
    function isNil(obj) {
        return (obj === Scheme.nil);
    }
    Scheme.isNil = isNil;
    // Is a given value equal to null?
    function isNull(obj) {
        return obj === null;
    }
    Scheme.isNull = isNull;
    function isUndef(obj) {
        return (obj === Scheme.undef);
    }
    Scheme.isUndef = isUndef;
    function isUndefined(obj) {
        return obj === void 0;
    }
    Scheme.isUndefined = isUndefined;
    function isArray(arg) {
        return Array.isArray(arg);
    }
    Scheme.isArray = isArray;
    // export var isBoolean = _.isBoolean; // Return true if arg is either true or false
    function isBoolean(obj) {
        return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
    }
    Scheme.isBoolean = isBoolean;
    ;
    //BiwaScheme.isNumber is defined in number.js (Return true if arg is scheme number)
    // export var isString = _.isString;
    function isString(obj) {
        return toString.call(obj) === '[object String]';
    }
    Scheme.isString = isString;
    function isFunction(obj) {
        if (obj instanceof Scheme.FunctionHolder) {
            return true;
        }
        return toString.call(obj) === '[object Function]';
    }
    Scheme.isFunction = isFunction;
    function isObject(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    }
    Scheme.isObject = isObject;
    function isSymbol(obj) {
        return (obj instanceof Scheme._Symbol);
    }
    Scheme.isSymbol = isSymbol;
    // Note: '() is not a pair in scheme
    function isPair(obj) {
        return (obj instanceof Scheme.Pair);
    }
    Scheme.isPair = isPair;
    // Returns true if obj is a proper list
    // Note: isList returns true for '()
    function isList(obj) {
        // var nil = nil;//, Pair = Pair;
        if (obj === Scheme.nil) { // Empty list
            return true;
        }
        if (!(obj instanceof Scheme.Pair)) { // Argument isn't even a pair
            return false;
        }
        var tortoise = obj;
        var hare = obj.cdr;
        while (true) {
            if (hare === Scheme.nil) { // End of list
                return true;
            }
            if (hare === tortoise) { // Cycle
                return false;
            }
            if (!(hare instanceof Scheme.Pair)) { // Improper list
                return false;
            }
            if (hare.cdr === Scheme.nil) { // End of list
                return true;
            }
            if (!(hare.cdr instanceof Scheme.Pair)) { // Improper list
                return false;
            }
            hare = hare.cdr.cdr;
            tortoise = tortoise.cdr;
        }
    }
    Scheme.isList = isList;
    function isVector(obj) {
        return (obj instanceof Array) && (obj.closure_p !== true);
    }
    Scheme.isVector = isVector;
    function isHashtable(obj) {
        return (obj instanceof Scheme.Hashtable);
    }
    Scheme.isHashtable = isHashtable;
    function isMutableHashtable(obj) {
        return (obj instanceof Scheme.Hashtable) && obj.mutable;
    }
    Scheme.isMutableHashtable = isMutableHashtable;
    function isClosure(obj) {
        return (obj instanceof Array) && (obj.closure_p === true);
    }
    Scheme.isClosure = isClosure;
    // procedure: Scheme closure or JavaScript function
    // valid argument for anywhere function is expected
    function isProcedure(obj) {
        return isClosure(obj) || isFunction(obj);
    }
    Scheme.isProcedure = isProcedure;
    // Return true if obj is a scheme value which evaluates to itself
    function isSelfEvaluating(obj) {
        return isBoolean(obj) ||
            Scheme.isNumber(obj) ||
            isString(obj) ||
            Scheme.isChar(obj);
    }
    Scheme.isSelfEvaluating = isSelfEvaluating;
    //function shallowProperty(key: string) {
    //    return (obj: any) => obj == null ? void 0 : obj[key];
    //}
    // Helper for collection methods to determine whether a collection
    // should be iterated as an array or as an object.
    // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
    // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    var getLength = Scheme.shallowProperty('length');
    function isArrayLike(collection) {
        var length = getLength(collection);
        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    }
    Scheme.isArrayLike = isArrayLike;
    //
    // equality
    //
    function eq(a, b) {
        return a === b;
    }
    Scheme.eq = eq;
    //export const eq = (a: any, b: any) => a === b;
    //}
    // TODO: Records (etc.)
    function eqv(a, b) {
        return a == b && (typeof (a) == typeof (b));
    }
    Scheme.eqv = eqv;
    function equal(a, b) {
        //TODO: must terminate for cyclic objects
        return Scheme.to_write(a) == Scheme.to_write(b);
    }
    Scheme.equal = equal;
    //
    // comaprator
    //
    // Return true when a < b
    function lt(a, b) {
        //if (typeof a !== typeof b) {
        //    return compareFn(typeof a, typeof b);
        //}
        return a < b;
    }
    Scheme.lt = lt;
})(Scheme || (Scheme = {}));
var Scheme;
(function (Scheme) {
    //
    // R6RS Records
    // http://www.r6rs.org/final/html/r6rs-lib/r6rs-lib-Z-H-7.html#node_chap_6
    //
    // Record is like struct in C, but supports more feature like inheritance.
    // see also: src/library/r6rs_lib.js
    //
    // Record 
    // represents each instance of record type
    //
    //
    // RTD (Record type descriptor)
    //
    class RTD {
        //                   Symbol RTD        Symbol Bool  Bool    Array
        constructor(name, parent_rtd, uid, sealed, opaque, fields) {
            this.name = name;
            // this.name = name;
            this.parent_rtd = parent_rtd;
            this.is_base_type = !parent_rtd;
            if (uid) {
                this.uid = uid;
                this.generative = false;
            }
            else {
                this.uid = this._generate_new_uid();
                ;
                this.generative = true;
            }
            this.sealed = !!sealed;
            this.opaque = parent_rtd.opaque || (!!opaque);
            this.fields = fields.map(field => { return { name: field[0], mutable: !!field[1] }; });
        }
        // Returns the name of the k-th field.
        // Only used for error messages.
        field_name(k) {
            var names = this._field_names();
            for (let par = this.parent_rtd; par; par = par.parent_rtd) {
                names = par._field_names() + names;
            }
            return names[k];
        }
        _field_names() {
            return this.fields.map(spec => spec.name);
        }
        _generate_new_uid() {
            return Scheme.Sym(Scheme.uniqueId("__record_td_uid"));
        }
        toString() {
            return "#<RecordTD " + name + ">";
        }
    }
    RTD.NongenerativeRecords = {};
    Scheme.RTD = RTD;
    //
    // CD (Record constructor descriptor)
    //
    class CD {
        constructor(rtd, parent_cd, protocol) {
            this._check(rtd, parent_cd, protocol);
            this.rtd = rtd;
            this.parent_cd = parent_cd;
            if (protocol) {
                this.has_custom_protocol = true;
                this.protocol = protocol;
            }
            else {
                this.has_custom_protocol = false;
                if (rtd.parent_rtd)
                    this.protocol = this._default_protocol_for_derived_types();
                else
                    this.protocol = this._default_protocol_for_base_types();
            }
        }
        _check(rtd, parent_cd, protocol) {
            if (rtd.is_base_type && parent_cd)
                throw new Error("Record.CD.new: cannot specify parent cd of a base type");
            if (parent_cd && rtd.parent_rtd && (parent_cd.rtd != rtd.parent_rtd))
                throw new Error("Record.CD.new: mismatched parents between rtd and parent_cd");
            if (rtd.parent_rtd && !parent_cd && protocol)
                throw new Error("Record.CD.new: protocol must be #f when parent_cd is not given");
            if (parent_cd && parent_cd.has_custom_protocol && !protocol)
                throw new Error("Record.CD.new: protocol must be specified when parent_cd has a custom protocol");
        }
        _default_protocol_for_base_types() {
            // (lambda (p) p)
            // called with `p' as an argument
            //return function (ar) {
            //    var p = ar[0];
            //    BiwaScheme.assert_procedure(p, "_default_protocol/base");
            //    return p;
            //};
            return new Scheme.FunctionHolder("", 0, 0, function (ar) {
                var p = ar[0];
                Scheme.assert_procedure(p, "_default_protocol/base");
                return p;
            });
            ;
        }
        _default_protocol_for_derived_types() {
            // (lambda (n) 
            //   (lambda (a b x y s t)
            //     (let1 p (n a b x y) (p s t))))
            // called with `n' as an argument
            var rtd = this.rtd;
            return new Scheme.FunctionHolder("", 0, 0, (ar) => {
                var n = ar[0];
                Scheme.assert_procedure(n, "_default_protocol/n");
                var ctor = new Scheme.FunctionHolder("", 0, 0, (args) => {
                    var my_argc = rtd.fields.length;
                    var ancestor_argc = args.length - my_argc;
                    var ancestor_values = args.slice(0, ancestor_argc);
                    var my_values = args.slice(ancestor_argc);
                    // (n a b x y) => p
                    return new Scheme.Call(n, ancestor_values, function (ar) {
                        var p = ar[0];
                        Scheme.assert_procedure(p, "_default_protocol/p");
                        // (p s t) => record
                        return new Scheme.Call(p, my_values, function (ar) {
                            var record = ar[0];
                            Scheme.assert_record(record, "_default_protocol/result");
                            return record;
                        });
                    });
                });
                return ctor;
            });
        }
        toString() {
            return "#<RecordCD " + this.rtd.name + ">";
        }
        record_constructor() {
            //var arg_for_protocol = (this.parent_cd ? this._make_n([], this.rtd) : this._make_p());
            //arg_for_protocol = _.bind(arg_for_protocol, this);
            var arg_for_protocol = (this.parent_cd ? this._make_n([], this.rtd) : this._make_p()); //.bind(this);
            return new Scheme.Call(this.protocol, [arg_for_protocol], function (ar) {
                var ctor = ar[0];
                Scheme.assert_procedure(ctor, "record_constructor");
                return ctor;
            });
        }
        // Create the function `p' which is given to the protocol.
        _make_p() {
            return new Scheme.FunctionHolder("", 0, 0, (values) => {
                return new _Record(this.rtd, values);
                // TODO: check argc 
            });
        }
        // Create the function `n' which is given to the protocol.
        // When creating an instance of a derived type,
        // _make_n is called for each ancestor rtd's.
        _make_n(children_values, rtd) {
            var parent_cd = this.parent_cd;
            if (parent_cd) {
                // called from protocol (n)
                let n = new Scheme.FunctionHolder("", 0, 0, (args_for_n) => {
                    // called from protocol (p)
                    var p = new Scheme.FunctionHolder("", 0, 0, (args_for_p) => {
                        var values = [].concat(args_for_p[0]).concat(children_values);
                        var parent_n = parent_cd._make_n(values, rtd);
                        return new Scheme.Call(parent_cd.protocol, [parent_n], function (ar) {
                            var ctor = ar[0];
                            Scheme.assert_procedure(ctor, "_make_n");
                            return new Scheme.Call(ctor, args_for_n, function (ar) {
                                var record = ar[0];
                                Scheme.assert_record(record);
                                return record;
                            });
                        });
                    });
                    return p;
                });
                return n;
            }
            else {
                let n = new Scheme.FunctionHolder("", 0, 0, (my_values) => {
                    var values = my_values.concat(children_values);
                    return new _Record(rtd, values);
                    // TODO: check argc 
                });
                return n;
            }
        }
    }
    Scheme.CD = CD;
    class _Record {
        constructor(rtd, values) {
            this.rtd = rtd;
            Scheme.assert_record_td(rtd, "new Record");
            // this.rtd = rtd;
            this.fields = values;
        }
        get(k) {
            return this.fields[k];
        }
        set(k, v) {
            this.fields[k] = v;
        }
        toString() {
            var contents = Scheme.to_write(this.fields);
            return "#<Record " + this.rtd.name + " " + contents + ">";
        }
        static define_type(name_str, rtd, cd) {
            return _Record._DefinedTypes[name_str] = { rtd: rtd, cd: cd };
        }
        static get_type(name_str) {
            return _Record._DefinedTypes[name_str];
        }
    }
    // Defined record types
    _Record._DefinedTypes = {};
    _Record.RTD = RTD;
    _Record.CD = CD;
    Scheme._Record = _Record;
    function isRecord(o) {
        return (o instanceof _Record);
    }
    Scheme.isRecord = isRecord;
    function isRecordTD(o) {
        return (o instanceof _Record.RTD);
    }
    Scheme.isRecordTD = isRecordTD;
    function isRecordCD(o) {
        return (o instanceof _Record.CD);
    }
    Scheme.isRecordCD = isRecordCD;
})(Scheme || (Scheme = {}));
var Scheme;
(function (Scheme) {
    //
    // R6RS Enumerations
    // http://www.r6rs.org/final/html/r6rs-lib/r6rs-lib-Z-H-15.html#node_chap_14
    //
    // Example
    //
    //   (define-enumeration color
    //     (black white purple maroon)
    //     color-set)
    //   
    //   (color black)                  ;=> 'black
    //   (color purpel)                 ;=> &syntax exception
    //   (enum-set->list
    //     (color-set maroon white))    ;=> #<enum-set (white maroon)>
    let Enumeration;
    (function (Enumeration) {
        // Represents an enum_type.
        //
        // Becuase there is no way to access an EnumType directly from Scheme,
        // EnumType#to_write is not defined.
        //
        // Properties
        //
        // members - Array of symbols (no duplicate)
        //
        class EnumType {
            constructor(members) {
                // this.members = uniq(members);
                // this.members = uniq(members);
                // �d���폜
                this.members = members.filter((x, i, self) => self.indexOf(x) === i);
            }
            // Returns an EnumSet.
            universe() {
                return new EnumSet(this, this.members);
            }
            // Returns a function which map a symbol to an integer (or #f, if 
            // the symbol is out of the universe).
            // 
            // Implementation note: don't forget this.members may have duplicates.
            indexer() {
                // ar[0] - a symbol
                // Returns an integer or #f.
                return new Scheme.FunctionHolder("", 0, 0, (ar) => {
                    Scheme.assert_symbol(ar[0], "(enum-set indexer)");
                    var idx = this.members.indexOf(ar[0]);
                    return (idx === -1) ? false : idx;
                });
            }
            // Retuns a function which creates an enum_set from a list of
            // symbols (Symbols may be duplicate.)
            _constructor() {
                // ar[0] - a list of symbol
                // Returns a enum_set.
                return new Scheme.FunctionHolder("", 0, 0, (ar) => {
                    Scheme.assert_list(ar[0], "(enum-set constructor)");
                    var symbols = ar[0].to_array();
                    symbols.forEach((arg) => {
                        Scheme.assert_symbol(arg, "(enum-set constructor)");
                    });
                    return new EnumSet(this, symbols);
                });
            }
        }
        Enumeration.EnumType = EnumType;
        //(BiwaScheme as any).Class.memoize(BiwaScheme.Enumeration.EnumType,
        //    ["universe", "indexer", "_constructor"]);
        // Represents an enum_set of an enum_type.
        //
        // Properties
        //
        // enum_type - The enum_type.
        // symbols   - Array of symbols (no duplicate, properly ordered)
        //
        class EnumSet {
            constructor(enum_type, symbols) {
                this.enum_type = enum_type;
                //this.symbols = filter(enum_type.members, function (sym) {
                //    return include(symbols, sym);
                //});
                this.symbols = enum_type.members.filter(sym => symbols.includes(sym));
            }
            // Returns a list of symbols.
            symbol_list() {
                return Scheme.array_to_list(this.symbols);
            }
            // Returns true if the enum_set includes the symbol.
            // 'symbol' is allowed to be a symbol which is not included in the universe.
            is_member(symbol) {
                return this.symbols.includes(symbol);
            }
            // Returns true if:
            // - the enum_set is a subset of the enum_set 'other', and
            // - the universe of the enum_set is a subset of 
            //   the universe of 'other'.
            // The enum_set and 'other' may belong to different enum_type.
            is_subset(other) {
                // Check elements
                //if (any(this.symbols, function (sym) {
                //    return !include(other.symbols, sym);
                //})) {
                //    return false;
                //}
                if (this.symbols.some(sym => !other.symbols.includes(sym))) {
                    return false;
                }
                // Check universe
                if (this.enum_type === other.enum_type) {
                    return true;
                }
                else {
                    //return all(this.enum_type.members, function(sym) {
                    //    return include(other.enum_type.members, sym);
                    //});
                    return this.enum_type.members.every((sym) => {
                        return other.enum_type.members.includes(sym);
                    });
                }
            }
            // Returns true if:
            //   - the enum_set contains the same set of symbols as 'other', and
            //   - universe of the enum_set contains the same set of symbols
            //     as the universe of 'other'.
            //
            // The enum_set and 'other' may belong to different enum_type.
            equal_to(other) {
                return this.is_subset(other) && other.is_subset(this);
            }
            // Returns a enum_set which has:
            // - all the symbols included in the enum_set or the enum_set 'other'.
            // The enum_set and 'other' *must* belong to the same enum_type.
            union(other) {
                //var syms = filter(this.enum_type.members, (sym) => {
                //    return include(this.symbols, sym) ||
                //        include(other.symbols, sym);
                //});
                var syms = this.enum_type.members.filter(sym => this.symbols.includes(sym) || other.symbols.includes(sym));
                return new EnumSet(this.enum_type, syms);
            }
            // Returns a enum_set which has:
            // - the symbols included both in the enum_set or the enum_set 'other'.
            // The enum_set and 'other' *must* belong to the same enum_type.
            intersection(other) {
                //var syms = filter(this.symbols, function (sym) {
                //    return include(other.symbols, sym);
                //});
                var syms = this.symbols.filter(sym => other.symbols.includes(sym));
                return new EnumSet(this.enum_type, syms);
            }
            // Returns a enum_set which has:
            // - the symbols included in the enum_set and not in the enum_set 'other'.
            // The enum_set and 'other' *must* belong to the same enum_type.
            difference(other) {
                //var syms = filter(this.symbols, function (sym) {
                //    return !include(other.symbols, sym);
                //});
                var syms = this.symbols.filter(sym => !other.symbols.includes(sym));
                return new EnumSet(this.enum_type, syms);
            }
            // Returns a enum_set which has:
            // - the symbols included in the universe but not in the enum_set.
            complement() {
                //var syms = filter(this.enum_type.members, ((sym) => {
                //    return !include(this.symbols, sym);
                //}));
                var syms = this.enum_type.members.filter(sym => !this.symbols.includes(sym));
                return new EnumSet(this.enum_type, syms);
            }
            // Returns a enum_set which has:
            // - the symbols included in the enum_set and the universe of the enum_set 'other'.
            // The enum_set and 'other' may belong to different enum_type.
            projection(other) {
                // var syms = (this.symbols as any[]).filter(sym => include(other.enum_type.members, sym));
                var syms = this.symbols.filter(sym => other.enum_type.members.includes(sym));
                return new EnumSet(other.enum_type, syms);
            }
            // Returns a string which represents the enum_set.
            toString() {
                return "#<EnumSet " + Scheme.inspect(this.symbols) + ">";
            }
        }
        Enumeration.EnumSet = EnumSet;
        // (BiwaScheme as any).Class.memoize(BiwaScheme.Enumeration.EnumSet, "symbol_list");
    })(Enumeration = Scheme.Enumeration || (Scheme.Enumeration = {}));
    function isEnumSet(obj) {
        return (obj instanceof Enumeration.EnumSet);
    }
    Scheme.isEnumSet = isEnumSet;
})(Scheme || (Scheme = {}));
var Scheme;
(function (Scheme) {
    //
    // R7RS Promise (lazy library)
    //
    class _Promise {
        constructor(done, thunk_or_value) {
            this.box = [done, thunk_or_value];
        }
        // Return true when this promise is already calculated
        is_done() {
            return this.box[0];
        }
        // Return calculated value of this promise
        value() {
            if (!this.is_done()) {
                throw new Scheme.Bug("this promise is not calculated yet");
            }
            return this.box[1];
        }
        thunk() {
            if (this.is_done()) {
                throw new Scheme.Bug("this promise does not know the thunk");
            }
            return this.box[1];
        }
        update_with(new_promise) {
            this.box[0] = new_promise.box[0];
            this.box[1] = new_promise.box[1];
            new_promise.box = this.box;
        }
        // Create fresh promise
        static fresh(thunk) {
            return new _Promise(false, thunk);
        }
        ;
        // Create calculated promise
        static done(value) {
            return new _Promise(true, value);
        }
        ;
    }
    Scheme._Promise = _Promise;
    function isPromise(obj) {
        return (obj instanceof _Promise);
    }
    Scheme.isPromise = isPromise;
})(Scheme || (Scheme = {}));
var Scheme;
(function (Scheme) {
    //
    // Port
    //
    //export interface Input {
    //    put_string(str: string): void;
    //}
    //export interface Output {
    //    get_string(after: any): void;
    //}
    // (eof-object)
    Scheme.eof = new Object;
    //
    // string ports (srfi-6)
    //
    class Port {
        constructor(is_input, is_output) {
            this.is_input = is_input;
            this.is_output = is_output;
            this.is_open = true;
            this.is_binary = false; //??
            // this.is_open = true;
            // this.is_binary = false; //??
            // this.is_input = is_in;
            // this.is_output = is_out;
        }
        close() {
            // close port
            this.is_open = false;
        }
        inspect() {
            return "#<Port>";
        }
        to_write() {
            return "#<Port>";
        }
        put_string(str) {
        }
    }
    Scheme.Port = Port;
    class StringOutput extends Port {
        constructor() {
            super(false, true);
            this.buffer = [];
            // this.buffer = [];
        }
        put_string(str) {
            this.buffer.push(str);
        }
        output_string(str) {
            return this.buffer.join("");
        }
    }
    Scheme.StringOutput = StringOutput;
    class StringInput extends Port {
        constructor(str) {
            super(true, false);
            this.str = str;
            // this.str = str;
        }
        get_string(after) {
            return after(this.str);
        }
    }
    Scheme.StringInput = StringInput;
    class NullInput extends Port {
        constructor() {
            super(true, false);
        }
        get_string(after) {
            // Never give them anything!
            return after('');
        }
    }
    Scheme.NullInput = NullInput;
    class NullOutput extends Port {
        constructor(output_function) {
            super(false, true);
            this.output_function = output_function;
            // this.output_function = output_function;
        }
        put_string(str) { }
    }
    Scheme.NullOutput = NullOutput;
    class CustomOutput extends Port {
        constructor(output_function) {
            super(false, true);
            this.output_function = output_function;
            // this.output_function = output_function;
        }
        put_string(str) {
            this.output_function(str);
        }
    }
    Scheme.CustomOutput = CustomOutput;
    class CustomInput extends Port {
        constructor(input_function) {
            super(true, false);
            this.input_function = input_function;
            // this.input_function = input_function;
        }
        get_string(after) {
            var input_function = this.input_function;
            return new Scheme.Pause(function (pause) {
                input_function(function (input) {
                    pause.resume(after(input));
                });
            });
        }
    }
    Scheme.CustomInput = CustomInput;
    // User must set the current input/output
    Port.current_input = new NullInput();
    Port.current_output = new NullOutput();
    Port.current_error = new NullOutput();
    function isPort(obj) {
        return (obj instanceof Port);
    }
    Scheme.isPort = isPort;
})(Scheme || (Scheme = {}));
/// <reference path="../system/functionHolder.ts" />
/// <reference path="../system/syntax.ts" />
/// <reference path="../system/_types.ts" />
/// <reference path="../system/record.ts" />
/// <reference path="../system/enumeration.ts" />
/// <reference path="../system/promise.ts" />
/// <reference path="../system/port.ts" />
var Scheme;
(function (Scheme) {
    ///
    /// infra.js - Basis for library functions
    ///
    //
    // define_*func - define library functions
    //
    function define_libfunc(fname, min, max, func) {
        Scheme.CoreEnv[fname] = new Scheme.FunctionHolder(fname, min, max, func);
    }
    Scheme.define_libfunc = define_libfunc;
    function alias_libfunc(fname, aliases) {
        if (Scheme.CoreEnv[fname]) {
            if (Scheme.isArray(aliases)) {
                // map(aliases, function(a) { BiwaScheme.alias_libfunc(fname, a); });
                aliases.map((value) => { alias_libfunc(fname, value); });
            }
            else if (Scheme.isString(aliases)) {
                Scheme.CoreEnv[aliases] = Scheme.CoreEnv[fname];
            }
            else {
                console.error("[BUG] bad alias for library function " +
                    "`" + fname + "': " + aliases.toString());
            }
        }
        else {
            console.error("[BUG] library function " +
                "`" + fname + "'" +
                " does not exist, so can't alias it.");
        }
    }
    Scheme.alias_libfunc = alias_libfunc;
    function define_syntax(sname, func) {
        var s = new Scheme.Syntax(sname, func);
        Scheme.CoreEnv[sname] = s;
    }
    Scheme.define_syntax = define_syntax;
    function define_scmfunc(fname, min, max, str) {
        (new Scheme.Interpreter).evaluate("(define " + fname + " " + str + "\n)");
    }
    Scheme.define_scmfunc = define_scmfunc;
    //  define_scmfunc("map+", 2, null, 
    //    "(lambda (proc ls) (if (null? ls) ls (cons (proc (car ls)) (map proc (cdr ls)))))");
    //
    // assertions - type checks
    //
    /*export*/ function make_assert(check) {
        return function (...args /*args*/) {
            //var fname = arguments.callee.caller
            //    ? (arguments.callee.caller as any).fname
            //    : "";
            const fname = "";
            check.apply(this, [fname].concat(Scheme.toArray(arguments)));
        };
    }
    /*export*/ function make_simple_assert(type, test, _fname) {
        return make_assert(function (fname, obj, opt) {
            if (_fname)
                fname = _fname;
            let option = opt ? ("(" + opt + ")") : "";
            if (!test(obj)) {
                throw new Scheme._Error(fname + option + ": " + type + " required, but got " + Scheme.to_write(obj));
            }
        });
    }
    Scheme.assert_number = make_simple_assert("number", function (obj) {
        return typeof (obj) == 'number' || (obj instanceof Scheme.Complex);
    });
    Scheme.assert_integer = make_simple_assert("integer", function (obj) {
        return typeof (obj) == 'number' && (obj % 1 == 0);
    });
    Scheme.assert_real = make_simple_assert("real number", function (obj) {
        return typeof (obj) == 'number';
    });
    Scheme.assert_between = make_assert(function (fname, obj, from, to) {
        if (typeof (obj) != 'number' || obj != Math.round(obj)) {
            throw new Scheme._Error(fname + ": " +
                "number required, but got " +
                Scheme.to_write(obj));
        }
        if (obj < from || to < obj) {
            throw new Scheme._Error(fname + ": " +
                "number must be between " +
                from + " and " + to + ", but got " +
                Scheme.to_write(obj));
        }
    });
    Scheme.assert_string = make_simple_assert("string", Scheme.isString);
    Scheme.assert_char = make_simple_assert("character", Scheme.isChar);
    Scheme.assert_symbol = make_simple_assert("symbol", Scheme.isSymbol);
    Scheme.assert_port = make_simple_assert("port", Scheme.isPort);
    Scheme.assert_pair = make_simple_assert("pair", Scheme.isPair);
    Scheme.assert_list = make_simple_assert("list", Scheme.isList);
    Scheme.assert_vector = make_simple_assert("vector", Scheme.isVector);
    Scheme.assert_hashtable = make_simple_assert("hashtable", Scheme.isHashtable);
    //    /*export*/ var assert_mutable_hashtable = make_simple_assert("mutable hashtable", isMutableHashtable);
    Scheme.assert_record = make_simple_assert("record", Scheme.isRecord);
    Scheme.assert_record_td = make_simple_assert("record type descriptor", Scheme.isRecordTD);
    Scheme.assert_record_cd = make_simple_assert("record constructor descriptor", Scheme.isRecordCD);
    Scheme.assert_enum_set = make_simple_assert("enum_set", Scheme.isEnumSet);
    Scheme.assert_promise = make_simple_assert("promise", Scheme.isPromise);
    Scheme.assert_function = make_simple_assert("JavaScript function", Scheme.isFunction);
    Scheme.assert_closure = make_simple_assert("scheme function", Scheme.isClosure);
    Scheme.assert_procedure = make_simple_assert("scheme/js function", function (obj) {
        return Scheme.isClosure(obj) || Scheme.isFunction(obj);
    });
    Scheme.assert_date = make_simple_assert("date", function (obj) {
        // FIXME: this is not accurate (about cross-frame issue)
        // https://prototype.lighthouseapp.com/projects/8886/tickets/443
        return obj instanceof Date;
    });
    //var assert_instance_of = BiwaScheme.make_assert(function(fname, type, obj, klass){
    //  if(!(obj instanceof klass)){
    //    throw new BiwaScheme.Error(fname + ": " +
    //                               type + " required, but got " +
    //                               BiwaScheme.to_write(obj));
    //  }
    //});
    Scheme.assert = make_assert(function (fname, success, message, _fname) {
        if (!success) {
            throw new Scheme._Error((_fname || fname) + ": " + message);
        }
    });
    //
    // deprecation
    //
    // Show deprecation warnig
    // @param {string} title - feature to be deprecated
    // @param {string} ver - when it will be removed (eg. "1.0")
    // @param {string} alt - alternatives
    function deprecate(title, ver, alt) {
        if (Scheme.suppress_deprecation_warning)
            return;
        var msg = title + " is deprecated and will be removed in BiwaScheme " + ver + ". " +
            "Please use " + alt + " instead";
        console.warn(msg);
    }
    Scheme.deprecate = deprecate;
    ;
    //
    // utils
    //
    // Parses a fractional notation in the format: <num>/<denom> (e.g. 3/7, -9/4),
    // where <num> is a valid integer notation, and <denom> is a valid notation
    // for a positive integer.
    //
    // Returns a float if the notation is valid, otherwise false.
    //
    // @param {string} rep - the string representation of the fraction
    // @return {float|false}
    function parse_fraction(rep) {
        Scheme.assert_string(rep);
        var frac_parts = rep.split('/');
        if (frac_parts.length !== 2)
            return false;
        var num_rep = frac_parts[0];
        var denom_rep = frac_parts[1];
        var num = parse_integer(num_rep, 10);
        var denom = parse_integer(denom_rep, 10);
        if (num === false || denom === false)
            return false;
        if (denom <= 0)
            return false;
        return num / denom;
    }
    Scheme.parse_fraction = parse_fraction;
    ;
    // Given a string notation of an integer, and the radix, validates the
    // notation: returns true if the notation is valid, otherwise false.
    //
    // @param {string} rep - the string representation of the integer
    // @param {integer} rdx - the radix, where 2 <= rdx <= 36
    // @return {boolean}
    function is_valid_integer_notation(rep, rdx) {
        Scheme.assert_string(rep);
        Scheme.assert_integer(rdx);
        if (rdx < 2 || rdx > 36)
            return false;
        var rdx_symbols = '0123456789abcdefghijklmnopqrstuvwxyz';
        var valid_symbols = rdx_symbols.slice(0, rdx);
        var sym_regex = new RegExp('^[+-]?' + '[' + valid_symbols + ']+$', 'ig');
        return sym_regex.test(rep);
    }
    Scheme.is_valid_integer_notation = is_valid_integer_notation;
    // Parse an integer. If the integer does not have a valid representation, or
    // produces NaN, - false is returned. If the radix is not within [2..36]
    // range, false is returned as well.
    //
    // @param {string} rep - the string representation of the integer
    // @param {integer} rdx - the radix, where 2 <= rdx <= 36
    // @return {integer|false}
    function parse_integer(rep, rdx) {
        Scheme.assert_string(rep);
        Scheme.assert_integer(rdx);
        if (rdx < 2 || rdx > 36)
            return false;
        if (!is_valid_integer_notation(rep, rdx))
            return false;
        var res = parseInt(rep, rdx);
        if ( /*Number.*/isNaN(res))
            return false;
        return res;
    }
    Scheme.parse_integer = parse_integer;
    ;
    // Given a string notation of a floating-point number in the standard or
    // scientific notation, returns true if the notation valid, otherwise false.
    //
    // For example:
    // "1"      -> true
    // "1."     -> true
    // "1.23"   -> true
    // "1e4"    -> true
    // "1E4"    -> true
    // "1E4.34" -> false
    // "e34"    -> false
    //
    // @param {string} rep - the string representation of the float.
    // @return {boolean}
    function is_valid_float_notation(rep) {
        Scheme.assert_string(rep);
        var sci_regex = /^[+-]?[0-9]+[.]?[0-9]*e[+-]?[0-9]+$/i;
        var fp_regex = /(^[+-]?[0-9]*[.][0-9]+$)|(^[+-]?[0-9]+[.][0-9]*$)/;
        if (sci_regex.test(rep) || fp_regex.test(rep))
            return true;
        return is_valid_integer_notation(rep, 10);
    }
    Scheme.is_valid_float_notation = is_valid_float_notation;
    ;
    // Parse a floating-point number. If the floating-point number does not have a
    // valid representation, or produces -Infinity, +Infinity or NaN, - false is
    // returned.
    //
    // @param {string} rep - the string representation of the floating-point value
    // @return {float|false}
    function parse_float(rep) {
        Scheme.assert_string(rep);
        if (!is_valid_float_notation(rep))
            return false;
        var res = new Number(rep).valueOf();
        if ( /*Number.*/isNaN(res))
            return false;
        if (!isFinite(res))
            return false;
        return res;
    }
    Scheme.parse_float = parse_float;
    ;
})(Scheme || (Scheme = {}));
/// <reference path="./infra.ts" />
var Scheme;
(function (Scheme) {
    Scheme.define_libfunc("html-escape", 1, 1, function (ar) {
        Scheme.assert_string(ar[0]);
        return Scheme._escape(ar[0]);
    });
    /*export*/ function inspect_objs(objs) {
        return objs.map(Scheme.inspect).join(", ");
    }
    ;
    Scheme.define_libfunc("inspect", 1, null, function (ar) {
        return inspect_objs(ar);
    });
    Scheme.define_libfunc("inspect!", 1, null, function (ar) {
        Scheme._Console.puts(inspect_objs(ar));
        return Scheme.undef;
    });
    //
    // json
    //
    // json->sexp
    // Array -> list
    // Object -> alist
    // (number, boolean, string, 
    //
    /*export*/ function json2sexp(json) {
        switch (true) {
            case Scheme.isNumber(json) ||
                Scheme.isString(json) ||
                json === true || json === false:
                return json;
            case Scheme.isArray(json):
                return Scheme.array_to_list(json.map(json2sexp));
            case typeof (json) == "object":
                var ls = Scheme.nil;
                for (let key in json) {
                    ls = new Scheme.Pair(new Scheme.Pair(key, json2sexp(json[key])), ls);
                }
                return ls;
            default:
                throw new Error("json->sexp: detected invalid value for json: " + Scheme.inspect(json));
        }
        // throw new Bug("must not happen");
    }
    Scheme.define_libfunc("json->sexp", 1, 1, function (ar) {
        return json2sexp(ar[0]);
    });
    // (vector-push! v item1 item2 ...)
    Scheme.define_libfunc("vector-push!", 2, null, function (ar) {
        Scheme.assert_vector(ar[0]);
        for (var i = 1; i < ar.length; i++) {
            ar[0].push(ar[i]);
        }
        return ar[0];
    });
    //
    //from Gauche
    //
    // (identity obj)
    // Returns obj.
    Scheme.define_libfunc("identity", 1, 1, function (ar) {
        return ar[0];
    });
    // (inc! i)
    // = (begin (set! i (+ i 1)) i)
    // Increments i (i.e., set i+1 to i).
    Scheme.define_syntax("inc!", function (x) {
        var target = x.cdr.car;
        return Scheme.List(Scheme.Sym("begin"), Scheme.List(Scheme.Sym("set!"), target, Scheme.List(Scheme.Sym("+"), target, 1)), target);
    });
    // (dec! i)
    // = (begin (set! i (- i 1)) i)
    // Decrements i (i.e., set i-1 to i).
    Scheme.define_syntax("dec!", function (x) {
        var target = x.cdr.car;
        return Scheme.List(Scheme.Sym("begin"), Scheme.List(Scheme.Sym("set!"), target, Scheme.List(Scheme.Sym("-"), target, 1)), target);
    });
    // string
    Scheme.define_libfunc("string-concat", 1, 1, function (ar) {
        Scheme.assert_list(ar[0]);
        return ar[0].to_array().join("");
    });
    Scheme.define_libfunc("string-split", 2, 2, function (ar) {
        Scheme.assert_string(ar[0]);
        Scheme.assert_string(ar[1]);
        return Scheme.array_to_list(ar[0].split(ar[1]));
    });
    Scheme.define_libfunc("string-join", 1, 2, function (ar) {
        Scheme.assert_list(ar[0]);
        var delim = "";
        if (ar[1]) {
            Scheme.assert_string(ar[1]);
            delim = ar[1];
        }
        return ar[0].to_array().join(delim);
    });
    // lists
    Scheme.define_libfunc("intersperse", 2, 2, function (ar) {
        var item = ar[0], ls = ar[1];
        Scheme.assert_list(ls);
        var ret = [];
        ls.to_array().reverse().forEach((x) => {
            ret.push(x);
            ret.push(item);
        });
        ret.pop();
        return Scheme.array_to_list(ret);
    });
    Scheme.define_libfunc("map-with-index", 2, null, function (ar) {
        var proc = ar.shift(), lists = ar;
        // _.each(lists, assert_list);
        lists.forEach(Scheme.assert_list);
        var results = [], i = 0;
        return Scheme.Call.multi_foreach(lists, {
            call: function (xs) {
                var args = xs.map((x) => { return x.car; });
                args.unshift(i);
                i++;
                return new Scheme.Call(proc, args);
            },
            result: function (res) { results.push(res); },
            finish: function () { return Scheme.array_to_list(results); }
        });
    });
    // loop
    // (dotimes (variable limit result) body ...)
    // Iterate with variable 0 to limit-1.
    // ->
    //    (do ((tlimit limit)
    //         (variable 0 (+ variable 1)))
    //        ((>= variable tlimit) result)
    //      body ...)
    Scheme.define_syntax("dotimes", function (x) {
        var spec = x.cdr.car, bodies = x.cdr.cdr;
        var variable = spec.car, limit = spec.cdr.car, result = spec.cdr.cdr.car;
        var tlimit = Scheme.gensym();
        var do_vars = Scheme.deep_array_to_list([[tlimit, limit],
            [variable, 0, [Scheme.Sym("+"), variable, 1]]]);
        var do_check = Scheme.deep_array_to_list([[Scheme.Sym(">="), variable, tlimit], result]);
        return new Scheme.Pair(Scheme.Sym("do"), new Scheme.Pair(do_vars, new Scheme.Pair(do_check, bodies)));
    });
    // sorting (Obsolete: use list-sort, etc. instead of these.)
    // utility function. takes a JS Array and a Scheme procedure,
    // returns sorted array
    var sort_with_comp = function (ary, proc, intp) {
        return ary.sort(function (a, b) {
            var intp2 = new Scheme.Interpreter(intp);
            return intp2.invoke_closure(proc, [a, b]);
        });
    };
    Scheme.define_libfunc("list-sort/comp", 1, 2, function (ar, intp) {
        Scheme.assert_procedure(ar[0]);
        Scheme.assert_list(ar[1]);
        return Scheme.array_to_list(sort_with_comp(ar[1].to_array(), ar[0], intp));
    });
    Scheme.define_libfunc("vector-sort/comp", 1, 2, function (ar, intp) {
        Scheme.assert_procedure(ar[0]);
        Scheme.assert_vector(ar[1]);
        return sort_with_comp(Scheme.clone(ar[1]), ar[0], intp);
    });
    Scheme.define_libfunc("vector-sort/comp!", 1, 2, function (ar, intp) {
        Scheme.assert_procedure(ar[0]);
        Scheme.assert_vector(ar[1]);
        sort_with_comp(ar[1], ar[0], intp);
        return Scheme.undef;
    });
    // macros
    //(define-macro (foo x y) body ...)
    //(define-macro foo lambda)
    var rearrange_args = function (expected, given) {
        var args = [];
        var dotpos = (new Scheme.Compiler).find_dot_pos(expected);
        if (dotpos == -1)
            args = given;
        else {
            for (var i = 0; i < dotpos; i++) {
                args[i] = given[i];
            }
            args[i] = Scheme.array_to_list(given.slice(i));
        }
        return args;
    };
    Scheme.define_syntax("define-macro", function (x) {
        var head = x.cdr.car;
        var expected_args;
        if (head instanceof Scheme.Pair) {
            var name = head.car;
            expected_args = head.cdr;
            var body = x.cdr.cdr;
            var lambda = new Scheme.Pair(Scheme.Sym("lambda"), new Scheme.Pair(expected_args, body));
        }
        else {
            var name = head;
            var lambda = x.cdr.cdr.car;
            expected_args = lambda.cdr.car;
        }
        //[close, n_frees, do_body, next]
        var opc = Scheme.Compiler.compile(lambda);
        if (opc[1] != 0)
            throw new Scheme.Bug("you cannot use free variables in macro expander (or define-macro must be on toplevel)");
        var cls = [opc[2]];
        Scheme.TopEnv[name.name] = new Scheme.Syntax(name.name, function (sexp) {
            var given_args = sexp.to_array();
            given_args.shift();
            var intp = new Scheme.Interpreter();
            var args = rearrange_args(expected_args, given_args);
            var result = intp.invoke_closure(cls, args);
            return result;
        });
        return Scheme.undef;
    });
    var macroexpand_1 = function (x) {
        if (x instanceof Scheme.Pair) {
            if (x.car instanceof Scheme._Symbol && Scheme.TopEnv[x.car.name] instanceof Scheme.Syntax) {
                var transformer = Scheme.TopEnv[x.car.name];
                x = transformer.transform(x);
            }
            else
                throw new Error("macroexpand-1: `" + Scheme.to_write_ss(x) + "' is not a macro");
        }
        return x;
    };
    Scheme.define_syntax("%macroexpand", function (x) {
        var expanded = Scheme.Interpreter.expand(x.cdr.car);
        return Scheme.List(Scheme.Sym("quote"), expanded);
    });
    Scheme.define_syntax("%macroexpand-1", function (x) {
        var expanded = macroexpand_1(x.cdr.car);
        return Scheme.List(Scheme.Sym("quote"), expanded);
    });
    Scheme.define_libfunc("macroexpand", 1, 1, function (ar) {
        return Scheme.Interpreter.expand(ar[0]);
    });
    Scheme.define_libfunc("macroexpand-1", 1, 1, function (ar) {
        return macroexpand_1(ar[0]);
    });
    Scheme.define_libfunc("gensym", 0, 0, function (ar) {
        return Scheme.gensym();
    });
    // i/o
    Scheme.define_libfunc("print", 1, null, function (ar) {
        ar.map(function (item) {
            Scheme._Console.puts(Scheme.to_display(item), true);
        });
        Scheme._Console.puts(""); //newline
        return Scheme.undef;
    });
    Scheme.define_libfunc("write-to-string", 1, 1, function (ar) {
        return Scheme.to_write(ar[0]);
    });
    Scheme.define_libfunc("read-from-string", 1, 1, function (ar) {
        Scheme.assert_string(ar[0]);
        return Scheme.Interpreter.read(ar[0]);
    });
    Scheme.define_libfunc("port-closed?", 1, 1, function (ar) {
        Scheme.assert_port(ar[0]);
        return !(ar[0].is_open);
    });
    //define_libfunc("with-input-from-port", 2, 2, function(ar){
    //define_libfunc("with-error-to-port", 2, 2, function(ar){
    Scheme.define_libfunc("with-output-to-port", 2, 2, function (ar) {
        var port = ar[0], proc = ar[1];
        Scheme.assert_port(port);
        Scheme.assert_procedure(proc);
        var original_port = Scheme.Port.current_output;
        Scheme.Port.current_output = port;
        return new Scheme.Call(proc, [port], function (ar) {
            port.close();
            Scheme.Port.current_output = original_port;
            return ar[0];
        });
    });
    // syntax
    Scheme.define_syntax("let1", function (x) {
        //(let1 vari expr body ...) 
        //=> ((lambda (var) body ...) expr)
        var vari = x.cdr.car;
        var expr = x.cdr.cdr.car;
        var body = x.cdr.cdr.cdr;
        return new Scheme.Pair(new Scheme.Pair(Scheme.Sym("lambda"), new Scheme.Pair(new Scheme.Pair(vari, Scheme.nil), body)), new Scheme.Pair(expr, Scheme.nil));
    });
    //
    // Regular Expression
    //
    var assert_regexp = function (obj, fname) {
        if (!(obj instanceof RegExp))
            throw new Error(fname + ": regexp required, but got " + Scheme.to_write(obj));
    };
    //Function: string->regexp string &keyword case-fold 
    Scheme.define_libfunc("string->regexp", 1, 1, function (ar) {
        Scheme.assert_string(ar[0], "string->regexp");
        return new RegExp(ar[0]); //todo: case-fold
    });
    //Function: regexp? obj 
    Scheme.define_libfunc("regexp?", 1, 1, function (ar) {
        return (ar[0] instanceof RegExp);
    });
    //Function: regexp->string regexp 
    Scheme.define_libfunc("regexp->string", 1, 1, function (ar) {
        assert_regexp(ar[0], "regexp->string");
        return ar[0].toString().slice(1, -1); //cut '/' 
    });
    Scheme.define_libfunc("regexp-exec", 2, 2, function (ar) {
        var rexp = ar[0];
        if (Scheme.isString(ar[0])) {
            rexp = new RegExp(ar[0]);
        }
        assert_regexp(rexp, "regexp-exec");
        Scheme.assert_string(ar[1], "regexp-exec");
        var ret = rexp.exec(ar[1]);
        return (ret === null) ? false : Scheme.array_to_list(ret);
    });
    //  //Function: rxmatch regexp string 
    //  define_libfunc("rxmatch", 1, 1, function(ar){
    //    assert_regexp(ar[0], "rxmatch");
    //    assert_string(ar[1], "rxmatch");
    //    return ar[0].match(ar[1]);
    //  });
    //Function: rxmatch-start match &optional (i 0) 
    //Function: rxmatch-end match &optional (i 0) 
    //Function: rxmatch-substring match &optional (i 0) 
    //Function: rxmatch-num-matches match   
    //Function: rxmatch-after match &optional (i 0) 
    //Function: rxmatch-before match &optional (i 0) 
    //Generic application: regmatch &optional index 
    //Generic application: regmatch 'before &optional index 
    //Generic application: regmatch 'after &optional index 
    //Function: regexp-replace regexp string substitution 
    // regexp-replace-all regexp string substitution 
    Scheme.define_libfunc("regexp-replace-all", 3, 3, function (ar) {
        var pat = ar[0];
        if (Scheme.isString(pat)) {
            var rexp = new RegExp(pat, "g");
        }
        else {
            assert_regexp(pat);
            var rexp = new RegExp(pat.source, "g");
        }
        Scheme.assert_string(ar[1]);
        Scheme.assert_string(ar[2]);
        return ar[1].replace(rexp, ar[2]);
    });
    //Function: regexp-replace* string rx1 sub1 rx2 sub2 ... 
    //Function: regexp-replace-all* string rx1 sub1 rx2 sub2 ... 
    //Function: regexp-quote string 
    //Macro: rxmatch-let match-expr (var ...) form ... 
    //Macro: rxmatch-if match-expr (var ...) then-form else-form 
    //Macro: rxmatch-cond clause ... 
    //Macro: rxmatch-case string-expr clause ... 
    function init2() {
    }
    Scheme.init2 = init2;
})(Scheme || (Scheme = {}));
var Scheme;
(function (Scheme) {
    //
    // interface to javascript
    //
    Scheme.define_libfunc("js-eval", 1, 1, function (ar) {
        return eval(ar[0]);
    });
    Scheme.define_libfunc("js-ref", 2, 2, function (ar) {
        if (Scheme.isString(ar[1])) {
            return ar[0][ar[1]];
        }
        else {
            Scheme.assert_symbol(ar[1]);
            return ar[0][ar[1].name];
        }
    });
    Scheme.define_libfunc("js-set!", 3, 3, function (ar) {
        Scheme.assert_string(ar[1]);
        ar[0][ar[1]] = ar[2];
        return Scheme.undef;
    });
    // (js-call (js-eval "Math.pow") 2 4)
    Scheme.define_libfunc("js-call", 1, null, function (ar) {
        var js_func = ar.shift();
        Scheme.assert_function(js_func);
        var receiver = null;
        return js_func.apply(receiver, ar);
    });
    // (js-invoke (js-new "Date") "getTime")
    Scheme.define_libfunc("js-invoke", 2, null, function (ar) {
        var js_obj = ar.shift();
        var func_name = ar.shift();
        if (!Scheme.isString(func_name)) {
            Scheme.assert_symbol(func_name);
            func_name = func_name.name;
        }
        if (js_obj[func_name])
            return js_obj[func_name].apply(js_obj, ar);
        else
            throw new Error("js-invoke: function " + func_name + " is not defined");
    });
    // Short hand for JavaScript method call.
    //
    // (js-invocation obj '(foo 1 2 3))  ;=> obj.foo(1,2,3)
    // (js-invocation obj '(foo 1 2 3)   ;=> obj.foo(1,2,3)
    //                    'bar           ;      .bar
    //                    '(baz 4 5))    ;      .baz(4,5)
    // (js-invocation 'Math '(pow 2 3))  ;=> Math.pow(2,3)
    //
    // It also converts
    //   (lambda (e) ...) to
    //   (js-closure (lambda (e) ...))
    //   and
    //   '((a . b) (c . 4)) to
    //   {a: "b", c: 4}
    //
    Scheme.define_libfunc("js-invocation", 2, null, function (ar, intp) {
        var receiver = ar.shift();
        // TODO: convert lambdas by js-closure 
        if (Scheme.isSymbol(receiver)) {
            receiver = eval(receiver.name); //XXX: is this ok?
        }
        var v = receiver;
        // Process each method call
        ar.forEach((callspec) => {
            if (Scheme.isSymbol(callspec)) {
                // Property access
                v = v[callspec.name];
            }
            else if (Scheme.isList(callspec)) {
                // Method call
                var args = callspec.to_array();
                Scheme.assert_symbol(args[0]);
                var method = args.shift().name;
                // Convert arguments
                args = args.map((arg) => {
                    if (Scheme.isClosure(arg)) {
                        // closure -> JavaScript funciton
                        return js_closure(arg, intp);
                    }
                    else if (Scheme.isList(arg)) {
                        // alist -> JavaScript Object
                        var o = {};
                        arg.foreach(function (pair) {
                            Scheme.assert_symbol(pair.car);
                            o[pair.car.name] = pair.cdr;
                        });
                        return o;
                    }
                    else
                        return arg;
                });
                // Call the method
                if (!Scheme.isFunction(v[method])) {
                    throw new Scheme._Error("js-invocation: the method `" + method + "' not found");
                }
                v = v[method].apply(v, args);
            }
            else {
                // (wrong argument)
                throw new Scheme._Error("js-invocation: expected list or symbol for callspec but got " + Scheme.inspect(callspec));
            }
        });
        return v;
    });
    // TODO: provide corresponding macro ".." 
    Scheme.define_syntax("..", function (x) {
        if (x.cdr == Scheme.nil) {
            throw new Error("malformed ..");
        }
        return new Scheme.Pair(Scheme.Sym("js-invocation"), x.cdr);
    });
    // (js-new (js-eval "Date") 2005 1 1)
    // (js-new (js-eval "Draggable") elem 'onEnd (lambda (drg) ...))
    //   If symbol is given, following arguments are converted to 
    //   an js object. If any of them is a scheme closure,
    //   it is converted to js function which invokes that closure.
    //
    // (js-new "Date" 2005 1 1)
    //   You can pass javascript program string for constructor.
    Scheme.define_libfunc("js-new", 1, null, function (ar, intp) {
        // make js object from key-value pair
        var array_to_obj = function (ary) {
            if ((ary.length % 2) != 0)
                throw new Error("js-new: odd number of key-value pair");
            var obj = {};
            for (var i = 0; i < ary.length; i += 2) {
                var key = ary[i], value = ary[i + 1];
                Scheme.assert_symbol(key);
                if (value.closure_p === true)
                    value = js_closure(value, intp);
                obj[key.name] = value;
            }
            return obj;
        };
        var ctor = ar.shift();
        if (Scheme.isString(ctor))
            ctor = eval(ctor);
        if (ar.length == 0) {
            return new ctor();
        }
        else {
            // pack args to js object, if symbol appears
            var args = [];
            for (var i = 0; i < ar.length; i++) {
                if (ar[i] instanceof Scheme._Symbol) {
                    args.push(array_to_obj(ar.slice(i)));
                    break;
                }
                else {
                    args.push(ar[i]);
                }
            }
            // Run `new ctor(...args)`;
            return new (Function.prototype.bind.apply(ctor, [null].concat(args)))();
        }
    });
    // (js-obj "foo" 1 "bar" 2)
    // -> {"foo": 1, "bar": 2}
    Scheme.define_libfunc("js-obj", 0, null, function (ar) {
        if (ar.length % 2 != 0) {
            throw new Error("js-obj: number of arguments must be even");
        }
        var obj = {};
        for (let i = 0; i < ar.length / 2; i++) {
            Scheme.assert_string(ar[i * 2]);
            obj[ar[i * 2]] = ar[i * 2 + 1];
        }
        return obj;
    });
    /*export*/ function js_closure(proc, intp) {
        var intp2 = new Scheme.Interpreter(intp);
        return function ( /*args*/) {
            return intp2.invoke_closure(proc, Scheme.toArray(arguments));
        };
    }
    ;
    // (js-closure (lambda (event) ..))
    // Returns a js function which executes the given procedure.
    //
    // Example
    //   (add-handler! ($ "#btn") "click" (js-closure on-click))
    Scheme.define_libfunc("js-closure", 1, 1, function (ar, intp) {
        Scheme.assert_closure(ar[0]);
        return js_closure(ar[0], intp);
    });
    Scheme.define_libfunc("js-null?", 1, 1, function (ar) {
        return ar[0] === null;
    });
    Scheme.define_libfunc("js-undefined?", 1, 1, function (ar) {
        return ar[0] === undefined;
    });
    Scheme.define_libfunc("js-function?", 1, 1, function (ar) {
        return Scheme.isFunction(ar[0]);
    });
    Scheme.define_libfunc("js-array-to-list", 1, 1, function (ar) {
        Scheme.deprecate("js-array-to-list", "1.0", "js-array->list");
        return Scheme.array_to_list(ar[0]);
    });
    Scheme.define_libfunc("js-array->list", 1, 1, function (ar) {
        return Scheme.array_to_list(ar[0]);
    });
    Scheme.define_libfunc("list-to-js-array", 1, 1, function (ar) {
        Scheme.deprecate("list-to-js-array", "1.0", "list->js-array");
        return ar[0].to_array();
    });
    Scheme.define_libfunc("list->js-array", 1, 1, function (ar) {
        return ar[0].to_array();
    });
    function alist_to_js_obj(alist) {
        if (alist === Scheme.nil) {
            return {};
        }
        Scheme.assert_list(alist);
        var obj = {};
        alist.foreach(function (item) {
            Scheme.assert_string(item.car);
            obj[item.car] = item.cdr;
        });
        return obj;
    }
    Scheme.alist_to_js_obj = alist_to_js_obj;
    Scheme.define_libfunc("alist-to-js-obj", 1, 1, function (ar) {
        Scheme.deprecate("alist-to-js-obj", "1.0", "alist->js-obj");
        return alist_to_js_obj(ar[0]);
    });
    Scheme.define_libfunc("alist->js-obj", 1, 1, function (ar) {
        return alist_to_js_obj(ar[0]);
    });
    /*export*/ function js_obj_to_alist(obj) {
        if (obj === undefined) {
            return Scheme.nil;
        }
        var arr = [];
        //obj.forEach((val: any, key: any) => {
        //    arr.push(new Pair(key, val));
        //});
        Object.keys(obj).forEach((key) => {
            // console.log(key, obj[key]);
            arr.push(new Scheme.Pair(key, obj[key]));
        });
        var alist = Scheme.array_to_list(arr);
        return alist;
    }
    Scheme.define_libfunc("js-obj-to-alist", 1, 1, function (ar) {
        Scheme.deprecate("js-obj-to-alist", "1.0", "js-obj->alist");
        return js_obj_to_alist(ar[0]);
    });
    Scheme.define_libfunc("js-obj->alist", 1, 1, function (ar) {
        return js_obj_to_alist(ar[0]);
    });
    //
    // timer, sleep
    //
    Scheme.define_libfunc("timer", 2, 2, function (ar, intp) {
        var proc = ar[0], sec = ar[1];
        Scheme.assert_closure(proc);
        Scheme.assert_real(sec);
        var intp2 = new Scheme.Interpreter(intp);
        setTimeout(function () { intp2.invoke_closure(proc); }, sec * 1000);
        return Scheme.undef;
    });
    Scheme.define_libfunc("set-timer!", 2, 2, function (ar, intp) {
        var proc = ar[0], sec = ar[1];
        Scheme.assert_closure(proc);
        Scheme.assert_real(sec);
        var intp2 = new Scheme.Interpreter(intp);
        return setInterval(function () { intp2.invoke_closure(proc); }, sec * 1000);
    });
    Scheme.define_libfunc("clear-timer!", 1, 1, function (ar) {
        var timer_id = ar[0];
        clearInterval(timer_id);
        return Scheme.undef;
    });
    Scheme.define_libfunc("sleep", 1, 1, function (ar) {
        var sec = ar[0];
        Scheme.assert_real(sec);
        return new Scheme.Pause(function (pause) {
            setTimeout(function () { pause.resume(Scheme.nil); }, sec * 1000);
        });
    });
    //
    // console
    //
    // (console-debug obj1 ...)
    // (console-log obj1 ...)
    // (console-info obj1 ...)
    // (console-warn obj1 ...)
    // (console-error obj1 ...)
    //   Put objects to console, if window.console is defined.
    //   Returns obj1.
    //
    // Example:
    //     (some-func arg1 (console-debug arg2) arg3)
    var define_console_func = function (name) {
        Scheme.define_libfunc("console-" + name, 1, null, function (ar) {
            var con = window.console;
            if (con) {
                var vals = ar.map((item) => {
                    return Scheme.inspect(item, { fallback: item });
                });
                con[name].apply(con, vals);
            }
            return ar[0];
        });
    };
    define_console_func("debug");
    define_console_func("log");
    define_console_func("info");
    define_console_func("warn");
    define_console_func("error");
})(Scheme || (Scheme = {}));
/// <reference path="./infra.ts" />
var Scheme;
(function (Scheme) {
    //
    // R6RS Base library
    //
    ///
    /// R6RS Base library
    ///
    //
    //        11.4  Expressions
    //
    //            11.4.1  Quotation
    //(quote)
    //            11.4.2  Procedures
    //(lambda)
    //            11.4.3  Conditionaar
    //(if)
    //            11.4.4  Assignments
    //(set!)
    //            11.4.5  Derived conditionaar
    Scheme.define_syntax("cond", function (x) {
        var clauses = x.cdr;
        if (!(clauses instanceof Scheme.Pair) || clauses === Scheme.nil) {
            throw new Error("malformed cond: cond needs list but got " +
                Scheme.to_write_ss(clauses));
        }
        // TODO: assert that clauses is a proper list
        var ret = null;
        clauses.to_array().reverse().forEach((clause) => {
            if (!(clause instanceof Scheme.Pair)) {
                throw new Error("bad clause in cond: " + Scheme.to_write_ss(clause));
            }
            if (clause.car === Scheme.Sym("else")) {
                if (ret !== null) {
                    throw new Error("'else' clause of cond followed by more clauses: " + Scheme.to_write_ss(clauses));
                }
                else if (clause.cdr === Scheme.nil) {
                    // pattern A: (else)
                    //  -> #f            ; not specified in R6RS...?
                    ret = false;
                }
                else if (clause.cdr.cdr === Scheme.nil) {
                    // pattern B: (else expr)
                    //  -> expr
                    ret = clause.cdr.car;
                }
                else {
                    // pattern C: (else expr ...)
                    //  -> (begin expr ...)
                    ret = new Scheme.Pair(Scheme.Sym("begin"), clause.cdr);
                }
            }
            else {
                var test = clause.car;
                if (clause.cdr === Scheme.nil) {
                    // pattern 1: (test)
                    //  -> (or test ret)
                    ret = Scheme.List(Scheme.Sym("or"), test, ret);
                }
                else if (clause.cdr.cdr === Scheme.nil) {
                    // pattern 2: (test expr)
                    //  -> (if test expr ret)
                    ret = Scheme.List(Scheme.Sym("if"), test, clause.cdr.car, ret);
                }
                else if (clause.cdr.car === Scheme.Sym("=>")) {
                    // pattern 3: (test => expr)
                    //  -> (let ((#<gensym1> test))
                    //       (if test (expr #<gensym1>) ret))
                    var test = clause.car, expr = clause.cdr.cdr.car;
                    var tmp_sym = Scheme.gensym();
                    ret = Scheme.List(Scheme.Sym("let"), Scheme.List(Scheme.List(tmp_sym, test)), Scheme.List(Scheme.Sym("if"), test, Scheme.List(expr, tmp_sym), ret));
                }
                else {
                    // pattern 4: (test expr ...)
                    //  -> (if test (begin expr ...) ret)
                    ret = Scheme.List(Scheme.Sym("if"), test, new Scheme.Pair(Scheme.Sym("begin"), clause.cdr), ret);
                }
            }
        });
        return ret;
    });
    Scheme.define_syntax("case", function (x) {
        var tmp_sym = Scheme.gensym();
        if (x.cdr === Scheme.nil) {
            throw new Error("case: at least one clause is required");
        }
        else if (!(x.cdr instanceof Scheme.Pair)) {
            throw new Error("case: proper list is required");
        }
        else {
            // (case key clauses ....)
            //  -> (let ((#<gensym1> key))
            var key = x.cdr.car;
            var clauses = x.cdr.cdr;
            var ret = undefined;
            clauses.to_array().reverse().forEach((clause) => {
                if (clause.car === Scheme.Sym("else")) {
                    // pattern 0: (else expr ...)
                    //  -> (begin expr ...)
                    if (ret === undefined) {
                        ret = new Scheme.Pair(Scheme.Sym("begin"), clause.cdr);
                    }
                    else {
                        throw new Error("case: 'else' clause followed by more clauses: " +
                            Scheme.to_write_ss(clauses));
                    }
                }
                else {
                    // pattern 1: ((datum ...) expr ...)
                    //  -> (if (or (eqv? key (quote d1)) ...) (begin expr ...) ret)
                    ret = Scheme.List(Scheme.Sym("if"), new Scheme.Pair(Scheme.Sym("or"), Scheme.array_to_list((clause.car.to_array()).map((d) => {
                        return Scheme.List(Scheme.Sym("eqv?"), tmp_sym, Scheme.List(Scheme.Sym("quote"), d));
                    }))), new Scheme.Pair(Scheme.Sym("begin"), clause.cdr), ret);
                }
            });
            return new Scheme.Pair(Scheme.Sym("let1"), new Scheme.Pair(tmp_sym, new Scheme.Pair(key, new Scheme.Pair(ret, Scheme.nil))));
        }
    });
    Scheme.define_syntax("and", function (x) {
        // (and a b c) => (if a (if b c #f) #f)
        //todo: check improper list
        if (x.cdr == Scheme.nil)
            return true;
        var objs = x.cdr.to_array();
        var i = objs.length - 1;
        var t = objs[i];
        for (i = i - 1; i >= 0; i--)
            t = Scheme.List(Scheme.Sym("if"), objs[i], t, false);
        return t;
    });
    Scheme.define_syntax("or", function (x) {
        // (or a b c) => (if a a (if b b (if c c #f)))
        //todo: check improper list
        var objs = x.cdr.to_array();
        var f = false;
        for (var i = objs.length - 1; i >= 0; i--)
            f = Scheme.List(Scheme.Sym("if"), objs[i], objs[i], f);
        return f;
    });
    //            11.4.6  Binding constructs
    Scheme.define_syntax("let", function (x) {
        //(let ((a 1) (b 2)) (print a) (+ a b))
        //=> ((lambda (a b) (print a) (+ a b)) 1 2)
        var name = null;
        if (x.cdr.car instanceof Scheme._Symbol) {
            name = x.cdr.car;
            x = x.cdr;
        }
        var binds = x.cdr.car, body = x.cdr.cdr;
        if ((!(binds instanceof Scheme.Pair)) && binds != Scheme.nil) {
            throw new Error("let: need a pair for bindings: got " + Scheme.to_write(binds));
        }
        var vars = Scheme.nil, vals = Scheme.nil;
        for (var p = binds; p instanceof Scheme.Pair; p = p.cdr) {
            if (!(p.car instanceof Scheme.Pair)) {
                throw new Error("let: need a pair for bindings: got " + Scheme.to_write(p.car));
            }
            vars = new Scheme.Pair(p.car.car, vars);
            vals = new Scheme.Pair(p.car.cdr.car, vals);
        }
        var lambda = null;
        if (name) {
            // (let loop ((a 1) (b 2)) body ..)
            //=> (letrec ((loop (lambda (a b) body ..))) (loop 1 2))
            vars = Scheme.array_to_list(vars.to_array().reverse());
            vals = Scheme.array_to_list(vals.to_array().reverse());
            var body_lambda = new Scheme.Pair(Scheme.Sym("lambda"), new Scheme.Pair(vars, body));
            var init_call = new Scheme.Pair(name, vals);
            lambda = Scheme.List(Scheme.Sym("letrec"), new Scheme.Pair(Scheme.List(name, body_lambda), Scheme.nil), init_call);
        }
        else {
            lambda = new Scheme.Pair(new Scheme.Pair(Scheme.Sym("lambda"), new Scheme.Pair(vars, body)), vals);
        }
        return lambda;
    });
    Scheme.define_syntax("let*", function (x) {
        //(let* ((a 1) (b a)) (print a) (+ a b))
        //-> (let ((a 1))
        //     (let ((b a)) (print a) (+ a b)))
        var binds = x.cdr.car, body = x.cdr.cdr;
        if (!(binds instanceof Scheme.Pair))
            throw new Error("let*: need a pair for bindings: got " + Scheme.to_write(binds));
        var ret = null;
        binds.to_array().reverse().forEach((bind) => {
            ret = new Scheme.Pair(Scheme.Sym("let"), new Scheme.Pair(new Scheme.Pair(bind, Scheme.nil), ret == null ? body : new Scheme.Pair(ret, Scheme.nil)));
        });
        return ret;
    });
    var expand_letrec_star = function (x) {
        var binds = x.cdr.car, body = x.cdr.cdr;
        if (!(binds instanceof Scheme.Pair))
            throw new Error("letrec*: need a pair for bindings: got " + Scheme.to_write(binds));
        var ret = body;
        binds.to_array().reverse().forEach((bind) => {
            ret = new Scheme.Pair(new Scheme.Pair(Scheme.Sym("set!"), bind), ret);
        });
        var letbody = Scheme.nil;
        binds.to_array().reverse().forEach((bind) => {
            letbody = new Scheme.Pair(new Scheme.Pair(bind.car, new Scheme.Pair(Scheme.undef, Scheme.nil)), letbody);
        });
        return new Scheme.Pair(Scheme.Sym("let"), new Scheme.Pair(letbody, ret));
    };
    Scheme.define_syntax("letrec", expand_letrec_star);
    Scheme.define_syntax("letrec*", expand_letrec_star);
    Scheme.define_syntax("let-values", function (x) {
        // (let-values (((a b) (values 1 2))
        //               ((c d . e) (values 3 4 a)))
        //              (print a b c d e))
        // =>
        // (let ((#<gensym1> (lambda () (values 1 2)))
        //       (#<gensym2> (lambda () (values 3 4 a))))
        //   (let*-values (((a b) #<gensym1>)
        //                 ((c d . e) #<gensym2>))
        //                 (print a b c d e)))
        var mv_bindings = x.cdr.car;
        var body = x.cdr.cdr;
        var ret = null;
        var let_bindings = Scheme.nil;
        var let_star_values_bindings = Scheme.nil;
        mv_bindings.to_array().reverse().forEach((item) => {
            var init = item.cdr.car;
            var tmpsym = Scheme.gensym();
            var binding = new Scheme.Pair(tmpsym, new Scheme.Pair(new Scheme.Pair(Scheme.Sym("lambda"), new Scheme.Pair(Scheme.nil, new Scheme.Pair(init, Scheme.nil))), Scheme.nil));
            let_bindings = new Scheme.Pair(binding, let_bindings);
            var formals = item.car;
            let_star_values_bindings = new Scheme.Pair(new Scheme.Pair(formals, new Scheme.Pair(new Scheme.Pair(tmpsym, Scheme.nil), Scheme.nil)), let_star_values_bindings);
        });
        var let_star_values = new Scheme.Pair(Scheme.Sym("let*-values"), new Scheme.Pair(let_star_values_bindings, body));
        ret = new Scheme.Pair(Scheme.Sym("let"), new Scheme.Pair(let_bindings, new Scheme.Pair(let_star_values, Scheme.nil)));
        return ret;
    });
    //let*-values
    Scheme.define_syntax("let*-values", function (x) {
        // (let*-values (((a b) (values 1 2))
        //               ((c d . e) (values 3 4 a)))
        //   (print a b c d e))
        // -> (call-with-values
        //      (lambda () (values 1 2))
        //      (lambda (a b)
        //        (call-with-values
        //          (lambda () (values 3 4 a))
        //          (lambda (c d . e)
        //            (print a b c d e)))))
        var mv_bindings = x.cdr.car;
        var body = x.cdr.cdr;
        var ret = null;
        mv_bindings.to_array().reverse().forEach((item) => {
            var formals = item.car, init = item.cdr.car;
            ret = new Scheme.Pair(Scheme.Sym("call-with-values"), new Scheme.Pair(new Scheme.Pair(Scheme.Sym("lambda"), new Scheme.Pair(Scheme.nil, new Scheme.Pair(init, Scheme.nil))), new Scheme.Pair(new Scheme.Pair(Scheme.Sym("lambda"), new Scheme.Pair(formals, (ret == null ? body
                : new Scheme.Pair(ret, Scheme.nil)))), Scheme.nil)));
        });
        return ret;
    });
    //            11.4.7  Sequencing
    //(begin)
    //
    //        11.5  Equivalence predicates
    //
    Scheme.define_libfunc("eqv?", 2, 2, function (ar) {
        return Scheme.eqv(ar[0], ar[1]);
    });
    Scheme.define_libfunc("eq?", 2, 2, function (ar) {
        return Scheme.eq(ar[0], ar[1]);
    });
    Scheme.define_libfunc("equal?", 2, 2, function (ar) {
        return Scheme.equal(ar[0], ar[1]);
    });
    //
    //        11.6  Procedure predicate
    //
    //"procedure?", 1, 1
    Scheme.define_libfunc("procedure?", 1, 1, function (ar) {
        return ((ar[0] instanceof Array) && (ar[0].closure_p === true)
            || (typeof ar[0] == "function") || (ar[0] instanceof Scheme.FunctionHolder));
    });
    //
    //        11.7  Arithmetic
    //
    //            11.7.1  Propagation of exactness and inexactness
    //            11.7.2  Representability of infinities and NaNs
    //            11.7.3  Semantics of common operations
    //                11.7.3.1  Integer division
    //                11.7.3.2  Transcendental functions
    //(no functions are introduced by above sections)
    //
    //            11.7.4  Numerical operations
    //
    //                11.7.4.1  Numerical type predicates
    Scheme.define_libfunc("number?", 1, 1, function (ar) {
        return Scheme.isNumber(ar[0]);
    });
    Scheme.define_libfunc("complex?", 1, 1, function (ar) {
        return Scheme.isComplex(ar[0]);
    });
    Scheme.define_libfunc("real?", 1, 1, function (ar) {
        return Scheme.isReal(ar[0]);
    });
    Scheme.define_libfunc("rational?", 1, 1, function (ar) {
        return Scheme.isRational(ar[0]);
    });
    Scheme.define_libfunc("integer?", 1, 1, function (ar) {
        return Scheme.isInteger(ar[0]);
    });
    //(real-valued? obj)    procedure
    //(rational-valued? obj)    procedure
    //(integer-valued? obj)    procedure
    //
    //(exact? z)    procedure
    //(inexact? z)    procedure
    //                11.7.4.2  Generic conversions
    //
    //(inexact z)    procedure
    //(exact z)    procedure
    //
    //                11.7.4.3  Arithmetic operations
    //inf & nan: ok (for this section)
    Scheme.define_libfunc("=", 2, null, function (ar) {
        var v = ar[0];
        Scheme.assert_number(ar[0]);
        for (var i = 1; i < ar.length; i++) {
            Scheme.assert_number(ar[i]);
            if (real_part(ar[i]) != real_part(v))
                return false;
            if (imag_part(ar[i]) != imag_part(v))
                return false;
        }
        return true;
    });
    Scheme.define_libfunc("<", 2, null, function (ar) {
        Scheme.assert_number(ar[0]);
        for (var i = 1; i < ar.length; i++) {
            Scheme.assert_number(ar[i]);
            if (!(ar[i - 1] < ar[i]))
                return false;
        }
        return true;
    });
    Scheme.define_libfunc(">", 2, null, function (ar) {
        Scheme.assert_number(ar[0]);
        for (var i = 1; i < ar.length; i++) {
            Scheme.assert_number(ar[i]);
            if (!(ar[i - 1] > ar[i]))
                return false;
        }
        return true;
    });
    Scheme.define_libfunc("<=", 2, null, function (ar) {
        Scheme.assert_number(ar[0]);
        for (var i = 1; i < ar.length; i++) {
            Scheme.assert_number(ar[i]);
            if (!(ar[i - 1] <= ar[i]))
                return false;
        }
        return true;
    });
    Scheme.define_libfunc(">=", 2, null, function (ar) {
        Scheme.assert_number(ar[0]);
        for (var i = 1; i < ar.length; i++) {
            Scheme.assert_number(ar[i]);
            if (!(ar[i - 1] >= ar[i]))
                return false;
        }
        return true;
    });
    Scheme.define_libfunc("zero?", 1, 1, function (ar) {
        Scheme.assert_number(ar[0]);
        return ar[0] === 0;
    });
    Scheme.define_libfunc("positive?", 1, 1, function (ar) {
        Scheme.assert_number(ar[0]);
        return (ar[0] > 0);
    });
    Scheme.define_libfunc("negative?", 1, 1, function (ar) {
        Scheme.assert_number(ar[0]);
        return (ar[0] < 0);
    });
    Scheme.define_libfunc("odd?", 1, 1, function (ar) {
        Scheme.assert_number(ar[0]);
        return (ar[0] % 2 == 1) || (ar[0] % 2 == -1);
    });
    Scheme.define_libfunc("even?", 1, 1, function (ar) {
        Scheme.assert_number(ar[0]);
        return ar[0] % 2 == 0;
    });
    Scheme.define_libfunc("finite?", 1, 1, function (ar) {
        Scheme.assert_number(ar[0]);
        return (ar[0] != Infinity) && (ar[0] != -Infinity) && !isNaN(ar[0]);
    });
    Scheme.define_libfunc("infinite?", 1, 1, function (ar) {
        Scheme.assert_number(ar[0]);
        return (ar[0] == Infinity) || (ar[0] == -Infinity);
    });
    Scheme.define_libfunc("nan?", 1, 1, function (ar) {
        Scheme.assert_number(ar[0]);
        return isNaN(ar[0]);
    });
    Scheme.define_libfunc("max", 2, null, function (ar) {
        for (var i = 0; i < ar.length; i++)
            Scheme.assert_number(ar[i]);
        return Math.max.apply(null, ar);
    });
    Scheme.define_libfunc("min", 2, null, function (ar) {
        for (var i = 0; i < ar.length; i++)
            Scheme.assert_number(ar[i]);
        return Math.min.apply(null, ar);
    });
    var complex_or_real = function (real, imag) {
        if (imag === 0)
            return real;
        return new Scheme.Complex(real, imag);
    };
    var polar_or_real = function (magnitude, angle) {
        if (angle === 0)
            return magnitude;
        return Scheme.Complex.from_polar(magnitude, angle);
    };
    Scheme.define_libfunc("+", 0, null, function (ar) {
        var real = 0;
        var imag = 0;
        for (var i = 0; i < ar.length; i++) {
            Scheme.assert_number(ar[i]);
            real += real_part(ar[i]);
            imag += imag_part(ar[i]);
        }
        return complex_or_real(real, imag);
    });
    var the_magnitude = function (n) {
        if (n instanceof Scheme.Complex)
            return n.magnitude();
        return n;
    };
    var the_angle = function (n) {
        if (n instanceof Scheme.Complex)
            return n.angle();
        return 0;
    };
    Scheme.define_libfunc("*", 0, null, function (ar) {
        var magnitude = 1;
        var angle = 0;
        for (var i = 0; i < ar.length; i++) {
            Scheme.assert_number(ar[i]);
            magnitude *= the_magnitude(ar[i]);
            angle += the_angle(ar[i]);
        }
        return polar_or_real(magnitude, angle);
    });
    Scheme.define_libfunc("-", 1, null, function (ar) {
        var len = ar.length;
        Scheme.assert_number(ar[0]);
        if (len == 1) {
            if (ar[0] instanceof Scheme.Complex)
                return new Scheme.Complex(-real_part(ar[0]), -imag_part(ar[0]));
            return -ar[0];
        }
        else {
            var real = real_part(ar[0]);
            var imag = imag_part(ar[0]);
            for (var i = 1; i < len; i++) {
                Scheme.assert_number(ar[i]);
                real -= real_part(ar[i]);
                imag -= imag_part(ar[i]);
            }
            return complex_or_real(real, imag);
        }
    });
    //for r6rs specification, (/ 0 0) or (/ 3 0) raises '&assertion exception'
    Scheme.define_libfunc("/", 1, null, function (ar) {
        var len = ar.length;
        Scheme.assert_number(ar[0]);
        if (len == 1) {
            if (ar[0] instanceof Scheme.Complex)
                return Scheme.Complex.from_polar(1 / the_magnitude(ar[0]), -the_angle(ar[0]));
            return 1 / ar[0];
        }
        else {
            var magnitude = the_magnitude(ar[0]);
            var angle = the_angle(ar[0]);
            for (var i = 1; i < len; i++) {
                Scheme.assert_number(ar[i]);
                magnitude /= the_magnitude(ar[i]);
                angle -= the_angle(ar[i]);
            }
            return polar_or_real(magnitude, angle);
        }
    });
    Scheme.define_libfunc("abs", 1, 1, function (ar) {
        Scheme.assert_number(ar[0]);
        return Math.abs(ar[0]);
    });
    var div = function (n, m) {
        return Math.floor(n / m);
    };
    var mod = function (n, m) {
        return n - Math.floor(n / m) * m;
    };
    var div0 = function (n, m) {
        return (n > 0) ? Math.floor(n / m) : Math.ceil(n / m);
    };
    var mod0 = function (n, m) {
        return (n > 0) ? n - Math.floor(n / m) * m
            : n - Math.ceil(n / m) * m;
    };
    Scheme.define_libfunc("div0-and-mod0", 2, 2, function (ar) {
        Scheme.assert_number(ar[0]);
        Scheme.assert_number(ar[1]);
        return new Scheme.Values([div(ar[0], ar[1]), mod(ar[0], ar[1])]);
    });
    Scheme.define_libfunc("div", 2, 2, function (ar) {
        Scheme.assert_number(ar[0]);
        Scheme.assert_number(ar[1]);
        return div(ar[0], ar[1]);
    });
    Scheme.define_libfunc("mod", 2, 2, function (ar) {
        Scheme.assert_number(ar[0]);
        Scheme.assert_number(ar[1]);
        return mod(ar[0], ar[1]);
    });
    Scheme.define_libfunc("div0-and-mod0", 2, 2, function (ar) {
        Scheme.assert_number(ar[0]);
        Scheme.assert_number(ar[1]);
        return new Scheme.Values([div0(ar[0], ar[1]), mod0(ar[0], ar[1])]);
    });
    Scheme.define_libfunc("div0", 2, 2, function (ar) {
        Scheme.assert_number(ar[0]);
        Scheme.assert_number(ar[1]);
        return div0(ar[0], ar[1]);
    });
    Scheme.define_libfunc("mod0", 2, 2, function (ar) {
        Scheme.assert_number(ar[0]);
        Scheme.assert_number(ar[1]);
        return mod0(ar[0], ar[1]);
    });
    //(gcd n1 ...)    procedure
    //(lcm n1 ...)    procedure
    Scheme.define_libfunc("numerator", 1, 1, function (ar) {
        Scheme.assert_number(ar[0]);
        if (ar[0] instanceof Scheme.Rational)
            return ar[0].numerator;
        else
            throw new Scheme.Bug("todo");
    });
    Scheme.define_libfunc("denominator", 1, 1, function (ar) {
        Scheme.assert_number(ar[0]);
        if (ar[0] instanceof Scheme.Rational)
            return ar[0].denominator;
        else
            throw new Scheme.Bug("todo");
    });
    Scheme.define_libfunc("floor", 1, 1, function (ar) {
        Scheme.assert_number(ar[0]);
        return Math.floor(ar[0]);
    });
    Scheme.define_libfunc("ceiling", 1, 1, function (ar) {
        Scheme.assert_number(ar[0]);
        return Math.ceil(ar[0]);
    });
    Scheme.define_libfunc("truncate", 1, 1, function (ar) {
        Scheme.assert_number(ar[0]);
        return (ar[0] < 0) ? Math.ceil(ar[0]) : Math.floor(ar[0]);
    });
    Scheme.define_libfunc("round", 1, 1, function (ar) {
        Scheme.assert_number(ar[0]);
        return Math.round(ar[0]);
    });
    //(rationalize x1 x2)    procedure
    Scheme.define_libfunc("exp", 1, 1, function (ar) {
        Scheme.assert_number(ar[0]);
        return Math.exp(ar[0]);
    });
    Scheme.define_libfunc("log", 1, 2, function (ar) {
        var num = ar[0], base = ar[1];
        Scheme.assert_number(num);
        if (base) { // log b num == log e num / log e b
            Scheme.assert_number(base);
            return Math.log(num) / Math.log(base);
        }
        else
            return Math.log(num);
    });
    Scheme.define_libfunc("sin", 1, 1, function (ar) {
        Scheme.assert_number(ar[0]);
        return Math.sin(ar[0]);
    });
    Scheme.define_libfunc("cos", 1, 1, function (ar) {
        Scheme.assert_number(ar[0]);
        return Math.cos(ar[0]);
    });
    Scheme.define_libfunc("tan", 1, 1, function (ar) {
        Scheme.assert_number(ar[0]);
        return Math.tan(ar[0]);
    });
    Scheme.define_libfunc("asin", 1, 1, function (ar) {
        Scheme.assert_number(ar[0]);
        return Math.asin(ar[0]);
    });
    Scheme.define_libfunc("acos", 1, 1, function (ar) {
        Scheme.assert_number(ar[0]);
        return Math.acos(ar[0]);
    });
    Scheme.define_libfunc("atan", 1, 2, function (ar) {
        Scheme.assert_number(ar[0]);
        if (ar.length == 2) {
            Scheme.assert_number(ar[1]);
            return Math.atan2(ar[0], ar[1]);
        }
        else
            return Math.atan(ar[0]);
    });
    Scheme.define_libfunc("sqrt", 1, 1, function (ar) {
        Scheme.assert_number(ar[0]);
        return Math.sqrt(ar[0]);
    });
    Scheme.define_libfunc("exact-integer-sqrt", 1, 1, function (ar) {
        Scheme.assert_number(ar[0]);
        var sqrt_f = Math.sqrt(ar[0]);
        var sqrt_i = sqrt_f - (sqrt_f % 1);
        var rest = ar[0] - sqrt_i * sqrt_i;
        return new Scheme.Values([sqrt_i, rest]);
    });
    Scheme.define_libfunc("expt", 2, 2, function (ar) {
        Scheme.assert_number(ar[0]);
        Scheme.assert_number(ar[1]);
        return Math.pow(ar[0], ar[1]);
    });
    Scheme.define_libfunc("make-rectangular", 2, 2, function (ar) {
        Scheme.assert_number(ar[0]);
        Scheme.assert_number(ar[1]);
        return new Scheme.Complex(ar[0], ar[1]);
    });
    Scheme.define_libfunc("make-polar", 2, 2, function (ar) {
        Scheme.assert_number(ar[0]);
        Scheme.assert_number(ar[1]);
        return Scheme.Complex.from_polar(ar[0], ar[1]);
    });
    var real_part = function (n) {
        return Scheme.Complex.assure(n).real;
    };
    var imag_part = function (n) {
        return Scheme.Complex.assure(n).imag;
    };
    Scheme.define_libfunc("real-part", 1, 1, function (ar) {
        Scheme.assert_number(ar[0]);
        return real_part(ar[0]);
    });
    Scheme.define_libfunc("imag-part", 1, 1, function (ar) {
        Scheme.assert_number(ar[0]);
        return Scheme.Complex.assure(ar[0]).imag;
    });
    Scheme.define_libfunc("magnitude", 1, 1, function (ar) {
        Scheme.assert_number(ar[0]);
        return Scheme.Complex.assure(ar[0]).magnitude();
    });
    Scheme.define_libfunc("angle", 1, 1, function (ar) {
        Scheme.assert_number(ar[0]);
        return Scheme.Complex.assure(ar[0]).angle();
    });
    //
    //                11.7.4.4  Numerical Input and Output
    //
    Scheme.define_libfunc("number->string", 1, 3, function (ar) {
        var z = ar[0], radix = ar[1], precision = ar[2];
        if (precision)
            throw new Scheme.Bug("number->string: precision is not yet implemented");
        radix = radix || 10; //TODO: check radix is 2, 8, 10, or 16.
        return z.toString(radix);
    });
    Scheme.define_libfunc("string->number", 1, 3, function (ar) {
        var s = ar[0];
        if (s === '+inf.0')
            return Infinity;
        if (s === '-inf.0')
            return -Infinity;
        if (s === '+nan.0')
            return NaN;
        var radix = ar[1];
        var int_res = Scheme.parse_integer(s, radix === 0 ? 0 : radix || 10);
        if (int_res !== false)
            return int_res;
        if (radix !== undefined && radix !== 10)
            return false;
        var fp_res = Scheme.parse_float(s);
        if (fp_res !== false)
            return fp_res;
        var frac_res = Scheme.parse_fraction(s);
        if (frac_res !== false)
            return frac_res;
        return false;
    });
    //
    //        11.8  Booleans
    //
    Scheme.define_libfunc("not", 1, 1, function (ar) {
        return (ar[0] === false) ? true : false;
    });
    Scheme.define_libfunc("boolean?", 1, 1, function (ar) {
        return (ar[0] === false || ar[0] === true) ? true : false;
    });
    Scheme.define_libfunc("boolean=?", 2, null, function (ar) {
        var len = ar.length;
        for (var i = 1; i < len; i++) {
            if (ar[i] != ar[0])
                return false;
        }
        return true;
    });
    //        11.9  Pairs and lists
    Scheme.define_libfunc("pair?", 1, 1, function (ar) {
        return (ar[0] instanceof Scheme.Pair) ? true : false;
    });
    Scheme.define_libfunc("cons", 2, 2, function (ar) {
        return new Scheme.Pair(ar[0], ar[1]);
    });
    Scheme.define_libfunc("car", 1, 1, function (ar) {
        //should raise &assertion for '()...
        if (!(ar[0] instanceof Scheme.Pair))
            throw new Error("Attempt to apply car on " + ar[0]);
        return ar[0].car;
    });
    Scheme.define_libfunc("cdr", 1, 1, function (ar) {
        //should raise &assertion for '()...
        if (!(ar[0] instanceof Scheme.Pair))
            throw new Error("Attempt to apply cdr on " + ar[0]);
        return ar[0].cdr;
    });
    Scheme.define_libfunc("set-car!", 2, 2, function (ar) {
        if (!(ar[0] instanceof Scheme.Pair))
            throw new Error("Attempt to apply set-car! on " + ar[0]);
        ar[0].car = ar[1];
        return Scheme.undef;
    });
    Scheme.define_libfunc("set-cdr!", 2, 2, function (ar) {
        if (!(ar[0] instanceof Scheme.Pair))
            throw new Error("Attempt to apply set-cdr! on " + ar[0]);
        ar[0].cdr = ar[1];
        return Scheme.undef;
    });
    // cadr, caddr, cadddr, etc.
    (function () {
        // To traverse into pair and raise error
        var get = function (funcname, spec, obj) {
            var ret = obj;
            spec.forEach((is_cdr) => {
                if (ret instanceof Scheme.Pair) {
                    ret = (is_cdr ? ret.cdr : ret.car);
                }
                else {
                    throw new Error(funcname + ": attempt to get " + (is_cdr ? "cdr" : "car") + " of " + ret);
                }
            });
            return ret;
        };
        Scheme.define_libfunc("caar", 1, 1, function (ar) { return get("caar", [0, 0], ar[0]); });
        Scheme.define_libfunc("cadr", 1, 1, function (ar) { return get("cadr", [1, 0], ar[0]); });
        Scheme.define_libfunc("cdar", 1, 1, function (ar) { return get("cadr", [0, 1], ar[0]); });
        Scheme.define_libfunc("cddr", 1, 1, function (ar) { return get("cadr", [1, 1], ar[0]); });
        Scheme.define_libfunc("caaar", 1, 1, function (ar) { return get("caaar", [0, 0, 0], ar[0]); });
        Scheme.define_libfunc("caadr", 1, 1, function (ar) { return get("caadr", [1, 0, 0], ar[0]); });
        Scheme.define_libfunc("cadar", 1, 1, function (ar) { return get("cadar", [0, 1, 0], ar[0]); });
        Scheme.define_libfunc("caddr", 1, 1, function (ar) { return get("caddr", [1, 1, 0], ar[0]); });
        Scheme.define_libfunc("cdaar", 1, 1, function (ar) { return get("cdaar", [0, 0, 1], ar[0]); });
        Scheme.define_libfunc("cdadr", 1, 1, function (ar) { return get("cdadr", [1, 0, 1], ar[0]); });
        Scheme.define_libfunc("cddar", 1, 1, function (ar) { return get("cddar", [0, 1, 1], ar[0]); });
        Scheme.define_libfunc("cdddr", 1, 1, function (ar) { return get("cdddr", [1, 1, 1], ar[0]); });
        Scheme.define_libfunc("caaaar", 1, 1, function (ar) { return get("caaaar", [0, 0, 0, 0], ar[0]); });
        Scheme.define_libfunc("caaadr", 1, 1, function (ar) { return get("caaadr", [1, 0, 0, 0], ar[0]); });
        Scheme.define_libfunc("caadar", 1, 1, function (ar) { return get("caadar", [0, 1, 0, 0], ar[0]); });
        Scheme.define_libfunc("caaddr", 1, 1, function (ar) { return get("caaddr", [1, 1, 0, 0], ar[0]); });
        Scheme.define_libfunc("cadaar", 1, 1, function (ar) { return get("cadaar", [0, 0, 1, 0], ar[0]); });
        Scheme.define_libfunc("cadadr", 1, 1, function (ar) { return get("cadadr", [1, 0, 1, 0], ar[0]); });
        Scheme.define_libfunc("caddar", 1, 1, function (ar) { return get("caddar", [0, 1, 1, 0], ar[0]); });
        Scheme.define_libfunc("cadddr", 1, 1, function (ar) { return get("cadddr", [1, 1, 1, 0], ar[0]); });
        Scheme.define_libfunc("cdaaar", 1, 1, function (ar) { return get("cdaaar", [0, 0, 0, 1], ar[0]); });
        Scheme.define_libfunc("cdaadr", 1, 1, function (ar) { return get("cdaadr", [1, 0, 0, 1], ar[0]); });
        Scheme.define_libfunc("cdadar", 1, 1, function (ar) { return get("cdadar", [0, 1, 0, 1], ar[0]); });
        Scheme.define_libfunc("cdaddr", 1, 1, function (ar) { return get("cdaddr", [1, 1, 0, 1], ar[0]); });
        Scheme.define_libfunc("cddaar", 1, 1, function (ar) { return get("cddaar", [0, 0, 1, 1], ar[0]); });
        Scheme.define_libfunc("cddadr", 1, 1, function (ar) { return get("cddadr", [1, 0, 1, 1], ar[0]); });
        Scheme.define_libfunc("cdddar", 1, 1, function (ar) { return get("cdddar", [0, 1, 1, 1], ar[0]); });
        Scheme.define_libfunc("cddddr", 1, 1, function (ar) { return get("cddddr", [1, 1, 1, 1], ar[0]); });
    })();
    Scheme.define_libfunc("null?", 1, 1, function (ar) {
        return (ar[0] === Scheme.nil);
    });
    Scheme.define_libfunc("list?", 1, 1, function (ar) {
        return Scheme.isList(ar[0]);
    });
    Scheme.define_libfunc("list", 0, null, function (ar) {
        var l = Scheme.nil;
        for (var i = ar.length - 1; i >= 0; i--)
            l = new Scheme.Pair(ar[i], l);
        return l;
    });
    Scheme.define_libfunc("length", 1, 1, function (ar) {
        Scheme.assert_list(ar[0]);
        var n = 0;
        for (var o = ar[0]; o != Scheme.nil; o = o.cdr)
            n++;
        return n;
    });
    Scheme.define_libfunc("append", 1, null, function (ar) {
        var k = ar.length;
        var ret = ar[--k];
        while (k--) {
            ar[k].to_array().reverse().forEach((item) => {
                ret = new Scheme.Pair(item, ret);
            });
        }
        return ret;
    });
    Scheme.define_libfunc("reverse", 1, 1, function (ar) {
        // (reverse '()) => '()
        if (ar[0] == Scheme.nil)
            return Scheme.nil;
        Scheme.assert_pair(ar[0]);
        var l = Scheme.nil;
        for (var o = ar[0]; o != Scheme.nil; o = o.cdr)
            l = new Scheme.Pair(o.car, l);
        return l;
    });
    Scheme.define_libfunc("list-tail", 2, 2, function (ar) {
        Scheme.assert_pair(ar[0]);
        Scheme.assert_integer(ar[1]);
        if (ar[1] < 0)
            throw new Scheme._Error("list-tail: index out of range (" + ar[1] + ")");
        var o = ar[0];
        for (var i = 0; i < ar[1]; i++) {
            if (!(o instanceof Scheme.Pair))
                throw new Scheme._Error("list-tail: the list is shorter than " + ar[1]);
            o = o.cdr;
        }
        return o;
    });
    Scheme.define_libfunc("list-ref", 2, 2, function (ar) {
        Scheme.assert_pair(ar[0]);
        Scheme.assert_integer(ar[1]);
        if (ar[1] < 0)
            throw new Scheme._Error("list-tail: index out of range (" + ar[1] + ")");
        var o = ar[0];
        for (var i = 0; i < ar[1]; i++) {
            if (!(o instanceof Scheme.Pair))
                throw new Scheme._Error("list-ref: the list is shorter than " + ar[1]);
            o = o.cdr;
        }
        return o.car;
    });
    Scheme.define_libfunc("map", 2, null, function (ar) {
        var proc = ar.shift(), lists = ar;
        lists.forEach(Scheme.assert_list);
        var a = [];
        return Scheme.Call.multi_foreach(lists, {
            // Called for each element
            // input: the element (or the elements, if more than one list is given)
            // output: a Call request of proc and args
            call: function (xs) {
                return new Scheme.Call(proc, xs.map((x) => { return x.car; }));
            },
            // Called when each Call request is finished
            // input: the result of Call request,
            //   the element(s) of the Call request (which is not used here)
            // output: `undefined' to continue,
            //   some value to terminate (the value will be the result)
            result: function (res) { a.push(res); },
            // Called when reached to the end of the list(s)
            // input: none
            // output: the resultant value
            finish: function () { return Scheme.array_to_list(a); }
        });
    });
    Scheme.define_libfunc("for-each", 2, null, function (ar) {
        var proc = ar.shift(), lists = ar;
        lists.forEach(Scheme.assert_list);
        return Scheme.Call.multi_foreach(lists, {
            call: function (xs) {
                return new Scheme.Call(proc, xs.map((x) => { return x.car; }));
            },
            finish: function () { return Scheme.undef; }
        });
    });
    //        11.10  Symbols
    Scheme.define_libfunc("symbol?", 1, 1, function (ar) {
        return (ar[0] instanceof Scheme._Symbol) ? true : false;
    });
    Scheme.define_libfunc("symbol->string", 1, 1, function (ar) {
        Scheme.assert_symbol(ar[0]);
        return ar[0].name;
    });
    Scheme.define_libfunc("symbol=?", 2, null, function (ar) {
        Scheme.assert_symbol(ar[0]);
        for (var i = 1; i < ar.length; i++) {
            Scheme.assert_symbol(ar[i]);
            if (ar[i] != ar[0])
                return false;
        }
        return true;
    });
    Scheme.define_libfunc("string->symbol", 1, 1, function (ar) {
        Scheme.assert_string(ar[0]);
        return Scheme.Sym(ar[0]);
    });
    //
    //        11.11  Characters
    //
    Scheme.define_libfunc('char?', 1, 1, function (ar) {
        return (ar[0] instanceof Scheme.Char);
    });
    Scheme.define_libfunc('char->integer', 1, 1, function (ar) {
        Scheme.assert_char(ar[0]);
        return ar[0].value.charCodeAt(0);
    });
    Scheme.define_libfunc('integer->char', 1, 1, function (ar) {
        Scheme.assert_integer(ar[0]);
        return Scheme.Char.get(String.fromCharCode(ar[0]));
    });
    var make_char_compare_func = function (test) {
        return function (ar) {
            Scheme.assert_char(ar[0]);
            for (var i = 1; i < ar.length; i++) {
                Scheme.assert_char(ar[i]);
                if (!test(ar[i - 1].value, ar[i].value))
                    return false;
            }
            return true;
        };
    };
    Scheme.define_libfunc('char=?', 2, null, make_char_compare_func(function (a, b) { return a == b; }));
    Scheme.define_libfunc('char<?', 2, null, make_char_compare_func(function (a, b) { return a < b; }));
    Scheme.define_libfunc('char>?', 2, null, make_char_compare_func(function (a, b) { return a > b; }));
    Scheme.define_libfunc('char<=?', 2, null, make_char_compare_func(function (a, b) { return a <= b; }));
    Scheme.define_libfunc('char>=?', 2, null, make_char_compare_func(function (a, b) { return a >= b; }));
    //
    //        11.12  Strings
    //
    Scheme.define_libfunc("string?", 1, 1, function (ar) {
        return (typeof (ar[0]) == "string");
    });
    Scheme.define_libfunc("make-string", 1, 2, function (ar) {
        Scheme.assert_integer(ar[0]);
        var c = " ";
        if (ar[1]) {
            Scheme.assert_char(ar[1]);
            c = ar[1].value;
        }
        var out = "";
        // _.times(ar[0], function () { out += c; });
        for (let i = 0; i < ar[0]; ++i) {
            out += c;
        }
        return out;
    });
    Scheme.define_libfunc("string", 0, null, function (ar) {
        if (ar.length == 0)
            return "";
        for (var i = 0; i < ar.length; i++)
            Scheme.assert_char(ar[i]);
        return ar.map((c) => { return c.value; }).join("");
    });
    Scheme.define_libfunc("string-length", 1, 1, function (ar) {
        Scheme.assert_string(ar[0]);
        return ar[0].length;
    });
    Scheme.define_libfunc("string-ref", 2, 2, function (ar) {
        Scheme.assert_string(ar[0]);
        Scheme.assert_between(ar[1], 0, ar[0].length - 1);
        return Scheme.Char.get(ar[0].charAt([ar[1]]));
    });
    Scheme.define_libfunc("string=?", 2, null, function (ar) {
        Scheme.assert_string(ar[0]);
        for (var i = 1; i < ar.length; i++) {
            Scheme.assert_string(ar[i]);
            if (ar[0] != ar[i])
                return false;
        }
        return true;
    });
    Scheme.define_libfunc("string<?", 2, null, function (ar) {
        Scheme.assert_string(ar[0]);
        for (var i = 1; i < ar.length; i++) {
            Scheme.assert_string(ar[i]);
            if (!(ar[i - 1] < ar[i]))
                return false;
        }
        return true;
    });
    Scheme.define_libfunc("string>?", 2, null, function (ar) {
        Scheme.assert_string(ar[0]);
        for (var i = 1; i < ar.length; i++) {
            Scheme.assert_string(ar[i]);
            if (!(ar[i - 1] > ar[i]))
                return false;
        }
        return true;
    });
    Scheme.define_libfunc("string<=?", 2, null, function (ar) {
        Scheme.assert_string(ar[0]);
        for (var i = 1; i < ar.length; i++) {
            Scheme.assert_string(ar[i]);
            if (!(ar[i - 1] <= ar[i]))
                return false;
        }
        return true;
    });
    Scheme.define_libfunc("string>=?", 2, null, function (ar) {
        Scheme.assert_string(ar[0]);
        for (var i = 1; i < ar.length; i++) {
            Scheme.assert_string(ar[i]);
            if (!(ar[i - 1] >= ar[i]))
                return false;
        }
        return true;
    });
    Scheme.define_libfunc("substring", 3, 3, function (ar) {
        Scheme.assert_string(ar[0]);
        Scheme.assert_integer(ar[1]);
        Scheme.assert_integer(ar[2]);
        if (ar[1] < 0)
            throw new Error("substring: start too small: " + ar[1]);
        if (ar[2] < 0)
            throw new Error("substring: end too small: " + ar[2]);
        if (ar[0].length + 1 <= ar[1])
            throw new Error("substring: start too big: " + ar[1]);
        if (ar[0].length + 1 <= ar[2])
            throw new Error("substring: end too big: " + ar[2]);
        if (!(ar[1] <= ar[2]))
            throw new Error("substring: not start <= end: " + ar[1] + ", " + ar[2]);
        return ar[0].substring(ar[1], ar[2]);
    });
    Scheme.define_libfunc("string-append", 0, null, function (ar) {
        for (var i = 0; i < ar.length; i++)
            Scheme.assert_string(ar[i]);
        return ar.join("");
    });
    Scheme.define_libfunc("string->list", 1, 1, function (ar) {
        Scheme.assert_string(ar[0]);
        return Scheme.array_to_list(ar[0].split("").map((s) => { return Scheme.Char.get(s[0]); }));
    });
    Scheme.define_libfunc("list->string", 1, 1, function (ar) {
        Scheme.assert_list(ar[0]);
        return (ar[0].to_array().map((c) => { return c.value; })).join("");
    });
    Scheme.define_libfunc("string-for-each", 2, null, function (ar) {
        var proc = ar.shift(), strs = ar;
        strs.forEach(Scheme.assert_string);
        return Scheme.Call.multi_foreach(strs, {
            call: function (chars) { return new Scheme.Call(proc, chars); },
            finish: function () { return Scheme.undef; }
        });
    });
    Scheme.define_libfunc("string-copy", 1, 1, function (ar) {
        // note: this is useless, because javascript strings are immutable
        Scheme.assert_string(ar[0]);
        return ar[0];
    });
    //
    //        11.13  Vectors
    //
    Scheme.define_libfunc("vector?", 1, 1, function (ar) {
        return (ar[0] instanceof Array) && (ar[0].closure_p !== true);
    });
    Scheme.define_libfunc("make-vector", 1, 2, function (ar) {
        Scheme.assert_integer(ar[0]);
        var vec = new Array(ar[0]);
        if (ar.length == 2) {
            for (var i = 0; i < ar[0]; i++)
                vec[i] = ar[1];
        }
        return vec;
    });
    Scheme.define_libfunc("vector", 0, null, function (ar) {
        return ar;
    });
    Scheme.define_libfunc("vector-length", 1, 1, function (ar) {
        Scheme.assert_vector(ar[0]);
        return ar[0].length;
    });
    Scheme.define_libfunc("vector-ref", 2, 2, function (ar) {
        Scheme.assert_vector(ar[0]);
        Scheme.assert_integer(ar[1]);
        Scheme.assert_between(ar[1], 0, ar[0].length - 1);
        return ar[0][ar[1]];
    });
    Scheme.define_libfunc("vector-set!", 3, 3, function (ar) {
        Scheme.assert_vector(ar[0]);
        Scheme.assert_integer(ar[1]);
        ar[0][ar[1]] = ar[2];
        return Scheme.undef;
    });
    Scheme.define_libfunc("vector->list", 1, 1, function (ar) {
        Scheme.assert_vector(ar[0]);
        return Scheme.array_to_list(ar[0]);
    });
    Scheme.define_libfunc("list->vector", 1, 1, function (ar) {
        Scheme.assert_list(ar[0]);
        return ar[0].to_array();
    });
    Scheme.define_libfunc("vector-fill!", 2, 2, function (ar) {
        Scheme.assert_vector(ar[0]);
        var vec = ar[0], obj = ar[1];
        for (var i = 0; i < vec.length; i++)
            vec[i] = obj;
        return vec;
    });
    Scheme.define_libfunc("vector-map", 2, null, function (ar) {
        var proc = ar.shift(), vecs = ar;
        vecs.forEach(Scheme.assert_vector);
        var a = [];
        return Scheme.Call.multi_foreach(vecs, {
            call: function (objs) { return new Scheme.Call(proc, objs); },
            result: function (res) { a.push(res); },
            finish: function () { return a; }
        });
    });
    Scheme.define_libfunc("vector-for-each", 2, null, function (ar) {
        var proc = ar.shift(), vecs = ar;
        vecs.forEach(Scheme.assert_vector);
        return Scheme.Call.multi_foreach(vecs, {
            call: function (objs) { return new Scheme.Call(proc, objs); },
            finish: function () { return Scheme.undef; }
        });
    });
    //
    //        11.14  Errors and violations
    //
    //(error who message irritant1 ...)    procedure
    //(assertion-violation who message irritant1 ...)    procedure
    //(assert <expression>)    syntax
    //
    //        11.15  Control features
    //
    Scheme.define_libfunc("apply", 2, null, function (ar) {
        var proc = ar.shift(), rest_args = ar.pop(), args = ar;
        args = args.concat(rest_args.to_array());
        return new Scheme.Call(proc, args);
    });
    Scheme.define_syntax("call-with-current-continuation", function (x) {
        return new Scheme.Pair(Scheme.Sym("call/cc"), x.cdr);
    });
    Scheme.define_libfunc("values", 0, null, function (ar) {
        if (ar.length == 1) // eg. (values 3)
            return ar[0];
        else
            return new Scheme.Values(ar);
    });
    Scheme.define_libfunc("call-with-values", 2, 2, function (ar) {
        var producer = ar[0], consumer = ar[1];
        Scheme.assert_procedure(producer);
        //assert_procedure(consumer);
        return new Scheme.Call(producer, [], function (ar) {
            var result = ar[0];
            if (result instanceof Scheme.Values) {
                return new Scheme.Call(consumer, result.content);
            }
            else {
                // eg. (call-with-values (lambda () 3)
                //                       (lambda (x) x))
                return new Scheme.Call(consumer, [result]);
            }
        });
    });
    //
    //dynamic-wind
    //        11.16  Iteration
    //named let
    //        11.17  Quasiquotation
    // `() is expanded to `cons` and `append`.
    // `#() is expanded to `vector` and `vector-append`.
    var expand_qq = function (f, lv) {
        if (f instanceof Scheme._Symbol || f === Scheme.nil) {
            return Scheme.List(Scheme.Sym("quote"), f);
        }
        else if (f instanceof Scheme.Pair) {
            var car = f.car;
            if (car instanceof Scheme.Pair && car.car === Scheme.Sym("unquote-splicing")) {
                if (lv == 1)
                    return Scheme.List(Scheme.Sym("append"), f.car.cdr.car, expand_qq(f.cdr, lv));
                else
                    return Scheme.List(Scheme.Sym("cons"), Scheme.List(Scheme.Sym("list"), Scheme.List(Scheme.Sym("quote"), Scheme.Sym("unquote-splicing")), expand_qq(f.car.cdr.car, lv - 1)), expand_qq(f.cdr, lv));
            }
            else if (car === Scheme.Sym("unquote")) {
                if (lv == 1)
                    return f.cdr.car;
                else
                    return Scheme.List(Scheme.Sym("list"), Scheme.List(Scheme.Sym("quote"), Scheme.Sym("unquote")), expand_qq(f.cdr.car, lv - 1));
            }
            else if (car === Scheme.Sym("quasiquote"))
                return Scheme.List(Scheme.Sym("list"), Scheme.List(Scheme.Sym("quote"), Scheme.Sym("quasiquote")), expand_qq(f.cdr.car, lv + 1));
            else
                return Scheme.List(Scheme.Sym("cons"), expand_qq(f.car, lv), expand_qq(f.cdr, lv));
        }
        else if (f instanceof Array) {
            var vecs = [[]];
            for (var i = 0; i < f.length; i++) {
                if (f[i] instanceof Scheme.Pair && f[i].car === Scheme.Sym("unquote-splicing")) {
                    if (lv == 1) {
                        var item = Scheme.List(Scheme.Sym("list->vector"), f[i].cdr.car);
                        item["splicing"] = true;
                        vecs.push(item);
                        vecs.push([]);
                    }
                    else {
                        var item = Scheme.List(Scheme.Sym("cons"), Scheme.List(Scheme.Sym("list"), Scheme.List(Scheme.Sym("quote"), Scheme.Sym("unquote-splicing")), expand_qq(f[i].car.cdr.car, lv - 1)), expand_qq(f[i].cdr, lv));
                        // _.last(vecs).push(item);
                        vecs[vecs.length - 1].push(item);
                    }
                }
                else {
                    // Expand other things as the same as if they are in a list quasiquote
                    // _.last(vecs).push(expand_qq(f[i], lv));
                    vecs[vecs.length - 1].push(expand_qq(f[i], lv));
                }
            }
            var vectors = vecs.map(function (vec) {
                if (vec["splicing"]) {
                    return vec;
                }
                else {
                    return Scheme.Cons(Scheme.Sym("vector"), Scheme.array_to_list(vec));
                }
            });
            if (vectors.length == 1) {
                return Scheme.Cons(Scheme.Sym("vector"), Scheme.array_to_list(vecs[0]));
            }
            else {
                return Scheme.Cons(Scheme.Sym("vector-append"), Scheme.array_to_list(vectors));
            }
        }
        else
            return f;
    };
    Scheme.define_syntax("quasiquote", function (x) {
        return expand_qq(x.cdr.car, 1);
    });
    //unquote
    Scheme.define_syntax("unquote", function (x) {
        throw new Error("unquote(,) must be inside quasiquote(`)");
    });
    //unquote-splicing
    Scheme.define_syntax("unquote-splicing", function (x) {
        throw new Error("unquote-splicing(,@) must be inside quasiquote(`)");
    });
    //        11.18  Binding constructs for syntactic keywords
    //let-syntax
    //letrec-syntax
    //        11.19  Macro transformers
    //syntax-rules
    //identifier-syntax
    //
    //        11.20  Tail calls and tail contexts
    //(no library function introduced)
    ///
    /// R6RS Standard Libraries
    ///
    //
    // Chapter 1 Unicode
    //
    //(char-upcase char)    procedure
    //(char-downcase char)    procedure
    //(char-titlecase char)    procedure
    //(char-foldcase char)    procedure
    //
    //(char-ci=? char1 char2 char3 ...)    procedure
    //(char-ci<? char1 char2 char3 ...)    procedure
    //(char-ci>? char1 char2 char3 ...)    procedure
    //(char-ci<=? char1 char2 char3 ...)    procedure
    //(char-ci>=? char1 char2 char3 ...)    procedure
    //
    //(char-alphabetic? char)    procedure
    //(char-numeric? char)    procedure
    //(char-whitespace? char)    procedure
    //(char-upper-case? char)    procedure
    //(char-lower-case? char)    procedure
    //(char-title-case? char)    procedure
    //
    //(char-general-category char)    procedure
    //(string-upcase string)    procedure
    Scheme.define_libfunc("string-upcase", 1, 1, function (ar) {
        Scheme.assert_string(ar[0]);
        return ar[0].toUpperCase();
    });
    //(string-downcase string)    procedure
    Scheme.define_libfunc("string-downcase", 1, 1, function (ar) {
        Scheme.assert_string(ar[0]);
        return ar[0].toLowerCase();
    });
    //(string-titlecase string)    procedure
    //(string-foldcase string)    procedure
    function make_string_ci_function(compare) {
        return function (ar) {
            Scheme.assert_string(ar[0]);
            var str = ar[0].toUpperCase();
            for (var i = 1; i < ar.length; i++) {
                Scheme.assert_string(ar[i]);
                if (!compare(str, ar[i].toUpperCase()))
                    return false;
            }
            return true;
        };
    }
    ;
    //(string-ci=? string1 string2 string3 ...)    procedure
    Scheme.define_libfunc("string-ci=?", 2, null, make_string_ci_function(function (a, b) { return a == b; }));
    //(string-ci<? string1 string2 string3 ...)    procedure
    Scheme.define_libfunc("string-ci<?", 2, null, make_string_ci_function(function (a, b) { return a < b; }));
    //(string-ci>? string1 string2 string3 ...)    procedure
    Scheme.define_libfunc("string-ci>?", 2, null, make_string_ci_function(function (a, b) { return a > b; }));
    //(string-ci<=? string1 string2 string3 ...)    procedure
    Scheme.define_libfunc("string-ci<=?", 2, null, make_string_ci_function(function (a, b) { return a <= b; }));
    //(string-ci>=? string1 string2 string3 ...)    procedure
    Scheme.define_libfunc("string-ci>=?", 2, null, make_string_ci_function(function (a, b) { return a >= b; }));
    //(string-normalize-nfd string)    procedure
    //(string-normalize-nfkd string)    procedure
    //(string-normalize-nfc string)    procedure
    //(string-normalize-nfkc string)    procedure
    //
    // Chapter 2 Bytevectors
    //
    //
    // Chapter 3 List utilities
    //
    Scheme.define_libfunc("find", 2, 2, function (ar) {
        var proc = ar[0], ls = ar[1];
        Scheme.assert_list(ls);
        return Scheme.Call.foreach(ls, {
            call: function (x) { return new Scheme.Call(proc, [x.car]); },
            result: function (res, x) { if (res)
                return x.car; },
            finish: function () { return false; }
        });
    });
    Scheme.define_libfunc("for-all", 2, null, function (ar) {
        var proc = ar.shift();
        var lists = ar;
        lists.forEach(Scheme.assert_list);
        var last = true; //holds last result which proc returns
        return Scheme.Call.multi_foreach(lists, {
            call: function (pairs) {
                return new Scheme.Call(proc, (pairs).map((x) => { return x.car; }));
            },
            result: function (res, pairs) {
                if (res === false)
                    return false;
                last = res;
            },
            finish: function () { return last; }
        });
    });
    Scheme.define_libfunc("exists", 2, null, function (ar) {
        var proc = ar.shift();
        var lists = ar;
        lists.forEach(Scheme.assert_list);
        return Scheme.Call.multi_foreach(lists, {
            call: function (pairs) {
                return new Scheme.Call(proc, pairs.map((x) => { return x.car; }));
            },
            result: function (res, pairs) {
                if (res !== false)
                    return res;
            },
            finish: function () { return false; }
        });
    });
    Scheme.define_libfunc("filter", 2, 2, function (ar) {
        var proc = ar[0], ls = ar[1];
        Scheme.assert_list(ls);
        var a = [];
        return Scheme.Call.foreach(ls, {
            call: function (x) { return new Scheme.Call(proc, [x.car]); },
            result: function (res, x) { if (res)
                a.push(x.car); },
            finish: function () { return Scheme.array_to_list(a); }
        });
    });
    //  define_scmfunc("partition+", 2, 2,
    //    "(lambda (proc ls)  \
    //       (define (partition2 proc ls t f) \
    //         (if (null? ls) \
    //           (values (reverse t) (reverse f)) \
    //           (if (proc (car ls)) \
    //             (partition2 proc (cdr ls) (cons (car ls) t) f) \
    //             (partition2 proc (cdr ls) t (cons (car ls) f))))) \
    //       (partition2 proc ls '() '()))");
    Scheme.define_libfunc("partition", 2, 2, function (ar) {
        var proc = ar[0], ls = ar[1];
        Scheme.assert_list(ls);
        var t = [], f = [];
        return Scheme.Call.foreach(ls, {
            call: function (x) { return new Scheme.Call(proc, [x.car]); },
            result: function (res, x) {
                if (res)
                    t.push(x.car);
                else
                    f.push(x.car);
            },
            finish: function () {
                return new Scheme.Values([Scheme.array_to_list(t), Scheme.array_to_list(f)]);
            }
        });
    });
    Scheme.define_libfunc("fold-left", 3, null, function (ar) {
        var proc = ar.shift(), accum = ar.shift(), lists = ar;
        lists.forEach(Scheme.assert_list);
        return Scheme.Call.multi_foreach(lists, {
            call: function (pairs) {
                var args = pairs.map((x) => { return x.car; });
                args.unshift(accum);
                return new Scheme.Call(proc, args);
            },
            result: function (res, pairs) { accum = res; },
            finish: function () { return accum; }
        });
    });
    Scheme.define_libfunc("fold-right", 3, null, function (ar) {
        var proc = ar.shift(), accum = ar.shift();
        var lists = ar.map((ls) => {
            // reverse each list
            Scheme.assert_list(ls);
            return Scheme.array_to_list(ls.to_array().reverse());
        });
        return Scheme.Call.multi_foreach(lists, {
            call: function (pairs) {
                var args = pairs.map((x) => { return x.car; });
                args.push(accum);
                return new Scheme.Call(proc, args);
            },
            result: function (res, pairs) { accum = res; },
            finish: function () { return accum; }
        });
    });
    Scheme.define_libfunc("remp", 2, 2, function (ar) {
        var proc = ar[0], ls = ar[1];
        Scheme.assert_list(ls);
        var ret = [];
        return Scheme.Call.foreach(ls, {
            call: function (x) { return new Scheme.Call(proc, [x.car]); },
            result: function (res, x) { if (!res)
                ret.push(x.car); },
            finish: function () { return Scheme.array_to_list(ret); }
        });
    });
    var make_remover = function (key) {
        return function (ar) {
            var obj = ar[0], ls = ar[1];
            Scheme.assert_list(ls);
            var ret = [];
            return Scheme.Call.foreach(ls, {
                call: function (x) {
                    return new Scheme.Call(Scheme.TopEnv[key] || Scheme.CoreEnv[key], [obj, x.car]);
                },
                result: function (res, x) { if (!res)
                    ret.push(x.car); },
                finish: function () { return Scheme.array_to_list(ret); }
            });
        };
    };
    Scheme.define_libfunc("remove", 2, 2, make_remover("equal?"));
    Scheme.define_libfunc("remv", 2, 2, make_remover("eqv?"));
    Scheme.define_libfunc("remq", 2, 2, make_remover("eq?"));
    Scheme.define_libfunc("memp", 2, 2, function (ar) {
        var proc = ar[0], ls = ar[1];
        Scheme.assert_list(ls);
        // var ret: any[] = [];
        return Scheme.Call.foreach(ls, {
            call: function (x) { return new Scheme.Call(proc, [x.car]); },
            result: function (res, x) { if (res)
                return x; },
            finish: function () { return false; }
        });
    });
    var make_finder = function (key) {
        return function (ar) {
            var obj = ar[0], ls = ar[1];
            Scheme.assert_list(ls);
            // var ret = [];
            return Scheme.Call.foreach(ls, {
                call: function (x) {
                    return new Scheme.Call(Scheme.TopEnv[key] || Scheme.CoreEnv[key], [obj, x.car]);
                },
                result: function (res, x) { if (res)
                    return x; },
                finish: function () { return false; }
            });
        };
    };
    Scheme.define_libfunc("member", 2, 2, make_finder("equal?"));
    Scheme.define_libfunc("memv", 2, 2, make_finder("eqv?"));
    Scheme.define_libfunc("memq", 2, 2, make_finder("eq?"));
    Scheme.define_libfunc("assp", 2, 2, function (ar) {
        var proc = ar[0], als = ar[1];
        Scheme.assert_list(als);
        // var ret = [];
        return Scheme.Call.foreach(als, {
            call: function (x) {
                if (x.car.car)
                    return new Scheme.Call(proc, [x.car.car]);
                else
                    throw new Error("ass*: pair required but got " + Scheme.to_write(x.car));
            },
            result: function (res, x) { if (res)
                return x.car; },
            finish: function () { return false; }
        });
    });
    var make_assoc = function (func_name, eq_func_name) {
        return function (ar) {
            var obj = ar[0], list = ar[1];
            Scheme.assert_list(list);
            // var ret = [];
            return Scheme.Call.foreach(list, {
                call: function (ls) {
                    if (!Scheme.isPair(ls.car))
                        throw new Error(func_name + ": pair required but got " + Scheme.to_write(ls.car));
                    var equality = (Scheme.TopEnv[eq_func_name] || Scheme.CoreEnv[eq_func_name]);
                    return new Scheme.Call(equality, [obj, ls.car.car]);
                },
                result: function (was_equal, ls) { if (was_equal)
                    return ls.car; },
                finish: function () { return false; }
            });
        };
    };
    Scheme.define_libfunc("assoc", 2, 2, make_assoc("assoc", "equal?"));
    Scheme.define_libfunc("assv", 2, 2, make_assoc("assv", "eqv?"));
    Scheme.define_libfunc("assq", 2, 2, make_assoc("assq", "eq?"));
    Scheme.define_libfunc("cons*", 1, null, function (ar) {
        if (ar.length == 1)
            return ar[0];
        else {
            var ret = null;
            ar.reverse().forEach((x) => {
                if (ret) {
                    ret = new Scheme.Pair(x, ret);
                }
                else
                    ret = x;
            });
            return ret;
        }
    });
    //
    // Chapter 4 Sorting
    //
    (function () {
        // Destructively sort the given array
        // with scheme function `proc` as comparator
        var mergeSort = function (ary, proc, finish) {
            if (ary.length <= 1)
                return finish(ary);
            return mergeSort_(ary, proc, finish, [[0, ary.length, false]], false);
        };
        var mergeSort_ = function (ary, proc, finish, stack, up) {
            while (true) {
                var start = stack[stack.length - 1][0], end = stack[stack.length - 1][1], left = stack[stack.length - 1][2];
                var len = end - start;
                //console.debug("mergeSort_", ary, stack.join(' '), up?"u":"d", ""+start+".."+(end-1))
                if (len >= 2 && !up) {
                    // There are parts to be sorted
                    stack.push([start, start + (len >> 1), true]);
                    continue;
                }
                else if (left) {
                    // Left part sorted. Continue to the right one
                    stack.pop();
                    var rend = stack[stack.length - 1][1];
                    stack.push([end, rend, false]);
                    up = false;
                    continue;
                }
                else {
                    // Right part sorted. Merge left and right
                    stack.pop();
                    var lstart = stack[stack.length - 1][0];
                    var ary1 = ary.slice(lstart, start), ary2 = ary.slice(start, end);
                    return merge_(ary1, ary2, proc, [], 0, 0, function (ret) {
                        //console.debug("mergeSortd", ary, stack.join(' '), up?"u":"d", ary1, ary2, ret, ""+start+".."+(start+len-1));
                        for (var i = 0; i < ret.length; i++) {
                            ary[lstart + i] = ret[i];
                        }
                        if (stack.length == 1) {
                            return finish(ary);
                        }
                        else {
                            return mergeSort_(ary, proc, finish, stack, true);
                        }
                    });
                }
            }
        };
        var merge_ = function (ary1, ary2, proc, ret, i, j, cont) {
            //console.debug("merge_", ary1, ary2, ret, i, j);
            var len1 = ary1.length, len2 = ary2.length;
            if (i < len1 && j < len2) {
                return new Scheme.Call(proc, [ary2[j], ary1[i]], function (ar) {
                    //console.debug("comp", [ary2[j], ary1[i]], ar[0]);
                    if (ar[0]) {
                        ret.push(ary2[j]);
                        j += 1;
                    }
                    else {
                        ret.push(ary1[i]);
                        i += 1;
                    }
                    return merge_(ary1, ary2, proc, ret, i, j, cont);
                });
            }
            else {
                while (i < len1) {
                    ret.push(ary1[i]);
                    i += 1;
                }
                while (j < len2) {
                    ret.push(ary2[j]);
                    j += 1;
                }
                return cont(ret);
            }
        };
        var compareFn = function (a, b) {
            return Scheme.lt(a, b) ? -1 : Scheme.lt(b, a) ? 1 : 0;
        };
        Scheme.define_libfunc("list-sort", 1, 2, function (ar) {
            if (ar[1]) {
                Scheme.assert_procedure(ar[0]);
                Scheme.assert_list(ar[1]);
                return mergeSort(ar[1].to_array(), ar[0], function (ret) {
                    return Scheme.array_to_list(ret);
                });
            }
            else {
                Scheme.assert_list(ar[0]);
                return Scheme.array_to_list(ar[0].to_array().sort(compareFn));
            }
        });
        //(vector-sort proc vector)    procedure
        Scheme.define_libfunc("vector-sort", 1, 2, function (ar) {
            if (ar[1]) {
                Scheme.assert_procedure(ar[0]);
                Scheme.assert_vector(ar[1]);
                return mergeSort(Scheme.clone(ar[1]), ar[0], function (ret) {
                    return ret;
                });
            }
            else {
                Scheme.assert_vector(ar[0]);
                return Scheme.clone(ar[0]).sort(compareFn);
            }
        });
        //(vector-sort! proc vector)    procedure
        Scheme.define_libfunc("vector-sort!", 1, 2, function (ar) {
            if (ar[1]) {
                Scheme.assert_procedure(ar[0]);
                Scheme.assert_vector(ar[1]);
                return mergeSort(ar[1], ar[0], function (ret) {
                    return Scheme.undef;
                });
            }
            else {
                Scheme.assert_vector(ar[0]);
                ar[0].sort(compareFn);
                return Scheme.undef;
            }
        });
    })();
    //
    // Chapter 5 Control Structures
    //
    Scheme.define_syntax("when", function (x) {
        //(when test body ...)
        //=> (if test (begin body ...) #<undef>)
        var test = x.cdr.car, body = x.cdr.cdr;
        return new Scheme.Pair(Scheme.Sym("if"), new Scheme.Pair(test, new Scheme.Pair(new Scheme.Pair(Scheme.Sym("begin"), body), new Scheme.Pair(Scheme.undef, Scheme.nil))));
    });
    Scheme.define_syntax("unless", function (x) {
        //(unless test body ...)
        //=> (if (not test) (begin body ...) #<undef>)
        var test = x.cdr.car, body = x.cdr.cdr;
        return new Scheme.Pair(Scheme.Sym("if"), new Scheme.Pair(new Scheme.Pair(Scheme.Sym("not"), new Scheme.Pair(test, Scheme.nil)), new Scheme.Pair(new Scheme.Pair(Scheme.Sym("begin"), body), new Scheme.Pair(Scheme.undef, Scheme.nil))));
    });
    Scheme.define_syntax("do", function (x) {
        //(do ((var1 init1 step1)
        //     (var2 init2 step2) ...)
        //    (test expr1 expr2 ...)
        //  body1 body2 ...)
        //=> (let loop` ((var1 init1) (var2 init2) ...)
        //     (if test
        //       (begin expr1 expr2 ...)
        //       (begin body1 body2 ...
        //              (loop` step1 step2 ...)))))
        // parse arguments
        if (!Scheme.isPair(x.cdr))
            throw new Error("do: no variables of do");
        var varsc = x.cdr.car;
        if (!Scheme.isPair(varsc))
            throw new Error("do: variables must be given as a list");
        if (!Scheme.isPair(x.cdr.cdr))
            throw new Error("do: no resulting form of do");
        var resultc = x.cdr.cdr.car;
        var bodyc = x.cdr.cdr.cdr;
        // construct subforms
        var loop = Scheme.gensym();
        var init_vars = Scheme.array_to_list(varsc.map(function (var_def) {
            var a = var_def.to_array();
            return Scheme.List(a[0], a[1]);
        }));
        var test = resultc.car;
        var result_exprs = new Scheme.Pair(Scheme.Sym("begin"), resultc.cdr);
        var next_loop = new Scheme.Pair(loop, Scheme.array_to_list(varsc.map(function (var_def) {
            var a = var_def.to_array();
            return a[2] || a[0];
        })));
        var body_exprs = new Scheme.Pair(Scheme.Sym("begin"), bodyc).concat(Scheme.List(next_loop));
        // combine subforms
        return Scheme.List(Scheme.Sym("let"), loop, init_vars, Scheme.List(Scheme.Sym("if"), test, result_exprs, body_exprs));
    });
    //(case-lambda <case-lambda clause> ...)    syntax
    Scheme.define_syntax("case-lambda", function (x) {
        if (!Scheme.isPair(x.cdr))
            throw new Scheme._Error("case-lambda: at least 1 clause required");
        var clauses = x.cdr.to_array();
        var args_ = Scheme.gensym();
        var exec = Scheme.List(Scheme.Sym("raise"), "case-lambda: no matching clause found");
        clauses.reverse().forEach(function (clause) {
            if (!Scheme.isPair(clause))
                throw new Scheme._Error("case-lambda: clause must be a pair: " +
                    Scheme.to_write(clause));
            var formals = clause.car, clause_body = clause.cdr;
            if (formals === Scheme.nil) {
                exec = Scheme.List(Scheme.Sym("if"), Scheme.List(Scheme.Sym("null?"), args_), new Scheme.Pair(Scheme.Sym("begin"), clause_body), exec);
            }
            else if (Scheme.isPair(formals)) {
                var len = formals.length(), last_cdr = formals.last_cdr();
                var pred = (last_cdr === Scheme.nil ? Scheme.Sym("=") : Scheme.Sym(">="));
                var lambda = new Scheme.Pair(Scheme.Sym("lambda"), new Scheme.Pair(formals, clause_body));
                exec = Scheme.List(Scheme.Sym("if"), Scheme.List(pred, Scheme.List(Scheme.Sym("length"), args_), len), Scheme.List(Scheme.Sym("apply"), lambda, args_), exec);
            }
            else if (Scheme.isSymbol(formals)) {
                exec = new Scheme.Pair(Scheme.Sym("let1"), new Scheme.Pair(formals, new Scheme.Pair(args_, clause_body)));
                // Note: previous `exec` is just discarded because this is a wildcard pattern.
            }
            else {
                throw new Error("case-lambda: invalid formals: " +
                    Scheme.to_write(formals));
            }
        });
        return Scheme.List(Scheme.Sym("lambda"), args_, exec);
    });
    //
    // Chapter 6 Records
    // see also: src/system/record.js
    //
    // 6.2 Records: Syntactic layer
    //eqv, eq
    //(define-record-type <name spec> <record clause>*)    syntax
    Scheme.define_syntax("define-record-type", function (x) {
        // (define-record-type <name spec> <record clause>*)
        var name_spec = x.cdr.car;
        var record_clauses = x.cdr.cdr;
        // 1. parse name spec
        // <name spec>: either
        // - <record name> eg: point
        // - (<record name> <constructor name> <predicate name>)
        //   eg: (point make-point point?)
        if (Scheme.isSymbol(name_spec)) {
            var record_name = name_spec;
            var constructor_name = Scheme.Sym("make-" + name_spec.name);
            var predicate_name = Scheme.Sym(name_spec.name + "?");
        }
        else {
            Scheme.assert_list(name_spec);
            var record_name = name_spec.car;
            var constructor_name = name_spec.cdr.car;
            var predicate_name = name_spec.cdr.cdr.car;
            Scheme.assert_symbol(record_name);
            Scheme.assert_symbol(constructor_name);
            Scheme.assert_symbol(predicate_name);
        }
        // 2. parse record clauses
        var sealed = false;
        var opaque = false;
        // var nongenerative = false;
        var uid = false;
        var parent_name;
        var parent_rtd = false;
        var parent_cd = false;
        var protocol = false;
        var fields = [];
        // <record clause>:
        record_clauses.to_array().forEach((clause) => {
            switch (clause.car) {
                // - (fields <field spec>*)
                case Scheme.Sym("fields"):
                    fields = clause.cdr.to_array().map((field_spec, idx) => {
                        if (Scheme.isSymbol(field_spec)) {
                            // - <field name>
                            return {
                                name: field_spec, idx: idx, mutable: false,
                                accessor_name: null, mutator_name: null
                            };
                        }
                        else {
                            Scheme.assert_list(field_spec);
                            Scheme.assert_symbol(field_spec.car);
                            switch (field_spec.car) {
                                case Scheme.Sym("immutable"):
                                    // - (immutable <field name>)
                                    // - (immutable <field name> <accessor name>)
                                    var field_name = field_spec.cdr.car;
                                    Scheme.assert_symbol(field_name);
                                    if (Scheme.isNil(field_spec.cdr.cdr))
                                        return { name: field_name, idx: idx, mutable: false };
                                    else
                                        return {
                                            name: field_name, idx: idx, mutable: false,
                                            accessor_name: field_spec.cdr.cdr.car
                                        };
                                //break;
                                case Scheme.Sym("mutable"):
                                    // - (mutable <field name>)
                                    // - (mutable <field name> <accessor name> <mutator name>)
                                    var field_name = field_spec.cdr.car;
                                    Scheme.assert_symbol(field_name);
                                    if (Scheme.isNil(field_spec.cdr.cdr))
                                        return { name: field_name, idx: idx, mutable: true };
                                    else
                                        return {
                                            name: field_name, idx: idx, mutable: true,
                                            accessor_name: field_spec.cdr.cdr.car,
                                            mutator_name: field_spec.cdr.cdr.cdr.car
                                        };
                                //break;
                                default:
                                    throw new Error("define-record-type: field definition " +
                                        "must start with `immutable' or `mutable' " +
                                        "but got " + Scheme.inspect(field_spec.car));
                            }
                        }
                    });
                    break;
                // - (parent <name>)
                case Scheme.Sym("parent"):
                    parent_name = clause.cdr.car;
                    Scheme.assert_symbol(parent_name);
                    break;
                // - (protocol <expr>)
                case Scheme.Sym("protocol"):
                    protocol = clause.cdr.car;
                    break;
                // - (sealed <bool>)
                case Scheme.Sym("sealed"):
                    sealed = !!clause.cdr.car;
                    break;
                // - (opaque <bool>)
                case Scheme.Sym("opaque"):
                    opaque = !!clause.cdr.car;
                    break;
                // - (nongenerative <uid>?)
                case Scheme.Sym("nongenerative"):
                    // nongenerative = true;
                    uid = clause.cdr.car;
                    break;
                // - (parent-rtd <rtd> <cd>)
                case Scheme.Sym("parent-rtd"):
                    parent_rtd = clause.cdr.car;
                    parent_cd = clause.cdr.cdr.car;
                    break;
                default:
                    throw new Scheme._Error("define-record-type: unknown clause `" +
                        Scheme.to_write(clause.car) + "'");
            }
        });
        if (parent_name) {
            parent_rtd = [Scheme.Sym("record-type-descriptor"), parent_name];
            parent_cd = [Scheme.Sym("record-constructor-descriptor"), parent_name];
        }
        // 3. build the definitions
        // Note: In this implementation, rtd and cd are not bound to symbols.
        // They are referenced through record name by record-type-descriptor
        // and record-constructor-descriptor. These relation are stored in
        // the hash BiwaScheme.Record._DefinedTypes.
        var rtd = [Scheme.Sym("record-type-descriptor"), record_name];
        var cd = [Scheme.Sym("record-constructor-descriptor"), record_name];
        // registration
        var rtd_fields = fields.map((field) => {
            return Scheme.List(Scheme.Sym(field.mutable ? "mutable" : "immutable"), field.name);
        });
        rtd_fields.is_vector = true; //tell List not to convert
        var rtd_def = [Scheme.Sym("make-record-type-descriptor"),
            [Scheme.Sym("quote"), record_name], parent_rtd, uid,
            sealed, opaque, rtd_fields];
        var cd_def = [Scheme.Sym("make-record-constructor-descriptor"),
            Scheme.Sym("__rtd"), parent_cd, protocol];
        var registration = [Scheme.Sym("let*"), [[Scheme.Sym("__rtd"), rtd_def],
                [Scheme.Sym("__cd"), cd_def]],
            [Scheme.Sym("_define-record-type"),
                [Scheme.Sym("quote"), record_name], Scheme.Sym("__rtd"), Scheme.Sym("__cd")]];
        // accessors and mutators
        var accessor_defs = fields.map((field) => {
            var name = field.accessor_name ||
                Scheme.Sym(record_name.name + "-" + field.name.name);
            return [Scheme.Sym("define"), name, [Scheme.Sym("record-accessor"), rtd, field.idx]];
        });
        //var mutator_defs = filter(fields, function (field) {
        //    return field.mutable;
        //});
        var mutator_defs = fields.filter(field => field.mutable);
        mutator_defs = mutator_defs.map((field) => {
            var name = field.mutator_name ||
                Scheme.Sym(record_name.name + "-" + field.name.name + "-set!");
            return [Scheme.Sym("define"), name, [Scheme.Sym("record-mutator"), rtd, field.idx]];
        });
        // Wrap the definitions with `begin'
        // Example:
        //   (begin
        //     (let* ((__rtd (make-record-type-descriptor 'square
        //                     (record-type-descriptor rect)
        //                     #f #f #f
        //                     #((mutable w) (mutable h))))
        //            (__cd (make-record-constructor-descriptor __rtd
        //                    (record-constructor-descriptor rect)
        //                    (lambda (n) ...))))
        //       (_define-record-type 'square __rtd __cd))
        //
        //     (define make-square
        //       (record-constructor
        //         (record-constructor-descriptor square)))
        //     (define square?
        //       (record-predicate (record-type-descriptor square)))
        //     (define square-w
        //       (record-accessor (record-type-descriptor square) 0))
        //     (define square-h
        //       (record-accessor (record-type-descriptor square) 1))
        //     (define set-square-w!
        //       (record-mutator (record-type-descriptor square) 0))
        //     (define set-square-h!
        //       (record-mutator (record-type-descriptor square) 1)))
        //
        return Scheme.deep_array_to_list([Scheme.Sym("begin"),
            registration,
            [Scheme.Sym("define"), constructor_name, [Scheme.Sym("record-constructor"), cd]],
            [Scheme.Sym("define"), predicate_name, [Scheme.Sym("record-predicate"), rtd]],
        ].concat(accessor_defs).
            concat(mutator_defs));
    });
    Scheme.define_libfunc("_define-record-type", 3, 3, function (ar) {
        Scheme.assert_symbol(ar[0]);
        Scheme.assert_record_td(ar[1]);
        Scheme.assert_record_cd(ar[2]);
        Scheme._Record.define_type(ar[0].name, ar[1], ar[2]);
        return Scheme.undef;
    });
    //(record-type-descriptor <record name>)    syntax
    Scheme.define_syntax("record-type-descriptor", function (x) {
        return Scheme.deep_array_to_list([Scheme.Sym("_record-type-descriptor"), [Scheme.Sym("quote"), x.cdr.car]]);
    });
    Scheme.define_libfunc("_record-type-descriptor", 1, 1, function (ar) {
        Scheme.assert_symbol(ar[0]);
        var type = Scheme._Record.get_type(ar[0].name);
        if (type)
            return type.rtd;
        else
            throw new Error("record-type-descriptor: unknown record type " + ar[0].name);
    });
    //(record-constructor-descriptor <record name>)    syntax
    Scheme.define_syntax("record-constructor-descriptor", function (x) {
        return Scheme.deep_array_to_list([Scheme.Sym("_record-constructor-descriptor"), [Scheme.Sym("quote"), x.cdr.car]]);
    });
    Scheme.define_libfunc("_record-constructor-descriptor", 1, 1, function (ar) {
        Scheme.assert_symbol(ar[0]);
        var type = Scheme._Record.get_type(ar[0].name);
        if (type)
            return type.cd;
        else
            throw new Error("record-constructor-descriptor: unknown record type " + ar[0].name);
    });
    // 6.3  Records: Procedural layer
    //(make-record-type-descriptor name    procedure
    Scheme.define_libfunc("make-record-type-descriptor", 6, 6, function (ar) {
        var name = ar[0], parent_rtd = ar[1], uid = ar[2], sealed = ar[3], opaque = ar[4], fields = ar[5];
        Scheme.assert_symbol(name);
        if (parent_rtd)
            Scheme.assert_record_td(parent_rtd);
        if (uid) {
            Scheme.assert_symbol(uid);
            var _rtd = Scheme._Record.RTD.NongenerativeRecords[uid.name];
            if (_rtd) {
                // the record type is already defined.
                return _rtd;
                // should check equality of other arguments..
            }
        }
        sealed = !!sealed;
        opaque = !!opaque;
        Scheme.assert_vector(fields);
        for (var i = 0; i < fields.length; i++) {
            var list = fields[i];
            Scheme.assert_symbol(list.car, "mutability");
            Scheme.assert_symbol(list.cdr.car, "field name");
            fields[i] = [list.cdr.car.name, (list.car == Scheme.Sym("mutable"))];
        }
        ;
        var rtd = new Scheme._Record.RTD(name, parent_rtd, uid, sealed, opaque, fields);
        if (uid)
            Scheme._Record.RTD.NongenerativeRecords[uid.name] = rtd;
        return rtd;
    });
    //(record-type-descriptor? obj)    procedure
    Scheme.define_libfunc("record-type-descriptor?", 1, 1, function (ar) {
        return (ar[0] instanceof Scheme._Record.RTD);
    });
    //(make-record-constructor-descriptor rtd    procedure
    Scheme.define_libfunc("make-record-constructor-descriptor", 3, 3, function (ar) {
        var rtd = ar[0], parent_cd = ar[1], protocol = ar[2];
        Scheme.assert_record_td(rtd);
        if (parent_cd)
            Scheme.assert_record_cd(parent_cd);
        if (protocol)
            Scheme.assert_procedure(protocol);
        return new Scheme._Record.CD(rtd, parent_cd, protocol);
    });
    //(record-constructor constructor-descriptor)    procedure
    Scheme.define_libfunc("record-constructor", 1, 1, function (ar) {
        var cd = ar[0];
        Scheme.assert_record_cd(cd);
        return cd.record_constructor();
    });
    //(record-predicate rtd)    procedure
    Scheme.define_libfunc("record-predicate", 1, 1, function (ar) {
        var rtd = ar[0];
        Scheme.assert_record_td(rtd);
        return new Scheme.FunctionHolder("", 0, 0, (args) => {
            var obj = args[0];
            return (obj instanceof Scheme._Record) &&
                (obj.rtd === rtd);
        });
        ;
    });
    //(record-accessor rtd k)    procedure
    Scheme.define_libfunc("record-accessor", 2, 2, function (ar) {
        var rtd = ar[0], k = ar[1];
        Scheme.assert_record_td(rtd);
        Scheme.assert_integer(k);
        for (var _rtd = rtd.parent_rtd; _rtd; _rtd = _rtd.parent_rtd)
            k += _rtd.fields.length;
        return new Scheme.FunctionHolder("", 0, 0, (args) => {
            var record = args[0];
            var error_msg = rtd.name.name + "-" + rtd.field_name(k) + ": " +
                Scheme.to_write(record) +
                " is not a " + rtd.name.name;
            Scheme.assert(Scheme.isRecord(record), error_msg);
            var descendant = false;
            for (var _rtd = record.rtd; _rtd; _rtd = _rtd.parent_rtd) {
                if (_rtd == rtd)
                    descendant = true;
            }
            Scheme.assert(descendant, error_msg);
            return record.get(k);
        });
    });
    //(record-mutator rtd k)    procedure
    Scheme.define_libfunc("record-mutator", 2, 2, function (ar) {
        var rtd = ar[0], k = ar[1];
        Scheme.assert_record_td(rtd);
        Scheme.assert_integer(k);
        for (var _rtd = rtd.parent_rtd; _rtd; _rtd = _rtd.parent_rtd)
            k += _rtd.fields.length;
        return new Scheme.FunctionHolder("", 0, 0, (args) => {
            var record = args[0], val = args[1];
            var func_name = rtd.field_name(k);
            Scheme.assert_record(record);
            Scheme.assert(record.rtd === rtd, func_name + ": " + Scheme.to_write(record) +
                " is not a " + rtd.name.name);
            Scheme.assert(!record.rtd.sealed, func_name + ": " + rtd.name.name + " is sealed (can't mutate)");
            record.set(k, val);
        });
    });
    // 6.4  Records: Inspection
    //(record? obj)    procedure
    Scheme.define_libfunc("record?", 1, 1, function (ar) {
        var obj = ar[0];
        if (Scheme.isRecord(obj)) {
            if (obj.rtd.opaque)
                return false; // opaque records pretend as if it is not a record.
            else
                return true;
        }
        else
            return false;
    });
    //(record-rtd record)    procedure
    Scheme.define_libfunc("record-rtd", 1, 1, function (ar) {
        Scheme.assert_record(ar[0]);
        return ar[0].rtd;
    });
    //(record-type-name rtd)    procedure
    Scheme.define_libfunc("record-type-name", 1, 1, function (ar) {
        Scheme.assert_record_td(ar[0]);
        return ar[0].name;
    });
    //(record-type-parent rtd)    procedure
    Scheme.define_libfunc("record-type-parent", 1, 1, function (ar) {
        Scheme.assert_record_td(ar[0]);
        return ar[0].parent_rtd;
    });
    //(record-type-uid rtd)    procedure
    Scheme.define_libfunc("record-type-uid", 1, 1, function (ar) {
        Scheme.assert_record_td(ar[0]);
        return ar[0].uid;
    });
    //(record-type-generative? rtd)    procedure
    Scheme.define_libfunc("record-type-generative?", 1, 1, function (ar) {
        Scheme.assert_record_td(ar[0]);
        return ar[0].generative;
    });
    //(record-type-sealed? rtd)    procedure
    Scheme.define_libfunc("record-type-sealed?", 1, 1, function (ar) {
        Scheme.assert_record_td(ar[0]);
        return ar[0].sealed;
    });
    //(record-type-opaque? rtd)    procedure
    Scheme.define_libfunc("record-type-opaque?", 1, 1, function (ar) {
        Scheme.assert_record_td(ar[0]);
        return ar[0].opaque;
    });
    //(record-type-field-names rtd)    procedure
    Scheme.define_libfunc("record-type-field-names", 1, 1, function (ar) {
        Scheme.assert_record_td(ar[0]);
        return ar[0].fields.map((field) => { return field.name; });
    });
    //(record-field-mutable? rtd k)    procedure
    Scheme.define_libfunc("record-field-mutable?", 2, 2, function (ar) {
        var rtd = ar[0], k = ar[1];
        Scheme.assert_record_td(ar[0]);
        Scheme.assert_integer(k);
        for (var _rtd = rtd.parent_rtd; _rtd; _rtd = _rtd.parent_rtd)
            k += _rtd.fields.length;
        return ar[0].fields[k].mutable;
    });
    //
    // Chapter 7 Exceptions and conditions
    //
    //(with-exception-handler handler thunk)    procedure
    //(guard (<variable>    syntax
    //(raise obj)    procedure
    Scheme.define_libfunc("raise", 1, 1, function (ar) {
        throw new Scheme.UserError(Scheme.to_write(ar[0]));
    });
    //(raise-continuable obj)    procedure
    //
    //&condition    condition type
    //(condition condition1 ...)    procedure
    //(simple-conditions condition)    procedure
    //(condition? obj)    procedure
    //(condition-predicate rtd)    procedure
    //(condition-accessor rtd proc)    procedure
    //
    //&message    condition type
    //&warning    condition type
    //&serious    condition type
    //&error    condition type
    //&violation    condition type
    //&assertion    condition type
    //&irritants    condition type
    //&who    condition type
    //&non-continuable    condition type
    //&implementation-restriction    condition type
    //&lexical    condition type
    //&syntax    condition type
    //&undefined    condition type
    //
    // Chapter 8 I/O
    //
    //  //    8  I/O
    //  //        8.1  Condition types
    //&i/o    condition type
    //&i/o-read    condition type
    //&i/o-write    condition type
    //&i/o-invalid-position    condition type
    //&i/o-filename    condition type
    //&i/o-file-protection    condition type
    //&i/o-file-is-read-only    condition type
    //&i/o-file-already-exists    condition type
    //&i/o-file-does-not-exist    condition type
    //&i/o-port    condition type
    //
    //  //        8.2  Port I/O
    //  //            8.2.1  File names
    //  //(no function introduced)
    //
    //  //            8.2.2  File options
    //(file-options <file-options symbol> ...)    syntax
    //
    //  //            8.2.3  Buffer modes
    //(buffer-mode <buffer-mode symbol>)    syntax
    //(buffer-mode? obj)    procedure
    //
    //  //            8.2.4  Transcoders
    //(latin-1-codec)    procedure
    //(utf-8-codec)    procedure
    //(utf-16-codec)    procedure
    //(eol-style <eol-style symbol>)    syntax
    //(native-eol-style)    procedure
    //&i/o-decoding    condition type
    //&i/o-encoding    condition type
    //(error-handling-mode <error-handling-mode symbol>)    syntax
    //(make-transcoder codec)    procedure
    //(make-transcoder codec eol-style)    procedure
    //(make-transcoder codec eol-style handling-mode)    procedure
    //(native-transcoder)    procedure
    //(transcoder-codec transcoder)    procedure
    //(transcoder-eol-style transcoder)    procedure
    //(transcoder-error-handling-mode transcoder)    procedure
    //(bytevector->string bytevector transcoder)    procedure
    //(string->bytevector string transcoder)    procedure
    //
    //            8.2.5  End-of-file object
    //-> 8.3 (eof-object)    procedure
    //-> 8.3 (eof-object? obj)    procedure
    //            8.2.6  Input and output ports
    Scheme.define_libfunc("port?", 1, 1, function (ar) {
        return (ar[0] instanceof Scheme.Port);
    });
    //(port-transcoder port)    procedure
    Scheme.define_libfunc("textual-port?", 1, 1, function (ar) {
        Scheme.assert_port(ar[0]);
        return !ar[0].is_binary;
    });
    Scheme.define_libfunc("binary-port?", 1, 1, function (ar) {
        Scheme.assert_port(ar[0]);
        return ar[0].is_binary;
    });
    //(transcoded-port binary-port transcoder)    procedure
    //(port-has-port-position? port)    procedure
    //(port-position port)    procedure
    //(port-has-set-port-position!? port)    procedure
    //(set-port-position! port pos)    procedure
    Scheme.define_libfunc("close-port", 1, 1, function (ar) {
        Scheme.assert_port(ar[0]);
        ar[0].close();
        return Scheme.undef;
    });
    //(call-with-port port proc)    procedure
    Scheme.define_libfunc("call-with-port", 2, 2, function (ar) {
        var port = ar[0], proc = ar[1];
        Scheme.assert_port(port);
        Scheme.assert_closure(proc);
        return new Scheme.Call(proc, [port], function (ar) {
            // Automatically close the port
            port.close();
            return ar[0]; // TODO: values
        });
    });
    //            8.2.7  Input ports
    //8.3 (input-port? obj)    procedure
    //(port-eof? input-port)    procedure
    //(open-file-input-port filename)    procedure
    //(open-bytevector-input-port bytevector)    procedure
    //(open-string-input-port string)    procedure
    //(standard-input-port)    procedure
    //8.3 (current-input-port)    procedure
    //(make-custom-binary-input-port id read!    procedure
    //(make-custom-textual-input-port id read!    procedure
    //
    //  //            8.2.8  Binary input
    //(get-u8 binary-input-port)    procedure
    //(lookahead-u8 binary-input-port)    procedure
    //(get-bytevector-n binary-input-port count)    procedure
    //(get-bytevector-n! binary-input-port    procedure
    //(get-bytevector-some binary-input-port)    procedure
    //(get-bytevector-all binary-input-port)    procedure
    //
    //  //            8.2.9  Textual input
    //(get-char textual-input-port)    procedure
    //(lookahead-char textual-input-port)    procedure
    //(get-string-n textual-input-port count)    procedure
    //(get-string-n! textual-input-port string start count)    procedure
    //(get-string-all textual-input-port)    procedure
    //(get-line textual-input-port)    procedure
    //(get-datum textual-input-port)    procedure
    //
    //            8.2.10  Output ports
    //8.3 (output-port? obj)    procedure
    //(flush-output-port output-port)    procedure
    //(output-port-buffer-mode output-port)    procedure
    //(open-file-output-port filename)    procedure
    //(open-bytevector-output-port)    procedure
    //(call-with-bytevector-output-port proc)    procedure
    //(open-string-output-port)    procedure
    //(call-with-string-output-port proc)    procedure
    Scheme.define_libfunc("call-with-string-output-port", 1, 1, function (ar) {
        var proc = ar[0];
        Scheme.assert_procedure(proc);
        var port = new Scheme.StringOutput();
        return new Scheme.Call(proc, [port], function (ar) {
            port.close();
            return port.output_string();
        });
    });
    //(standard-output-port)    procedure
    //(standard-error-port)    procedure
    //8.3 (current-output-port)    procedure
    //8.3 (current-error-port)    procedure
    //(make-custom-binary-output-port id    procedure
    //(make-custom-textual-output-port id write! get-position set-position! close)
    //  define_libfunc("make-custom-textual-output-port", 5, 5, function(ar){
    //    assert_string(ar[0]);
    //    assert_closure(ar[1]);
    //    assert_closure(ar[2]);
    //    assert_closure(ar[3]);
    //    assert_closure(ar[4]);
    //    return new Port(ar[0], ar[1], ar[2], ar[3], ar[4]);
    //  })
    //
    //  //            8.2.11  Binary output
    //(put-u8 binary-output-port octet)    procedure
    //(put-bytevector binary-output-port bytevector)    procedure
    //
    //            8.2.12  Textual output
    Scheme.define_libfunc("put-char", 2, 2, function (ar) {
        Scheme.assert_port(ar[0]);
        Scheme.assert_char(ar[1]);
        ar[0].put_string(ar[1].value);
        return Scheme.undef;
    });
    Scheme.define_libfunc("put-string", 2, 2, function (ar) {
        Scheme.assert_port(ar[0]);
        Scheme.assert_string(ar[1]);
        ar[0].put_string(ar[1]);
        return Scheme.undef;
    });
    Scheme.define_libfunc("put-datum", 2, 2, function (ar) {
        Scheme.assert_port(ar[0]);
        ar[0].put_string(Scheme.to_write(ar[1]));
        return Scheme.undef;
    });
    //
    //  //            8.2.13  Input/output ports
    //(open-file-input/output-port filename)    procedure
    //(make-custom-binary-input/output-port    procedure
    //(make-custom-textual-input/output-port    procedure
    //
    //  //        8.3  Simple I/O
    Scheme.define_libfunc("eof-object", 0, 0, function (ar) {
        return Scheme.eof;
    });
    Scheme.define_libfunc("eof-object?", 1, 1, function (ar) {
        return ar[0] === Scheme.eof;
    });
    //(call-with-input-file filename proc)    procedure
    //(call-with-output-file filename proc)    procedure
    Scheme.define_libfunc("input-port?", 1, 1, function (ar) {
        Scheme.assert_port(ar[0]);
        return ar[0].is_input;
    });
    Scheme.define_libfunc("output-port?", 1, 1, function (ar) {
        Scheme.assert_port(ar[0]);
        return ar[0].is_output;
    });
    Scheme.define_libfunc("current-input-port", 0, 0, function (ar) {
        return Scheme.Port.current_input;
    });
    Scheme.define_libfunc("current-output-port", 0, 0, function (ar) {
        return Scheme.Port.current_output;
    });
    Scheme.define_libfunc("current-error-port", 0, 0, function (ar) {
        return Scheme.Port.current_error;
    });
    //(with-input-from-file filename thunk)    procedure
    //(with-output-to-file filename thunk)    procedure
    //(open-input-file filename)    procedure
    //(open-output-file filename)    procedure
    Scheme.define_libfunc("close-input-port", 1, 1, function (ar) {
        Scheme.assert_port(ar[0]);
        if (!ar[0].is_input)
            throw new Error("close-input-port: port is not input port");
        ar[0].close();
        return Scheme.undef;
    });
    Scheme.define_libfunc("close-output-port", 1, 1, function (ar) {
        Scheme.assert_port(ar[0]);
        if (!ar[0].is_output)
            throw new Error("close-output-port: port is not output port");
        ar[0].close();
        return Scheme.undef;
    });
    //(read-char)    procedure
    //(peek-char)    procedure
    Scheme.define_libfunc("read", 0, 1, function (ar) {
        var port = ar[0] || Scheme.Port.current_input;
        Scheme.assert_port(port);
        return port.get_string(function (str) {
            return Scheme.Interpreter.read(str);
        });
    });
    Scheme.define_libfunc("write-char", 1, 2, function (ar) {
        var port = ar[1] || Scheme.Port.current_output;
        Scheme.assert_char(ar[0]);
        port.put_string(ar[0].value);
        return Scheme.undef;
    });
    Scheme.define_libfunc("newline", 0, 1, function (ar) {
        var port = ar[0] || Scheme.Port.current_output;
        port.put_string("\n");
        return Scheme.undef;
    });
    Scheme.define_libfunc("display", 1, 2, function (ar) {
        var port = ar[1] || Scheme.Port.current_output;
        port.put_string(Scheme.to_display(ar[0]));
        return Scheme.undef;
    });
    Scheme.define_libfunc("write", 1, 2, function (ar) {
        var port = ar[1] || Scheme.Port.current_output;
        Scheme.assert_port(port);
        port.put_string(Scheme.to_write(ar[0]));
        return Scheme.undef;
    });
    //
    // Chapter 9 File System
    // Chapter 10 Command-line access and exit values
    //
    // see src/library/node_functions.js
    //
    // Chapter 11 Arithmetic
    //
    ////        11.1  Bitwise operations
    ////        11.2  Fixnums
    //(fixnum? obj)    procedure
    //(fixnum-width)    procedure
    //(least-fixnum)    procedure
    //(greatest-fixnum)    procedure
    //(fx=? fx1 fx2 fx3 ...)    procedure
    //(fx>? fx1 fx2 fx3 ...)    procedure
    //(fx<? fx1 fx2 fx3 ...)    procedure
    //(fx>=? fx1 fx2 fx3 ...)    procedure
    //(fx<=? fx1 fx2 fx3 ...)    procedure
    //(fxzero? fx)    procedure
    //(fxpositive? fx)    procedure
    //(fxnegative? fx)    procedure
    //(fxodd? fx)    procedure
    //(fxeven? fx)    procedure
    //(fxmax fx1 fx2 ...)    procedure
    //(fxmin fx1 fx2 ...)    procedure
    //(fx+ fx1 fx2)    procedure
    //(fx* fx1 fx2)    procedure
    //(fx- fx1 fx2)    procedure
    //(fxdiv-and-mod fx1 fx2)    procedure
    //(fxdiv fx1 fx2)    procedure
    //(fxmod fx1 fx2)    procedure
    //(fxdiv0-and-mod0 fx1 fx2)    procedure
    //(fxdiv0 fx1 fx2)    procedure
    //(fxmod0 fx1 fx2)    procedure
    //(fx+/carry fx1 fx2 fx3)    procedure
    //(fx-/carry fx1 fx2 fx3)    procedure
    //(fx*/carry fx1 fx2 fx3)    procedure
    //(fxnot fx)    procedure
    //(fxand fx1 ...)    procedure
    //(fxior fx1 ...)    procedure
    //(fxxor fx1 ...)    procedure
    //(fxif fx1 fx2 fx3)    procedure
    //(fxbit-count fx)    procedure
    //(fxlength fx)    procedure
    //(fxfirst-bit-set fx)    procedure
    //(fxbit-set? fx1 fx2)    procedure
    //(fxcopy-bit fx1 fx2 fx3)    procedure
    //(fxbit-field fx1 fx2 fx3)    procedure
    //(fxcopy-bit-field fx1 fx2 fx3 fx4)    procedure
    //(fxarithmetic-shift fx1 fx2)    procedure
    //(fxarithmetic-shift-left fx1 fx2)    procedure
    //(fxarithmetic-shift-right fx1 fx2)    procedure
    //(fxrotate-bit-field fx1 fx2 fx3 fx4)    procedure
    //(fxreverse-bit-field fx1 fx2 fx3)    procedure
    //
    ////        11.3  Flonums
    //(flonum? obj)    procedure
    //(real->flonum x)    procedure
    //(fl=? fl1 fl2 fl3 ...)    procedure
    //(fl<? fl1 fl2 fl3 ...)    procedure
    //(fl<=? fl1 fl2 fl3 ...)    procedure
    //(fl>? fl1 fl2 fl3 ...)    procedure
    //(fl>=? fl1 fl2 fl3 ...)    procedure
    //(flinteger? fl)    procedure
    //(flzero? fl)    procedure
    //(flpositive? fl)    procedure
    //(flnegative? fl)    procedure
    //(flodd? ifl)    procedure
    //(fleven? ifl)    procedure
    //(flfinite? fl)    procedure
    //(flinfinite? fl)    procedure
    //(flnan? fl)    procedure
    //(flmax fl1 fl2 ...)    procedure
    //(flmin fl1 fl2 ...)    procedure
    //(fl+ fl1 ...)    procedure
    //(fl* fl1 ...)    procedure
    //(fl- fl1 fl2 ...)    procedure
    //(fl- fl)    procedure
    //(fl/ fl1 fl2 ...)    procedure
    //(fl/ fl)    procedure
    //(flabs fl)    procedure
    //(fldiv-and-mod fl1 fl2)    procedure
    //(fldiv fl1 fl2)    procedure
    //(flmod fl1 fl2)    procedure
    //(fldiv0-and-mod0 fl1 fl2)    procedure
    //(fldiv0 fl1 fl2)    procedure
    //(flmod0 fl1 fl2)    procedure
    //(flnumerator fl)    procedure
    //(fldenominator fl)    procedure
    //(flfloor fl)    procedure
    //(flceiling fl)    procedure
    //(fltruncate fl)    procedure
    //(flround fl)    procedure
    //(flexp fl)    procedure
    //(fllog fl)    procedure
    //(fllog fl1 fl2)    procedure
    //(flsin fl)    procedure
    //(flcos fl)    procedure
    //(fltan fl)    procedure
    //(flasin fl)    procedure
    //(flacos fl)    procedure
    //(flatan fl)    procedure
    //(flatan fl1 fl2)    procedure
    //(flsqrt fl)    procedure
    //(flexpt fl1 fl2)    procedure
    //&no-infinities    condition type
    //&no-nans    condition type
    //(fixnum->flonum fx)    procedure
    ////        11.4  Exact bitwise arithmetic
    //(bitwise-not ei)    procedure
    Scheme.define_libfunc("bitwise-not", 1, 1, function (ar) {
        return ~(ar[0]);
    });
    //(bitwise-and ei1 ...)    procedure
    //define_libfunc("bitwise-and", 1, null, function (ar) {
    //    return reduce(ar, function (ret, item) { return ret & item; });
    //});
    Scheme.define_libfunc("bitwise-and", 1, null, function (ar) {
        return ar.reduce((ret, item) => ret & item);
    });
    //(bitwise-ior ei1 ...)    procedure
    //define_libfunc("bitwise-ior", 1, null, function (ar) {
    //    return reduce(ar, function (ret, item) { return ret | item; });
    //});
    Scheme.define_libfunc("bitwise-ior", 1, null, function (ar) {
        return ar.reduce((ret, item) => ret | item);
    });
    //(bitwise-xor ei1 ...)    procedure
    //define_libfunc("bitwise-xor", 1, null, function (ar) {
    //    return reduce(ar, function (ret, item) { return ret ^ item; });
    //});
    Scheme.define_libfunc("bitwise-xor", 1, null, function (ar) {
        return ar.reduce((ret, item) => ret ^ item);
    });
    //(bitwise-if ei1 ei2 ei3)    procedure
    Scheme.define_libfunc("bitwise-if", 3, 3, function (ar) {
        return (ar[0] & ar[1]) | (~ar[0] & ar[2]);
    });
    //(bitwise-bit-count ei)    procedure
    Scheme.define_libfunc("bitwise-bit-count", 1, 1, function (ar) {
        var e = Math.abs(ar[0]), ret = 0;
        for (; e != 0; e >>= 1) {
            if (e & 1)
                ret++;
        }
        return ret;
    });
    //(bitwise-length ei)    procedure
    Scheme.define_libfunc("bitwise-length", 1, 1, function (ar) {
        var e = Math.abs(ar[0]), ret = 0;
        for (; e != 0; e >>= 1) {
            ret++;
        }
        return ret;
    });
    //(bitwise-first-bit-set ei)    procedure
    Scheme.define_libfunc("bitwise-first-bit-set", 1, 1, function (ar) {
        var e = Math.abs(ar[0]), ret = 0;
        if (e == 0)
            return -1;
        for (; e != 0; e >>= 1) {
            if (e & 1)
                return ret;
            ret++;
        }
    });
    //(bitwise-bit-set? ei1 ei2)    procedure
    Scheme.define_libfunc("bitwise-bit-set?", 2, 2, function (ar) {
        return !!(ar[0] & (1 << ar[1]));
    });
    //(bitwise-copy-bit ei1 n b)    procedure
    Scheme.define_libfunc("bitwise-copy-bit", 3, 3, function (ar) {
        var mask = (1 << ar[1]);
        return (mask & (ar[2] << ar[1])) | // Set n-th bit to b
            (~mask & ar[0]); // and use ei1 for rest of the bits
    });
    //(bitwise-bit-field ei1 start end)    procedure
    Scheme.define_libfunc("bitwise-bit-field", 3, 3, function (ar) {
        var mask = ~(-1 << ar[2]); // Has 1 at 0...end
        return (mask & ar[0]) >> ar[1];
    });
    //(bitwise-copy-bit-field dst start end src)    procedure
    Scheme.define_libfunc("bitwise-copy-bit-field", 4, 4, function (ar) {
        var dst = ar[0], start = ar[1], end = ar[2], src = ar[3];
        var mask = ~(-1 << end) & // Has 1 at 0...end
            (-1 << start); // Clear 0...start
        return (mask & (src << start)) |
            (~mask & dst);
    });
    //(bitwise-arithmetic-shift ei1 ei2)    procedure
    Scheme.define_libfunc("bitwise-arithmetic-shift", 2, 2, function (ar) {
        return (ar[1] >= 0) ? (ar[0] << ar[1]) : (ar[0] >> -ar[1]);
    });
    //(bitwise-arithmetic-shift-left ei1 ei2)    procedure
    Scheme.define_libfunc("bitwise-arithmetic-shift-left", 2, 2, function (ar) {
        return ar[0] << ar[1];
    });
    //(bitwise-arithmetic-shift-right ei1 ei2)    procedure
    Scheme.define_libfunc("bitwise-arithmetic-shift-right", 2, 2, function (ar) {
        return ar[0] >> ar[1];
    });
    //(bitwise-rotate-bit-field ei1 start end count)    procedure
    Scheme.define_libfunc("bitwise-rotate-bit-field", 4, 4, function (ar) {
        var n = ar[0], start = ar[1], end = ar[2], count = ar[3];
        var width = end - start;
        if (width <= 0)
            return n;
        count %= width;
        var orig_field = (~(-1 << end) & n) >> start;
        var rotated_field = (orig_field << count) |
            (orig_field >> (width - count));
        var mask = ~(-1 << end) & (-1 << start);
        return (mask & (rotated_field << start)) |
            (~mask & n);
    });
    //(bitwise-reverse-bit-field ei1 ei2 ei3)    procedure
    Scheme.define_libfunc("bitwise-reverse-bit-field", 3, 3, function (ar) {
        let n;
        var ret = n = ar[0], start = ar[1], end = ar[2];
        var orig_field = ((~(-1 << end) & n) >> start);
        for (var i = 0; i < (end - start); i++, orig_field >>= 1) {
            var bit = orig_field & 1;
            var setpos = end - 1 - i;
            var mask = (1 << setpos);
            ret = (mask & (bit << setpos)) | (~mask & ret);
        }
        return ret;
    });
    //
    // Chapter 12 syntax-case
    //
    //
    // Chapter 13 Hashtables
    //
    //13.1  Constructors
    //(define h (make-eq-hashtale)
    //(define h (make-eq-hashtable 1000))
    Scheme.define_libfunc("make-eq-hashtable", 0, 1, function (ar) {
        // Note: ar[1] (hashtable size) is just ignored
        return new Scheme.Hashtable(new Scheme.FunctionHolder("", 0, 0, Scheme.Hashtable.eq_hash), new Scheme.FunctionHolder("", 0, 0, Scheme.Hashtable.eq_equiv));
    });
    //(make-eqv-hashtable)    procedure
    //(make-eqv-hashtable k)    procedure
    Scheme.define_libfunc("make-eqv-hashtable", 0, 1, function (ar) {
        return new Scheme.Hashtable(Scheme.Hashtable.eqv_hash, Scheme.Hashtable.eqv_equiv);
    });
    //(make-hashtable hash-function equiv)    procedure
    //(make-hashtable hash-function equiv k)    procedure
    Scheme.define_libfunc("make-hashtable", 2, 3, function (ar) {
        Scheme.assert_procedure(ar[0]);
        Scheme.assert_procedure(ar[1]);
        return new Scheme.Hashtable(ar[0], ar[1]);
    });
    //13.2  Procedures
    // (hashtable? hash)
    Scheme.define_libfunc("hashtable?", 1, 1, function (ar) {
        return ar[0] instanceof Scheme.Hashtable;
    });
    //(hashtable-size hash)
    Scheme.define_libfunc("hashtable-size", 1, 1, function (ar) {
        Scheme.assert_hashtable(ar[0]);
        return ar[0].keys().length;
    });
    // Find a pair from a hashtable with given key.
    //
    // hash      - a BiwaScheme.Hashtable
    // key       - an object
    // callbacks - an object contains callback functions
    //             .on_found     - function(pair, hashed)
    //               pair   - [Object key, Object value]
    //               hashed - Object hashed
    //             .on_not_found - function(hashed)
    //               hashed - Object hashed
    //
    // Returns an instance of BiwaScheme.Call.
    /*export*/ function find_hash_pair(hash, key, callbacks) {
        // invoke hash proc
        return new Scheme.Call(hash.hash_proc, [key], function (ar) {
            var hashed = ar[0];
            var candidate_pairs = hash.candidate_pairs(hashed);
            if (!candidate_pairs) { // shortcut: obviously not found
                return callbacks.on_not_found(hashed);
            }
            // search the exact key from candidates
            return Scheme.Call.foreach(candidate_pairs, {
                call: function (pair) {
                    // invoke the equivalence proc
                    return new Scheme.Call(hash.equiv_proc, [key, pair[0]]);
                },
                result: function (equal, pair) {
                    if (equal) { // found
                        return callbacks.on_found(pair, hashed);
                    }
                },
                finish: function () {
                    return callbacks.on_not_found(hashed);
                }
            });
        });
    }
    ;
    //(hashtable-ref hash "foo" #f)
    Scheme.define_libfunc("hashtable-ref", 3, 3, function (ar) {
        var hash = ar[0], key = ar[1], ifnone = ar[2];
        Scheme.assert_hashtable(hash);
        return find_hash_pair(hash, key, {
            on_found: function (pair) {
                return pair[1];
            },
            on_not_found: function (hashed) {
                return ifnone;
            }
        });
    });
    //(hashtable-set! hash "foo" '(1 2))
    Scheme.define_libfunc("hashtable-set!", 3, 3, function (ar) {
        var hash = ar[0], key = ar[1], value = ar[2];
        Scheme.assert_hashtable(hash);
        Scheme.assert(hash.mutable, "hashtable is not mutable");
        return find_hash_pair(hash, key, {
            on_found: function (pair) {
                pair[1] = value;
                return Scheme.undef;
            },
            on_not_found: function (hashed) {
                hash.add_pair(hashed, key, value);
                return Scheme.undef;
            }
        });
    });
    //(hashtable-delete! hash "foo")
    Scheme.define_libfunc("hashtable-delete!", 2, 2, function (ar) {
        var hash = ar[0], key = ar[1];
        Scheme.assert_hashtable(hash);
        Scheme.assert(hash.mutable, "hashtable is not mutable");
        return find_hash_pair(hash, key, {
            on_found: function (pair, hashed) {
                hash.remove_pair(hashed, pair);
                return Scheme.undef;
            },
            on_not_found: function (hashed) {
                return Scheme.undef;
            }
        });
    });
    //(hashtable-contains? hash "foo")
    Scheme.define_libfunc("hashtable-contains?", 2, 2, function (ar) {
        var hash = ar[0], key = ar[1];
        Scheme.assert_hashtable(hash);
        return find_hash_pair(hash, key, {
            on_found: function (pair) {
                return true;
            },
            on_not_found: function (hashed) {
                return false;
            }
        });
    });
    //(hashtable-update! hashtable key proc default)    procedure
    Scheme.define_libfunc("hashtable-update!", 4, 4, function (ar) {
        var hash = ar[0], key = ar[1], proc = ar[2], ifnone = ar[3];
        Scheme.assert_hashtable(hash);
        Scheme.assert(hash.mutable, "hashtable is not mutable");
        Scheme.assert_procedure(proc);
        return find_hash_pair(hash, key, {
            on_found: function (pair, hashed) {
                // invoke proc and get new value
                return new Scheme.Call(proc, [pair[1]], function (ar) {
                    // replace the value
                    pair[1] = ar[0];
                    return Scheme.undef;
                });
            },
            on_not_found: function (hashed) {
                // invoke proc and get new value
                return new Scheme.Call(proc, [ifnone], function (ar) {
                    // create new pair
                    hash.add_pair(hashed, key, ar[0]);
                    return Scheme.undef;
                });
            }
        });
    });
    //(hashtable-copy hashtable)    procedure
    //(hashtable-copy hashtable mutable)    procedure
    Scheme.define_libfunc("hashtable-copy", 1, 2, function (ar) {
        var mutable = (ar[1] === undefined) ? false : !!ar[1];
        Scheme.assert_hashtable(ar[0]);
        return ar[0].create_copy(mutable);
    });
    //(hashtable-clear! hashtable)    procedure
    //(hashtable-clear! hashtable k)    procedure
    Scheme.define_libfunc("hashtable-clear!", 0, 1, function (ar) {
        Scheme.assert_hashtable(ar[0]);
        Scheme.assert(ar[0].mutable, "hashtable is not mutable");
        ar[0].clear();
        return Scheme.undef;
    });
    //(hashtable-keys hash)  ; => vector
    Scheme.define_libfunc("hashtable-keys", 1, 1, function (ar) {
        Scheme.assert_hashtable(ar[0]);
        return ar[0].keys();
    });
    //(hashtable-entries hash)  ; => two vectors (keys, values)
    Scheme.define_libfunc("hashtable-entries", 1, 1, function (ar) {
        Scheme.assert_hashtable(ar[0]);
        return new Scheme.Values([ar[0].keys(), ar[0].values()]);
    });
    //13.3  Inspection
    //(hashtable-equivalence-function hashtable)    procedure
    Scheme.define_libfunc("hashtable-equivalence-function", 1, 1, function (ar) {
        Scheme.assert_hashtable(ar[0]);
        return ar[0].equiv_proc;
    });
    //(hashtable-hash-function hashtable)    procedure
    Scheme.define_libfunc("hashtable-hash-function", 1, 1, function (ar) {
        Scheme.assert_hashtable(ar[0]);
        return ar[0].hash_proc;
    });
    //(hashtable-mutable? hashtable)    procedure
    Scheme.define_libfunc("hashtable-mutable?", 1, 1, function (ar) {
        Scheme.assert_hashtable(ar[0]);
        return ar[0].mutable;
    });
    //13.4  Hash functions
    //(equal-hash obj)    procedure
    Scheme.define_libfunc("equal-hash", 0, 0, function (ar) {
        return Scheme.Hashtable.equal_hash;
    });
    //(string-hash string)    procedure
    Scheme.define_libfunc("string-hash", 0, 0, function (ar) {
        return Scheme.Hashtable.string_hash;
    });
    //(string-ci-hash string)    procedure
    Scheme.define_libfunc("string-ci-hash", 0, 0, function (ar) {
        return Scheme.Hashtable.string_ci_hash;
    });
    //(symbol-hash symbol)    procedure
    Scheme.define_libfunc("symbol-hash", 0, 0, function (ar) {
        return Scheme.Hashtable.symbol_hash;
    });
    //
    // Chapter 14 Enumerators
    //
    //(make-enumeration symbol-list) -> enum-set(new type)
    Scheme.define_libfunc("make-enumeration", 1, 1, function (ar) {
        Scheme.assert_list(ar[0]);
        var members = ar[0].to_array();
        var enum_type = new Scheme.Enumeration.EnumType(members);
        return enum_type.universe();
    });
    //(enum-set-universe enum-set) -> enum-set(same type as the argument)
    Scheme.define_libfunc("enum-set-universe", 1, 1, function (ar) {
        Scheme.assert_enum_set(ar[0]);
        return ar[0].enum_type.universe();
    });
    //(enum-set-indexer enum-set) -> (lambda (sym)) -> integer or #f
    Scheme.define_libfunc("enum-set-indexer", 1, 1, function (ar) {
        Scheme.assert_enum_set(ar[0]);
        return ar[0].enum_type.indexer();
    });
    //(enum-set-constructor enum-set) -> (lambda (syms)) -> enum-set(same type as the argument)
    Scheme.define_libfunc("enum-set-constructor", 1, 1, function (ar) {
        Scheme.assert_enum_set(ar[0]);
        return ar[0].enum_type._constructor();
    });
    //(enum-set->list enum-set) -> symbol-list
    Scheme.define_libfunc("enum-set->list", 1, 1, function (ar) {
        Scheme.assert_enum_set(ar[0]);
        return ar[0].symbol_list();
    });
    //(enum-set-member? symbol enum-set) -> bool
    Scheme.define_libfunc("enum-set-member?", 2, 2, function (ar) {
        Scheme.assert_symbol(ar[0]);
        Scheme.assert_enum_set(ar[1]);
        return ar[1].is_member(ar[0]);
    });
    //(enum-set-subset? esa esb) -> bool
    Scheme.define_libfunc("enum-set-subset?", 2, 2, function (ar) {
        Scheme.assert_enum_set(ar[0]);
        Scheme.assert_enum_set(ar[1]);
        return ar[0].is_subset(ar[1]);
    });
    //(enum-set=? esa esb) -> bool
    Scheme.define_libfunc("enum-set=?", 2, 2, function (ar) {
        Scheme.assert_enum_set(ar[0]);
        Scheme.assert_enum_set(ar[1]);
        return ar[0].equal_to(ar[1]);
    });
    //(enum-set-union es1 es2) -> enum-set
    Scheme.define_libfunc("enum-set-union", 2, 2, function (ar) {
        Scheme.assert_enum_set(ar[0]);
        Scheme.assert_enum_set(ar[1]);
        Scheme.assert(ar[0].enum_type === ar[1].enum_type, "two enum-sets must be the same enum-type", "enum-set-union");
        return ar[0].union(ar[1]);
    });
    //(enum-set-intersection es1 es2) -> enum-set
    Scheme.define_libfunc("enum-set-intersection", 2, 2, function (ar) {
        Scheme.assert_enum_set(ar[0]);
        Scheme.assert_enum_set(ar[1]);
        return ar[0].intersection(ar[1]);
    });
    //(enum-set-difference es1 es2) -> enum-set
    Scheme.define_libfunc("enum-set-difference", 2, 2, function (ar) {
        Scheme.assert_enum_set(ar[0]);
        Scheme.assert_enum_set(ar[1]);
        return ar[0].difference(ar[1]);
    });
    //(enum-set-complement enum-set) -> enum-set
    Scheme.define_libfunc("enum-set-complement", 1, 1, function (ar) {
        Scheme.assert_enum_set(ar[0]);
        return ar[0].complement();
    });
    //(enum-set-projection esa esb) -> enum-set
    Scheme.define_libfunc("enum-set-projection", 2, 2, function (ar) {
        Scheme.assert_enum_set(ar[0]);
        Scheme.assert_enum_set(ar[1]);
        return ar[0].projection(ar[1]);
    });
    //(define-enumeration <type-name> (<symbol> ...) <constructor-syntax>)
    // Example:
    //   (define-enumeration color (red green black white) color-set)
    //   this defines:
    //     - an EnumType
    //     - (color red) ;=> 'red
    //     - (color-set red black) ;=> #<enum-set (red black)>
    Scheme.define_syntax("define-enumeration", function (x) {
        // Extract parameters
        var type_name = x.cdr.car;
        Scheme.assert(Scheme.isSymbol(type_name), "expected symbol for type_name", "define-enumeration");
        type_name = type_name.name;
        var members = x.cdr.cdr.car;
        Scheme.assert(Scheme.isList(members), "expected list of symbol for members", "define-enumeration");
        members = members.to_array();
        var constructor_name = x.cdr.cdr.cdr.car;
        Scheme.assert(Scheme.isSymbol(constructor_name), "expected symbol for constructor_name", "define-enumeration");
        constructor_name = constructor_name.name;
        // Define EnumType
        var enum_type = new Scheme.Enumeration.EnumType(members);
        // Define (color red)
        Scheme.define_syntax(type_name, function (x) {
            // (color)
            Scheme.assert(!Scheme.isNil(x.cdr), "an argument is needed", type_name);
            var arg = x.cdr.car;
            Scheme.assert_symbol(arg, type_name);
            // Check arg is included in the universe
            Scheme.assert(enum_type.members.includes(arg), arg.name + " is not included in the universe: " +
                Scheme.to_write(enum_type.members), type_name);
            return Scheme.List(Scheme.Sym("quote"), arg);
        });
        // Define (color-set red black)
        Scheme.define_syntax(constructor_name, function (x) {
            Scheme.assert_list(x.cdr, constructor_name);
            var symbols = x.cdr.to_array();
            // Check each argument is included in the universe
            symbols.forEach((arg) => {
                Scheme.assert_symbol(arg, constructor_name);
                Scheme.assert(enum_type.members.includes(arg), arg.name + " is not included in the universe: " +
                    Scheme.to_write(enum_type.members), constructor_name);
            });
            // Create an EnumSet
            return new Scheme.Enumeration.EnumSet(enum_type, symbols);
        });
    });
    //
    // Chapter 15 Composite library
    //
    //(rnrs 6) = all - eval - mutable pairs - mutable strings - r5rs compatibility
    //
    // Chapter 16 eval
    //
    //(eval expression environment)    procedure
    Scheme.define_libfunc("eval", 1, 1, function (ar, intp) {
        //TODO: environment
        //TODO: this implementation has a bug that
        //  expressions which contains #<undef>, etc. cannot be evaluated.
        var expr = ar[0];
        var intp2 = new Scheme.Interpreter(intp);
        return intp2.evaluate(Scheme.to_write(expr));
    });
    //(environment import-spec ...)    procedure
    //
    // Chapter 17 Mutable pairs
    //
    //(set-car! pair obj)    procedure
    //(set-cdr! pair obj)    procedure
    //
    // Chapter 18 Mutable strings
    //
    //(string-set! string k char)    procedure
    // (string-fill! string char)    procedure
    //
    // Chapter 19 R5RS compatibility
    //
    //(exact->inexact z)    procedure
    //(inexact->exact z)    procedure
    //
    //(quotient n1 n2)    procedure
    //(remainder n1 n2)    procedure
    //(modulo n1 n2)    procedure
    //
    //(null-environment n)    procedure
    //(scheme-report-environment n)    procedure
    //
    // R7RS (TODO: split file?)
    //
    // R7RS Promise
    //
    // (delay expression)
    Scheme.define_syntax("delay", function (x) {
        if (x.cdr === Scheme.nil) {
            throw new Error("malformed delay: no argument");
        }
        if (x.cdr.cdr !== Scheme.nil) {
            throw new Error("malformed delay: too many arguments: " +
                Scheme.to_write_ss(x));
        }
        var expr = x.cdr.car;
        // Expand into call of internal function
        // ( procedure->promise (lambda () (make-promise expr)))
        return new Scheme.Pair(Scheme.Sym(" procedure->promise"), new Scheme.Pair(new Scheme.Pair(Scheme.Sym("lambda"), new Scheme.Pair(Scheme.nil, new Scheme.Pair(new Scheme.Pair(Scheme.Sym("make-promise"), new Scheme.Pair(expr, Scheme.nil)), Scheme.nil)))));
    });
    // (delay-force promise-expr)
    Scheme.define_syntax("delay-force", function (x) {
        if (x.cdr === Scheme.nil) {
            throw new Error("malformed delay-force: no argument");
        }
        if (x.cdr.cdr !== Scheme.nil) {
            throw new Error("malformed delay-force: too many arguments: " + Scheme.to_write_ss(x));
        }
        var expr = x.cdr.car;
        // Expand into call of internal function
        // ( procedure->promise (lambda () expr))
        return new Scheme.Pair(Scheme.Sym(" procedure->promise"), new Scheme.Pair(new Scheme.Pair(Scheme.Sym("lambda"), new Scheme.Pair(Scheme.nil, new Scheme.Pair(expr, Scheme.nil))), Scheme.nil));
    });
    // (force promise)
    var force = function (promise) {
        if (promise.is_done()) {
            return promise.value();
        }
        return new Scheme.Call(promise.thunk(), [], function (ar) {
            Scheme.assert_promise(ar[0]);
            var new_promise = ar[0];
            if (promise.is_done()) { // reentrant!
                return promise.value();
            }
            else {
                promise.update_with(new_promise);
                return force(new_promise);
            }
        });
    };
    Scheme.define_libfunc("force", 1, 1, function (ar, intp) {
        Scheme.assert_promise(ar[0]);
        return force(ar[0]);
    });
    // (promise? obj)
    Scheme.define_libfunc("promise?", 1, 1, function (ar, intp) {
        return (ar[0] instanceof Scheme._Promise);
    });
    // (make-promise obj)
    Scheme.define_libfunc("make-promise", 1, 1, function (ar, intp) {
        var obj = ar[0];
        if (obj instanceof Scheme._Promise) {
            return obj;
        }
        else {
            return Scheme._Promise.done(obj);
        }
    });
    // internal function
    // ( procedure->promise proc)
    // proc must be a procedure with no argument and return a promise
    Scheme.define_libfunc(" procedure->promise", 1, 1, function (ar, intp) {
        Scheme.assert_procedure(ar[0]);
        return Scheme._Promise.fresh(ar[0]);
    });
    function init() {
    }
    Scheme.init = init;
})(Scheme || (Scheme = {}));
var Scheme;
(function (Scheme) {
    //
    // srfi.js - SRFI libraries
    //
    // should be src/library/srfi/1.js, etc (in the future).
    //
    //
    // srfi-1 (list)
    //
    // (iota count start? step?)
    Scheme.define_libfunc("iota", 1, 3, function (ar) {
        var count = ar[0];
        var start = ar[1] || 0;
        var step = (ar[2] === undefined) ? 1 : ar[2];
        Scheme.assert_integer(count);
        Scheme.assert_number(start);
        Scheme.assert_number(step);
        var a = [], n = start;
        for (var i = 0; i < count; i++) {
            a.push(n);
            n += step;
        }
        return Scheme.array_to_list(a);
    });
    var copy_pair = function (pair) {
        var car = Scheme.isPair(pair.car) ? copy_pair(pair.car)
            : pair.car;
        var cdr = Scheme.isPair(pair.cdr) ? copy_pair(pair.cdr)
            : pair.cdr;
        return new Scheme.Pair(car, cdr);
    };
    // (list-copy list)
    Scheme.define_libfunc("list-copy", 1, 1, function (ar) {
        if (Scheme.isPair(ar[0])) {
            return copy_pair(ar[0]);
        }
        else {
            return Scheme.nil;
        }
    });
    //
    // srfi-6 & Gauche (string port)
    // 
    Scheme.define_libfunc("open-input-string", 1, 1, function (ar) {
        Scheme.assert_string(ar[0]);
        return new Scheme.StringInput(ar[0]);
    });
    Scheme.define_libfunc("open-output-string", 0, 0, function (ar) {
        return new Scheme.StringOutput();
    });
    Scheme.define_libfunc("get-output-string", 1, 1, function (ar) {
        Scheme.assert_port(ar[0]);
        if (!(ar[0] instanceof Scheme.StringOutput))
            throw new Error("get-output-string: port must be made by 'open-output-string'");
        return ar[0].output_string();
    });
    //
    // srfi-8 (receive)
    //
    // (receive <formals> <expression> <body>...)
    // -> (call-with-values (lambda () expression)
    //                        (lambda formals body ...))
    Scheme.define_syntax("receive", function (x) {
        Scheme.assert(Scheme.isPair(x.cdr), "missing formals", "receive");
        var formals = x.cdr.car;
        Scheme.assert(Scheme.isPair(x.cdr.cdr), "missing expression", "receive");
        var expression = x.cdr.cdr.car;
        var body = x.cdr.cdr.cdr;
        return Scheme.deep_array_to_list([Scheme.Sym("call-with-values"),
            [Scheme.Sym("lambda"), Scheme.nil, expression],
            new Scheme.Pair(Scheme.Sym("lambda"), new Scheme.Pair(formals, body))]);
    });
    // srfi-19 (time)
    //
    //  // constants
    //time-duration
    //time-monotonic
    //time-process
    //time-tai
    //time-thread
    //time-utc
    // Current time and clock resolution
    // (current-date [tz-offset])
    Scheme.define_libfunc("current-date", 0, 1, function (ar) {
        //todo: tz-offset (ar[1])
        return new Date();
    });
    //
    //current-julian-day -> jdn
    //current-modified-julian-day -> mjdn
    //current-time [time-type] -> time
    //time-resolution [time-type] -> integer
    //  // Time object and accessors
    //make-time type nanosecond second -> time
    //time? object -> boolean
    //time-type time -> time-type
    //time-nanosecond time -> integer
    //time-second time -> integer
    //set-time-type! time time-type
    //set-time-nanosecond! time integer
    //set-time-second! time integer
    //copy-time time1 -> time2 
    //  // Time comparison procedures
    //time<=? time1 time2 -> boolean
    //time<? time1 time2 -> boolean
    //time=? time1 time2 -> boolean
    //time>=? time1 time2 -> boolean
    //time>? time1 time2 -> boolean
    //  // Time arithmetic procedures
    //time-difference time1 time2 -> time-duration
    //time-difference! time1 time2 -> time-duration
    //add-duration time1 time-duration -> time
    //add-duration! time1 time-duration -> time
    //subtract-duration time1 time-duration -> time
    //subtract-duration! time1 time-duration -> time
    // Date object and accessors
    // make-date
    Scheme.define_libfunc("date?", 1, 1, function (ar) {
        return (ar[0] instanceof Date);
    });
    Scheme.define_libfunc("date-nanosecond", 1, 1, function (ar) {
        Scheme.assert_date(ar[0]);
        return ar[0].getMilliseconds() * 1000000;
    });
    Scheme.define_libfunc("date-millisecond", 1, 1, function (ar) {
        Scheme.assert_date(ar[0]);
        return ar[0].getMilliseconds();
    });
    Scheme.define_libfunc("date-second", 1, 1, function (ar) {
        Scheme.assert_date(ar[0]);
        return ar[0].getSeconds();
    });
    Scheme.define_libfunc("date-minute", 1, 1, function (ar) {
        Scheme.assert_date(ar[0]);
        return ar[0].getMinutes();
    });
    Scheme.define_libfunc("date-hour", 1, 1, function (ar) {
        Scheme.assert_date(ar[0]);
        return ar[0].getHours();
    });
    Scheme.define_libfunc("date-day", 1, 1, function (ar) {
        Scheme.assert_date(ar[0]);
        return ar[0].getDate();
    });
    Scheme.define_libfunc("date-month", 1, 1, function (ar) {
        Scheme.assert_date(ar[0]);
        return ar[0].getMonth() + 1; //Jan = 0 in javascript..
    });
    Scheme.define_libfunc("date-year", 1, 1, function (ar) {
        Scheme.assert_date(ar[0]);
        return ar[0].getFullYear();
    });
    //date-zone-offset
    //date-year-day
    Scheme.define_libfunc("date-week-day", 1, 1, function (ar) {
        Scheme.assert_date(ar[0]);
        return ar[0].getDay();
    });
    //date-week-number
    // Time/Date/Julian Day/Modified Julian Day Converters
    // (snipped)
    // Date to String/String to Date Converters
    // TODO: support locale
    //   * date_names
    //   * ~f 5.2 sec
    //   * ~p AM/PM
    //   * ~X 2007/01/01
    /*export*/ const date_names = {
        weekday: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        full_weekday: ["Sunday", "Monday", "Tuesday",
            "Wednesday", "Thursday", "Friday", "Saturday"],
        month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        full_month: ["January", "February", "March", "April",
            "May", "June", "July", "August", "September",
            "Octorber", "November", "December"]
    };
    function date2string(date, format) {
        var zeropad = function (n) { return n < 10 ? "0" + n : "" + n; };
        var spacepad = function (n) { return n < 10 ? " " + n : "" + n; };
        var getter = {
            a: function (x) { return date_names.weekday[x.getDay()]; },
            A: function (x) { return date_names.full_weekday[x.getDay()]; },
            b: function (x) { return date_names.month[x.getMonth()]; },
            B: function (x) { return date_names.full_month[x.getMonth()]; },
            c: function (x) { return x.toString(); },
            d: function (x) { return zeropad(x.getDate()); },
            D: function (x) { return getter.d(x) + getter.m(x) + getter.y(x); },
            e: function (x) { return spacepad(x.getDate()); },
            f: function (x) { return x.getSeconds() + x.getMilliseconds() / 1000; },
            h: function (x) { return date_names.month[x.getMonth()]; },
            H: function (x) { return zeropad(x.getHours()); },
            I: function (x) { var h = x.getHours(); return zeropad(h < 13 ? h : h - 12); },
            j: function (x) { throw new Scheme.Bug("not implemented: day of year"); },
            k: function (x) { return spacepad(x.getHours()); },
            l: function (x) { var h = x.getHours(); return spacepad(h < 13 ? h : h - 12); },
            m: function (x) { return zeropad(x.getMonth() + 1); },
            M: function (x) { return zeropad(x.getMinutes()); },
            n: function (x) { return "\n"; },
            N: function (x) { throw new Scheme.Bug("not implemented: nanoseconds"); },
            p: function (x) { return x.getHours() < 13 ? "AM" : "PM"; },
            r: function (x) { return getter.I(x) + ":" + getter.M(x) + ":" + getter.S(x) + " " + getter.p(x); },
            s: function (x) { return Math.floor(x.getTime() / 1000); },
            S: function (x) { return zeropad(x.getSeconds()); },
            t: function (x) { return "\t"; },
            T: function (x) { return getter.H(x) + ":" + getter.M(x) + ":" + getter.S(x); },
            U: function (x) { throw new Scheme.Bug("not implemented: weeknum(0~, Sun)"); },
            V: function (x) { throw new Scheme.Bug("not implemented: weeknum(1~, Sun?)"); },
            w: function (x) { return x.getDay(); },
            W: function (x) { throw new Scheme.Bug("not implemented: weeknum(0~, Mon)"); },
            x: function (x) { throw new Scheme.Bug("not implemented: weeknum(1~, Mon)"); },
            X: function (x) { return getter.Y(x) + "/" + getter.m(x) + "/" + getter.d(x); },
            y: function (x) { return x.getFullYear() % 100; },
            Y: function (x) { return x.getFullYear(); },
            z: function (x) { throw new Scheme.Bug("not implemented: time-zone"); },
            Z: function (x) { throw new Scheme.Bug("not implemented: symbol time zone"); },
            1: function (x) { throw new Scheme.Bug("not implemented: ISO-8601 year-month-day format"); },
            2: function (x) { throw new Scheme.Bug("not implemented: ISO-8601 hour-minute-second-timezone format"); },
            3: function (x) { throw new Scheme.Bug("not implemented: ISO-8601 hour-minute-second format"); },
            4: function (x) { throw new Scheme.Bug("not implemented: ISO-8601 year-month-day-hour-minute-second-timezone format"); },
            5: function (x) { throw new Scheme.Bug("not implemented: ISO-8601 year-month-day-hour-minute-second format"); }
        };
        return format.replace(/~([\w1-5~])/g, function (str, x) {
            var func = getter[x];
            if (func)
                return func(date);
            else if (x == "~")
                return "~";
            else
                return x;
        });
    }
    Scheme.date2string = date2string;
    // date->string date template
    Scheme.define_libfunc("date->string", 1, 2, function (ar) {
        Scheme.assert_date(ar[0]);
        if (ar[1]) {
            Scheme.assert_string(ar[1]);
            return date2string(ar[0], ar[1]);
        }
        else
            return ar[0].toString();
    });
    // string->date
    // parse-date date
    Scheme.define_libfunc("parse-date", 1, 1, function (ar) {
        Scheme.assert_string(ar[0]);
        return new Date(Date.parse(ar[0]));
    });
    //
    // srfi-27
    //
    Scheme.define_libfunc("random-integer", 1, 1, function (ar) {
        var n = ar[0];
        Scheme.assert_integer(n);
        if (n < 0)
            throw new Error("random-integer: the argument must be >= 0");
        else
            return Math.floor(Math.random() * ar[0]);
    });
    Scheme.define_libfunc("random-real", 0, 0, function (ar) {
        return Math.random();
    });
    //
    // srfi-28 (format)
    //
    // (format format-str obj1 obj2 ...) -> string
    // (format #f format-str ...) -> string
    // (format #t format-str ...) -> output to current port 
    // (format port format-str ...) -> output to the port 
    //   ~a: display
    //   ~s: write
    //   ~%: newline
    //   ~~: tilde
    Scheme.define_libfunc("format", 1, null, function (ar) {
        if (Scheme.isString(ar[0])) {
            var port = null, format_str = ar.shift();
        }
        else if (ar[0] === false) {
            ar.shift();
            var port = null, format_str = ar.shift();
        }
        else if (ar[0] === true) {
            ar.shift();
            var port = Scheme.Port.current_output, format_str = ar.shift();
        }
        else {
            var port = ar.shift(), format_str = ar.shift();
            Scheme.assert_port(port);
        }
        var str = format_str.replace(/~[as]/g, function (matched) {
            Scheme.assert(ar.length > 0, "insufficient number of arguments", "format");
            if (matched == "~a")
                return Scheme.to_display(ar.shift());
            else
                return Scheme.to_write(ar.shift());
        }).replace(/~%/, "\n")
            .replace(/~~/, "~");
        if (port) {
            port.put_string(str);
            return Scheme.undef;
        }
        else {
            return str;
        }
    });
    //
    // srfi-38 (write/ss)
    //
    var user_write_ss = function (ar) {
        Scheme._Console.puts(Scheme.write_ss(ar[0]), true);
        return Scheme.undef;
    };
    Scheme.define_libfunc("write/ss", 1, 2, user_write_ss);
    Scheme.define_libfunc("write-with-shared-structure", 1, 2, user_write_ss);
    Scheme.define_libfunc("write*", 1, 2, user_write_ss); //from Gauche(STklos)
    //
    // srfi-43 (vector library)
    //
    Scheme.define_libfunc("vector-append", 2, null, function (ar) {
        var vec = [];
        return vec.concat.apply(vec, ar);
    });
    // (vector-copy vector)
    Scheme.define_libfunc("vector-copy", 1, 1, function (ar) {
        Scheme.assert_vector(ar[0]);
        return Scheme.clone(ar[0]);
    });
    //
    // see src/library/node_functions.js for:
    // - srfi-98 (get-environment-variable)
    //
})(Scheme || (Scheme = {}));
var Scheme;
(function (Scheme) {
    Scheme.define_libfunc("read-line", 0, 1, function (ar) {
        var port = ar[0] || Scheme.Port.current_input;
        Scheme.assert_port(port);
        return port.get_string();
    });
    //
    // element
    //
    Scheme.define_libfunc("element-empty!", 1, 1, function (ar) {
        if ($(ar[0]).attr("value")) {
            return $(ar[0]).val("");
        }
        else {
            return $(ar[0]).empty();
        }
    });
    Scheme.alias_libfunc("element-empty!", "element-clear!");
    Scheme.define_libfunc("element-visible?", 1, 1, function (ar) {
        return $(ar[0]).is(":visible");
    });
    Scheme.define_libfunc("element-toggle!", 1, 1, function (ar) {
        return $(ar[0]).toggle();
    });
    Scheme.define_libfunc("element-hide!", 1, 1, function (ar) {
        return $(ar[0]).hide();
    });
    Scheme.define_libfunc("element-show!", 1, 1, function (ar) {
        return $(ar[0]).show();
    });
    Scheme.define_libfunc("element-remove!", 1, 1, function (ar) {
        return $(ar[0]).remove();
    });
    Scheme.define_libfunc("element-update!", 2, 2, function (ar) {
        return $(ar[0]).html(ar[1]);
    });
    Scheme.define_libfunc("element-replace!", 2, 2, function (ar) {
        return $(ar[0]).replaceWith(ar[1]);
    });
    Scheme.define_libfunc("element-insert!", 2, 2, function (ar) {
        return $(ar[0]).append(ar[1]);
    });
    Scheme.define_libfunc("element-wrap!", 3, 3, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-ancestors", 1, 1, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-descendants", 1, 1, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-first-descendant", 1, 1, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-immediate-descendants", 1, 1, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-previous-sibling", 1, 1, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-next-sibling", 1, 1, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-siblings", 1, 1, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-match?", 2, 2, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-up", 3, 3, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-down", 3, 3, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-previous", 3, 3, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-next", 3, 3, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-select", 1, 1, function (ar) {
        $(ar[0]).select();
    });
    Scheme.define_libfunc("element-adjacent", 0, 0, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-identify", 1, 1, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-read-attribute", 2, 2, function (ar) {
        Scheme.assert_string(ar[1]);
        return $(ar[0]).attr(ar[1]);
    });
    var element_write_attribute = function (ar) {
        Scheme.assert_string(ar[1]);
        return $(ar[0]).attr(ar[1], ar[2]);
    };
    Scheme.define_libfunc("element-write-attribute", 3, 3, function (ar) {
        Scheme.deprecate("element-write-attribute", "1.0", "element-write-attribute!");
        return element_write_attribute(ar);
    });
    Scheme.define_libfunc("element-write-attribute!", 3, 3, element_write_attribute);
    Scheme.define_libfunc("element-height", 1, 1, function (ar) {
        return $(ar[0]).height();
    });
    Scheme.define_libfunc("element-width", 1, 1, function (ar) {
        return $(ar[0]).width();
    });
    Scheme.define_libfunc("element-class-names", 1, 1, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-has-class-name?", 2, 2, function (ar) {
        Scheme.assert_string(ar[1]);
        return $(ar[0]).hasClass(ar[1]);
    });
    var element_add_class_name = function (ar) {
        Scheme.assert_string(ar[1]);
        return $(ar[0]).addClass(ar[1]);
    };
    Scheme.define_libfunc("element-add-class-name", 2, 2, function (ar) {
        Scheme.deprecate("element-add-class-name", "1.0", "element-add-class-name!");
        return element_add_class_name(ar);
    });
    Scheme.define_libfunc("element-add-class-name!", 2, 2, element_add_class_name);
    var element_remove_class_name = function (ar) {
        Scheme.assert_string(ar[1]);
        return $(ar[0]).removeClass(ar[1]);
    };
    Scheme.define_libfunc("element-remove-class-name", 2, 2, function (ar) {
        Scheme.deprecate("element-remove-class-name", "1.0", "element-remove-class-name!");
        return element_remove_class_name(ar);
    });
    Scheme.define_libfunc("element-remove-class-name!", 2, 2, element_remove_class_name);
    var element_toggle_class_name = function (ar) {
        Scheme.assert_string(ar[1]);
        return $(ar[0]).toggleClass(ar[1]);
    };
    Scheme.define_libfunc("element-toggle-class-name", 2, 2, function (ar) {
        Scheme.deprecate("element-toggle-class-name", "1.0", "element-toggle-class-name!");
        return element_toggle_class_name(ar);
    });
    Scheme.define_libfunc("element-toggle-class-name!", 2, 2, element_toggle_class_name);
    Scheme.define_libfunc("element-clean-whitespace!", 1, 1, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-empty?", 1, 1, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-descendant-of!", 2, 2, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("scroll-to-element!", 1, 1, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-style", 2, 2, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-opacity", 2, 2, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-style-set!", 2, 2, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-opacity-set!", 2, 2, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-dimensions", 1, 1, function (ar) {
        return new Scheme.Values([$(ar[0]).width(), $(ar[0]).height()]);
    });
    Scheme.define_libfunc("element-make-positioned!", 1, 1, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-undo-positioned!", 1, 1, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-make-clipping!", 1, 1, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-undo-clipping!", 1, 1, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-cumulative-offset", 1, 1, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-positioned-offset", 1, 1, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-absolutize!", 1, 1, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-relativize!", 1, 1, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-cumulative-scroll-offset", 1, 1, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-offset-parent", 1, 1, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-viewport-offset", 1, 1, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-clone-position!", 1, 1, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-absolutize!", 1, 1, function (ar) {
        throw new Scheme.Bug("not yet implemented");
    });
    Scheme.define_libfunc("element-focus!", 1, 1, function (ar) {
        return $(ar[0]).focus();
    });
    // usage:
    //  (element-new '(div "foo"))        => <div>foo</div>
    //  (element-new '("div#main" "foo")) => <div id='main'>foo</div>
    //  (element-new '("div.red" "foo"))  => <div class='red'>foo</div>
    //  (element-new '(div align "right" "foo"))  => <div align='right'>foo</div>
    //  (element-new '(div (span "foo"))  => <div><span>foo</span></div>
    //
    function create_elements_by_string(spec) {
        spec = spec.to_array();
        var name = spec.shift();
        if (name instanceof Scheme._Symbol)
            name = name.name;
        var m = name.match(/(.*)\.(.*)/);
        if (m) {
            name = m[1];
            spec.unshift(Scheme.Sym("class"), m[2]);
        }
        m = name.match(/(.*)\#(.*)/);
        if (m) {
            name = m[1];
            spec.unshift(Scheme.Sym("id"), m[2]);
        }
        var children = [];
        var s = ["<" + name];
        for (var i = 0; i < spec.length; i++) {
            if (spec[i] instanceof Scheme._Symbol) {
                s.push(' ' + spec[i].name + '="' + spec[i + 1] + '"');
                i++;
            }
            else {
                if (spec[i] instanceof Scheme.Pair)
                    children.push(create_elements_by_string(spec[i]));
                else
                    children.push(spec[i]); // String
            }
        }
        s.push(">");
        s.push(children.join(""));
        s.push("</" + name + ">");
        return s.join("");
    }
    Scheme.create_elements_by_string = create_elements_by_string;
    ;
    /*export*/ function tree_all(tree, pred) {
        if (tree === Scheme.nil)
            return true;
        else if (pred(tree.car) === false)
            return false;
        else
            return tree_all(tree.cdr, pred);
    }
    ;
    Scheme.define_libfunc("element-new", 1, 1, function (ar) {
        var string_or_symbol = function (item) {
            return Scheme.isString(item) ||
                (item instanceof Scheme._Symbol) ||
                (item instanceof Scheme.Pair);
        };
        if (tree_all(ar[0], string_or_symbol)) {
            return $(create_elements_by_string(ar[0]))[0];
        }
        else {
            return Scheme.nil;
        }
    });
    /*export*/ function element_content(selector) {
        if ($(selector).attr("value")) {
            return $(selector).val();
        }
        else {
            return escape($(selector).html());
        }
    }
    ;
    Scheme.define_libfunc("element-content", 1, 1, function (ar) {
        return element_content(ar[0]);
    });
    //
    // load from network
    //
    Scheme.define_libfunc("load", 1, 1, function (ar, intp) {
        var path = ar[0];
        Scheme.assert_string(path);
        var intp2 = new Scheme.Interpreter(intp);
        return new Scheme.Pause(function (pause) {
            $.ajax(path, {
                dataType: "text",
                mimeType: "text/plain; charset=x-user-defined",
                success: function (data) {
                    // create new interpreter not to destroy current stack.
                    intp2.evaluate(data, function () {
                        return pause.resume(Scheme.undef);
                    });
                },
                error: function () {
                    throw new Error("load: network error: failed to load " + path);
                }
            });
        });
    });
    // Load javascript file on the server
    function _require(src, check, proc) {
        var script = $("<script/>", { src: src });
        $("body").append(script);
        var checker = new Function("return !!(" + check + ")");
        if (checker())
            proc();
        else
            setTimeout(function () { checker() ? proc() : setTimeout(arguments.callee, 10); }, 10);
    }
    ;
    // (js-load "lib/foo.js" "Foo")
    Scheme.define_libfunc("js-load", 2, 2, function (ar) {
        var path = ar[0];
        var check = ar[1];
        Scheme.assert_string(path);
        Scheme.assert_string(check);
        return new Scheme.Pause(function (pause) {
            _require(path, "window." + check, function () {
                pause.resume(Scheme.undef);
            });
        });
    });
    //
    // html modification
    //
    /*export*/ function getelem(ar) {
        // account for getelem returning false when no results (and that getting passed back in)
        if (ar.length > 1 && ar[1] === false) {
            ar[1] = [];
        }
        var x = $.apply(this, ar);
        if (x.length > 0) {
            return x;
        }
        else {
            return false;
        }
    }
    ;
    Scheme.define_libfunc("$", 1, 2, getelem);
    Scheme.define_libfunc("getelem", 1, 2, getelem);
    Scheme.define_libfunc("dom-element", 1, 1, function (ar) {
        return $(ar[0])[0];
    });
    Scheme.define_libfunc("set-style!", 3, 3, function (ar) {
        Scheme.assert_string(ar[1]);
        $(ar[0]).css(ar[1], ar[2]);
        return Scheme.undef;
    });
    Scheme.define_libfunc("get-style", 2, 2, function (ar) {
        Scheme.assert_string(ar[1]);
        return $(ar[0]).css(ar[1]);
    });
    Scheme.define_libfunc("set-content!", 2, 2, function (ar) {
        Scheme.assert_string(ar[1]);
        var str = ar[1].replace(/\n/g, "<br>").replace(/\t/g, "&nbsp;&nbsp;&nbsp;");
        $(ar[0]).html(str);
        return Scheme.undef;
    });
    Scheme.define_libfunc("get-content", 1, 1, function (ar) {
        return element_content(ar[0]);
    });
    //
    // handlers
    //
    Scheme.define_libfunc("set-handler!", 3, 3, function (ar, intp) {
        throw new Error("set-handler! is obsolete, please use add-handler! instead");
    });
    Scheme.define_libfunc("add-handler!", 3, 3, function (ar, intp) {
        var selector = ar[0], evtype = ar[1], proc = ar[2];
        var intp2 = new Scheme.Interpreter(intp);
        var handler = function (event) {
            // return _.clone(intp2).invoke_closure(proc, [event]);
            return intp2.invoke_closure(proc, [event]);
        };
        $(selector).on(evtype, handler);
        return handler;
    });
    Scheme.define_libfunc("remove-handler!", 3, 3, function (ar, intp) {
        var selector = ar[0], evtype = ar[1], handler = ar[2];
        $(selector).off(evtype, handler);
        return Scheme.undef;
    });
    Scheme.define_libfunc("wait-for", 2, 2, function (ar) {
        var selector = ar[0], evtype = ar[1];
        var elem = $(selector);
        elem.biwascheme_wait_for = elem.biwascheme_wait_for || {};
        var prev_handler = elem.biwascheme_wait_for[evtype];
        if (prev_handler) {
            // Maybe a wait-for is called more than once,
            // and previous handler is not consumed.
            elem.off(evtype, prev_handler);
        }
        return new Scheme.Pause(function (pause) {
            var handler = function (event) {
                elem.biwascheme_wait_for[evtype] = undefined;
                elem.off(evtype, handler);
                return pause.resume(event);
            };
            elem.biwascheme_wait_for[evtype] = handler;
            elem.on(evtype, handler);
        });
    });
    //
    // dom
    //
    Scheme.define_libfunc("domelem", 1, null, function (ar) {
        throw new Error("obsolete");
    });
    Scheme.define_libfunc("dom-remove-children!", 1, 1, function (ar) {
        Scheme._Console.puts("warning: dom-remove-children! is obsolete. use element-empty! instead");
        $(ar[0]).empty();
        return Scheme.undef;
    });
    Scheme.define_libfunc("dom-create-element", 1, 1, function (ar) {
        throw new Error("obsolete");
    });
    Scheme.define_libfunc("element-append-child!", 2, 2, function (ar) {
        return $(ar[0]).append(ar[1]);
    });
    Scheme.define_libfunc("dom-remove-child!", 2, 2, function (ar) {
        throw new Error("obsolete");
    });
    //  define_libfunc("dom-get-attribute", 2, 2, function(ar){
    //  });
    //  define_libfunc("dom-remove-child!", 2, 2, function(ar){
    //  });
    //
    // communication to server
    //
    Scheme.define_libfunc("http-request", 1, 1, function (ar) {
        var path = ar[0];
        Scheme.assert_string(path);
        return new Scheme.Pause(function (pause) {
            $.get(path, function (data) {
                pause.resume(data);
            }, "text");
        });
    });
    // (http-post "/foo" '(("x" . 1) ("y" . 2)))
    Scheme.define_libfunc("http-post", 2, 2, function (ar) {
        var path = ar[0];
        Scheme.assert_string(path);
        var alist = ar[1];
        Scheme.assert_list(alist);
        var h = Scheme.alist_to_js_obj(alist);
        return new Scheme.Pause(function (pause) {
            $.post(path, h, function (data) {
                pause.resume(data);
            }, "text");
        });
    });
    /*export*/ const jsonp_receiver = [];
    Scheme.define_libfunc("receive-jsonp", 1, 1, function (ar) {
        var url = ar[0];
        Scheme.assert_string(url);
        var receives = jsonp_receiver;
        for (var i = 0; i < receives.length; i++)
            if (receives[i] === null)
                break;
        var receiver_id = i;
        url += "?callback=BiwaScheme.jsonp_receiver[" + receiver_id + "]";
        return new Scheme.Pause(function (pause) {
            receives[receiver_id] = function (data) {
                pause.resume(data);
                receives[receiver_id] = null;
            };
            var script = $("<script/>", { src: url });
            $("body").append(script);
        });
    });
    //
    // dialog, debug
    //
    Scheme.define_libfunc("alert", 1, 1, function (ar) {
        alert(ar[0]);
        return Scheme.undef;
    });
    Scheme.define_libfunc("confirm", 1, 1, function (ar) {
        return confirm(ar[0]);
    });
    //  define_libfunc("dumpobj", 1, 1, function(ar){
    //    return eval(ar[0]);
    //  });
})(Scheme || (Scheme = {}));
var Scheme;
(function (Scheme) {
    ///
    /// Call
    ///
    // The class Call is used to invoke scheme closure from 
    // library functions.
    //
    // Call#initialize takes three arguments: proc, args and after.
    //   * proc is the scheme closure to invoke.
    //   * args is an Array (not list!) of arguments for the invocation.
    //   * after is a javascript function which is invoked when 
    //     returned from the proc.
    //
    //     after takes two arguments: ar and intp.
    //       * ar is an Array which contains the result of the invocation.
    //       * intp is an Interpreter which is running.
    //
    //     If after returns another Call object, another invocation
    //     happens. If after returns a normal value, it is the value
    //     of the library function.
    //
    // example:
    //   return new Call(proc, [x, y], function(ar){ ar[0] });
    //
    class Call {
        constructor(proc, args, after) {
            this.proc = proc;
            this.args = args;
            // this.proc = proc;
            // this.args = args;
            //this.after = after || function (ar) {
            //    // just return result which closure returned
            //    return ar[0];
            //};
            this.after = new Scheme.FunctionHolder("", 0, 0, after ? after : (ar) => {
                // just return result which closure returned
                return ar[0];
            });
        }
        inspect() {
            return "#<Call args=" + this.args.inspect() + ">";
        }
        toString() {
            return "#<Call>";
        }
        to_write() {
            return "#<Call>";
        }
        static foreach(obj, callbacks, is_multi) {
            is_multi || (is_multi = false);
            ["call", "result", "finish"].forEach((key) => {
                if (!callbacks[key])
                    callbacks[key] = Call.default_callbacks[key];
            });
            var iterator = null;
            var x = null;
            const loop = function (ar) {
                if (iterator) {
                    var ret = callbacks["result"](ar[0], x);
                    if (ret !== undefined)
                        return ret;
                }
                else { // first lap
                    if (is_multi)
                        iterator = new Iterator.ForMulti(obj);
                    else
                        iterator = Iterator.of(obj);
                }
                if (!iterator.has_next()) {
                    return callbacks["finish"]();
                }
                else {
                    x = iterator.next();
                    var result = callbacks["call"](x);
                    // result.after = loop;
                    result.after = new Scheme.FunctionHolder("", 0, 0, loop);
                    return result;
                }
            };
            return loop(null);
            // return new FunctionHolder("", 0, 0, loop(null));
        }
        static multi_foreach(obj, callbacks) {
            return Call.foreach(obj, callbacks, true);
        }
    }
    Call.default_callbacks = {
        call: function (x) { return new Call(this.proc, [x]); },
        result: function () { },
        finish: function () { }
    };
    Scheme.Call = Call;
    //
    // Iterator - external iterator for Call.foreach
    //
    let Iterator;
    (function (Iterator) {
        class ForArray {
            constructor(arr) {
                this.arr = arr;
                this.i = 0;
                // this.arr = arr;
                // this.i = 0;
            }
            has_next() {
                return this.i < this.arr.length;
            }
            next() {
                return this.arr[this.i++];
            }
        }
        Iterator.ForArray = ForArray;
        class ForString {
            constructor(str) {
                this.str = str;
                this.i = 0;
                // this.str = str;
                // this.i = 0;
            }
            has_next() {
                return this.i < this.str.length;
            }
            next() {
                return Scheme.Char.get(this.str.charAt(this.i++));
            }
        }
        Iterator.ForString = ForString;
        class ForList {
            constructor(ls) {
                this.ls = ls;
                // this.ls = ls;
            }
            has_next() {
                return (this.ls instanceof Scheme.Pair) &&
                    this.ls != Scheme.nil;
            }
            next() {
                var pair = this.ls;
                this.ls = this.ls.cdr;
                return pair;
            }
        }
        Iterator.ForList = ForList;
        class ForMulti {
            constructor(objs) {
                this.objs = objs;
                // this.objs = objs;
                this.size = objs.length;
                this.iterators = objs.map((x) => {
                    return Iterator.of(x);
                });
            }
            has_next() {
                for (var i = 0; i < this.size; i++)
                    if (!this.iterators[i].has_next())
                        return false;
                return true;
            }
            next() {
                return this.iterators.map((ite) => {
                    return ite.next();
                });
            }
        }
        Iterator.ForMulti = ForMulti;
        function of(obj) {
            //switch (true) {
            //    case (obj instanceof Array):
            //        return new this.ForArray(obj);
            //    case (typeof (obj) == "string"):
            //        return new this.ForString(obj);
            //    case (obj instanceof BiwaScheme.Pair):
            //    case (obj === BiwaScheme.nil):
            //        return new this.ForList(obj);
            //    default:
            //        throw new BiwaScheme.Bug("Iterator.of: unknown class: " + BiwaScheme.inspect(obj));
            //}
            switch (true) {
                case (obj instanceof Array):
                    return new ForArray(obj);
                case (typeof (obj) == "string"):
                    return new ForString(obj);
                case (obj instanceof Scheme.Pair):
                case (obj === Scheme.nil):
                    return new ForList(obj);
                default:
                    throw new Scheme.Bug("Iterator.of: unknown class: " + Scheme.inspect(obj));
            }
        }
        Iterator.of = of;
    })(Iterator = Scheme.Iterator || (Scheme.Iterator = {}));
    //
    // Call.foreach - shortcut for successive Calls
    //
    // Some library functions, such as for-each or map,
    // call a closure for each element. Call.foreach is 
    // a utility to help defining such methods.
    //
    // Call.foreach takes a sequence and some callbacks.
    // Sequence is an Array, String, or list.
    //
    // Example:
    //   return Call.foreach(sequence, {
    //     // before each call
    //     call: function(elem){
    //       return new Call(proc, [elem]);
    //     },
    //     // after each call
    //     result: function(value, elem){
    //       ary.push(value);
    //       // you can return a value to terminate the loop
    //     },
    //     // after all the calls
    //     finish: function(){
    //       return ary;
    //     }
    //   });
    //BiwaScheme.Call.default_callbacks = {
    //    call: function (x) { return new BiwaScheme.Call(this.proc, [x]) },
    //    result: function () { },
    //    finish: function () { }
    //}
    //BiwaScheme.Call.foreach = function (obj, callbacks, is_multi) {
    //    is_multi || (is_multi = false);
    //    _.each(["call", "result", "finish"], function (key) {
    //        if (!callbacks[key])
    //            callbacks[key] = BiwaScheme.Call.default_callbacks[key];
    //    })
    //    var iterator = null;
    //    var x = null;
    //    var loop = function (ar) {
    //        if (iterator) {
    //            var ret = callbacks["result"](ar[0], x);
    //            if (ret !== undefined) return ret;
    //        }
    //        else { // first lap
    //            if (is_multi)
    //                iterator = new BiwaScheme.Iterator.ForMulti(obj);
    //            else
    //                iterator = BiwaScheme.Iterator.of(obj);
    //        }
    //        if (!iterator.has_next()) {
    //            return callbacks["finish"]();
    //        }
    //        else {
    //            x = iterator.next();
    //            var result = callbacks["call"](x);
    //            result.after = loop;
    //            return result;
    //        }
    //    }
    //    return loop(null);
    //}
    //BiwaScheme.Call.multi_foreach = function (obj, callbacks) {
    //    return BiwaScheme.Call.foreach(obj, callbacks, true);
    //}
})(Scheme || (Scheme = {}));
var Scheme;
(function (Scheme) {
    ///
    /// Compiler
    ///
    /// Note: macro expansion is done by Intepreter#expand
    class Compiler {
        constructor() {
        }
        is_tail(x) {
            return (x[0] == "return");
        }
        //free: set
        //e: env(= [locals, frees])
        //next: opc
        //ret: opc["refer_*", n, ["argument", 
        //          ["refer_*", n, ... ["argument", next]
        collect_free(free, e, next) {
            var vars = free;
            var opc = next;
            var arr = vars.arr;
            for (var i = 0; i < arr.length; i++) {
                opc = this.compile_refer(arr[i], e, ["argument", opc]);
            }
            //Console.puts("collect_free "+free.inspect()+" / "+e.inspect()+" => "+opc.inspect());
            return opc;
        }
        //x: Symbol
        //e: env [set of locals, set of frees]
        //ret: opc
        compile_refer(x, e, next) {
            return this.compile_lookup(x, e, function (n) { return ["refer-local", n, next]; }, function (n) { return ["refer-free", n, next]; }, function (sym) { return ["refer-global", sym, next]; });
        }
        compile_lookup(x, e, return_local, return_free, return_global) {
            var locals = e[0], free = e[1];
            var n;
            if ((n = locals.index(x)) != null) {
                //Console.puts("compile_refer:"+x.inspect()+" in "+e.inspect()+" results refer-local "+n);
                return return_local(n);
            }
            else if ((n = free.index(x)) != null) {
                //Console.puts("compile_refer:"+x.inspect()+" in "+e.inspect()+" results refer-free "+n);
                return return_free(n);
            }
            else {
                var sym = x.name;
                return return_global(sym);
            }
            //throw new BiwaScheme.Error("undefined symbol `" + sym + "'");
        }
        //generate boxing code (intersection of sets & vars)
        //if no need of boxing, just returns next
        //  sets(Set): assigned variables 
        //  vars(List): used variables
        //  next(opc):
        //  ret(opc):
        make_boxes(sets, vars, next) {
            var vars = vars;
            var n = 0;
            var a = [];
            while (vars instanceof Scheme.Pair) {
                if (sets.member(vars.car))
                    a.push(n);
                n++;
                vars = vars.cdr;
            }
            var opc = next;
            for (var i = a.length - 1; i >= 0; i--)
                opc = ["box", a[i], opc];
            return opc;
        }
        // Enumerate variables which (could be assigned && included in v)
        // x: exp
        // v: set(vars)
        // ret: set
        find_sets(x, v) {
            //Console.puts("find_sets: " + to_write(x) + " " + to_write(v))
            var ret = null;
            if (x instanceof Scheme._Symbol) {
                ret = new Scheme._Set();
            }
            else if (x instanceof Scheme.Pair) {
                switch (x.first()) {
                    case Scheme.Sym("define"):
                        var exp = x.third();
                        ret = this.find_sets(exp, v);
                    case Scheme.Sym("begin"):
                        ret = this.find_sets(x.cdr, v); //(ignores improper list)
                        break;
                    case Scheme.Sym("quote"):
                        ret = new Scheme._Set();
                        break;
                    case Scheme.Sym("lambda"):
                        var vars = x.second(), body = x.cdr.cdr;
                        if (vars instanceof Scheme.Pair) { // (lambda (...) ...)
                            ret = this.find_sets(body, v.set_minus(vars.to_set()));
                        }
                        else { // (lambda args ...)
                            ret = this.find_sets(body, v.set_minus(new Scheme._Set(vars)));
                        }
                        break;
                    case Scheme.Sym("if"):
                        var testc = x.second(), thenc = x.third(), elsec = x.fourth();
                        ret = this.find_sets(testc, v).set_union(this.find_sets(thenc, v), this.find_sets(elsec, v));
                        break;
                    case Scheme.Sym("set!"):
                        var vari = x.second(), xx = x.third();
                        if (v.member(vari))
                            ret = this.find_sets(xx, v).set_cons(vari);
                        else
                            ret = this.find_sets(xx, v);
                        break;
                    case Scheme.Sym("call/cc"):
                        var exp = x.second();
                        ret = this.find_sets(exp, v);
                        break;
                    default:
                        var set = new Scheme._Set();
                        for (var p = x; p instanceof Scheme.Pair; p = p.cdr) {
                            set = set.set_union(this.find_sets(p.car, v));
                        }
                        ret = set;
                        break;
                }
            }
            else {
                ret = new Scheme._Set();
            }
            if (ret == null)
                throw new Scheme.Bug("find_sets() exited in unusual way");
            else
                return ret;
        }
        // find_free(): find free variables in x
        //              these variables are collected by collect_free().
        // x: expression 
        // b: set of local vars (= variables which are not free)
        // f: set of free var candidates 
        //    (local vars of outer lambdas)
        // ret: set of free vars
        find_free(x, b, f) {
            var ret = null;
            if (x instanceof Scheme._Symbol) {
                if (f.member(x))
                    ret = new Scheme._Set(x);
                else
                    ret = new Scheme._Set();
            }
            else if (x instanceof Scheme.Pair) {
                switch (x.first()) {
                    case Scheme.Sym("define"):
                        var exp = x.third();
                        ret = this.find_free(exp, b, f);
                        break;
                    case Scheme.Sym("begin"):
                        ret = this.find_free(x.cdr, b, f); //(ignores improper list)
                        break;
                    case Scheme.Sym("quote"):
                        ret = new Scheme._Set();
                        break;
                    case Scheme.Sym("lambda"):
                        var vars = x.second(), body = x.cdr.cdr;
                        if (vars instanceof Scheme.Pair) { // (lambda (...) ...)
                            ret = this.find_free(body, b.set_union(vars.to_set()), f);
                        }
                        else { // (lambda args ...)
                            ret = this.find_free(body, b.set_cons(vars), f);
                        }
                        break;
                    case Scheme.Sym("if"):
                        var testc = x.second(), thenc = x.third(), elsec = x.fourth();
                        ret = this.find_free(testc, b, f).set_union(this.find_free(thenc, b, f), this.find_free(elsec, b, f));
                        break;
                    case Scheme.Sym("set!"):
                        var vari = x.second(), exp = x.third();
                        if (f.member(vari))
                            ret = this.find_free(exp, b, f).set_cons(vari);
                        else
                            ret = this.find_free(exp, b, f);
                        break;
                    case Scheme.Sym("call/cc"):
                        var exp = x.second();
                        ret = this.find_free(exp, b, f);
                        break;
                    default:
                        var set = new Scheme._Set();
                        for (var p = x; p instanceof Scheme.Pair; p = p.cdr) {
                            set = set.set_union(this.find_free(p.car, b, f));
                        }
                        ret = set;
                        break;
                }
            }
            else {
                ret = new Scheme._Set();
            }
            //Console.p("find_free "+x.inspect()+" / "+b.inspect()+" => "+ret.inspect());
            if (ret == null)
                throw new Scheme.Bug("find_free() exited in unusual way");
            else
                return ret;
        }
        // Returns the position of the dot pair.
        // Returns -1 if x is a proper list.
        //
        // eg. (a b . c) -> 2
        find_dot_pos(x) {
            var idx = 0;
            for (; x instanceof Scheme.Pair; x = x.cdr, ++idx)
                ;
            if (x != Scheme.nil) {
                return idx;
            }
            else {
                return -1;
            }
        }
        last_pair(x) {
            if (x instanceof Scheme.Pair) {
                for (; x.cdr instanceof Scheme.Pair; x = x.cdr)
                    ;
            }
            return x;
        }
        // Takes an dotted list and returns proper list.
        //
        // eg. (x y . z) -> (x y z)
        dotted2proper(ls) {
            var nreverse = function (ls) {
                var res = Scheme.nil;
                for (; ls instanceof Scheme.Pair;) {
                    var d = ls.cdr;
                    ls.cdr = res;
                    res = ls;
                    ls = d;
                }
                return res;
            };
            var copy_list = function (ls) {
                var res = Scheme.nil;
                for (; ls instanceof Scheme.Pair; ls = ls.cdr) {
                    res = new Scheme.Pair(ls.car, res);
                }
                return nreverse(res);
            };
            if (ls instanceof Scheme.Pair) {
                var last = this.last_pair(ls);
                if (last instanceof Scheme.Pair && last.cdr === Scheme.nil) {
                    return ls;
                }
                else {
                    var copied = copy_list(ls);
                    this.last_pair(copied).cdr = new Scheme.Pair(last.cdr, Scheme.nil);
                    return copied;
                }
            }
            else {
                return new Scheme.Pair(ls, Scheme.nil);
            }
        }
        // x: exp(list of symbol or integer or..)
        // e: env (= [locals, frees])
        // s: vars might be set!
        // next: opc
        // ret: opc
        compile(x, e, s, f, next) {
            //Console.p(x);
            var ret = null;
            while (1) {
                if (x instanceof Scheme._Symbol) {
                    // Variable reference
                    // compiled into refer-(local|free|global)
                    return this.compile_refer(x, e, (s.member(x) ? ["indirect", next] : next));
                }
                else if (x instanceof Scheme.Pair) {
                    switch (x.first()) {
                        case Scheme.Sym("define"):
                            ret = this._compile_define(x, next);
                            x = ret[0];
                            next = ret[1];
                            break;
                        case Scheme.Sym("begin"):
                            var a = [];
                            for (var p = x.cdr; p instanceof Scheme.Pair; p = p.cdr)
                                a.push(p.car);
                            //compile each expression (in reverse order)
                            var c = next;
                            for (var i = a.length - 1; i >= 0; i--) {
                                c = this.compile(a[i], e, s, f, c);
                            }
                            return c;
                        case Scheme.Sym("quote"):
                            if (x.length() < 2)
                                throw new Scheme._Error("Invalid quote: " + x.to_write());
                            var obj = x.second();
                            return ["constant", obj, next];
                        case Scheme.Sym("lambda"):
                            return this._compile_lambda(x, e, s, f, next);
                        case Scheme.Sym("if"):
                            if (x.length() < 3 || x.length() > 4)
                                throw new Scheme._Error("Invalid if: " + x.to_write());
                            var testc = x.second(), thenc = x.third(), elsec = x.fourth();
                            var thenc = this.compile(thenc, e, s, f, next);
                            var elsec = this.compile(elsec, e, s, f, next);
                            x = testc;
                            next = ["test", thenc, elsec];
                            break;
                        case Scheme.Sym("set!"):
                            // error-checking: should have only 3 things
                            if (x.length() != 3)
                                throw new Scheme._Error("Invalid set!: " + x.to_write());
                            var v = x.second(), x = x.third();
                            var do_assign = this.compile_lookup(v, e, function (n) { return ["assign-local", n, next]; }, function (n) { return ["assign-free", n, next]; }, function (sym) { return ["assign-global", sym, next]; });
                            next = do_assign;
                            break;
                        case Scheme.Sym("call/cc"):
                            var x = x.second();
                            var c = ["conti",
                                (this.is_tail(next) ? (e[0].size() + 1) : 0),
                                ["argument",
                                    ["constant", 1,
                                        ["argument",
                                            this.compile(x, e, s, f, (this.is_tail(next) ? ["shift", 1, ["tco_hinted_apply"]]
                                                : ["apply"]))]]]];
                            //note: proc for call/cc takes 1 argument (= ["apply", 1])
                            // Do not push stack frame when call/cc is in a tail context
                            return this.is_tail(next) ? c : ["frame", c, next];
                        default:
                            //apply 
                            //x = (func 1 2) 
                            //x.car = func = '(lambda (x) ..) or Symbol
                            //x.cdr = args = '(1 2)
                            var func = x.car;
                            var args = x.cdr;
                            var c = this.compile(func, e, s, f, this.is_tail(next) ? ["shift", args.length(), ["tco_hinted_apply"]]
                                : ["apply"]);
                            // VM will push the number of arguments to the stack.
                            c = this.compile(args.length(), e, s, f, ["argument", c]);
                            for (var p = args; p instanceof Scheme.Pair; p = p.cdr) {
                                c = this.compile(p.car, e, s, f, ["argument", c]);
                            }
                            // Do not push stack frame for tail calls
                            return this.is_tail(next) ? c : ["frame", c, next];
                    }
                }
                else {
                    return ["constant", x, next];
                }
            }
            //Console.p("result of " + x.inspect() + ":");
            //Console.p(ret);
            //dump({"ret":ret, "x":x, "e":e, "s":s, "next":next, "stack":[]});
            //      if(ret == null)
            //        throw new BiwaScheme.Bug("compile() exited in unusual way");
            //      else
            //        return ret;
        }
        // Compile define.
        //
        // 0. (define) ; => error
        // 1. (define a)
        // 2. (define a 1)
        // 3. (define a 1 2) ; => error
        // 4. (define (f x) x), (define (f . a) a)
        // 5. (define 1 2) 
        //
        // Note: define may appear in lambda, let, let*, let-values,
        // let*-values, letrec, letrec*. These definitions are local to the
        // <body> of these forms.
        _compile_define(x, next) {
            if (x.length() == 1) { // 0. (define)
                throw new Scheme._Error("Invalid `define': " + x.to_write());
            }
            var first = x.cdr.car;
            var rest = x.cdr.cdr;
            if (first instanceof Scheme._Symbol) {
                if (rest === Scheme.nil) { // 1. (define a)
                    x = Scheme.undef;
                }
                else {
                    if (rest.cdr === Scheme.nil) // 2. (define a 1)
                        x = rest.car;
                    else // 3. (define a 1 2)
                        throw new Scheme._Error("Invalid `define': " + x.to_write());
                }
                if (!Scheme.TopEnv.hasOwnProperty(first.name)) {
                    Scheme.TopEnv[first.name] = Scheme.undef;
                }
                next = ["assign-global", first.name, next];
            }
            else if (first instanceof Scheme.Pair) { // 4. (define (f x) ...)
                // Note: define of this form may contain internal define.
                // They are handled in compilation of "lambda".
                var fname = first.car, args = first.cdr;
                var lambda = new Scheme.Pair(Scheme.Sym("lambda"), new Scheme.Pair(args, rest));
                x = lambda;
                if (!Scheme.TopEnv.hasOwnProperty(first.name)) {
                    Scheme.TopEnv[fname.name] = Scheme.undef;
                }
                next = ["assign-global", fname.name, next];
            }
            else { // 5. (define 1 2)
                throw new Scheme._Error("define: symbol or pair expected but got " + first);
            }
            return [x, next];
        }
        // Compiles various forms of "lambda".
        //
        // * (lambda (x y) ...)
        // * (lambda (x y . rest) ...)
        // * (lambda args ...)
        _compile_lambda(x, e, s, f, next) {
            if (x.length() < 3)
                throw new Scheme._Error("Invalid lambda: " + x.to_write());
            var vars = x.cdr.car;
            var body = x.cdr.cdr;
            // Handle internal defines
            var tbody = Compiler.transform_internal_define(body);
            if (Scheme.isPair(tbody) && Scheme.isSymbol(tbody.car) &&
                tbody.car.name == "letrec*") {
                // The body has internal defines.
                // Expand letrec* macro
                var cbody = Scheme.Interpreter.expand(tbody);
            }
            else {
                // The body has no internal defines.
                // Just wrap the list with begin 
                var cbody = new Scheme.Pair(Scheme.Sym("begin"), x.cdr.cdr);
            }
            var dotpos = this.find_dot_pos(vars);
            var proper = this.dotted2proper(vars);
            var free = this.find_free(cbody, proper.to_set(), f); //free variables
            var sets = this.find_sets(cbody, proper.to_set()); //local variables
            var do_body = this.compile(cbody, [proper.to_set(), free], sets.set_union(s.set_intersect(free)), f.set_union(proper.to_set()), ["return"]);
            var do_close = ["close",
                free.size(),
                this.make_boxes(sets, proper, do_body),
                next,
                dotpos];
            return this.collect_free(free, e, do_close);
        }
        run(expr, next) {
            return this.compile(expr, [new Scheme._Set(), new Scheme._Set()], new Scheme._Set(), new Scheme._Set(), ["halt"]);
        }
        // Compile an expression with new compiler
        static compile(expr, next) {
            expr = Scheme.Interpreter.expand(expr);
            return (new Compiler()).run(expr, next);
        }
        // Transform internal defines to letrec*.
        //
        // Example
        //   (let ((a 1))
        //     (define (b) a)
        //     (b))
        //
        //   (let ((a 1))
        //     (letrec* ((b (lambda () a)))
        //       (b)))
        //
        // x - expression starts with (define ...)
        // 
        // Returns a letrec* expression, or
        // just returns x, when x does not contain definitions.
        // Returns true if x is a definition
        static is_definition(x) {
            return Scheme.isPair(x) &&
                Scheme.Sym("define") === x.car;
            // TODO: support "begin", nested "begin", "let(rec)-syntax"
        }
        // Convert function definition to lambda binding
        //   (define a ..)         -> (a ..)
        //   (define (f) ..)       -> (f (lambda () ..))
        //   (define (f x . y) ..) -> (f (lambda (x . y) ..))
        //   (define (f . a) ..)   -> (f (lambda a ..))
        static define_to_lambda_bind(def) {
            var sig = def.cdr.car;
            var body = def.cdr.cdr;
            if (Scheme.isSymbol(sig)) {
                var variable = sig;
                return new Scheme.Pair(variable, body);
            }
            else {
                var variable = sig.car;
                var value = new Scheme.Pair(Scheme.Sym("lambda"), new Scheme.Pair(sig.cdr, body));
                return Scheme.List(variable, value);
            }
        }
        static transform_internal_define(x) {
            // 1. Split x into definitions and expressions
            var defs = [], item = x;
            while (this.is_definition(item.car)) {
                defs.push(item.car);
                item = item.cdr;
            }
            var exprs = item;
            // 2. Return x if there is no definitions
            if (defs.length == 0)
                return x;
            // 3. Return (letrec* <bindings> <expressions>)
            var bindings = Scheme.List.apply(null, defs.map(this.define_to_lambda_bind));
            return new Scheme.Pair(Scheme.Sym("letrec*"), new Scheme.Pair(bindings, exprs));
        }
    }
    Scheme.Compiler = Compiler;
})(Scheme || (Scheme = {}));
var Scheme;
(function (Scheme) {
    //
    // Errors
    //
    class _Error {
        constructor(msg) {
            this.message = "Error: " + msg;
        }
        toString() {
            return this.message;
        }
    }
    Scheme._Error = _Error;
    class Bug extends _Error {
        constructor(msg) {
            super(msg);
            this.message = "[BUG] " + msg;
        }
    }
    Scheme.Bug = Bug;
    // currently used by "raise"
    class UserError extends _Error {
        constructor(msg) {
            super(msg);
            this.message = msg;
        }
    }
    Scheme.UserError = UserError;
})(Scheme || (Scheme = {}));
var Scheme;
(function (Scheme) {
    //
    // Hashtable
    //
    // Based on the base JavaScript Object class, but
    //  * Object takes only strings as keys
    //  * R6RS hashtable needs its own hash function
    // so some hacks are needed.
    class Hashtable {
        constructor(hash_proc, equiv_proc, mutable = true) {
            //this.mutable = (mutable === undefined) ? true :
            //    mutable ? true : false;
            this.hash_proc = hash_proc;
            this.equiv_proc = equiv_proc;
            this.mutable = mutable;
            this.pairs_of = {};
            // this.hash_proc = _hash_proc;
            // this.equiv_proc = _equiv_proc;
            // Hash (hashed) => (array of (key and value))
            // this.pairs_of = {};
        }
        clear() {
            this.pairs_of = {};
        }
        candidate_pairs(hashed) {
            return this.pairs_of[hashed];
        }
        add_pair(hashed, key, value) {
            var pairs = this.pairs_of[hashed];
            if (pairs) {
                pairs.push([key, value]);
            }
            else {
                this.pairs_of[hashed] = [[key, value]];
            }
        }
        remove_pair(hashed, pair) {
            var pairs = this.pairs_of[hashed];
            var i = pairs.indexOf(pair);
            if (i == -1) {
                throw new Scheme.Bug("Hashtable#remove_pair: pair not found!");
            }
            else {
                pairs.splice(i, 1); //remove 1 element from i-th index
            }
        }
        create_copy(mutable) {
            var copy = new Hashtable(this.hash_proc, this.equiv_proc, mutable);
            // clone the pairs to copy
            Object.keys(this.pairs_of).forEach((hashed) => {
                var pairs = this.pairs_of[hashed];
                var cloned = pairs.map((pair) => {
                    return Scheme.clone(pair);
                });
                copy.pairs_of[hashed] = cloned;
            });
            return copy;
        }
        size() {
            var n = 0;
            this._apply_pair(function (pair) {
                n++;
            });
            return n;
        }
        keys() {
            return this._apply_pair(function (pair) {
                return pair[0];
            });
        }
        values() {
            return this._apply_pair(function (pair) {
                return pair[1];
            });
        }
        _apply_pair(func) {
            var a = [];
            //each(values(this.pairs_of), function (pairs) {
            //    (pairs as any[]).forEach((pair) => {
            //        a.push(func(pair));
            //    });
            //});
            (Object.values(this.pairs_of)).forEach((pairs) => {
                pairs.forEach((pair) => {
                    a.push(func(pair));
                });
            });
            return a;
        }
        to_write() {
            return "#<Hashtable size=" + this.size() + ">";
        }
        //
        // Hash functions
        //
        static equal_hash(ar) {
            return Scheme.to_write(ar[0]);
        }
        static string_hash(ar) {
            return ar[0];
        }
        static string_ci_hash(ar) {
            return Scheme.isString(ar[0]) ? ar[0].toLowerCase() : ar[0];
        }
        static symbol_hash(ar) {
            return (ar[0] instanceof Scheme._Symbol) ? ar[0].name : ar[0];
        }
        //
        // Equivalence functions
        //
        static eq_equiv(ar) {
            return Scheme.eq(ar[0], ar[1]);
        }
        static eqv_equiv(ar) {
            return Scheme.eqv(ar[0], ar[1]);
        }
    }
    Hashtable.eq_hash = Hashtable.equal_hash;
    Hashtable.eqv_hash = Hashtable.equal_hash;
    Scheme.Hashtable = Hashtable;
})(Scheme || (Scheme = {}));
var Scheme;
(function (Scheme) {
    //
    // Nil
    // javascript representation of empty list( '() )
    //
    class Nil {
        toString() {
            return "nil";
        }
        to_write() {
            return "()";
        }
        to_array() {
            return [];
        }
        length() {
            return 0;
        }
    }
    Scheme.Nil = Nil;
    Scheme.nil = new Nil();
})(Scheme || (Scheme = {}));
var Scheme;
(function (Scheme) {
    //
    // number.js
    //
    //
    // Complex
    //
    class Complex {
        constructor(real, imag) {
            this.real = real;
            this.imag = imag;
        }
        magnitude() {
            return Math.sqrt(this.real * this.real + this.imag * this.imag);
        }
        angle() {
            return Math.atan2(this.imag, this.real);
        }
        isReal() {
            return this.imag == 0;
        }
        isRational() {
            return this.imag == 0 && isRational(this.real);
        }
        isInteger() {
            return this.imag == 0 && isInteger(this.real);
        }
        toString(radix) {
            if (this.real === 0 && this.imag === 0)
                return "0";
            var img = "";
            if (this.imag !== 0) {
                if (this.imag > 0 && this.real !== 0) {
                    img += "+";
                }
                switch (this.imag) {
                    case 1:
                        break;
                    case -1:
                        img += "-";
                        break;
                    default:
                        img += this.imag.toString(radix);
                }
                img += "i";
            }
            var real = "";
            if (this.real !== 0) {
                real += this.real.toString(radix);
            }
            return real + img;
        }
        static from_polar(r, theta) {
            var real = r * Math.cos(theta);
            var imag = r * Math.sin(theta);
            return new Complex(real, imag);
        }
        static assure(num) {
            if (num instanceof Complex)
                return num;
            else
                return new Complex(num, 0);
        }
    }
    Scheme.Complex = Complex;
    //
    // Rational (unfinished)
    //
    class Rational {
        constructor(numerator, denominator) {
            this.numerator = numerator;
            this.denominator = denominator;
        }
        isInteger() {
            // FIXME
            return (this.denominator % this.numerator) === 0;
        }
        isReal() {
            return true;
        }
    }
    Scheme.Rational = Rational;
    //
    // Predicates
    //
    Scheme.isNumber = (x) => (x instanceof Complex) || (x instanceof Rational) || (typeof (x) == 'number');
    Scheme.isComplex = Scheme.isNumber;
    function isReal(x) {
        if (x instanceof Complex || x instanceof Rational) {
            return x.isReal();
        }
        else {
            return (typeof (x) == 'number');
        }
    }
    Scheme.isReal = isReal;
    function isRational(x) {
        if (x instanceof Complex) {
            return x.isRational();
        }
        else if (x instanceof Rational) {
            return true;
        }
        else {
            return (typeof (x) == 'number');
        }
    }
    Scheme.isRational = isRational;
    function isInteger(x) {
        if (x instanceof Complex || x instanceof Rational) {
            return x.isInteger();
        }
        else {
            return (typeof (x) == 'number') && (x % 1 == 0);
        }
    }
    Scheme.isInteger = isInteger;
})(Scheme || (Scheme = {}));
var Scheme;
(function (Scheme) {
    //
    // Pair 
    // cons cell
    //
    class Pair {
        constructor(car, cdr) {
            this.car = car;
            this.cdr = cdr;
            // this.car = car;
            // this.cdr = cdr;
        }
        caar() { return this.car.car; }
        cadr() { return this.cdr.car; }
        cdar() { return this.cdr.car; }
        cddr() { return this.cdr.cdr; }
        first() { return this.car; }
        second() { return this.cdr.car; }
        third() { return this.cdr.cdr.car; }
        fourth() { return this.cdr.cdr.cdr.car; }
        fifth() { return this.cdr.cdr.cdr.cdr.car; }
        // returns array containing all the car's of list
        // '(1 2 3) => [1,2,3]
        // '(1 2 . 3) => [1,2]
        to_array() {
            var ary = [];
            for (var o = this; o instanceof Pair; o = o.cdr) {
                ary.push(o.car);
            }
            return ary;
        }
        to_set() {
            var set = new Scheme._Set();
            for (var o = this; o instanceof Pair; o = o.cdr) {
                set.add(o.car);
            }
            return set;
        }
        length() {
            var n = 0;
            for (var o = this; o instanceof Pair; o = o.cdr) {
                n++;
            }
            return n;
        }
        // Return the last cdr
        last_cdr() {
            var o;
            for (o = this; o instanceof Pair; o = o.cdr)
                ;
            return o;
        }
        // calls the given func passing each car of list
        // returns cdr of last Pair
        foreach(func) {
            for (var o = this; o instanceof Pair; o = o.cdr) {
                func(o.car);
            }
            return o;
        }
        // Returns an array which contains the resuls of calling func
        // with the car's as an argument.
        // If the receiver is not a proper list, the last cdr is ignored.
        // The receiver must not be a cyclic list.
        map(func) {
            var ary = [];
            for (var o = this; Scheme.isPair(o); o = o.cdr) {
                ary.push(func(o.car));
            }
            return ary;
        }
        // Destructively concat the given list to the receiver.
        // The receiver must be a proper list.
        // Returns the receiver.
        concat(list) {
            var o = this;
            while (o instanceof Pair && o.cdr != Scheme.nil) {
                o = o.cdr;
            }
            o.cdr = list;
            return this;
        }
        // returns human-redable string of pair
        inspect(conv) {
            conv || (conv = Scheme.inspect);
            var a = [];
            var last = this.foreach(function (o) {
                a.push(conv(o));
            });
            if (last != Scheme.nil) {
                a.push(".");
                a.push(conv(last));
            }
            return "(" + a.join(" ") + ")";
        }
        toString() {
            return this.inspect();
        }
        to_write() {
            return this.inspect(Scheme.to_write);
        }
    }
    Scheme.Pair = Pair;
    // Creates a list out of the arguments, optionally converting any nested arrays into nested lists if the deep argument is true.
    // Example:
    //   BiwaScheme.List(1, 2, [3, 4]) ;=> (list 1 2 (vector 3 4))
    //   BiwaScheme.deep_array_to_list(1, 2, [3, 4]) ;=> (list 1 2 (list 3 4))
    const _array_to_list = (ary, deep) => {
        var list = Scheme.nil;
        for (var i = ary.length - 1; i >= 0; i--) {
            var obj = ary[i];
            if (deep && Scheme.isArray(obj) && !obj.is_vector) {
                obj = _array_to_list(obj, deep);
            }
            list = new Pair(obj, list);
        }
        return list;
    };
    // Shallow: List(1, 2, [3]) == (list 1 2 (vector 3 4))
    function List(...args) {
        var ary = Scheme.toArray(arguments);
        return _array_to_list(ary, false);
    }
    Scheme.List = List;
    // Shallow: array_to_list(1, 2, [3]) == (list 1 2 (vector 3 4))
    function array_to_list(ary) {
        return _array_to_list(ary, false);
    }
    Scheme.array_to_list = array_to_list;
    // Deep: deep_array_to_list(1, 2, [3, 4]) == (list 1 2 (list 3 4))
    // deep_array_to_list([1, 2, 3]) - deep
    function deep_array_to_list(ary) {
        return _array_to_list(ary, true);
    }
    Scheme.deep_array_to_list = deep_array_to_list;
    function Cons(car, cdr) {
        return new Pair(car, cdr);
    }
    Scheme.Cons = Cons;
})(Scheme || (Scheme = {}));
var Scheme;
(function (Scheme) {
    //
    // Parser 
    // copied from jsScheme - should be rewrriten (support #0=, etc)
    //
    class Parser {
        constructor(txt) {
            this.i = 0;
            this.sexpCommentMarker = new Object();
            this.tokens = this.tokenize(txt);
            // this.i = 0;
        }
        inspect() {
            return [
                "#<Parser:",
                this.i, "/", this.tokens.length, " ",
                Scheme.inspect(this.tokens),
                ">"
            ].join("");
        }
        tokenize(txt) {
            var tokens = new Array(), oldTxt = null;
            var in_srfi_30_comment = 0;
            while (txt != "" && oldTxt != txt) {
                oldTxt = txt;
                txt = txt.replace(/^\s*(;[^\r\n]*(\r|\n|$)|#;|#\||#\\[^\w]|#?(\(|\[|{)|\)|\]|}|\'|`|,@|,|\+inf\.0|-inf\.0|\+nan\.0|\"(\\(.|$)|[^\"\\])*(\"|$)|[^\s()\[\]{}]+)/, function ($0, $1) {
                    var t = $1;
                    if (t == "#|") {
                        in_srfi_30_comment++;
                        return "";
                    }
                    else if (in_srfi_30_comment > 0) {
                        if (/(.*\|#)/.test(t)) {
                            in_srfi_30_comment--;
                            if (in_srfi_30_comment < 0) {
                                throw new Scheme._Error("Found an extra comment terminator: `|#'");
                            }
                            // Push back the rest substring to input stream.
                            return t.substring(RegExp.$1.length, t.length);
                        }
                        else {
                            return "";
                        }
                    }
                    else {
                        if (t.charAt(0) != ';')
                            tokens[tokens.length] = t;
                        return "";
                    }
                });
            }
            return tokens;
        }
        getObject() {
            var r = this.getObject0();
            if (r != this.sexpCommentMarker)
                return r;
            r = this.getObject();
            if (r == Parser.EOS)
                throw new Scheme._Error("Readable object not found after S exression comment");
            r = this.getObject();
            return r;
        }
        getList(close) {
            var list = Scheme.nil, prev = list;
            while (this.i < this.tokens.length) {
                this.eatObjectsInSexpComment("Input stream terminated unexpectedly(in list)");
                if (this.tokens[this.i] == ')' || this.tokens[this.i] == ']' || this.tokens[this.i] == '}') {
                    this.i++;
                    break;
                }
                if (this.tokens[this.i] == '.') {
                    this.i++;
                    var o = this.getObject();
                    if (o != Parser.EOS && list != Scheme.nil) {
                        prev.cdr = o;
                    }
                }
                else {
                    var cur = new Scheme.Pair(this.getObject(), Scheme.nil);
                    if (list == Scheme.nil)
                        list = cur;
                    else
                        prev.cdr = cur;
                    prev = cur;
                }
            }
            return list;
        }
        getVector(close) {
            var arr = new Array();
            while (this.i < this.tokens.length) {
                this.eatObjectsInSexpComment("Input stream terminated unexpectedly(in vector)");
                if (this.tokens[this.i] == ')' ||
                    this.tokens[this.i] == ']' ||
                    this.tokens[this.i] == '}') {
                    this.i++;
                    break;
                }
                arr[arr.length] = this.getObject();
            }
            return arr;
        }
        eatObjectsInSexpComment(err_msg) {
            while (this.tokens[this.i] == '#;') {
                this.i++;
                if ((this.getObject() == Parser.EOS) || (this.i >= this.tokens.length))
                    throw new Scheme._Error(err_msg);
            }
        }
        getObject0() {
            if (this.i >= this.tokens.length)
                return Parser.EOS;
            var t = this.tokens[this.i++];
            // if( t == ')' ) return null;
            if (t == '#;')
                return this.sexpCommentMarker;
            var s = t == "'" ? 'quote' :
                t == "`" ? 'quasiquote' :
                    t == "," ? 'unquote' :
                        t == ",@" ? 'unquote-splicing' : false;
            if (s || t == '(' || t == '#(' || t == '[' || t == '#[' || t == '{' || t == '#{') {
                return s ? new Scheme.Pair(Scheme.Sym(s), new Scheme.Pair(this.getObject(), Scheme.nil))
                    : (t == '(' || t == '[' || t == '{') ? this.getList(t) : this.getVector(t);
            }
            else {
                switch (t) {
                    case "+inf.0": return Infinity;
                    case "-inf.0": return -Infinity;
                    case "+nan.0": return NaN;
                }
                var n;
                if (/^#x[0-9a-z]+$/i.test(t)) { // #x... Hex
                    n = Number('0x' + t.substring(2, t.length));
                }
                else if (/^#d[0-9\.]+$/i.test(t)) { // #d... Decimal
                    n = Number(t.substring(2, t.length));
                }
                else {
                    n = Number(t); // use constrictor as parser
                }
                if (!isNaN(n)) {
                    return n.valueOf();
                }
                else if (t == '#f' || t == '#F') {
                    return false;
                }
                else if (t == '#t' || t == '#T') {
                    return true;
                }
                else if (t.toLowerCase() == '#\\newline') {
                    return Scheme.Char.get('\n');
                }
                else if (t.toLowerCase() == '#\\space') {
                    return Scheme.Char.get(' ');
                }
                else if (t.toLowerCase() == '#\\tab') {
                    return Scheme.Char.get('\t');
                }
                else if (/^#\\.$/.test(t)) {
                    return Scheme.Char.get(t.charAt(2));
                }
                else if (/^#\\x[a-zA-Z0-9]+$/.test(t)) {
                    var scalar = parseInt(t.slice(3), 16);
                    // R6RS 11.11 (surrogate codepoints)
                    if (scalar >= 0xD800 && scalar <= 0xDFFF) {
                        throw new Scheme._Error("Character in Unicode excluded range.");
                    }
                    // ECMA-262 4.3.16 -- Basically, strings are sequences of 16-bit
                    // unsigned integers, so anything greater than 0xFFFF won't fit.
                    // NOTE: This violates R6RS which requires the full Unicode range!
                    else if (scalar > 0xFFFF) {
                        throw new Scheme._Error("Character literal out of range.");
                    }
                    else {
                        return Scheme.Char.get(String.fromCharCode(scalar));
                    }
                }
                else if (/^\"(\\(.|$)|[^\"\\])*\"?$/.test(t)) {
                    return t.replace(/(\r?\n|\\n)/g, "\n").replace(/^\"|\\(.|$)|\"$/g, function ($0, $1) {
                        return $1 ? $1 : '';
                    });
                }
                else
                    return Scheme.Sym(t); // 2Do: validate !!
            }
        }
    }
    // indicates end of source file
    Parser.EOS = new Object();
    Scheme.Parser = Parser;
    // indicates end of source file
    // BiwaScheme.Parser.EOS = new Object();
})(Scheme || (Scheme = {}));
var Scheme;
(function (Scheme) {
    //
    // pause object (facility to stop/resume interpreting)
    //
    class Pause {
        //new (on_pause: javascript function calling setTimeout, Ajax.Request, ..)
        constructor(on_pause) {
            this.on_pause = on_pause;
            // this.on_pause = on_pause;
        }
        //save state of interpreter
        set_state(intp, x, f, c, s) {
            this.interpreter = intp;
            this.x = x;
            this.f = f;
            this.c = c;
            this.s = s;
        }
        //call this when ready (to fire setTimeout, Ajax.Request..)
        ready() {
            this.on_pause(this);
        }
        //restart calculation
        resume(value) {
            return this.interpreter.resume(true, value, this.x, this.f, this.c, this.s);
        }
    }
    Scheme.Pause = Pause;
})(Scheme || (Scheme = {}));
var Scheme;
(function (Scheme) {
    //
    // Set - set of string
    // contents must be string (or at least sortable)
    //
    class _Set {
        constructor(...args /*args*/) {
            this.arr = [];
            // this.arr = [];
            // var i;
            for (let i = 0; i < arguments.length; i++)
                this.arr[i] = arguments[i];
        }
        equals(other) {
            if (this.arr.length != other.arr.length)
                return false;
            var a1 = Scheme.clone(this.arr);
            var a2 = Scheme.clone(other.arr);
            a1.sort();
            a2.sort();
            for (var i = 0; i < this.arr.length; i++) {
                if (a1[i] != a2[i])
                    return false;
            }
            return true;
        }
        set_cons(item) {
            var o = new _Set(item);
            o.arr = Scheme.clone(this.arr);
            o.arr.push(item);
            return o;
        }
        set_union(...args /*args*/) {
            var o = new _Set();
            o.arr = Scheme.clone(this.arr);
            for (var k = 0; k < arguments.length; k++) {
                var s2 = arguments[k];
                if (!(s2 instanceof _Set))
                    throw new Scheme._Error("set_union: arguments must be a set");
                for (var i = 0; i < s2.arr.length; i++)
                    o.add(s2.arr[i]);
            }
            return o;
        }
        set_intersect(s2) {
            if (!(s2 instanceof _Set))
                throw new Scheme._Error("set_intersect: arguments must be a set");
            var o = new _Set();
            for (var i = 0; i < this.arr.length; i++)
                if (s2.member(this.arr[i]))
                    o.add(this.arr[i]);
            return o;
        }
        set_minus(s2) {
            if (!(s2 instanceof _Set))
                throw new Scheme._Error("set_minus: arguments must be a set");
            var o = new _Set();
            for (var i = 0; i < this.arr.length; i++)
                if (!s2.member(this.arr[i]))
                    o.add(this.arr[i]);
            return o;
        }
        add(item) {
            if (!this.member(item)) {
                this.arr.push(item);
            }
        }
        member(item) {
            for (var i = 0; i < this.arr.length; i++)
                if (this.arr[i] == item)
                    return true;
            return false;
        }
        rindex(item) {
            for (var i = this.arr.length - 1; i >= 0; i--)
                if (this.arr[i] == item)
                    return (this.arr.length - 1 - i);
            return null;
        }
        index(item) {
            for (var i = 0; i < this.arr.length; i++)
                if (this.arr[i] == item)
                    return i;
            return null;
        }
        inspect() {
            return "Set(" + this.arr.join(", ") + ")";
        }
        toString() {
            return this.inspect();
        }
        size() {
            return this.arr.length;
        }
    }
    Scheme._Set = _Set;
})(Scheme || (Scheme = {}));
var Scheme;
(function (Scheme) {
    //
    // Symbol
    //
    Scheme.Symbols = {};
    class _Symbol {
        // name: string;
        constructor(name) {
            this.name = name;
            // this.name = str;
            // BiwaScheme.Symbols[str] = this;
            Scheme.Symbols[name] = this;
        }
        inspect() {
            return "'" + this.name;
            //return "#<Symbol '"+this.name+"'>";
        }
        toString() {
            return "'" + this.name;
        }
        to_write() {
            return this.name;
        }
    }
    Scheme._Symbol = _Symbol;
    function Sym(name, leaveCase) {
        if (Scheme.Symbols[name] === undefined) {
            return new _Symbol(name);
        }
        else if (!(Scheme.Symbols[name] instanceof _Symbol)) { //pre-defined member (like 'eval' in Firefox)
            return new _Symbol(name);
        }
        else {
            return Scheme.Symbols[name];
        }
    }
    Scheme.Sym = Sym;
    function gensym() {
        return Sym(Scheme.uniqueId("__gensym"));
    }
    Scheme.gensym = gensym;
})(Scheme || (Scheme = {}));
var Scheme;
(function (Scheme) {
    //
    // #<undef> (The undefined value)
    // also used as #<unspecified> values
    //
    //export var undef = new Object();
    //BiwaScheme.undef.toString = function () { return "#<undef>"; }
    class UndefinedValue {
        toString() {
            return "#<undef>";
        }
    }
    Scheme.UndefinedValue = UndefinedValue;
    Scheme.undef = new UndefinedValue();
})(Scheme || (Scheme = {}));
var Scheme;
(function (Scheme) {
    //
    // Values
    //
    class Values {
        constructor(values) {
            this.content = values;
        }
        to_write() {
            return "#<Values " +
                this.content.map(Scheme.to_write).join(" ") +
                ">";
        }
    }
    Scheme.Values = Values;
})(Scheme || (Scheme = {}));
var Scheme;
(function (Scheme) {
    //
    // write.js: Functions to convert objects to strings
    //
    //
    // write
    //
    function to_write(obj) {
        if (obj === undefined)
            return "undefined";
        else if (obj === null)
            return "null";
        else if (Scheme.isFunction(obj))
            return "#<Function " + (obj.fname ? obj.fname :
                obj.toSource ? Scheme.truncate(obj.toSource(), 40) :
                    "") + ">";
        else if (Scheme.isString(obj))
            return '"' +
                obj.replace(/\\|\"/g, function ($0) { return '\\' + $0; })
                    .replace(/\x07/g, "\\a")
                    .replace(/\x08/g, "\\b")
                    .replace(/\t/g, "\\t")
                    .replace(/\n/g, "\\n")
                    .replace(/\v/g, "\\v")
                    .replace(/\f/g, "\\f")
                    .replace(/\r/g, "\\r") +
                '"';
        else if (Scheme.isArray(obj) && obj.closure_p)
            return "#<Closure>";
        else if (Scheme.isArray(obj))
            return "#(" + obj.map((e) => { return to_write(e); }).join(" ") + ")";
        else if (typeof (obj.to_write) == 'function')
            return obj.to_write();
        else if (isNaN(obj) && typeof (obj) == 'number')
            return "+nan.0";
        else {
            switch (obj) {
                case true: return "#t";
                case false: return "#f";
                case Infinity: return "+inf.0";
                case -Infinity: return "-inf.0";
            }
        }
        return inspect(obj);
    }
    Scheme.to_write = to_write;
    //
    // display
    //
    function to_display(obj) {
        if (Scheme.isUndefined(obj))
            return 'undefined';
        else if (Scheme.isNull(obj))
            return 'null';
        else if (typeof (obj.valueOf()) == "string")
            return obj;
        else if (obj instanceof Scheme._Symbol)
            return obj.name;
        else if (obj instanceof Array)
            return '#(' + obj.map(to_display).join(' ') + ')';
        else if (obj instanceof Scheme.Pair)
            return obj.inspect(to_display);
        else if (obj instanceof Scheme.Char)
            return obj.value;
        else
            return to_write(obj);
    }
    Scheme.to_display = to_display;
    //
    // write/ss (write with substructure)
    //
    // example:  > (let ((x (list 'a))) (list x x))                   //           (#0=(a) #0#)
    // 2-pass algorithm.
    // (1) detect all the objects which appears more than once
    //     (find_cyclic, reduce_cyclic_info)
    // (2) write object using this information
    //   * add prefix '#n=' for first appearance
    //   * just write '#n#' for other appearance
    //TODO: support Values
    function write_ss(obj, array_mode) {
        var known = [obj], used = [false];
        find_cyclic(obj, known, used);
        var cyclic = reduce_cyclic_info(known, used);
        var appeared = new Array(cyclic.length);
        for (var i = cyclic.length - 1; i >= 0; i--)
            appeared[i] = false;
        return to_write_ss(obj, cyclic, appeared, array_mode);
    }
    Scheme.write_ss = write_ss;
    function to_write_ss(obj, cyclic, appeared, array_mode) {
        var ret = "";
        var i = cyclic.indexOf(obj);
        if (i >= 0) {
            if (appeared[i]) {
                return "#" + i + "#";
            }
            else {
                appeared[i] = true;
                ret = "#" + i + "=";
            }
        }
        if (obj instanceof Scheme.Pair) {
            var a = [];
            a.push(to_write_ss(obj.car, cyclic, appeared, array_mode));
            for (var o = obj.cdr; o != Scheme.nil; o = o.cdr) {
                if (!(o instanceof Scheme.Pair) || cyclic.indexOf(o) >= 0) {
                    a.push(".");
                    a.push(to_write_ss(o, cyclic, appeared, array_mode));
                    break;
                }
                a.push(to_write_ss(o.car, cyclic, appeared, array_mode));
            }
            ret += "(" + a.join(" ") + ")";
        }
        else if (obj instanceof Array) {
            var a = obj.map((item) => {
                return to_write_ss(item, cyclic, appeared, array_mode);
            });
            if (array_mode)
                ret += "[" + a.join(", ") + "]";
            else
                ret += "#(" + a.join(" ") + ")";
        }
        else {
            ret += to_write(obj);
        }
        return ret;
    }
    Scheme.to_write_ss = to_write_ss;
    function reduce_cyclic_info(known, used) {
        var n_used = 0;
        for (var i = 0; i < used.length; i++) {
            if (used[i]) {
                known[n_used] = known[i];
                n_used++;
            }
        }
        return known.slice(0, n_used);
    }
    Scheme.reduce_cyclic_info = reduce_cyclic_info;
    function find_cyclic(obj, known, used) {
        var items = (obj instanceof Scheme.Pair) ? [obj.car, obj.cdr] :
            (obj instanceof Array) ? obj :
                null;
        if (!items)
            return;
        items.forEach((item) => {
            if (typeof (item) == 'number' || typeof (item) == 'string' ||
                item === Scheme.undef || item === true || item === false ||
                item === Scheme.nil || item instanceof Scheme._Symbol)
                return;
            var i = known.indexOf(item);
            if (i >= 0)
                used[i] = true;
            else {
                known.push(item);
                used.push(false);
                find_cyclic(item, known, used);
            }
        });
    }
    Scheme.find_cyclic = find_cyclic;
    //
    // inspect
    //
    function inspect(object, opts) {
        try {
            if (Scheme.isUndefined(object)) {
                return 'undefined';
            }
            if (object === null) {
                return 'null';
            }
            if (object === true) {
                return '#t';
            }
            if (object === false) {
                return '#f';
            }
            if (object.inspect)
                return object.inspect();
            if (Scheme.isString(object)) {
                return '"' + object.replace(/"/g, '\\"') + '"';
            }
            if (Scheme.isArray(object)) {
                return '[' + object.map(inspect).join(', ') + ']';
            }
            if (opts && opts["fallback"]) {
                return opts["fallback"];
            }
            else {
                return object.toString();
            }
        }
        catch (e) {
            if (e instanceof RangeError) {
                return '...';
            }
            throw e;
        }
    }
    Scheme.inspect = inspect;
})(Scheme || (Scheme = {}));
/// <reference path="../../system/port.ts" />
var Scheme;
(function (Scheme) {
    Scheme.Port.current_error = Scheme.Port.current_output = new Scheme.CustomOutput(function (str) {
        //// var console;
        //var text;
        //// console = $("#bs-console");
        //let console: any = document.getElementById("bs-console");
        //if (console[0]) {
        //    text = _escape(str);
        //    var span = $("<span>");
        //    span.html(text.replace(/\n/g, "<br>").replace(/ /g, "&nbsp;"));
        //    console.append(span);
        //}
        postMessage(str, undefined);
    });
    Scheme.Port.current_input = new Scheme.CustomInput(function (callback) {
        //var form = $("<form/>");
        //form.html("<input id='webscheme-read-line' type='text'><input type='submit' value='ok'>");
        //$("#bs-console").append(form);
        //form.submit(function () {
        //    var input = $("#webscheme-read-line").val();
        //    form.remove();
        //    callback(input);
        //    return false;
        //});
    });
    let _Console;
    (function (_Console) {
        _Console.puts = (str, no_newline) => {
            Scheme.Port.current_output.put_string(str + (no_newline ? "" : "\n"));
        };
        _Console.p = ( /*ARGS*/) => {
            Scheme.Port.current_output.put_string("p> " + Scheme.toArray(arguments).map(Scheme.inspect).join(" "));
        };
    })(_Console = Scheme._Console || (Scheme._Console = {}));
})(Scheme || (Scheme = {}));
var Scheme;
(function (Scheme) {
    // declare var _: any;
    class Dumper {
        constructor(dumparea) {
            this.dump_pad = "&nbsp;&nbsp;&nbsp;";
            this.fold_limit = 20;
            this.stack_max_len = 80;
            this.dumparea = dumparea || $("#dumparea")[0] || null;
            this.reset();
        }
        reset() {
            if (this.dumparea) {
                // Note: this is for repl.html (needs refactoring..)
                $(this.dumparea).empty();
            }
            this.n_folds = 0;
            this.closures = [];
            this.n_dumps = 0;
            this.cur = -1;
            this.is_folded = true;
        }
        is_opc(obj) {
            return (obj instanceof Array && typeof (obj[0]) == 'string');
        }
        dump_opc(obj, level, nested) {
            var s = "";
            var pad1 = "", pad2 = "";
            var level = level || 0;
            var nested = nested || false;
            for (let i = 0; i < level; ++i) {
                // _.times(level, _.bind(function () { pad1 += this.dump_pad; }, this));
                pad1 += this.dump_pad;
            }
            for (let i = 0; i < level + 1; ++i) {
                // _.times((level + 1), _.bind(function () { pad2 += this.dump_pad; }, this));
                pad2 += this.dump_pad;
            }
            s += pad1 + '[<span class="dump_opecode">' + obj[0] + '</span>';
            var i = 1;
            while (!(obj[i] instanceof Array) && i < obj.length) {
                if (obj[0] == "constant")
                    s += "&nbsp;<span class='dump_constant'>" +
                        this.dump_obj(obj[i]) + "</span>";
                else
                    s += "&nbsp;" + this.dump_obj(obj[i]);
                i++;
            }
            if (i < obj.length)
                s += '<br>\n';
            for (; i < obj.length; i++) {
                if (this.is_opc(obj[i])) {
                    s += this.dump_opc(obj[i], (i == obj.length - 1 ? level : level + 1), true);
                }
                else {
                    s += (i == obj.length - 1) ? pad1 : pad2;
                    s += this.dump_obj(obj[i]);
                }
                if (i != obj.length - 1)
                    s += "<br>\n";
            }
            s += "]";
            return (nested ? s : this.add_fold(s));
        }
        add_fold(s) {
            var lines = s.split(/<br>/gmi);
            if (lines.length > this.fold_limit) {
                var fold_btn = " <span style='text-decoration:underline; color:blue; cursor:pointer;'" +
                    "onclick='BiwaScheme.Dumper.toggle_fold(" + this.n_folds + ")'>more</span>";
                var fold_start = "<div style='display:none' class='fold" + this.n_folds + "'>";
                var fold_end = "</div>";
                this.n_folds++;
                return [
                    lines.slice(0, this.fold_limit).join("<br>"), fold_btn,
                    fold_start, lines.slice(this.fold_limit).join("<br>"), fold_end
                ].join("");
            }
            else {
                return s;
            }
        }
        dump_stack(stk, size) {
            if (stk === null || stk === undefined)
                return Scheme.inspect(stk);
            var s = "<table>";
            // show the 'physical' stack top
            if (stk.length == 0) {
                s += "<tr><td class='dump_dead'>(stack is empty)</td></tr>";
            }
            else if (size < stk.length) {
                var l = stk.length - 1;
                s += "<tr><td class='dump_dead'>[" + l + "]</td>" +
                    "<td class='dump_dead'>" +
                    Scheme.truncate(this.dump_obj(stk[l]), this.stack_max_len) +
                    "</td></tr>";
            }
            // show the element in the stack
            for (var i = size - 1; i >= 0; i--) {
                s += "<tr><td class='dump_stknum'>[" + i + "]</td>" +
                    "<td>" + Scheme.truncate(this.dump_obj(stk[i]), this.stack_max_len) +
                    "</td></tr>";
            }
            return s + "</table>";
        }
        dump_object(obj) {
            var a = [];
            for (var k in obj) {
                //if(this.prototype[k]) continue;
                a.push(k.toString()); //+" => "+this[k].toString() );
            }
            return "#<Object{" + a.join(",") + "}>";
        }
        dump_closure(cls) {
            if (cls.length == 0)
                return "[]";
            var cls_num = null;
            for (var i = 0; i < this.closures.length; i++) {
                if (this.closures[i] == cls)
                    cls_num = i;
            }
            if (cls_num == null) {
                cls_num = this.closures.length;
                this.closures.push(cls);
            }
            var c = Scheme.clone(cls);
            var body = c.shift();
            return [
                "c", cls_num, " <span class='dump_closure'>free vars :</span> ",
                this.dump_obj(c), " <span class='dump_closure'>body :</span> ",
                Scheme.truncate(this.dump_obj(body), 100)
            ].join("");
        }
        dump_obj(obj) {
            if (obj && typeof (obj.to_html) == 'function')
                return obj.to_html();
            else {
                var s = Scheme.write_ss(obj, true); //true=Array mode
                if (s == "[object Object]")
                    s = this.dump_object(obj);
                return Scheme._escape(s);
            }
        }
        dump(obj) {
            var s = "";
            if (obj instanceof Object) {
                s += "<table>";
                // header
                s += "<tr><td colspan='4'>" +
                    "<a href='#' class='header'>" +
                    "#" + this.n_dumps + "</a></td></tr>";
                // registers
                Object.keys(obj).forEach((key) => {
                    var value = obj[key];
                    if (key != "x" && key != "stack") {
                        value = (key == "c" ? this.dump_closure(value)
                            : this.dump_obj(value));
                        s += "<tr><td>" + key + ": </td>" +
                            "<td colspan='3'>" + value + "</td></tr>";
                    }
                });
                s += "<tr><td>x:</td><td>" +
                    (this.is_opc(obj["x"]) ? this.dump_opc(obj["x"])
                        : this.dump_obj(obj["x"])) +
                    "</td>";
                // stack
                s += "<td style='border-left: 1px solid black'>stack:</td><td>" +
                    this.dump_stack(obj["stack"], obj["s"]) +
                    "</td></tr>";
                s += "</table>";
            }
            else {
                s = Scheme._escape(Scheme.inspect(obj)) + "<br>\n";
            }
            var dumpitem = $("<div/>", { class: ("dump" + this.n_dumps) });
            dumpitem.html(s);
            $(this.dumparea).append(dumpitem);
            (((n) => {
                $(".header", this.dump_el(this.n_dumps)).click(() => {
                    this.dump_move_to(n);
                    this.dump_fold();
                });
            }))(this.n_dumps);
            dumpitem.hide();
            this.n_dumps++;
        }
        //
        // UI
        //
        dump_el(n) {
            return $(".dump" + n, this.dumparea);
        }
        dump_move_to(n) {
            if (0 <= n && n <= this.n_dumps) {
                this.dump_el(this.cur).hide();
                this.cur = n;
                this.dump_el(this.cur).show();
            }
        }
        dump_move(dir) {
            if (0 <= this.cur && this.cur < this.n_dumps)
                this.dump_el(this.cur).hide();
            if (0 <= this.cur + dir && this.cur + dir < this.n_dumps)
                this.cur += dir;
            this.dump_el(this.cur).show();
        }
        dump_fold() {
            for (var i = 0; i < this.n_dumps; i++)
                if (i != this.cur)
                    this.dump_el(i).hide();
            this.is_folded = true;
        }
        dump_unfold() {
            for (var i = 0; i < this.n_dumps; i++)
                this.dump_el(i).show();
            this.is_folded = false;
        }
        dump_toggle_fold() {
            if (this.is_folded)
                this.dump_unfold();
            else
                this.dump_fold();
        }
        static toggle_fold(n) {
            $(".fold" + n, this.dumparea).toggle();
        }
    }
    Scheme.Dumper = Dumper;
})(Scheme || (Scheme = {}));
//# sourceMappingURL=scheme.js.map