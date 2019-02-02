import * as React from 'react';
import './react-console.css';
export interface LogMessage {
    type?: string;
    value: any[];
}
export interface LogEntry {
    label: string;
    command: string;
    message: LogMessage[];
}
export interface ConsoleProps {
    handler: (command: string) => any;
    cancel?: () => any;
    complete?: (words: string[], curr: number, promptText: string) => string[];
    continue?: (promptText: string) => boolean;
    autofocus?: boolean;
    promptLabel?: string | (() => string);
    welcomeMessage?: string;
}
export declare const enum ConsoleCommand {
    Default = 0,
    Search = 1,
    Kill = 2,
    Yank = 3
}
export declare const enum SearchDirection {
    Reverse = 0,
    Forward = 1
}
export interface ConsoleState {
    focus?: boolean;
    acceptInput?: boolean;
    typer?: string;
    point?: number;
    currLabel?: string;
    promptText?: string;
    restoreText?: string;
    searchText?: string;
    searchDirection?: SearchDirection;
    searchInit?: boolean;
    log?: LogEntry[];
    history?: string[];
    historyn?: number;
    kill?: string[];
    killn?: number;
    argument?: string;
    lastCommand?: ConsoleCommand;
}
export default class extends React.Component<ConsoleProps, ConsoleState> {
    constructor(props: ConsoleProps);
    static defaultProps: {
        promptLabel: string;
        continue: () => boolean;
        cancel: () => void;
    };
    child: {
        typer?: HTMLTextAreaElement;
        container?: HTMLElement;
        focus?: HTMLElement;
    };
    log: (...messages: any[]) => void;
    logX: (type: string, ...messages: any[]) => void;
    return: () => void;
    componentDidMount(): void;
    focus: () => void;
    blur: () => void;
    keyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    change: () => void;
    paste: (e: React.ClipboardEvent<HTMLTextAreaElement>) => void;
    beginningOfLine: () => void;
    endOfLine: () => void;
    forwardChar: () => void;
    backwardChar: () => void;
    forwardWord: () => void;
    backwardWord: () => void;
    acceptLine: () => void;
    previousHistory: () => void;
    nextHistory: () => void;
    beginningOfHistory: () => void;
    endOfHistory: () => void;
    triggerSearch: () => void;
    reverseSearchHistory: () => void;
    forwardSearchHistory: () => void;
    nonIncrementalReverseSearchHistory: () => void;
    nonIncrementalForwardSearchHistory: () => void;
    historySearchBackward: () => void;
    historySearchForward: () => void;
    historySubstringSearchBackward: () => void;
    historySubstringSearchForward: () => void;
    yankNthArg: () => void;
    yankLastArg: () => void;
    deleteChar: () => void;
    backwardDeleteChar: () => void;
    killLine: () => void;
    backwardKillLine: () => void;
    killWholeLine: () => void;
    killWord: () => void;
    backwardKillWord: () => void;
    yank: () => void;
    yankPop: () => void;
    complete: () => void;
    prefixMeta: () => void;
    cancelCommand: () => void;
    textInsert: (insert: string, text: string, replace?: number, point?: number) => string;
    consoleInsert: (insert: string, replace?: number) => ConsoleState;
    movePoint: (n: number, max?: number) => number;
    nextWord(): number;
    previousWord(): number;
    rotateRing: (n: number, ringn: number, ring: number, circular?: boolean) => number;
    rotateHistory: (n: number) => void;
    searchHistory: (direction?: SearchDirection, next?: boolean) => ConsoleState;
    scrollSemaphore: number;
    scrollIfBottom: () => () => void;
    scrollIfBottomTrue: () => void;
    scrollToBottom: () => void;
    nextLabel: () => string;
    render(): JSX.Element;
}
