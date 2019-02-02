import * as React from "react";
import { ChangeEventHandler, KeyboardEventHandler } from "react";
export declare class Spacer extends React.Component<{
    height: number;
}, {}> {
    render(): JSX.Element;
}
export declare class Divider extends React.Component<{
    height: number;
}, {}> {
    render(): JSX.Element;
}
declare type TextInputBoxProps = {
    label: string;
    value: string;
    error?: string;
    className: string;
    onChange?: ChangeEventHandler<any>;
    onKeyDown?: KeyboardEventHandler<any>;
};
declare type TextInputBoxState = {};
export declare class TextInputBox extends React.Component<TextInputBoxProps, TextInputBoxState> {
    private nameInput;
    constructor(props: any);
    componentDidMount(): void;
    render(): JSX.Element;
}
export declare class UploadInput extends React.Component<{
    onChange?: ChangeEventHandler<any>;
}, {}> {
    inputElement: HTMLInputElement;
    setInputElement(ref: HTMLInputElement): void;
    constructor(props: any);
    open(upload: "files" | "directory"): void;
    render(): JSX.Element;
}
export declare class ListItem extends React.Component<{
    label: string;
    onClick?: Function;
    icon?: string;
    selected?: boolean;
    value: any;
    error?: string;
}, {}> {
    render(): JSX.Element;
}
export declare class ListBox extends React.Component<{
    height: number;
    value?: any;
    onSelect?: (value: any) => void;
}, {}> {
    constructor(props: any);
    render(): JSX.Element;
}
export {};
