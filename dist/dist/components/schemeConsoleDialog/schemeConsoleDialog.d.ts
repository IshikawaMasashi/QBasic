import "./index.css";
import * as React from "react";
import { IFiddleFile } from "../../service";
export interface Template {
    name: string;
    description: string;
    files: IFiddleFile[];
    baseUrl: URL;
    icon: string;
}
declare type SchemeConsoleDialogProps = {
    isOpen: boolean;
    templatesName: string;
    schemeCode: string;
    setScemeCode: (schemeCode: string) => void;
};
declare type SchemeConsoleDialogState = {
    description: string;
    name: string;
    template: Template;
    templates: Template[];
};
export declare class SchemeConsoleDialog extends React.Component<SchemeConsoleDialogProps, SchemeConsoleDialogState> {
    private cons;
    private refCanvas;
    private worker;
    constructor(props: SchemeConsoleDialogProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    setTemplate(template: Template): Promise<void>;
    private handleCloseModal;
    render(): JSX.Element;
}
export {};
