import * as React from "react";
declare type MenuItemProps = {
    attributes?: any;
    data?: Object;
    disabled?: boolean;
    divider?: boolean;
    preventClose?: boolean;
    onClick?: {
        (event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>, data: Object, target: HTMLElement): void;
    } | Function;
    selected?: boolean;
    onMouseMove?: () => void;
    onMouseLeave?: () => void;
};
declare type MenuItemState = {};
export default class MenuItem extends React.Component<MenuItemProps, MenuItemState> {
    ref: HTMLElement;
    static defaultProps: {
        disabled: boolean;
        data: {};
        divider: boolean;
        attributes: {};
        preventClose: boolean;
        onClick(): any;
        children: any;
        selected: boolean;
        onMouseMove: () => any;
        onMouseLeave: () => any;
    };
    handleClick: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
    render(): JSX.Element;
}
export {};
