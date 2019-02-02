import * as React from 'react';
export interface DropIndicatorProps {
    rowHeight: number;
    indent: number;
    dropOverClassName?: string;
    dropBetweenClassName?: string;
}
export interface DropIndicatorState {
    type: 'none' | 'over' | 'between';
    index: number;
    depth: number;
}
export declare class DropIndicator extends React.Component<DropIndicatorProps, DropIndicatorState> {
    constructor(props: any);
    render(): JSX.Element;
}
