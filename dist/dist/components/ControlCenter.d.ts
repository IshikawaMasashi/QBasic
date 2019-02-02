import * as React from "react";
import { SplitInfo } from "./Split";
import { EditorView, View } from "./editor";
declare type ControlCenterProps = {
    onToggle?: Function;
    showSandbox: boolean;
    output: string;
    setOutput: (output: string) => void;
};
declare type ControlCenterState = {
    /**
     * Split state.
     */
    splits: SplitInfo[];
    /**
     * Visible pane.
     */
    visible: "output" | "problems";
    problemCount: number;
    outputLineCount: number;
};
export declare class ControlCenter extends React.Component<ControlCenterProps, ControlCenterState> {
    outputView: View;
    refs: {
        container: HTMLDivElement;
    };
    outputViewEditor: EditorView;
    updateOutputViewTimeout: any;
    constructor(props: ControlCenterProps);
    onOutputChanged: () => void;
    onDidChangeProblems: () => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    setOutputViewEditor(editor: EditorView): void;
    updateOutputView(): void;
    createPane(): void;
    getOutputLineCount(): number;
    getProblemCount(): number;
    render(): JSX.Element;
}
export {};
