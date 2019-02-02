import * as React from "react";
declare type ButtonProps = {
    customClassName?: string;
    href?: string;
    icon?: JSX.Element;
    isDisabled?: boolean;
    label?: string;
    onClick?: Function;
    rel?: string;
    target?: string;
    title?: string;
};
export declare class Button extends React.Component<ButtonProps, {}> {
    render(): JSX.Element;
}
export {};
