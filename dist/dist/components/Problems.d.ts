import * as React from "react";
import { File, Problem } from "../models";
import { ITree } from "../monaco-extra";
export interface ProblemsProps {
}
export interface ProblemsState {
}
export declare class Problems extends React.Component<ProblemsProps, ProblemsState> {
    tree: ITree;
    contextViewService: any;
    contextMenuService: any;
    container: HTMLDivElement;
    constructor(props: ProblemsProps);
    componentDidMount(): void;
    componentWillReceiveProps(props: ProblemsProps): void;
    private setContainer;
    private ensureTree;
    onSelectProblem(problem: File | Problem): void;
    render(): JSX.Element;
}
