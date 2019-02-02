import "./index.css";
import * as React from "react";
import { /*File,*/ FileType } from "../../models";
import { ExplorerItem } from "../explorer";
import OpenEditorsTreeNode from "../openEditors/OpenEditorsTreeNode";
export interface RenameDialogProps {
    renameLabelId: string;
    isOpen: boolean;
    item: ExplorerItem | OpenEditorsTreeNode;
    onChange: () => void;
    onCancel: () => void;
}
declare type RenameDialogState = {
    description: string;
    name: string;
    fileType: FileType;
};
export declare class RenameDialog extends React.Component<RenameDialogProps, RenameDialogState> {
    constructor(props: RenameDialogProps);
    onChangeName: (event: React.ChangeEvent<any>) => void;
    onChangeDescription: (event: React.ChangeEvent<any>) => void;
    getNameError(): string;
    private handleCloseModal;
    private onKeyDown;
    render(): JSX.Element;
}
export {};
