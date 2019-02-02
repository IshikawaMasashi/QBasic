import * as React from "react";
import './closeFileDialog.css';
import { View } from "../../../components/editor";
export interface CloseFileDialogProps {
    view: View;
    onCancel: () => void;
    isOpen: boolean;
}
declare type CloseFileDialogState = {};
export declare class CloseFileDialog extends React.Component<CloseFileDialogProps, CloseFileDialogState> {
    constructor(props: CloseFileDialogProps);
    render(): JSX.Element;
}
export {};
