import * as React from "react";
import AbstractMenu, { AbstractMenuProps, AbstractMenuState } from './AbstractMenu';
interface SubMenuProps extends AbstractMenuProps {
    attributes: any;
    title: any;
    className: string;
    disabled: boolean;
    hoverDelay: number;
    rtl: boolean;
    selected: boolean;
    onMouseMove: () => void;
    onMouseOut: () => void;
    forceOpen: boolean;
    forceClose: () => void;
    parentKeyNavigationHandler: () => void;
    data?: any;
    onClick: () => void;
}
interface SubMenuState extends AbstractMenuState {
    visible: boolean;
}
export default class SubMenu extends AbstractMenu<SubMenuProps, SubMenuState> {
    opentimer: any;
    subMenu: HTMLElement;
    listenId: string;
    isVisibilityChange: boolean;
    closetimer: any;
    menu: any;
    static defaultProps: {
        disabled: boolean;
        hoverDelay: number;
        attributes: {};
        className: string;
        rtl: boolean;
        selected: boolean;
        onMouseMove: () => any;
        onMouseOut: () => any;
        forceOpen: boolean;
        forceClose: () => any;
        parentKeyNavigationHandler: () => any;
    };
    constructor(props: SubMenuProps);
    componentDidMount(): void;
    getSubMenuType(): typeof SubMenu;
    shouldComponentUpdate(nextProps: SubMenuProps, nextState: SubMenuState): boolean;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    getMenuPosition: () => React.CSSProperties;
    getRTLMenuPosition: () => React.CSSProperties;
    hideMenu: (e: any) => void;
    handleClick: (event: any) => void;
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
    menuRef: (c: any) => void;
    subMenuRef: (c: any) => void;
    registerHandlers: () => void;
    unregisterHandlers: (dismounting?: boolean) => void;
    render(): JSX.Element;
}
export {};
