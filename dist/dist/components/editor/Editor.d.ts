import * as React from "react";
import { IStatusProvider } from "../../models";
import { View } from "./View";
import "./JSXColoringProvider.css";
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
export interface MonacoProps {
    view: View;
    options?: monaco.editor.IEditorConstructionOptions;
    onChange: () => void;
}
export declare class Monaco extends React.Component<MonacoProps, {}> {
    editor: monaco.editor.IStandaloneCodeEditor;
    container: HTMLDivElement;
    status: IStatusProvider;
    constructor(props: MonacoProps);
    syntaxWorker: Worker;
    setupSyntaxWorker: () => void;
    decorations: string[];
    updateDecorations: (classifications: {
        startLine: number;
        start: number;
        endLine: number;
        end: number;
        kind: string;
    }[]) => Promise<void>;
    setCompilerOptions: () => void;
    syntaxHighlight: (code: string, title: string, version: number) => Promise<void>;
    revealLastLine(): void;
    componentDidMount(): void;
    handleChange: () => void;
    componentWillReceiveProps(nextProps: EditorViewProps): void;
    shouldComponentUpdate(nextProps: EditorViewProps, nextState: any): boolean;
    componentDidUpdate(): void;
    onLayout: () => void;
    componentWillUnmount(): void;
    registerActions(): void;
    private ensureEditor;
    disableEditorScroll(): void;
    enableEditorScroll(): void;
    private setContainer;
    render(): JSX.Element;
}
export interface EditorViewProps {
    view: View;
    options?: monaco.editor.IEditorConstructionOptions;
    onChange: () => void;
}
export declare class EditorView extends React.Component<EditorViewProps, {}> {
    monaco: Monaco;
    setMonaco(monaco: Monaco): void;
    revealLastLine(): void;
    render(): JSX.Element;
}
