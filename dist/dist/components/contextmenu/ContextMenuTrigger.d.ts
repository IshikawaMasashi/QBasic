import * as React from "react";
declare type ContextMenuTriggerProps = {
    id: string;
    attributes?: React.HTMLAttributes<any>;
    collect?: {
        (data: any): any;
    };
    disable?: boolean;
    holdToDisplay?: number;
    renderTag?: React.ReactType;
    posX?: number;
    posY?: number;
};
declare type ContextMenuTriggerState = {};
export default class ContextMenuTrigger extends React.Component<ContextMenuTriggerProps, ContextMenuTriggerState> {
    elem: HTMLElement;
    mouseDownTimeoutId: any;
    touchstartTimeoutId: any;
    static defaultProps: {
        attributes: {};
        collect(): any;
        disable: boolean;
        holdToDisplay: number;
        renderTag: string;
        posX: number;
        posY: number;
    };
    touchHandled: boolean;
    handleMouseDown: (event: React.MouseEvent<HTMLElement>) => void;
    handleMouseUp: (event: any) => void;
    handleMouseOut: (event: any) => void;
    handleTouchstart: (event: React.TouchEvent<HTMLElement>) => void;
    handleTouchEnd: (event: React.TouchEvent<Element>) => void;
    handleContextMenu: (event: any) => void;
    handleContextClick: (event: any) => void;
    elemRef: (c: HTMLElement) => void;
    render(): React.ReactElement<any>;
}
export {};
