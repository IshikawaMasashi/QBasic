import * as React from "react";
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
export interface AbstractMenuProps {
    children: JSX.Element[];
}
export interface AbstractMenuState {
    selectedItem: any;
    isVisible?: boolean;
    forceSubMenuOpen: boolean;
}
export default abstract class AbstractMenu<P extends AbstractMenuProps, U extends AbstractMenuState> extends React.Component<P, U> {
    seletedItemRef: MenuItem;
    hideMenu: (e: KeyboardEvent) => void;
    abstract getSubMenuType(): typeof SubMenu;
    constructor(props: P);
    handleKeyNavigation: (e: KeyboardEvent) => void;
    handleForceClose: () => void;
    tryToOpenSubMenu: (e: KeyboardEvent) => void;
    selectChildren: (forward: boolean) => void;
    onChildMouseMove: (child: React.ReactChild) => void;
    onChildMouseLeave: () => void;
    renderChildren: (children: JSX.Element[]) => React.ReactElement<{
        divider: boolean;
        children: JSX.Element[];
    }>[];
}
