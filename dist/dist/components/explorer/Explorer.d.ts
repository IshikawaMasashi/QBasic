import "../treeView/index.css";
import "./index.css";
import "./tree.css";
import * as React from "react";
import { TreeRowInfo, Key } from "../treeView";
import { ExplorerRootFolder } from "./ExplorerRootFolder";
import { ExplorerRoot } from "./ExplorerRoot";
declare type ExplorerProps = {
    folders: ExplorerRootFolder[];
};
declare type ExplorerState = {
    root: ExplorerRoot;
    selectedKeys: Set<Key>;
};
export declare class Explorer extends React.Component<ExplorerProps, ExplorerState> {
    private clickCount;
    private selectedItems;
    constructor(props: ExplorerProps);
    private getIconForItem;
    private createFileAsync;
    private createFolderAsync;
    private onRefresh;
    render(): JSX.Element;
    renderRow: (info: TreeRowInfo) => JSX.Element;
    onContextMenu: (info: TreeRowInfo, _ev: React.MouseEvent<Element>) => void;
    private onSelectedKeysChange;
    readonly onCollapsedChange: (info: TreeRowInfo, collapsed: boolean) => Promise<void>;
    readonly onMove: (src: TreeRowInfo[], _dest: TreeRowInfo, _destIndex: number, destPathAfterMove: number[]) => Promise<void>;
    readonly onCopy: (src: TreeRowInfo[], dest: TreeRowInfo, destIndex: number) => Promise<void>;
}
export {};
