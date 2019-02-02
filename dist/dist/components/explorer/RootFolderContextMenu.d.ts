import * as React from "react";
declare type RootFolderContextMenuProps = {
    newFile: () => void;
    newFolder: () => void;
    rename: () => void;
    refresh: () => void;
    closeFolder: () => void;
};
declare type RootFolderContextMenuState = {};
export default class RootFolderContextMenu extends React.Component<RootFolderContextMenuProps, RootFolderContextMenuState> {
    constructor(props: RootFolderContextMenuProps);
    render(): JSX.Element;
}
export {};
