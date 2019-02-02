import * as React from "react";
declare type FileContextMenuProps = {
    rename: () => void;
    onDelete: () => void;
};
declare type FileContextMenuState = {};
export default class FileContextMenu extends React.Component<FileContextMenuProps, FileContextMenuState> {
    constructor(props: FileContextMenuProps);
    render(): JSX.Element;
}
export {};
