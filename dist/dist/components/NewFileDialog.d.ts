import * as React from "react";
import { File, FileType } from "../models";
import { ExplorerFolder } from "./explorer";
declare type NewFileDialogProps = {
    isOpen: boolean;
    folder: ExplorerFolder;
    onCreate: (file: File) => void;
    onCancel: () => void;
};
declare type NewFileDialogState = {
    fileType: FileType;
    description: string;
    name: string;
};
export declare class NewFileDialog extends React.Component<NewFileDialogProps, NewFileDialogState> {
    constructor(props: any);
    onChangeName: (event: React.ChangeEvent<any>) => void;
    getNameError(): string;
    fileName(): string;
    createButtonLabel(): string;
    private onSelect;
    readonly handleCloseModal: () => void;
    render(): JSX.Element;
}
export {};
