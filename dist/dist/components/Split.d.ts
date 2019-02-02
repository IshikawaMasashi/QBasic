import * as React from "react";
import { EventDispatcher } from "../models";
export declare enum SplitOrientation {
    Horizontal = 0,
    Vertical = 1
}
export interface SplitInfo {
    min?: number;
    max?: number;
    value?: number;
    resize?: "fixed" | "stretch";
}
export interface SplitProps {
    orientation: SplitOrientation;
    onChange?: (splits: SplitInfo[]) => void;
    splits?: SplitInfo[];
    defaultSplit?: SplitInfo;
    children: React.ReactNode;
    name?: string;
}
export interface SplitState {
    splits: SplitInfo[];
}
export declare class Split extends React.Component<SplitProps, SplitState> {
    container: HTMLDivElement;
    index: number;
    static onResizeBegin: EventDispatcher;
    static onResizeEnd: EventDispatcher;
    private isInMove;
    private solver;
    private vars;
    constructor(props: SplitProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: SplitProps): void;
    componentWillUnmount(): void;
    private onResizerMouseDown;
    /**
     * This fires for all splits, even if the resizer doesn't belong to this split.
     */
    onResizerMouseUp: () => void;
    private onResizerMouseMove;
    private onResizerTouchMove;
    querySolver(splits: SplitInfo[]): void;
    private getContainerSize;
    private canonicalizeSplits;
    /**
     * Initializes a Cassowary solver and the constraints based on split infos and container size.
     */
    private setupSolver;
    suggestVarValues(splits: SplitInfo[]): void;
    render(): JSX.Element;
}
