import * as React from "react";
import { View } from "./editor";
export interface MarkdownProps {
    src: string;
    view: View;
}
export interface MarkdownState {
    html: string;
}
export declare function replaceImageLinksWithBase64(html: string): Promise<string>;
export declare class Markdown extends React.Component<MarkdownProps, MarkdownState> {
    ref: HTMLDivElement;
    constructor(props: MarkdownProps);
    encodeToBase64String(html: string): Promise<string>;
    componentDidMount(): Promise<void>;
    componentWillReceiveProps(props: MarkdownProps): Promise<void>;
    componentDidUpdate(): void;
    render(): JSX.Element;
}
export interface MarkdownViewProps {
    view: View;
}
export interface MarkdownViewState {
    markdown: string;
}
export declare class MarkdownView extends React.Component<MarkdownViewProps, MarkdownViewState> {
    constructor(props: MarkdownViewProps);
    onDidChangeBuffer: () => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(props: MarkdownViewProps): void;
    render(): JSX.Element;
}
