import * as React from "react";
declare type FolderContextMenuProps = {
    newFile: () => void;
    newFolder: () => void;
    onRevealInExprlorer: () => void;
    rename: () => void;
    refresh: () => void;
    onDelete: () => void;
};
declare type FolderContextMenuState = {};
export default class FolderContextMenu extends React.Component<FolderContextMenuProps, FolderContextMenuState> {
    constructor(props: FolderContextMenuProps);
    render(): JSX.Element;
}
export {};
