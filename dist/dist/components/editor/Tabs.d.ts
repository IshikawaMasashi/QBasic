import * as React from "react";
import Group from "../../utils/group";
import { View } from "./View";
import './tabs.css';
export interface TabsProps {
    onDoubleClick?: Function;
    commands?: JSX.Element | JSX.Element[];
    index: number;
    group?: Group;
}
export interface TabsState {
    scrollLeft: number;
}
export declare class Tabs extends React.Component<TabsProps, TabsState> {
    static defaultProps: any;
    container: HTMLDivElement;
    state: {
        scrollLeft: number;
    };
    componentDidUpdate(): void;
    onWheel: (e: React.WheelEvent<any>) => void;
    onDoubleClick: (e: React.MouseEvent<any>) => void;
    setContainerRef: (ref: HTMLDivElement) => void;
    render(): JSX.Element;
    private onItemMove;
}
export interface TabProps {
    group: Group;
    groupIndex: number;
    tabIndex: number;
    label?: string;
    view?: View;
    isActive?: boolean;
    isItalic?: boolean;
    onClick?: Function;
    onDoubleClick?: Function;
    onClose?: Function;
    icon?: string;
    isMarked?: boolean;
    setCloseFile: (closeFile: View) => void;
}
export declare class Tab extends React.PureComponent<TabProps, {}> {
    static defaultProps: any;
    onMouseHandle: (e: React.MouseEvent<HTMLElement>, handler: Function) => void;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
    onDoubleClick: (e: React.MouseEvent<HTMLElement>) => void;
    onClose: (e: React.MouseEvent<HTMLElement>) => void;
    onDragStart: (e: React.DragEvent<HTMLElement>) => void;
    render(): JSX.Element;
}
