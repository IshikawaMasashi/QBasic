declare namespace Scheme {
}
declare namespace Scheme {
    const TopEnv: IStringDictionary<FunctionHolder | UndefinedValue>;
    const CoreEnv: IStringDictionary<FunctionHolder | UndefinedValue>;
    type Atom = number | Rational | Complex | string | _Symbol | Nil | UndefinedValue;
    type _List = Nil | Pair;
    type SymbolicExpression = Atom | _List;
    function debug(): void;
    const max_trace_size = 40;
    const suppress_deprecation_warning = false;
}
declare namespace Scheme {
}
declare namespace Scheme {
    class Interpreter {
        stack: SymbolicExpression[];
        on_error: any;
        after_evaluate: any;
        last_refer: any;
        call_stack: any;
        tco_counter: number[];
        max_trace_size: number;
        parser: Parser;
        compiler: Compiler;
        dumper: any;
        is_top: boolean;
        file_stack: any;
        static dumper: any;
        constructor(value?: any);
        inspect(): string;
        push(x: any, s: any): any;
        save_stack(s: number): {
            stack: any[];
            last_refer: any;
            call_stack: any;
            tco_counter: any;
        };
        restore_stack(stuff: any): any;
        continuation(s: any, n: any): any[];
        shift_args(n: number, m: number, s: number): number;
        index(s: number, i: number): SymbolicExpression;
        index_set(s: number, i: number, v: any): void;
        closure(body: any, n: number, s: number, dotpos: number): any[];
        run_dump_hook(a: any, x: any, f: any, c: any, s: any): void;
        _execute(a: any, x: any, f: any, c: any, s: number): any;
        evaluate(str: string, after_evaluate?: any): any;
        resume(is_resume: boolean, a?: SymbolicExpression, x?: any, f?: any, c?: any, s?: any): UndefinedValue | Pause;
        invoke_closure(closure: any, args?: any): any;
        compile(str: any): any;
        static read(str: string): any;
        static expand(x: any, flag?: any): Pair;
    }
}
declare function onError(e: {
    message: string;
}): void;
declare const intp: Scheme.Interpreter;
declare namespace Scheme {
    /**
     * An interface for a JavaScript object that
     * acts a dictionary. The keys are strings.
     */
    interface IStringDictionary<V> {
        [name: string]: V;
    }
}
declare namespace Scheme {
    class FunctionHolder {
        readonly fname: string;
        readonly min: number;
        readonly max: number;
        readonly func: (ar: any[], intp?: any) => any;
        constructor(fname: string, min: number, max: number, func: (ar: any[], intp?: any) => any);
        check_arity(len: number): void;
        call(ar: any, intp: any): any;
        inspect(): string;
    }
}
declare namespace Scheme {
    class Syntax {
        sname: string;
        func?: any;
        constructor(sname: string, func?: any);
        transform(x: any): any;
        inspect(): string;
    }
}
declare namespace Scheme {
    function uniqueId(prefix: string): string;
    function shallowProperty(key: any): (obj: any) => any;
    function keys(obj: any): string[];
    function values(obj: any): any[];
    function toArray(obj: any): any;
    function clone(obj: any): any;
    function truncate(str: any, length: number, truncateStr?: string): any;
    const _escape: (string: string) => string;
}
declare namespace Scheme {
    class Char {
        value: string;
        constructor(value: string);
        to_write(): string;
        inspect(): string;
        static get(c: any): Char;
    }
    function isChar(obj: any): obj is Char;
    const Chars: IStringDictionary<Char>;
}
declare namespace Scheme {
    function isNil(obj: any): boolean;
    function isNull(obj: any): boolean;
    function isUndef(obj: any): boolean;
    function isUndefined(obj: any): boolean;
    function isArray(arg: any): arg is any[];
    function isBoolean(obj: any): boolean;
    function isString(obj: any): boolean;
    function isFunction(obj: any): obj is Function;
    function isObject(obj: any): boolean;
    function isSymbol(obj: any): boolean;
    function isPair(obj: any): boolean;
    function isList(obj: any): boolean;
    function isVector(obj: any): boolean;
    function isHashtable(obj: any): boolean;
    function isMutableHashtable(obj: any): boolean;
    function isClosure(obj: any): boolean;
    function isProcedure(obj: any): boolean;
    function isSelfEvaluating(obj: any): boolean;
    function isArrayLike(collection: any): boolean;
    function eq(a: any, b: any): boolean;
    function eqv(a: any, b: any): boolean;
    function equal(a: any, b: any): boolean;
    function lt(a: any, b: any): boolean;
}
declare namespace Scheme {
    class RTD {
        name: string;
        parent_rtd: RTD;
        uid: any;
        is_base_type: any;
        generative: any;
        sealed: any;
        opaque: any;
        fields: any;
        constructor(name: string, parent_rtd: RTD, uid: any, sealed: boolean, opaque: boolean, fields: any);
        field_name(k: any): any;
        _field_names(): any[];
        _generate_new_uid(): _Symbol;
        toString(): string;
        static NongenerativeRecords: any;
    }
    class CD {
        rtd: RTD;
        parent_cd: any;
        has_custom_protocol: boolean;
        protocol: any;
        constructor(rtd: RTD, parent_cd: CD, protocol: any);
        _check(rtd: RTD, parent_cd: any, protocol: any): void;
        _default_protocol_for_base_types(): FunctionHolder;
        _default_protocol_for_derived_types(): FunctionHolder;
        toString(): string;
        record_constructor(): Call;
        _make_p(): FunctionHolder;
        _make_n(children_values: any, rtd: any): FunctionHolder;
    }
    class _Record {
        rtd: RTD;
        fields: any;
        constructor(rtd: RTD, values: any);
        get(k: any): any;
        set(k: any, v: any): void;
        toString(): string;
        static _DefinedTypes: any;
        static define_type(name_str: any, rtd: any, cd: any): {
            rtd: any;
            cd: any;
        };
        static get_type(name_str: any): any;
        static RTD: typeof RTD;
        static CD: typeof CD;
    }
    function isRecord(o: any): boolean;
    function isRecordTD(o: any): boolean;
    function isRecordCD(o: any): boolean;
}
declare namespace Scheme {
    namespace Enumeration {
        class EnumType {
            members: any;
            constructor(members: _Symbol[]);
            universe(): EnumSet;
            indexer(): FunctionHolder;
            _constructor(): FunctionHolder;
        }
        class EnumSet {
            enum_type: any;
            symbols: any;
            constructor(enum_type: any, symbols: any);
            symbol_list(): Nil;
            is_member(symbol: any): any;
            is_subset(other: any): boolean;
            equal_to(other: any): any;
            union(other: any): EnumSet;
            intersection(other: any): EnumSet;
            difference(other: any): EnumSet;
            complement(): EnumSet;
            projection(other: any): EnumSet;
            toString(): string;
        }
    }
    function isEnumSet(obj: any): boolean;
}
declare namespace Scheme {
    class _Promise {
        box: [boolean, any];
        constructor(done: boolean, thunk_or_value: any);
        is_done(): boolean;
        value(): any;
        thunk(): any;
        update_with(new_promise: any): void;
        static fresh(thunk: any): _Promise;
        static done(value: any): _Promise;
    }
    function isPromise(obj: any): boolean;
}
declare namespace Scheme {
    const eof: Object;
    class Port {
        is_input: boolean;
        is_output: boolean;
        is_open: boolean;
        is_binary: boolean;
        constructor(is_input: boolean, is_output: boolean);
        close(): void;
        inspect(): string;
        to_write(): string;
        put_string(str: string): void;
        static current_input: Port;
        static current_output: Port;
        static current_error: Port;
    }
    class StringOutput extends Port {
        buffer: any[];
        constructor();
        put_string(str: any): void;
        output_string(str?: any): string;
    }
    class StringInput extends Port {
        str: string;
        constructor(str: string);
        get_string(after: any): any;
    }
    class NullInput extends Port {
        constructor();
        get_string(after: any): any;
    }
    class NullOutput extends Port {
        output_function?: any;
        constructor(output_function?: any);
        put_string(str: string): void;
    }
    class CustomOutput extends Port {
        output_function: (string: any) => void;
        constructor(output_function: (string: any) => void);
        put_string(str: string): void;
    }
    class CustomInput extends Port {
        input_function: any;
        constructor(input_function: any);
        get_string(after: any): Pause;
    }
    function isPort(obj: any): boolean;
}
declare namespace Scheme {
    function define_libfunc(fname: any, min: number, max: number, func: (ar: any[], intp?: any) => any): void;
    function alias_libfunc(fname: string, aliases: any): void;
    function define_syntax(sname: string, func: any): void;
    function define_scmfunc(fname: string, min: number, max: number, str: string): void;
    var assert_number: (...args: any[]) => void;
    var assert_integer: (...args: any[]) => void;
    var assert_real: (...args: any[]) => void;
    var assert_between: (...args: any[]) => void;
    var assert_string: (...args: any[]) => void;
    var assert_char: (...args: any[]) => void;
    var assert_symbol: (...args: any[]) => void;
    var assert_port: (...args: any[]) => void;
    var assert_pair: (...args: any[]) => void;
    var assert_list: (...args: any[]) => void;
    var assert_vector: (...args: any[]) => void;
    var assert_hashtable: (...args: any[]) => void;
    var assert_record: (...args: any[]) => void;
    var assert_record_td: (...args: any[]) => void;
    var assert_record_cd: (...args: any[]) => void;
    var assert_enum_set: (...args: any[]) => void;
    var assert_promise: (...args: any[]) => void;
    var assert_function: (...args: any[]) => void;
    var assert_closure: (...args: any[]) => void;
    var assert_procedure: (...args: any[]) => void;
    var assert_date: (...args: any[]) => void;
    var assert: (...args: any[]) => void;
    function deprecate(title: any, ver: any, alt: any): void;
    function parse_fraction(rep: any): number | false;
    function is_valid_integer_notation(rep: any, rdx: any): boolean;
    function parse_integer(rep: string, rdx: number): number | false;
    function is_valid_float_notation(rep: any): boolean;
    function parse_float(rep: any): number | false;
}
declare namespace Scheme {
    function init2(): void;
}
declare namespace Scheme {
    function alist_to_js_obj(alist: any): any;
}
declare namespace Scheme {
    function init(): void;
}
declare namespace Scheme {
    function date2string(date: any, format: any): any;
}
declare namespace Scheme {
    function create_elements_by_string(spec: any): string;
}
declare namespace Scheme {
    class Call {
        proc: any;
        args: any;
        after: any;
        constructor(proc: any, args: any, after?: any);
        inspect(): string;
        toString(): string;
        to_write(): string;
        static default_callbacks: any;
        static foreach(obj: any, callbacks: any, is_multi?: any): any;
        static multi_foreach(obj: any, callbacks: any): any;
    }
    namespace Iterator {
        class ForArray {
            arr: any;
            i: number;
            constructor(arr: any);
            has_next(): boolean;
            next(): any;
        }
        class ForString {
            str: any;
            private i;
            constructor(str: any);
            has_next(): boolean;
            next(): Char;
        }
        class ForList {
            ls: any;
            constructor(ls: any);
            has_next(): boolean;
            next(): any;
        }
        class ForMulti {
            objs: any;
            size: number;
            iterators: any;
            constructor(objs: any);
            has_next(): boolean;
            next(): any;
        }
        function of(obj: any): ForArray | ForString | ForList;
    }
}
declare namespace Scheme {
    class Compiler {
        constructor();
        is_tail(x: any[]): boolean;
        collect_free(free: any, e: any, next: any): any;
        compile_refer(x: any, e: any, next: any): any;
        compile_lookup(x: any, e: any, return_local: any, return_free: any, return_global: any): any;
        make_boxes(sets: _Set, vars: Pair, next: any): any;
        find_sets(x: any, v: any): _Set;
        find_free(x: any, b: any, f: any): any;
        find_dot_pos(x: any): number;
        last_pair(x: any): any;
        dotted2proper(ls: any): _List;
        compile(x: SymbolicExpression, e: any, s: any, f: any, next: any): any;
        _compile_define(x: any, next: any): any[];
        _compile_lambda(x: any, e: any, s: any, f: any, next: any): any;
        run(expr: any, next?: any): any;
        static compile(expr: any, next?: any): any;
        static is_definition(x: any): boolean;
        static define_to_lambda_bind(def: any): any;
        static transform_internal_define(x: any): any;
    }
}
declare namespace Scheme {
    class _Error {
        message: string;
        constructor(msg: string);
        toString(): string;
    }
    class Bug extends _Error {
        constructor(msg: string);
    }
    class UserError extends _Error {
        constructor(msg: string);
    }
}
declare namespace Scheme {
    class Hashtable {
        hash_proc: any;
        equiv_proc: any;
        mutable: boolean;
        pairs_of: {
            [key: string]: any[];
        };
        constructor(hash_proc: any, equiv_proc: any, mutable?: boolean);
        clear(): void;
        candidate_pairs(hashed: any): any[];
        add_pair(hashed: any, key: any, value: any): void;
        remove_pair(hashed: any, pair: any): void;
        create_copy(mutable: any): Hashtable;
        size(): number;
        keys(): any[];
        values(): any[];
        _apply_pair(func: any): any[];
        to_write(): string;
        static equal_hash(ar: any): any;
        static eq_hash: typeof Hashtable.equal_hash;
        static eqv_hash: typeof Hashtable.equal_hash;
        static string_hash(ar: any): any;
        static string_ci_hash(ar: any): any;
        static symbol_hash(ar: any): any;
        static eq_equiv(ar: any): boolean;
        static eqv_equiv(ar: any): boolean;
    }
}
declare namespace Scheme {
    class Nil {
        toString(): string;
        to_write(): string;
        to_array(): string[];
        length(): number;
    }
    const nil: Nil;
}
declare namespace Scheme {
    class Complex {
        real: number;
        imag: number;
        constructor(real: number, imag: number);
        magnitude(): number;
        angle(): number;
        isReal(): boolean;
        isRational(): any;
        isInteger(): boolean;
        toString(radix: number): string;
        static from_polar(r: number, theta: number): Complex;
        static assure(num: any): Complex;
    }
    class Rational {
        numerator: number;
        denominator: number;
        constructor(numerator: number, denominator: number);
        isInteger(): boolean;
        isReal(): boolean;
    }
    const isNumber: (x: any) => boolean;
    const isComplex: (x: any) => boolean;
    function isReal(x: any): boolean;
    function isRational(x: any): any;
    function isInteger(x: any): boolean;
}
declare namespace Scheme {
    class Pair {
        car: SymbolicExpression;
        cdr?: SymbolicExpression;
        constructor(car: SymbolicExpression, cdr?: SymbolicExpression);
        caar(): SymbolicExpression;
        cadr(): SymbolicExpression;
        cdar(): SymbolicExpression;
        cddr(): SymbolicExpression;
        first(): SymbolicExpression;
        second(): SymbolicExpression;
        third(): SymbolicExpression;
        fourth(): SymbolicExpression;
        fifth(): SymbolicExpression;
        to_array(): any[];
        to_set(): _Set;
        length(): number;
        last_cdr(): any;
        foreach(func: any): never;
        map(func: any): any[];
        concat(list: SymbolicExpression): this;
        inspect(conv?: any): string;
        toString(): string;
        to_write(): string;
    }
    function List(...args: any[]): any;
    function array_to_list(ary: any): Nil;
    function deep_array_to_list(ary: any): Nil;
    function Cons(car: any, cdr: any): Pair;
}
declare namespace Scheme {
    class Parser {
        tokens: string[];
        private i;
        constructor(txt: string);
        inspect(): string;
        tokenize(txt: string): string[];
        sexpCommentMarker: Object;
        getObject(): any;
        getList(close: any): _List;
        getVector(close: any): any[];
        eatObjectsInSexpComment(err_msg: string): void;
        getObject0(): any;
        static EOS: Object;
    }
}
declare namespace Scheme {
    class Pause {
        on_pause: (pause: Pause) => void;
        interpreter: Interpreter;
        x: any;
        f: any;
        c: any;
        s: any;
        constructor(on_pause: (pause: Pause) => void);
        set_state(intp: any, x: any, f: any, c: any, s: any): void;
        ready(): void;
        resume(value: any): UndefinedValue | Pause;
    }
}
declare namespace Scheme {
    class _Set {
        arr: any[];
        constructor(...args: any[]);
        equals(other: any): boolean;
        set_cons(item: any): _Set;
        set_union(...args: any[]): _Set;
        set_intersect(s2: any): _Set;
        set_minus(s2: any): _Set;
        add(item: any): void;
        member(item: any): boolean;
        rindex(item: any): number;
        index(item: any): number;
        inspect(): string;
        toString(): string;
        size(): number;
    }
}
declare namespace Scheme {
    const Symbols: {
        [key: string]: _Symbol;
    };
    class _Symbol {
        readonly name: string;
        constructor(name: string);
        inspect(): string;
        toString(): string;
        to_write(): string;
    }
    function Sym(name: string, leaveCase?: any): _Symbol;
    function gensym(): _Symbol;
}
declare namespace Scheme {
    class UndefinedValue {
        toString(): string;
    }
    const undef: UndefinedValue;
}
declare namespace Scheme {
    class Values {
        content: any;
        constructor(values: any);
        to_write(): string;
    }
}
declare namespace Scheme {
    function to_write(obj: any): any;
    function to_display(obj: any): any;
    function write_ss(obj: any, array_mode?: any): string;
    function to_write_ss(obj: any, cyclic?: any, appeared?: any, array_mode?: any): string;
    function reduce_cyclic_info(known: any, used: any): any;
    function find_cyclic(obj: any, known: any, used: any): void;
    function inspect(object: any, opts?: any): string;
}
declare namespace Scheme {
    namespace _Console {
        var puts: (str: string, no_newline?: boolean) => void;
        var p: () => void;
    }
}
declare namespace Scheme {
    class Dumper {
        dumparea: any;
        n_folds: any;
        closures: any;
        n_dumps: any;
        cur: any;
        is_folded: any;
        static dumparea: any;
        constructor(dumparea: any);
        reset(): void;
        is_opc(obj: any): boolean;
        dump_pad: string;
        dump_opc(obj: any, level?: any, nested?: any): any;
        fold_limit: number;
        add_fold(s: any): any;
        stack_max_len: number;
        dump_stack(stk: any, size: any): string;
        dump_object(obj: any): string;
        dump_closure(cls: any): string;
        dump_obj(obj: any): any;
        dump(obj: any): void;
        dump_el(n: any): any;
        dump_move_to(n: number): void;
        dump_move(dir: any): void;
        dump_fold(): void;
        dump_unfold(): void;
        dump_toggle_fold(): void;
        static toggle_fold(n: any): void;
    }
}
