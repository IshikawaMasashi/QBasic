import "./index.css";
import * as React from "react";
import { IFiddleFile } from "../../service";
import { QBasicProgram } from "../../qbasic/qb";
export interface Template {
    name: string;
    description: string;
    files: IFiddleFile[];
    baseUrl: URL;
    icon: string;
}
declare type QuickBasicConsoleDialogProps = {
    isOpen: boolean;
    templatesName: string;
    quickBasicProgram: QBasicProgram;
    setQuickBasicProgram: (quickBasicProgram?: QBasicProgram) => void;
};
declare type QuickBasicConsoleDialogState = {
    description: string;
    name: string;
    template: Template;
    templates: Template[];
};
export declare class QuickBasicConsoleDialog extends React.Component<QuickBasicConsoleDialogProps, QuickBasicConsoleDialogState> {
    private cons;
    private virtualMachine;
    private refCanvas;
    constructor(props: QuickBasicConsoleDialogProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    setTemplate(template: Template): Promise<void>;
    private handleCloseModal;
    render(): JSX.Element;
}
export {};
