import * as React from "react";
import AbstractMenu, { AbstractMenuProps, AbstractMenuState } from './AbstractMenu';
import SubMenu from './SubMenu';
interface ContextMenuProps extends AbstractMenuProps {
    id: string;
    data?: any;
    className?: string;
    hideOnLeave?: boolean;
    onHide?: {
        (event: any): void;
    };
    onMouseLeave?: {
        (event: React.MouseEvent<HTMLElement>, data: Object, target: HTMLElement): void;
    } | Function;
    onShow?: {
        (event: any): void;
    };
    style?: any;
}
interface ContextMenuStae extends AbstractMenuState {
    x: number;
    y: number;
    isVisible: boolean;
}
export default class ContextMenu extends AbstractMenu<ContextMenuProps, ContextMenuStae> {
    menu: HTMLElement;
    listenId: string;
    static defaultProps: {
        className: string;
        data: {};
        hideOnLeave: boolean;
        onHide(): any;
        onMouseLeave(): any;
        onShow(): any;
        style: {};
    };
    constructor(props: ContextMenuProps);
    getSubMenuType(): typeof SubMenu;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    registerHandlers: () => void;
    unregisterHandlers: () => void;
    handleShow: (e: any) => void;
    handleHide: (e: any) => void;
    handleOutsideClick: (e: MouseEvent) => void;
    handleMouseLeave: (event: React.MouseEvent<HTMLElement>) => void;
    handleContextMenu: (e: any) => void;
    hideMenu: (e: KeyboardEvent) => void;
    getMenuPosition: (x?: number, y?: number) => {
        top: number;
        left: number;
    };
    menuRef: (c: any) => void;
    render(): JSX.Element;
}
export {};
